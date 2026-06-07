"use client";

import { useRef, useState, useCallback, useEffect } from "react";

// ── Music constants ───────────────────────────────────────────────────────────
const BPM   = 80;
const BEAT  = 60 / BPM;        // 0.75s per beat
const BAR   = BEAT * 4;        // 3.0s per bar
const LOOK  = 0.15;            // lookahead seconds
const SCHED = 80;              // scheduler interval ms

const N = {
  C3:130.81, D3:146.83, Eb3:155.56, E3:164.81, F3:174.61,
  G3:196.00, Ab3:207.65, A3:220.00, Bb3:233.08, B3:246.94,
  C4:261.63, D4:293.66, Eb4:311.13, E4:329.63, F4:349.23,
  G4:392.00, Ab4:415.30, A4:440.00, Bb4:466.16, B4:493.88,
  C5:523.25, D5:587.33, Eb5:622.25,
};

// Chord voicings  (root, 3rd, 5th, 7th) — jazz-flavoured
const CHORDS = [
  [N.C3,  N.E3,  N.G3,  N.B3 ],  // Cmaj7
  [N.A3,  N.C4,  N.E4,  N.Ab4],  // Am7
  [N.F3,  N.A3,  N.C4,  N.E4 ],  // Fmaj7
  [N.G3,  N.B3,  N.D4,  N.F4 ],  // G7
];

// Sparse melody (null = rest) — one note per beat
const MELODY = [
  [N.E4,  N.G4,  null,  N.A4 ],
  [null,  N.G4,  N.E4,  null ],
  [N.F4,  null,  N.A4,  N.C5 ],
  [null,  N.B4,  null,  N.G4 ],
];

// ── Audio helpers ─────────────────────────────────────────────────────────────
function makeNoiseBuf(ctx: AudioContext, secs: number) {
  const n    = Math.ceil(ctx.sampleRate * secs);
  const buf  = ctx.createBuffer(1, n, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < n; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

function kick(ctx: AudioContext, dest: AudioNode, t: number) {
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(dest);
  osc.frequency.setValueAtTime(150, t);
  osc.frequency.exponentialRampToValueAtTime(42, t + 0.2);
  gain.gain.setValueAtTime(1.4, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.38);
  osc.start(t); osc.stop(t + 0.4);
}

function snare(ctx: AudioContext, dest: AudioNode, t: number) {
  // noise layer
  const src  = ctx.createBufferSource();
  src.buffer = makeNoiseBuf(ctx, 0.2);
  const hp   = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 1200;
  const g1   = ctx.createGain();
  src.connect(hp); hp.connect(g1); g1.connect(dest);
  g1.gain.setValueAtTime(0.45, t);
  g1.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
  src.start(t);
  // tone layer
  const osc  = ctx.createOscillator();
  const g2   = ctx.createGain();
  osc.frequency.value = 185;
  osc.connect(g2); g2.connect(dest);
  g2.gain.setValueAtTime(0.55, t);
  g2.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
  osc.start(t); osc.stop(t + 0.1);
}

function hihat(ctx: AudioContext, dest: AudioNode, t: number, open = false) {
  const dur  = open ? 0.28 : 0.055;
  const src  = ctx.createBufferSource();
  src.buffer = makeNoiseBuf(ctx, dur + 0.01);
  const hp   = ctx.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 8000;
  const gain = ctx.createGain();
  src.connect(hp); hp.connect(gain); gain.connect(dest);
  gain.gain.setValueAtTime(0.13, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
  src.start(t);
}

function pianoNote(
  ctx: AudioContext, dest: AudioNode,
  freq: number, t: number, dur: number, vol = 0.13,
) {
  const osc   = ctx.createOscillator();
  osc.type    = "triangle";
  osc.frequency.value = freq;
  osc.detune.value    = (Math.random() - 0.5) * 10; // subtle warmth
  const lp    = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1100;
  const gain  = ctx.createGain();
  osc.connect(lp); lp.connect(gain); gain.connect(dest);
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(vol, t + 0.05);
  gain.gain.setValueAtTime(vol * 0.65, t + 0.35);
  gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
  osc.start(t); osc.stop(t + dur + 0.05);
}

function startCrackle(ctx: AudioContext, dest: AudioNode) {
  // Sparse vinyl pops on a 4s loop
  const secs  = 4;
  const n     = Math.ceil(ctx.sampleRate * secs);
  const buf   = ctx.createBuffer(1, n, ctx.sampleRate);
  const data  = buf.getChannelData(0);
  for (let i = 0; i < n; i++) {
    data[i] = Math.random() < 0.0008 ? (Math.random() - 0.5) * 0.5 : 0;
  }
  // Continuous white-noise undercurrent (very quiet hiss)
  const hiss  = ctx.createBuffer(1, n, ctx.sampleRate);
  const hd    = hiss.getChannelData(0);
  for (let i = 0; i < n; i++) hd[i] = (Math.random() * 2 - 1) * 0.012;

  const src1  = ctx.createBufferSource();
  src1.buffer = buf;  src1.loop = true;
  const src2  = ctx.createBufferSource();
  src2.buffer = hiss; src2.loop = true;
  const lp    = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 4000;
  const gain  = ctx.createGain(); gain.gain.value = 0.6;
  src1.connect(gain); src2.connect(lp); lp.connect(gain); gain.connect(dest);
  src1.start(); src2.start();
  return [src1, src2] as const;
}

// ── Main component ────────────────────────────────────────────────────────────
export default function LofiPlayer() {
  const [playing, setPlaying] = useState(false);
  const ctxRef      = useRef<AudioContext | null>(null);
  const masterRef   = useRef<GainNode | null>(null);
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextBarRef  = useRef(0);
  const barIdxRef   = useRef(0);
  const crackRef    = useRef<readonly [AudioBufferSourceNode, AudioBufferSourceNode] | null>(null);

  // Build master chain once
  const getCtx = useCallback(() => {
    if (ctxRef.current) return { ctx: ctxRef.current, master: masterRef.current! };
    const ctx    = new AudioContext();
    const master = ctx.createGain(); master.gain.value = 0.72;
    const lp     = ctx.createBiquadFilter();
    lp.type      = "lowpass"; lp.frequency.value = 1600; lp.Q.value = 0.6;
    // Very subtle reverb via delay
    const delay  = ctx.createDelay(0.06); delay.delayTime.value = 0.055;
    const fb     = ctx.createGain(); fb.gain.value = 0.18;
    const wet    = ctx.createGain(); wet.gain.value = 0.22;
    master.connect(delay); delay.connect(fb); fb.connect(delay);
    delay.connect(wet); wet.connect(lp);
    master.connect(lp);
    lp.connect(ctx.destination);
    ctxRef.current  = ctx;
    masterRef.current = master;
    return { ctx, master };
  }, []);

  const scheduleBar = useCallback(
    (ctx: AudioContext, master: AudioNode, barStart: number, barIdx: number) => {
      const chord = CHORDS[barIdx % 4];
      const mel   = MELODY[barIdx % 4];

      // ── Drums ──
      for (let b = 0; b < 4; b++) {
        const t = barStart + b * BEAT;
        if (b === 0 || b === 2) kick(ctx, master, t);
        if (b === 1 || b === 3) snare(ctx, master, t);
        hihat(ctx, master, t, false);
        hihat(ctx, master, t + BEAT * 0.5, b === 3); // open hat on "ah" of 4
        // ghost hi-hat on "e" of beat 1 occasionally
        if (b === 0 && Math.random() > 0.5) hihat(ctx, master, t + BEAT * 0.25);
      }

      // ── Chord strum — notes slightly offset ──
      chord.forEach((freq, i) => {
        pianoNote(ctx, master, freq, barStart + i * 0.028, BAR * 0.88, 0.11);
      });
      // 2nd voicing hit on beat 3
      chord.slice(1).forEach((freq, i) => {
        pianoNote(ctx, master, freq * 2, barStart + BEAT * 2 + i * 0.018, BAR * 0.4, 0.055);
      });

      // ── Melody ──
      mel.forEach((freq, b) => {
        if (freq) pianoNote(ctx, master, freq, barStart + b * BEAT, BEAT * 0.75, 0.09);
      });
    },
    [],
  );

  const runScheduler = useCallback(() => {
    const { ctx, master } = getCtx();
    while (nextBarRef.current < ctx.currentTime + LOOK) {
      scheduleBar(ctx, master, nextBarRef.current, barIdxRef.current);
      nextBarRef.current += BAR;
      barIdxRef.current  = (barIdxRef.current + 1) % 4;
    }
    timerRef.current = setTimeout(runScheduler, SCHED);
  }, [getCtx, scheduleBar]);

  const start = useCallback(() => {
    const { ctx, master } = getCtx();
    if (ctx.state === "suspended") ctx.resume();
    nextBarRef.current = ctx.currentTime + 0.05;
    barIdxRef.current  = 0;
    crackRef.current   = startCrackle(ctx, master);
    runScheduler();
    setPlaying(true);
  }, [getCtx, runScheduler]);

  const stop = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    crackRef.current?.[0].stop();
    crackRef.current?.[1].stop();
    crackRef.current = null;
    // fade out master
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.linearRampToValueAtTime(0, ctxRef.current.currentTime + 0.5);
      setTimeout(() => {
        ctxRef.current?.close();
        ctxRef.current  = null;
        masterRef.current = null;
      }, 600);
    }
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    playing ? stop() : start();
  }, [playing, start, stop]);

  // Cleanup on unmount
  useEffect(() => () => { if (playing) stop(); }, []);

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play lo-fi music"}
      title={playing ? "หยุดเพลง" : "เปิดเพลง lo-fi"}
      style={{
        position:     "fixed",
        bottom:       "20px",
        right:        "20px",
        zIndex:       9999,
        width:        "44px",
        height:       "44px",
        borderRadius: "50%",
        border:       "2px solid #C62828",
        background:   playing ? "#C62828" : "rgba(255,252,248,0.92)",
        color:        playing ? "#fff"     : "#C62828",
        boxShadow:    "0 3px 12px rgba(198,40,40,0.25)",
        cursor:       "pointer",
        display:      "flex",
        alignItems:   "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        transition:   "all 0.25s ease",
        padding:      0,
      }}
    >
      {playing ? (
        /* Pause icon */
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <rect x="3" y="2" width="4" height="12" rx="1"/>
          <rect x="9" y="2" width="4" height="12" rx="1"/>
        </svg>
      ) : (
        /* Music note icon */
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 3v9.5A3 3 0 1 0 11 10V6.5l5-1.5V3L9 3z"/>
        </svg>
      )}

      {/* Spinning vinyl ring when playing */}
      {playing && (
        <span style={{
          position:     "absolute",
          inset:        "-4px",
          borderRadius: "50%",
          border:       "1.5px dashed rgba(198,40,40,0.4)",
          animation:    "spin 4s linear infinite",
          pointerEvents: "none",
        }}/>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}
