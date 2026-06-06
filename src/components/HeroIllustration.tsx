"use client";

export function HeroIllustration() {
  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: "280px" }}>
      {/* Main cake */}
      <div className="animate-float" style={{ animationDuration: "4s" }}>
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Plate shadow */}
          <ellipse cx="110" cy="200" rx="70" ry="10" fill="#E8D4B0" opacity="0.5"/>

          {/* Bottom cake tier */}
          <rect x="40" y="150" width="140" height="50" rx="12" fill="#C62828"/>
          <rect x="40" y="150" width="140" height="14" rx="6" fill="#D32F2F"/>
          {/* Frosting drips bottom */}
          <path d="M50 150 Q55 138 60 150 Q65 138 70 150 Q75 138 80 150 Q85 138 90 150 Q95 138 100 150 Q105 138 110 150 Q115 138 120 150 Q125 138 130 150 Q135 138 140 150 Q145 138 150 150 Q155 138 160 150 Q165 138 170 150" stroke="#F8F1E5" strokeWidth="5" fill="none" strokeLinecap="round"/>

          {/* Middle cake tier */}
          <rect x="60" y="100" width="100" height="55" rx="10" fill="#D32F2F"/>
          <rect x="60" y="100" width="100" height="12" rx="5" fill="#C62828"/>
          {/* Frosting drips middle */}
          <path d="M68 100 Q73 90 78 100 Q83 90 88 100 Q93 90 98 100 Q103 90 108 100 Q113 90 118 100 Q123 90 128 100 Q133 90 138 100 Q143 90 148 100 Q153 90 152 100" stroke="#FFF4D6" strokeWidth="4.5" fill="none" strokeLinecap="round"/>

          {/* Top cake tier */}
          <rect x="78" y="58" width="64" height="47" rx="9" fill="#C62828"/>
          <rect x="78" y="58" width="64" height="11" rx="5" fill="#B71C1C"/>
          {/* Frosting drips top */}
          <path d="M85 58 Q90 49 95 58 Q100 49 105 58 Q110 49 115 58 Q120 49 125 58 Q130 49 133 58" stroke="#F8F1E5" strokeWidth="4" fill="none" strokeLinecap="round"/>

          {/* Cream dollops on top */}
          <ellipse cx="110" cy="54" rx="26" ry="12" fill="#FFF4D6"/>
          <ellipse cx="110" cy="52" rx="22" ry="10" fill="white"/>
          {/* Cream peak */}
          <path d="M110 38 Q115 44 118 50 Q112 47 110 50 Q108 47 102 50 Q105 44 110 38Z" fill="white"/>

          {/* Candle */}
          <rect x="105" y="20" width="10" height="22" rx="4" fill="#FFD54F"/>
          <rect x="105" y="20" width="10" height="8" rx="4" fill="#FBC02D"/>
          {/* Flame */}
          <path d="M110 14 Q116 8 114 4 Q112 1 110 3 Q108 1 106 4 Q104 8 110 14Z" fill="#FBC02D"/>
          <path d="M110 13 Q114 9 112 6 Q110 4 110 7 Q110 4 108 6 Q106 9 110 13Z" fill="#FFD54F"/>
          <circle cx="110" cy="10" r="2" fill="white" opacity="0.7"/>

          {/* Decorative dots on bottom tier */}
          <circle cx="65" cy="170" r="3" fill="#FFD54F"/>
          <circle cx="80" cy="165" r="2.5" fill="#FFF4D6" opacity="0.7"/>
          <circle cx="95" cy="172" r="3" fill="#FFD54F"/>
          <circle cx="110" cy="168" r="2.5" fill="#FFF4D6" opacity="0.7"/>
          <circle cx="125" cy="172" r="3" fill="#FFD54F"/>
          <circle cx="140" cy="165" r="2.5" fill="#FFF4D6" opacity="0.7"/>
          <circle cx="155" cy="170" r="3" fill="#FFD54F"/>

          {/* Cherry on top */}
          <circle cx="110" cy="4" r="0" fill="none"/>
        </svg>
      </div>

      {/* Orbiting personality icons */}
      <div className="absolute animate-float-reverse delay-300" style={{ top: "20px", left: "30px" }}>
        <div className="w-14 h-14 rounded-2xl frosting-card flex items-center justify-center shadow-md">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="12" r="6" fill="#C62828"/>
            <path d="M6 26 C6 20 10 18 16 18 C22 18 26 20 26 26" fill="#C62828"/>
            <circle cx="12" cy="11" r="1.5" fill="white"/>
            <circle cx="20" cy="11" r="1.5" fill="white"/>
            <path d="M12 14 Q16 17 20 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          </svg>
        </div>
      </div>

      <div className="absolute animate-float delay-600" style={{ top: "20px", right: "30px" }}>
        <div className="w-14 h-14 rounded-2xl frosting-card flex items-center justify-center shadow-md">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 4 L20 12 L28 13 L22 19 L23.5 27 L16 23 L8.5 27 L10 19 L4 13 L12 12 Z" fill="#FBC02D"/>
          </svg>
        </div>
      </div>

      <div className="absolute animate-float-slow delay-1000" style={{ bottom: "30px", left: "20px" }}>
        <div className="w-12 h-12 rounded-2xl frosting-card flex items-center justify-center shadow-md">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M13 3 C13 3 5 8 5 14 C5 18.4 8.6 22 13 22 C17.4 22 21 18.4 21 14 C21 8 13 3 13 3Z" fill="#C62828"/>
            <path d="M13 3 C13 3 8 7 8 13 C8 14.5 8.5 16 9.5 17" stroke="#FFD54F" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      <div className="absolute animate-float-reverse delay-800" style={{ bottom: "30px", right: "20px" }}>
        <div className="w-12 h-12 rounded-2xl frosting-card flex items-center justify-center shadow-md">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <rect x="4" y="4" width="18" height="18" rx="5" fill="#FFD54F"/>
            <circle cx="9" cy="10" r="1.5" fill="#C62828"/>
            <circle cx="17" cy="10" r="1.5" fill="#C62828"/>
            <path d="M8 15 Q13 19 18 15" stroke="#C62828" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
