"use client";

const R = "#C62828";
const Y = "#FBC02D";
const K = "#1a1a1a";
const W = "rgba(255,255,255,0.88)";
const CREAM = "rgba(198,40,40,0.07)";

function SkFilter({ id }: { id: string }) {
  return (
    <defs>
      <filter id={id} x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.032" numOctaves="4" seed="7" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 0 — Rainy city at dusk
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationCity() {
  return (
    <svg viewBox="0 0 340 230" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-city"/>

      <g filter="url(#sk-city)" strokeLinecap="round">
        <rect x="0"   y="90"  width="58"  height="140" fill={CREAM} stroke={R} strokeWidth="2"/>
        <rect x="64"  y="55"  width="72"  height="175" fill={CREAM} stroke={R} strokeWidth="2"/>
        <rect x="144" y="72"  width="60"  height="158" fill={CREAM} stroke={R} strokeWidth="2"/>
        <rect x="212" y="45"  width="52"  height="185" fill={CREAM} stroke={R} strokeWidth="2"/>
        <rect x="272" y="80"  width="68"  height="150" fill={CREAM} stroke={R} strokeWidth="2"/>
        {[[8,105],[8,125],[32,105],[32,125],[72,70],[92,70],[112,70],[72,95],[92,95],[112,95],
          [152,88],[172,88],[152,112],[172,112],[220,60],[242,60],[220,84],[242,84],[220,108],[242,108],
          [280,98],[302,98],[280,122],[302,122]].map(([x,y],i)=>(
          <rect key={i} x={x} y={y} width="13" height="11" rx="2" fill={Y} opacity="0.8"/>
        ))}
        <line x1="0" y1="228" x2="340" y2="228" stroke={K} strokeWidth="3"/>
        <line x1="88"  y1="175" x2="88"  y2="228" stroke={K} strokeWidth="2.5"/>
        <path d="M88 175 Q88 160 106 160" stroke={K} strokeWidth="2.5" fill="none"/>
        <line x1="255" y1="182" x2="255" y2="228" stroke={K} strokeWidth="2.5"/>
        <path d="M255 182 Q255 168 273 168" stroke={K} strokeWidth="2.5" fill="none"/>
      </g>

      <circle cx="107" cy="160" r="8" fill={Y} opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="r" values="7;10;7" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="274" cy="168" r="8" fill={Y} opacity="0.6">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3.5s" repeatCount="indefinite"/>
        <animate attributeName="r" values="7;10;7" dur="3.5s" repeatCount="indefinite"/>
      </circle>

      <g>
        <circle cx="300" cy="28" r="20" fill={Y} opacity="0.15">
          <animate attributeName="r" values="18;24;18" dur="5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.1;0.22;0.1" dur="5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="300" cy="28" r="16" stroke={Y} strokeWidth="1.5" fill="rgba(255,248,220,0.5)"/>
      </g>

      <g opacity="0.45">
        {Array.from({length:28}).map((_,i)=>{
          const x = 4+(i*12)%340, y = (i*17)%65;
          const len = 14+((i*7)%10);
          return <line key={i} x1={x} y1={y} x2={x-4} y2={y+len} stroke={R} strokeWidth={1+(i%3)*0.4}/>;
        })}
        <animateTransform attributeName="transform" type="translate" from="0,0" to="-5,24" dur="1.1s" repeatCount="indefinite"/>
      </g>
      <g opacity="0.25">
        {Array.from({length:20}).map((_,i)=>{
          const x = 10+(i*17)%330, y = (i*23+8)%70;
          const len = 18+((i*11)%14);
          return <line key={i} x1={x} y1={y} x2={x-6} y2={y+len} stroke={R} strokeWidth="1.1"/>;
        })}
        <animateTransform attributeName="transform" type="translate" from="0,0" to="-7,30" dur="1.5s" repeatCount="indefinite"/>
      </g>
      <g opacity="0.15">
        {Array.from({length:16}).map((_,i)=>{
          const x = 2+(i*21)%338, y = (i*31+15)%75;
          return <line key={i} x1={x} y1={y} x2={x-3} y2={y+22} stroke={K} strokeWidth="0.8"/>;
        })}
        <animateTransform attributeName="transform" type="translate" from="0,0" to="-4,28" dur="2.0s" repeatCount="indefinite"/>
      </g>

      <ellipse cx="88"  cy="229" rx="32" ry="5" fill={Y} fillOpacity="0.1" stroke={R} strokeWidth="1" opacity="0.35"/>
      <ellipse cx="255" cy="229" rx="28" ry="4" fill={Y} fillOpacity="0.1" stroke={R} strokeWidth="1" opacity="0.35"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 1 — Cozy rest place
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationRoom() {
  return (
    <svg viewBox="0 0 340 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-room"/>

      <g filter="url(#sk-room)" strokeLinecap="round">
        <rect x="0" y="0" width="340" height="240" fill="rgba(198,40,40,0.025)"/>
        <line x1="0" y1="222" x2="340" y2="222" stroke={K} strokeWidth="3"/>
        {[50,100,150,200,250,300].map(x=>(
          <line key={x} x1={x} y1="222" x2={x} y2="240" stroke={K} strokeWidth="1" opacity="0.25"/>
        ))}
        <ellipse cx="190" cy="224" rx="120" ry="13" fill={CREAM} stroke={R} strokeWidth="2"/>
        <ellipse cx="190" cy="224" rx="102" ry="9"  fill="none" stroke={R} strokeWidth="1" opacity="0.4"/>

        <rect x="20" y="18" width="130" height="100" rx="6" fill="rgba(26,26,26,0.06)" stroke={R} strokeWidth="2.5"/>
        <line x1="85" y1="18" x2="85"  y2="118" stroke={R} strokeWidth="1.8"/>
        <line x1="20" y1="68" x2="150" y2="68"  stroke={R} strokeWidth="1.8"/>
        <circle cx="128" cy="42" r="16" stroke={Y} strokeWidth="1.5" fill={Y} fillOpacity="0.1"/>

        <line x1="45" y1="128" x2="45" y2="222" stroke={K} strokeWidth="3"/>
        <path d="M45 128 Q45 110 65 110" stroke={K} strokeWidth="2.5" fill="none"/>
        <path d="M48 105 Q65 94 82 105 Q78 126 58 126Z" stroke={K} strokeWidth="2" fill={Y} fillOpacity="0.25"/>

        <rect x="188" y="158" width="108" height="56" rx="14" fill={CREAM} stroke={R} strokeWidth="2"/>
        <rect x="176" y="150" width="20" height="62" rx="9" fill={CREAM} stroke={R} strokeWidth="2"/>
        <rect x="276" y="150" width="20" height="62" rx="9" fill={CREAM} stroke={R} strokeWidth="2"/>
        <rect x="188" y="150" width="108" height="24" rx="9" fill={CREAM} stroke={R} strokeWidth="2"/>
        <ellipse cx="242" cy="163" rx="30" ry="12" stroke={R} strokeWidth="1.5" fill={Y} fillOpacity="0.15"/>

        <rect x="108" y="188" width="52" height="8" rx="4" fill={CREAM} stroke={K} strokeWidth="1.8"/>
        <line x1="116" y1="196" x2="116" y2="222" stroke={K} strokeWidth="2"/>
        <line x1="152" y1="196" x2="152" y2="222" stroke={K} strokeWidth="2"/>

        <path d="M122 186 Q134 176 146 186 Q146 192 134 194 Q122 192 122 186Z" stroke={R} strokeWidth="1.5" fill={Y} fillOpacity="0.25"/>
        <path d="M146 188 Q154 185 153 191" stroke={R} strokeWidth="1.5" fill="none"/>
      </g>

      <ellipse cx="65" cy="115" rx="40" ry="28" fill={Y} fillOpacity="0.1">
        <animate attributeName="fill-opacity" values="0.06;0.18;0.06" dur="4s" repeatCount="indefinite"/>
      </ellipse>

      {[0,1,2].map(i=>(
        <path key={i} d={`M${126+i*9} 176 Q${128+i*9} 168 ${126+i*9} 160`}
          stroke={R} strokeWidth="1.4" fill="none" opacity="0.5"
          strokeLinecap="round">
          <animateTransform attributeName="transform" type="translate"
            from="0,0" to={`${i%2===0?-2:2},-14`} dur={`${1.8+i*0.4}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.5;0;0.5" dur={`${1.8+i*0.4}s`} repeatCount="indefinite"/>
        </path>
      ))}

      {[[80,80],[160,50],[240,90],[310,65],[130,140],[270,130]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="2.5" fill={Y} opacity="0.5">
          <animate attributeName="cy" values={`${cy};${cy-12};${cy}`} dur={`${3+i*0.7}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${3+i*0.7}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      <g opacity="0.35">
        {[30,52,74,96,118].map((x,i)=>(
          <line key={i} x1={x} y1={22+(i%3)*10} x2={x-3} y2={36+(i%3)*10}
            stroke={R} strokeWidth="1.2"/>
        ))}
        <animateTransform attributeName="transform" type="translate"
          from="0,0" to="-3,20" dur="1.4s" repeatCount="indefinite"/>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 2 — Person sleeping in bed, zzz floating up
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationSleep() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-sleep"/>

      <g filter="url(#sk-sleep)" strokeLinecap="round">
        {/* Bed frame */}
        <rect x="40" y="160" width="260" height="85" rx="8" fill={CREAM} stroke={K} strokeWidth="2.5"/>
        {/* Headboard */}
        <rect x="40" y="130" width="18" height="115" rx="6" fill={CREAM} stroke={K} strokeWidth="2.5"/>
        <rect x="282" y="130" width="18" height="115" rx="6" fill={CREAM} stroke={K} strokeWidth="2.5"/>
        <rect x="40" y="130" width="260" height="22" rx="8" fill={CREAM} stroke={K} strokeWidth="2.5"/>
        {/* Pillow */}
        <ellipse cx="130" cy="168" rx="62" ry="22" fill="white" stroke={K} strokeWidth="2"/>
        {/* Blanket */}
        <path d="M40 195 Q170 185 300 195 L300 245 Q170 252 40 245Z" fill={CREAM} stroke={K} strokeWidth="2"/>
        {/* Head */}
        <circle cx="130" cy="158" r="28" fill="rgba(255,230,200,0.9)" stroke={K} strokeWidth="2"/>
        {/* Hair */}
        <path d="M104 146 Q107 128 130 125 Q153 128 156 146" fill={K} opacity="0.85"/>
        {/* Closed eyes */}
        <path d="M116 156 Q130 150 144 156" stroke={K} strokeWidth="2" fill="none"/>
        <path d="M118 162 Q130 158 142 162" stroke={K} strokeWidth="2" fill="none"/>
        {/* Nose */}
        <circle cx="130" cy="166" r="2.5" fill={K} opacity="0.4"/>
        {/* Blanket fold detail */}
        <path d="M60 205 Q170 198 280 205" stroke={K} strokeWidth="1" opacity="0.3"/>
        {/* Floor */}
        <line x1="0" y1="255" x2="340" y2="255" stroke={K} strokeWidth="2.5"/>
      </g>

      {/* Animated zzz */}
      <text x="165" y="130" fontSize="18" fontFamily="'Fredoka One',sans-serif" fontWeight="bold" fill={Y}>
        Z
        <animate attributeName="opacity" values="0;0;1;0" dur="3s" begin="0s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate" from="0,0" to="12,-40" dur="3s" begin="0s" repeatCount="indefinite"/>
      </text>
      <text x="183" y="112" fontSize="24" fontFamily="'Fredoka One',sans-serif" fontWeight="bold" fill={Y}>
        Z
        <animate attributeName="opacity" values="0;0;1;0" dur="3s" begin="1s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate" from="0,0" to="15,-50" dur="3s" begin="1s" repeatCount="indefinite"/>
      </text>
      <text x="203" y="92" fontSize="30" fontFamily="'Fredoka One',sans-serif" fontWeight="bold" fill={Y}>
        Z
        <animate attributeName="opacity" values="0;0;1;0" dur="3s" begin="2s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate" from="0,0" to="18,-60" dur="3s" begin="2s" repeatCount="indefinite"/>
      </text>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 3 — Close-up blinking eyes
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationEyes() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <rect width="340" height="260" fill="rgba(255,248,235,0.5)"/>
      <SkFilter id="sk-eyes"/>

      <g filter="url(#sk-eyes)" strokeLinecap="round">
        {/* Face hint */}
        <path d="M50 200 Q170 240 290 200" stroke={K} strokeWidth="1" fill="none" opacity="0.15"/>
        {/* Left eyebrow */}
        <path d="M55 95 Q110 80 145 90" stroke={K} strokeWidth="3" fill="none"/>
        {/* Right eyebrow */}
        <path d="M195 90 Q230 80 285 95" stroke={K} strokeWidth="3" fill="none"/>
        {/* Left eye white */}
        <ellipse cx="110" cy="140" rx="60" ry="38" fill={W} stroke={K} strokeWidth="2.5"/>
        {/* Right eye white */}
        <ellipse cx="230" cy="140" rx="60" ry="38" fill={W} stroke={K} strokeWidth="2.5"/>
        {/* Left iris */}
        <circle cx="112" cy="143" r="22" fill="#3d2600"/>
        {/* Right iris */}
        <circle cx="232" cy="143" r="22" fill="#3d2600"/>
        {/* Left pupil */}
        <circle cx="114" cy="145" r="12" fill={K}/>
        {/* Right pupil */}
        <circle cx="234" cy="145" r="12" fill={K}/>
        {/* Catchlights */}
        <circle cx="120" cy="138" r="5" fill={W}/>
        <circle cx="240" cy="138" r="5" fill={W}/>
        {/* Left upper eyelashes */}
        <line x1="70" y1="107" x2="68" y2="100" stroke={K} strokeWidth="1.5"/>
        <line x1="88" y1="104" x2="87" y2="97" stroke={K} strokeWidth="1.5"/>
        <line x1="107" y1="103" x2="107" y2="96" stroke={K} strokeWidth="1.5"/>
        <line x1="126" y1="105" x2="127" y2="98" stroke={K} strokeWidth="1.5"/>
        {/* Right upper eyelashes */}
        <line x1="190" y1="104" x2="188" y2="97" stroke={K} strokeWidth="1.5"/>
        <line x1="210" y1="103" x2="210" y2="96" stroke={K} strokeWidth="1.5"/>
        <line x1="230" y1="103" x2="231" y2="96" stroke={K} strokeWidth="1.5"/>
        <line x1="250" y1="105" x2="252" y2="98" stroke={K} strokeWidth="1.5"/>
      </g>

      {/* Blink animation eyelids */}
      <rect x="50" y="102" width="120" height="0" fill="rgba(255,220,185,0.95)" stroke={K} strokeWidth="1.5">
        <animate attributeName="height" values="0;0;76;76;0; 0;76;76;0; 0;76;76;0" dur="6s" repeatCount="indefinite"/>
      </rect>
      <rect x="170" y="102" width="120" height="0" fill="rgba(255,220,185,0.95)" stroke={K} strokeWidth="1.5">
        <animate attributeName="height" values="0;0;76;76;0; 0;76;76;0; 0;76;76;0" dur="6s" begin="0.05s" repeatCount="indefinite"/>
      </rect>
      {/* Lower face hint */}
      <path d="M30 200 Q170 195 310 200" stroke={K} strokeWidth="1" opacity="0.15"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 4 — Child standing, shadowy background
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationChildShadow() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-childshadow"/>

      {/* Background abstract shapes */}
      <rect x="0" y="80" width="70" height="180" fill="rgba(180,160,80,0.18)"/>
      <rect x="270" y="60" width="70" height="200" fill="rgba(180,160,80,0.15)"/>
      <circle cx="80" cy="100" r="35" fill="rgba(140,130,70,0.12)"/>
      <rect x="20" y="40" width="50" height="80" fill="rgba(160,150,70,0.1)"/>
      <circle cx="260" cy="80" r="28" fill="rgba(140,130,60,0.1)"/>
      <rect x="140" y="20" width="60" height="40" fill="rgba(160,150,80,0.08)"/>
      <rect width="340" height="260" fill="rgba(200,190,130,0.08)"/>

      <g filter="url(#sk-childshadow)" strokeLinecap="round">
        {/* Ground */}
        <line x1="0" y1="255" x2="340" y2="255" stroke={K} strokeWidth="2.5"/>
        {/* Head */}
        <circle cx="170" cy="95" r="38" fill="rgba(255,230,200,0.9)" stroke={K} strokeWidth="2.5"/>
        {/* Hair */}
        <path d="M133 82 Q136 54 170 50 Q204 54 207 82" fill={K} opacity="0.88"/>
        {/* Neck */}
        <rect x="160" y="130" width="20" height="18" rx="6" fill="rgba(255,230,200,0.9)" stroke={K} strokeWidth="1.5"/>
        {/* Body */}
        <path d="M130 148 Q145 142 170 144 Q195 142 210 148 L205 210 Q170 215 135 210Z" fill={CREAM} stroke={K} strokeWidth="2"/>
        {/* Arms */}
        <line x1="130" y1="155" x2="105" y2="200" stroke={K} strokeWidth="8" strokeLinecap="round"/>
        <line x1="210" y1="155" x2="235" y2="200" stroke={K} strokeWidth="8" strokeLinecap="round"/>
        {/* Legs */}
        <line x1="148" y1="210" x2="145" y2="255" stroke={K} strokeWidth="10" strokeLinecap="round"/>
        <line x1="192" y1="210" x2="195" y2="255" stroke={K} strokeWidth="10" strokeLinecap="round"/>
        {/* Eyes */}
        <ellipse cx="157" cy="90" rx="8" ry="9" fill={W} stroke={K} strokeWidth="1.5"/>
        <ellipse cx="183" cy="90" rx="8" ry="9" fill={W} stroke={K} strokeWidth="1.5"/>
        <circle cx="158" cy="91" r="5" fill={K}/>
        <circle cx="184" cy="91" r="5" fill={K}/>
        {/* Smile */}
        <path d="M158 110 Q170 118 182 110" stroke={K} strokeWidth="2" fill="none"/>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 5 — Child face close-up, smiling, looking up
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationChildFace() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-childface"/>

      <g filter="url(#sk-childface)" strokeLinecap="round">
        {/* Neck hint */}
        <rect x="150" y="230" width="40" height="30" rx="8" fill="rgba(255,225,195,0.9)" stroke={K} strokeWidth="1.5"/>
        {/* Head */}
        <ellipse cx="170" cy="130" rx="120" ry="115" fill="rgba(255,225,195,0.92)" stroke={K} strokeWidth="2.8"/>
        {/* Hair top */}
        <path d="M52 110 Q55 30 170 22 Q285 30 288 110 Q250 45 170 42 Q90 45 52 110Z" fill={K} opacity="0.85"/>
        {/* Hair sides */}
        <path d="M52 110 Q38 130 42 160" stroke={K} strokeWidth="8" fill="none" strokeLinecap="round"/>
        <path d="M288 110 Q302 130 298 160" stroke={K} strokeWidth="8" fill="none" strokeLinecap="round"/>
        {/* Ears */}
        <path d="M50 130 Q38 132 40 148 Q42 162 54 160" stroke={K} strokeWidth="2.2" fill="none"/>
        <path d="M290 130 Q302 132 300 148 Q298 162 286 160" stroke={K} strokeWidth="2.2" fill="none"/>
        {/* Left eye */}
        <ellipse cx="122" cy="135" rx="32" ry="26" fill={W} stroke={K} strokeWidth="2.2"/>
        <circle cx="120" cy="128" r="16" fill="#3d2600"/>
        <circle cx="120" cy="128" r="9" fill={K}/>
        <circle cx="126" cy="122" r="5" fill={W}/>
        <line x1="94" y1="113" x2="91" y2="107" stroke={K} strokeWidth="1.5"/>
        <line x1="105" y1="110" x2="103" y2="104" stroke={K} strokeWidth="1.5"/>
        <line x1="116" y1="109" x2="115" y2="103" stroke={K} strokeWidth="1.5"/>
        <line x1="127" y1="110" x2="127" y2="104" stroke={K} strokeWidth="1.5"/>
        {/* Right eye */}
        <ellipse cx="218" cy="135" rx="32" ry="26" fill={W} stroke={K} strokeWidth="2.2"/>
        <circle cx="220" cy="128" r="16" fill="#3d2600"/>
        <circle cx="220" cy="128" r="9" fill={K}/>
        <circle cx="226" cy="122" r="5" fill={W}/>
        <line x1="208" y1="110" x2="207" y2="104" stroke={K} strokeWidth="1.5"/>
        <line x1="220" y1="109" x2="220" y2="103" stroke={K} strokeWidth="1.5"/>
        <line x1="232" y1="110" x2="233" y2="104" stroke={K} strokeWidth="1.5"/>
        <line x1="244" y1="113" x2="247" y2="107" stroke={K} strokeWidth="1.5"/>
        {/* Eyebrows */}
        <path d="M88 103 Q122 93 156 100" stroke={K} strokeWidth="3" fill="none"/>
        <path d="M184 100 Q218 93 252 103" stroke={K} strokeWidth="3" fill="none"/>
        {/* Nose */}
        <path d="M162 158 Q170 165 178 158" stroke={K} strokeWidth="2" fill="none"/>
        {/* Big smile */}
        <path d="M98 178 Q170 215 242 178" stroke={K} strokeWidth="4" fill="none"/>
        {/* Blush */}
        <ellipse cx="88" cy="168" rx="28" ry="18" fill={R} fillOpacity="0.12"/>
        <ellipse cx="252" cy="168" rx="28" ry="18" fill={R} fillOpacity="0.12"/>
        {/* Teeth hint */}
        <ellipse cx="170" cy="195" rx="38" ry="15" fill={W} opacity="0.7"/>
      </g>

      {/* Sparkle stars */}
      {[[30,40],[310,35],[25,180],[320,175],[170,18]].map(([cx,cy],i)=>(
        <g key={i}>
          <line x1={cx-6} y1={cy} x2={cx+6} y2={cy} stroke={Y} strokeWidth="1.5">
            <animate attributeName="opacity" values="0.2;1;0.2" dur={`${2+i*0.5}s`} repeatCount="indefinite"/>
          </line>
          <line x1={cx} y1={cy-6} x2={cx} y2={cy+6} stroke={Y} strokeWidth="1.5">
            <animate attributeName="opacity" values="0.2;1;0.2" dur={`${2+i*0.5}s`} repeatCount="indefinite"/>
          </line>
          <circle cx={cx} cy={cy} r="3" fill={Y}>
            <animate attributeName="r" values="2;4;2" dur={`${2+i*0.5}s`} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2+i*0.5}s`} repeatCount="indefinite"/>
          </circle>
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 6 — Corridor with 5 coloured doors (adult + child)
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationDoors() {
  const doorColors = [R, "#E65100", "#FBC02D", "#B71C1C", "#4A0000"];
  const doorX = [8, 72, 136, 200, 264];

  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-doors"/>
      <defs>
        <filter id="sk-figures" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="22" result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.5" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>

      <g filter="url(#sk-doors)" strokeLinecap="round">
        <line x1="0" y1="250" x2="340" y2="250" stroke={K} strokeWidth="3"/>
        <line x1="0" y1="0"   x2="340" y2="0"   stroke={K} strokeWidth="2"/>
        {[210,182,160].map((y,i)=>{
          const sp = (250-y)/250*170;
          return <line key={i} x1={170-sp} y1={y} x2={170+sp} y2={y} stroke={K} strokeWidth="1" opacity="0.18"/>;
        })}
        <line x1="170" y1="0" x2="170" y2="20" stroke={K} strokeWidth="2"/>
        <ellipse cx="170" cy="24" rx="22" ry="9" fill={Y} fillOpacity="0.3" stroke={Y} strokeWidth="1.5"/>

        {doorX.map((x, i) => (
          <g key={i}>
            <rect x={x} y={30} width="60" height="220" rx="5" fill={CREAM} stroke={doorColors[i]} strokeWidth="2.5"/>
            <rect x={x+6} y={38} width="48" height="205" rx="3" fill="rgba(198,40,40,0.03)" stroke={doorColors[i]} strokeWidth="1.2"/>
            <rect x={x+10} y={48}  width="18" height="70" rx="3" stroke={doorColors[i]} strokeWidth="1" fill="none" opacity="0.4"/>
            <rect x={x+32} y={48}  width="18" height="70" rx="3" stroke={doorColors[i]} strokeWidth="1" fill="none" opacity="0.4"/>
            <rect x={x+10} y={128} width="40" height="96" rx="3" stroke={doorColors[i]} strokeWidth="1" fill="none" opacity="0.4"/>
            <circle cx={x+46} cy={188} r="6" fill={Y} stroke={doorColors[i]} strokeWidth="1.5"/>
            <circle cx={x+46} cy={188} r="2.5" fill={doorColors[i]}/>
          </g>
        ))}
      </g>

      {doorX.map((x, i) => (
        <ellipse key={i} cx={x+30} cy={251} rx={28} ry={7} fill={doorColors[i]} fillOpacity="0.25">
          <animate attributeName="fill-opacity" values="0.1;0.45;0.1" dur={`${2.5+i*0.4}s`} repeatCount="indefinite"/>
          <animate attributeName="ry" values="4;10;4" dur={`${2.5+i*0.4}s`} repeatCount="indefinite"/>
        </ellipse>
      ))}

      <ellipse cx="170" cy="75" rx="65" ry="42" fill={Y} fillOpacity="0.07">
        <animate attributeName="fill-opacity" values="0.04;0.16;0.04" dur="4s" repeatCount="indefinite"/>
        <animate attributeName="rx" values="55;70;55" dur="4s" repeatCount="indefinite"/>
      </ellipse>

      {[[55,140],[170,85],[285,145],[110,200],[230,105],[170,165]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r={1.5+i%2} fill={Y} opacity="0.4">
          <animate attributeName="cy" values={`${cy};${cy-20};${cy}`} dur={`${3.5+i*0.9}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.1;0.55;0.1" dur={`${3.5+i*0.9}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      <g filter="url(#sk-figures)">
        <ellipse cx="178" cy="251" rx="52" ry="6" fill="rgba(26,26,26,0.18)"/>
        <circle cx="196" cy="182" r="13" fill={K} opacity="0.82"/>
        <path d="M183 178 Q186 170 196 168 Q206 170 209 178" fill={K} opacity="0.9"/>
        <path d="M178 195 Q186 192 196 194 Q206 192 214 195 L212 248 Q196 252 180 248Z" fill={K} opacity="0.8"/>
        <path d="M178 202 Q168 210 162 222" stroke={K} strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.82"/>
        <path d="M214 202 Q220 215 218 230" stroke={K} strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.7"/>
        <path d="M182 248 Q180 256 180 262" stroke={K} strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.82"/>
        <path d="M210 248 Q212 256 211 262" stroke={K} strokeWidth="10" strokeLinecap="round" fill="none" opacity="0.82"/>

        <circle cx="148" cy="196" r="10" fill={K} opacity="0.8"/>
        <path d="M138 194 Q141 187 148 185 Q155 187 158 194" fill={K} opacity="0.85"/>
        <path d="M135 207 Q141 204 148 206 Q155 204 161 207 L160 248 Q148 252 136 248Z" fill={K} opacity="0.78"/>
        <path d="M161 213 Q165 218 164 224" stroke={K} strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.8"/>
        <path d="M135 211 Q130 221 132 232" stroke={K} strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.65"/>
        <path d="M138 248 Q136 256 137 262" stroke={K} strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.8"/>
        <path d="M158 248 Q160 256 159 262" stroke={K} strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.8"/>

        <ellipse cx="163" cy="224" rx="7" ry="5" fill={K} opacity="0.85"/>
        <path d="M158 221 Q163 218 168 221" stroke={K} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6"/>
      </g>

      <ellipse cx="173" cy="245" rx="50" ry="12" fill={Y} fillOpacity="0.08">
        <animate attributeName="fill-opacity" values="0.05;0.14;0.05" dur="3s" repeatCount="indefinite"/>
      </ellipse>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 7 — Single door opening with warm light
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationDoorOpen() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-dooropen"/>

      {/* Dark corridor background */}
      <rect width="340" height="260" fill="rgba(15,10,5,0.7)"/>

      <g filter="url(#sk-dooropen)" strokeLinecap="round">
        {/* Floor */}
        <line x1="0" y1="250" x2="340" y2="250" stroke={K} strokeWidth="3"/>
        {/* Ceiling */}
        <line x1="0" y1="0" x2="340" y2="0" stroke={K} strokeWidth="2"/>
        {/* Door frame */}
        <rect x="100" y="15" width="140" height="235" rx="0" fill={CREAM} stroke={K} strokeWidth="3"/>
        {/* Frame inner edges */}
        <line x1="100" y1="15" x2="100" y2="250" stroke={K} strokeWidth="2" opacity="0.6"/>
        <line x1="240" y1="15" x2="240" y2="250" stroke={K} strokeWidth="2" opacity="0.6"/>
        <line x1="100" y1="15" x2="240" y2="15" stroke={K} strokeWidth="2" opacity="0.6"/>
      </g>

      {/* Yellow light glow behind door */}
      <ellipse cx="175" cy="132" rx="55" ry="100" fill={Y} fillOpacity="0.35">
        <animate attributeName="fill-opacity" values="0.1;0.5;0.3" dur="3s" repeatCount="indefinite"/>
      </ellipse>

      {/* Door panel opening (hinged left, rotating) */}
      <g>
        <rect x="103" y="18" width="134" height="229" rx="3" fill="rgba(240,220,185,0.95)" stroke={R} strokeWidth="2.5">
          <animateTransform attributeName="transform" type="rotate" from="0,103,132" to="-50,103,132" dur="1.5s" fill="freeze" begin="0.3s"/>
        </rect>
        {/* Door panels */}
        <rect x="112" y="28" width="52" height="90" rx="4" fill="none" stroke={R} strokeWidth="1.5" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from="0,103,132" to="-50,103,132" dur="1.5s" fill="freeze" begin="0.3s"/>
        </rect>
        <rect x="112" y="128" width="52" height="110" rx="4" fill="none" stroke={R} strokeWidth="1.5" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from="0,103,132" to="-50,103,132" dur="1.5s" fill="freeze" begin="0.3s"/>
        </rect>
        {/* Knob */}
        <circle cx="228" cy="140" r="7" fill={Y} stroke={R} strokeWidth="1.5">
          <animateTransform attributeName="transform" type="rotate" from="0,103,132" to="-50,103,132" dur="1.5s" fill="freeze" begin="0.3s"/>
        </circle>
      </g>

      {/* Light ray from opening */}
      <path d="M240 80 Q280 130 240 180" stroke={Y} strokeWidth="2" fill="none" opacity="0.3">
        <animate attributeName="opacity" values="0;0.5;0.2" dur="2s" repeatCount="indefinite"/>
      </path>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 8 — Abstract golden glow filling frame
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationGlow() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      {/* Layered radial glow circles */}
      <circle cx="170" cy="130" r="200" fill={Y} fillOpacity="0.08"/>
      <circle cx="170" cy="130" r="140" fill={Y} fillOpacity="0.12">
        <animate attributeName="fill-opacity" values="0.08;0.2;0.08" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="170" cy="130" r="90" fill={Y} fillOpacity="0.18">
        <animate attributeName="fill-opacity" values="0.12;0.28;0.12" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="170" cy="130" r="50" fill={Y} fillOpacity="0.25">
        <animate attributeName="fill-opacity" values="0.18;0.38;0.18" dur="2.5s" repeatCount="indefinite"/>
      </circle>

      {/* 8 light rays at 45-degree intervals */}
      {Array.from({length:8}).map((_,i) => {
        const angle = i * 45;
        const rad = angle * Math.PI / 180;
        const x2 = 170 + Math.cos(rad) * 160;
        const y2 = 130 + Math.sin(rad) * 160;
        return (
          <line key={i} x1="170" y1="130" x2={x2} y2={y2} stroke={Y} strokeWidth="2" opacity="0.2">
            <animate attributeName="opacity" values="0.1;0.35;0.1" dur={`${3+i*0.3}s`} repeatCount="indefinite"/>
          </line>
        );
      })}

      {/* Floating sparkle dots */}
      {[[100,80],[240,70],[130,180],[210,185],[170,50],[80,150],[260,140]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r={3+i%3} fill={Y} opacity="0.7">
          <animate attributeName="cy" values={`${cy};${cy-18};${cy}`} dur={`${2.5+i*0.5}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur={`${2.5+i*0.5}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* Soft warm center */}
      <circle cx="170" cy="130" r="25" fill="white" fillOpacity="0.15">
        <animate attributeName="fill-opacity" values="0.08;0.25;0.08" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 9 — Adult face with tear
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationTears() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-tears"/>

      <g filter="url(#sk-tears)" strokeLinecap="round">
        {/* Neck */}
        <rect x="152" y="230" width="36" height="30" rx="7" fill="rgba(245,220,190,0.9)" stroke={K} strokeWidth="1.5"/>
        {/* Head */}
        <ellipse cx="170" cy="125" rx="105" ry="100" fill="rgba(245,220,190,0.9)" stroke={K} strokeWidth="2.5"/>
        {/* Hair */}
        <path d="M66 108 Q70 38 170 30 Q270 38 274 108" fill={K} opacity="0.82"/>
        {/* Hair sides */}
        <path d="M66 108 Q58 135 62 162" stroke={K} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.8"/>
        <path d="M274 108 Q282 135 278 162" stroke={K} strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.8"/>
        {/* Ears */}
        <path d="M65 122 Q53 124 55 140 Q57 154 69 152" stroke={K} strokeWidth="2.2" fill="none"/>
        <path d="M275 122 Q287 124 285 140 Q283 154 271 152" stroke={K} strokeWidth="2.2" fill="none"/>
        {/* Left eye (droopy/sad) */}
        <ellipse cx="122" cy="120" rx="28" ry="20" fill={W} stroke={K} strokeWidth="2"/>
        <circle cx="122" cy="120" r="14" fill="#3d2600"/>
        <circle cx="122" cy="120" r="8" fill={K}/>
        <circle cx="128" cy="114" r="4" fill={W}/>
        <path d="M94 130 Q122 135 150 130" stroke={K} strokeWidth="1.5" fill="none" opacity="0.4"/>
        {/* Right eye */}
        <ellipse cx="218" cy="120" rx="28" ry="20" fill={W} stroke={K} strokeWidth="2"/>
        <circle cx="218" cy="120" r="14" fill="#3d2600"/>
        <circle cx="218" cy="120" r="8" fill={K}/>
        <circle cx="224" cy="114" r="4" fill={W}/>
        <path d="M190 130 Q218 135 246 130" stroke={K} strokeWidth="1.5" fill="none" opacity="0.4"/>
        {/* Eyebrows (furrowed/sad) */}
        <path d="M92 96 Q122 90 150 95" stroke={K} strokeWidth="3" fill="none"/>
        <path d="M190 95 Q218 90 248 96" stroke={K} strokeWidth="3" fill="none"/>
        {/* Nose */}
        <path d="M162 148 Q170 155 178 148" stroke={K} strokeWidth="1.8" fill="none" opacity="0.5"/>
        {/* Sad mouth */}
        <path d="M138 163 Q170 170 202 163" stroke={K} strokeWidth="2.5" fill="none"/>
      </g>

      {/* Animated teardrop */}
      <g>
        <path d="M112 145 Q108 150 110 158 Q112 166 116 162 Q120 158 116 150Z" fill="rgba(150,200,255,0.8)" stroke="rgba(100,160,220,0.6)" strokeWidth="1">
          <animateTransform attributeName="transform" type="translate" from="0,0" to="0,55" dur="3.5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0;0.9;0.9;0" dur="3.5s" repeatCount="indefinite"/>
        </path>
      </g>

      {/* Eye wetness shine */}
      <circle cx="96" cy="125" r="3" fill={W} opacity="0.5">
        <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2s" repeatCount="indefinite"/>
      </circle>

      {/* Subtle aura */}
      <circle cx="170" cy="125" r="115" stroke={R} strokeWidth="1.5" fill="none" opacity="0.1">
        <animate attributeName="opacity" values="0.05;0.15;0.05" dur="4s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 10 — Adult and child facing each other, talking
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationTalking() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-talking"/>

      <g filter="url(#sk-talking)" strokeLinecap="round">
        {/* Floor */}
        <line x1="0" y1="255" x2="340" y2="255" stroke={K} strokeWidth="2.5"/>

        {/* Child (LEFT, shorter, facing right) */}
        {/* Head */}
        <circle cx="105" cy="115" r="28" fill="rgba(255,225,195,0.9)" stroke={K} strokeWidth="2"/>
        {/* Hair */}
        <path d="M79 104 Q82 82 105 79 Q128 82 131 104" fill={K} opacity="0.85"/>
        {/* Body */}
        <path d="M85 143 Q95 138 105 140 Q115 138 125 143 L122 215 Q105 219 88 215Z" fill={CREAM} stroke={K} strokeWidth="1.8"/>
        {/* Right arm raised toward adult */}
        <path d="M125 150 Q145 165 160 175" stroke={K} strokeWidth="7" strokeLinecap="round" fill="none"/>
        {/* Left arm down */}
        <path d="M85 150 Q78 175 80 200" stroke={K} strokeWidth="7" strokeLinecap="round" fill="none"/>
        {/* Legs */}
        <line x1="95" y1="215" x2="93" y2="255" stroke={K} strokeWidth="9" strokeLinecap="round"/>
        <line x1="115" y1="215" x2="117" y2="255" stroke={K} strokeWidth="9" strokeLinecap="round"/>
        {/* Face (turned right) - one eye visible */}
        <ellipse cx="116" cy="112" rx="8" ry="9" fill={W} stroke={K} strokeWidth="1.5"/>
        <circle cx="118" cy="113" r="5" fill={K}/>
        <circle cx="120" cy="110" r="2.5" fill={W}/>
        {/* Nose */}
        <circle cx="122" cy="120" r="2" fill={K} opacity="0.4"/>
        {/* Small smile */}
        <path d="M112 126 Q120 131 128 126" stroke={K} strokeWidth="1.8" fill="none"/>
        {/* Shadow */}
        <ellipse cx="105" cy="256" rx="30" ry="5" fill="rgba(26,26,26,0.12)"/>

        {/* Adult (RIGHT, taller, facing left) */}
        {/* Head */}
        <circle cx="225" cy="90" r="32" fill="rgba(255,225,195,0.9)" stroke={K} strokeWidth="2.2"/>
        {/* Hair */}
        <path d="M194 78 Q197 52 225 48 Q253 52 256 78" fill={K} opacity="0.82"/>
        {/* Body */}
        <path d="M200 125 Q212 120 225 122 Q238 120 250 125 L247 225 Q225 230 203 225Z" fill={CREAM} stroke={K} strokeWidth="2"/>
        {/* Left arm extended toward child */}
        <path d="M200 132 Q182 148 170 162" stroke={K} strokeWidth="9" strokeLinecap="round" fill="none"/>
        {/* Right arm */}
        <path d="M250 132 Q258 155 256 180" stroke={K} strokeWidth="8" strokeLinecap="round" fill="none"/>
        {/* Legs */}
        <line x1="210" y1="225" x2="208" y2="255" stroke={K} strokeWidth="11" strokeLinecap="round"/>
        <line x1="240" y1="225" x2="242" y2="255" stroke={K} strokeWidth="11" strokeLinecap="round"/>
        {/* Face (turned left) - one eye visible */}
        <ellipse cx="214" cy="87" rx="9" ry="10" fill={W} stroke={K} strokeWidth="1.8"/>
        <circle cx="212" cy="88" r="6" fill={K}/>
        <circle cx="210" cy="85" r="3" fill={W}/>
        {/* Nose */}
        <circle cx="206" cy="95" r="2.5" fill={K} opacity="0.4"/>
        {/* Expression */}
        <path d="M205 105 Q215 110 222 105" stroke={K} strokeWidth="2" fill="none"/>
        {/* Shadow */}
        <ellipse cx="225" cy="256" rx="38" ry="5" fill="rgba(26,26,26,0.12)"/>
      </g>

      {/* Dialogue dots between them */}
      {[0,1,2].map(i => (
        <circle key={i} cx={155+i*15} cy={175} r={4+i*2} fill={Y} opacity="0.6">
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur={`${1.5+i*0.4}s`} repeatCount="indefinite"/>
          <animate attributeName="cy" values={`${175};${172};${175}`} dur={`${1.5+i*0.4}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 11 — Door nearly closed, dark room
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationDoorClose() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      {/* Dark background */}
      <rect width="340" height="260" fill="rgba(20,15,10,0.85)"/>
      <SkFilter id="sk-doorclose"/>

      <g filter="url(#sk-doorclose)" strokeLinecap="round">
        {/* Dark door frame */}
        <rect x="100" y="15" width="140" height="235" rx="0" fill="rgba(30,20,10,0.9)" stroke={K} strokeWidth="3"/>
        {/* Closed door panel */}
        <rect x="103" y="18" width="132" height="229" rx="3" fill="rgba(20,15,8,0.95)" stroke="#3a2a1a" strokeWidth="2.5"/>
        {/* Small sliver of warm light at right edge */}
        <rect x="232" y="20" width="3" height="226" fill={Y} opacity="0.6">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
        </rect>
        {/* Floor */}
        <line x1="0" y1="250" x2="340" y2="250" stroke={K} strokeWidth="2.5"/>
        {/* Room walls barely visible */}
        <line x1="0" y1="0" x2="0" y2="260" stroke={K} strokeWidth="1" opacity="0.2"/>
        <line x1="340" y1="0" x2="340" y2="260" stroke={K} strokeWidth="1" opacity="0.2"/>
      </g>

      {/* Glow sliver */}
      <ellipse cx="235" cy="133" rx="8" ry="110" fill={Y} fillOpacity="0.15"/>

      {/* Overall darkness */}
      <rect width="340" height="260" fill="rgba(10,5,0,0.45)"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 12 — Bright white room, two silhouettes facing each other
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationWhiteRoom() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-whiteroom"/>

      <g filter="url(#sk-whiteroom)" strokeLinecap="round">
        {/* Floor line */}
        <line x1="0" y1="245" x2="340" y2="245" stroke={K} strokeWidth="2" opacity="0.35"/>
        {/* Back wall line */}
        <line x1="0" y1="80" x2="340" y2="80" stroke={K} strokeWidth="1" opacity="0.2"/>
        {/* Left wall */}
        <line x1="0" y1="0" x2="0" y2="260" stroke={K} strokeWidth="1" opacity="0.15"/>
        {/* Right wall */}
        <line x1="340" y1="0" x2="340" y2="260" stroke={K} strokeWidth="1" opacity="0.15"/>
        {/* Ceiling light */}
        <ellipse cx="170" cy="0" rx="120" ry="60" fill={Y} fillOpacity="0.08"/>

        {/* Adult silhouette (RIGHT, taller, facing LEFT) */}
        <circle cx="232" cy="90" r="28" fill={K} opacity="0.7"/>
        <path d="M210 88 Q215 68 232 64 Q249 68 254 88" fill={K} opacity="0.7"/>
        <path d="M204 118 Q218 112 232 114 Q246 112 260 118 L256 220 Q232 226 208 220Z" fill={K} opacity="0.7"/>
        <path d="M204 125 Q188 142 178 158" stroke={K} strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.7"/>
        <path d="M260 125 Q268 150 265 175" stroke={K} strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.65"/>
        <line x1="215" y1="220" x2="213" y2="245" stroke={K} strokeWidth="11" strokeLinecap="round" opacity="0.7"/>
        <line x1="249" y1="220" x2="251" y2="245" stroke={K} strokeWidth="11" strokeLinecap="round" opacity="0.7"/>

        {/* Child silhouette (LEFT, shorter, facing RIGHT) */}
        <circle cx="108" cy="105" r="22" fill={K} opacity="0.7"/>
        <path d="M88 103 Q91 83 108 79 Q125 83 128 103" fill={K} opacity="0.7"/>
        <path d="M88 130 Q97 125 108 127 Q119 125 128 130 L126 215 Q108 220 90 215Z" fill={K} opacity="0.7"/>
        <path d="M128 137 Q142 150 155 162" stroke={K} strokeWidth="8" strokeLinecap="round" fill="none" opacity="0.7"/>
        <path d="M88 135 Q80 158 82 180" stroke={K} strokeWidth="7" strokeLinecap="round" fill="none" opacity="0.65"/>
        <line x1="95" y1="215" x2="93" y2="245" stroke={K} strokeWidth="10" strokeLinecap="round" opacity="0.7"/>
        <line x1="121" y1="215" x2="123" y2="245" stroke={K} strokeWidth="10" strokeLinecap="round" opacity="0.7"/>

        {/* Warm glow between them */}
        <ellipse cx="170" cy="180" rx="45" ry="35" fill={Y} fillOpacity="0.1">
          <animate attributeName="fill-opacity" values="0.05;0.18;0.05" dur="3s" repeatCount="indefinite"/>
        </ellipse>
      </g>

      {/* Floating sparkle dots */}
      {[[60,50],[280,45],[50,190],[290,185],[170,25]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="3" fill={Y} opacity="0.5">
          <animate attributeName="cy" values={`${cy};${cy-15};${cy}`} dur={`${3+i*0.6}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur={`${3+i*0.6}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* Overall gentle brightness */}
      <rect width="340" height="260" fill="rgba(255,255,255,0.25)"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 13 — Child handing red gift box to adult
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationGiftGive() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-giftgive"/>

      <g filter="url(#sk-giftgive)" strokeLinecap="round">
        {/* Floor */}
        <line x1="0" y1="253" x2="340" y2="253" stroke={K} strokeWidth="2.5"/>

        {/* Child (LEFT, shorter, cx≈100) */}
        <circle cx="100" cy="100" r="24" fill="rgba(255,225,195,0.9)" stroke={K} strokeWidth="2"/>
        <path d="M78 89 Q81 71 100 68 Q119 71 122 89" fill={K} opacity="0.85"/>
        {/* Neck */}
        <rect x="92" y="122" width="16" height="14" rx="5" fill="rgba(255,225,195,0.9)" stroke={K} strokeWidth="1.5"/>
        {/* Body */}
        <path d="M80 136 Q90 131 100 133 Q110 131 120 136 L117 210 Q100 214 83 210Z" fill={CREAM} stroke={K} strokeWidth="1.8"/>
        {/* Left arm (secondary) */}
        <path d="M82 142 Q70 167 75 192" stroke={K} strokeWidth="8" strokeLinecap="round" fill="none"/>
        {/* Right arm (holds box) */}
        <path d="M118 142 Q138 162 150 182" stroke={K} strokeWidth="8" strokeLinecap="round" fill="none"/>
        {/* Legs */}
        <line x1="90" y1="210" x2="88" y2="253" stroke={K} strokeWidth="9" strokeLinecap="round"/>
        <line x1="110" y1="210" x2="112" y2="253" stroke={K} strokeWidth="9" strokeLinecap="round"/>
        {/* Happy face, looking up */}
        <ellipse cx="110" cy="96" rx="7" ry="8" fill={W} stroke={K} strokeWidth="1.5"/>
        <circle cx="111" cy="94" r="5" fill={K}/>
        <circle cx="113" cy="91" r="2.5" fill={W}/>
        {/* Nose */}
        <circle cx="115" cy="104" r="2" fill={K} opacity="0.4"/>
        {/* Smile */}
        <path d="M105 112 Q113 118 121 112" stroke={K} strokeWidth="1.8" fill="none"/>
        {/* Blush */}
        <ellipse cx="88" cy="108" rx="14" ry="9" fill={R} fillOpacity="0.1"/>

        {/* Gift box (CENTER, cx≈170) */}
        {/* Box base */}
        <rect x="142" y="158" width="56" height="44" rx="5" fill={R} stroke="#8B0000" strokeWidth="2.5">
          <animateTransform attributeName="transform" type="translate" values="0,0;0,-5;0,0" dur="2.5s" repeatCount="indefinite"/>
        </rect>
        {/* Lid */}
        <rect x="138" y="143" width="64" height="20" rx="5" fill="#D32F2F" stroke="#8B0000" strokeWidth="2">
          <animateTransform attributeName="transform" type="translate" values="0,0;0,-5;0,0" dur="2.5s" repeatCount="indefinite"/>
        </rect>
        {/* Bow left loop */}
        <path d="M162 153 Q148 138 155 130 Q162 138 162 153Z" fill={Y} stroke={R} strokeWidth="1.5">
          <animateTransform attributeName="transform" type="translate" values="0,0;0,-5;0,0" dur="2.5s" repeatCount="indefinite"/>
        </path>
        {/* Bow right loop */}
        <path d="M178 153 Q192 138 185 130 Q178 138 178 153Z" fill={Y} stroke={R} strokeWidth="1.5">
          <animateTransform attributeName="transform" type="translate" values="0,0;0,-5;0,0" dur="2.5s" repeatCount="indefinite"/>
        </path>
        {/* Bow center knot */}
        <ellipse cx="170" cy="153" rx="8" ry="6" fill={Y} stroke={R} strokeWidth="1">
          <animateTransform attributeName="transform" type="translate" values="0,0;0,-5;0,0" dur="2.5s" repeatCount="indefinite"/>
        </ellipse>
        {/* Ribbon line */}
        <line x1="170" y1="153" x2="170" y2="202" stroke={Y} strokeWidth="2">
          <animateTransform attributeName="transform" type="translate" values="0,0;0,-5;0,0" dur="2.5s" repeatCount="indefinite"/>
        </line>

        {/* Adult (RIGHT, taller, cx≈250) */}
        <circle cx="250" cy="80" r="30" fill="rgba(255,225,195,0.9)" stroke={K} strokeWidth="2.2"/>
        <path d="M221 68 Q225 46 250 42 Q275 46 279 68" fill={K} opacity="0.82"/>
        {/* Neck */}
        <rect x="240" y="108" width="20" height="16" rx="6" fill="rgba(255,225,195,0.9)" stroke={K} strokeWidth="1.5"/>
        {/* Body */}
        <path d="M225 124 Q237 118 250 120 Q263 118 275 124 L272 225 Q250 230 228 225Z" fill={CREAM} stroke={K} strokeWidth="2"/>
        {/* Reaching arm toward box */}
        <path d="M232 127 Q210 152 192 175" stroke={K} strokeWidth="9" strokeLinecap="round" fill="none"/>
        {/* Right arm down */}
        <path d="M275 130 Q282 158 280 185" stroke={K} strokeWidth="8" strokeLinecap="round" fill="none"/>
        {/* Legs */}
        <line x1="237" y1="225" x2="235" y2="253" stroke={K} strokeWidth="11" strokeLinecap="round"/>
        <line x1="263" y1="225" x2="265" y2="253" stroke={K} strokeWidth="11" strokeLinecap="round"/>
        {/* Surprised/pleased face */}
        <ellipse cx="240" cy="76" rx="9" ry="10" fill={W} stroke={K} strokeWidth="1.8"/>
        <circle cx="238" cy="77" r="6" fill={K}/>
        <circle cx="236" cy="74" r="3" fill={W}/>
        <circle cx="258" cy="80" r="3.5" fill={W} stroke={K} strokeWidth="1.5"/>
        {/* Nose */}
        <circle cx="244" cy="88" r="2" fill={K} opacity="0.4"/>
        {/* Slight open mouth */}
        <path d="M236 96 Q244 101 252 96" stroke={K} strokeWidth="2" fill="none"/>
      </g>
    </svg>
  );
}

export const ILLUSTRATIONS = [
  IllustrationCity,        // 0
  IllustrationRoom,        // 1
  IllustrationSleep,       // 2
  IllustrationEyes,        // 3
  IllustrationChildShadow, // 4
  IllustrationChildFace,   // 5
  IllustrationDoors,       // 6
  IllustrationDoorOpen,    // 7
  IllustrationGlow,        // 8
  IllustrationTears,       // 9
  IllustrationTalking,     // 10
  IllustrationDoorClose,   // 11
  IllustrationWhiteRoom,   // 12
  IllustrationGiftGive,    // 13
];
