"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import type { CakeType } from "../quiz/data";

// ── Personality data ─────────────────────────────────────────────────────────
const CAKES: Record<CakeType, {
  name: string; thai: string; role: string; color: string; accent: string; body: string;
}> = {
  vanilla: {
    name: "Vanilla Cloud", thai: "เค้กวนิลา", role: "ผู้มอบความอบอุ่น",
    color: "#8B6914", accent: "#FFF4D6",
    body: "คุณเป็นคนที่อยู่ตรงไหนก็ทำให้ตรงนั้นสบายใจขึ้นเสมอ\n\nเหมือนวนิลาที่อาจไม่ได้โดดเด่นที่สุด แต่กลับเป็นรสชาติที่ทุกคนคิดถึง\n\nบางครั้งคุณถูกมองข้ามเพราะคอยดูแลคนอื่นอยู่เสมอ\n\nคนที่คอยเป็นบ้านให้คนอื่น ก็ควรมีบ้านให้ตัวเองพักเช่นกันนะ",
  },
  matcha: {
    name: "Matcha Soul", thai: "เค้กมัตฉะ", role: "ผู้กล้าเป็นตัวเอง",
    color: "#2C5F2E", accent: "#e8f5e9",
    body: "คุณไม่ค่อยเดินตามคนอื่น และไม่จำเป็นต้องได้รับการยอมรับจากทุกคน\n\nเพราะคุณรู้ว่าคุณเป็นใคร\n\nเหมือนมัตฉะที่ไม่ใช่รสโปรดของทุกคน แต่เมื่อใครสักคนหลงรัก เขาจะไม่มีวันลืมรสชาตินั้นได้เลย",
  },
  darkchoc: {
    name: "Dark Chocolate", thai: "เค้กช็อกโกแลต", role: "ผู้ซ่อนความอบอุ่น",
    color: "#3E2000", accent: "#f3e5d0",
    body: "ภายนอกคุณดูนิ่ง แต่ภายในเต็มไปด้วยความอ่อนโยน\n\nคุณไม่ใช่คนพูดเก่ง แต่ทุกการกระทำของคุณมีความหมายเสมอ",
  },
  strawberry: {
    name: "Strawberry Bloom", thai: "เค้กสตรอว์เบอร์รี่", role: "ผู้ส่งต่อรอยยิ้ม",
    color: "#C62828", accent: "#fce4ec",
    body: "คุณทำให้คนรอบตัวสดใสขึ้นได้อย่างน่าอัศจรรย์\n\nแต่บางครั้ง คุณก็ลืมถามตัวเองว่า\n\n\"วันนี้ฉันโอเคหรือเปล่า\"",
  },
  blueberry: {
    name: "Blueberry Dream", thai: "เค้กบลูเบอร์รี่", role: "นักฝันผู้มองโลกต่างมุม",
    color: "#283593", accent: "#e8eaf6",
    body: "คุณเต็มไปด้วยจินตนาการ ชอบตั้งคำถามกับสิ่งที่คนอื่นมองข้าม\n\nหลายคนอาจไม่เข้าใจความคิดของคุณ\n\nแต่ความแตกต่างนั้นคือของขวัญ ไม่ใช่ข้อผิดพลาด",
  },
  honey: {
    name: "Honey Caramel", thai: "เค้กคาราเมลน้ำผึ้ง", role: "ผู้ปลอบประโลมผู้คน",
    color: "#8B4513", accent: "#fff8e1",
    body: "คุณมีพรสวรรค์ในการทำให้คนอื่นรู้สึกดีขึ้น\n\nเหมือนรสชาติหวานละมุนที่ค่อย ๆ เยียวยาหัวใจ",
  },
  lemon: {
    name: "Lemon Zest", thai: "เค้กเลมอน", role: "นักสร้างพลังบวก",
    color: "#827717", accent: "#fffde7",
    body: "คุณชอบความท้าทาย ชอบลองสิ่งใหม่ และพร้อมเริ่มต้นใหม่เสมอ\n\nเหมือนรสเปรี้ยวสดชื่นที่ปลุกชีวิตให้ตื่นขึ้นอีกครั้ง",
  },
  mocha: {
    name: "Coffee Mocha", thai: "เค้กมอคค่า", role: "นักสู้ผู้ไม่ยอมแพ้",
    color: "#2C1810", accent: "#efebe9",
    body: "คุณผ่านเรื่องหนักมามากกว่าที่คนส่วนใหญ่รู้\n\nและทุกครั้งคุณก็กลับมายืนได้เสมอ",
  },
  blackforest: {
    name: "Black Forest", thai: "เค้กแบล็กฟอเรสต์", role: "ผู้ลุ่มลึกและโรแมนติก",
    color: "#1a1a2e", accent: "#f3e5f5",
    body: "คุณให้คุณค่ากับความทรงจำ ความสัมพันธ์ และความหมายของสิ่งเล็ก ๆ\n\nมากกว่าคนส่วนใหญ่",
  },
  mango: {
    name: "Mango Cheesecake", thai: "ชีสเค้กมะม่วง", role: "ผู้สร้างสีสันให้ชีวิต",
    color: "#E65100", accent: "#fff3e0",
    body: "คุณกล้าใช้ชีวิต กล้าหัวเราะ กล้าฝัน\n\nและทำให้คนรอบตัวรู้สึกว่าโลกใบนี้น่าอยู่ขึ้น",
  },
};

// ── Cake illustrations ────────────────────────────────────────────────────────
function CakeIllustration({ type, color }: { type: CakeType; color: string }) {
  const c = color;
  const light = "rgba(255,255,255,0.6)";

  const drawingsMap: Record<CakeType, JSX.Element> = {
    vanilla: (
      <g>
        <rect x="30" y="95"  width="100" height="50" rx="14" fill={c} opacity=".85"/>
        <path d="M30 95 Q40 80 50 95 Q60 80 70 95 Q80 80 90 95 Q100 80 110 95 Q120 80 130 95" stroke={light} strokeWidth="3" fill="none" strokeLinecap="round"/>
        <rect x="45" y="58"  width="70"  height="40" rx="10" fill={c}/>
        <path d="M45 58 Q53 46 61 58 Q69 46 77 58 Q85 46 93 58 Q101 46 109 58 Q115 46 115 58" stroke={light} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <ellipse cx="80" cy="54" rx="24" ry="11" fill="white" opacity=".9"/>
        <path d="M80 43 Q86 37 84 30 Q80 26 76 30 Q74 37 80 43Z" fill="#FBC02D"/>
        <circle cx="80" cy="33" r="3" fill="white" opacity=".7"/>
        {[38,52,68,84,100,116].map((x,i)=><circle key={i} cx={x} cy={112} r="3" fill="#FBC02D" opacity=".6"/>)}
      </g>
    ),
    matcha: (
      <g>
        <rect x="25" y="92"  width="110" height="52" rx="14" fill="#4a7c59" opacity=".9"/>
        <path d="M25 92 Q36 76 47 92 Q58 76 69 92 Q80 76 91 92 Q102 76 113 92 Q123 76 135 92" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7"/>
        <rect x="42" y="56"  width="76"  height="40" rx="10" fill="#2C5F2E"/>
        <ellipse cx="80" cy="52" rx="26" ry="12" fill="#4a7c59"/>
        <path d="M80 40 Q87 33 85 26 Q80 22 75 26 Q73 33 80 40Z" fill="#81c784"/>
        <circle cx="80" cy="29" r="3" fill="white" opacity=".6"/>
        {[40,60,80,100,118].map((x,i)=><ellipse key={i} cx={x} cy={108} rx="4" ry="3" fill="#81c784" opacity=".5"/>)}
      </g>
    ),
    darkchoc: (
      <g>
        <rect x="22" y="90"  width="116" height="55" rx="14" fill="#3E2000" opacity=".95"/>
        <path d="M22 90 Q33 74 44 90 Q55 74 66 90 Q77 74 88 90 Q99 74 110 90 Q121 74 138 90" stroke="#8d6e63" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <rect x="38" y="52"  width="84"  height="42" rx="11" fill="#4e342e"/>
        <ellipse cx="80" cy="48" rx="28" ry="13" fill="#3E2000"/>
        <path d="M80 35 Q88 27 86 19 Q80 14 74 19 Q72 27 80 35Z" fill="#8d6e63"/>
        {[32,52,72,92,112,128].map((x,i)=><circle key={i} cx={x} cy={112} r="3" fill="#8d6e63" opacity=".5"/>)}
        <ellipse cx="80" cy="46" rx="16" ry="6" fill="#6d4c41" opacity=".4"/>
      </g>
    ),
    strawberry: (
      <g>
        <rect x="28" y="94"  width="104" height="50" rx="14" fill="#C62828" opacity=".9"/>
        <path d="M28 94 Q38 79 48 94 Q58 79 68 94 Q78 79 88 94 Q98 79 108 94 Q118 79 132 94" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7"/>
        <rect x="44" y="58"  width="72"  height="40" rx="10" fill="#d32f2f"/>
        <ellipse cx="80" cy="54" rx="24" ry="11" fill="white" opacity=".9"/>
        <path d="M80 43 Q86 37 84 30 Q80 26 76 30 Q74 37 80 43Z" fill="#C62828"/>
        {/* Strawberries */}
        {[38,60,80,100,122].map((x,i)=>(
          <g key={i}>
            <path d={`M${x} 110 Q${x+4} 104 ${x+8} 110 Q${x+8} 116 ${x+4} 118 Q${x} 116 ${x} 110Z`} fill="#ff5252" opacity=".7"/>
            <line x1={x+4} y1={104} x2={x+4} y2={100} stroke="#4caf50" strokeWidth="1.5"/>
          </g>
        ))}
      </g>
    ),
    blueberry: (
      <g>
        <rect x="26" y="92"  width="108" height="52" rx="14" fill="#283593" opacity=".9"/>
        <path d="M26 92 Q37 76 48 92 Q59 76 70 92 Q81 76 92 92 Q103 76 114 92 Q122 76 134 92" stroke="#9fa8da" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <rect x="42" y="56"  width="76"  height="40" rx="10" fill="#303f9f"/>
        <ellipse cx="80" cy="52" rx="26" ry="12" fill="#283593"/>
        <path d="M80 40 Q87 32 85 24 Q80 19 75 24 Q73 32 80 40Z" fill="#9fa8da"/>
        {/* Blueberries */}
        {[36,52,68,84,100,116,128].map((x,i)=><circle key={i} cx={x} cy={112} r="4" fill="#7986cb" opacity=".7"/>)}
        <circle cx="80" cy="30" r="3" fill="white" opacity=".6"/>
      </g>
    ),
    honey: (
      <g>
        <rect x="28" y="93"  width="104" height="51" rx="14" fill="#e65100" opacity=".85"/>
        <path d="M28 93 Q39 78 50 93 Q61 78 72 93 Q83 78 94 93 Q105 78 116 93 Q124 78 132 93" stroke="#FBC02D" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <rect x="44" y="57"  width="72"  height="40" rx="10" fill="#bf360c"/>
        <ellipse cx="80" cy="53" rx="25" ry="12" fill="#FBC02D" opacity=".9"/>
        <path d="M80 41 Q87 34 85 27 Q80 22 75 27 Q73 34 80 41Z" fill="#e65100"/>
        {[36,52,68,84,100,116,128].map((x,i)=><ellipse key={i} cx={x} cy={114} rx="5" ry="3" fill="#FBC02D" opacity=".6"/>)}
        {/* Honeycomb dots */}
        <circle cx="80" cy="30" r="3" fill="white" opacity=".5"/>
      </g>
    ),
    lemon: (
      <g>
        <rect x="28" y="93"  width="104" height="51" rx="14" fill="#f9a825" opacity=".9"/>
        <path d="M28 93 Q39 78 50 93 Q61 78 72 93 Q83 78 94 93 Q105 78 116 93 Q124 78 132 93" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7"/>
        <rect x="44" y="57"  width="72"  height="40" rx="10" fill="#f57f17"/>
        <ellipse cx="80" cy="53" rx="25" ry="12" fill="white" opacity=".9"/>
        <path d="M80 41 Q87 34 85 27 Q80 22 75 27 Q73 34 80 41Z" fill="#f9a825"/>
        {/* Lemon slices */}
        {[36,58,80,102,124].map((x,i)=>(
          <g key={i}>
            <ellipse cx={x} cy={113} rx="6" ry="5" fill="#fff176" opacity=".8"/>
            <line x1={x} y1={108} x2={x} y2={118} stroke="#f9a825" strokeWidth="1"/>
            <line x1={x-5} y1={113} x2={x+5} y2={113} stroke="#f9a825" strokeWidth="1"/>
          </g>
        ))}
      </g>
    ),
    mocha: (
      <g>
        <rect x="24" y="91"  width="112" height="53" rx="14" fill="#4e342e" opacity=".95"/>
        <path d="M24 91 Q35 75 46 91 Q57 75 68 91 Q79 75 90 91 Q101 75 112 91 Q123 75 136 91" stroke="#bcaaa4" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <rect x="40" y="55"  width="80"  height="40" rx="11" fill="#3e2723"/>
        <ellipse cx="80" cy="51" rx="27" ry="12" fill="#4e342e"/>
        <path d="M80 39 Q88 31 86 23 Q80 18 74 23 Q72 31 80 39Z" fill="#bcaaa4"/>
        <ellipse cx="80" cy="49" rx="18" ry="7" fill="#6d4c41" opacity=".5"/>
        {/* Coffee swirl */}
        <path d="M68 49 Q74 44 80 49 Q86 54 92 49" stroke="#bcaaa4" strokeWidth="1.5" fill="none" opacity=".5"/>
        <circle cx="80" cy="26" r="3" fill="white" opacity=".5"/>
        {[32,52,72,92,112,128].map((x,i)=><circle key={i} cx={x} cy={113} r="3" fill="#bcaaa4" opacity=".4"/>)}
      </g>
    ),
    blackforest: (
      <g>
        <rect x="22" y="90"  width="116" height="55" rx="14" fill="#1a1a2e" opacity=".95"/>
        <path d="M22 90 Q33 73 44 90 Q55 73 66 90 Q77 73 88 90 Q99 73 110 90 Q121 73 138 90" stroke="#ce93d8" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <rect x="38" y="52"  width="84"  height="42" rx="11" fill="#0d0d1a"/>
        <ellipse cx="80" cy="48" rx="28" ry="13" fill="white" opacity=".9"/>
        <path d="M80 35 Q88 27 86 19 Q80 14 74 19 Q72 27 80 35Z" fill="#1a1a2e"/>
        {/* Cherries */}
        {[38,58,80,102,122].map((x,i)=>(
          <g key={i}>
            <circle cx={x} cy={110} r="5" fill="#C62828" opacity=".8"/>
            <line x1={x} y1={105} x2={x+4} y2={100} stroke="#4caf50" strokeWidth="1.5"/>
          </g>
        ))}
        <circle cx="80" cy="26" r="3" fill="white" opacity=".6"/>
        <ellipse cx="80" cy="46" rx="16" ry="6" fill="white" opacity=".3"/>
      </g>
    ),
    mango: (
      <g>
        <rect x="26" y="92"  width="108" height="52" rx="14" fill="#ff8f00" opacity=".9"/>
        <path d="M26 92 Q37 76 48 92 Q59 76 70 92 Q81 76 92 92 Q103 76 114 92 Q122 76 134 92" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7"/>
        <rect x="42" y="56"  width="76"  height="40" rx="10" fill="#e65100"/>
        <ellipse cx="80" cy="52" rx="26" ry="12" fill="#FBC02D" opacity=".9"/>
        <path d="M80 40 Q87 32 85 24 Q80 19 75 24 Q73 32 80 40Z" fill="#ff8f00"/>
        {/* Mango chunks */}
        {[34,52,70,88,106,122].map((x,i)=>(
          <g key={i}>
            <path d={`M${x} 108 Q${x+6} 103 ${x+12} 108 Q${x+12} 116 ${x+6} 118 Q${x} 116 ${x} 108Z`} fill="#FBC02D" opacity=".6"/>
          </g>
        ))}
        <circle cx="80" cy="29" r="3" fill="white" opacity=".6"/>
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 160 160" width="180" height="180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sk-res" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" seed="4"/>
          <feDisplacementMap in="SourceGraphic" scale="2"/>
        </filter>
      </defs>
      <g filter="url(#sk-res)" strokeLinecap="round" strokeLinejoin="round">
        {drawingsMap[type]}
        {/* Plate */}
        <ellipse cx="80" cy="148" rx="62" ry="9" fill={color} opacity=".15" stroke={color} strokeWidth="1.5"/>
        {/* Plate shine */}
        <path d="M50 148 Q80 145 110 148" stroke="white" strokeWidth="1.5" opacity=".3"/>
      </g>
    </svg>
  );
}

// ── Result inner ─────────────────────────────────────────────────────────────
function ResultInner() {
  const params = useSearchParams();
  const router = useRouter();
  const type = (params.get("type") ?? "vanilla") as CakeType;
  const name = params.get("name") ?? "คุณ";
  const cake = CAKES[type] ?? CAKES.vanilla;

  return (
    <div className="min-h-screen paper-bg flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-sm flex flex-col items-center gap-6 animate-slide-up">

        {/* Header */}
        <p className="story-text text-base" style={{ color: "#2C5F2E" }}>
          {name} คุณคือ ...
        </p>

        {/* Cake illustration */}
        <div className="animate-float">
          <CakeIllustration type={type} color={cake.color} />
        </div>

        {/* Cake name badge */}
        <div className="text-center">
          <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#2C5F2E", fontFamily: "'Sarabun',sans-serif", opacity: 0.6 }}>
            {cake.thai}
          </p>
          <h1 className="text-3xl font-black mb-1" style={{ color: cake.color, fontFamily: "'Fredoka One', cursive" }}>
            {cake.name}
          </h1>
          <p className="text-base font-semibold" style={{ color: "#2C5F2E", fontFamily: "'Sarabun',sans-serif" }}>
            {cake.role}
          </p>
        </div>

        {/* Description card */}
        <div
          className="w-full rounded-3xl p-7"
          style={{
            background: cake.accent,
            border: `2px solid ${cake.color}22`,
            boxShadow: `0 8px 30px ${cake.color}18`,
          }}
        >
          {cake.body.split("\n\n").map((para, i) => (
            <p
              key={i}
              className="story-text text-sm leading-relaxed mb-3 last:mb-0"
              style={{ color: "#2a2a2a" }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Ending message from S&P */}
        <div className="text-center story-text text-xs opacity-60 leading-relaxed">
          <p>ขอมอบเค้กชิ้นนี้เป็นรางวัลให้กับคนเก่งที่พยายามอยู่ในทุกวันนี้</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-3 w-full max-w-xs">
          <button
            onClick={() => router.push("/quiz")}
            className="ink-btn w-full py-3 text-base"
          >
            เล่นอีกครั้ง
          </button>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 text-sm font-semibold rounded-full transition-all"
            style={{ color: "#2C5F2E", border: "2px solid rgba(44,95,46,0.3)", fontFamily: "'Sarabun',sans-serif" }}
          >
            กลับหน้าหลัก
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen paper-bg flex items-center justify-center">
        <p className="story-text" style={{ color: "#2C5F2E" }}>กำลังโหลด...</p>
      </div>
    }>
      <ResultInner />
    </Suspense>
  );
}
