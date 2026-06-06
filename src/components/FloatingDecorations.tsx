"use client";

export function FloatingDecorations() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {/* Top-left cherry cluster */}
      <div className="absolute top-10 left-8 animate-float delay-200">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <circle cx="10" cy="18" r="8" fill="#C62828" />
          <circle cx="10" cy="18" r="5" fill="#D32F2F" opacity="0.5" />
          <path d="M10 10 Q14 4 20 6" stroke="#6B8C5A" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
          <circle cx="20" cy="6" r="1.5" fill="#6B8C5A"/>
        </svg>
      </div>

      <div className="absolute top-20 left-16 animate-float-reverse delay-500">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1 L9.5 5.5 L14.5 5.5 L10.5 8.5 L12 13 L8 10 L4 13 L5.5 8.5 L1.5 5.5 L6.5 5.5 Z" fill="#FFD54F"/>
        </svg>
      </div>

      {/* Top-right sparkles */}
      <div className="absolute top-8 right-12 animate-twinkle delay-300">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2 L12.5 9.5 L20 11 L12.5 12.5 L11 20 L9.5 12.5 L2 11 L9.5 9.5 Z" fill="#FBC02D"/>
        </svg>
      </div>
      <div className="absolute top-24 right-24 animate-twinkle delay-1000">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1 L8 5.5 L12.5 7 L8 8.5 L7 13 L6 8.5 L1.5 7 L6 5.5 Z" fill="#FFD54F" opacity="0.7"/>
        </svg>
      </div>

      {/* Left mid — swirl */}
      <div className="absolute top-1/3 left-6 animate-float-slow delay-700">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4 C8 4 4 10 6 16 C8 22 16 24 20 20 C24 16 22 10 18 10 C14 10 12 14 14 16 C16 18 18 16 17 15" stroke="#E8D4B0" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        </svg>
      </div>

      {/* Right mid — dots cluster */}
      <div className="absolute top-1/3 right-8 animate-pulse-soft delay-400">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="6" cy="6" r="3" fill="#FFD54F" opacity="0.8"/>
          <circle cx="18" cy="4" r="2" fill="#FBC02D" opacity="0.6"/>
          <circle cx="30" cy="8" r="3.5" fill="#FFD54F" opacity="0.7"/>
          <circle cx="10" cy="18" r="2.5" fill="#E8D4B0" opacity="0.9"/>
          <circle cx="26" cy="20" r="2" fill="#FBC02D" opacity="0.5"/>
          <circle cx="18" cy="28" r="3" fill="#FFD54F" opacity="0.7"/>
        </svg>
      </div>

      {/* Bottom-left — small heart */}
      <div className="absolute bottom-32 left-10 animate-bounce-gentle delay-600">
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
          <path d="M10 16 C10 16 2 11 2 5.5 C2 3 4 1 6.5 1 C8 1 9.5 1.8 10 3 C10.5 1.8 12 1 13.5 1 C16 1 18 3 18 5.5 C18 11 10 16 10 16Z" fill="#C62828" opacity="0.6"/>
        </svg>
      </div>

      {/* Bottom-right — star + cherry */}
      <div className="absolute bottom-40 right-10 animate-float delay-1500">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 1 L10.5 6.5 L16 6.5 L11.5 10 L13 15.5 L9 12 L5 15.5 L6.5 10 L2 6.5 L7.5 6.5 Z" fill="#FFD54F"/>
        </svg>
      </div>

      <div className="absolute bottom-20 right-16 animate-float-reverse delay-2000">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="8" cy="16" r="7" fill="#C62828" opacity="0.7"/>
          <path d="M8 9 Q13 3 18 5" stroke="#6B8C5A" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <circle cx="18" cy="5" r="1.5" fill="#6B8C5A"/>
        </svg>
      </div>

      {/* Center-left curved line */}
      <div className="absolute top-1/2 left-3 animate-wiggle delay-800 opacity-40">
        <svg width="20" height="60" viewBox="0 0 20 60" fill="none">
          <path d="M10 5 Q18 20 10 30 Q2 40 10 55" stroke="#E8D4B0" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        </svg>
      </div>

      {/* Top-center sparkle dot */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 animate-twinkle delay-1000">
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <circle cx="5" cy="5" r="4" fill="#FFD54F" opacity="0.5"/>
        </svg>
      </div>

      {/* Bottom center dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-pulse-soft delay-2500">
        <svg width="60" height="12" viewBox="0 0 60 12" fill="none">
          <circle cx="6" cy="6" r="3" fill="#E8D4B0"/>
          <circle cx="20" cy="6" r="2" fill="#FFD54F" opacity="0.7"/>
          <circle cx="32" cy="6" r="3.5" fill="#E8D4B0"/>
          <circle cx="44" cy="6" r="2" fill="#FFD54F" opacity="0.7"/>
          <circle cx="56" cy="6" r="3" fill="#E8D4B0"/>
        </svg>
      </div>
    </div>
  );
}
