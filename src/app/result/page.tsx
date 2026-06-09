"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect } from "react";
import type { CakeType } from "../quiz/data";

const R = "#C62828";
const Y = "#FBC02D";
const K = "#1a1a1a";

// ── Personality data ──────────────────────────────────────────────────────────
const CAKES: Record<CakeType, {
  name: string; thai: string; role: string; tagline: string; body: string;
}> = {
  vanilla: {
    name: "The Memory Celebration",
    thai: "เค้กรสวนิลา",
    role: "ผู้เห็นคุณค่าของช่วงเวลาเล็ก ๆ",
    tagline: "เชื่อว่าความทรงจำที่ดีควรได้รับการเฉลิมฉลองเสมอ",
    body: `คุณเป็นผู้ที่มีจิตใจบริสุทธิ์และหวังดีกับผู้อื่นเสมอ จึงให้ความสำคัญกับทุกความสัมพันธ์ เข้ากับใครก็ได้ เปรียบดั่งรสวนิลาที่เข้าได้ละมุนนุ่มกับหลากรสชาติ

แต่ในหลายครั้ง คุณอาจถูกสังคมลบลืมไป หรือมองข้ามความสำคัญ เพียงเพราะคุณเข้ากับใครก็ได้

ขอเป็นหนึ่งในคนที่มองเห็นคุณคนเก่งคนนี้ ที่กำลังพยายามกับทุกความสัมพันธ์ และไม่อยากให้ถูกลืมเลือนไปจากความทรงจำของใครเลย เพราะคุณคนเก่งคนนี้ที่หวังดีกับผู้อื่นมาเสมอ เราก็หวังดีกับคุณเสมอเช่นกันนะ :)`,
  },
  matcha: {
    name: "The Self-Growth Celebration",
    thai: "เค้กรสมัตฉะ",
    role: "ผู้รักในตัวตนและพัฒนาตนเองอยู่เสมอ",
    tagline: "ชื่นชมทุกก้าวที่พาตัวเองมาไกลถึงวันนี้",
    body: `คุณเป็นผู้ที่มีความเป็นตัวของตัวเองสูง เชื่อมั่นและยึดถือในตนเอง แต่นั่นทำให้คุณโดดเด่นและเป็นที่ชื่นชอบของคนหลายคน เปรียบดั่งมัตฉะที่มีรสขมแต่กลมกล่อม พร้อมจับใจผู้คนที่ได้ลิ้มลอง

ในมุมกลับกัน ความโดดเด่นเหล่านั้น อาจทำให้คุณรู้สึกโดดเดี่ยว หรือแปลกแยกจากสังคม

ขอเป็นหนึ่งแรงใจที่สนับสนุนให้คุณกล้าที่จะแตกต่างและเป็นตัวของตัวเองได้โดยไม่ต้องกลัวสายตาใคร เพราะคุณมีคนเดียวในโลก และความเป็นตัวเองเหล่านั้น มันมีค่าที่สุดเลยนะ :)`,
  },
  chocolate: {
    name: "The Quiet Celebration",
    thai: "เค้กช็อคโกแลต",
    role: "ผู้ยินดีกับความสำเร็จของคนที่รักอย่างเงียบ ๆ",
    tagline: "ด้วยความอบอุ่นลึกซึ้งจากข้างใน",
    body: `เป็นผู้ที่มีความสุขุมนุ่มลึก เป็นคนที่ไม่ค่อยแสดงออก แต่ซ่อนความหวานและอบอุ่นไว้ภายใน ที่ยากเกินกว่าจะถอนตัวเมื่อได้ลิ้มลอง เปรียบดั่งช็อคโกแลตที่มีทั้งรสหวานและขม ภายใต้สีน้ำตาลเข้มทะมึน

แต่ผู้คนมักมองกันที่ผิวเผิน หลายครั้งที่คุณถูกตีตราผิดไปจากสังคมรอบข้าง ถูกมองแต่เพียงสิ่งที่ประดับอยู่ที่ภายนอก กลายเป็นคนเย็นชาและไม่สนใจผู้อื่นในสายตารอบข้าง

ขอเป็นหนึ่งในผู้ที่มองเห็นความอบอุ่นภายในนั้น แก่นแท้ของรสชาติอันงดงามของคุณ คุณเองก็มีอารมณ์อ่อนไหวและเห็นอกเห็นใจผู้อื่นไม่ต่างจากใคร ๆ สิ่งเหล่านั้นมันมีค่าเกินกว่าจะถูกมองข้ามไปนะ :)`,
  },
  strawberry: {
    name: "The Shared Celebration",
    thai: "เค้กสตรอว์เบอร์รี่",
    role: "ผู้มีความสุขที่สุดเมื่อได้แบ่งปันกับคนที่รัก",
    tagline: "เพราะความสุขจะยิ่งใหญ่ขึ้นเมื่อมีคนร่วมยินดี",
    body: `เป็นผู้ที่มีความสดใส ร่าเริง สามารถสร้างเสียงหัวเราะและรอยยิ้มให้คนรอบข้างได้เสมอ คอยสนับสนุนและให้กำลังใจคนใกล้ตัว เปรียบดั่งรสสตรอว์เบอร์รี่ ที่หวานอมเปรี้ยวจับใจคนทุกคน

แต่ในอีกแง่หนึ่ง คุณไม่ค่อยแสดงออกอารมณ์ทางลบให้คนอื่นเห็นมากนัก คุณมักจะเก็บความเศร้าไว้คนเดียว

ขอเป็นผู้ที่จะช่วยโอบรับความเศร้าของคุณไว้ และอยากให้คุณระบายมันออกมาบ้าง คุณน่ะ เก่งมาก ๆ เลย ที่ทำให้ทุกคนมีความสุขได้ แต่คุณเองก็อย่าละเลยความสุขของตัวเองเช่นกันนะ :)`,
  },
  cookie: {
    name: "The Comfort Celebration",
    thai: "เค้กรสคุกกี้แอนครีม",
    role: "ผู้เชื่อว่าการพักผ่อนควรค่าแก่การเฉลิมฉลอง",
    tagline: "การหยุดพักไม่ใช่ความขี้เกียจ แต่คือการดูแลตัวเอง",
    body: `เป็นผู้ที่ให้ความสำคัญกับเวลาในชีวิต คุณตั้งเป้าหมายและมองความสำเร็จไว้อย่างแน่วแน่ และผ่านประสบการณ์หลายอย่างมามากมายในชีวิต เปรียบดั่งรสคุกกี้แอนด์ครีมที่ผสมผสานสองรสชาติที่แตกต่างออกมาหวานละมุน

เพียงแต่คุณอาจทำใครบางคนหล่นหายในระหว่างทางที่ฝ่าฟันอุปสรรค และทำให้คุณรู้สึกโดดเดี่ยว

ขอเป็นหนึ่งคนที่พร้อมจะเคียงข้างคุณในทุก ๆ สถานการณ์ ให้คุณได้มีความสุขกับเวลาพักผ่อนของตัวเอง ไปพร้อมกับคนรอบข้างที่พร้อมจะเคียงข้างคุณนะ :)`,
  },
};

// ── Cake images (pre-cropped PNGs in /public) ────────────────────────────────
function CakeSVG({ type }: { type: CakeType }) {
  const src: Record<CakeType, string> = {
    vanilla:    "/vanila.png",
    matcha:     "/matcha.png",
    chocolate:  "/chocolate.png",
    strawberry: "/strawberry.png",
    cookie:     "/cookie_and_cream.png",
  };

  return (
    <img
      src={src[type]}
      alt={type}
      style={{ width: 288, height: 288, objectFit: "contain" }}
    />
  );
}

// ── Share bar ─────────────────────────────────────────────────────────────────
type CakeInfo = { thai: string; role: string; tagline: string; name: string; body: string };

const CAKE_SRC: Record<CakeType, string> = {
  vanilla:    "/vanila.png",
  matcha:     "/matcha.png",
  chocolate:  "/chocolate.png",
  strawberry: "/strawberry.png",
  cookie:     "/cookie_and_cream.png",
};

async function generateShareImage(type: CakeType, name: string, cake: CakeInfo): Promise<string> {
  const W = 1080, H = 1920;
  const canvas = document.createElement("canvas");
  canvas.width  = W;
  canvas.height = H;
  const c = canvas.getContext("2d")!;

  const loadImg = (src: string) => new Promise<HTMLImageElement>((res, rej) => {
    const img = new Image();
    img.onload  = () => res(img);
    img.onerror = rej;
    img.src = src;
  });

  const cakeImg = await loadImg(CAKE_SRC[type]);

  // Force browser to actually download & parse the font by using it in DOM
  const _probe = document.createElement('span');
  _probe.style.cssText = "font-family:'Playpen Sans Thai','Playpen Sans';position:absolute;visibility:hidden;font-size:40px";
  _probe.textContent = 'ทดสอบ Test';
  document.body.appendChild(_probe);
  await document.fonts.load("bold 40px 'Playpen Sans Thai'");
  await document.fonts.load("400 40px 'Playpen Sans Thai'");
  await document.fonts.load("bold 40px 'Playpen Sans'");
  await document.fonts.load("400 40px 'Playpen Sans'");
  await document.fonts.ready;
  document.body.removeChild(_probe);

  const FONT_HEAD = `'Playpen Sans Thai', 'Playpen Sans', 'Sarabun', cursive`;
  const FONT_BODY = `'Playpen Sans Thai', 'Playpen Sans', 'Sarabun', sans-serif`;

  // helper: wrap text by spaces (Thai uses spaces between phrases), returns final y
  const wrapText = (text: string, maxW: number, startY: number, lineH: number): number => {
    const words = text.split(" ");
    let line = "", y = startY;
    for (const word of words) {
      const test = line ? line + " " + word : word;
      if (c.measureText(test).width > maxW && line) {
        c.fillText(line, W / 2, y);
        line = word; y += lineH;
      } else {
        line = test;
      }
    }
    if (line) c.fillText(line, W / 2, y);
    return y;
  };

  // helper: measure wrapped height without drawing (word-level, matching wrapText)
  const measureWrapped = (text: string, maxW: number, lineH: number): number => {
    const words = text.split(" ");
    let line = "", lines = 1;
    for (const word of words) {
      const test = line ? line + " " + word : word;
      if (c.measureText(test).width > maxW && line) { line = word; lines++; }
      else line = test;
    }
    return lines * lineH;
  };

  // ── Background ───────────────────────────────────────────────────────────────
  const bg = c.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#FFF8EE");
  bg.addColorStop(1, "#F0E6D0");
  c.fillStyle = bg;
  c.fillRect(0, 0, W, H);

  // Subtle polka dots
  c.fillStyle = "rgba(198,40,40,0.035)";
  for (let row = 0; row < 30; row++)
    for (let col = 0; col < 11; col++) {
      c.beginPath();
      c.arc(col * 110 + 55, row * 70 + 35, 5, 0, Math.PI * 2);
      c.fill();
    }

  c.textAlign = "center";



  // ── Name greeting — above photo, big, red ────────────────────────────────────
  c.fillStyle = R;
  c.font = `bold 64px ${FONT_BODY}`;
  c.fillText(`${name} คุณคือ...`, W / 2, 120);

  // ── Cake illustration ─────────────────────────────────────────────────────────
  const imgSize = 480;
  const imgX = (W - imgSize) / 2;
  c.shadowColor   = "rgba(198,40,40,0.13)";
  c.shadowBlur    = 50;
  c.shadowOffsetY = 24;
  c.drawImage(cakeImg, imgX, 160, imgSize, imgSize);
  c.shadowColor = "transparent"; c.shadowBlur = 0; c.shadowOffsetY = 0;

  // ── Thai cake name — MAIN, big ────────────────────────────────────────────────
  // Scale font until it fits within W - 80px
  let thaiSize = 120;
  c.font = `bold ${thaiSize}px ${FONT_BODY}`;
  while (c.measureText(cake.thai).width > W - 80 && thaiSize > 60) {
    thaiSize -= 4;
    c.font = `bold ${thaiSize}px ${FONT_BODY}`;
  }
  c.fillStyle = "#1a1a1a";
  c.fillText(cake.thai, W / 2, 700);

  // ── English name — secondary, smaller ────────────────────────────────────────
  let engSize = 52;
  c.font = `${engSize}px ${FONT_HEAD}`;
  while (c.measureText(cake.name.toUpperCase()).width > W - 80 && engSize > 28) {
    engSize -= 2;
    c.font = `${engSize}px ${FONT_HEAD}`;
  }
  c.fillStyle = "rgba(44,24,16,0.42)";
  c.fillText(cake.name.toUpperCase(), W / 2, 772);

  // ── White card ────────────────────────────────────────────────────────────────
  const CARD_PAD = 70;
  const bx   = 44, bw = W - 88;
  const pad  = bx + CARD_PAD;
  const padW = bw - CARD_PAD * 2;
  const brad = 56;
  const by   = 840;

  // All paragraphs (split by blank line, each joined into one line)
  const allParas = cake.body.split("\n\n").map(p => p.split("\n").filter(l => l.trim()).join(" ")).filter(Boolean);

  // Estimate card height from content
  c.font = `34px ${FONT_BODY}`;
  const bodyH = allParas.reduce((sum, p, i) => sum + measureWrapped(p, padW, 54) + (i < allParas.length - 1 ? 44 : 0), 0);

  c.font = `italic bold 40px ${FONT_BODY}`;
  const taglineH = measureWrapped(cake.tagline, padW - 80, 58);

  const bh = 60 + bodyH + 80 + taglineH + 100; // top-pad + body + gap + tagline + bottom-pad

  const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
    c.beginPath();
    c.moveTo(x + r, y);
    c.lineTo(x + w - r, y);
    c.quadraticCurveTo(x + w, y, x + w, y + r);
    c.lineTo(x + w, y + h - r);
    c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    c.lineTo(x + r, y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - r);
    c.lineTo(x, y + r);
    c.quadraticCurveTo(x, y, x + r, y);
    c.closePath();
  };

  c.shadowColor = "rgba(44,24,16,0.08)"; c.shadowBlur = 40; c.shadowOffsetY = 12;
  roundRect(bx, by, bw, bh, brad);
  c.fillStyle = "rgba(255,255,255,0.96)";
  c.fill();
  c.shadowColor = "transparent"; c.shadowBlur = 0; c.shadowOffsetY = 0;
  c.strokeStyle = "rgba(198,40,40,0.18)"; c.lineWidth = 2.5;
  c.stroke();

  // ── All body paragraphs ───────────────────────────────────────────────────────
  c.fillStyle = "rgba(26,26,26,0.8)";
  c.font = `34px ${FONT_BODY}`;
  let bodyEndY = by + 68;
  allParas.forEach((para, i) => {
    bodyEndY = wrapText(para, padW, bodyEndY, 54);
    if (i < allParas.length - 1) bodyEndY += 44; // paragraph gap
  });

  // ── Divider ───────────────────────────────────────────────────────────────────
  const divY = bodyEndY + 48;
  c.strokeStyle = "rgba(198,40,40,0.18)"; c.lineWidth = 1.5;
  c.beginPath(); c.moveTo(pad, divY); c.lineTo(pad + padW, divY); c.stroke();

  // ── Tagline with opening " left-aligned, closing " after last word ────────────
  const quoteTop = divY + 48;

  // Opening quote mark
  c.fillStyle = `rgba(198,40,40,0.5)`;
  c.font = `bold 64px ${FONT_HEAD}`;
  c.textAlign = "left";
  c.fillText('"', pad - 8, quoteTop + 44);
  c.textAlign = "center";

  // Tagline wrapped
  c.fillStyle = "rgba(44,24,16,0.75)";
  c.font = `italic bold 32px ${FONT_BODY}`;
  const qLines: string[] = [];
  let qCur = "";
  for (const ch of cake.tagline) {
    const test = qCur + ch;
    if (c.measureText(test).width > padW - 80 && qCur) { qLines.push(qCur); qCur = ch; }
    else qCur = test;
  }
  if (qCur) qLines.push(qCur);

  let qY = quoteTop + 18;
  qLines.forEach((ln, i) => {
    const isLast = i === qLines.length - 1;
    if (isLast) {
      // Measure last line + closing quote together
      c.font = `italic bold 32px ${FONT_BODY}`;
      const lineW  = c.measureText(ln).width;
      c.font = `bold 64px ${FONT_HEAD}`;
      const closeW = c.measureText('"').width;
      const total  = lineW + closeW * 0.55;
      const startX = W / 2 - total / 2;
      c.font = `italic bold 32px ${FONT_BODY}`;
      c.textAlign = "left";
      c.fillStyle = "rgba(44,24,16,0.75)";
      c.fillText(ln, startX, qY);
      c.font = `bold 64px ${FONT_HEAD}`;
      c.fillStyle = `rgba(198,40,40,0.5)`;
      c.fillText('"', startX + lineW + 4, qY + 22);
      c.textAlign = "center";
    } else {
      c.font = `italic bold 40px ${FONT_BODY}`;
      c.fillStyle = "rgba(44,24,16,0.75)";
      c.fillText(ln, W / 2, qY);
    }
    qY += 58;
  });

  // ── Site URL at bottom ───────────────────────────────────────────────────────
  c.fillStyle = "rgba(44,24,16,0.35)";
  c.font = `32px ${FONT_HEAD}`;
  c.fillText("crackthecake.vercel.app", W / 2, H - 30);

  // ── Bottom stripes ────────────────────────────────────────────────────────────
  c.fillStyle = Y; c.fillRect(0, H - 14, W, 7);
  c.fillStyle = R; c.fillRect(0, H - 7,  W, 7);

  return canvas.toDataURL("image/png");
}

function ShareBar({ type, name, cake }: { type: CakeType; name: string; cake: CakeInfo }) {
  const [toast, setToast] = useState("");
  const [canShare, setCanShare] = useState(false);
  useEffect(() => { setCanShare(!!navigator.share); }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2800);
  };

  const shareText = `${name} คือ ${cake.thai} — ${cake.role} 🎂\nค้นพบตัวตนของคุณกับ CrackTheCake!`;
  const shareUrl  = typeof window !== "undefined"
    ? window.location.origin + "/quiz"
    : "https://crackthecake.vercel.app/quiz";

  const saveImage = async () => {
    const dataUrl = await generateShareImage(type, name, cake);
    const a = document.createElement("a");
    a.href     = dataUrl;
    a.download = `crackthecake-${type}.png`;
    a.click();
    showToast("💾 บันทึกรูปแล้ว!");
  };

  const shareNative = async () => {
    const dataUrl = await generateShareImage(type, name, cake);
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

  const openX = async () => {
    await saveImage();
    window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
  };
  const openLINE = () => window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, "_blank");

  const instagramSave = async () => {
    await saveImage();
    setTimeout(() => window.open("https://www.instagram.com/", "_blank"), 500);
    showToast("📸 บันทึกรูปแล้ว — กำลังเปิด Instagram");
  };

  const tiktokSave = async () => {
    await saveImage();
    setTimeout(() => window.open("https://www.tiktok.com/upload", "_blank"), 500);
    showToast("🎵 บันทึกรูปแล้ว — กำลังเปิด TikTok");
  };

  const btnStyle: React.CSSProperties = {
    width: "48px", height: "48px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", border: "none", transition: "transform 0.15s, opacity 0.15s",
    flexShrink: 0,
  };

  return (
    <div className="w-full max-w-sm mt-7 animate-slide-up" style={{ animationDelay: "450ms" }}>
      <button
        onClick={saveImage}
        className="w-full flex items-center justify-center gap-3 rounded-full py-3 px-6 font-bold text-base"
        style={{ background: R, color: "#fff", fontFamily: "'Sarabun', sans-serif", border: "none", cursor: "pointer" }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        บันทึกรูปภาพ
      </button>

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
