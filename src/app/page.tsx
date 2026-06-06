"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FloatingDecorations } from "@/components/FloatingDecorations";
import { HeroIllustration } from "@/components/HeroIllustration";

const PERSONALITY_BADGES = [
  { label: "The Dreamer", emoji: "🌙", color: "#C62828" },
  { label: "The Creator", emoji: "✨", color: "#D32F2F" },
  { label: "The Guardian", emoji: "🌿", color: "#6B8C5A" },
  { label: "The Explorer", emoji: "🔥", color: "#FBC02D" },
];

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
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 20%, rgba(198,40,40,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Top nav */}
      <nav className="relative z-10 w-full max-w-lg flex items-center justify-between px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm"
            style={{ background: "#C62828" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2 C9 2 4 5.5 4 9.5 C4 12.5 6.2 15 9 15 C11.8 15 14 12.5 14 9.5 C14 5.5 9 2 9 2Z" fill="white"/>
              <circle cx="9" cy="9.5" r="2.5" fill="#FFD54F"/>
            </svg>
          </div>
          <span className="font-black tracking-tight text-lg" style={{ fontFamily: "'Fredoka One', cursive", color: "#C62828" }}>
            CrackTheCake
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "#FFD54F", color: "#5C3D0A" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1 L7 4.5 L10.5 4.5 L7.8 6.7 L8.8 10 L6 8 L3.2 10 L4.2 6.7 L1.5 4.5 L5 4.5 Z" fill="#C62828"/>
          </svg>
          Free Quiz
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
          <div className="flex flex-wrap justify-center gap-2 px-4 pb-5 pt-1">
            {PERSONALITY_BADGES.map((badge) => (
              <div key={badge.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-transform hover:scale-105 cursor-default" style={{ background: "white", border: `2px solid ${badge.color}`, color: badge.color, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <span>{badge.emoji}</span>
                {badge.label}
              </div>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-center text-base leading-relaxed mb-8 animate-slide-up delay-400 max-w-sm" style={{ color: "#7A5C50", fontWeight: 600 }}>
          Answer a few simple questions and discover your unique personality.
          <br />
          <span style={{ color: "#C62828" }}>Takes only 5 minutes.</span>
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

        <p className="text-xs text-center mb-8 animate-slide-up delay-600" style={{ color: "#B09080" }}>
          This quiz is for entertainment purposes only.
        </p>

        {/* How it works */}
        <div className="mt-4 w-full animate-slide-up delay-800">
          <p className="text-center text-xs font-bold uppercase tracking-widest mb-5" style={{ color: "#C4A882" }}>How It Works</p>
          <div className="flex items-start justify-between gap-2">
            {[
              { step: "01", label: "Start", icon: "🎂", desc: "Begin your journey" },
              { step: "02", label: "Answer", icon: "💬", desc: "5 quick questions" },
              { step: "03", label: "Discover", icon: "✨", desc: "Your personality type" },
            ].map((item) => (
              <div key={item.step} className="flex-1 flex flex-col items-center text-center gap-2">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "white", border: "2.5px solid #E8D4B0", boxShadow: "0 4px 12px rgba(198,40,40,0.08)" }}>
                  {item.icon}
                </div>
                <span className="text-xs font-black" style={{ color: "#C62828", fontFamily: "'Fredoka One', cursive" }}>{item.step}</span>
                <span className="text-xs font-bold" style={{ color: "#5C3D30" }}>{item.label}</span>
                <span className="text-xs" style={{ color: "#A08070" }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="relative z-10 w-full text-center py-6 text-xs" style={{ color: "#C4A882", borderTop: "1px solid #E8D4B0" }}>
        <span style={{ fontFamily: "'Fredoka One', cursive", color: "#C62828" }}>CrackTheCake</span> · Placeholder content · All personality types TBD
      </footer>
    </div>
  );
}
