export type CakeType =
  | 'vanilla' | 'matcha' | 'darkchoc' | 'strawberry' | 'blueberry'
  | 'honey' | 'lemon' | 'mocha' | 'blackforest' | 'mango';

export type Choice = { text: string; cake: CakeType };

export type Beat =
  | { type: 'warning' }
  | { type: 'name' }
  | { type: 'scene'; lines: string[]; scene: number }
  | { type: 'question'; id: number; text: string; choices: Choice[] }
  | { type: 'ending' };

export const BEATS: Beat[] = [
  { type: 'warning' },
  { type: 'name' },

  // ── Intro scene ──
  {
    type: 'scene', scene: 0,
    lines: [
      'เย็นวันศุกร์วันหนึ่ง',
      'ในเมืองที่วุ่นวายและเหนื่อยล้า',
      'หลังจากที่คุณใช้เวลาอันยาวนานบนท้องถนน',
      'และฝ่าเสียงของสังคมเมืองเพื่อกลับมาพักผ่อน',
      'ฝนพายุที่กระหน่ำ จนอากาศเย็นชื้น...',
    ],
  },

  // ── Scene 1 ──
  {
    type: 'scene', scene: 1,
    lines: ['คุณนั่งอยู่ในที่ที่พักผ่อนที่คุณสบายใจที่สุด', 'ที่ ๆ นั้นคือ …'],
  },
  {
    type: 'question', id: 1,
    text: 'ที่ที่คุณสบายใจที่สุดคือ …',
    choices: [
      { text: 'บนเตียงนุ่ม ๆ ล้อมไปด้วยหมอน ผ้าห่ม และตุ๊กตาสุดที่รักของคุณ', cake: 'vanilla' },
      { text: 'ห้องหนังสือไม้สีน้ำตาลเก่า พร้อมด้วยเครื่องดื่มอุ่น ๆ หนึ่งแก้ว', cake: 'blackforest' },
      { text: 'โต๊ะหนังสือที่มีของวางกระจัดกระจาย ประดับด้วยรูปถ่ายของคนที่คุณรักในทุกเทศกาล', cake: 'honey' },
      { text: 'ห้องครัว ที่ห้อมล้อมไปด้วยเค้กขนมทานเล่นแสนอร่อยที่คุณชื่นชอบ', cake: 'mango' },
    ],
  },

  // ── Scene 2 ──
  {
    type: 'scene', scene: 2,
    lines: [
      'ความเหนื่อยล้าที่สะสมมาทั้งวัน',
      'กับบรรยากาศที่คุ้นเคยทำให้คุณเผลอหลับไป',
      '',
      'กระพริบ  กระพริบ',
      'ภาพข้างหน้าพร่ามัวเพราะแสงไฟสว่างจ้า',
      '',
      'คุณค่อย ๆ ลืมตาขึ้นช้า ๆ …',
      'คุณเห็นใครบางคน หน้าตาที่คุ้นเคย',
      'คล้ายกับเงาสะท้อนในกระจกที่เห็นอยู่ทุกวัน',
      'เพียงแต่รูปลักษณ์นั่นเหมือนจะผ่านมานานแล้ว',
      '',
      'นั่นคือคุณ ตอนอายุสิบขวบ',
    ],
  },
  {
    type: 'question', id: 2,
    text: 'ในตอนนั้น คุณกำลังอยู่ที่ …',
    choices: [
      { text: 'สนามเด็กเล่น', cake: 'strawberry' },
      { text: 'ห้องโถงกลางบ้าน', cake: 'vanilla' },
      { text: 'หน้าร้านเบเกอรี่', cake: 'mango' },
      { text: 'สนามฟุตบอล', cake: 'lemon' },
      { text: 'หน้าร้านของเล่น', cake: 'blueberry' },
    ],
  },

  // ── Scene 3 ──
  {
    type: 'scene', scene: 3,
    lines: [
      'หลังจากพบตัวเองวัย 10 ขวบ',
      'เด็กคนนั้นหันมายิ้ม',
      '',
      '"โตขึ้นแล้วเหนื่อยไหม"',
      '',
      'ก่อนที่คุณจะตอบ',
      'เขาก็วิ่งนำไปตามทางเดินแห่งความทรงจำ',
      'ระหว่างทางมีประตูหลายบาน',
    ],
  },
  {
    type: 'question', id: 3,
    text: '"ถ้าเลือกได้หนึ่งอย่าง" คุณอยากให้คนจดจำคุณในฐานะ ...',
    choices: [
      { text: 'คนที่ทำให้คนอื่นสบายใจ', cake: 'vanilla' },
      { text: 'คนที่มีความสามารถ', cake: 'mocha' },
      { text: 'คนที่สร้างแรงบันดาลใจ', cake: 'lemon' },
      { text: 'คนที่จริงใจเสมอ', cake: 'matcha' },
    ],
  },

  // ── Scene 4 ──
  {
    type: 'scene', scene: 4,
    lines: [
      'เด็กคนนั้นหยุดอยู่หน้ากล่องดนตรีเก่า',
      'เมื่อเปิดออก',
      'เสียงเพลงในวัยเด็กดังขึ้น',
      'คุณจำได้ทันทีว่ามันคือเพลงที่เคยฟังตอนมีความสุขที่สุด',
    ],
  },
  {
    type: 'question', id: 4,
    text: 'เวลามีเรื่องไม่สบายใจ คุณมักจะ ...',
    choices: [
      { text: 'คุยกับคนสนิท', cake: 'strawberry' },
      { text: 'เก็บไว้คิดคนเดียว', cake: 'darkchoc' },
      { text: 'หาอะไรทำให้ลืม', cake: 'mango' },
      { text: 'เขียนหรือระบายออกทางอื่น', cake: 'blueberry' },
    ],
  },

  // ── Scene 5 ──
  {
    type: 'scene', scene: 5,
    lines: [
      'ฝนเริ่มตก',
      'คุณกับเด็กคนนั้นวิ่งเข้าไปหลบในร้านเบเกอรี่เล็ก ๆ',
      'กลิ่นขนมอบหอมฟุ้งไปทั่วร้าน',
      'เจ้าของร้านยื่นเค้กมาให้ชิม',
    ],
  },
  {
    type: 'question', id: 5,
    text: 'คุณเลือกชิ้นที่ ...',
    choices: [
      { text: 'หน้าตาสวยที่สุด', cake: 'blackforest' },
      { text: 'กลิ่นหอมที่สุด', cake: 'vanilla' },
      { text: 'รสชาติแปลกใหม่ที่สุด', cake: 'matcha' },
      { text: 'เมนูที่ทุกคนชอบ', cake: 'strawberry' },
    ],
  },
  {
    type: 'question', id: 6,
    text: 'ถ้ามีเวลาว่างหนึ่งวันเต็ม คุณจะ ...',
    choices: [
      { text: 'ออกไปพบผู้คน', cake: 'strawberry' },
      { text: 'อยู่บ้านพักผ่อน', cake: 'darkchoc' },
      { text: 'เรียนรู้อะไรใหม่ ๆ', cake: 'blueberry' },
      { text: 'ทำกิจกรรมกับคนสำคัญ', cake: 'honey' },
    ],
  },

  // ── Scene 6 ──
  {
    type: 'scene', scene: 6,
    lines: [
      'ร้านเบเกอรี่หายไป',
      'กลายเป็นทางเดินที่เต็มไปด้วยรูปถ่าย',
      'ทุกภาพคือช่วงเวลาสำคัญในชีวิต',
    ],
  },
  {
    type: 'question', id: 7,
    text: 'รูปไหนดึงดูดสายตาคุณที่สุด',
    choices: [
      { text: 'วันที่ประสบความสำเร็จ', cake: 'mocha' },
      { text: 'วันที่มีคนอยู่ข้าง ๆ', cake: 'honey' },
      { text: 'วันที่ได้ลองอะไรใหม่', cake: 'lemon' },
      { text: 'วันที่มีความสุขธรรมดา ๆ', cake: 'vanilla' },
    ],
  },
  {
    type: 'question', id: 8,
    text: 'เมื่อเกิดปัญหา คุณมัก ...',
    choices: [
      { text: 'ลงมือแก้ทันที', cake: 'lemon' },
      { text: 'วิเคราะห์ก่อน', cake: 'matcha' },
      { text: 'ขอความคิดเห็นคนอื่น', cake: 'honey' },
      { text: 'รอดูสถานการณ์', cake: 'blueberry' },
    ],
  },

  // ── Scene 7 ──
  {
    type: 'scene', scene: 7,
    lines: [
      'เด็กวัย 10 ขวบพาคุณไปถึงประตูสุดท้าย',
      'ก่อนเปิดประตู',
      'เขาถาม ...',
    ],
  },
  {
    type: 'question', id: 9,
    text: 'สิ่งที่คุณกลัวมากที่สุดคือ',
    choices: [
      { text: 'ถูกปฏิเสธ', cake: 'vanilla' },
      { text: 'ล้มเหลว', cake: 'mocha' },
      { text: 'สูญเสียคนสำคัญ', cake: 'honey' },
      { text: 'ใช้ชีวิตโดยไม่มีความหมาย', cake: 'blueberry' },
    ],
  },
  {
    type: 'question', id: 10,
    text: 'คุณรู้สึกภูมิใจในตัวเองตอนที่ ...',
    choices: [
      { text: 'ช่วยใครสักคนได้', cake: 'honey' },
      { text: 'ทำเป้าหมายสำเร็จ', cake: 'mocha' },
      { text: 'ได้เป็นตัวของตัวเอง', cake: 'matcha' },
      { text: 'เห็นคนรอบตัวมีความสุข', cake: 'strawberry' },
    ],
  },
  {
    type: 'question', id: 11,
    text: 'คุณคิดว่าความสุขคือ',
    choices: [
      { text: 'ความสงบ', cake: 'darkchoc' },
      { text: 'ความสำเร็จ', cake: 'mocha' },
      { text: 'อิสรภาพ', cake: 'lemon' },
      { text: 'การมีคนรักอยู่ข้าง ๆ', cake: 'honey' },
    ],
  },
  {
    type: 'question', id: 12,
    text: 'หากย้อนเวลากลับไปเจอตัวเองในวัยเด็ก คุณอยากบอกอะไร',
    choices: [
      { text: 'อย่ากังวลมากเกินไป', cake: 'vanilla' },
      { text: 'นายเก่งกว่าที่คิด', cake: 'mocha' },
      { text: 'อย่าหยุดฝัน', cake: 'blueberry' },
      { text: 'ขอบคุณที่พยายามมาตลอด', cake: 'honey' },
    ],
  },
  {
    type: 'question', id: 13,
    text: '"ตอนนี้ ... นายยังเป็นคนเดิมอยู่ไหม"',
    choices: [
      { text: 'ใช่ ฉันยังเป็นเหมือนเดิม', cake: 'matcha' },
      { text: 'เปลี่ยนไปบ้าง', cake: 'blackforest' },
      { text: 'เปลี่ยนไปมาก', cake: 'mango' },
      { text: 'ฉันเองก็ไม่รู้แล้ว', cake: 'blueberry' },
    ],
  },

  { type: 'ending' },
];

// ── Scoring ──
export function calcResult(answers: Record<number, CakeType>): CakeType {
  const scores: Record<CakeType, number> = {
    vanilla: 0, matcha: 0, darkchoc: 0, strawberry: 0, blueberry: 0,
    honey: 0, lemon: 0, mocha: 0, blackforest: 0, mango: 0,
  };
  Object.values(answers).forEach((c) => { scores[c]++; });
  return (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0]) as CakeType;
}
