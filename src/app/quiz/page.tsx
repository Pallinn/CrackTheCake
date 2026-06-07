"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { BEATS, calcResult, type Beat, type CakeType, type ScoreMap } from "./data";
import { SketchBox, SketchChoiceBox } from "@/components/SketchBox";
import { ILLUSTRATIONS } from "@/components/StoryIllustrations";

// ── Typewriter — one line every ~1 second, blank lines add a pause ───────────
function useTypewriter(lines: string[], active: boolean) {
  const [visible, setVisible] = useState(0);
  const [done, setDone]       = useState(false);

  useEffect(() => {
    if (!active) return;
    setVisible(0);
    setDone(false);
    let idx = 0;
    const tick = () => {
      idx++;
      setVisible(idx);
      if (idx < lines.length) setTimeout(tick, lines[idx - 1] === "" ? 500 : 1000);
      else setDone(true);
    };
    const t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, lines.join("|")]);

  return { visible, done };
}

// ── Warning ──────────────────────────────────────────────────────────────────
function WarningScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 paper-bg">
      <div className="w-full max-w-md animate-fade-blur-in">
        <SketchBox className="p-10">
          <h2 className="text-center font-bold text-xl mb-5"
            style={{ color: "#C62828", fontFamily: "'Sarabun', sans-serif" }}>
            คำเตือน
          </h2>
          <div className="story-text text-center space-y-3 text-sm leading-loose" style={{ color: "#333" }}>
            <p>เว็บนี้มีเนื้อหาเกี่ยวกับการเติบโต และสภาพจิตใจ<br/>
               โปรดประเมินความมั่นคงของจิตใจก่อนกดเล่น</p>
            <p>หากรู้สึกว่าไม่ไหวสามารถกดออกได้ตลอดเวลา</p>
            <p>ทางเรามีความยินดีอย่างยิ่งที่คุณจะให้ความสำคัญ<br/>
               กับสภาพจิตใจตัวเองมาเป็นอันดับแรก</p>
            <p className="opacity-70">* เว็บนี้ไม่ใช่แบบทดสอบทางจิตวิทยา</p>
          </div>
          <div className="flex justify-end mt-8">
            <button onClick={onNext} className="ink-btn text-base">ไปต่อ</button>
          </div>
        </SketchBox>
      </div>
    </div>
  );
}

// ── Name entry ───────────────────────────────────────────────────────────────
function NameScreen({ onNext }: { onNext: (name: string) => void }) {
  const [name, setName] = useState("");
  const [age,  setAge]  = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen p-6 paper-bg">
      <div className="w-full max-w-sm animate-slide-up">
        <p className="text-center story-text text-xl font-semibold mb-10" style={{ color: "#2a2a2a" }}>
          เราอยากรู้จักคุณสักหน่อย
        </p>
        <div className="space-y-8 mb-10">
          <div>
            <label className="story-text text-base font-semibold block mb-2" style={{ color: "#C62828" }}>ชื่อ</label>
            <input value={name} onChange={e => setName(e.target.value)}
              className="sketch-input" placeholder="ชื่อของคุณ"/>
          </div>
          <div>
            <label className="story-text text-base font-semibold block mb-2" style={{ color: "#C62828" }}>อายุ</label>
            <input value={age} onChange={e => setAge(e.target.value)}
              className="sketch-input" placeholder="อายุของคุณ" type="number"/>
          </div>
        </div>
        <p className="text-center text-xs mb-6 opacity-50 story-text">*เว็บนี้ไม่มีการเก็บข้อมูลของคุณ</p>
        <div className="flex justify-center">
          <button
            onClick={() => name.trim() && onNext(name.trim())}
            className="ink-btn text-base px-8 py-3"
            style={{ opacity: name.trim() ? 1 : 0.45 }}>
            เริ่มเล่น
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Story scene ──────────────────────────────────────────────────────────────
function SceneScreen({
  lines, illustIdx, onNext,
}: { lines: string[]; illustIdx: number; onNext: () => void }) {
  const { visible, done } = useTypewriter(lines, true);
  const Illus = ILLUSTRATIONS[illustIdx] ?? ILLUSTRATIONS[0];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 paper-bg">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <div className="animate-fade-blur-in w-full"><Illus/></div>

        <div className="w-full min-h-[130px]">
          {lines.slice(0, visible).map((line, i) => (
            <p key={i} className="story-text animate-draw-in mb-1"
              style={{
                color:       line.startsWith('"') ? "#C62828" : "#2a2a2a",
                fontStyle:   line.startsWith('"') ? "italic"  : "normal",
                fontWeight:  line.startsWith('"') ? 600 : 400,
                fontSize:    line === "" ? "0.35rem" : "1rem",
                animationFillMode: "both",
              }}>
              {line || " "}
            </p>
          ))}
        </div>

        {done && (
          <button onClick={onNext} className="ink-btn animate-fade-blur-in mt-2 px-8">
            ไปต่อ
          </button>
        )}
      </div>
    </div>
  );
}

// ── Question screen ───────────────────────────────────────────────────────────
function QuestionScreen({
  beat, qNum, totalQ, illustIdx, onAnswer,
}: {
  beat: Extract<Beat, { kind: "question" }>;
  qNum: number; totalQ: number; illustIdx: number;
  onAnswer: (cake: CakeType) => void;
}) {
  const [selected, setSelected] = useState<CakeType | null>(null);
  const Illus = ILLUSTRATIONS[illustIdx] ?? ILLUSTRATIONS[0];

  return (
    <div className="flex flex-col items-center min-h-screen p-6 paper-bg pt-8">
      <div className="w-full max-w-sm animate-slide-up">

        {/* Illustration */}
        <div className="animate-fade-blur-in w-full mb-5"><Illus/></div>

        {/* Progress dots */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(198,40,40,0.12)" }}>
            <div className="h-full rounded-full transition-all duration-700"
              style={{ width: `${(qNum / totalQ) * 100}%`, background: "linear-gradient(90deg,#C62828,#FBC02D)" }}/>
          </div>
          <span className="text-xs font-bold" style={{ color: "#C62828", fontFamily: "'Sarabun',sans-serif" }}>
            {qNum}/{totalQ}
          </span>
        </div>

        {/* Question text */}
        <p className="story-text text-base font-semibold mb-5 leading-relaxed whitespace-pre-line"
          style={{ color: "#1a1a1a" }}>
          {beat.text}
        </p>

        {/* 5-choice list */}
        <div className="space-y-3 mb-8">
          {beat.choices.map((c, i) => (
            <div key={i} className="animate-choice-in"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both", opacity: 0 }}>
              <SketchChoiceBox selected={selected === c.cake} onClick={() => setSelected(c.cake)}>
                <span className="story-text text-sm leading-relaxed"
                  style={{ color: selected === c.cake ? "#C62828" : "#2a2a2a",
                           fontWeight: selected === c.cake ? 700 : 400 }}>
                  {c.text}
                </span>
              </SketchChoiceBox>
            </div>
          ))}
        </div>

        {/* Confirm */}
        <div className="flex justify-center">
          <button onClick={() => selected && onAnswer(selected)}
            className="ink-btn px-10 py-2.5 text-base transition-opacity duration-300"
            style={{ opacity: selected ? 1 : 0.35, pointerEvents: selected ? "auto" : "none" }}>
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Ending screen ─────────────────────────────────────────────────────────────
function EndingScreen({ name, onReveal }: { name: string; onReveal: () => void }) {
  const IllusGift = ILLUSTRATIONS[4];
  const lines = [
    `${name} …`, "",
    "อย่าลืมที่จะให้รางวัลตัวเองบ้างนะ", "",
    "คุณน่ะ เก่งมาก ๆ แล้ว",
    "ที่ใช้ชีวิตอย่างแข็งแกร่งอยู่ในทุกวันนี้", "",
    "ขอมอบเค้กชิ้นนี้",
    "ให้เป็นรางวัลคนเก่งที่พยายามอยู่ในทุกวันนี้นะ",
  ];
  const { visible, done } = useTypewriter(lines, true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 paper-bg">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        <div className="animate-fade-blur-in w-full"><IllusGift/></div>
        <div className="w-full min-h-[150px] text-center">
          {lines.slice(0, visible).map((line, i) => (
            <p key={i} className="story-text animate-draw-in"
              style={{
                fontSize:    i === 0 ? "1.25rem" : "1rem",
                fontWeight:  i === 0 ? 700 : 400,
                color:       i === 0 ? "#C62828" : "#2a2a2a",
                marginBottom: line === "" ? "0.5rem" : "0.15rem",
                animationFillMode: "both",
              }}>
              {line || " "}
            </p>
          ))}
        </div>
        {done && (
          <button onClick={onReveal} className="ink-btn animate-fade-blur-in px-10 py-3 text-base mt-2">
            คลิกเพื่อดูผลลัพธ์ของคุณ
          </button>
        )}
      </div>
    </div>
  );
}

// ── Root page ─────────────────────────────────────────────────────────────────
type Phase = "warning" | "name" | "beats" | "ending";

export default function QuizPage() {
  const router = useRouter();
  const [phase, setPhase]   = useState<Phase>("warning");
  const [name,  setName]    = useState("เพื่อน");
  const [beatIdx, setBeatIdx] = useState(0);
  const [scores, setScores] = useState<ScoreMap>({
    vanilla: 0, matcha: 0, chocolate: 0, strawberry: 0, cookie: 0,
  });

  const questions = BEATS.filter(b => b.kind === "question");
  const totalQ    = questions.length;
  const answeredSoFar = Object.values(scores).reduce((a, b) => a + b, 0);

  const beat = BEATS[beatIdx];

  const nextBeat = useCallback(() => setBeatIdx(i => Math.min(i + 1, BEATS.length - 1)), []);

  const handleAnswer = useCallback((cake: CakeType) => {
    setScores(prev => ({ ...prev, [cake]: prev[cake] + 1 }));
    // Portal SFX when user picks a door (beat 8 = Q3 "choose a door")
    if (beatIdx === 8) {
      window.dispatchEvent(new CustomEvent("game-sfx", { detail: "portal" }));
    }
    nextBeat();
  }, [nextBeat, beatIdx]);

  // Rain ambience on city/rain scene (beat 0, illus 0)
  useEffect(() => {
    if (phase !== "beats") {
      window.dispatchEvent(new CustomEvent("game-scene", { detail: "none" }));
      return;
    }
    const b = BEATS[beatIdx];
    const isRain = b && b.illus === 0;
    window.dispatchEvent(new CustomEvent("game-scene", { detail: isRain ? "rain" : "none" }));
  }, [phase, beatIdx]);

  const handleReveal = useCallback(() => {
    const type = calcResult(scores);
    router.push(`/result?type=${type}&name=${encodeURIComponent(name)}`);
  }, [scores, name, router]);

  // After last beat → go to ending
  const isLastBeat = beatIdx >= BEATS.length - 1;

  if (phase === "warning") return <WarningScreen onNext={() => setPhase("name")}/>;
  if (phase === "name")    return <NameScreen onNext={n => { setName(n); setPhase("beats"); }}/>;

  if (phase === "beats") {
    if (!beat || isLastBeat) {
      // Reached ending story — still show it, then trigger ending
    }

    if (!beat) {
      setPhase("ending");
      return null;
    }

    if (beat.kind === "story") {
      const isEnding = beatIdx === BEATS.length - 1;
      return (
        <SceneScreen
          lines={beat.text}
          illustIdx={beat.illus}
          onNext={() => {
            if (isEnding) setPhase("ending");
            else nextBeat();
          }}
        />
      );
    }

    if (beat.kind === "question") {
      return (
        <QuestionScreen
          beat={beat}
          qNum={answeredSoFar + 1}
          totalQ={totalQ}
          illustIdx={beat.illus}
          onAnswer={handleAnswer}
        />
      );
    }
  }

  if (phase === "ending") return <EndingScreen name={name} onReveal={handleReveal}/>;

  return null;
}
