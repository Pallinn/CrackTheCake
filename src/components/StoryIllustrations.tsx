"use client";

const R = "#C62828";   // cherry red
const Y = "#FBC02D";   // golden yellow
const K = "#1a1a1a";   // near-black
const W = "rgba(255,255,255,0.85)";
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
   Floating: rain streaks slide down, moon pulses, lamp flickers
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationCity() {
  return (
    <svg viewBox="0 0 340 230" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-city"/>

      {/* Static: buildings */}
      <g filter="url(#sk-city)" strokeLinecap="round">
        <rect x="0"   y="90"  width="58"  height="140" fill={CREAM} stroke={R} strokeWidth="2"/>
        <rect x="64"  y="55"  width="72"  height="175" fill={CREAM} stroke={R} strokeWidth="2"/>
        <rect x="144" y="72"  width="60"  height="158" fill={CREAM} stroke={R} strokeWidth="2"/>
        <rect x="212" y="45"  width="52"  height="185" fill={CREAM} stroke={R} strokeWidth="2"/>
        <rect x="272" y="80"  width="68"  height="150" fill={CREAM} stroke={R} strokeWidth="2"/>
        {/* windows — yellow */}
        {[[8,105],[8,125],[32,105],[32,125],[72,70],[92,70],[112,70],[72,95],[92,95],[112,95],
          [152,88],[172,88],[152,112],[172,112],[220,60],[242,60],[220,84],[242,84],[220,108],[242,108],
          [280,98],[302,98],[280,122],[302,122]].map(([x,y],i)=>(
          <rect key={i} x={x} y={y} width="13" height="11" rx="2" fill={Y} opacity="0.8"/>
        ))}
        {/* ground */}
        <line x1="0" y1="228" x2="340" y2="228" stroke={K} strokeWidth="3"/>
        {/* lamp posts */}
        <line x1="88"  y1="175" x2="88"  y2="228" stroke={K} strokeWidth="2.5"/>
        <path d="M88 175 Q88 160 106 160" stroke={K} strokeWidth="2.5" fill="none"/>
        <line x1="255" y1="182" x2="255" y2="228" stroke={K} strokeWidth="2.5"/>
        <path d="M255 182 Q255 168 273 168" stroke={K} strokeWidth="2.5" fill="none"/>
      </g>

      {/* Animated: lamp glow pulses */}
      <circle cx="107" cy="160" r="8" fill={Y} opacity="0.6">
        <animate attributeName="opacity" values="0.4;0.9;0.4" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="r" values="7;10;7" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="274" cy="168" r="8" fill={Y} opacity="0.6">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3.5s" repeatCount="indefinite"/>
        <animate attributeName="r" values="7;10;7" dur="3.5s" repeatCount="indefinite"/>
      </circle>

      {/* Animated: moon breathes */}
      <g>
        <circle cx="300" cy="28" r="20" fill={Y} opacity="0.15">
          <animate attributeName="r" values="18;24;18" dur="5s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.1;0.22;0.1" dur="5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="300" cy="28" r="16" stroke={Y} strokeWidth="1.5" fill="rgba(255,248,220,0.5)"/>
      </g>

      {/* Animated: rain slides downward */}
      <g>
        {Array.from({length:24}).map((_,i)=>{
          const x = 6+(i*14)%336, y = (i*19)%60;
          return <line key={i} x1={x} y1={y} x2={x-5} y2={y+20} stroke={R} strokeWidth="1.3" opacity="0.4"/>;
        })}
        <animateTransform attributeName="transform" type="translate" from="0,0" to="-5,24" dur="1.2s" repeatCount="indefinite"/>
      </g>

      {/* Puddles */}
      <ellipse cx="88"  cy="229" rx="32" ry="5" fill={Y} fillOpacity="0.1" stroke={R} strokeWidth="1" opacity="0.35"/>
      <ellipse cx="255" cy="229" rx="28" ry="4" fill={Y} fillOpacity="0.1" stroke={R} strokeWidth="1" opacity="0.35"/>
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 1 — Cozy rest place
   Floating: steam rises, dust motes drift, rain taps window
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationRoom() {
  return (
    <svg viewBox="0 0 340 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-room"/>

      {/* Static architecture */}
      <g filter="url(#sk-room)" strokeLinecap="round">
        {/* wall */}
        <rect x="0" y="0" width="340" height="240" fill="rgba(198,40,40,0.025)"/>
        {/* floor */}
        <line x1="0" y1="222" x2="340" y2="222" stroke={K} strokeWidth="3"/>
        {[50,100,150,200,250,300].map(x=>(
          <line key={x} x1={x} y1="222" x2={x} y2="240" stroke={K} strokeWidth="1" opacity="0.25"/>
        ))}
        {/* rug */}
        <ellipse cx="190" cy="224" rx="120" ry="13" fill={CREAM} stroke={R} strokeWidth="2"/>
        <ellipse cx="190" cy="224" rx="102" ry="9"  fill="none" stroke={R} strokeWidth="1" opacity="0.4"/>

        {/* window */}
        <rect x="20" y="18" width="130" height="100" rx="6" fill="rgba(26,26,26,0.06)" stroke={R} strokeWidth="2.5"/>
        <line x1="85" y1="18" x2="85"  y2="118" stroke={R} strokeWidth="1.8"/>
        <line x1="20" y1="68" x2="150" y2="68"  stroke={R} strokeWidth="1.8"/>
        <circle cx="128" cy="42" r="16" stroke={Y} strokeWidth="1.5" fill={Y} fillOpacity="0.1"/>

        {/* floor lamp */}
        <line x1="45" y1="128" x2="45" y2="222" stroke={K} strokeWidth="3"/>
        <path d="M45 128 Q45 110 65 110" stroke={K} strokeWidth="2.5" fill="none"/>
        <path d="M48 105 Q65 94 82 105 Q78 126 58 126Z" stroke={K} strokeWidth="2" fill={Y} fillOpacity="0.25"/>

        {/* armchair */}
        <rect x="188" y="158" width="108" height="56" rx="14" fill={CREAM} stroke={R} strokeWidth="2"/>
        <rect x="176" y="150" width="20" height="62" rx="9" fill={CREAM} stroke={R} strokeWidth="2"/>
        <rect x="276" y="150" width="20" height="62" rx="9" fill={CREAM} stroke={R} strokeWidth="2"/>
        <rect x="188" y="150" width="108" height="24" rx="9" fill={CREAM} stroke={R} strokeWidth="2"/>
        <ellipse cx="242" cy="163" rx="30" ry="12" stroke={R} strokeWidth="1.5" fill={Y} fillOpacity="0.15"/>

        {/* side table */}
        <rect x="108" y="188" width="52" height="8" rx="4" fill={CREAM} stroke={K} strokeWidth="1.8"/>
        <line x1="116" y1="196" x2="116" y2="222" stroke={K} strokeWidth="2"/>
        <line x1="152" y1="196" x2="152" y2="222" stroke={K} strokeWidth="2"/>

        {/* tea cup */}
        <path d="M122 186 Q134 176 146 186 Q146 192 134 194 Q122 192 122 186Z" stroke={R} strokeWidth="1.5" fill={Y} fillOpacity="0.25"/>
        <path d="M146 188 Q154 185 153 191" stroke={R} strokeWidth="1.5" fill="none"/>
      </g>

      {/* Animated: lamp warm glow pulses */}
      <ellipse cx="65" cy="115" rx="40" ry="28" fill={Y} fillOpacity="0.1">
        <animate attributeName="fill-opacity" values="0.06;0.18;0.06" dur="4s" repeatCount="indefinite"/>
      </ellipse>

      {/* Animated: steam from cup (3 wisps) */}
      {[0,1,2].map(i=>(
        <path key={i} d={`M${126+i*9} 176 Q${128+i*9} 168 ${126+i*9} 160`}
          stroke={R} strokeWidth="1.4" fill="none" opacity="0.5"
          strokeLinecap="round">
          <animateTransform attributeName="transform" type="translate"
            from="0,0" to={`${i%2===0?-2:2},-14`} dur={`${1.8+i*0.4}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.5;0;0.5" dur={`${1.8+i*0.4}s`} repeatCount="indefinite"/>
        </path>
      ))}

      {/* Animated: floating dust motes */}
      {[[80,80],[160,50],[240,90],[310,65],[130,140],[270,130]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="2.5" fill={Y} opacity="0.5">
          <animate attributeName="cy" values={`${cy};${cy-12};${cy}`} dur={`${3+i*0.7}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.2;0.7;0.2" dur={`${3+i*0.7}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* Animated: window rain taps */}
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
   SCENE 2 — Meeting your 10-year-old self
   Floating: sparkle stars orbit the child, light rays pulse
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationChild() {
  return (
    <svg viewBox="0 0 340 270" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-child"/>

      {/* Pulsing aura rings */}
      {[60,78,96].map((r,i)=>(
        <circle key={i} cx="170" cy="120" r={r} stroke={Y} strokeWidth="1" fill="none" opacity="0.2">
          <animate attributeName="r" values={`${r};${r+10};${r}`} dur={`${4+i}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.15;0.35;0.15" dur={`${4+i}s`} repeatCount="indefinite"/>
        </circle>
      ))}

      {/* Static: child figure */}
      <g filter="url(#sk-child)" strokeLinecap="round">
        {/* body */}
        <path d="M128 195 Q110 208 96 250" stroke={K} strokeWidth="2.5" fill="none"/>
        <path d="M212 195 Q230 208 244 250" stroke={K} strokeWidth="2.5" fill="none"/>
        <path d="M128 195 Q170 207 212 195 Q208 226 170 228 Q132 226 128 195Z" fill={CREAM} stroke={R} strokeWidth="2.2"/>
        {/* collar */}
        <path d="M152 195 L170 210 L188 195" stroke={R} strokeWidth="2" fill="none"/>
        {/* head */}
        <circle cx="170" cy="115" r="72" fill="rgba(198,40,40,0.04)" stroke={R} strokeWidth="2.8"/>
        {/* hair */}
        <path d="M100 95 Q104 50 170 46 Q236 50 240 95" fill="rgba(26,26,26,0.18)" stroke={K} strokeWidth="2.8"/>
        <path d="M102 90 Q96 68 108 56" stroke={K} strokeWidth="2.2"/>
        <path d="M238 90 Q244 68 232 56" stroke={K} strokeWidth="2.2"/>
        {/* ears */}
        <path d="M98 115 Q88 116 90 131 Q92 142 102 140" stroke={R} strokeWidth="2.2" fill="none"/>
        <path d="M242 115 Q252 116 250 131 Q248 142 238 140" stroke={R} strokeWidth="2.2" fill="none"/>
        {/* eyes */}
        <ellipse cx="143" cy="108" rx="13" ry="14" fill={W} stroke={R} strokeWidth="2"/>
        <ellipse cx="197" cy="108" rx="13" ry="14" fill={W} stroke={R} strokeWidth="2"/>
        <circle cx="145" cy="109" r="8"  fill={K}/>
        <circle cx="199" cy="109" r="8"  fill={K}/>
        <circle cx="148" cy="105" r="3"  fill={W}/>
        <circle cx="202" cy="105" r="3"  fill={W}/>
        {/* eyebrows */}
        <path d="M130 92 Q143 86 156 90" stroke={K} strokeWidth="2.5" fill="none"/>
        <path d="M184 90 Q197 86 210 92" stroke={K} strokeWidth="2.5" fill="none"/>
        {/* nose */}
        <path d="M163 122 Q170 130 177 122" stroke={R} strokeWidth="1.8" fill="none"/>
        {/* smile */}
        <path d="M138 142 Q170 162 202 142" stroke={R} strokeWidth="3" fill="none"/>
        {/* blush */}
        <ellipse cx="128" cy="135" rx="14" ry="8" fill={R} fillOpacity="0.1"/>
        <ellipse cx="212" cy="135" rx="14" ry="8" fill={R} fillOpacity="0.1"/>
        {/* ground */}
        <line x1="0" y1="258" x2="340" y2="258" stroke={K} strokeWidth="2.5"/>
      </g>

      {/* Animated: orbiting sparkle stars */}
      {[
        { r: 105, start: 0,   size: 8,  dur: "8s"  },
        { r: 112, start: 120, size: 6,  dur: "10s" },
        { r: 100, start: 240, size: 7,  dur: "7s"  },
      ].map(({r, start, size, dur}, i)=>{
        // We approximate orbit with animateMotion on a circle path
        const pathD = `M${170+r},120 a${r},${r} 0 1,1 -0.01,0`;
        return (
          <g key={i}>
            <path d={`M${170+r},120 L${170+r-size/2},${120-size/2} L${170+r},${120-size} L${170+r+size/2},${120-size/2}Z`} fill={Y} opacity="0.9">
              <animateMotion dur={dur} repeatCount="indefinite" rotate="auto">
                <mpath href={`#orbit${i}`}/>
              </animateMotion>
            </path>
            <path id={`orbit${i}`} d={`M${170+r*Math.cos(start*Math.PI/180)} ${120+r*Math.sin(start*Math.PI/180)} a${r},${r} 0 1,1 -0.001,0`} style={{display:"none"}}/>
          </g>
        );
      })}

      {/* Animated: twinkling stars fixed positions */}
      {[[50,40],[290,35],[40,180],[310,170],[170,22]].map(([cx,cy],i)=>(
        <g key={i}>
          <line x1={cx-6} y1={cy} x2={cx+6} y2={cy} stroke={Y} strokeWidth="1.5">
            <animate attributeName="opacity" values="0.2;1;0.2" dur={`${2+i*0.6}s`} repeatCount="indefinite"/>
          </line>
          <line x1={cx} y1={cy-6} x2={cx} y2={cy+6} stroke={Y} strokeWidth="1.5">
            <animate attributeName="opacity" values="0.2;1;0.2" dur={`${2+i*0.6}s`} repeatCount="indefinite"/>
          </line>
          <circle cx={cx} cy={cy} r="3" fill={Y}>
            <animate attributeName="r" values="2;4;2" dur={`${2+i*0.6}s`} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.3;1;0.3" dur={`${2+i*0.6}s`} repeatCount="indefinite"/>
          </circle>
        </g>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 3 — Corridor with 5 coloured doors
   Floating: light pulses under each door, dust motes drift
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationDoors() {
  const doorColors = [R, "#E65100", "#FBC02D", "#B71C1C", "#4A0000"];
  const doorX = [8, 72, 136, 200, 264];

  return (
    <svg viewBox="0 0 340 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-doors"/>

      {/* Static: corridor perspective */}
      <g filter="url(#sk-doors)" strokeLinecap="round">
        {/* floor */}
        <line x1="0" y1="240" x2="340" y2="240" stroke={K} strokeWidth="3"/>
        {/* ceiling */}
        <line x1="0" y1="0"   x2="340" y2="0"   stroke={K} strokeWidth="2"/>
        {/* wall lines converging to centre */}
        <line x1="0"   y1="0"   x2="170" y2="95"  stroke={K} strokeWidth="1.8" opacity="0.4"/>
        <line x1="340" y1="0"   x2="170" y2="95"  stroke={K} strokeWidth="1.8" opacity="0.4"/>
        <line x1="0"   y1="240" x2="170" y2="95"  stroke={K} strokeWidth="1.8" opacity="0.4"/>
        <line x1="340" y1="240" x2="170" y2="95"  stroke={K} strokeWidth="1.8" opacity="0.4"/>
        {/* perspective floor tiles */}
        {[200,170,148].map((y,i)=>{
          const sp = (240-y)/240*170;
          return <line key={i} x1={170-sp} y1={y} x2={170+sp} y2={y} stroke={K} strokeWidth="1" opacity="0.2"/>;
        })}
        {/* ceiling lamp */}
        <line x1="170" y1="0" x2="170" y2="20" stroke={K} strokeWidth="2"/>
        <ellipse cx="170" cy="24" rx="22" ry="9" fill={Y} fillOpacity="0.3" stroke={Y} strokeWidth="1.5"/>

        {/* 5 doors side by side */}
        {doorX.map((x, i) => (
          <g key={i}>
            <rect x={x} y={30} width="60" height="210" rx="5" fill={CREAM} stroke={doorColors[i]} strokeWidth="2.5"/>
            <rect x={x+6} y={38} width="48" height="195" rx="3" fill="rgba(198,40,40,0.03)" stroke={doorColors[i]} strokeWidth="1.2"/>
            {/* panels */}
            <rect x={x+10} y={48}  width="18" height="70" rx="3" stroke={doorColors[i]} strokeWidth="1" fill="none" opacity="0.4"/>
            <rect x={x+32} y={48}  width="18" height="70" rx="3" stroke={doorColors[i]} strokeWidth="1" fill="none" opacity="0.4"/>
            <rect x={x+10} y={128} width="40" height="90" rx="3" stroke={doorColors[i]} strokeWidth="1" fill="none" opacity="0.4"/>
            {/* knob */}
            <circle cx={x+46} cy={180} r="6" fill={Y} stroke={doorColors[i]} strokeWidth="1.5"/>
            <circle cx={x+46} cy={180} r="2.5" fill={doorColors[i]}/>
          </g>
        ))}
      </g>

      {/* Animated: light glow pulsing under each door */}
      {doorX.map((x, i) => (
        <ellipse key={i} cx={x+30} cy={241} rx={28} ry={6} fill={doorColors[i]} fillOpacity="0.25">
          <animate attributeName="fill-opacity" values="0.1;0.4;0.1" dur={`${2.5+i*0.4}s`} repeatCount="indefinite"/>
          <animate attributeName="ry" values="4;8;4" dur={`${2.5+i*0.4}s`} repeatCount="indefinite"/>
        </ellipse>
      ))}

      {/* Animated: ceiling lamp glow */}
      <ellipse cx="170" cy="75" rx="55" ry="35" fill={Y} fillOpacity="0.07">
        <animate attributeName="fill-opacity" values="0.04;0.14;0.04" dur="4s" repeatCount="indefinite"/>
      </ellipse>

      {/* Animated: floating dust motes in corridor */}
      {[[80,130],[170,80],[260,140],[120,190],[220,100]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="2" fill={Y} opacity="0.4">
          <animate attributeName="cy" values={`${cy};${cy-18};${cy}`} dur={`${4+i*0.8}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.1;0.5;0.1" dur={`${4+i*0.8}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SCENE 4 — Gift box opening, cake inside
   Floating: confetti/stars burst out, bow sways
   ═══════════════════════════════════════════════════════════════ */
export function IllustrationGift() {
  return (
    <svg viewBox="0 0 340 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-gift"/>

      {/* Static: gift box body */}
      <g filter="url(#sk-gift)" strokeLinecap="round">
        {/* box base */}
        <rect x="80" y="148" width="180" height="96" rx="10" fill={CREAM} stroke={R} strokeWidth="2.5"/>
        {/* box stripe vertical */}
        <rect x="156" y="148" width="28" height="96" fill={R} fillOpacity="0.12" stroke={R} strokeWidth="1" opacity="0.4"/>
        {/* box stripe horizontal on lid */}
        <rect x="80" y="148" width="180" height="28" fill={R} fillOpacity="0.08" stroke={R} strokeWidth="1" opacity="0.3"/>
        {/* lid — slightly ajar (lifted) */}
        <rect x="72" y="108" width="196" height="44" rx="10" fill={CREAM} stroke={R} strokeWidth="2.5"/>
        <rect x="72" y="108" width="196" height="44" rx="10" fill="none" stroke={R} strokeWidth="1.2" opacity="0.3"
              transform="rotate(-4, 170, 130)"/>
        {/* bow centre */}
        <ellipse cx="170" cy="130" rx="16" ry="12" fill={Y} stroke={R} strokeWidth="2"/>
        {/* bow left loop */}
        <path d="M154 130 Q130 112 140 100 Q150 105 154 130Z" fill={Y} fillOpacity="0.7" stroke={R} strokeWidth="1.8"/>
        {/* bow right loop */}
        <path d="M186 130 Q210 112 200 100 Q190 105 186 130Z" fill={Y} fillOpacity="0.7" stroke={R} strokeWidth="1.8"/>
        {/* bow tails */}
        <path d="M162 138 Q152 155 144 165" stroke={R} strokeWidth="2" fill="none"/>
        <path d="M178 138 Q188 155 196 165" stroke={R} strokeWidth="2" fill="none"/>

        {/* Mini cake inside box (peeking out from top) */}
        <rect x="116" y="110" width="108" height="44" rx="8" fill={R} fillOpacity="0.7" stroke={R} strokeWidth="1.5"/>
        <path d="M116 110 Q170 96 224 110" stroke="white" strokeWidth="2.5" fill="none" opacity="0.6"/>
        {/* frosting drips */}
        {[124,140,156,172,188,204].map((x,i)=>(
          <path key={i} d={`M${x} 110 Q${x+4} 102 ${x+8} 110`} stroke="white" strokeWidth="2" fill="none" opacity="0.5"/>
        ))}
        {/* candle */}
        <rect x="165" y="88" width="10" height="22" rx="4" fill={Y}/>
        {/* flame */}
        <path d="M170 82 Q176 76 174 72 Q170 69 168 72 Q166 76 170 82Z" fill={Y} stroke={R} strokeWidth="1"/>

        {/* ground */}
        <line x1="0" y1="248" x2="340" y2="248" stroke={K} strokeWidth="2.5"/>
        {/* table */}
        <rect x="40" y="240" width="260" height="12" rx="5" fill={CREAM} stroke={K} strokeWidth="2"/>
        <line x1="80"  y1="252" x2="80"  y2="260" stroke={K} strokeWidth="3"/>
        <line x1="260" y1="252" x2="260" y2="260" stroke={K} strokeWidth="3"/>
      </g>

      {/* Animated: candle flame flickers */}
      <path d="M170 82 Q176 76 174 72 Q170 69 168 72 Q166 76 170 82Z" fill={Y}>
        <animate attributeName="d"
          values="M170 82 Q176 76 174 72 Q170 69 168 72 Q166 76 170 82Z;M170 80 Q178 73 175 68 Q170 65 166 68 Q164 73 170 80Z;M170 82 Q176 76 174 72 Q170 69 168 72 Q166 76 170 82Z"
          dur="0.9s" repeatCount="indefinite"/>
      </path>

      {/* Animated: confetti stars bursting from box lid */}
      {[
        {cx:120, cy:90, r:5, dur:"3s",  dy:-55},
        {cx:145, cy:75, r:4, dur:"3.5s",dy:-65},
        {cx:170, cy:65, r:6, dur:"2.8s",dy:-55},
        {cx:195, cy:75, r:4, dur:"3.2s",dy:-60},
        {cx:218, cy:90, r:5, dur:"3.7s",dy:-50},
        {cx:108, cy:105,r:3, dur:"4s",  dy:-40},
        {cx:232, cy:105,r:3, dur:"3.6s",dy:-38},
      ].map(({cx,cy,r,dur,dy},i)=>(
        <g key={i}>
          {/* star shape */}
          <path d={`M${cx},${cy-r} L${cx+r*0.4},${cy-r*0.4} L${cx+r},${cy} L${cx+r*0.4},${cy+r*0.4} L${cx},${cy+r} L${cx-r*0.4},${cy+r*0.4} L${cx-r},${cy} L${cx-r*0.4},${cy-r*0.4}Z`}
            fill={i%2===0?Y:R} opacity="0.9">
            <animate attributeName="opacity" values="0;1;1;0" dur={dur} repeatCount="indefinite"
              keyTimes={`0;0.1;0.7;1`}/>
            <animateTransform attributeName="transform" type="translate"
              from="0,0" to={`${(i-3)*8},${dy}`} dur={dur} repeatCount="indefinite"/>
            <animateTransform attributeName="transform" type="rotate" additive="sum"
              from="0" to="360" dur={dur} repeatCount="indefinite"/>
          </path>
        </g>
      ))}

      {/* Animated: bow sways */}
      <g transform-origin="170 130">
        <ellipse cx="170" cy="130" rx="16" ry="12" fill={Y} stroke={R} strokeWidth="2">
          <animateTransform attributeName="transform" type="rotate"
            values="-3,170,130;3,170,130;-3,170,130" dur="3s" repeatCount="indefinite"/>
        </ellipse>
      </g>

      {/* Animated: sparkle dots floating */}
      {[[60,60],[280,55],[55,180],[285,175]].map(([cx,cy],i)=>(
        <circle key={i} cx={cx} cy={cy} r="3.5" fill={Y} opacity="0.5">
          <animate attributeName="cy" values={`${cy};${cy-14};${cy}`} dur={`${3.5+i*0.6}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.2;0.8;0.2" dur={`${3.5+i*0.6}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </svg>
  );
}

export const ILLUSTRATIONS = [
  IllustrationCity,   // 0 — intro
  IllustrationRoom,   // 1 — cozy place
  IllustrationChild,  // 2 — young self
  IllustrationDoors,  // 3 — 5 doors
  IllustrationGift,   // 4 — gift box
];
