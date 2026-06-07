"use client";

import { useRef, useState, useCallback, useEffect } from "react";

// ─── Music constants ──────────────────────────────────────────────────────────
const BPM   = 56;           // very slow, calm
const BEAT  = 60 / BPM;    // ~1.07 s
const BAR   = BEAT * 4;    // ~4.29 s
const LOOK  = 0.20;
const SCHED = 80;

// Calm 4-chord progression: Cmaj7 → Am7 → Fmaj7 → Gsus4
// Voiced in mid register for warmth
const CHORDS: [number, number, number, number][] = [
  [130.81, 164.81, 196.00, 246.94],  // Cmaj7  C3 E3 G3 B3
  [110.00, 130.81, 164.81, 196.00],  // Am7    A2 C3 E3 G3
  [87.31,  110.00, 130.81, 164.81],  // Fmaj7  F2 A2 C3 E3
  [98.00,  130.81, 146.83, 196.00],  // Gsus4  G2 C3 D3 G3
];

// Melody line — one or two notes per bar, higher octave
// null = rest, plays over 4 beats
const MELODY: (number | null)[][] = [
  [null,   523.25, null,   587.33],  // Cmaj7 bar
  [659.25, null,   587.33, null  ],  // Am7 bar
  [523.25, 493.88, null,   440.00],  // Fmaj7 bar
  [null,   493.88, 523.25, null  ],  // Gsus4 bar
];

// ─── Synth helpers ────────────────────────────────────────────────────────────

function noiseBuf(ctx: AudioContext, secs: number) {
  const n = Math.ceil(ctx.sampleRate * secs);
  const b = ctx.createBuffer(1, n, ctx.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  return b;
}

/**
 * Realistic-ish piano note: blends sine harmonics (1st+2nd+3rd)
 * with a tiny percussive noise click on the attack.
 */
function pianoNote(
  ctx: AudioContext, dest: AudioNode,
  freq: number, t: number, dur: number, vol = 0.14,
) {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, t);
  master.gain.linearRampToValueAtTime(vol,        t + 0.018); // fast attack
  master.gain.setValueAtTime(vol * 0.72,          t + 0.12);  // decay to sustain
  master.gain.exponentialRampToValueAtTime(0.001, t + dur);
  master.connect(dest);

  // Fundamental
  const o1 = ctx.createOscillator(); o1.type = "sine";
  o1.frequency.value = freq;
  const g1 = ctx.createGain(); g1.gain.value = 1.0;
  o1.connect(g1); g1.connect(master);
  o1.start(t); o1.stop(t + dur + 0.05);

  // 2nd harmonic (octave) — adds body
  const o2 = ctx.createOscillator(); o2.type = "sine";
  o2.frequency.value = freq * 2;
  const g2 = ctx.createGain(); g2.gain.value = 0.28;
  o2.connect(g2); g2.connect(master);
  o2.start(t); o2.stop(t + dur * 0.7);

  // 3rd harmonic — gives slight shimmer
  const o3 = ctx.createOscillator(); o3.type = "sine";
  o3.frequency.value = freq * 3;
  const g3 = ctx.createGain(); g3.gain.value = 0.10;
  o3.connect(g3); g3.connect(master);
  o3.start(t); o3.stop(t + dur * 0.4);

  // Key-click noise burst (very brief, like hammer hitting string)
  const click = ctx.createBufferSource();
  click.buffer = noiseBuf(ctx, 0.025);
  const clickLp = ctx.createBiquadFilter(); clickLp.type = "bandpass";
  clickLp.frequency.value = freq * 4; clickLp.Q.value = 1.5;
  const clickG = ctx.createGain(); clickG.gain.value = vol * 0.18;
  click.connect(clickLp); clickLp.connect(clickG); clickG.connect(dest);
  click.start(t);
}

/**
 * Arpeggiate a chord: plays notes one by one, spaced evenly.
 * ascending = true for upward sweep.
 */
function arpChord(
  ctx: AudioContext, dest: AudioNode,
  notes: number[], barStart: number, noteDur: number,
  spacing = 0.18, vol = 0.11,
) {
  notes.forEach((freq, i) => {
    pianoNote(ctx, dest, freq, barStart + i * spacing, noteDur, vol - i * 0.012);
  });
}

/** Very soft pad swell — barely audible sine tones for warmth underneath */
function padNote(ctx: AudioContext, dest: AudioNode, freq: number, t: number, dur: number, vol = 0.03) {
  const osc  = ctx.createOscillator(); osc.type = "sine";
  osc.frequency.value = freq;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(vol, t + 1.2);
  gain.gain.setValueAtTime(vol,           t + dur - 1.0);
  gain.gain.linearRampToValueAtTime(0,    t + dur);
  osc.connect(gain); gain.connect(dest);
  osc.start(t); osc.stop(t + dur + 0.05);
}

// ─── Rain ambience ────────────────────────────────────────────────────────────
type RainState = { sources: AudioBufferSourceNode[]; gainNode: GainNode };

function createRain(ctx: AudioContext, dest: AudioNode): RainState {
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 2.5);
  master.connect(dest);

  const secs  = 4;
  const base  = noiseBuf(ctx, secs);
  const sources: AudioBufferSourceNode[] = [];

  // Layer 1 — high hiss
  const s1 = ctx.createBufferSource(); s1.buffer = base; s1.loop = true;
  const bp1 = ctx.createBiquadFilter(); bp1.type = "bandpass"; bp1.frequency.value = 3200; bp1.Q.value = 1.0;
  const g1  = ctx.createGain(); g1.gain.value = 0.55;
  s1.connect(bp1); bp1.connect(g1); g1.connect(master); s1.start();
  sources.push(s1);

  // Layer 2 — mid drops (slightly slower playback for texture variation)
  const s2 = ctx.createBufferSource(); s2.buffer = noiseBuf(ctx, secs + 1); s2.loop = true; s2.playbackRate.value = 0.72;
  const bp2 = ctx.createBiquadFilter(); bp2.type = "bandpass"; bp2.frequency.value = 650; bp2.Q.value = 1.4;
  const g2  = ctx.createGain(); g2.gain.value = 0.32;
  s2.connect(bp2); bp2.connect(g2); g2.connect(master); s2.start();
  sources.push(s2);

  // Layer 3 — low patter
  const s3 = ctx.createBufferSource(); s3.buffer = noiseBuf(ctx, secs + 2); s3.loop = true; s3.playbackRate.value = 0.45;
  const lp3 = ctx.createBiquadFilter(); lp3.type = "lowpass"; lp3.frequency.value = 300;
  const g3  = ctx.createGain(); g3.gain.value = 0.14;
  s3.connect(lp3); lp3.connect(g3); g3.connect(master); s3.start();
  sources.push(s3);

  return { sources, gainNode: master };
}

// ─── Portal / dimension door SFX ─────────────────────────────────────────────
function playPortal(ctx: AudioContext, dest: AudioNode) {
  const now = ctx.currentTime;

  // 1. Low rumble build-up
  const rSrc = ctx.createBufferSource();
  rSrc.buffer = noiseBuf(ctx, 0.7);
  const rLp  = ctx.createBiquadFilter(); rLp.type = "lowpass"; rLp.frequency.value = 160;
  const rG   = ctx.createGain();
  rG.gain.setValueAtTime(0, now);
  rG.gain.linearRampToValueAtTime(0.55, now + 0.18);
  rG.gain.linearRampToValueAtTime(0, now + 0.6);
  rSrc.connect(rLp); rLp.connect(rG); rG.connect(dest);
  rSrc.start(now);

  // 2. Rising frequency sweep
  const sweep = ctx.createOscillator();
  sweep.type  = "sine";
  sweep.frequency.setValueAtTime(75, now + 0.08);
  sweep.frequency.exponentialRampToValueAtTime(2400, now + 1.0);
  const sG = ctx.createGain();
  sG.gain.setValueAtTime(0, now + 0.08);
  sG.gain.linearRampToValueAtTime(0.55, now + 0.3);
  sG.gain.linearRampToValueAtTime(0, now + 1.05);
  sweep.connect(sG); sG.connect(dest);
  sweep.start(now + 0.08); sweep.stop(now + 1.1);

  // 3. Crystal bell harmonics at the peak
  const bells: [number, number, number][] = [
    [880,  0.32, 0.68],
    [1320, 0.22, 0.73],
    [1760, 0.18, 0.78],
    [2200, 0.13, 0.83],
    [660,  0.28, 0.71],
    [2640, 0.09, 0.88],
  ];
  for (const [freq, vol, delay] of bells) {
    const osc  = ctx.createOscillator();
    osc.type   = "sine";
    osc.frequency.value = freq;
    const bG   = ctx.createGain();
    bG.gain.setValueAtTime(0, now + delay);
    bG.gain.linearRampToValueAtTime(vol, now + delay + 0.03);
    bG.gain.exponentialRampToValueAtTime(0.001, now + delay + 1.8);
    osc.connect(bG); bG.connect(dest);
    osc.start(now + delay); osc.stop(now + delay + 2.0);
  }

  // 4. Whoosh noise burst
  const wSrc = ctx.createBufferSource();
  wSrc.buffer = noiseBuf(ctx, 0.55);
  const wHp  = ctx.createBiquadFilter(); wHp.type = "highpass"; wHp.frequency.value = 3500;
  const wG   = ctx.createGain();
  wG.gain.setValueAtTime(0, now + 0.55);
  wG.gain.linearRampToValueAtTime(0.28, now + 0.72);
  wG.gain.linearRampToValueAtTime(0, now + 1.05);
  wSrc.connect(wHp); wHp.connect(wG); wG.connect(dest);
  wSrc.start(now + 0.55);

  // 5. Ethereal high tone — floats after the whoosh
  const ether = ctx.createOscillator();
  ether.type  = "sine";
  ether.frequency.value = 3200;
  ether.frequency.exponentialRampToValueAtTime(1800, now + 2.5);
  const eG = ctx.createGain();
  eG.gain.setValueAtTime(0, now + 0.9);
  eG.gain.linearRampToValueAtTime(0.12, now + 1.1);
  eG.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
  ether.connect(eG); eG.connect(dest);
  ether.start(now + 0.9); ether.stop(now + 2.6);
}

// ─── Audio context builder ────────────────────────────────────────────────────
interface AudioRig {
  ctx:      AudioContext;
  musicIn:  GainNode;   // for strings/piano — goes through warm lowpass + reverb
  ambIn:    GainNode;   // for rain/sfx — direct to destination
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function LofiPlayer() {
  const [playing, setPlaying] = useState(false);
  const rigRef    = useRef<AudioRig | null>(null);
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const nextBar   = useRef(0);
  const barIdx    = useRef(0);
  const rainRef   = useRef<RainState | null>(null);

  // Build (or return) audio rig
  const getRig = useCallback((): AudioRig => {
    if (rigRef.current) return rigRef.current;

    const ctx = new AudioContext();

    // ── Music chain: musicIn → lp → destination (+ reverb taps)
    const musicIn = ctx.createGain(); musicIn.gain.value = 0; // muted until play
    const musicLp = ctx.createBiquadFilter();
    musicLp.type = "lowpass"; musicLp.frequency.value = 4000;
    musicIn.connect(musicLp); musicLp.connect(ctx.destination);

    // Room reverb — longer taps for piano hall feel
    const revMix = ctx.createGain(); revMix.gain.value = 0.35;
    musicIn.connect(revMix);
    for (const [dt, fb] of [[0.12, 0.32], [0.22, 0.26], [0.38, 0.20]] as [number,number][]) {
      const delay = ctx.createDelay(1.0); delay.delayTime.value = dt;
      const fbG   = ctx.createGain(); fbG.gain.value = fb;
      revMix.connect(delay);
      delay.connect(fbG); fbG.connect(delay);
      delay.connect(ctx.destination);
    }

    // ── Ambient chain: ambIn → destination (clean, no heavy filter)
    const ambIn = ctx.createGain(); ambIn.gain.value = 1.0;
    ambIn.connect(ctx.destination);

    const rig: AudioRig = { ctx, musicIn, ambIn };
    rigRef.current = rig;
    return rig;
  }, []);

  // ── Schedule one bar of calm piano music ──
  const scheduleBar = useCallback((rig: AudioRig, barStart: number, bi: number) => {
    const { ctx, musicIn } = rig;
    const chord = CHORDS[bi % 4];
    const mel   = MELODY[bi % 4];

    // ① Bass note (root, one octave below) — anchors the harmony
    pianoNote(ctx, musicIn, chord[0] * 0.5, barStart, BEAT * 3.5, 0.10);

    // ② Arpeggiated chord — sweeps upward over the first 2 beats
    arpChord(ctx, musicIn, chord, barStart + BEAT * 0.5, BEAT * 2.8, 0.20, 0.11);

    // ③ Inner voice re-hit on beat 3 (gentle, softer)
    pianoNote(ctx, musicIn, chord[1], barStart + BEAT * 2.2, BEAT * 1.8, 0.07);
    pianoNote(ctx, musicIn, chord[2], barStart + BEAT * 2.4, BEAT * 1.8, 0.06);

    // ④ Melody — sparse, 1–2 notes per bar, slightly rubato
    mel.forEach((freq, b) => {
      if (freq != null) {
        const rub = (Math.random() - 0.5) * 0.06; // subtle timing humanisation
        pianoNote(ctx, musicIn, freq, barStart + b * BEAT + rub, BEAT * 1.6, 0.09);
      }
    });

    // ⑤ Barely-audible pad root for warmth
    padNote(ctx, musicIn, chord[0], barStart, BAR + 0.3, 0.028);
    padNote(ctx, musicIn, chord[2], barStart, BAR + 0.3, 0.018);
  }, []);

  // ── Scheduler ──
  const runScheduler = useCallback(() => {
    const rig = getRig();
    while (nextBar.current < rig.ctx.currentTime + LOOK) {
      scheduleBar(rig, nextBar.current, barIdx.current);
      nextBar.current += BAR;
      barIdx.current   = (barIdx.current + 1) % 4;
    }
    timerRef.current = setTimeout(runScheduler, SCHED);
  }, [getRig, scheduleBar]);

  // ── Start / stop music ──
  const startMusic = useCallback(() => {
    const rig = getRig();
    if (rig.ctx.state === "suspended") rig.ctx.resume();
    rig.musicIn.gain.cancelScheduledValues(rig.ctx.currentTime);
    rig.musicIn.gain.linearRampToValueAtTime(0.8, rig.ctx.currentTime + 0.5);
    nextBar.current  = rig.ctx.currentTime + 0.05;
    barIdx.current   = 0;
    runScheduler();
    setPlaying(true);
  }, [getRig, runScheduler]);

  const stopMusic = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const rig = rigRef.current;
    if (rig) {
      rig.musicIn.gain.linearRampToValueAtTime(0, rig.ctx.currentTime + 0.9);
    }
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    playing ? stopMusic() : startMusic();
  }, [playing, startMusic, stopMusic]);

  // ── Scene + SFX events ──
  useEffect(() => {
    const onScene = (e: Event) => {
      const scene = (e as CustomEvent<string>).detail;
      const rig = getRig();
      if (rig.ctx.state === "suspended") rig.ctx.resume();

      if (scene === "rain") {
        if (!rainRef.current) {
          rainRef.current = createRain(rig.ctx, rig.ambIn);
        }
      } else if (rainRef.current) {
        // Fade out rain
        const { sources, gainNode } = rainRef.current;
        gainNode.gain.linearRampToValueAtTime(0, rig.ctx.currentTime + 1.8);
        setTimeout(() => {
          sources.forEach(s => { try { s.stop(); } catch {} });
          rainRef.current = null;
        }, 2000);
      }
    };

    const onSfx = (e: Event) => {
      const sfx = (e as CustomEvent<string>).detail;
      if (sfx === "portal") {
        const rig = getRig();
        if (rig.ctx.state === "suspended") rig.ctx.resume();
        playPortal(rig.ctx, rig.ambIn);
      }
    };

    window.addEventListener("game-scene", onScene);
    window.addEventListener("game-sfx",   onSfx);
    return () => {
      window.removeEventListener("game-scene", onScene);
      window.removeEventListener("game-sfx",   onSfx);
    };
  }, [getRig]);

  useEffect(() => () => { stopMusic(); }, []);

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      title={playing ? "หยุดเพลง" : "เปิดเพลงประกอบ"}
      style={{
        position:       "fixed",
        bottom:         "20px",
        right:          "20px",
        zIndex:         9999,
        width:          "44px",
        height:         "44px",
        borderRadius:   "50%",
        border:         "2px solid #C62828",
        background:     playing ? "#C62828" : "rgba(255,252,248,0.92)",
        color:          playing ? "#fff"     : "#C62828",
        boxShadow:      "0 3px 12px rgba(198,40,40,0.3)",
        cursor:         "pointer",
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        transition:     "all 0.25s ease",
        padding:        0,
      }}
    >
      {playing ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <rect x="3" y="2" width="4" height="12" rx="1"/>
          <rect x="9" y="2" width="4" height="12" rx="1"/>
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9 3v9.5A3 3 0 1 0 11 10V6.5l5-1.5V3L9 3z"/>
        </svg>
      )}
      {playing && (
        <span style={{
          position:     "absolute",
          inset:        "-5px",
          borderRadius: "50%",
          border:       "1.5px dashed rgba(198,40,40,0.45)",
          animation:    "lfspin 5s linear infinite",
          pointerEvents:"none",
        }}/>
      )}
      <style>{`@keyframes lfspin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}
