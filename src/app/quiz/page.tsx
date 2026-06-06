"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { BEATS, calcResult, type Beat, type CakeType } from "./data";
import { SketchBox, SketchChoiceBox } from "@/components/SketchBox";
import { ILLUSTRATIONS } from "@/components/StoryIllustrations";

// ── Typewriter hook ─────────────────────────────────────────────────────────
function useTypewriter(lines: string[], active: boolean) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    setVisibleLines(0);
    setDone(false);
    let idx = 0;
    const tick = () => {
      idx++;
      setVisibleLines(idx);
      if (idx < lines.length) setTimeout(tick, lines[idx - 1] === "" ? 300 : 700);
      else setDone(true);
    };
    const t = setTimeout(tick, 400);
    return () => clearTimeout(t);
  }, [active, lines.join("|")]);

  return { visibleLines, done };
}

// ── Warning screen ──────────────────────────────────────────────────────────
function WarningScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 paper-bg">
      <div className="w-full max-w-md animate-fade-blur-in">
        <SketchBox className="p-10">
          <h2 className="text-center font-bold text-xl mb-5" style={{ color: "#2C5F2E", fontFamily: "'Sarabun', sans-serif" }}>
            คำเตือน
          </h2>
          <div className="story-text text-center space-y-3 text-sm leading-loose" style={{ color: "#333" }}>
            <p>เว็บนี้มีเนื้อหาเกี่ยวกับการเติบโต และสภาพจิตใจ<br />โปรดประเมินความมั่นคงของจิตใจก่อนกดเล่น</p>
            <p>หากรู้สึกว่าไม่ไหวสามารถกดออกได้ตลอดเวลา</p>
            <p>ทางเรามีความยินดีอย่างยิ่งที่คุณจะให้ความสำคัญ<br />กับสภาพจิตใจตัวเองมาเป็นอันดับแรก</p>
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

// ── Name screen ─────────────────────────────────────────────────────────────
function NameScreen({ onNext }: { onNext: (name: string) => void }) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen p-6 paper-bg">
      <div className="w-full max-w-sm animate-slide-up">
        <p className="text-center story-text text-lg font-medium mb-10" style={{ color: "#2a2a2a" }}>
          คุณเคยรู้สึกเหมือนเป็น<br />ตัวประกอบของโลกใบนี้มั้ย
        </p>
        <div className="space-y-8 mb-10">
          <div>
            <label className="story-text text-base font-semibold block mb-2" style={{ color: "#2C5F2E" }}>ชื่อ</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              className="sketch-input"
              placeholder="ชื่อของคุณ"
            />
          </div>
          <div>
            <label className="story-text text-base font-semibold block mb-2" style={{ color: "#2C5F2E" }}>อายุ</label>
            <input
              value={age}
              onChange={e => setAge(e.target.value)}
              className="sketch-input"
              placeholder="อายุของคุณ"
              type="number"
            />
          </div>
        </div>
        <p className="text-center text-xs mb-6 opacity-50 story-text">*เว็บนี้ไม่มีการเก็บข้อมูลของคุณ</p>
        <div className="flex justify-center">
          <button
            onClick={() => name.trim() && onNext(name.trim())}
            className="ink-btn text-base px-8 py-3"
            style={{ opacity: name.trim() ? 1 : 0.5 }}
          >
            เริ่มเล่น
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Scene screen ─────────────────────────────────────────────────────────────
function SceneScreen({
  lines, sceneIdx, onNext,
}: {
  lines: string[]; sceneIdx: number; onNext: () => void;
}) {
  const { visibleLines, done } = useTypewriter(lines, true);
  const Illus = ILLUSTRATIONS[sceneIdx] ?? ILLUSTRATIONS[0];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 paper-bg">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        {/* Illustration */}
        <div className="animate-fade-blur-in w-full">
          <Illus />
        </div>

        {/* Narration text */}
        <div className="w-full min-h-[120px]">
          {lines.slice(0, visibleLines).map((line, i) => (
            <p
              key={i}
              className="story-text animate-draw-in mb-1"
              style={{
                color: line.startsWith('"') ? "#2C5F2E" : "#2a2a2a",
                fontStyle: line.startsWith('"') ? "italic" : "normal",
                fontWeight: line.startsWith('"') ? 600 : 400,
                fontSize: line === "" ? "0.4rem" : "1rem",
                animationFillMode: "both",
              }}
            >
              {line || " "}
            </p>
          ))}
        </div>

        {/* Continue button */}
        {done && (
          <button onClick={onNext} className="ink-btn animate-fade-blur-in mt-2 px-8">
            ไปต่อ
          </button>
        )}
      </div>
    </div>
  );
}

// ── Question screen ──────────────────────────────────────────────────────────
function QuestionScreen({
  beat, questionNumber, totalQuestions, onAnswer,
}: {
  beat: Extract<Beat, { type: "question" }>;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (cake: CakeType) => void;
}) {
  const [selected, setSelected] = useState<CakeType | null>(null);

  const confirm = () => { if (selected) onAnswer(selected); };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 paper-bg pt-12">
      <div className="w-full max-w-sm animate-slide-up">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: "rgba(44,95,46,0.15)" }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${(questionNumber / totalQuestions) * 100}%`, background: "#2C5F2E" }}
            />
          </div>
          <span className="text-xs font-semibold" style={{ color: "#2C5F2E", fontFamily: "'Sarabun',sans-serif" }}>
            {questionNumber}/{totalQuestions}
          </span>
        </div>

        {/* Question */}
        <p className="story-text text-lg font-semibold mb-6 leading-relaxed" style={{ color: "#1a1a1a" }}>
          {beat.text}
        </p>

        {/* Choices */}
        <div className="space-y-3 mb-8">
          {beat.choices.map((c, i) => (
            <div
              key={c.cake + i}
              className="animate-choice-in"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both", opacity: 0 }}
            >
              <SketchChoiceBox
                selected={selected === c.cake}
                onClick={() => setSelected(c.cake)}
              >
                <span
                  className="story-text text-sm leading-relaxed"
                  style={{ color: selected === c.cake ? "#2C5F2E" : "#2a2a2a", fontWeight: selected === c.cake ? 600 : 400 }}
                >
                  {c.text}
                </span>
              </SketchChoiceBox>
            </div>
          ))}
        </div>

        {/* Next */}
        <div className="flex justify-center">
          <button
            onClick={confirm}
            className="ink-btn px-10 py-2.5 text-base"
            style={{ opacity: selected ? 1 : 0.35, pointerEvents: selected ? "auto" : "none" }}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Ending screen ────────────────────────────────────────────────────────────
function EndingScreen({ name, onReveal }: { name: string; onReveal: () => void }) {
  const lines = [
    `${name} …`,
    "",
    "อย่าลืมที่จะให้รางวัลตัวเองบ้างนะ",
    "",
    `คุณน่ะ เก่งมาก ๆ แล้ว`,
    "ที่ใช้ชีวิตอย่างแข็งแกร่งอยู่ในทุกวันนี้",
    "",
    "ขอมอบเค้กชิ้นนี้",
    "ให้เป็นรางวัลคนเก่งที่พยายามอยู่ในทุกวันนี้นะ",
  ];
  const { visibleLines, done } = useTypewriter(lines, true);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 paper-bg">
      <div className="w-full max-w-sm flex flex-col items-center gap-6">
        {/* Simple cake SVG */}
        <div className="animate-float">
          <svg viewBox="0 0 160 160" width="160" height="160" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="sk-end" x="-10%" y="-10%" width="120%" height="120%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="3"/>
                <feDisplacementMap in="SourceGraphic" scale="2.5"/>
              </filter>
            </defs>
            <g filter="url(#sk-end)" stroke="#2C5F2E" strokeLinecap="round">
              <rect x="20" y="100" width="120" height="48" rx="10" strokeWidth="2" fill="rgba(44,95,46,.06)"/>
              <path d="M20 100 Q30 86 40 100 Q50 86 60 100 Q70 86 80 100 Q90 86 100 100 Q110 86 120 100 Q130 86 140 100" strokeWidth="2" fill="none"/>
              <rect x="38" y="62" width="84" height="42" rx="8" strokeWidth="2" fill="rgba(44,95,46,.07)"/>
              <path d="M38 62 Q46 50 54 62 Q62 50 70 62 Q78 50 86 62 Q94 50 102 62 Q110 50 118 62 Q122 50 122 62" strokeWidth="1.8" fill="none"/>
              <rect x="55" y="30" width="50" height="36" rx="6" strokeWidth="2" fill="rgba(44,95,46,.08)"/>
              <path d="M55 30 Q61 20 67 30 Q73 20 79 30 Q85 20 91 30 Q97 20 105 30" strokeWidth="1.6" fill="none"/>
              <ellipse cx="80" cy="26" rx="22" ry="10" strokeWidth="1.8" fill="rgba(44,95,46,.05)"/>
              <line x1="80" y1="16" x2="80" y2="2" strokeWidth="2"/>
              <path d="M80 0 Q85 -4 83 2 Q80 6 77 2 Q75 -4 80 0Z" strokeWidth="1" fill="rgba(251,192,45,.3)"/>
              {[40,60,80,100,120].map((x,i)=><circle key={i} cx={x} cy={118} r="3" strokeWidth="1.5" fill="rgba(251,192,45,.2)"/>)}
            </g>
          </svg>
        </div>

        {/* Narration */}
        <div className="w-full min-h-[140px] text-center">
          {lines.slice(0, visibleLines).map((line, i) => (
            <p
              key={i}
              className="story-text animate-draw-in"
              style={{
                fontSize: i === 0 ? "1.25rem" : "1rem",
                fontWeight: i === 0 ? 700 : 400,
                color: i === 0 ? "#2C5F2E" : "#2a2a2a",
                marginBottom: line === "" ? "0.5rem" : "0.15rem",
                animationFillMode: "both",
              }}
            >
              {line || " "}
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

// ── Main orchestrator ────────────────────────────────────────────────────────
export default function QuizPage() {
  const router = useRouter();
  const [beatIdx, setBeatIdx] = useState(0);
  const [name, setName] = useState("เพื่อน");
  const [answers, setAnswers] = useState<Record<number, CakeType>>({});

  const totalQ = BEATS.filter(b => b.type === "question").length;
  const answeredSoFar = Object.keys(answers).length;

  const beat = BEATS[beatIdx];

  const next = useCallback(() => setBeatIdx(i => i + 1), []);

  const handleAnswer = useCallback((qid: number, cake: CakeType) => {
    setAnswers(prev => ({ ...prev, [qid]: cake }));
    setBeatIdx(i => i + 1);
  }, []);

  const handleReveal = useCallback(() => {
    const result = calcResult(answers);
    router.push(`/result?type=${result}&name=${encodeURIComponent(name)}`);
  }, [answers, name, router]);

  if (!beat) return null;

  if (beat.type === "warning") return <WarningScreen onNext={next} />;
  if (beat.type === "name") return <NameScreen onNext={(n) => { setName(n); next(); }} />;
  if (beat.type === "scene") return (
    <SceneScreen lines={beat.lines} sceneIdx={beat.scene} onNext={next} />
  );
  if (beat.type === "question") return (
    <QuestionScreen
      beat={beat}
      questionNumber={answeredSoFar + 1}
      totalQuestions={totalQ}
      onAnswer={(cake) => handleAnswer(beat.id, cake)}
    />
  );
  if (beat.type === "ending") return (
    <EndingScreen name={name} onReveal={handleReveal} />
  );

  return null;
}
