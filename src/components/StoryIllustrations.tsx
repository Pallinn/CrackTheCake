"use client";
import { useState, useEffect } from "react";

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
   SCENE 2 — Adult face on pillow, eyes closing → sleep (zzz)
   Animation: eyes open → half-close → fully closed → zzz float
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationSleep() {
  const HAIR   = "#c07840";
  const HAIR_D = "#8a5025";
  const SKIN   = "rgba(255,226,202,0.96)";
  const BLUSH  = "rgba(238,168,52,0.38)";
  const LINE   = "#b05835";

  // Timing: 0–20% open | 20–38% closing | 38–55% half-close | 55–75% closed+ZZZ | 75–100% open
  const DUR = "7s";
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-sleep"/>

      <g filter="url(#sk-sleep)" strokeLinecap="round">
        {/* ── Floor ── */}
        <line x1="0" y1="257" x2="340" y2="257" stroke={K} strokeWidth="3"/>

        {/* ── Blanket / sheet below pillow ── */}
        <path d="M25 188 Q170 180 315 188 L315 257 Q170 263 25 257Z"
          fill={CREAM} stroke={R} strokeWidth="2.2"/>
        <path d="M25 200 Q170 195 315 200" stroke={R} strokeWidth="1.2" opacity="0.35"/>

        {/* ── Pillow (wide, horizontal) ── */}
        <rect x="48" y="120" width="244" height="78" rx="16"
          fill="rgba(255,255,255,0.82)" stroke={R} strokeWidth="2.2"/>
        <path d="M80 150 Q170 145 260 150" stroke={R} strokeWidth="1" opacity="0.28"/>

        {/* ── Hair back mass (behind head) ── */}
        <path d="M116 105 Q118 76 170 70 Q222 76 224 105
                 Q212 95 204 102 Q196 109 188 102 Q180 95 172 102
                 Q164 109 156 102 Q148 95 140 102 Q132 109 124 102 Z"
          fill={HAIR}/>
        {/* hair strand details */}
        <path d="M140 88 Q148 78 158 75" stroke={HAIR_D} strokeWidth="1" fill="none"/>
        <path d="M155 76 Q162 70 170 70" stroke={HAIR_D} strokeWidth="1" fill="none"/>
        <path d="M170 70 Q178 70 185 76" stroke={HAIR_D} strokeWidth="1" fill="none"/>
        <path d="M185 77 Q194 80 200 88" stroke={HAIR_D} strokeWidth="1" fill="none"/>

        {/* ── Head (front-facing, resting on pillow) ── */}
        <circle cx="170" cy="132" r="55"
          fill={SKIN} stroke={LINE} strokeWidth="2.2"/>

        {/* ── Ears ── */}
        <path d="M115 122 Q104 124 106 138 Q108 150 119 147"
          stroke={LINE} strokeWidth="1.8" fill="none"/>
        <path d="M225 122 Q236 124 234 138 Q232 150 221 147"
          stroke={LINE} strokeWidth="1.8" fill="none"/>

        {/* ── Eyebrows ── */}
        <path d="M133 110 Q150 104 167 109" stroke={HAIR_D} strokeWidth="2.0" fill="none"/>
        <path d="M173 109 Q190 104 207 110" stroke={HAIR_D} strokeWidth="2.0" fill="none"/>

        {/* ── Cheek blush ── */}
        <circle cx="126" cy="142" r="18" fill={BLUSH} opacity="0.8"/>
        <circle cx="214" cy="142" r="18" fill={BLUSH} opacity="0.8"/>

        {/* ── OPEN EYES (fade out as sleeping) ── */}
        <g>
          <animate attributeName="opacity"
            values="1;1;0;0;0;0;1"
            keyTimes="0;0.18;0.32;0.55;0.75;0.88;1"
            dur={DUR} repeatCount="indefinite"/>
          <circle cx="150" cy="124" r="11" fill="#1a1212"/>
          <circle cx="154" cy="120" r="4"  fill="white" opacity="0.75"/>
          <circle cx="190" cy="124" r="11" fill="#1a1212"/>
          <circle cx="194" cy="120" r="4"  fill="white" opacity="0.75"/>
        </g>

        {/* ── HALF-CLOSED EYES (brief transition) ── */}
        <g opacity="0">
          <animate attributeName="opacity"
            values="0;0;1;1;0;0;0"
            keyTimes="0;0.25;0.32;0.45;0.55;0.88;1"
            dur={DUR} repeatCount="indefinite"/>
          <ellipse cx="150" cy="127" rx="13" ry="5" fill="#1a1212"/>
          <ellipse cx="190" cy="127" rx="13" ry="5" fill="#1a1212"/>
        </g>

        {/* ── CLOSED EYES arcs (like reference) ── */}
        <g opacity="0">
          <animate attributeName="opacity"
            values="0;0;0;1;1;0;0"
            keyTimes="0;0.42;0.52;0.58;0.78;0.88;1"
            dur={DUR} repeatCount="indefinite"/>
          <path d="M136 124 Q150 134 164 124" stroke={LINE} strokeWidth="2.6" fill="none" strokeLinecap="round"/>
          <line x1="139" y1="123" x2="137" y2="118" stroke={LINE} strokeWidth="1.2"/>
          <line x1="150" y1="121" x2="150" y2="116" stroke={LINE} strokeWidth="1.2"/>
          <line x1="161" y1="123" x2="163" y2="118" stroke={LINE} strokeWidth="1.2"/>
          <path d="M176 124 Q190 134 204 124" stroke={LINE} strokeWidth="2.6" fill="none" strokeLinecap="round"/>
          <line x1="179" y1="123" x2="177" y2="118" stroke={LINE} strokeWidth="1.2"/>
          <line x1="190" y1="121" x2="190" y2="116" stroke={LINE} strokeWidth="1.2"/>
          <line x1="201" y1="123" x2="203" y2="118" stroke={LINE} strokeWidth="1.2"/>
        </g>

        {/* ── Nose ── */}
        <circle cx="163" cy="140" r="2.5" fill={LINE} opacity="0.42"/>
        <circle cx="177" cy="140" r="2.5" fill={LINE} opacity="0.42"/>

        {/* ── Mouth (relaxed) ── */}
        <path d="M156 154 Q170 162 184 154" stroke={LINE} strokeWidth="1.8" fill="none"/>

        {/* ── Neck + shoulder hint ── */}
        <line x1="154" y1="186" x2="148" y2="200" stroke={LINE} strokeWidth="2.5"/>
        <line x1="186" y1="186" x2="192" y2="200" stroke={LINE} strokeWidth="2.5"/>
        <path d="M148 200 Q170 206 192 200" stroke={LINE} strokeWidth="2" fill="none"/>
      </g>

      {/* ── ZZZ — float up only while eyes are closed ── */}
      {([
        { x: 208, y: 108, size: 16, kt: "0;0;0;0;0.9;0;0", delay: "0;0.52;0.56;0.60;0.68;0.76;1", tx: 6,  ty: -22 },
        { x: 224, y:  90, size: 21, kt: "0;0;0;0;0;0.9;0", delay: "0;0.52;0.58;0.64;0.68;0.76;1", tx: 9,  ty: -32 },
        { x: 244, y:  70, size: 28, kt: "0;0;0;0;0;0;0.9", delay: "0;0.52;0.60;0.66;0.70;0.78;1", tx: 12, ty: -44 },
      ] as {x:number;y:number;size:number;kt:string;delay:string;tx:number;ty:number}[]).map((z, i) => (
        <text key={i} x={z.x} y={z.y} fontSize={z.size}
          fontFamily="Georgia, serif" fontWeight="bold" fill={Y} opacity="0">
          z
          <animate attributeName="opacity"
            values={z.kt} keyTimes={z.delay} dur={DUR} repeatCount="indefinite"/>
          <animateTransform attributeName="transform" type="translate"
            from="0,0" to={`${z.tx},${z.ty}`} dur={DUR} repeatCount="indefinite"/>
        </text>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 3 — Same face as scene 2, blinking awake (3 quick blinks)
   Face is identical to IllustrationSleep but eyes are OPEN,
   blinking quickly 3 times then resting open.
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationEyes() {
  // 9s loop: open(0–1s) → blink1(1–1.4s) → open(1.4–3s) → blink2(3–3.4s) → open(3.4–5.5s) → blink3(5.5–5.9s) → open(5.9–9s)
  // Expressed as keyTimes over 9s total:
  // blink = close(0.1s) + open(0.1s) = 0.2s each
  const D = "9s";
  // open=1, closed=0
  // t:  0   /0.11 /0.15 /0.20 /0.33 /0.38 /0.42 /0.61 /0.65 /0.69 /1
  const openVals  = "1;1;0;0;1;1;0;0;1;1;0;0;1;1";
  const openTimes = "0;0.10;0.14;0.19;0.23;0.32;0.36;0.41;0.45;0.60;0.64;0.69;0.73;1";
  const closeVals  = "0;0;1;1;0;0;1;1;0;0;1;1;0;0";
  const closeTimes = openTimes;

  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-eyes"/>

      <g filter="url(#sk-eyes)" strokeLinecap="round">
        {/* ── Floor ── */}
        <line x1="0" y1="257" x2="340" y2="257" stroke={K} strokeWidth="3"/>

        {/* ── Blanket / sheet ── */}
        <path d="M25 188 Q170 180 315 188 L315 257 Q170 263 25 257Z"
          fill={CREAM} stroke={R} strokeWidth="2.2"/>
        <path d="M25 200 Q170 195 315 200" stroke={R} strokeWidth="1.2" opacity="0.35"/>

        {/* ── Pillow ── */}
        <rect x="48" y="120" width="244" height="78" rx="16"
          fill="rgba(255,255,255,0.82)" stroke={R} strokeWidth="2.2"/>
        <path d="M80 150 Q170 145 260 150" stroke={R} strokeWidth="1" opacity="0.28"/>

        {/* ── Head (same as scene 2) ── */}
        <circle cx="170" cy="132" r="56"
          fill="rgba(255,225,195,0.93)" stroke={K} strokeWidth="2.5"/>

        {/* ── Hair ── */}
        <path d="M116 106 Q120 78 170 72 Q220 78 224 106
                 Q212 96 204 103 Q196 110 188 103 Q180 96 172 103
                 Q164 110 156 103 Q148 96 140 103 Q132 110 124 103 Z"
          fill={K} opacity="0.88"/>

        {/* ── Ears ── */}
        <path d="M114 122 Q103 124 105 138 Q107 150 118 147"
          stroke={K} strokeWidth="2.2" fill="none"/>
        <path d="M226 122 Q237 124 235 138 Q233 150 222 147"
          stroke={K} strokeWidth="2.2" fill="none"/>

        {/* ── Eyebrows ── */}
        <path d="M132 110 Q150 105 168 110" stroke={K} strokeWidth="2.2" fill="none"/>
        <path d="M172 110 Q190 105 208 110" stroke={K} strokeWidth="2.2" fill="none"/>

        {/* ── OPEN EYES (fade out on blink) ── */}
        <g>
          <animate attributeName="opacity" values={openVals} keyTimes={openTimes} dur={D} repeatCount="indefinite"/>
          {/* Left eye */}
          <ellipse cx="150" cy="124" rx="20" ry="14"
            fill="rgba(255,255,255,0.92)" stroke={K} strokeWidth="1.8"/>
          <circle cx="150" cy="124" r="9"  fill="#3a2000"/>
          <circle cx="150" cy="124" r="5"  fill={K}/>
          <circle cx="154" cy="120" r="3"  fill="rgba(255,255,255,0.9)"/>
          {/* Right eye */}
          <ellipse cx="190" cy="124" rx="20" ry="14"
            fill="rgba(255,255,255,0.92)" stroke={K} strokeWidth="1.8"/>
          <circle cx="190" cy="124" r="9"  fill="#3a2000"/>
          <circle cx="190" cy="124" r="5"  fill={K}/>
          <circle cx="194" cy="120" r="3"  fill="rgba(255,255,255,0.9)"/>
        </g>

        {/* ── CLOSED EYES (arc, shown on blink) ── */}
        <g opacity="0">
          <animate attributeName="opacity" values={closeVals} keyTimes={closeTimes} dur={D} repeatCount="indefinite"/>
          <path d="M130 124 Q150 132 170 124" stroke={K} strokeWidth="2.5" fill="none"/>
          <path d="M170 124 Q190 132 210 124" stroke={K} strokeWidth="2.5" fill="none"/>
        </g>

        {/* ── Nose ── */}
        <path d="M162 140 Q170 147 178 140" stroke={K} strokeWidth="1.8" fill="none"/>

        {/* ── Mouth (slight smile — waking up) ── */}
        <path d="M156 154 Q170 162 184 154" stroke={K} strokeWidth="1.8" fill="none"/>

        {/* ── Neck + shoulder hint ── */}
        <line x1="154" y1="186" x2="148" y2="200" stroke={K} strokeWidth="3"/>
        <line x1="186" y1="186" x2="192" y2="200" stroke={K} strokeWidth="3"/>
        <path d="M148 200 Q170 206 192 200" stroke={K} strokeWidth="2.2" fill="none"/>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 4 — Simple kid, blurry yellow-green blobs bg
   Same SkFilter line-art style as city scene
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationChildShadow() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <defs>
        <filter id="blob-blur-cs4" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="10"/>
        </filter>
      </defs>
      <SkFilter id="sk-childshadow"/>

      {/* Left blobs */}
      <ellipse cx="68"  cy="145" rx="68" ry="112" fill="rgba(185,210,58,0.55)"  filter="url(#blob-blur-cs4)"/>
      <ellipse cx="52"  cy="120" rx="50" ry="80"  fill="rgba(155,185,38,0.45)"  filter="url(#blob-blur-cs4)"/>
      <ellipse cx="80"  cy="170" rx="40" ry="58"  fill="rgba(132,162,25,0.38)"  filter="url(#blob-blur-cs4)"/>
      {/* Right blobs */}
      <ellipse cx="272" cy="145" rx="68" ry="112" fill="rgba(185,210,58,0.55)"  filter="url(#blob-blur-cs4)"/>
      <ellipse cx="288" cy="120" rx="50" ry="80"  fill="rgba(155,185,38,0.45)"  filter="url(#blob-blur-cs4)"/>
      <ellipse cx="260" cy="170" rx="40" ry="58"  fill="rgba(132,162,25,0.38)"  filter="url(#blob-blur-cs4)"/>

      <g filter="url(#sk-childshadow)" strokeLinecap="round">
        <line x1="0" y1="257" x2="340" y2="257" stroke={K} strokeWidth="2.5"/>
        {/* Head */}
        <circle cx="170" cy="78" r="42" fill={CREAM} stroke={K} strokeWidth="2.2"/>
        {/* Simple hair zigzag */}
        <path d="M130 63 Q135 50 142 57 Q147 44 154 55 Q159 42 166 54 Q170 41 174 54 Q181 42 187 55 Q193 44 198 57 Q205 50 210 63"
          stroke={K} strokeWidth="2" fill="none"/>
        {/* Eyes */}
        <circle cx="157" cy="78" r="8" fill={W} stroke={K} strokeWidth="1.8"/>
        <circle cx="183" cy="78" r="8" fill={W} stroke={K} strokeWidth="1.8"/>
        <circle cx="157" cy="79" r="4" fill={K}/>
        <circle cx="183" cy="79" r="4" fill={K}/>
        {/* Nose dots */}
        <circle cx="167" cy="92" r="1.8" fill={K} opacity="0.6"/>
        <circle cx="173" cy="92" r="1.8" fill={K} opacity="0.6"/>
        {/* Smile */}
        <path d="M154 103 Q170 115 186 103" stroke={K} strokeWidth="2.2" fill="none"/>
        {/* Neck */}
        <line x1="163" y1="118" x2="161" y2="130" stroke={K} strokeWidth="3"/>
        <line x1="177" y1="118" x2="179" y2="130" stroke={K} strokeWidth="3"/>
        {/* T-shirt yellow */}
        <path d="M140 130 Q154 124 170 126 Q186 124 200 130 L197 186 Q170 192 143 186Z"
          fill={Y} stroke={K} strokeWidth="2"/>
        {/* Sleeves */}
        <path d="M140 130 Q127 134 120 148 Q127 156 137 150 Q139 142 141 136Z"
          fill={Y} stroke={K} strokeWidth="1.8"/>
        <path d="M200 130 Q213 134 220 148 Q213 156 203 150 Q201 142 199 136Z"
          fill={Y} stroke={K} strokeWidth="1.8"/>
        {/* Arms */}
        <line x1="122" y1="152" x2="114" y2="180" stroke={K} strokeWidth="4.5"/>
        <circle cx="114" cy="184" r="7" fill={CREAM} stroke={K} strokeWidth="1.8"/>
        <line x1="218" y1="152" x2="226" y2="180" stroke={K} strokeWidth="4.5"/>
        <circle cx="226" cy="184" r="7" fill={CREAM} stroke={K} strokeWidth="1.8"/>
        {/* Shorts blue */}
        <path d="M143 186 Q156 181 170 183 Q184 181 197 186 L194 215 Q170 220 146 215Z"
          fill="rgba(70,110,200,0.88)" stroke={K} strokeWidth="2"/>
        <line x1="170" y1="182" x2="170" y2="215" stroke={K} strokeWidth="1.4" opacity="0.3"/>
        {/* Legs */}
        <line x1="153" y1="215" x2="151" y2="248" stroke={K} strokeWidth="5" strokeLinecap="round"/>
        <line x1="187" y1="215" x2="189" y2="248" stroke={K} strokeWidth="5" strokeLinecap="round"/>
        {/* Shoes black */}
        <ellipse cx="149" cy="252" rx="16" ry="8" fill={K} stroke={K} strokeWidth="1.5"/>
        <ellipse cx="191" cy="252" rx="16" ry="8" fill={K} stroke={K} strokeWidth="1.5"/>
      </g>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 5 — Child face close-up, smiling, looking up
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationChildFace() {
  const HAIR   = "#c07840";               // warm copper-brown hair base
  const HAIR_D = "#8a5025";               // darker hair strand detail
  const SKIN   = "rgba(255,226,202,0.96)";
  const BLUSH  = "rgba(238,168,52,0.38)";
  const LINE   = "#b05835";               // warm reddish-brown outline
  const SHIRT  = "rgba(251,192,45,0.92)"; // yellow collar

  // Blink: open 2s → close 0.3s → closed 1.2s → open 0.3s → open 1.2s loop (5s total)
  const DUR   = "5s";
  const KT    = "0;0.36;0.42;0.64;0.70;1";
  const openV = "1;1;0;0;1;1";
  const closV = "0;0;1;1;0;0";

  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-childface"/>

      <g filter="url(#sk-childface)" strokeLinecap="round">

        {/* ── Hair back mass (behind face) ── */}
        <path
          d="M92 152 Q76 108 84 64 Q98 22 132 12 Q152 6 170 6 Q188 6 208 12 Q242 22 256 64 Q264 108 248 152 Q218 128 170 126 Q122 128 92 152Z"
          fill={HAIR}/>

        {/* ── Ears ── */}
        <ellipse cx="86" cy="140" rx="12" ry="15" fill={SKIN} stroke={LINE} strokeWidth="1.5"/>
        <ellipse cx="254" cy="140" rx="12" ry="15" fill={SKIN} stroke={LINE} strokeWidth="1.5"/>

        {/* ── Face oval ── */}
        <ellipse cx="170" cy="142" rx="83" ry="86" fill={SKIN} stroke={LINE} strokeWidth="2"/>

        {/* ── Hair front fringe (over forehead) ── */}
        <path
          d="M90 96 Q102 58 132 48 Q152 40 170 42 Q188 40 208 48 Q238 58 250 96 Q230 72 200 66 Q184 62 170 62 Q156 62 140 66 Q110 72 90 96Z"
          fill={HAIR}/>

        {/* ── Hair strand texture ── */}
        <path d="M148 28 Q130 48 116 70" stroke={HAIR_D} strokeWidth="1.1" fill="none"/>
        <path d="M156 24 Q140 44 128 62" stroke={HAIR_D} strokeWidth="1.0" fill="none"/>
        <path d="M164 22 Q152 40 144 56" stroke={HAIR_D} strokeWidth="0.9" fill="none"/>
        <path d="M96  62 Q84  82 78  106" stroke={HAIR_D} strokeWidth="1.0" fill="none"/>
        <path d="M104 52 Q92  70 86  92"  stroke={HAIR_D} strokeWidth="0.9" fill="none"/>
        <path d="M192 28 Q210 48 224 70" stroke={HAIR_D} strokeWidth="1.1" fill="none"/>
        <path d="M184 24 Q200 44 212 62" stroke={HAIR_D} strokeWidth="1.0" fill="none"/>
        <path d="M176 22 Q188 40 196 56" stroke={HAIR_D} strokeWidth="0.9" fill="none"/>
        <path d="M244 62 Q256 82 262 106" stroke={HAIR_D} strokeWidth="1.0" fill="none"/>
        <path d="M236 52 Q248 70 254 92"  stroke={HAIR_D} strokeWidth="0.9" fill="none"/>
        <path d="M168 24 Q166 14 164 8" stroke={HAIR_D} strokeWidth="0.9" fill="none"/>
        <path d="M172 24 Q174 14 176 8" stroke={HAIR_D} strokeWidth="0.9" fill="none"/>

        {/* ── Eyebrows ── */}
        <path d="M122 108 Q140 101 158 106" stroke={HAIR_D} strokeWidth="2.2" fill="none"/>
        <path d="M182 106 Q200 101 218 108" stroke={HAIR_D} strokeWidth="2.2" fill="none"/>

        {/* ── Cheek blush ── */}
        <circle cx="114" cy="158" r="24" fill={BLUSH} opacity="0.85"/>
        <circle cx="226" cy="158" r="24" fill={BLUSH} opacity="0.85"/>

        {/* ── Eyes OPEN (fade out on blink) ── */}
        <g>
          <animate attributeName="opacity" values={openV} keyTimes={KT} dur={DUR} repeatCount="indefinite"/>
          <circle cx="140" cy="134" r="12" fill="#1a1212"/>
          <circle cx="144" cy="129" r="4"  fill="white" opacity="0.75"/>
          <circle cx="200" cy="134" r="12" fill="#1a1212"/>
          <circle cx="204" cy="129" r="4"  fill="white" opacity="0.75"/>
        </g>

        {/* ── Eyes CLOSED arcs (fade in on blink) ── */}
        <g>
          <animate attributeName="opacity" values={closV} keyTimes={KT} dur={DUR} repeatCount="indefinite"/>
          <path d="M127 134 Q140 146 153 134" stroke={LINE} strokeWidth="2.8" fill="none" strokeLinecap="round"/>
          <line x1="130" y1="133" x2="128" y2="128" stroke={LINE} strokeWidth="1.2"/>
          <line x1="140" y1="130" x2="140" y2="125" stroke={LINE} strokeWidth="1.2"/>
          <line x1="150" y1="133" x2="152" y2="128" stroke={LINE} strokeWidth="1.2"/>
          <path d="M187 134 Q200 146 213 134" stroke={LINE} strokeWidth="2.8" fill="none" strokeLinecap="round"/>
          <line x1="190" y1="133" x2="188" y2="128" stroke={LINE} strokeWidth="1.2"/>
          <line x1="200" y1="130" x2="200" y2="125" stroke={LINE} strokeWidth="1.2"/>
          <line x1="210" y1="133" x2="212" y2="128" stroke={LINE} strokeWidth="1.2"/>
        </g>

        {/* ── Nose: two soft dots ── */}
        <circle cx="162" cy="157" r="2.8" fill={LINE} opacity="0.45"/>
        <circle cx="178" cy="157" r="2.8" fill={LINE} opacity="0.45"/>

        {/* ── Smile ── */}
        <path d="M148 172 Q170 186 192 172" stroke={LINE} strokeWidth="2.4" fill="none" strokeLinecap="round"/>

        {/* ── Neck ── */}
        <path d="M152 224 Q170 230 188 224 L190 260 L150 260Z" fill={SKIN}/>

        {/* ── Yellow shirt collar ── */}
        <path d="M106 258 Q148 235 170 240 Q192 235 234 258Z" fill={SHIRT} stroke={LINE} strokeWidth="1.5"/>
        <path d="M158 240 Q170 252 182 240" stroke={LINE} strokeWidth="1.2" fill="none"/>

      </g>
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

/* ═══════════════════════════════════════════════════════════════
   SCENE 13 — Present PNG
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationPresent() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/present.png"
      alt="present"
      className="w-full max-w-sm mx-auto rounded-xl"
      style={{ display: "block" }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 12 — Yellow room PNG
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationYellowRoom() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/yellow_room.png"
      alt="yellow room"
      className="w-full max-w-sm mx-auto rounded-xl"
      style={{ display: "block" }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 11 — Door closing: door_3 → door_2 → door_1, stops on last
   ═══════════════════════════════════════════════════════════════ */
const DOOR_CLOSE_FRAMES = ["/door_3.png", "/door_2.png", "/door_1.png"];

const DOOR_CLOSE_BRIGHTNESS = [1, 0.55, 0.15]; // brightness per step

export function IllustrationDoorClosing() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= DOOR_CLOSE_FRAMES.length - 1) return;
    const t = setTimeout(() => setStep(s => s + 1), 1800);
    return () => clearTimeout(t);
  }, [step]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={DOOR_CLOSE_FRAMES[step]}
      alt="door closing"
      className="w-full max-w-sm mx-auto rounded-xl"
      style={{
        display: "block",
        filter: `brightness(${DOOR_CLOSE_BRIGHTNESS[step]})`,
        transition: "filter 1.6s ease",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 10 — Dark: cycles dark_1/2/3.png, stops on last
   ═══════════════════════════════════════════════════════════════ */
const DARK_FRAMES = ["/dark_1.png", "/dark_2.png", "/dark_3.png"];

export function IllustrationDark() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= DARK_FRAMES.length - 1) return;
    const t = setTimeout(() => setStep(s => s + 1), 1800);
    return () => clearTimeout(t);
  }, [step]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={DARK_FRAMES[step]}
      alt="fading dark"
      className="w-full max-w-sm mx-auto rounded-xl"
      style={{ display: "block" }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 9 — Cry: cycles cry_1/2/3.png, stops on last
   ═══════════════════════════════════════════════════════════════ */
const CRY_FRAMES = ["/cry_1.png", "/cry_2.png", "/cry_3.png"];

export function IllustrationCry() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= CRY_FRAMES.length - 1) return;
    const t = setTimeout(() => setStep(s => s + 1), 1800);
    return () => clearTimeout(t);
  }, [step]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={CRY_FRAMES[step]}
      alt="crying"
      className="w-full max-w-sm mx-auto rounded-xl"
      style={{ display: "block" }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 8 — Memory PNG
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationMemory() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/memory.png"
      alt="memory"
      className="w-full max-w-sm mx-auto rounded-xl"
      style={{ display: "block" }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 7 — Door opening: fast cycle door_1/2/3, zoom in on last
   ═══════════════════════════════════════════════════════════════ */
const DOOR_FRAMES = ["/door_1.png", "/door_2.png", "/door_3.png"];

export function IllustrationDoorOpening() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= DOOR_FRAMES.length - 1) return;
    const t = setTimeout(() => setStep(s => s + 1), 400);
    return () => clearTimeout(t);
  }, [step]);

  const isLast = step === DOOR_FRAMES.length - 1;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={DOOR_FRAMES[step]}
      alt="door opening"
      className="w-full max-w-sm mx-auto rounded-xl"
      style={{
        display: "block",
        transform: isLast ? "scale(1.18)" : "scale(1)",
        transition: isLast ? "transform 1.2s cubic-bezier(0.25,0.46,0.45,0.94)" : "none",
        transformOrigin: "center center",
      }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 6 — 5 doors PNG
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationFiveDoors() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/5_doors.png"
      alt="5 doors"
      className="w-full max-w-sm mx-auto rounded-xl"
      style={{ display: "block" }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 5 — Boy smile: cycles boy_smile_1/2/3.png, stops on last
   ═══════════════════════════════════════════════════════════════ */
const BOY_SMILE_FRAMES = ["/boy_smile_1.png", "/boy_smile_2.png", "/boy_smile_3.png"];

export function IllustrationBoySmile() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= BOY_SMILE_FRAMES.length - 1) return;
    const t = setTimeout(() => setStep(s => s + 1), 1800);
    return () => clearTimeout(t);
  }, [step]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={BOY_SMILE_FRAMES[step]}
      alt="boy smiling"
      className="w-full max-w-sm mx-auto rounded-xl"
      style={{ display: "block" }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 4 — Little boy PNG
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationLittleBoy() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/littleboy.png"
      alt="little boy"
      className="w-full max-w-sm mx-auto rounded-xl"
      style={{ display: "block" }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 3 — Waking up shock: cycles through 3 PNG frames, stops on last
   ═══════════════════════════════════════════════════════════════ */
const SHOCK_SEQUENCE = ["/shock_1.png", "/shock_2.png", "/shock_1.png", "/shock_2.png", "/shock_3.png"];
const SHOCK_DELAYS   = [900, 900, 900, 1800]; // delay before advancing to next step

export function IllustrationShock() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= SHOCK_SEQUENCE.length - 1) return;
    const t = setTimeout(() => setStep(s => s + 1), SHOCK_DELAYS[step]);
    return () => clearTimeout(t);
  }, [step]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SHOCK_SEQUENCE[step]}
      alt="waking up"
      className="w-full max-w-sm mx-auto rounded-xl"
      style={{ display: "block" }}
    />
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 2 — Man sleeping: cycles through 3 PNG frames, stops on last
   ═══════════════════════════════════════════════════════════════ */
const SLEEP_FRAMES = ["/man_sleep_1.png", "/man_sleep_2.png", "/man_sleep_3.png"];
const FRAME_INTERVAL = 1800; // ms per frame

export function IllustrationManSleep() {
  const [frame, setFrame] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const t = setInterval(() => {
      setFrame(f => {
        const next = f + 1;
        if (next >= SLEEP_FRAMES.length - 1) {
          setDone(true);
          return SLEEP_FRAMES.length - 1;
        }
        return next;
      });
    }, FRAME_INTERVAL);
    return () => clearInterval(t);
  }, [done]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SLEEP_FRAMES[frame]}
      alt="sleeping"
      className="w-full max-w-sm mx-auto rounded-xl"
      style={{ display: "block" }}
    />
  );
}

export const ILLUSTRATIONS = [
  IllustrationCity,        // 0
  IllustrationRoom,        // 1
  IllustrationManSleep,    // 2
  IllustrationShock,       // 3
  IllustrationLittleBoy,   // 4
  IllustrationBoySmile,    // 5
  IllustrationFiveDoors,   // 6
  IllustrationDoorOpening, // 7
  IllustrationMemory,      // 8
  IllustrationCry,         // 9
  IllustrationDark,        // 10
  IllustrationDoorClosing, // 11
  IllustrationYellowRoom,  // 12
  IllustrationPresent,     // 13
];
