"use client";

import { useRouter } from "next/navigation";
import { FloatingDecorations } from "@/components/FloatingDecorations";
import { HeroIllustration } from "@/components/HeroIllustration";


export default function HomePage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen relative flex flex-col items-center"
      style={{ background: "linear-gradient(180deg, #FFF8EE 0%, #FFF4D6 60%, #F8F1E5 100%)" }}
    >
      <FloatingDecorations />

      <div
        className="pointer-events-none fixed inset-0"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(198,40,40,0.06) 0%, transparent 70%)" }}
      />

      {/* Top nav — no Free Quiz badge */}
      <nav className="relative z-10 w-full max-w-lg flex items-center justify-start px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm" style={{ background: "#C62828" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2 C9 2 4 5.5 4 9.5 C4 12.5 6.2 15 9 15 C11.8 15 14 12.5 14 9.5 C14 5.5 9 2 9 2Z" fill="white"/>
              <circle cx="9" cy="9.5" r="2.5" fill="#FFD54F"/>
            </svg>
          </div>
          <span className="font-black tracking-tight text-lg" style={{ fontFamily: "'Fredoka One', cursive", color: "#C62828" }}>
            CrackTheCake
          </span>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center w-full max-w-lg px-6 pt-4 pb-12">

        {/* Title */}
        <div className="text-center mb-6 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider uppercase" style={{ background: "rgba(198,40,40,0.1)", color: "#C62828" }}>
            <span>✦</span> Personality Quiz <span>✦</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-3" style={{ fontFamily: "'Fredoka One', cursive", color: "#2C1810", letterSpacing: "-0.5px" }}>
            What Personality
            <br />
            <span style={{ color: "#C62828" }}>Type Are You?</span>
          </h1>
        </div>

        {/* Hero card */}
        <div className="w-full frosting-card rounded-3xl overflow-hidden mb-6 animate-slide-up delay-200">
          <div className="w-full h-2.5" style={{ background: "repeating-linear-gradient(90deg, #C62828 0px, #C62828 20px, #FFD54F 20px, #FFD54F 40px)" }}/>
          <div className="p-4 pb-2">
            <HeroIllustration />
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-center text-base leading-relaxed mb-8 animate-slide-up delay-400 max-w-sm" style={{ color: "#7A5C50", fontWeight: 600 }}>
          ตอบคำถามง่ายๆ แล้วค้นพบบุคลิกภาพที่ไม่เหมือนใครของคุณ
          <br />
          <span style={{ color: "#C62828" }}>ใช้เวลาเพียง 5 นาที</span>
        </p>

        {/* CTA */}
        <div className="animate-slide-up delay-500 w-full max-w-xs mb-3">
          <button
            onClick={() => router.push("/quiz")}
            className="cta-button w-full flex items-center justify-center gap-3 rounded-full text-lg font-black py-4 px-8"
            style={{ fontFamily: "'Fredoka One', cursive", letterSpacing: "0.5px" }}
          >
            Start Quiz
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm" style={{ background: "#C62828" }}>→</span>
          </button>
        </div>

        <p className="text-xs text-center animate-slide-up delay-600" style={{ color: "#B09080" }}>
          แบบทดสอบนี้จัดทำขึ้นเพื่อความบันเทิงเท่านั้น
        </p>
      </main>

      <footer className="relative z-10 w-full text-center py-6 text-xs" style={{ color: "#C4A882", borderTop: "1px solid #E8D4B0" }}>
        <span style={{ fontFamily: "'Fredoka One', cursive", color: "#C62828" }}>CrackTheCake</span> · All personality types TBD
      </footer>
    </div>
  );
}
