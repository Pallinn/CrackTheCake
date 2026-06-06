"use client";

/* Each illustration gets its own unique filter ID to avoid DOM collisions */
function SkFilter({ id }: { id: string }) {
  return (
    <defs>
      <filter id={id} x="-12%" y="-12%" width="124%" height="124%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="4" seed="7" result="n"/>
        <feDisplacementMap in="SourceGraphic" in2="n" scale="3.5" xChannelSelector="R" yChannelSelector="G"/>
      </filter>
    </defs>
  );
}

const RED    = "#C62828";
const DKRED  = "#8B0000";
const YELLOW = "#FBC02D";
const BLACK  = "#1a1a1a";
const CREAM  = "rgba(198,40,40,0.08)";

/* ── Scene 0 : rainy city night ───────────────────────────────────────────── */
export function IllustrationCity() {
  return (
    <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-city"/>
      <g filter="url(#sk-city)" strokeLinecap="round" strokeLinejoin="round">
        {/* Sky wash */}
        <rect x="0" y="0" width="320" height="200" fill="rgba(198,40,40,0.04)" rx="8"/>

        {/* Buildings — back row */}
        <rect x="0"   y="100" width="55"  height="140" fill={CREAM} stroke={RED} strokeWidth="2" rx="2"/>
        <rect x="60"  y="65"  width="70"  height="175" fill={CREAM} stroke={RED} strokeWidth="2" rx="2"/>
        <rect x="140" y="80"  width="58"  height="160" fill={CREAM} stroke={RED} strokeWidth="2" rx="2"/>
        <rect x="208" y="55"  width="50"  height="185" fill={CREAM} stroke={RED} strokeWidth="2" rx="2"/>
        <rect x="265" y="90"  width="55"  height="150" fill={CREAM} stroke={RED} strokeWidth="2" rx="2"/>

        {/* Windows lit up — yellow glow */}
        {[
          [10,115],[10,135],[30,115],[30,135],
          [72,80],[90,80],[108,80],[72,103],[90,103],[108,103],[72,126],[90,126],
          [150,95],[168,95],[150,118],[168,118],[150,141],[168,141],
          [218,72],[236,72],[218,95],[236,95],[218,118],[236,118],
          [274,105],[292,105],[274,128],[292,128],
        ].map(([x,y],i) => (
          <rect key={i} x={x} y={y} width="11" height="10" rx="2"
            fill={YELLOW} stroke={YELLOW} strokeWidth="0.5" opacity="0.75"/>
        ))}

        {/* Ground */}
        <line x1="0" y1="232" x2="320" y2="232" stroke={BLACK} strokeWidth="3"/>

        {/* Street lamps */}
        <line x1="80"  y1="180" x2="80"  y2="232" stroke={BLACK} strokeWidth="2.5"/>
        <path d="M80 180 Q80 166 95 166" stroke={BLACK} strokeWidth="2.5" fill="none"/>
        <circle cx="96" cy="166" r="5" fill={YELLOW} stroke={YELLOW} strokeWidth="1"/>
        <line x1="240" y1="190" x2="240" y2="232" stroke={BLACK} strokeWidth="2.5"/>
        <path d="M240 190 Q240 176 255 176" stroke={BLACK} strokeWidth="2.5" fill="none"/>
        <circle cx="256" cy="176" r="5" fill={YELLOW} stroke={YELLOW} strokeWidth="1"/>

        {/* Rain streaks */}
        {Array.from({length:28}).map((_,i) => {
          const x = 5 + (i * 11) % 315, y = 2 + (i * 17) % 70;
          return <line key={i} x1={x} y1={y} x2={x-5} y2={y+18}
                   stroke={RED} strokeWidth="1.2" opacity="0.35"/>;
        })}

        {/* Puddle reflections */}
        <ellipse cx="80"  cy="234" rx="30" ry="5" stroke={RED} strokeWidth="1" opacity="0.3" fill={YELLOW} fillOpacity="0.05"/>
        <ellipse cx="240" cy="234" rx="25" ry="4" stroke={RED} strokeWidth="1" opacity="0.3" fill={YELLOW} fillOpacity="0.05"/>

        {/* Moon */}
        <circle cx="285" cy="28" r="18" stroke={YELLOW} strokeWidth="2" fill={YELLOW} fillOpacity="0.15"/>
        <circle cx="293" cy="22" r="13" stroke={YELLOW} strokeWidth="1" fill="rgba(245,240,232,0.6)"/>
      </g>
    </svg>
  );
}

/* ── Scene 1 : cozy room at night ────────────────────────────────────────── */
export function IllustrationRoom() {
  return (
    <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-room"/>
      <g filter="url(#sk-room)" strokeLinecap="round" strokeLinejoin="round">
        {/* Wall */}
        <rect x="0" y="0" width="320" height="240" fill="rgba(198,40,40,0.03)" rx="4"/>

        {/* Window with rain + night outside */}
        <rect x="90" y="20" width="140" height="100" rx="6" fill="rgba(26,26,26,0.08)" stroke={RED} strokeWidth="2.5"/>
        <line x1="160" y1="20" x2="160" y2="120" stroke={RED} strokeWidth="1.8"/>
        <line x1="90"  y1="70" x2="230" y2="70"  stroke={RED} strokeWidth="1.8"/>
        {/* Rain on window */}
        {[100,115,130,148,172,188,205,218].map((x,i) => (
          <line key={i} x1={x} y1={25} x2={x-3} y2={43} stroke={RED} strokeWidth="1.2" opacity="0.4"/>
        ))}
        {/* Moon glimpse */}
        <circle cx="210" cy="50" r="14" stroke={YELLOW} strokeWidth="1.5" fill={YELLOW} fillOpacity="0.12"/>

        {/* Floor */}
        <line x1="0" y1="220" x2="320" y2="220" stroke={BLACK} strokeWidth="3"/>
        {/* Floor boards */}
        {[40,80,120,160,200,240,280].map(x => (
          <line key={x} x1={x} y1="220" x2={x} y2="240" stroke={BLACK} strokeWidth="1" opacity="0.3"/>
        ))}

        {/* Rug */}
        <ellipse cx="160" cy="222" rx="110" ry="13" stroke={RED} strokeWidth="2" fill={CREAM}/>
        <ellipse cx="160" cy="222" rx="95"  ry="9"  stroke={RED} strokeWidth="1" fill="none" opacity="0.5"/>

        {/* Floor lamp */}
        <line x1="52" y1="120" x2="52" y2="220" stroke={BLACK} strokeWidth="3"/>
        <path d="M52 120 Q52 100 70 100" stroke={BLACK} strokeWidth="2.5" fill="none"/>
        <path d="M55 95 Q70 85 85 95 Q80 115 60 115 Z" stroke={BLACK} strokeWidth="2" fill={YELLOW} fillOpacity="0.3"/>
        {/* Lamp glow */}
        <ellipse cx="70" cy="108" rx="35" ry="25" fill={YELLOW} fillOpacity="0.12"/>

        {/* Armchair */}
        <rect x="180" y="155" width="100" height="55" rx="14" fill={CREAM} stroke={RED} strokeWidth="2"/>
        <rect x="170" y="148" width="18"  height="60" rx="8" fill={CREAM} stroke={RED} strokeWidth="2"/>
        <rect x="272" y="148" width="18"  height="60" rx="8" fill={CREAM} stroke={RED} strokeWidth="2"/>
        <rect x="180" y="148" width="100" height="22" rx="8" fill={CREAM} stroke={RED} strokeWidth="2"/>
        {/* Cushion on chair */}
        <ellipse cx="230" cy="160" rx="28" ry="12" stroke={RED} strokeWidth="1.5" fill={YELLOW} fillOpacity="0.2"/>

        {/* Small side table */}
        <rect x="100" y="185" width="50" height="8"  rx="4" fill={CREAM} stroke={BLACK} strokeWidth="1.8"/>
        <line x1="108" y1="193" x2="108" y2="220" stroke={BLACK} strokeWidth="2"/>
        <line x1="142" y1="193" x2="142" y2="220" stroke={BLACK} strokeWidth="2"/>
        {/* Cup on table */}
        <path d="M118 183 Q125 175 132 183 Q132 188 125 190 Q118 188 118 183Z" stroke={RED} strokeWidth="1.5" fill={YELLOW} fillOpacity="0.3"/>
        <path d="M132 185 Q138 183 137 188" stroke={RED} strokeWidth="1.5" fill="none"/>
        {/* Steam */}
        <path d="M122 173 Q124 168 122 163" stroke={RED} strokeWidth="1.2" fill="none" opacity="0.5"/>
        <path d="M127 172 Q129 166 127 161" stroke={RED} strokeWidth="1.2" fill="none" opacity="0.5"/>
      </g>
    </svg>
  );
}

/* ── Scene 2 : awakening — young self ────────────────────────────────────── */
export function IllustrationAwaken() {
  return (
    <svg viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-awaken"/>
      <g filter="url(#sk-awaken)" strokeLinecap="round" strokeLinejoin="round">
        {/* Light burst background */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i) => {
          const r = Math.PI * deg / 180;
          return <line key={i}
            x1={160 + 85 * Math.cos(r)} y1={125 + 85 * Math.sin(r)}
            x2={160 + 140 * Math.cos(r)} y2={125 + 140 * Math.sin(r)}
            stroke={YELLOW} strokeWidth="1.5" opacity="0.3"/>;
        })}
        <circle cx="160" cy="125" r="84" fill={YELLOW} fillOpacity="0.06" stroke={YELLOW} strokeWidth="1.5" opacity="0.3"/>

        {/* Child face — large, centred */}
        <circle cx="160" cy="115" r="72" fill="rgba(198,40,40,0.05)" stroke={RED} strokeWidth="2.8"/>

        {/* Hair */}
        <path d="M92 95 Q96 50 160 46 Q224 50 228 95" fill="rgba(26,26,26,0.15)" stroke={BLACK} strokeWidth="3"/>
        <path d="M94 90 Q88 68 100 56" stroke={BLACK} strokeWidth="2.2"/>
        <path d="M226 90 Q232 68 220 56" stroke={BLACK} strokeWidth="2.2"/>
        {/* Fringe */}
        <path d="M112 72 Q130 60 148 68" stroke={BLACK} strokeWidth="2" fill="none"/>
        <path d="M148 68 Q164 58 180 66" stroke={BLACK} strokeWidth="2" fill="none"/>

        {/* Ears */}
        <path d="M88 115 Q78 115 80 130 Q82 142 92 140" stroke={RED} strokeWidth="2.2" fill="none"/>
        <path d="M232 115 Q242 115 240 130 Q238 142 228 140" stroke={RED} strokeWidth="2.2" fill="none"/>

        {/* Eyes — bright, wide open */}
        <ellipse cx="135" cy="108" rx="13" ry="14" fill="white" stroke={RED} strokeWidth="2"/>
        <ellipse cx="185" cy="108" rx="13" ry="14" fill="white" stroke={RED} strokeWidth="2"/>
        <circle cx="137" cy="109" r="8"  fill={BLACK}/>
        <circle cx="187" cy="109" r="8"  fill={BLACK}/>
        <circle cx="140" cy="105" r="3"  fill="white"/>
        <circle cx="190" cy="105" r="3"  fill="white"/>
        {/* Eye sparkle */}
        <circle cx="131" cy="114" r="1.5" fill="white" opacity="0.6"/>
        <circle cx="181" cy="114" r="1.5" fill="white" opacity="0.6"/>

        {/* Eyebrows — gentle child */}
        <path d="M122 92 Q135 86 148 90" stroke={BLACK} strokeWidth="2.5" fill="none"/>
        <path d="M172 90 Q185 86 198 92" stroke={BLACK} strokeWidth="2.5" fill="none"/>

        {/* Nose */}
        <path d="M154 120 Q160 128 166 120" stroke={RED} strokeWidth="1.8" fill="none"/>

        {/* Smile — big and warm */}
        <path d="M130 140 Q160 160 190 140" stroke={RED} strokeWidth="3" fill="none"/>
        {/* Cheek blush */}
        <ellipse cx="122" cy="135" rx="14" ry="8" fill={RED} fillOpacity="0.1"/>
        <ellipse cx="198" cy="135" rx="14" ry="8" fill={RED} fillOpacity="0.1"/>

        {/* Body silhouette — child in school uniform-ish */}
        <path d="M120 187 Q100 200 88 240" stroke={BLACK} strokeWidth="2.5" fill="none"/>
        <path d="M200 187 Q220 200 232 240" stroke={BLACK} strokeWidth="2.5" fill="none"/>
        <path d="M120 187 Q160 198 200 187 Q195 215 160 218 Q125 215 120 187Z"
          fill={CREAM} stroke={RED} strokeWidth="2.2"/>
        {/* Collar */}
        <path d="M145 187 L160 200 L175 187" stroke={RED} strokeWidth="2" fill="none"/>

        {/* Ground */}
        <line x1="0" y1="248" x2="320" y2="248" stroke={BLACK} strokeWidth="2.5"/>
      </g>
    </svg>
  );
}

/* ── Scene 3 : corridor with many doors ─────────────────────────────────── */
export function IllustrationCorridor() {
  return (
    <svg viewBox="0 0 320 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-corridor"/>
      <g filter="url(#sk-corridor)" strokeLinecap="round" strokeLinejoin="round">
        {/* Perspective floor */}
        <line x1="0"   y1="240" x2="320" y2="240" stroke={BLACK} strokeWidth="3"/>
        <line x1="0"   y1="240" x2="160" y2="90"  stroke={BLACK} strokeWidth="2"/>
        <line x1="320" y1="240" x2="160" y2="90"  stroke={BLACK} strokeWidth="2"/>
        {/* Floor tiles */}
        {[200,160,130].map((y,i) => {
          const spread = (240 - y) / 240 * 160;
          return <line key={i} x1={160-spread} y1={y} x2={160+spread} y2={y} stroke={BLACK} strokeWidth="1" opacity="0.25"/>;
        })}
        {/* Ceiling */}
        <line x1="0"   y1="0"  x2="320" y2="0"  stroke={BLACK} strokeWidth="2"/>
        <line x1="0"   y1="0"  x2="160" y2="90" stroke={BLACK} strokeWidth="1.5" opacity="0.5"/>
        <line x1="320" y1="0"  x2="160" y2="90" stroke={BLACK} strokeWidth="1.5" opacity="0.5"/>

        {/* Wall light strips */}
        {[60,130,200,250].map((y,i) => (
          <line key={i} x1="0" y1={y} x2="320" y2={y} stroke={RED} strokeWidth="0.8" opacity="0.15"/>
        ))}

        {/* Left wall large door */}
        <rect x="0" y="40" width="88" height="200" rx="5" fill={CREAM} stroke={RED} strokeWidth="2.5"/>
        <rect x="8" y="50" width="72" height="184" rx="4" fill="rgba(198,40,40,0.04)" stroke={RED} strokeWidth="1.5"/>
        {/* Door panels */}
        <rect x="14" y="58"  width="30" height="70" rx="3" stroke={RED} strokeWidth="1.2" fill="none" opacity="0.5"/>
        <rect x="50" y="58"  width="24" height="70" rx="3" stroke={RED} strokeWidth="1.2" fill="none" opacity="0.5"/>
        <rect x="14" y="138" width="30" height="82" rx="3" stroke={RED} strokeWidth="1.2" fill="none" opacity="0.5"/>
        <rect x="50" y="138" width="24" height="82" rx="3" stroke={RED} strokeWidth="1.2" fill="none" opacity="0.5"/>
        {/* Knob */}
        <circle cx="76" cy="148" r="6" fill={YELLOW} stroke={RED} strokeWidth="1.5"/>
        <circle cx="76" cy="148" r="2.5" fill={RED}/>

        {/* Right wall large door */}
        <rect x="232" y="40" width="88" height="200" rx="5" fill={CREAM} stroke={RED} strokeWidth="2.5"/>
        <rect x="240" y="50" width="72" height="184" rx="4" fill="rgba(198,40,40,0.04)" stroke={RED} strokeWidth="1.5"/>
        <rect x="246" y="58"  width="24" height="70" rx="3" stroke={RED} strokeWidth="1.2" fill="none" opacity="0.5"/>
        <rect x="276" y="58"  width="30" height="70" rx="3" stroke={RED} strokeWidth="1.2" fill="none" opacity="0.5"/>
        <rect x="246" y="138" width="24" height="82" rx="3" stroke={RED} strokeWidth="1.2" fill="none" opacity="0.5"/>
        <rect x="276" y="138" width="30" height="82" rx="3" stroke={RED} strokeWidth="1.2" fill="none" opacity="0.5"/>
        <circle cx="244" cy="148" r="6" fill={YELLOW} stroke={RED} strokeWidth="1.5"/>
        <circle cx="244" cy="148" r="2.5" fill={RED}/>

        {/* Centre door — smaller, far away */}
        <rect x="120" y="110" width="80" height="130" rx="5" fill={CREAM} stroke={RED} strokeWidth="2.5"/>
        <rect x="128" y="118" width="64" height="116" rx="4" fill="rgba(198,40,40,0.05)" stroke={RED} strokeWidth="1.5"/>
        <circle cx="178" cy="178" r="5" fill={YELLOW} stroke={RED} strokeWidth="1.5"/>
        <circle cx="178" cy="178" r="2" fill={RED}/>
        {/* Light glow from under centre door */}
        <ellipse cx="160" cy="240" rx="48" ry="8" fill={YELLOW} fillOpacity="0.2"/>

        {/* Ceiling lamp */}
        <line x1="160" y1="0" x2="160" y2="22" stroke={BLACK} strokeWidth="2"/>
        <ellipse cx="160" cy="26" rx="20" ry="8" fill={YELLOW} fillOpacity="0.3" stroke={YELLOW} strokeWidth="1.5"/>
        <ellipse cx="160" cy="80" rx="50" ry="30" fill={YELLOW} fillOpacity="0.06"/>

        {/* Running child silhouette */}
        <circle cx="145" cy="170" r="7" stroke={BLACK} strokeWidth="2" fill="rgba(26,26,26,0.12)"/>
        <line x1="145" y1="177" x2="145" y2="195" stroke={BLACK} strokeWidth="2"/>
        <line x1="136" y1="185" x2="154" y2="185" stroke={BLACK} strokeWidth="2"/>
        <line x1="145" y1="195" x2="137" y2="208" stroke={BLACK} strokeWidth="2"/>
        <line x1="145" y1="195" x2="153" y2="208" stroke={BLACK} strokeWidth="2"/>
        {/* Motion lines */}
        <line x1="130" y1="175" x2="118" y2="173" stroke={RED} strokeWidth="1.2" opacity="0.5"/>
        <line x1="130" y1="181" x2="115" y2="180" stroke={RED} strokeWidth="1.2" opacity="0.5"/>
        <line x1="130" y1="187" x2="118" y2="187" stroke={RED} strokeWidth="1.2" opacity="0.5"/>
      </g>
    </svg>
  );
}

/* ── Scene 4 : music box ─────────────────────────────────────────────────── */
export function IllustrationMusicBox() {
  return (
    <svg viewBox="0 0 320 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-music"/>
      <g filter="url(#sk-music)" strokeLinecap="round" strokeLinejoin="round">
        {/* Table */}
        <rect x="30" y="200" width="260" height="14" rx="6" fill={CREAM} stroke={BLACK} strokeWidth="2"/>
        <line x1="60"  y1="214" x2="60"  y2="250" stroke={BLACK} strokeWidth="3"/>
        <line x1="260" y1="214" x2="260" y2="250" stroke={BLACK} strokeWidth="3"/>

        {/* Box body — ornate */}
        <rect x="70" y="130" width="180" height="72" rx="10" fill={CREAM} stroke={RED} strokeWidth="2.5"/>
        {/* Box trim */}
        <rect x="76" y="136" width="168" height="60" rx="8" stroke={RED} strokeWidth="1.2" fill="none" opacity="0.4"/>
        {/* Box carvings */}
        <path d="M95 155 Q110 148 125 155 Q110 162 95 155Z" stroke={RED} strokeWidth="1" fill={RED} fillOpacity="0.15"/>
        <path d="M195 155 Q210 148 225 155 Q210 162 195 155Z" stroke={RED} strokeWidth="1" fill={RED} fillOpacity="0.15"/>
        {/* Music drum */}
        <rect x="118" y="155" width="84" height="30" rx="6" stroke={YELLOW} strokeWidth="1.8" fill={YELLOW} fillOpacity="0.1"/>
        {/* Drum pins */}
        {[125,132,139,146,153,160,167,174,181,188,195].map((x,i) => (
          <circle key={i} cx={x} cy={i%2===0?163:170} r="2.5" fill={YELLOW} stroke={RED} strokeWidth="1"/>
        ))}
        {/* Wind key */}
        <circle cx="252" cy="166" r="10" stroke={RED} strokeWidth="2" fill={CREAM}/>
        <line x1="252" y1="156" x2="252" y2="148" stroke={RED} strokeWidth="2"/>
        <line x1="248" y1="152" x2="256" y2="152" stroke={RED} strokeWidth="2"/>

        {/* Lid — open, hinging at back */}
        <path d="M70 130 Q100 55 250 130" stroke={RED} strokeWidth="2.5" fill={CREAM} fillOpacity="0.5"/>
        <path d="M76 130 Q104 60 244 130" stroke={RED} strokeWidth="1" fill="none" opacity="0.4"/>
        {/* Lid mirror inside */}
        <path d="M90 128 Q130 70 230 128" stroke={YELLOW} strokeWidth="0.8" fill="none" opacity="0.4"/>

        {/* Ballerina */}
        <circle cx="160" cy="95"  r="10" stroke={RED} strokeWidth="2" fill="rgba(198,40,40,0.1)"/>
        <line x1="160" y1="105" x2="160" y2="125" stroke={RED} strokeWidth="2.2"/>
        {/* Tutu */}
        <path d="M145 118 Q160 112 175 118 Q172 128 160 130 Q148 128 145 118Z" stroke={RED} strokeWidth="1.5" fill={RED} fillOpacity="0.15"/>
        {/* Arms up */}
        <line x1="160" y1="110" x2="140" y2="98" stroke={RED} strokeWidth="2"/>
        <line x1="160" y1="110" x2="180" y2="98" stroke={RED} strokeWidth="2"/>
        {/* Legs */}
        <line x1="160" y1="125" x2="148" y2="138" stroke={RED} strokeWidth="2"/>
        <line x1="160" y1="125" x2="172" y2="138" stroke={RED} strokeWidth="2"/>
        {/* Hair bun */}
        <circle cx="160" cy="84"  r="7" stroke={RED} strokeWidth="1.5" fill="rgba(26,26,26,0.2)"/>

        {/* Music notes floating */}
        {[
          [62,48],[100,28],[148,18],[200,22],[248,38],[285,55],
          [78,75],[230,68],
        ].map(([x,y],i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="6" fill={RED} fillOpacity="0.6" stroke={RED} strokeWidth="1.2"/>
            <line x1={x+6} y1={y} x2={x+6} y2={y-18} stroke={RED} strokeWidth="1.8"/>
            {i%2===0 && <line x1={x+6} y1={y-18} x2={x+18} y2={y-14} stroke={RED} strokeWidth="1.8"/>}
          </g>
        ))}

        {/* Sound wave arcs */}
        <path d="M52 90 Q60 78 52 66" stroke={YELLOW} strokeWidth="1.5" fill="none" opacity="0.6"/>
        <path d="M42 96 Q54 78 42 60" stroke={YELLOW} strokeWidth="1.2" fill="none" opacity="0.4"/>
        <path d="M268 90 Q260 78 268 66" stroke={YELLOW} strokeWidth="1.5" fill="none" opacity="0.6"/>
        <path d="M278 96 Q266 78 278 60" stroke={YELLOW} strokeWidth="1.2" fill="none" opacity="0.4"/>
      </g>
    </svg>
  );
}

/* ── Scene 5 : bakery in rain ────────────────────────────────────────────── */
export function IllustrationBakery() {
  return (
    <svg viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-bakery"/>
      <g filter="url(#sk-bakery)" strokeLinecap="round" strokeLinejoin="round">
        {/* Building */}
        <rect x="20" y="55" width="280" height="190" rx="6" fill={CREAM} stroke={RED} strokeWidth="2.5"/>

        {/* Awning — striped */}
        <path d="M10 55 L310 55 L290 90 L30 90 Z" fill={RED} fillOpacity="0.85" stroke={DKRED} strokeWidth="2"/>
        {[50,80,110,140,170,200,230,260,288].map((x,i) => (
          <line key={i} x1={x} y1="55" x2={x-9} y2="90" stroke="white" strokeWidth="2" opacity="0.3"/>
        ))}
        {/* Awning fringe */}
        {[30,50,70,90,110,130,150,170,190,210,230,250,270,290].map((x,i) => (
          <path key={i} d={`M${x} 90 Q${x+5} 98 ${x+10} 90`} stroke={DKRED} strokeWidth="1.5" fill="none"/>
        ))}

        {/* Sign board */}
        <rect x="90" y="20" width="140" height="36" rx="8" fill={CREAM} stroke={RED} strokeWidth="2"/>
        <line x1="160" y1="20" x2="160" y2="0"  stroke={RED} strokeWidth="2"/>
        <line x1="130" y1="20" x2="130" y2="8"  stroke={RED} strokeWidth="1.5"/>
        <line x1="190" y1="20" x2="190" y2="8"  stroke={RED} strokeWidth="1.5"/>
        {/* Sign text lines */}
        <line x1="110" y1="32" x2="155" y2="32" stroke={RED} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="165" y1="32" x2="210" y2="32" stroke={RED} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="118" y1="42" x2="200" y2="42" stroke={RED} strokeWidth="1.5" opacity="0.5"/>

        {/* Showcase windows */}
        <rect x="32"  y="100" width="95"  height="75" rx="4" fill={YELLOW} fillOpacity="0.12" stroke={RED} strokeWidth="2"/>
        <rect x="193" y="100" width="95"  height="75" rx="4" fill={YELLOW} fillOpacity="0.12" stroke={RED} strokeWidth="2"/>
        {/* Cakes in left window */}
        {[[50,152],[72,148],[94,152],[116,155]].map(([x,y],i) => (
          <g key={i}>
            <rect x={x-10} y={y} width="20" height="14" rx="5" fill={RED} fillOpacity="0.5" stroke={RED} strokeWidth="1.2"/>
            <path d={`M${x-10} ${y} Q${x} ${y-8} ${x+10} ${y}`} stroke="white" strokeWidth="1.5" fill="none" opacity="0.6"/>
            <circle cx={x} cy={y-2} r="2.5" fill={YELLOW}/>
          </g>
        ))}
        {/* Cakes in right window */}
        {[[208,155],[228,150],[250,155],[272,152]].map(([x,y],i) => (
          <g key={i}>
            <rect x={x-10} y={y} width="20" height="14" rx="5" fill={RED} fillOpacity="0.5" stroke={RED} strokeWidth="1.2"/>
            <path d={`M${x-10} ${y} Q${x} ${y-8} ${x+10} ${y}`} stroke="white" strokeWidth="1.5" fill="none" opacity="0.6"/>
            <circle cx={x} cy={y-2} r="2.5" fill={YELLOW}/>
          </g>
        ))}

        {/* Door */}
        <rect x="120" y="165" width="80" height="80" rx="6" fill={CREAM} stroke={RED} strokeWidth="2.5"/>
        <path d="M120 165 Q160 150 200 165" stroke={RED} strokeWidth="2" fill={CREAM} fillOpacity="0.5"/>
        <circle cx="192" cy="207" r="5.5" fill={YELLOW} stroke={RED} strokeWidth="1.5"/>
        <circle cx="192" cy="207" r="2"   fill={RED}/>
        {/* Door window */}
        <rect x="130" y="170" width="60"  height="30" rx="4" fill={YELLOW} fillOpacity="0.15" stroke={RED} strokeWidth="1.2"/>

        {/* Ground */}
        <line x1="0" y1="250" x2="320" y2="250" stroke={BLACK} strokeWidth="3"/>
        {/* Puddles */}
        <ellipse cx="60"  cy="252" rx="32" ry="6" fill={YELLOW} fillOpacity="0.12" stroke={RED} strokeWidth="1" opacity="0.4"/>
        <ellipse cx="255" cy="252" rx="28" ry="5" fill={YELLOW} fillOpacity="0.12" stroke={RED} strokeWidth="1" opacity="0.4"/>

        {/* Rain */}
        {Array.from({length:22}).map((_,i) => {
          const x = 5 + (i*14)%315, y = 2 + (i*21)%55;
          return <line key={i} x1={x} y1={y} x2={x-4} y2={y+15}
                   stroke={RED} strokeWidth="1.3" opacity="0.3"/>;
        })}

        {/* Two figures running under shared umbrella */}
        {/* Umbrella */}
        <path d="M148 220 Q185 195 222 220" stroke={RED} strokeWidth="2.5" fill={RED} fillOpacity="0.15"/>
        <line x1="185" y1="220" x2="185" y2="248" stroke={RED} strokeWidth="2.2"/>
        <path d="M185 248 Q190 252 186 255" stroke={RED} strokeWidth="1.8" fill="none"/>
        {/* Person 1 (adult) */}
        <circle cx="168" cy="228" r="7" stroke={BLACK} strokeWidth="1.8" fill="rgba(26,26,26,0.1)"/>
        <line x1="168" y1="235" x2="168" y2="248" stroke={BLACK} strokeWidth="2"/>
        <line x1="160" y1="241" x2="176" y2="241" stroke={BLACK} strokeWidth="2"/>
        {/* Person 2 (child) */}
        <circle cx="200" cy="230" r="6" stroke={BLACK} strokeWidth="1.8" fill="rgba(26,26,26,0.1)"/>
        <line x1="200" y1="236" x2="200" y2="248" stroke={BLACK} strokeWidth="1.8"/>
        <line x1="193" y1="241" x2="207" y2="241" stroke={BLACK} strokeWidth="1.8"/>
      </g>
    </svg>
  );
}

/* ── Scene 6 : photo gallery corridor ───────────────────────────────────── */
export function IllustrationGallery() {
  return (
    <svg viewBox="0 0 320 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-gallery"/>
      <g filter="url(#sk-gallery)" strokeLinecap="round" strokeLinejoin="round">
        {/* Wall */}
        <rect x="0" y="0" width="320" height="250" fill="rgba(198,40,40,0.03)"/>
        <line x1="0"   y1="15"  x2="320" y2="15"  stroke={RED} strokeWidth="3"/>
        <line x1="0"   y1="210" x2="320" y2="210" stroke={BLACK} strokeWidth="3"/>
        {/* Dado rail */}
        <line x1="0"   y1="165" x2="320" y2="165" stroke={RED} strokeWidth="1.5" opacity="0.4"/>

        {/* Frame 1 — left — "day of success" */}
        <rect x="8"  y="30" width="82" height="108" rx="5" fill={CREAM} stroke={RED} strokeWidth="3"/>
        <rect x="16" y="38" width="66" height="92"  rx="3" fill="rgba(198,40,40,0.05)" stroke={RED} strokeWidth="1.5"/>
        {/* Trophy figure */}
        <circle cx="49" cy="62" r="9" stroke={BLACK} strokeWidth="2" fill="rgba(26,26,26,0.1)"/>
        <line x1="49" y1="71" x2="49" y2="90" stroke={BLACK} strokeWidth="2"/>
        <line x1="38" y1="80" x2="60" y2="80" stroke={BLACK} strokeWidth="2"/>
        <line x1="49" y1="90" x2="40" y2="106" stroke={BLACK} strokeWidth="2"/>
        <line x1="49" y1="90" x2="58" y2="106" stroke={BLACK} strokeWidth="2"/>
        {/* Trophy */}
        <path d="M36 53 Q49 44 62 53 Q60 58 49 60 Q38 58 36 53Z" stroke={YELLOW} strokeWidth="2" fill={YELLOW} fillOpacity="0.4"/>
        <line x1="49" y1="60" x2="49" y2="67" stroke={YELLOW} strokeWidth="2"/>
        <line x1="42" y1="67" x2="56" y2="67" stroke={YELLOW} strokeWidth="1.8"/>
        {/* Stars around */}
        {[22,42,62,76].map((x,i) => (
          <path key={i} d={`M${x} 44 L${x+3} 40 L${x+6} 44 L${x+3} 48Z`} fill={YELLOW} fillOpacity="0.6"/>
        ))}
        {/* String + nail */}
        <line x1="49" y1="30" x2="49" y2="15" stroke={BLACK} strokeWidth="1.5"/>
        <circle cx="49" cy="13" r="3" fill={RED} stroke={RED} strokeWidth="1"/>

        {/* Frame 2 — centre-left — "day with someone beside you" */}
        <rect x="102" y="22" width="90" height="118" rx="5" fill={CREAM} stroke={RED} strokeWidth="3.5"/>
        <rect x="110" y="30" width="74" height="102" rx="3" fill="rgba(198,40,40,0.05)" stroke={RED} strokeWidth="1.5"/>
        {/* Two figures holding hands */}
        <circle cx="132" cy="55" r="9" stroke={BLACK} strokeWidth="2" fill="rgba(26,26,26,0.1)"/>
        <line x1="132" y1="64" x2="132" y2="84" stroke={BLACK} strokeWidth="2"/>
        <line x1="120" y1="73" x2="146" y2="73" stroke={BLACK} strokeWidth="2"/>
        <line x1="132" y1="84" x2="124" y2="100" stroke={BLACK} strokeWidth="2"/>
        <line x1="132" y1="84" x2="140" y2="100" stroke={BLACK} strokeWidth="2"/>
        <circle cx="162" cy="55" r="9" stroke={BLACK} strokeWidth="2" fill="rgba(26,26,26,0.1)"/>
        <line x1="162" y1="64" x2="162" y2="84" stroke={BLACK} strokeWidth="2"/>
        <line x1="150" y1="73" x2="174" y2="73" stroke={BLACK} strokeWidth="2"/>
        <line x1="162" y1="84" x2="154" y2="100" stroke={BLACK} strokeWidth="2"/>
        <line x1="162" y1="84" x2="170" y2="100" stroke={BLACK} strokeWidth="2"/>
        {/* Joined hands */}
        <line x1="146" y1="73" x2="150" y2="73" stroke={RED} strokeWidth="2.5"/>
        {/* Heart */}
        <path d="M143 45 Q147 40 151 45 Q153 48 147 53 Q141 48 141 45 Z"
          fill={RED} fillOpacity="0.6" stroke={RED} strokeWidth="1"/>
        {/* String + nail */}
        <line x1="147" y1="22" x2="147" y2="15" stroke={BLACK} strokeWidth="1.5"/>
        <circle cx="147" cy="13" r="3.5" fill={RED} stroke={RED} strokeWidth="1"/>

        {/* Frame 3 — centre-right — "trying something new" */}
        <rect x="204" y="28" width="82" height="110" rx="5" fill={CREAM} stroke={RED} strokeWidth="3"/>
        <rect x="212" y="36" width="66" height="94"  rx="3" fill="rgba(198,40,40,0.05)" stroke={RED} strokeWidth="1.5"/>
        {/* Figure on mountain/adventure */}
        <path d="M218 118 Q228 80 245 65 Q262 80 272 118Z" stroke={BLACK} strokeWidth="2" fill="rgba(26,26,26,0.08)"/>
        <circle cx="245" cy="58" r="8" stroke={BLACK} strokeWidth="2" fill="rgba(26,26,26,0.1)"/>
        <line x1="245" y1="66" x2="245" y2="82" stroke={BLACK} strokeWidth="2"/>
        <line x1="237" y1="74" x2="253" y2="74" stroke={BLACK} strokeWidth="2"/>
        {/* Flag at peak */}
        <line x1="245" y1="65" x2="245" y2="45" stroke={RED} strokeWidth="2.2"/>
        <path d="M245 45 L258 50 L245 55Z" fill={RED} fillOpacity="0.7" stroke={RED} strokeWidth="1"/>
        {/* Sun */}
        <circle cx="258" cy="44" r="8" fill={YELLOW} fillOpacity="0.5" stroke={YELLOW} strokeWidth="1.5"/>
        {/* String + nail */}
        <line x1="245" y1="28" x2="245" y2="15" stroke={BLACK} strokeWidth="1.5"/>
        <circle cx="245" cy="13" r="3" fill={RED} stroke={RED} strokeWidth="1"/>

        {/* Frame 4 — right — "ordinary happy day" (small) */}
        <rect x="298" y="40" width="22" height="90" rx="3" fill={CREAM} stroke={RED} strokeWidth="2"/>
        <rect x="302" y="45" width="14" height="80" rx="2" fill="rgba(198,40,40,0.04)" stroke={RED} strokeWidth="1"/>
        {/* Simple smiley */}
        <circle cx="309" cy="80" r="6" stroke={RED} strokeWidth="1.5"/>
        <path d="M306 82 Q309 86 312 82" stroke={RED} strokeWidth="1" fill="none"/>
        <circle cx="307" cy="78" r="1" fill={RED}/>
        <circle cx="311" cy="78" r="1" fill={RED}/>

        {/* Floor */}
        <line x1="0" y1="240" x2="320" y2="240" stroke={BLACK} strokeWidth="2.5"/>

        {/* Viewing figure (the player, from behind) */}
        <circle cx="160" cy="194" r="10" stroke={BLACK} strokeWidth="2" fill="rgba(26,26,26,0.15)"/>
        <line x1="160" y1="204" x2="160" y2="228" stroke={BLACK} strokeWidth="2.5"/>
        <line x1="145" y1="213" x2="175" y2="213" stroke={BLACK} strokeWidth="2.5"/>
        <line x1="160" y1="228" x2="150" y2="242" stroke={BLACK} strokeWidth="2"/>
        <line x1="160" y1="228" x2="170" y2="242" stroke={BLACK} strokeWidth="2"/>
        {/* Arms reaching toward frame 2 */}
        <line x1="145" y1="213" x2="130" y2="205" stroke={BLACK} strokeWidth="2"/>
        <line x1="175" y1="213" x2="190" y2="205" stroke={BLACK} strokeWidth="2"/>
      </g>
    </svg>
  );
}

/* ── Scene 7 : final door ────────────────────────────────────────────────── */
export function IllustrationDoor() {
  return (
    <svg viewBox="0 0 320 270" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-sm mx-auto">
      <SkFilter id="sk-door"/>
      <g filter="url(#sk-door)" strokeLinecap="round" strokeLinejoin="round">
        {/* Atmospheric light behind door */}
        <ellipse cx="160" cy="135" rx="90" ry="110" fill={YELLOW} fillOpacity="0.08"/>

        {/* Door frame */}
        <rect x="68" y="28" width="184" height="218" rx="8" fill={CREAM} stroke={RED} strokeWidth="3.5"/>
        {/* Frame ornament top */}
        <path d="M68 80 Q160 18 252 80" stroke={RED} strokeWidth="3" fill={RED} fillOpacity="0.1"/>
        {/* Frame inner moulding */}
        <rect x="78" y="38" width="164" height="198" rx="6" stroke={RED} strokeWidth="1.5" fill="none" opacity="0.4"/>

        {/* Door — slightly ajar hint */}
        <rect x="76" y="36" width="168" height="202" rx="6" fill="rgba(198,40,40,0.05)" stroke={RED} strokeWidth="2"/>

        {/* Panel top-left */}
        <rect x="90" y="52"  width="62" height="72" rx="5" fill={CREAM} stroke={RED} strokeWidth="1.8"/>
        <rect x="97" y="59"  width="48" height="58" rx="3" fill="rgba(198,40,40,0.04)" stroke={RED} strokeWidth="1" opacity="0.5"/>
        {/* Panel top-right */}
        <rect x="168" y="52" width="62" height="72" rx="5" fill={CREAM} stroke={RED} strokeWidth="1.8"/>
        <rect x="175" y="59" width="48" height="58" rx="3" fill="rgba(198,40,40,0.04)" stroke={RED} strokeWidth="1" opacity="0.5"/>
        {/* Panel bottom-left */}
        <rect x="90" y="136" width="62" height="84" rx="5" fill={CREAM} stroke={RED} strokeWidth="1.8"/>
        <rect x="97" y="143" width="48" height="70" rx="3" fill="rgba(198,40,40,0.04)" stroke={RED} strokeWidth="1" opacity="0.5"/>
        {/* Panel bottom-right */}
        <rect x="168" y="136" width="62" height="84" rx="5" fill={CREAM} stroke={RED} strokeWidth="1.8"/>
        <rect x="175" y="143" width="48" height="70" rx="3" fill="rgba(198,40,40,0.04)" stroke={RED} strokeWidth="1" opacity="0.5"/>

        {/* Knob — ornate */}
        <circle cx="196" cy="148" r="12" fill={YELLOW} fillOpacity="0.5" stroke={RED} strokeWidth="2.5"/>
        <circle cx="196" cy="148" r="6"  fill={RED} fillOpacity="0.6"/>
        <circle cx="196" cy="148" r="2.5" fill={YELLOW}/>
        {/* Keyhole */}
        <circle cx="196" cy="162" r="4"  fill={BLACK} opacity="0.5"/>
        <path d="M193 162 L193 172 L199 172 L199 162Z" fill={BLACK} opacity="0.5"/>

        {/* Steps */}
        <rect x="44" y="246" width="232" height="10" rx="4" fill={CREAM} stroke={RED} strokeWidth="2"/>
        <rect x="28" y="256" width="264" height="10" rx="4" fill={CREAM} stroke={RED} strokeWidth="2"/>

        {/* Child figure beside door */}
        <circle cx="42" cy="202" r="9"  stroke={BLACK} strokeWidth="2" fill="rgba(26,26,26,0.12)"/>
        <line x1="42" y1="211" x2="42" y2="232" stroke={BLACK} strokeWidth="2.2"/>
        <line x1="32" y1="220" x2="52" y2="220" stroke={BLACK} strokeWidth="2.2"/>
        <line x1="42" y1="232" x2="34" y2="246" stroke={BLACK} strokeWidth="2"/>
        <line x1="42" y1="232" x2="50" y2="246" stroke={BLACK} strokeWidth="2"/>
        {/* Child reaching for knob */}
        <line x1="52" y1="218" x2="68" y2="215" stroke={BLACK} strokeWidth="2"/>

        {/* Light escaping under door */}
        <ellipse cx="160" cy="240" rx="72" ry="9" fill={YELLOW} fillOpacity="0.25"/>
        {/* Light rays from keyhole */}
        {[-30,-15,0,15,30].map((deg,i) => {
          const r = Math.PI * deg / 180;
          return <line key={i}
            x1={196} y1={166}
            x2={196 + 30*Math.sin(r)} y2={166 + 30*Math.cos(r)}
            stroke={YELLOW} strokeWidth="1.2" opacity="0.4"/>;
        })}
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
