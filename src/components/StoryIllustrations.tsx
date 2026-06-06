"use client";

const FILTER = (
  <defs>
    <filter id="sk" x="-10%" y="-10%" width="120%" height="120%">
      <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="7" result="n"/>
      <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
);

/* ── Scene 0 : rainy city night ── */
export function IllustrationCity() {
  return (
    <svg viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
      {FILTER}
      <g filter="url(#sk)" stroke="#2C5F2E" strokeLinecap="round">
        {/* Buildings */}
        <rect x="20"  y="90"  width="40" height="100" strokeWidth="2" fill="rgba(44,95,46,.07)" rx="2"/>
        <rect x="70"  y="60"  width="55" height="130" strokeWidth="2" fill="rgba(44,95,46,.07)" rx="2"/>
        <rect x="140" y="80"  width="45" height="110" strokeWidth="2" fill="rgba(44,95,46,.07)" rx="2"/>
        <rect x="195" y="110" width="50" height="80"  strokeWidth="2" fill="rgba(44,95,46,.07)" rx="2"/>
        {/* Windows */}
        {[30,40,50,60].map(y => <rect key={y} x="30" y={y+50} width="8" height="8" strokeWidth="1.5" fill="rgba(251,192,45,.3)"/>)}
        {[30,50,70,90].map(y => [80,100,115].map(x => <rect key={`${x}${y}`} x={x} y={y+30} width="9" height="9" strokeWidth="1.5" fill="rgba(251,192,45,.25)"/>))}
        {/* Rain */}
        {Array.from({length:18}).map((_,i) => {
          const x = 10 + (i*14)%250;
          const y = 5  + (i*23)%60;
          return <line key={i} x1={x} y1={y} x2={x-4} y2={y+14} strokeWidth="1.2" opacity="0.5"/>;
        })}
        {/* Ground */}
        <line x1="0" y1="195" x2="260" y2="195" strokeWidth="2.5"/>
        {/* Puddle reflection */}
        <ellipse cx="130" cy="198" rx="55" ry="4" strokeWidth="1.5" opacity="0.3"/>
      </g>
    </svg>
  );
}

/* ── Scene 1 : cozy room (question scene) ── */
export function IllustrationRoom() {
  return (
    <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
      {FILTER}
      <g filter="url(#sk)" stroke="#2C5F2E" strokeLinecap="round">
        {/* Window */}
        <rect x="85" y="20" width="90" height="70" strokeWidth="2" fill="rgba(44,95,46,.05)" rx="4"/>
        <line x1="130" y1="20" x2="130" y2="90" strokeWidth="1.5"/>
        <line x1="85"  y1="55" x2="175" y2="55" strokeWidth="1.5"/>
        {/* Rain on window */}
        {[95,105,115,125,140,150,160].map((x,i)=><line key={i} x1={x} y1={25} x2={x-2} y2={36} strokeWidth="1" opacity="0.4"/>)}
        {/* Cozy lamp glow */}
        <circle cx="55" cy="85" r="18" strokeWidth="1.5" fill="rgba(251,192,45,.12)"/>
        <line x1="55" y1="67" x2="55" y2="40" strokeWidth="2"/>
        <ellipse cx="55" cy="40" rx="14" ry="6" strokeWidth="2" fill="rgba(251,192,45,.2)"/>
        {/* Floor */}
        <line x1="0" y1="160" x2="260" y2="160" strokeWidth="2.5"/>
        {/* Rug */}
        <ellipse cx="130" cy="162" rx="80" ry="10" strokeWidth="2" fill="rgba(44,95,46,.05)"/>
      </g>
    </svg>
  );
}

/* ── Scene 2 : awakening / young self ── */
export function IllustrationAwaken() {
  return (
    <svg viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
      {FILTER}
      <g filter="url(#sk)" stroke="#2C5F2E" strokeLinecap="round">
        {/* Child face */}
        <circle cx="130" cy="100" r="55" strokeWidth="2.5" fill="rgba(44,95,46,.04)"/>
        {/* Eyes */}
        <circle cx="112" cy="94" r="9" strokeWidth="2" fill="rgba(44,95,46,.06)"/>
        <circle cx="148" cy="94" r="9" strokeWidth="2" fill="rgba(44,95,46,.06)"/>
        <circle cx="114" cy="94" r="4.5" fill="rgba(44,95,46,.5)"/>
        <circle cx="150" cy="94" r="4.5" fill="rgba(44,95,46,.5)"/>
        {/* Pupils shine */}
        <circle cx="116" cy="92" r="1.5" fill="white"/>
        <circle cx="152" cy="92" r="1.5" fill="white"/>
        {/* Eyebrows gentle */}
        <path d="M103 82 Q112 78 121 82" strokeWidth="2" fill="none"/>
        <path d="M139 82 Q148 78 157 82" strokeWidth="2" fill="none"/>
        {/* Smile */}
        <path d="M112 116 Q130 128 148 116" strokeWidth="2.5" fill="none"/>
        {/* Hair */}
        <path d="M78 80 Q85 45 130 42 Q175 45 182 80" strokeWidth="3" fill="rgba(44,95,46,.15)"/>
        <path d="M82 76 Q78 60 88 52" strokeWidth="2"/>
        <path d="M178 76 Q182 60 172 52" strokeWidth="2"/>
        {/* Ears */}
        <path d="M75 100 Q68 100 70 112 Q72 120 78 118" strokeWidth="2" fill="none"/>
        <path d="M185 100 Q192 100 190 112 Q188 120 182 118" strokeWidth="2" fill="none"/>
        {/* Light burst around face */}
        {[0,45,90,135,180,225,270,315].map((deg,i)=>{
          const r = Math.PI*deg/180;
          const x1 = 130+63*Math.cos(r), y1 = 100+63*Math.sin(r);
          const x2 = 130+75*Math.cos(r), y2 = 100+75*Math.sin(r);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="1.5" opacity="0.35"/>;
        })}
      </g>
    </svg>
  );
}

/* ── Scene 3 : corridor with doors ── */
export function IllustrationCorridor() {
  return (
    <svg viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
      {FILTER}
      <g filter="url(#sk)" stroke="#2C5F2E" strokeLinecap="round">
        {/* Floor perspective */}
        <line x1="0" y1="190" x2="260" y2="190" strokeWidth="2.5"/>
        <line x1="0" y1="190" x2="130" y2="100" strokeWidth="1.5"/>
        <line x1="260" y1="190" x2="130" y2="100" strokeWidth="1.5"/>
        {/* Ceiling */}
        <line x1="0" y1="10" x2="260" y2="10" strokeWidth="1.5"/>
        <line x1="0" y1="10" x2="130" y2="100" strokeWidth="1.5" opacity="0.5"/>
        <line x1="260" y1="10" x2="130" y2="100" strokeWidth="1.5" opacity="0.5"/>
        {/* Doors left */}
        <rect x="10" y="50" width="55" height="130" rx="4" strokeWidth="2" fill="rgba(44,95,46,.06)"/>
        <rect x="15" y="56" width="45" height="118" rx="3" strokeWidth="1.5" fill="rgba(44,95,46,.04)"/>
        <circle cx="52" cy="122" r="4" strokeWidth="1.5"/>
        {/* Doors right */}
        <rect x="195" y="50" width="55" height="130" rx="4" strokeWidth="2" fill="rgba(44,95,46,.06)"/>
        <rect x="200" y="56" width="45" height="118" rx="3" strokeWidth="1.5" fill="rgba(44,95,46,.04)"/>
        <circle cx="208" cy="122" r="4" strokeWidth="1.5"/>
        {/* Center door (small, distant) */}
        <rect x="105" y="115" width="50" height="75" rx="3" strokeWidth="2" fill="rgba(44,95,46,.08)"/>
        <circle cx="125" cy="155" r="3" strokeWidth="1.5"/>
        {/* Light from center door */}
        <ellipse cx="130" cy="188" rx="30" ry="5" strokeWidth="1" fill="rgba(251,192,45,.12)" opacity="0.4"/>
      </g>
    </svg>
  );
}

/* ── Scene 4 : music box ── */
export function IllustrationMusicBox() {
  return (
    <svg viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
      {FILTER}
      <g filter="url(#sk)" stroke="#2C5F2E" strokeLinecap="round">
        {/* Box body */}
        <rect x="60" y="110" width="140" height="75" rx="6" strokeWidth="2.5" fill="rgba(44,95,46,.06)"/>
        {/* Lid open */}
        <path d="M60 110 Q80 50 200 110" strokeWidth="2.5" fill="rgba(44,95,46,.04)"/>
        {/* Hinge */}
        <line x1="130" y1="110" x2="130" y2="80" strokeWidth="1.5"/>
        {/* Ballerina silhouette */}
        <circle cx="130" cy="96" r="7" strokeWidth="1.5" fill="rgba(44,95,46,.1)"/>
        <path d="M130 103 L130 118" strokeWidth="1.5"/>
        <path d="M118 110 L142 110" strokeWidth="1.5"/>
        <path d="M130 118 L120 130" strokeWidth="1.5"/>
        <path d="M130 118 L140 130" strokeWidth="1.5"/>
        {/* Notes */}
        {[[85,55],[155,45],[105,30],[175,65],[95,75]].map(([x,y],i)=>(
          <g key={i}>
            <circle cx={x} cy={y} r="5" strokeWidth="1.5" fill="rgba(44,95,46,.15)"/>
            <line x1={x+5} y1={y} x2={x+5} y2={y-14} strokeWidth="1.5"/>
          </g>
        ))}
        {/* Wind lines */}
        {[[80,40,100,38],[160,35,180,33],[90,20,115,18]].map(([x1,y1,x2,y2],i)=>(
          <path key={i} d={`M${x1} ${y1} Q${(x1+x2)/2} ${y1-6} ${x2} ${y2}`} strokeWidth="1" opacity="0.4"/>
        ))}
        {/* Box details */}
        <line x1="70" y1="140" x2="190" y2="140" strokeWidth="1" opacity="0.4"/>
        <rect x="115" y="172" width="30" height="8" rx="4" strokeWidth="1.5"/>
      </g>
    </svg>
  );
}

/* ── Scene 5 : bakery in rain ── */
export function IllustrationBakery() {
  return (
    <svg viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
      {FILTER}
      <g filter="url(#sk)" stroke="#2C5F2E" strokeLinecap="round">
        {/* Storefront */}
        <rect x="30" y="60" width="200" height="130" rx="4" strokeWidth="2.5" fill="rgba(44,95,46,.05)"/>
        {/* Awning */}
        <path d="M20 60 L240 60 L220 90 L40 90 Z" strokeWidth="2" fill="rgba(44,95,46,.1)"/>
        {/* Awning stripes */}
        {[60,90,120,150,180,210].map(x=><line key={x} x1={x} y1={60} x2={x-8} y2={90} strokeWidth="1.5" opacity="0.35"/>)}
        {/* Sign */}
        <rect x="80" y="30" width="100" height="30" rx="6" strokeWidth="1.5" fill="rgba(44,95,46,.05)"/>
        <line x1="90" y1="45" x2="170" y2="45" strokeWidth="1" opacity="0.3"/>
        {/* Door */}
        <rect x="100" y="130" width="60" height="60" rx="4" strokeWidth="2" fill="rgba(44,95,46,.06)"/>
        <path d="M100 130 Q130 120 160 130" strokeWidth="1.5"/>
        <circle cx="155" cy="162" r="4" strokeWidth="1.5"/>
        {/* Windows */}
        <rect x="40" y="100" width="40" height="40" rx="3" strokeWidth="1.5" fill="rgba(251,192,45,.08)"/>
        <rect x="180" y="100" width="40" height="40" rx="3" strokeWidth="1.5" fill="rgba(251,192,45,.08)"/>
        {/* Cakes in window */}
        <path d="M48 125 Q50 115 52 125 Q54 115 56 125 Q58 115 60 125 Q62 115 64 125 Q66 115 68 125 Q70 115 72 125" strokeWidth="1.2" opacity="0.5"/>
        {/* Rain */}
        {Array.from({length:14}).map((_,i)=>{
          const x=15+(i*18)%235, y=5+(i*19)%50;
          return <line key={i} x1={x} y1={y} x2={x-3} y2={y+12} strokeWidth="1.2" opacity="0.45"/>;
        })}
        {/* Ground puddles */}
        <ellipse cx="70"  cy="192" rx="22" ry="5" strokeWidth="1" opacity="0.3"/>
        <ellipse cx="190" cy="192" rx="18" ry="4" strokeWidth="1" opacity="0.3"/>
        {/* Ground */}
        <line x1="0" y1="193" x2="260" y2="193" strokeWidth="2.5"/>
      </g>
    </svg>
  );
}

/* ── Scene 6 : photo gallery ── */
export function IllustrationGallery() {
  return (
    <svg viewBox="0 0 260 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
      {FILTER}
      <g filter="url(#sk)" stroke="#2C5F2E" strokeLinecap="round">
        {/* Wall */}
        <line x1="0" y1="10" x2="260" y2="10" strokeWidth="2"/>
        <line x1="0" y1="185" x2="260" y2="185" strokeWidth="2.5"/>
        {/* Frame 1 */}
        <rect x="15" y="40" width="65" height="80" rx="3" strokeWidth="2" fill="rgba(44,95,46,.05)"/>
        <rect x="22" y="47" width="51" height="66" rx="2" strokeWidth="1.5" fill="rgba(44,95,46,.04)"/>
        {/* Stick figure success */}
        <circle cx="48" cy="60" r="6" strokeWidth="1.5"/>
        <line x1="48" y1="66" x2="48" y2="82" strokeWidth="1.5"/>
        <line x1="38" y1="72" x2="58" y2="72" strokeWidth="1.5"/>
        <line x1="48" y1="82" x2="40" y2="94" strokeWidth="1.5"/>
        <line x1="48" y1="82" x2="56" y2="94" strokeWidth="1.5"/>
        {/* Trophy small */}
        <path d="M44 58 Q48 52 52 58" strokeWidth="1.2" opacity="0.5"/>
        {/* Frame 2 */}
        <rect x="97" y="30" width="66" height="90" rx="3" strokeWidth="2.5" fill="rgba(44,95,46,.06)"/>
        <rect x="104" y="37" width="52" height="76" rx="2" strokeWidth="1.5" fill="rgba(44,95,46,.04)"/>
        {/* Two figures together */}
        <circle cx="118" cy="54" r="6" strokeWidth="1.5"/>
        <line x1="118" y1="60" x2="118" y2="76" strokeWidth="1.5"/>
        <circle cx="142" cy="54" r="6" strokeWidth="1.5"/>
        <line x1="142" y1="60" x2="142" y2="76" strokeWidth="1.5"/>
        <line x1="118" y1="68" x2="142" y2="68" strokeWidth="1.5"/>
        {/* Heart between */}
        <path d="M128 63 Q130 60 132 63 Q134 60 136 63 Q136 67 130 71 Q124 67 124 63 Z" strokeWidth="1.2" fill="rgba(198,40,40,.15)" opacity="0.8"/>
        {/* Frame 3 */}
        <rect x="180" y="45" width="62" height="75" rx="3" strokeWidth="2" fill="rgba(44,95,46,.05)"/>
        <rect x="187" y="52" width="48" height="61" rx="2" strokeWidth="1.5" fill="rgba(44,95,46,.04)"/>
        {/* Adventure figure */}
        <circle cx="211" cy="68" r="6" strokeWidth="1.5"/>
        <line x1="211" y1="74" x2="211" y2="89" strokeWidth="1.5"/>
        <line x1="200" y1="80" x2="222" y2="80" strokeWidth="1.5"/>
        <path d="M196 99 Q211 90 226 99" strokeWidth="1.5"/>
        {/* Frame strings */}
        {[48,130,211].map((x,i)=><line key={i} x1={x} y1={30+(i===1?30:40)} x2={x} y2={10} strokeWidth="1" opacity="0.4"/>)}
      </g>
    </svg>
  );
}

/* ── Scene 7 : final door ── */
export function IllustrationDoor() {
  return (
    <svg viewBox="0 0 260 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-xs mx-auto">
      {FILTER}
      <g filter="url(#sk)" stroke="#2C5F2E" strokeLinecap="round">
        {/* Door frame */}
        <rect x="65" y="30" width="130" height="175" rx="6" strokeWidth="3" fill="rgba(44,95,46,.04)"/>
        {/* Door arch top */}
        <path d="M65 80 Q130 20 195 80" strokeWidth="2.5" fill="rgba(44,95,46,.06)"/>
        {/* Door panel details */}
        <rect x="80" y="90" width="42" height="55" rx="4" strokeWidth="1.5" fill="rgba(44,95,46,.05)"/>
        <rect x="138" y="90" width="42" height="55" rx="4" strokeWidth="1.5" fill="rgba(44,95,46,.05)"/>
        <rect x="80" y="155" width="42" height="38" rx="4" strokeWidth="1.5" fill="rgba(44,95,46,.05)"/>
        <rect x="138" y="155" width="42" height="38" rx="4" strokeWidth="1.5" fill="rgba(44,95,46,.05)"/>
        {/* Door knob */}
        <circle cx="152" cy="128" r="7" strokeWidth="2" fill="rgba(251,192,45,.15)"/>
        <circle cx="152" cy="128" r="3.5" fill="rgba(44,95,46,.2)"/>
        {/* Light from beneath */}
        <ellipse cx="130" cy="205" rx="55" ry="8" strokeWidth="1" fill="rgba(251,192,45,.1)" opacity="0.5"/>
        {/* Keyhole */}
        <circle cx="152" cy="128" r="2" fill="rgba(44,95,46,.4)"/>
        {/* Steps */}
        <rect x="45" y="202" width="170" height="8" rx="2" strokeWidth="2" fill="rgba(44,95,46,.06)"/>
        <rect x="30" y="210" width="200" height="8" rx="2" strokeWidth="2" fill="rgba(44,95,46,.08)"/>
      </g>
    </svg>
  );
}

export const ILLUSTRATIONS = [
  IllustrationCity,
  IllustrationRoom,
  IllustrationAwaken,
  IllustrationCorridor,
  IllustrationMusicBox,
  IllustrationBakery,
  IllustrationGallery,
  IllustrationDoor,
];
