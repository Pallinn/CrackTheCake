"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import type { CakeType } from "../quiz/data";

const R = "#C62828";
const Y = "#FBC02D";
const K = "#1a1a1a";

// ── Personality data ──────────────────────────────────────────────────────────
const CAKES: Record<CakeType, {
  name: string; thai: string; role: string; tagline: string; body: string;
}> = {
  vanilla: {
    name: "The Comfort Celebration",
    thai: "เค้กรสวนิลา",
    role: "ผู้มีจิตใจบริสุทธิ์",
    tagline: "หวังดีกับทุกคน เข้าได้กับทุกความสัมพันธ์",
    body: `คุณเป็นผู้ที่มีจิตใจบริสุทธิ์ หวังดีกับผู้อื่นเสมอ ให้ความสำคัญกับทุกความสัมพันธ์ เข้ากับใครก็ได้ เปรียบดั่งรสวนิลาที่เข้าได้ละมุนนุ่มกับหลากรสชาติ

แต่ในหลายครั้ง คุณอาจถูกสังคมลบเลือนไป หรือมองข้ามความสำคัญ เพียงเพราะคุณเข้ากับใครก็ได้

ขอเป็นหนึ่งในคนที่มองเห็นคุณคนเก่งคนนี้ ที่กำลังพยายามกับทุกความสัมพันธ์ และไม่อยากให้ถูกลืมเลือนไปจากความทรงจำของใครเลย เพราะคุณคนเก่งคนนี้ที่หวังดีกับผู้อื่นมาเสมอ เราก็หวังดีกับคุณเสมอเช่นกันนะ :)

คุณเชื่อว่าการพักผ่อนก็เป็นสิ่งที่ควรค่าแก่การเฉลิมฉลอง ในโลกที่ทุกคนเร่งรีบ คุณยังรู้ว่าการหยุดพักไม่ใช่ความขี้เกียจ แต่คือการดูแลตัวเอง`,
  },

  matcha: {
    name: "The Self-Growth Celebration",
    thai: "เค้กรสมัตฉะ",
    role: "ผู้กล้าเป็นตัวเอง",
    tagline: "โดดเด่น กล้าแตกต่าง ไม่ต้องการการยืนยันจากใคร",
    body: `คุณเป็นผู้ที่มีความเป็นตัวของตัวเองสูง เชื่อมั่นและยึดถือในตนเอง แต่นั่นทำให้คุณโดดเด่นและเป็นที่ชื่นชอบของคนหลายคน เปรียบดั่งมัตฉะที่มีรสขมแต่กลมกล่อม พร้อมจับใจผู้คนที่ได้ลิ้มลอง

ในมุมกลับกัน ความโดดเด่นเหล่านั้น อาจทำให้คุณรู้สึกโดดเดี่ยว หรือแปลกแยกจากสังคม

ขอเป็นหนึ่งแรงใจที่สนับสนุนให้คุณกล้าที่จะแตกต่างและเป็นตัวของตัวเองได้โดยไม่ต้องกลัวสายตาใคร เพราะคุณมีคนเดียวในโลก และความเป็นตัวเองเหล่านั้น มันมีค่าที่สุดเลยนะ :)

คุณไม่ได้เฉลิมฉลองแค่ความสำเร็จ แต่เฉลิมฉลองการเติบโตของตัวเองในทุกวัน`,
  },

  chocolate: {
    name: "The Achievement Celebration",
    thai: "เค้กช็อคโกแลต",
    role: "ผู้ซ่อนความอบอุ่น",
    tagline: "สุขุม ลุ่มลึก ความหวานที่รอให้ค้นพบ",
    body: `คุณเป็นผู้ที่มีความสุขุมนุ่มลึก เป็นคนที่ไม่ค่อยแสดงออก แต่ซ่อนความหวานและอบอุ่นไว้ภายใน เปรียบดั่งช็อคโกแลตที่มีทั้งรสหวานและขม ภายใต้สีน้ำตาลเข้มทะมึน

แต่ผู้คนมักมองกันที่ผิวเผิน หลายครั้งที่คุณถูกตีตราผิดไปจากสังคมรอบข้าง กลายเป็นคนเย็นชาและไม่สนใจผู้อื่นในสายตารอบข้าง

ขอเป็นหนึ่งในผู้ที่มองเห็นความอบอุ่นภายในนั้น แก่นแท้ของรสชาติอันงดงามของคุณ คุณเองก็มีอารมณ์อ่อนไหวและเห็นอกเห็นใจผู้อื่นไม่ต่างจากใคร ๆ สิ่งเหล่านั้นมันมีค่าเกินกว่าจะถูกมองข้ามไปนะ :)

คุณไม่รอให้ถึงวันสำเร็จครั้งใหญ่ แต่เลือกชื่นชมทุกก้าวที่พาตัวเองมาไกลถึงวันนี้`,
  },

  strawberry: {
    name: "The Shared Celebration",
    thai: "เค้กสตรอว์เบอร์รี่",
    role: "ผู้ส่งต่อรอยยิ้ม",
    tagline: "สดใส ร่าเริง สร้างรอยยิ้มให้คนรอบข้าง",
    body: `คุณเป็นผู้ที่มีความสดใส ร่าเริง สามารถสร้างเสียงหัวเราะและรอยยิ้มให้คนรอบข้างได้เสมอ เปรียบดั่งรสสตรอว์เบอร์รี่ ที่หวานอมเปรี้ยวจับใจคนทุกคน

แต่ในอีกแง่หนึ่ง คุณมักไม่แสดงออกอารมณ์ทางลบให้คนอื่นเห็น คุณมักจะเก็บความเศร้าไว้คนเดียว

ขอเป็นผู้ที่จะช่วยโอบรับความเศร้าของคุณไว้ และอยากให้คุณระบายมันออกมาบ้าง คุณน่ะ เก่งมาก ๆ เลย ที่ทำให้ทุกคนมีความสุขได้ แต่คุณเองก็อย่าละเลยความสุขของตัวเองเช่นกันนะ :)

คุณมีความสุขที่สุดเมื่อได้แบ่งปันโมเมนต์ดี ๆ กับคนที่รัก เพราะความสุขจะยิ่งใหญ่ขึ้นเมื่อมีคนร่วมยินดี`,
  },

  cookie: {
    name: "The Memory Celebration",
    thai: "เค้กรสคุกกี้แอนครีม",
    role: "ผู้รักษาความทรงจำ",
    tagline: "เห็นคุณค่าในทุกช่วงเวลา ทั้งเล็กและใหญ่",
    body: `คุณเป็นผู้ที่ให้คุณค่ากับทุกช่วงเวลาที่ผ่านมา ทั้งเล็กและใหญ่ คุณเชื่อว่าความทรงจำที่ดีคือสิ่งที่มีค่าที่สุดในชีวิต เปรียบดั่งคุกกี้แอนครีมที่ผสมผสานระหว่างรสเข้มและรสหวาน ความเก่าและความใหม่ไว้อย่างลงตัวในชิ้นเดียวกัน

แต่บางครั้ง การยึดติดกับความทรงจำอาจทำให้คุณพลาดสิ่งที่ดีงามที่รอคุณอยู่ข้างหน้า

ขอเป็นหนึ่งในผู้ที่ชวนให้คุณสร้างความทรงจำใหม่ ๆ ต่อไปได้เรื่อย ๆ เพราะทุกวันที่ผ่านไปล้วนมีบางอย่างที่ควรค่าแก่การจดจำ และคุณคือคนที่ทำให้วันธรรมดากลายเป็นวันพิเศษได้เสมอ :)

คุณมีความสุขที่สุดเมื่อได้นึกถึงช่วงเวลาดี ๆ และเชื่อว่าทุกวันที่ผ่านมาล้วนมีความหมายในแบบของมันเอง`,
  },
};

// ── Mini cartoon cake SVGs ────────────────────────────────────────────────────
function CakeSVG({ type }: { type: CakeType }) {
  const configs: Record<CakeType, { fill: string; accent: string; top: string }> = {
    vanilla:   { fill: "#FFF4D6", accent: Y,        top: "#FFFDE7" },
    matcha:    { fill: "#1B4332", accent: "#52b788", top: "#2D6A4F" },
    chocolate: { fill: "#3E1F00", accent: "#8B4513", top: "#5C2D0A" },
    strawberry:{ fill: R,         accent: "#FF6B6B", top: "#FF4040" },
    cookie:    { fill: "#5C3D2E", accent: "#D2691E", top: "#3E2000" },
  };
  const c = configs[type];

  return (
    <svg viewBox="0 0 160 180" width="160" height="180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sk-cake" x="-8%" y="-8%" width="116%" height="116%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="11"/>
          <feDisplacementMap in="SourceGraphic" scale="2"/>
        </filter>
      </defs>
      <g filter="url(#sk-cake)" strokeLinecap="round">
        {/* bottom tier */}
        <rect x="10" y="115" width="140" height="52" rx="12" fill={c.fill} stroke={R} strokeWidth="2.5"/>
        {/* frosting drips */}
        <path d="M18 115 Q24 103 30 115 Q36 103 42 115 Q48 103 54 115 Q60 103 66 115 Q72 103 78 115 Q84 103 90 115 Q96 103 102 115 Q108 103 114 115 Q120 103 126 115 Q132 103 138 115 Q143 103 142 115"
          stroke="white" strokeWidth="3" fill="none" opacity="0.7"/>
        {/* dots */}
        {[25,45,65,85,105,125].map((x,i)=>(
          <circle key={i} cx={x} cy={143} r="3.5" fill={c.accent} opacity="0.85"/>
        ))}

        {/* middle tier */}
        <rect x="28" y="70" width="104" height="50" rx="10" fill={c.top} stroke={R} strokeWidth="2.5"/>
        <path d="M34 70 Q40 59 46 70 Q52 59 58 70 Q64 59 70 70 Q76 59 82 70 Q88 59 94 70 Q100 59 106 70 Q112 59 118 70 Q124 59 126 70"
          stroke="white" strokeWidth="2.5" fill="none" opacity="0.7"/>
        {[40,60,80,100,118].map((x,i)=>(
          <circle key={i} cx={x} cy={96} r="3" fill={c.accent} opacity="0.8"/>
        ))}

        {/* top tier */}
        <rect x="46" y="34" width="68" height="40" rx="8" fill={c.fill} stroke={R} strokeWidth="2.5"/>
        <path d="M52 34 Q57 24 62 34 Q67 24 72 34 Q77 24 82 34 Q87 24 92 34 Q97 24 106 34"
          stroke="white" strokeWidth="2" fill="none" opacity="0.7"/>

        {/* whipped cream */}
        <ellipse cx="80" cy="30" rx="24" ry="10" fill="white" opacity="0.9" stroke={R} strokeWidth="1.5"/>
        <path d="M80 16 Q87 22 90 28 Q83 25 80 28 Q77 25 70 28 Q73 22 80 16Z" fill="white" stroke={R} strokeWidth="1.2"/>

        {/* candle */}
        <rect x="75" y="2"  width="10" height="18" rx="4" fill={Y} stroke={R} strokeWidth="1.5"/>
        {/* flame */}
        <path d="M80 0 Q86 -5 84 2 Q80 6 76 2 Q74 -5 80 0Z" fill={Y} stroke={R} strokeWidth="1">
          <animate attributeName="d"
            values="M80 0 Q86 -5 84 2 Q80 6 76 2 Q74 -5 80 0Z;M80 -2 Q88 -7 85 1 Q80 5 75 1 Q72 -7 80 -2Z;M80 0 Q86 -5 84 2 Q80 6 76 2 Q74 -5 80 0Z"
            dur="0.8s" repeatCount="indefinite"/>
        </path>
      </g>
    </svg>
  );
}

// ── Share bar ─────────────────────────────────────────────────────────────────
type CakeInfo = { thai: string; role: string; tagline: string; name: string; body: string };

function generateShareImage(type: CakeType, name: string, cake: CakeInfo): string {
  const canvas  = document.createElement("canvas");
  canvas.width  = 1080;
  canvas.height = 1080;
  const c       = canvas.getContext("2d")!;

  // Background
  c.fillStyle = "#FDF6EC";
  c.fillRect(0, 0, 1080, 1080);

  // Red border
  c.strokeStyle = R; c.lineWidth = 20;
  c.strokeRect(30, 30, 1020, 1020);

  // Yellow accent strip
  c.fillStyle = Y;
  c.fillRect(30, 30, 1020, 14);

  // Brand top
  c.fillStyle = K; c.font = "bold 36px sans-serif";
  c.textAlign = "center";
  c.fillText("🎂 CrackTheCake", 540, 120);

  // Name greeting
  c.fillStyle = "rgba(26,26,26,0.55)";
  c.font = "40px sans-serif";
  c.fillText(`${name} คุณคือ …`, 540, 220);

  // Cake Thai name — big
  c.fillStyle = R;
  c.font = "bold 88px sans-serif";
  c.fillText(cake.thai, 540, 340);

  // English name
  c.fillStyle = "rgba(26,26,26,0.5)";
  c.font = "italic 42px sans-serif";
  c.fillText(cake.name, 540, 410);

  // Role badge
  c.fillStyle = R; c.font = "bold 52px sans-serif";
  c.fillText(cake.role, 540, 500);

  // Divider
  c.strokeStyle = `rgba(198,40,40,0.3)`; c.lineWidth = 3;
  c.beginPath(); c.moveTo(180, 540); c.lineTo(900, 540); c.stroke();

  // Tagline
  c.fillStyle = K; c.font = "36px sans-serif";
  c.fillText(cake.tagline, 540, 610);

  // Body excerpt (first 2 non-empty lines)
  const lines = cake.body.split("\n").filter(l => l.trim()).slice(0, 2);
  c.fillStyle = "rgba(26,26,26,0.75)"; c.font = "30px sans-serif";
  lines.forEach((line, i) => {
    // Wrap long lines
    const maxW = 880;
    if (c.measureText(line).width > maxW) {
      const mid = Math.floor(line.length / 2);
      c.fillText(line.slice(0, mid), 540, 680 + i * 70);
      c.fillText(line.slice(mid), 540, 680 + i * 70 + 38);
    } else {
      c.fillText(line, 540, 680 + i * 70);
    }
  });

  // URL / CTA
  c.fillStyle = Y; c.font = "bold 40px sans-serif";
  c.fillText("ลองทำแบบทดสอบของตัวเอง!", 540, 900);
  c.fillStyle = "rgba(26,26,26,0.4)"; c.font = "28px sans-serif";
  c.fillText("crackthecake.vercel.app", 540, 955);

  // Bottom yellow strip
  c.fillStyle = Y;
  c.fillRect(30, 1036, 1020, 14);

  return canvas.toDataURL("image/png");
}

function ShareBar({ type, name, cake }: { type: CakeType; name: string; cake: CakeInfo }) {
  const [toast, setToast] = useState("");

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  const shareText = `${name} คือ ${cake.thai} — ${cake.role} 🎂\nค้นพบตัวตนของคุณกับ CrackTheCake!`;
  const shareUrl  = typeof window !== "undefined"
    ? window.location.origin + "/quiz"
    : "https://crackthecake.vercel.app/quiz";

  const saveImage = () => {
    const dataUrl = generateShareImage(type, name, cake);
    const a = document.createElement("a");
    a.href     = dataUrl;
    a.download = `crackthecake-${type}.png`;
    a.click();
    showToast("💾 บันทึกรูปแล้ว!");
  };

  const shareNative = async () => {
    const dataUrl = generateShareImage(type, name, cake);
    const res     = await fetch(dataUrl);
    const blob    = await res.blob();
    const file    = new File([blob], "crackthecake.png", { type: "image/png" });
    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try { await navigator.share({ files: [file], title: "CrackTheCake", text: shareText }); }
      catch {}
    } else if (navigator.share) {
      try { await navigator.share({ title: "CrackTheCake", text: shareText, url: shareUrl }); }
      catch {}
    } else {
      await navigator.clipboard.writeText(shareText + "\n" + shareUrl);
      showToast("📋 คัดลอกลิงก์แล้ว!");
    }
  };

  const openX    = () => window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  const openLINE = () => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, "_blank");

  const instagramSave = () => {
    saveImage();
    showToast("📸 บันทึกรูปแล้ว — เปิด Instagram แล้วเลือกรูปได้เลย");
  };

  const tiktokSave = () => {
    saveImage();
    showToast("🎵 บันทึกรูปแล้ว — เปิด TikTok แล้วเลือกรูปได้เลย");
  };

  const btnStyle: React.CSSProperties = {
    width: "48px", height: "48px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", border: "none", transition: "transform 0.15s, opacity 0.15s",
    flexShrink: 0,
  };

  return (
    <div className="w-full max-w-sm mt-7 animate-slide-up" style={{ animationDelay: "450ms" }}>
      <p className="text-center text-xs mb-3 story-text" style={{ color: "rgba(26,26,26,0.45)" }}>
        แชร์ผลลัพธ์ของคุณ
      </p>

      {/* Share row */}
      <div className="flex items-center justify-center gap-3 flex-wrap">

        {/* Save to gallery */}
        <button onClick={saveImage} title="บันทึกรูป" style={{ ...btnStyle, background: K, color: "#fff" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </button>

        {/* X / Twitter */}
        <button onClick={openX} title="แชร์ไป X" style={{ ...btnStyle, background: "#000", color: "#fff" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </button>

        {/* LINE */}
        <button onClick={openLINE} title="แชร์ไป LINE" style={{ ...btnStyle, background: "#06C755", color: "#fff" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.365 9.863c.349 0 .63.285.63.63 0 .344-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.971C23.176 14.393 24 12.458 24 10.314"/>
          </svg>
        </button>

        {/* Instagram */}
        <button onClick={instagramSave} title="แชร์ไป Instagram"
          style={{ ...btnStyle,
            background: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
            color: "#fff" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
          </svg>
        </button>

        {/* TikTok */}
        <button onClick={tiktokSave} title="แชร์ไป TikTok"
          style={{ ...btnStyle, background: "#010101", color: "#fff" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.88a8.27 8.27 0 0 0 4.83 1.54V7a4.85 4.85 0 0 1-1.06-.31z"/>
          </svg>
        </button>

        {/* Native share (mobile) */}
        {typeof navigator !== "undefined" && !!navigator.share && (
          <button onClick={shareNative} title="แชร์"
            style={{ ...btnStyle, background: R, color: "#fff" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
          </button>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="mt-4 text-center text-sm px-4 py-2 rounded-full mx-auto"
          style={{ background: K, color: "#fff", fontFamily: "'Sarabun',sans-serif",
                   width: "fit-content", animation: "fadeIn 0.2s ease" }}>
          {toast}
        </div>
      )}
    </div>
  );
}

// ── Result card ───────────────────────────────────────────────────────────────
function ResultCard({ type, name }: { type: CakeType; name: string }) {
  const router = useRouter();
  const cake   = CAKES[type];

  return (
    <div className="min-h-screen paper-bg flex flex-col items-center justify-start py-10 px-5">
      {/* Header */}
      <div className="flex items-center justify-start w-full max-w-sm mb-8">
        <button onClick={() => router.push("/")}
          className="flex items-center gap-1.5 text-sm font-bold"
          style={{ color: R }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4 L6 9 L11 14" stroke={R} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          กลับหน้าหลัก
        </button>
      </div>

      {/* Greeting */}
      <p className="story-text text-base mb-2 animate-slide-up" style={{ color: K, opacity: 0.7 }}>
        {name} คุณคือ …
      </p>

      {/* Cake name */}
      <h1 className="text-3xl font-black text-center mb-1 animate-slide-up delay-100"
        style={{ fontFamily: "'Fredoka One', cursive", color: R }}>
        {cake.thai}
      </h1>
      <p className="text-sm font-bold text-center mb-1 animate-slide-up delay-200"
        style={{ color: K, opacity: 0.55, fontFamily: "'Sarabun', sans-serif" }}>
        {cake.name}
      </p>
      <p className="text-sm font-bold text-center mb-6 animate-slide-up delay-200"
        style={{ color: R, fontFamily: "'Sarabun', sans-serif" }}>
        {cake.role}
      </p>

      {/* Cake illustration */}
      <div className="animate-float mb-4">
        <CakeSVG type={type}/>
      </div>

      {/* Tagline badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 animate-slide-up delay-300"
        style={{ background: `rgba(198,40,40,0.08)`, border: `1.5px solid ${R}` }}>
        <span style={{ color: R, fontFamily: "'Sarabun',sans-serif", fontSize: "0.82rem", fontWeight: 600 }}>
          {cake.tagline}
        </span>
      </div>

      {/* Sketch box body text */}
      <div className="w-full max-w-sm animate-slide-up delay-400">
        <div className="relative rounded-2xl p-6"
          style={{ background: "white", border: `2.5px solid rgba(198,40,40,0.3)`,
                   boxShadow: "0 8px 32px rgba(198,40,40,0.1)" }}>
          {/* Red top stripe */}
          <div className="absolute top-0 left-6 right-6 h-0.5 rounded-full"
            style={{ background: `linear-gradient(90deg,${R},${Y})` }}/>
          {cake.body.split("\n").map((line, i) => (
            line === "" ? <br key={i}/> :
            <p key={i} className="story-text text-sm leading-relaxed mb-0"
              style={{ color: "#2a2a2a" }}>
              {line}
            </p>
          ))}
        </div>
      </div>

      {/* Share bar */}
      <ShareBar type={type} name={name} cake={cake}/>

      {/* Retry */}
      <div className="mt-6 mb-4 animate-slide-up delay-500">
        <button onClick={() => router.push("/quiz")} className="ink-btn px-8 py-3 text-base">
          ลองอีกครั้ง
        </button>
      </div>

      {/* Cake type indicator dots */}
      <div className="flex gap-3 mt-4 mb-8 animate-slide-up delay-500">
        {(Object.keys(CAKES) as CakeType[]).map(k => (
          <div key={k} className="w-3 h-3 rounded-full transition-all duration-300"
            style={{ background: k === type ? R : "rgba(198,40,40,0.2)",
                     transform: k === type ? "scale(1.4)" : "scale(1)" }}/>
        ))}
      </div>
    </div>
  );
}

// ── Page root ─────────────────────────────────────────────────────────────────
function ResultInner() {
  const router = useRouter();
  const params = useSearchParams();
  const type   = (params.get("type") ?? "vanilla") as CakeType;
  const name   = params.get("name") ?? "เพื่อน";

  if (!CAKES[type]) {
    return (
      <div className="min-h-screen paper-bg flex items-center justify-center">
        <div className="text-center p-8">
          <p className="story-text text-lg" style={{ color: R }}>ไม่พบผลลัพธ์</p>
          <button onClick={() => router.push("/quiz")} className="ink-btn mt-6">เริ่มใหม่</button>
        </div>
      </div>
    );
  }

  return <ResultCard type={type} name={name}/>;
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen paper-bg flex items-center justify-center">
        <p className="story-text" style={{ color: R }}>กำลังโหลด …</p>
      </div>
    }>
      <ResultInner/>
    </Suspense>
  );
}
