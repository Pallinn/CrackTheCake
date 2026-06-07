export type CakeType = "vanilla" | "matcha" | "chocolate" | "strawberry" | "cookie";

export type Beat =
  | { kind: "story"; text: string[]; illus: number }
  | { kind: "question"; text: string; illus: number; choices: { text: string; cake: CakeType }[] };

export const BEATS: Beat[] = [
  // 0: city intro (illus 0)
  { kind:"story", illus:0, text:[
    "เย็นวันศุกร์วันหนึ่ง",
    "ในเมืองที่วุ่นวายและเหนื่อยล้า",
    "",
    "หลังจากที่คุณใช้เวลาอันยาวนานบนท้องถนน",
    "ฝ่าเสียงของสังคมเมืองที่วุ่นวาย",
    "",
    "ฝนพายุที่กระหน่ำ",
    "จนอากาศเย็นชื้น",
  ]},

  // 1: Q1 room (illus 1)
  { kind:"question", illus:1,
    text:"คุณนั่งอยู่ในที่พักผ่อนที่สบายใจที่สุด\nที่ ๆ นั้นคือ …",
    choices:[
      { text:"บนเตียงนุ่ม ๆ ล้อมไปด้วยหมอน ผ้าห่ม และตุ๊กตาสุดที่รักของคุณ", cake:"matcha" },
      { text:"ห้องหนังสือไม้สีน้ำตาลเก่า พร้อมด้วยเครื่องดื่มอุ่น ๆ หนึ่งแก้ว", cake:"chocolate" },
      { text:"โต๊ะหนังสือที่มีของวางกระจัดกระจาย ประดับด้วยรูปถ่ายของคนที่คุณรักในทุกเทศกาล", cake:"vanilla" },
      { text:"ห้องครัว ที่ห้อมล้อมไปด้วยเค้กขนมทานเล่นแสนอร่อยที่คุณชื่นชอบ", cake:"strawberry" },
      { text:"ห้องนั่งเล่น ที่เต็มไปด้วยสัตว์เลี้ยงตัวโปรด", cake:"cookie" },
    ],
  },

  // 2: falling asleep (illus 2)
  { kind:"story", illus:2, text:[
    "ความเหนื่อยล้าที่สะสมมาทั้งวัน",
    "กับบรรยากาศที่คุ้นเคย",
    "",
    "ทำให้คุณเผลอหลับไป …",
  ]},

  // 3: blinking awake (illus 3)
  { kind:"story", illus:3, text:[
    "กระพริบ กระพริบ",
    "",
    "ภาพพร่ามัวเพราะแสงไฟสว่างจ้า",
    "คุณค่อย ๆ ลืมตาขึ้น …",
  ]},

  // 4: Q2 see younger self (illus 4)
  { kind:"question", illus:4,
    text:"คุณเห็นใครบางคน\nหน้าตาคุ้นเคย คล้ายกับเงาสะท้อนในกระจก\n\nนั่นคือคุณ ตอนอายุสิบขวบ\nตัวคุณที่ดูเด็กกว่า สดใสกว่า และดูมีความสุขกว่า\n\nในตอนนั้น คุณกำลังอยู่ที่ …",
    choices:[
      { text:"สนามเด็กเล่น", cake:"cookie" },
      { text:"ห้องโถงกลางบ้าน", cake:"vanilla" },
      { text:"หน้าร้านเบเกอรี่", cake:"chocolate" },
      { text:"สนามฟุตบอล", cake:"strawberry" },
      { text:"หน้าร้านของเล่น", cake:"matcha" },
    ],
  },

  // 5: child smiles (illus 5)
  { kind:"story", illus:5, text:[
    "เขามองคุณแล้วยิ้ม",
    "ก่อนจะถามว่า",
    "",
    "\"ช่วงนี้เหนื่อยมากเลยใช่ไหม\"",
    "",
    "คุณพยักหน้าเบา ๆ",
    "\"งั้นเราไปเดินเล่นกัน\"",
  ]},

  // 6: Q3 choose door (illus 6) ← portal SFX
  { kind:"question", illus:6,
    text:"ระหว่างเดินเล่น\nคุณได้เจอประตู 5 บาน\n\nแต่ละบานพาไปสู่ช่วงเวลาหนึ่ง\nคุณเลือกเข้าประตูที่พาไปสู่ …",
    choices:[
      { text:"วันที่คุณได้พักหลังจากเหนื่อยมานาน", cake:"vanilla" },
      { text:"วันที่คุณทำสิ่งที่คิดว่าเป็นไปไม่ได้สำเร็จ", cake:"chocolate" },
      { text:"วันที่คุณหัวเราะจนลืมเวลา", cake:"strawberry" },
      { text:"วันที่คุณกลับไปคิดถึงความทรงจำดี ๆ", cake:"cookie" },
      { text:"วันที่คุณรู้สึกสงบกับตัวเองอย่างแท้จริง", cake:"matcha" },
    ],
  },

  // 7: door opening (illus 7)
  { kind:"story", illus:7, text:[
    "ประตูบานนั้นค่อย ๆ เปิดออก",
    "",
    "ภาพความทรงจำฉายสว่างไปรอบ ๆ",
  ]},

  // 8: golden glow memory (illus 8)
  { kind:"story", illus:8, text:[
    "ความรู้สึกหวนคืนกลับไปยังวันนั้นอีกครั้ง",
    "",
    "ภาพของฉันตอนที่มีความสุข …",
    "เป็นแบบนี้เองสินะ",
  ]},

  // 9: adult crying face (illus 9)
  { kind:"story", illus:9, text:[
    "\"พี่ดูมีความสุขจังเลย\" เด็กคนนั้นเอ่ย",
    "",
    "ใช่ ฉันดูมีความสุข",
    "",
    "แต่ช่วงเวลาเหล่านั้น",
    "มันผ่านมานานแค่ไหนแล้วนะ …",
  ]},

  // 10: two talking (illus 10)
  { kind:"story", illus:10, text:[
    "ภาพความทรงจำยังคงเล่นต่อจนจบ",
    "แสงสว่างค่อย ๆ ดับมืดลง",
    "",
    "ทิ้งไว้เพียงแต่ความรู้สึก",
    "",
    "นี่เรา หลงลืมอะไรไปหรือเปล่านะ ?",
  ]},

  // 11: door closing (illus 11)
  { kind:"story", illus:11, text:[
    "ประตูได้ค่อย ๆ ปิดลง",
    "",
    "ท่ามกลางความเงียบ",
  ]},

  // 12: Q4 pride (illus 5) ← store lastAnswer
  { kind:"question", illus:5,
    text:"เด็กคนนั้นหันมาถามคุณว่า\n\"ตลอดเวลาที่ผ่านมา\nมีเรื่องอะไรที่พี่ภูมิใจในตัวเองบ้าง\"\n\nคุณเงียบไปครู่หนึ่ง ก่อนจะตอบว่า …",
    choices:[
      { text:"ฉันยังพยายามต่อ แม้จะเหนื่อย", cake:"chocolate" },
      { text:"ฉันดูแลคนรักได้ดี", cake:"vanilla" },
      { text:"ฉันผ่านเรื่องยาก ๆ มาได้", cake:"cookie" },
      { text:"ฉันยังไม่ยอมแพ้ต่อความฝัน", cake:"strawberry" },
      { text:"ฉันยังเป็นตัวเองอยู่", cake:"matcha" },
    ],
  },

  // 13: white room dynamic (illus 12)
  // {ANSWER} will be replaced dynamically with Q4 choice (without "ฉัน")
  { kind:"story", illus:12, text:[
    "แสงสว่างค่อย ๆ กลับมา",
    "แสงสีขาวนวลสว่างไปทั่วห้อง",
    "",
    "\"พี่เก่งจังเลย\" เด็กน้อยกล่าว",
    "\"เก่งตรงไหน\" ฉันถามกลับ",
    "",
    "\"เพราะพี่ {ANSWER}\"",
    "\"เพราะพี่ตั้งใจใช้ชีวิตทุกวัน\"",
    "",
    "\"และพี่ ก็อย่าลืมจะดูแลตัวพี่เองนะ\"",
  ]},

  // 14: gift giving (illus 13) — LAST BEAT → ending
  { kind:"story", illus:13, text:[
    "เด็กคนนั้นยิ้มให้",
    "แล้วยื่นกล่องของขวัญใบหนึ่ง",
    "",
    "เมื่อเปิดกล่องออก …",
    "ข้างในคือเค้กชิ้นหนึ่ง",
    "ที่มีไว้สำหรับคุณโดยเฉพาะ",
  ]},
];

export type ScoreMap = Record<CakeType, number>;

export function calcResult(scores: ScoreMap): CakeType {
  const max = Math.max(...Object.values(scores));
  const winners = (Object.keys(scores) as CakeType[]).filter(k => scores[k] === max);
  return winners[Math.floor(Math.random() * winners.length)];
}
