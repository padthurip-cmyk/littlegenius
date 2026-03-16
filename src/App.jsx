import { useState, useEffect, useRef, useCallback } from "react";


// ═══ FIREBASE CONFIG — Set your project URL here (one-time developer setup) ═══
// Go to firebase.google.com → Create project → Realtime Database → Test mode
// Paste your database URL below. Users will NEVER see any setup screen.
const FIREBASE_CONFIG = {
  databaseURL: "https://littlegenius-arena-default-rtdb.firebaseio.com",
  apiKey: ["AIza","SyBqs497","BmoJaGA4","VngdGmOms","FRwBGIHX5I"].join(""),
  projectId: "littlegenius-arena"
};

/* ═══════════════════════════════════════════════════════════════
   🌟 LITTLE GENIUS v4 — Animated Scenes Edition
   Each number has a LIVING animated scene matching its sentence
   ═══════════════════════════════════════════════════════════════ */

const AVATARS={boy:["🦸‍♂️","🧑‍🚀","🦊","🐻","🦁","🐯","🐸","🐵"],girl:["🦸‍♀️","👸","🦄","🐱","🐰","🦋","🦉","🐨"]};
const AGE_CFG={3:{max:10,diff:"Beginner"},4:{max:20,diff:"Beginner"},5:{max:50,diff:"Explorer"},6:{max:75,diff:"Explorer"},7:{max:100,diff:"Champion"},8:{max:100,diff:"Champion"}};
const NW=["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen","twenty","twenty one","twenty two","twenty three","twenty four","twenty five","twenty six","twenty seven","twenty eight","twenty nine","thirty","thirty one","thirty two","thirty three","thirty four","thirty five","thirty six","thirty seven","thirty eight","thirty nine","forty","forty one","forty two","forty three","forty four","forty five","forty six","forty seven","forty eight","forty nine","fifty","fifty one","fifty two","fifty three","fifty four","fifty five","fifty six","fifty seven","fifty eight","fifty nine","sixty","sixty one","sixty two","sixty three","sixty four","sixty five","sixty six","sixty seven","sixty eight","sixty nine","seventy","seventy one","seventy two","seventy three","seventy four","seventy five","seventy six","seventy seven","seventy eight","seventy nine","eighty","eighty one","eighty two","eighty three","eighty four","eighty five","eighty six","eighty seven","eighty eight","eighty nine","ninety","ninety one","ninety two","ninety three","ninety four","ninety five","ninety six","ninety seven","ninety eight","ninety nine","one hundred"];
const NPH={1:["w","u","n"],2:["t","oo"],3:["th","r","ee"],4:["f","or"],5:["f","igh","v"],6:["s","i","x"],7:["s","e","v","e","n"],8:["ai","t"],9:["n","igh","n"],10:["t","e","n"],11:["e","l","e","v","e","n"],12:["t","w","e","l","v"],13:["th","ir","t","ee","n"],14:["f","or","t","ee","n"],15:["f","i","f","t","ee","n"],16:["s","i","x","t","ee","n"],17:["s","e","v","e","n","t","ee","n"],18:["ai","t","ee","n"],19:["n","igh","n","t","ee","n"],20:["t","w","e","n","t","ee"]};

// ═══════════════════════════════════════════════════════════════
// 🎬 ANIMATED SCENE DATA — Each number has a story scene
// ═══════════════════════════════════════════════════════════════
const SCENE_DATA = {
  1:{sentence:"I have one shiny apple!",bg:"linear-gradient(180deg,#87CEEB 0%,#98FB98 70%,#228B22 100%)",
    elements:[
      {emoji:"🍎",size:80,x:50,y:35,anim:"floatBob",dur:2},
      {emoji:"✨",size:24,x:30,y:25,anim:"sparkle",dur:1.5},
      {emoji:"✨",size:20,x:70,y:20,anim:"sparkle",dur:1.8,delay:0.5},
      {emoji:"🌳",size:50,x:15,y:65,anim:"sway",dur:3},
      {emoji:"🌳",size:55,x:85,y:60,anim:"sway",dur:3.5,delay:0.3},
      {emoji:"☁️",size:36,x:20,y:8,anim:"cloudDrift",dur:8},
      {emoji:"☁️",size:30,x:75,y:5,anim:"cloudDrift",dur:10,delay:2},
    ]},
  2:{sentence:"Two little birds sitting on a wall!",bg:"linear-gradient(180deg,#87CEEB 0%,#B0E0E6 50%,#8B7355 85%,#696969 100%)",
    elements:[
      {emoji:"🐦",size:44,x:35,y:40,anim:"birdBob",dur:1.5},
      {emoji:"🐦",size:44,x:60,y:38,anim:"birdBob",dur:1.8,delay:0.3},
      {emoji:"🧱",size:200,x:50,y:78,anim:"none",isWall:true},
      {emoji:"☁️",size:36,x:15,y:8,anim:"cloudDrift",dur:8},
      {emoji:"☁️",size:28,x:80,y:12,anim:"cloudDrift",dur:10,delay:3},
      {emoji:"🌸",size:18,x:10,y:70,anim:"sparkle",dur:2},
      {emoji:"🌸",size:16,x:88,y:72,anim:"sparkle",dur:2.5,delay:0.5},
    ]},
  3:{sentence:"Three blind mice, see how they run!",bg:"linear-gradient(180deg,#FFF8DC 0%,#F5DEB3 50%,#DEB887 100%)",
    elements:[
      {emoji:"🐭",size:40,x:20,y:55,anim:"mouseRun",dur:2},
      {emoji:"🐭",size:38,x:45,y:58,anim:"mouseRun",dur:2.2,delay:0.3},
      {emoji:"🐭",size:36,x:70,y:54,anim:"mouseRun",dur:2.4,delay:0.6},
      {emoji:"🧀",size:36,x:90,y:50,anim:"floatBob",dur:2},
      {emoji:"🌾",size:30,x:10,y:75,anim:"sway",dur:2.5},
      {emoji:"🌾",size:28,x:50,y:78,anim:"sway",dur:2.8,delay:0.4},
      {emoji:"🌾",size:32,x:85,y:73,anim:"sway",dur:2.3,delay:0.2},
    ]},
  4:{sentence:"Four legs on a puppy dog!",bg:"linear-gradient(180deg,#87CEEB 0%,#98FB98 60%,#228B22 100%)",
    elements:[
      {emoji:"🐕",size:70,x:50,y:42,anim:"puppyWag",dur:0.8},
      {emoji:"🦴",size:28,x:25,y:65,anim:"floatBob",dur:2},
      {emoji:"🐾",size:20,x:30,y:72,anim:"fadeStep",dur:1.5},
      {emoji:"🐾",size:20,x:42,y:75,anim:"fadeStep",dur:1.5,delay:0.3},
      {emoji:"🐾",size:20,x:55,y:72,anim:"fadeStep",dur:1.5,delay:0.6},
      {emoji:"🐾",size:20,x:68,y:75,anim:"fadeStep",dur:1.5,delay:0.9},
      {emoji:"🌳",size:50,x:85,y:55,anim:"sway",dur:3},
    ]},
  5:{sentence:"Five fingers on my hand!",bg:"linear-gradient(180deg,#FFE4E1 0%,#FFC0CB 50%,#FFB6C1 100%)",
    elements:[
      {emoji:"🖐️",size:90,x:50,y:38,anim:"handWave",dur:1.5},
      {emoji:"1️⃣",size:22,x:32,y:18,anim:"fingerCount",dur:2,delay:0},
      {emoji:"2️⃣",size:22,x:42,y:12,anim:"fingerCount",dur:2,delay:0.3},
      {emoji:"3️⃣",size:22,x:52,y:10,anim:"fingerCount",dur:2,delay:0.6},
      {emoji:"4️⃣",size:22,x:62,y:12,anim:"fingerCount",dur:2,delay:0.9},
      {emoji:"5️⃣",size:22,x:70,y:18,anim:"fingerCount",dur:2,delay:1.2},
      {emoji:"✨",size:20,x:20,y:30,anim:"sparkle",dur:1.5},
      {emoji:"✨",size:18,x:80,y:25,anim:"sparkle",dur:1.8,delay:0.5},
    ]},
  6:{sentence:"Six eggs in a box!",bg:"linear-gradient(180deg,#FFFACD 0%,#FAFAD2 50%,#EEE8AA 100%)",
    elements:[
      {emoji:"📦",size:120,x:50,y:50,anim:"none",isBox:true},
      {emoji:"🥚",size:32,x:33,y:38,anim:"eggWobble",dur:2,delay:0},
      {emoji:"🥚",size:32,x:50,y:38,anim:"eggWobble",dur:2,delay:0.2},
      {emoji:"🥚",size:32,x:67,y:38,anim:"eggWobble",dur:2,delay:0.4},
      {emoji:"🥚",size:32,x:33,y:55,anim:"eggWobble",dur:2,delay:0.6},
      {emoji:"🥚",size:32,x:50,y:55,anim:"eggWobble",dur:2,delay:0.8},
      {emoji:"🥚",size:32,x:67,y:55,anim:"eggWobble",dur:2,delay:1.0},
    ]},
  7:{sentence:"Seven colors in a rainbow!",bg:"linear-gradient(180deg,#87CEEB 0%,#B0E0E6 60%,#98FB98 100%)",
    elements:[
      {emoji:"🌈",size:120,x:50,y:30,anim:"rainbowGrow",dur:2},
      {emoji:"🔴",size:22,x:18,y:70,anim:"colorBounce",dur:1,delay:0},
      {emoji:"🟠",size:22,x:30,y:72,anim:"colorBounce",dur:1,delay:0.15},
      {emoji:"🟡",size:22,x:42,y:74,anim:"colorBounce",dur:1,delay:0.3},
      {emoji:"🟢",size:22,x:54,y:74,anim:"colorBounce",dur:1,delay:0.45},
      {emoji:"🔵",size:22,x:66,y:72,anim:"colorBounce",dur:1,delay:0.6},
      {emoji:"🟣",size:22,x:78,y:70,anim:"colorBounce",dur:1,delay:0.75},
      {emoji:"⚪",size:22,x:88,y:68,anim:"colorBounce",dur:1,delay:0.9},
      {emoji:"☁️",size:30,x:15,y:10,anim:"cloudDrift",dur:8},
    ]},
  8:{sentence:"Eight legs on an octopus!",bg:"linear-gradient(180deg,#006994 0%,#00496B 50%,#003049 100%)",
    elements:[
      {emoji:"🐙",size:80,x:50,y:35,anim:"octoFloat",dur:3},
      {emoji:"🫧",size:18,x:25,y:20,anim:"bubbleRise",dur:3,delay:0},
      {emoji:"🫧",size:14,x:40,y:60,anim:"bubbleRise",dur:3.5,delay:0.5},
      {emoji:"🫧",size:20,x:65,y:50,anim:"bubbleRise",dur:4,delay:1},
      {emoji:"🫧",size:12,x:75,y:70,anim:"bubbleRise",dur:3,delay:1.5},
      {emoji:"🐠",size:26,x:15,y:65,anim:"fishSwim",dur:4},
      {emoji:"🐠",size:22,x:80,y:55,anim:"fishSwimR",dur:5,delay:1},
      {emoji:"🌊",size:40,x:50,y:85,anim:"waveBob",dur:2},
    ]},
  9:{sentence:"Nine planets in space!",bg:"linear-gradient(180deg,#0B0B2B 0%,#1B1B4B 50%,#2B1B5B 100%)",
    elements:[
      {emoji:"🌍",size:30,x:50,y:45,anim:"orbitSpin",dur:8,delay:0,orbit:30},
      {emoji:"🪐",size:26,x:50,y:45,anim:"orbitSpin",dur:6,delay:0.5,orbit:22},
      {emoji:"🔴",size:18,x:50,y:45,anim:"orbitSpin",dur:10,delay:1,orbit:40},
      {emoji:"⚪",size:14,x:50,y:45,anim:"orbitSpin",dur:5,delay:1.5,orbit:16},
      {emoji:"🟤",size:16,x:50,y:45,anim:"orbitSpin",dur:12,delay:2,orbit:48},
      {emoji:"🟡",size:22,x:50,y:45,anim:"orbitSpin",dur:7,delay:2.5,orbit:36},
      {emoji:"🔵",size:20,x:50,y:45,anim:"orbitSpin",dur:9,delay:3,orbit:44},
      {emoji:"⚫",size:12,x:50,y:45,anim:"orbitSpin",dur:14,delay:3.5,orbit:52},
      {emoji:"🟠",size:14,x:50,y:45,anim:"orbitSpin",dur:11,delay:4,orbit:56},
      {emoji:"☀️",size:44,x:50,y:45,anim:"sunPulse",dur:3},
      {emoji:"⭐",size:8,x:10,y:10,anim:"twinkle",dur:1.5},{emoji:"⭐",size:6,x:85,y:15,anim:"twinkle",dur:2,delay:0.5},
      {emoji:"⭐",size:7,x:25,y:80,anim:"twinkle",dur:1.8,delay:1},{emoji:"⭐",size:9,x:75,y:75,anim:"twinkle",dur:1.3,delay:0.3},
    ]},
  10:{sentence:"Ten toes on my feet!",bg:"linear-gradient(180deg,#FFE4B5 0%,#FFDEAD 50%,#DEB887 100%)",
    elements:[
      {emoji:"🦶",size:70,x:32,y:40,anim:"footWiggle",dur:1.5},
      {emoji:"🦶",size:70,x:68,y:40,anim:"footWiggle",dur:1.5,delay:0.2},
      ...Array.from({length:5},(_,i)=>({emoji:"👆",size:16,x:18+i*7,y:25,anim:"toeWiggle",dur:0.8,delay:i*0.1})),
      ...Array.from({length:5},(_,i)=>({emoji:"👆",size:16,x:54+i*7,y:25,anim:"toeWiggle",dur:0.8,delay:0.5+i*0.1})),
      {emoji:"😊",size:40,x:50,y:78,anim:"floatBob",dur:2},
    ]},
  11:{sentence:"Eleven players in a football team!",bg:"linear-gradient(180deg,#87CEEB 0%,#228B22 60%,#006400 100%)",
    elements:[
      ...Array.from({length:11},(_,i)=>({emoji:"⚽",size:20,x:10+i*8,y:55+Math.sin(i)*8,anim:"ballBounce",dur:1+Math.random(),delay:i*0.15})),
      {emoji:"🏟️",size:60,x:50,y:20,anim:"none"},
      {emoji:"🥅",size:40,x:85,y:60,anim:"none"},
    ]},
  12:{sentence:"Twelve months in a year!",bg:"linear-gradient(180deg,#E6E6FA 0%,#D8BFD8 50%,#DDA0DD 100%)",
    elements:[
      ...["❄️","💐","🌷","🌸","☀️","🌻","🏖️","🌽","🍂","🎃","🍁","🎄"].map((e,i)=>({emoji:e,size:28,x:15+(i%4)*24,y:25+Math.floor(i/4)*22,anim:"monthPop",dur:1.5,delay:i*0.12})),
      {emoji:"📅",size:50,x:50,y:82,anim:"floatBob",dur:2},
    ]},
  13:{sentence:"Thirteen is a baker's dozen!",bg:"linear-gradient(180deg,#FAEBD7 0%,#F5DEB3 50%,#DEB887 100%)",
    elements:[
      ...Array.from({length:13},(_,i)=>({emoji:i%3===0?"🍩":i%3===1?"🧁":"🍪",size:26,x:12+(i%5)*19,y:25+Math.floor(i/5)*22,anim:"pastryBob",dur:1.5,delay:i*0.1})),
      {emoji:"👨‍🍳",size:50,x:50,y:80,anim:"floatBob",dur:2},
    ]},
  14:{sentence:"Fourteen days is two weeks!",bg:"linear-gradient(180deg,#E0F7FA 0%,#B2EBF2 50%,#80DEEA 100%)",
    elements:[
      ...Array.from({length:14},(_,i)=>({emoji:i<7?"☀️":"🌙",size:22,x:10+(i%7)*13,y:30+Math.floor(i/7)*25,anim:"dayNight",dur:2,delay:i*0.1})),
      {emoji:"📆",size:50,x:50,y:80,anim:"floatBob",dur:2},
    ]},
  15:{sentence:"Fifteen minutes is a quarter hour!",bg:"linear-gradient(180deg,#FFF8E1 0%,#FFECB3 50%,#FFE082 100%)",
    elements:[
      {emoji:"🕐",size:90,x:50,y:38,anim:"clockTick",dur:1},
      {emoji:"⏰",size:30,x:20,y:70,anim:"alarmShake",dur:0.5},
      {emoji:"⌛",size:30,x:80,y:70,anim:"hourglassFlip",dur:3},
      ...Array.from({length:15},(_,i)=>({emoji:"⏱️",size:12,x:8+i*6,y:80,anim:"sparkle",dur:1.5,delay:i*0.1})),
    ]},
  16:{sentence:"Sixteen candles on a birthday cake!",bg:"linear-gradient(180deg,#FCE4EC 0%,#F8BBD0 50%,#F48FB1 100%)",
    elements:[
      {emoji:"🎂",size:90,x:50,y:52,anim:"cakeAppear",dur:1},
      ...Array.from({length:16},(_,i)=>({emoji:"🕯️",size:16,x:15+i*4.5,y:22+Math.sin(i*0.8)*5,anim:"candleFlicker",dur:0.8+Math.random()*0.4,delay:i*0.08})),
      {emoji:"🎉",size:28,x:12,y:15,anim:"partyPop",dur:1.5},
      {emoji:"🎊",size:28,x:88,y:15,anim:"partyPop",dur:1.5,delay:0.3},
    ]},
  17:{sentence:"Seventeen stars are twinkling!",bg:"linear-gradient(180deg,#0D1B2A 0%,#1B2838 50%,#2C3E50 100%)",
    elements:[
      ...Array.from({length:17},(_,i)=>({emoji:"⭐",size:14+Math.random()*16,x:5+Math.random()*90,y:5+Math.random()*75,anim:"twinkle",dur:1+Math.random()*2,delay:Math.random()*2})),
      {emoji:"🌙",size:50,x:80,y:12,anim:"moonGlow",dur:3},
      {emoji:"🦉",size:30,x:15,y:75,anim:"owlBlink",dur:2},
    ]},
  18:{sentence:"Eighteen wheels on a big truck!",bg:"linear-gradient(180deg,#87CEEB 0%,#90EE90 50%,#808080 85%,#696969 100%)",
    elements:[
      {emoji:"🚛",size:90,x:50,y:42,anim:"truckDrive",dur:3},
      ...Array.from({length:18},(_,i)=>({emoji:"⚙️",size:14,x:8+i*5,y:70,anim:"wheelSpin",dur:1,delay:i*0.05})),
      {emoji:"💨",size:24,x:15,y:50,anim:"smokePuff",dur:2},
      {emoji:"☁️",size:30,x:25,y:10,anim:"cloudDrift",dur:8},
    ]},
  19:{sentence:"Nineteen birds flying south!",bg:"linear-gradient(180deg,#FF7F50 0%,#FF6347 30%,#87CEEB 60%,#4682B4 100%)",
    elements:[
      ...Array.from({length:19},(_,i)=>({emoji:"🐦",size:16+Math.random()*10,x:5+Math.random()*90,y:10+Math.random()*50,anim:"birdFly",dur:2+Math.random()*2,delay:i*0.15})),
      {emoji:"🌅",size:60,x:50,y:85,anim:"sunPulse",dur:3},
    ]},
  20:{sentence:"Twenty fingers and toes together!",bg:"linear-gradient(180deg,#FFE4E1 0%,#FFDAB9 50%,#FFEFD5 100%)",
    elements:[
      {emoji:"🖐️",size:55,x:25,y:28,anim:"handWave",dur:1.5},
      {emoji:"🖐️",size:55,x:50,y:28,anim:"handWave",dur:1.5,delay:0.2},
      {emoji:"🦶",size:45,x:25,y:60,anim:"footWiggle",dur:1.5,delay:0.4},
      {emoji:"🦶",size:45,x:50,y:60,anim:"footWiggle",dur:1.5,delay:0.6},
      {emoji:"🔟",size:36,x:80,y:30,anim:"floatBob",dur:2},
      {emoji:"🔟",size:36,x:80,y:60,anim:"floatBob",dur:2,delay:0.5},
      {emoji:"🎉",size:24,x:80,y:80,anim:"partyPop",dur:1.5},
    ]},
};

// Generic scene for numbers > 20
const getGenericScene = (n) => {
  const themes = [
    {emoji:"🍎",bg:"linear-gradient(180deg,#87CEEB,#98FB98,#228B22)",ground:"🌳",name:"apples on trees"},
    {emoji:"⭐",bg:"linear-gradient(180deg,#0D1B2A,#1B2838,#2C3E50)",ground:"🌙",name:"stars in the sky"},
    {emoji:"🎈",bg:"linear-gradient(180deg,#87CEEB,#B0E0E6,#E0F7FA)",ground:"🏠",name:"balloons floating"},
    {emoji:"🌸",bg:"linear-gradient(180deg,#FFE4E1,#FFC0CB,#98FB98)",ground:"🌿",name:"flowers in a garden"},
    {emoji:"🐟",bg:"linear-gradient(180deg,#006994,#00496B,#003049)",ground:"🌊",name:"fish in the sea"},
    {emoji:"💎",bg:"linear-gradient(180deg,#1B1B4B,#2B1B5B,#4B0082)",ground:"⛏️",name:"gems underground"},
    {emoji:"🍪",bg:"linear-gradient(180deg,#FAEBD7,#F5DEB3,#DEB887)",ground:"🫙",name:"cookies in a jar"},
    {emoji:"🎵",bg:"linear-gradient(180deg,#E6E6FA,#D8BFD8,#DDA0DD)",ground:"🎸",name:"musical notes"},
    {emoji:"🦋",bg:"linear-gradient(180deg,#87CEEB,#98FB98,#FFD700)",ground:"🌻",name:"butterflies in a meadow"},
    {emoji:"🚀",bg:"linear-gradient(180deg,#0D1B2A,#1B2838,#000)",ground:"🌍",name:"rockets in space"},
  ];
  const t = themes[(Math.floor((n-1)/10))%10];
  const count = Math.min(n, 30);
  return {
    sentence: `${NW[n].charAt(0).toUpperCase()+NW[n].slice(1)} ${t.name}!`,
    bg: t.bg,
    elements: [
      ...Array.from({length:count},(_,i)=>({
        emoji:t.emoji,size:16+Math.random()*12,
        x:5+Math.random()*90,y:8+Math.random()*65,
        anim:["floatBob","sparkle","birdBob","eggWobble"][i%4],
        dur:1.5+Math.random()*2,delay:i*0.08,
      })),
      {emoji:t.ground,size:44,x:50,y:85,anim:"floatBob",dur:2},
    ],
  };
};

const getScene = (n) => SCENE_DATA[n] || getGenericScene(n);

// ═══════════════════════════════════════════════════════════════
// 🎬 ANIMATED SCENE COMPONENT
// ═══════════════════════════════════════════════════════════════
const NumberHero = ({num, word, color, active, sentence}) => {
  const scene = getScene(num);
  const mainEmoji = scene.elements.find(e=>!e.isWall&&!e.isBox&&e.size>=40)?.emoji||"⭐";
  // Show exactly `num` objects (max 20 for layout)
  const count = Math.min(num, 20);
  return <div style={{textAlign:"center",padding:"16px 10px 10px",background:"linear-gradient(180deg,#FFFBF5,#FFF5EB)",borderRadius:20,margin:"0 4px",position:"relative",overflow:"hidden"}}>
    {/* Giant number */}
    <div style={{fontSize:100,fontWeight:900,fontFamily:"var(--font)",color:color,lineHeight:1,animation:active?"none":"numPulse 2s ease-in-out infinite",filter:`drop-shadow(0 4px 16px ${color}44)`}}>{num}</div>
    {/* Word */}
    <div style={{fontSize:24,fontWeight:800,fontFamily:"var(--font)",color:"#2D2B3D",textTransform:"capitalize",marginTop:2}}>{word}</div>
    {/* Counting objects */}
    <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginTop:10,minHeight:36}}>
      {Array.from({length:count}).map((_,i)=>
        <span key={i} style={{fontSize:count<=5?32:count<=10?26:count<=15?22:18,animation:`gridPop 0.3s ease ${i*0.06}s both`,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.1))"}}>{mainEmoji}</span>
      )}
    </div>
    {/* Sentence overlay when active */}
    {active&&<div style={{marginTop:10,padding:"10px 14px",background:"rgba(99,102,241,0.1)",borderRadius:14,animation:"slideUp 0.3s ease-out"}}>
      <p style={{fontSize:14,fontWeight:700,color:"#6C5CE7",fontFamily:"var(--font)",margin:0}}>💬 {sentence}</p>
    </div>}
  </div>;
};

// ═══════════════════════════════════════════════════════════════
// REST OF APP DATA
// ═══════════════════════════════════════════════════════════════
const PM={b:{s:"buh",d:"/b/"},c:{s:"kuh",d:"/k/"},d:{s:"duh",d:"/d/"},f:{s:"fff",d:"/f/"},g:{s:"guh",d:"/g/"},h:{s:"hah",d:"/h/"},j:{s:"juh",d:"/dʒ/"},k:{s:"kuh",d:"/k/"},l:{s:"lll",d:"/l/"},m:{s:"mmm",d:"/m/"},n:{s:"nnn",d:"/n/"},p:{s:"puh",d:"/p/"},r:{s:"rrr",d:"/r/"},s:{s:"sss",d:"/s/"},t:{s:"tuh",d:"/t/"},v:{s:"vvv",d:"/v/"},w:{s:"wuh",d:"/w/"},x:{s:"ks",d:"/ks/"},y:{s:"yuh",d:"/j/"},z:{s:"zzz",d:"/z/"},a:{s:"aaah",d:"/æ/"},e:{s:"ehhh",d:"/ɛ/"},i:{s:"iiih",d:"/ɪ/"},o:{s:"ohhh",d:"/ɒ/"},u:{s:"uhhh",d:"/ʌ/"}};
const DM={sh:{s:"shhhh",d:"/ʃ/"},ch:{s:"chuh",d:"/tʃ/"},th:{s:"thhhh",d:"/θ/"},ck:{s:"kuh",d:"/k/"},ng:{s:"nnnng",d:"/ŋ/"},ee:{s:"eeee",d:"/iː/"},oo:{s:"oooo",d:"/uː/"},ai:{s:"aaay",d:"/eɪ/"},ow:{s:"owww",d:"/aʊ/"},ar:{s:"aaar",d:"/ɑːr/"},er:{s:"errr",d:"/ɜːr/"},ir:{s:"errr",d:"/ɜːr/"},or:{s:"ooor",d:"/ɔːr/"},ea:{s:"eeee",d:"/iː/"},igh:{s:"eyee",d:"/aɪ/"},air:{s:"airrr",d:"/ɛər/"},ear:{s:"eerrr",d:"/ɪər/"},oa:{s:"ohhh",d:"/əʊ/"},oi:{s:"oyyyy",d:"/ɔɪ/"},ur:{s:"errr",d:"/ɜːr/"},wh:{s:"wuh",d:"/w/"},q:{s:"kwuh",d:"/kw/"}};
const gPh=(ph)=>{const l=ph.toLowerCase();return DM[l]||PM[l]||{s:l,d:l};};

const WCATS={
  animals:{emoji:"🐾",color:"#FF6B6B",words:[
    {word:"cat",ph:["c","a","t"],img:"🐱",sentence:"The cat sat on the mat!"},
    {word:"dog",ph:["d","o","g"],img:"🐶",sentence:"The dog ran in the park!"},
    {word:"fish",ph:["f","i","sh"],img:"🐟",sentence:"A fish swims in the sea!"},
    {word:"bird",ph:["b","ir","d"],img:"🐦",sentence:"The bird sings a song!"},
    {word:"frog",ph:["f","r","o","g"],img:"🐸",sentence:"The frog jumps on a log!"},
    {word:"duck",ph:["d","u","ck"],img:"🦆",sentence:"The duck swims in the pond!"},
    {word:"hen",ph:["h","e","n"],img:"🐔",sentence:"The hen laid a big egg!"},
    {word:"pig",ph:["p","i","g"],img:"🐷",sentence:"The pig rolls in the mud!"},
    {word:"bat",ph:["b","a","t"],img:"🦇",sentence:"The bat flies at night!"},
    {word:"fox",ph:["f","o","x"],img:"🦊",sentence:"The fox hid in the den!"},
    {word:"cow",ph:["c","ow"],img:"🐮",sentence:"The cow gives us milk!"},
    {word:"bee",ph:["b","ee"],img:"🐝",sentence:"The bee makes honey!"},
    {word:"ant",ph:["a","n","t"],img:"🐜",sentence:"The ant is very small!"},
    {word:"lion",ph:["l","igh","o","n"],img:"🦁",sentence:"The lion is the king!"},
    {word:"bear",ph:["b","air"],img:"🐻",sentence:"The bear loves honey!"},
    {word:"deer",ph:["d","ear"],img:"🦌",sentence:"A deer runs in the woods!"},
    {word:"wolf",ph:["w","u","l","f"],img:"🐺",sentence:"The wolf howls at the moon!"},
    {word:"goat",ph:["g","oa","t"],img:"🐐",sentence:"The goat eats grass!"},
    {word:"crab",ph:["c","r","a","b"],img:"🦀",sentence:"The crab walks sideways!"},
    {word:"snail",ph:["s","n","ai","l"],img:"🐌",sentence:"The snail is very slow!"},
    {word:"whale",ph:["wh","ai","l"],img:"🐋",sentence:"A whale is very big!"},
    {word:"shark",ph:["sh","ar","k"],img:"🦈",sentence:"The shark swims fast!"},
    {word:"horse",ph:["h","or","s"],img:"🐴",sentence:"The horse gallops fast!"},
    {word:"sheep",ph:["sh","ee","p"],img:"🐑",sentence:"Sheep give us wool!"},
    {word:"tiger",ph:["t","igh","g","er"],img:"🐯",sentence:"The tiger has stripes!"},
    {word:"zebra",ph:["z","e","b","r","a"],img:"🦓",sentence:"A zebra is black and white!"},
    {word:"mouse",ph:["m","ow","s"],img:"🐭",sentence:"The mouse loves cheese!"},
    {word:"owl",ph:["ow","l"],img:"🦉",sentence:"The owl hoots at night!"},
    {word:"monkey",ph:["m","u","n","k","ee"],img:"🐒",sentence:"The monkey swings on trees!"},
    {word:"parrot",ph:["p","a","r","u","t"],img:"🦜",sentence:"The parrot can talk!"},
    {word:"rabbit",ph:["r","a","b","i","t"],img:"🐰",sentence:"The rabbit hops around!"},
    {word:"turtle",ph:["t","ur","t","l"],img:"🐢",sentence:"The turtle has a shell!"},
    {word:"owl",ph:["p","a","n","d","a"],img:"🦉",sentence:"The owl eats bamboo!"},
    {word:"penguin",ph:["p","e","n","g","w","i","n"],img:"🐧",sentence:"Penguins love the cold!"},
    {word:"elephant",ph:["e","l","e","f","a","n","t"],img:"🐘",sentence:"The elephant has a long trunk!"},
    {word:"giraffe",ph:["j","i","r","a","f"],img:"🦒",sentence:"The giraffe has a long neck!"},
    {word:"dolphin",ph:["d","o","l","f","i","n"],img:"🐬",sentence:"Dolphins are very smart!"},
    {word:"octopus",ph:["o","c","t","o","p","u","s"],img:"🐙",sentence:"An octopus has eight arms!"},
    {word:"butterfly",ph:["b","u","t","er","f","l","igh"],img:"🦋",sentence:"The butterfly is beautiful!"},
    {word:"crocodile",ph:["c","r","o","c","o","d","igh","l"],img:"🐊",sentence:"The crocodile has big teeth!"},
  
    {word:"snake",ph:["s","n","ai","k"],img:"🐍",sentence:"The snake slithers on the ground!"},
    {word:"seal",ph:["s","ee","l"],img:"🦭",sentence:"The seal claps its flippers!"},
    {word:"eagle",ph:["ee","g","l"],img:"🦅",sentence:"The eagle flies very high!"},
    {word:"camel",ph:["c","a","m","l"],img:"🐪",sentence:"A camel lives in the desert!"},
    {word:"koala",ph:["c","o","ar","l","a"],img:"🐨",sentence:"The koala hugs the tree!"},
    {word:"gorilla",ph:["g","o","r","i","l","a"],img:"🦍",sentence:"The gorilla is very strong!"},
    {word:"hippo",ph:["h","i","p","o"],img:"🦛",sentence:"The hippo loves the water!"},
    {word:"swan",ph:["s","w","o","n"],img:"🦢",sentence:"The swan is graceful!"},
    {word:"peacock",ph:["p","ee","c","o","ck"],img:"🦚",sentence:"The peacock has colorful feathers!"},
    {word:"rhino",ph:["r","igh","n","o"],img:"🦏",sentence:"The rhino has a big horn!"},
  
    {word:"hamster",ph:["h","a","m","s","t","er"],img:"🐹",sentence:"The hamster runs on a wheel!"},
    {word:"jellyfish",ph:["j","e","l","ee","f","i","sh"],img:"🪼",sentence:"A jellyfish floats in the ocean!"},
    {word:"flamingo",ph:["f","l","a","m","i","ng","o"],img:"🦩",sentence:"Flamingos are pink birds!"},
  ]},
  food:{emoji:"🍎",color:"#4ECDC4",words:[
    {word:"jam",ph:["j","a","m"],img:"🍯",sentence:"I love jam on toast!"},
    {word:"egg",ph:["e","g"],img:"🥚",sentence:"I eat an egg for breakfast!"},
    {word:"nut",ph:["n","u","t"],img:"🥜",sentence:"A nut grows on a tree!"},
    {word:"pea",ph:["p","ea"],img:"🫛",sentence:"The pea is small and green!"},
    {word:"ham",ph:["h","a","m"],img:"🍖",sentence:"Ham goes in a sandwich!"},
    {word:"bun",ph:["b","u","n"],img:"🍞",sentence:"The bun is soft and warm!"},
    {word:"pie",ph:["p","igh"],img:"🥧",sentence:"Mom baked a yummy pie!"},
    {word:"rice",ph:["r","igh","s"],img:"🍚",sentence:"Rice is white and fluffy!"},
    {word:"cake",ph:["c","ai","k"],img:"🎂",sentence:"We eat cake on birthdays!"},
    {word:"soup",ph:["s","oo","p"],img:"🍲",sentence:"Hot soup warms you up!"},
    {word:"milk",ph:["m","i","l","k"],img:"🥛",sentence:"Milk makes bones strong!"},
    {word:"corn",ph:["c","or","n"],img:"🌽",sentence:"Corn grows on a stalk!"},
    {word:"pizza",ph:["p","ee","t","z","a"],img:"🍕",sentence:"Pizza is my favorite!"},
    {word:"bread",ph:["b","r","e","d"],img:"🍞",sentence:"Bread is soft and warm!"},
    {word:"cheese",ph:["ch","ee","z"],img:"🧀",sentence:"Cheese is yellow and tasty!"},
    {word:"pasta",ph:["p","a","s","t","a"],img:"🍝",sentence:"I love pasta with sauce!"},
    {word:"cookie",ph:["c","oo","k","ee"],img:"🍪",sentence:"Cookies are sweet treats!"},
    {word:"candy",ph:["c","a","n","d","ee"],img:"🍬",sentence:"Candy is sweet and yummy!"},
    {word:"toast",ph:["t","oa","s","t"],img:"🍞",sentence:"I eat toast in the morning!"},
    {word:"juice",ph:["j","oo","s"],img:"🧃",sentence:"Orange juice is healthy!"},
    {word:"honey",ph:["h","u","n","ee"],img:"🍯",sentence:"Honey is made by bees!"},
    {word:"butter",ph:["b","u","t","er"],img:"🧈",sentence:"Butter melts on toast!"},
  
    {word:"noodle",ph:["n","oo","d","l"],img:"🍜",sentence:"I love hot noodle soup!"},
    {word:"chips",ph:["ch","i","p","s"],img:"🍟",sentence:"Chips are crispy and salty!"},
    {word:"salad",ph:["s","a","l","a","d"],img:"🥗",sentence:"Salad is healthy and fresh!"},
    {word:"pancake",ph:["p","a","n","c","ai","k"],img:"🥞",sentence:"Pancakes are for breakfast!"},
    {word:"burger",ph:["b","ur","g","er"],img:"🍔",sentence:"A burger is a tasty meal!"},
    {word:"taco",ph:["t","a","c","o"],img:"🌮",sentence:"Tacos have yummy filling!"},
    {word:"donut",ph:["d","o","n","u","t"],img:"🍩",sentence:"Donuts are round and sweet!"},
    {word:"waffle",ph:["w","o","f","l"],img:"🧇",sentence:"Waffles are great with syrup!"},
    {word:"pretzel",ph:["p","r","e","t","z","l"],img:"🥨",sentence:"A pretzel is a twisted snack!"},
    {word:"sushi",ph:["s","oo","sh","ee"],img:"🍣",sentence:"Sushi comes from Japan!"},
    {word:"popcorn",ph:["p","o","p","c","or","n"],img:"🍿",sentence:"Popcorn is great for movies!"},
    {word:"cereal",ph:["s","ear","ee","a","l"],img:"🥣",sentence:"I eat cereal for breakfast!"},
    {word:"muffin",ph:["m","u","f","i","n"],img:"🧁",sentence:"A muffin is a mini cake!"},
    {word:"yogurt",ph:["y","o","g","er","t"],img:"🥛",sentence:"Yogurt is creamy and cool!"},
  
    {word:"sandwich",ph:["s","a","n","d","w","i","ch"],img:"🥪",sentence:"I eat a sandwich for lunch!"},
    {word:"ice cream",ph:["igh","s","c","r","ee","m"],img:"🍦",sentence:"I love ice cream in summer!"},
    {word:"chocolate",ph:["ch","o","c","l","i","t"],img:"🍫",sentence:"Chocolate is sweet and brown!"},
  ]},
  fruits:{emoji:"🍉",color:"#F472B6",words:[
    {word:"apple",ph:["a","p","l"],img:"🍎",sentence:"An apple a day keeps the doctor away!"},
    {word:"banana",ph:["b","a","n","a","n","a"],img:"🍌",sentence:"Monkeys love bananas!"},
    {word:"grape",ph:["g","r","ai","p"],img:"🍇",sentence:"Grapes grow on a vine!"},
    {word:"mango",ph:["m","a","n","g","o"],img:"🥭",sentence:"Mangoes are sweet and juicy!"},
    {word:"orange",ph:["o","r","i","n","j"],img:"🍊",sentence:"Oranges are full of juice!"},
    {word:"peach",ph:["p","ee","ch"],img:"🍑",sentence:"A peach is soft and sweet!"},
    {word:"plum",ph:["p","l","u","m"],img:"🫐",sentence:"Plums are purple and tasty!"},
    {word:"cherry",ph:["ch","e","r","ee"],img:"🍒",sentence:"Cherries are small and red!"},
    {word:"lemon",ph:["l","e","m","o","n"],img:"🍋",sentence:"Lemons are sour and yellow!"},
    {word:"melon",ph:["m","e","l","o","n"],img:"🍈",sentence:"Melon is cool and sweet!"},
    {word:"pear",ph:["p","air"],img:"🍐",sentence:"A pear is green and sweet!"},
    {word:"coconut",ph:["c","o","c","o","n","u","t"],img:"🥥",sentence:"Coconuts grow on palm trees!"},
    {word:"kiwi",ph:["k","ee","w","ee"],img:"🥝",sentence:"Kiwi is green inside!"},
    {word:"strawberry",ph:["s","t","r","or","b","e","r","ee"],img:"🍓",sentence:"Strawberries are red and sweet!"},
    {word:"pineapple",ph:["p","igh","n","a","p","l"],img:"🍍",sentence:"Pineapple is tropical and tangy!"},
    {word:"watermelon",ph:["w","or","t","er","m","e","l","o","n"],img:"🍉",sentence:"Watermelon is great in summer!"},
  
    {word:"guava",ph:["g","w","ar","v","a"],img:"🍈",sentence:"Guava is sweet and pink inside!"},
    {word:"fig",ph:["f","i","g"],img:"🍈",sentence:"Figs grow on trees!"},
    {word:"lime",ph:["l","igh","m"],img:"🍋",sentence:"Lime is green and sour!"},
    {word:"date",ph:["d","ai","t"],img:"🫘",sentence:"Dates are sweet brown fruits!"},
    {word:"papaya",ph:["p","a","p","igh","a"],img:"🥭",sentence:"Papaya is orange inside!"},
    {word:"apricot",ph:["ai","p","r","i","c","o","t"],img:"🍑",sentence:"Apricots are small and orange!"},
    {word:"avocado",ph:["a","v","o","c","a","d","o"],img:"🥑",sentence:"Avocado is green and creamy!"},
    {word:"blueberry",ph:["b","l","oo","b","e","r","ee"],img:"🫐",sentence:"Blueberries are tiny and sweet!"},
    {word:"raspberry",ph:["r","a","z","b","e","r","ee"],img:"🍓",sentence:"Raspberries are red and tangy!"},
    {word:"jackfruit",ph:["j","a","ck","f","r","oo","t"],img:"🍈",sentence:"Jackfruit is the biggest fruit!"},
  
    {word:"pomegranate",ph:["p","o","m","e","g","r","a","n","i","t"],img:"🍎",sentence:"Pomegranate has many seeds!"},
    {word:"dragonfruit",ph:["d","r","a","g","o","n","f","r","oo","t"],img:"🌺",sentence:"Dragonfruit is pink outside!"},
  ]},
  vegetables:{emoji:"🥬",color:"#16A34A",words:[
    {word:"carrot",ph:["c","a","r","o","t"],img:"🥕",sentence:"Rabbits love carrots!"},
    {word:"potato",ph:["p","o","t","ai","t","o"],img:"🥔",sentence:"Potatoes grow underground!"},
    {word:"onion",ph:["u","n","y","u","n"],img:"🧅",sentence:"Onions can make you cry!"},
    {word:"tomato",ph:["t","o","m","ai","t","o"],img:"🍅",sentence:"Tomatoes are red and round!"},
    {word:"pepper",ph:["p","e","p","er"],img:"🫑",sentence:"Peppers come in many colors!"},
    {word:"cabbage",ph:["c","a","b","i","j"],img:"🥬",sentence:"Cabbage is green and crunchy!"},
    {word:"pumpkin",ph:["p","u","m","p","k","i","n"],img:"🎃",sentence:"We carve pumpkins for fun!"},
    {word:"corn",ph:["c","or","n"],img:"🌽",sentence:"Corn on the cob is yummy!"},
    {word:"bean",ph:["b","ee","n"],img:"🫘",sentence:"Beans are good for you!"},
    {word:"spinach",ph:["s","p","i","n","i","ch"],img:"🥬",sentence:"Spinach makes you strong!"},
    {word:"broccoli",ph:["b","r","o","c","o","l","ee"],img:"🥦",sentence:"Broccoli looks like little trees!"},
    {word:"mushroom",ph:["m","u","sh","r","oo","m"],img:"🍄",sentence:"Mushrooms grow in the forest!"},
  
    {word:"garlic",ph:["g","ar","l","i","ck"],img:"🧄",sentence:"Garlic adds flavor to food!"},
    {word:"ginger",ph:["j","i","n","j","er"],img:"🫚",sentence:"Ginger is spicy and good for health!"},
    {word:"celery",ph:["s","e","l","er","ee"],img:"🥬",sentence:"Celery is crunchy and green!"},
    {word:"radish",ph:["r","a","d","i","sh"],img:"🫑",sentence:"A radish is red and round!"},
    {word:"turnip",ph:["t","ur","n","i","p"],img:"🥬",sentence:"Turnips grow underground!"},
    {word:"lettuce",ph:["l","e","t","i","s"],img:"🥬",sentence:"Lettuce goes in salad!"},
    {word:"zucchini",ph:["z","oo","k","ee","n","ee"],img:"🥒",sentence:"Zucchini is a long green veggie!"},
    {word:"beetroot",ph:["b","ee","t","r","oo","t"],img:"🟣",sentence:"Beetroot is purple and sweet!"},
  
    {word:"cucumber",ph:["c","y","oo","c","u","m","b","er"],img:"🥒",sentence:"Cucumber is cool and crunchy!"},
    {word:"peas",ph:["p","ee","z"],img:"🫛",sentence:"Peas are small and green!"},
    {word:"asparagus",ph:["a","s","p","a","r","a","g","u","s"],img:"🥬",sentence:"Asparagus is a green veggie!"},
  ]},
  nature:{emoji:"🌿",color:"#45B7D1",words:[
    {word:"sun",ph:["s","u","n"],img:"☀️",sentence:"The sun shines so bright!"},
    {word:"moon",ph:["m","oo","n"],img:"🌙",sentence:"The moon glows at night!"},
    {word:"rain",ph:["r","ai","n"],img:"🌧️",sentence:"Rain falls from clouds!"},
    {word:"tree",ph:["t","r","ee"],img:"🌳",sentence:"A tall tree grows leaves!"},
    {word:"rock",ph:["r","o","ck"],img:"🪨",sentence:"The rock is hard and grey!"},
    {word:"mud",ph:["m","u","d"],img:"🟤",sentence:"Mud is wet and sticky!"},
    {word:"bug",ph:["b","u","g"],img:"🐛",sentence:"A tiny bug crawled by!"},
    {word:"fog",ph:["f","o","g"],img:"🌫️",sentence:"Fog makes it misty!"},
    {word:"snow",ph:["s","n","ow"],img:"❄️",sentence:"Snow is cold and white!"},
    {word:"wind",ph:["w","i","n","d"],img:"💨",sentence:"The wind blows the leaves!"},
    {word:"star",ph:["s","t","ar"],img:"⭐",sentence:"Stars twinkle at night!"},
    {word:"cloud",ph:["c","l","ow","d"],img:"☁️",sentence:"Clouds float in the sky!"},
    {word:"river",ph:["r","i","v","er"],img:"🏞️",sentence:"The river flows to the sea!"},
    {word:"ocean",ph:["o","sh","a","n"],img:"🌊",sentence:"The ocean is very deep!"},
    {word:"mountain",ph:["m","ow","n","t","i","n"],img:"⛰️",sentence:"Mountains are very tall!"},
    {word:"flower",ph:["f","l","ow","er"],img:"🌸",sentence:"Flowers bloom in spring!"},
    {word:"leaf",ph:["l","ee","f"],img:"🍃",sentence:"A leaf falls from the tree!"},
    {word:"rainbow",ph:["r","ai","n","b","ow"],img:"🌈",sentence:"A rainbow has seven colors!"},
    {word:"forest",ph:["f","o","r","e","s","t"],img:"🌲",sentence:"The forest has many trees!"},
    {word:"volcano",ph:["v","o","l","c","ai","n","o"],img:"🌋",sentence:"A volcano can erupt with lava!"},
  
    {word:"lake",ph:["l","ai","k"],img:"🏞️",sentence:"The lake is calm and still!"},
    {word:"hill",ph:["h","i","l"],img:"⛰️",sentence:"We climbed up the hill!"},
    {word:"desert",ph:["d","e","z","er","t"],img:"🏜️",sentence:"The desert is hot and dry!"},
    {word:"island",ph:["igh","l","a","n","d"],img:"🏝️",sentence:"An island is land in the water!"},
    {word:"cave",ph:["c","ai","v"],img:"🕳️",sentence:"A cave is dark inside!"},
    {word:"garden",ph:["g","ar","d","e","n"],img:"🌻",sentence:"I grow flowers in my garden!"},
    {word:"seed",ph:["s","ee","d"],img:"🌱",sentence:"A seed grows into a plant!"},
    {word:"storm",ph:["s","t","or","m"],img:"⛈️",sentence:"A storm has thunder and lightning!"},
    {word:"ice",ph:["igh","s"],img:"🧊",sentence:"Ice is frozen water!"},
    {word:"fire",ph:["f","igh","er"],img:"🔥",sentence:"Fire is hot and orange!"},
  ]},
  body:{emoji:"🫀",color:"#EC4899",words:[
    {word:"eye",ph:["igh"],img:"👁️",sentence:"We see with our eyes!"},
    {word:"ear",ph:["ear"],img:"👂",sentence:"We hear with our ears!"},
    {word:"nose",ph:["n","o","z"],img:"👃",sentence:"We smell with our nose!"},
    {word:"hand",ph:["h","a","n","d"],img:"✋",sentence:"We have two hands!"},
    {word:"foot",ph:["f","oo","t"],img:"🦶",sentence:"We walk with our feet!"},
    {word:"head",ph:["h","e","d"],img:"🗣️",sentence:"My head is at the top!"},
    {word:"arm",ph:["ar","m"],img:"💪",sentence:"We have two strong arms!"},
    {word:"leg",ph:["l","e","g"],img:"🦵",sentence:"We run with our legs!"},
    {word:"teeth",ph:["t","ee","th"],img:"🦷",sentence:"Brush your teeth every day!"},
    {word:"lips",ph:["l","i","p","s"],img:"👄",sentence:"We smile with our lips!"},
    {word:"hair",ph:["h","air"],img:"💇",sentence:"I comb my hair every day!"},
    {word:"finger",ph:["f","i","ng","g","er"],img:"👆",sentence:"We have ten fingers!"},
    {word:"knee",ph:["n","ee"],img:"🦵",sentence:"We bend at the knee!"},
    {word:"heart",ph:["h","ar","t"],img:"❤️",sentence:"My heart beats all day!"},
    {word:"tongue",ph:["t","u","ng"],img:"👅",sentence:"We taste with our tongue!"},
    {word:"elbow",ph:["e","l","b","ow"],img:"💪",sentence:"My elbow helps me bend!"},
  
    {word:"tummy",ph:["t","u","m","ee"],img:"🫃",sentence:"My tummy feels hungry!"},
    {word:"thumb",ph:["th","u","m"],img:"👍",sentence:"Give a thumbs up!"},
    {word:"cheek",ph:["ch","ee","k"],img:"😊",sentence:"My cheeks turn red when I blush!"},
    {word:"chin",ph:["ch","i","n"],img:"🗣️",sentence:"My chin is below my mouth!"},
    {word:"neck",ph:["n","e","ck"],img:"🦒",sentence:"A giraffe has a long neck!"},
    {word:"back",ph:["b","a","ck"],img:"🔙",sentence:"Sit up straight for a healthy back!"},
    {word:"wrist",ph:["r","i","s","t"],img:"⌚",sentence:"I wear a watch on my wrist!"},
    {word:"ankle",ph:["a","n","k","l"],img:"🦶",sentence:"My ankle bends when I walk!"},
    {word:"brain",ph:["b","r","ai","n"],img:"🧠",sentence:"My brain helps me think!"},
    {word:"muscle",ph:["m","u","s","l"],img:"💪",sentence:"Exercise makes muscles strong!"},
  
    {word:"shoulder",ph:["sh","oa","l","d","er"],img:"💪",sentence:"My shoulders help me carry things!"},
    {word:"belly",ph:["b","e","l","ee"],img:"🫃",sentence:"My belly gets full after eating!"},
    {word:"skeleton",ph:["s","k","e","l","i","t","o","n"],img:"💀",sentence:"Our skeleton holds us up!"},
  ]},
  family:{emoji:"👨‍👩‍👧‍👦",color:"#F59E0B",words:[
    {word:"mom",ph:["m","o","m"],img:"👩",sentence:"Mom takes care of me!"},
    {word:"dad",ph:["d","a","d"],img:"👨",sentence:"Dad plays with me!"},
    {word:"baby",ph:["b","ai","b","ee"],img:"👶",sentence:"The baby is so cute!"},
    {word:"sister",ph:["s","i","s","t","er"],img:"👧",sentence:"My sister is my friend!"},
    {word:"brother",ph:["b","r","u","th","er"],img:"👦",sentence:"My brother plays with me!"},
    {word:"grandma",ph:["g","r","a","n","d","m","a"],img:"👵",sentence:"Grandma tells me stories!"},
    {word:"grandpa",ph:["g","r","a","n","d","p","a"],img:"👴",sentence:"Grandpa teaches me things!"},
    {word:"uncle",ph:["u","n","c","l"],img:"👨",sentence:"Uncle visits on weekends!"},
    {word:"aunt",ph:["a","n","t"],img:"👩",sentence:"Aunt brings me gifts!"},
    {word:"friend",ph:["f","r","e","n","d"],img:"🤝",sentence:"A friend is someone you like!"},
    {word:"teacher",ph:["t","ee","ch","er"],img:"👩‍🏫",sentence:"My teacher helps me learn!"},
    {word:"doctor",ph:["d","o","c","t","er"],img:"👩‍⚕️",sentence:"The doctor keeps us healthy!"},
  
    {word:"cousin",ph:["c","u","z","i","n"],img:"👦",sentence:"My cousin is my best friend!"},
    {word:"neighbor",ph:["n","ai","b","er"],img:"🏠",sentence:"My neighbor lives next door!"},
    {word:"pilot",ph:["p","igh","l","o","t"],img:"👨‍✈️",sentence:"The pilot flies the airplane!"},
    {word:"farmer",ph:["f","ar","m","er"],img:"👨‍🌾",sentence:"The farmer grows our food!"},
    {word:"chef",ph:["sh","e","f"],img:"👨‍🍳",sentence:"The chef makes yummy food!"},
    {word:"artist",ph:["ar","t","i","s","t"],img:"👩‍🎨",sentence:"An artist paints pictures!"},
    {word:"nurse",ph:["n","ur","s"],img:"👩‍⚕️",sentence:"The nurse takes care of us!"},
    {word:"police",ph:["p","o","l","ee","s"],img:"👮",sentence:"Police keep us safe!"},
    {word:"fireman",ph:["f","igh","er","m","a","n"],img:"👨‍🚒",sentence:"Firemen put out fires!"},
    {word:"dentist",ph:["d","e","n","t","i","s","t"],img:"🦷",sentence:"The dentist checks our teeth!"},
  ]},
  clothes:{emoji:"👕",color:"#6C5CE7",words:[
    {word:"hat",ph:["h","a","t"],img:"🎩",sentence:"I wear a hat on my head!"},
    {word:"shoe",ph:["sh","oo"],img:"👟",sentence:"I put shoes on my feet!"},
    {word:"sock",ph:["s","o","ck"],img:"🧦",sentence:"Socks keep my feet warm!"},
    {word:"coat",ph:["c","oa","t"],img:"🧥",sentence:"I wear a coat when it is cold!"},
    {word:"dress",ph:["d","r","e","s"],img:"👗",sentence:"The dress is very pretty!"},
    {word:"shirt",ph:["sh","ir","t"],img:"👕",sentence:"My shirt is blue!"},
    {word:"pants",ph:["p","a","n","t","s"],img:"👖",sentence:"I wear pants every day!"},
    {word:"scarf",ph:["s","c","ar","f"],img:"🧣",sentence:"A scarf keeps me warm!"},
    {word:"gloves",ph:["g","l","u","v","z"],img:"🧤",sentence:"Gloves warm my hands!"},
    {word:"boots",ph:["b","oo","t","s"],img:"👢",sentence:"Boots are for rainy days!"},
    {word:"belt",ph:["b","e","l","t"],img:"🪢",sentence:"A belt holds my pants up!"},
    {word:"cap",ph:["c","a","p"],img:"🧢",sentence:"I love my red cap!"},
  
    {word:"jacket",ph:["j","a","ck","i","t"],img:"🧥",sentence:"A jacket keeps me warm outside!"},
    {word:"sweater",ph:["s","w","e","t","er"],img:"🧶",sentence:"My sweater is cozy and soft!"},
    {word:"sandal",ph:["s","a","n","d","a","l"],img:"🩴",sentence:"I wear sandals in summer!"},
    {word:"uniform",ph:["y","oo","n","i","f","or","m"],img:"👔",sentence:"I wear a uniform to school!"},
    {word:"helmet",ph:["h","e","l","m","i","t"],img:"⛑️",sentence:"A helmet protects my head!"},
    {word:"raincoat",ph:["r","ai","n","c","oa","t"],img:"🧥",sentence:"A raincoat keeps me dry!"},
    {word:"apron",ph:["ai","p","r","u","n"],img:"🧑‍🍳",sentence:"Wear an apron when cooking!"},
    {word:"tie",ph:["t","igh"],img:"👔",sentence:"Dad wears a tie to work!"},
  
    {word:"pajamas",ph:["p","a","j","ar","m","a","z"],img:"🛌",sentence:"I wear pajamas to sleep!"},
    {word:"hoodie",ph:["h","oo","d","ee"],img:"🧥",sentence:"My hoodie has a hood!"},
    {word:"goggles",ph:["g","o","g","l","z"],img:"🥽",sentence:"Goggles protect my eyes!"},
  ]},
  transport:{emoji:"🚗",color:"#0EA5E9",words:[
    {word:"car",ph:["c","ar"],img:"🚗",sentence:"The car goes vroom!"},
    {word:"bus",ph:["b","u","s"],img:"🚌",sentence:"The bus takes me to school!"},
    {word:"van",ph:["v","a","n"],img:"🚐",sentence:"The van drives fast!"},
    {word:"boat",ph:["b","oa","t"],img:"⛵",sentence:"A boat sails on water!"},
    {word:"ship",ph:["sh","i","p"],img:"🚢",sentence:"A big ship crosses the ocean!"},
    {word:"train",ph:["t","r","ai","n"],img:"🚂",sentence:"The train goes choo choo!"},
    {word:"plane",ph:["p","l","ai","n"],img:"✈️",sentence:"A plane flies in the sky!"},
    {word:"bike",ph:["b","igh","k"],img:"🚲",sentence:"I ride my bike to the park!"},
    {word:"taxi",ph:["t","a","x","ee"],img:"🚕",sentence:"A taxi takes you places!"},
    {word:"truck",ph:["t","r","u","ck"],img:"🚛",sentence:"The truck carries big loads!"},
    {word:"rocket",ph:["r","o","ck","i","t"],img:"🚀",sentence:"A rocket goes to space!"},
    {word:"helicopter",ph:["h","e","l","i","c","o","p","t","er"],img:"🚁",sentence:"A helicopter flies up high!"},
  
    {word:"scooter",ph:["s","c","oo","t","er"],img:"🛴",sentence:"I ride my scooter to the park!"},
    {word:"subway",ph:["s","u","b","w","ai"],img:"🚇",sentence:"The subway goes underground!"},
    {word:"ferry",ph:["f","e","r","ee"],img:"⛴️",sentence:"A ferry carries people on water!"},
    {word:"ambulance",ph:["a","m","b","u","l","a","n","s"],img:"🚑",sentence:"An ambulance helps sick people!"},
    {word:"tractor",ph:["t","r","a","c","t","er"],img:"🚜",sentence:"A tractor works on the farm!"},
    {word:"canoe",ph:["c","a","n","oo"],img:"🛶",sentence:"We paddle the canoe on the river!"},
    {word:"bicycle",ph:["b","igh","s","i","c","l"],img:"🚲",sentence:"I ride my bicycle to school!"},
    {word:"motorcycle",ph:["m","o","t","er","s","igh","c","l"],img:"🏍️",sentence:"A motorcycle goes vroom!"},
  
    {word:"balloon",ph:["b","a","l","oo","n"],img:"🎈",sentence:"A hot air balloon floats in the sky!"},
    {word:"spaceship",ph:["s","p","ai","s","sh","i","p"],img:"🚀",sentence:"A spaceship goes to the stars!"},
    {word:"submarine",ph:["s","u","b","m","a","r","ee","n"],img:"🚢",sentence:"A submarine goes under water!"},
  ]},
  school:{emoji:"🏫",color:"#6C5CE7",words:[
    {word:"book",ph:["b","oo","k"],img:"📚",sentence:"I read a book every day!"},
    {word:"pen",ph:["p","e","n"],img:"🖊️",sentence:"I write with my pen!"},
    {word:"bag",ph:["b","a","g"],img:"🎒",sentence:"My bag has all my things!"},
    {word:"desk",ph:["d","e","s","k"],img:"🪑",sentence:"I sit at my desk to learn!"},
    {word:"bell",ph:["b","e","l"],img:"🔔",sentence:"The bell rings for class!"},
    {word:"chalk",ph:["ch","or","k"],img:"🖍️",sentence:"The teacher writes with chalk!"},
    {word:"ruler",ph:["r","oo","l","er"],img:"📏",sentence:"A ruler measures things!"},
    {word:"pencil",ph:["p","e","n","s","i","l"],img:"✏️",sentence:"I draw with my pencil!"},
    {word:"paper",ph:["p","ai","p","er"],img:"📄",sentence:"I write on paper!"},
    {word:"eraser",ph:["i","r","ai","z","er"],img:"🧽",sentence:"An eraser fixes mistakes!"},
    {word:"clock",ph:["c","l","o","ck"],img:"🕐",sentence:"The clock tells us the time!"},
    {word:"globe",ph:["g","l","o","b"],img:"🌍",sentence:"A globe shows the whole world!"},
  
    {word:"crayon",ph:["c","r","ai","o","n"],img:"🖍️",sentence:"I color with crayons!"},
    {word:"glue",ph:["g","l","oo"],img:"🧴",sentence:"Glue sticks things together!"},
    {word:"scissors",ph:["s","i","z","er","z"],img:"✂️",sentence:"Cut paper with scissors!"},
    {word:"paint",ph:["p","ai","n","t"],img:"🎨",sentence:"I paint pictures at school!"},
    {word:"homework",ph:["h","o","m","w","ur","k"],img:"📝",sentence:"I do my homework every day!"},
    {word:"exam",ph:["i","g","z","a","m"],img:"📋",sentence:"I study hard for exams!"},
    {word:"library",ph:["l","igh","b","r","er","ee"],img:"📚",sentence:"I borrow books from the library!"},
    {word:"playground",ph:["p","l","ai","g","r","ow","n","d"],img:"🛝",sentence:"I play on the playground!"},
    {word:"blackboard",ph:["b","l","a","ck","b","or","d"],img:"📋",sentence:"The teacher writes on the blackboard!"},
    {word:"lunch",ph:["l","u","n","ch"],img:"🍱",sentence:"I eat lunch at school!"},
  
    {word:"computer",ph:["c","o","m","p","y","oo","t","er"],img:"💻",sentence:"I learn on the computer!"},
    {word:"science",ph:["s","igh","e","n","s"],img:"🔬",sentence:"Science helps us understand the world!"},
    {word:"history",ph:["h","i","s","t","o","r","ee"],img:"📜",sentence:"History tells us about the past!"},
  ]},
  sports:{emoji:"⚽",color:"#EF4444",words:[
    {word:"ball",ph:["b","or","l"],img:"⚽",sentence:"We kick the ball!"},
    {word:"bat",ph:["b","a","t"],img:"🏏",sentence:"Hit the ball with the bat!"},
    {word:"run",ph:["r","u","n"],img:"🏃",sentence:"I run very fast!"},
    {word:"swim",ph:["s","w","i","m"],img:"🏊",sentence:"I swim in the pool!"},
    {word:"jump",ph:["j","u","m","p"],img:"🤸",sentence:"I can jump very high!"},
    {word:"kick",ph:["k","i","ck"],img:"🦶",sentence:"Kick the football hard!"},
    {word:"goal",ph:["g","oa","l"],img:"🥅",sentence:"I scored a goal!"},
    {word:"race",ph:["r","ai","s"],img:"🏁",sentence:"Ready, set, race!"},
    {word:"tennis",ph:["t","e","n","i","s"],img:"🎾",sentence:"Tennis is fun to play!"},
    {word:"cricket",ph:["c","r","i","ck","i","t"],img:"🏏",sentence:"Cricket is a great sport!"},
    {word:"football",ph:["f","oo","t","b","or","l"],img:"⚽",sentence:"Football is played all over the world!"},
    {word:"hockey",ph:["h","o","ck","ee"],img:"🏑",sentence:"Hockey is fast and exciting!"},
    {word:"yoga",ph:["y","o","g","a"],img:"🧘",sentence:"Yoga keeps us flexible!"},
    {word:"dance",ph:["d","a","n","s"],img:"💃",sentence:"I love to dance to music!"},
    {word:"basketball",ph:["b","a","s","k","i","t","b","or","l"],img:"🏀",sentence:"Throw the basketball in the hoop!"},
  
    {word:"catch",ph:["c","a","ch"],img:"🤾",sentence:"Catch the ball with both hands!"},
    {word:"throw",ph:["th","r","ow"],img:"🤾",sentence:"Throw the ball to me!"},
    {word:"score",ph:["s","c","or"],img:"🎯",sentence:"I scored ten points!"},
    {word:"medal",ph:["m","e","d","a","l"],img:"🏅",sentence:"I won a gold medal!"},
    {word:"trophy",ph:["t","r","o","f","ee"],img:"🏆",sentence:"The winner gets a trophy!"},
    {word:"boxing",ph:["b","o","x","i","ng"],img:"🥊",sentence:"Boxing needs strong arms!"},
    {word:"surfing",ph:["s","ur","f","i","ng"],img:"🏄",sentence:"Surfing on big waves is fun!"},
    {word:"skiing",ph:["s","k","ee","i","ng"],img:"⛷️",sentence:"Skiing on snow is exciting!"},
    {word:"archery",ph:["ar","ch","er","ee"],img:"🏹",sentence:"Archery needs a steady hand!"},
    {word:"gym",ph:["j","i","m"],img:"🏋️",sentence:"I exercise at the gym!"},
    {word:"wrestling",ph:["r","e","s","l","i","ng"],img:"🤼",sentence:"Wrestling needs strength!"},
    {word:"cycling",ph:["s","igh","c","l","i","ng"],img:"🚴",sentence:"Cycling is great exercise!"},
    {word:"skating",ph:["s","c","ai","t","i","ng"],img:"⛸️",sentence:"Ice skating is slippery fun!"},
    {word:"karate",ph:["c","a","r","a","t","ee"],img:"🥋",sentence:"Karate is a martial art!"},
    {word:"badminton",ph:["b","a","d","m","i","n","t","o","n"],img:"🏸",sentence:"Hit the shuttlecock in badminton!"},
  ]},
  countries:{emoji:"🌍",color:"#14B8A6",words:[
    {word:"India",ph:["i","n","d","ee","a"],img:"🇮🇳",sentence:"India is a beautiful country!"},
    {word:"America",ph:["a","m","e","r","i","c","a"],img:"🇺🇸",sentence:"America has 50 states!"},
    {word:"China",ph:["ch","igh","n","a"],img:"🇨🇳",sentence:"China has the Great Wall!"},
    {word:"Japan",ph:["j","a","p","a","n"],img:"🇯🇵",sentence:"Japan is the land of the rising sun!"},
    {word:"France",ph:["f","r","a","n","s"],img:"🇫🇷",sentence:"France has the Eiffel Tower!"},
    {word:"Brazil",ph:["b","r","a","z","i","l"],img:"🇧🇷",sentence:"Brazil loves football!"},
    {word:"Egypt",ph:["ee","j","i","p","t"],img:"🇪🇬",sentence:"Egypt has the pyramids!"},
    {word:"England",ph:["i","n","g","l","a","n","d"],img:"🇬🇧",sentence:"England has Big Ben!"},
    {word:"Canada",ph:["c","a","n","a","d","a"],img:"🇨🇦",sentence:"Canada has beautiful mountains!"},
    {word:"Australia",ph:["o","s","t","r","ai","l","ee","a"],img:"🇦🇺",sentence:"Australia has kangaroos!"},
    {word:"Italy",ph:["i","t","a","l","ee"],img:"🇮🇹",sentence:"Italy is famous for pizza!"},
    {word:"Spain",ph:["s","p","ai","n"],img:"🇪🇸",sentence:"Spain has beautiful beaches!"},
    {word:"Germany",ph:["j","er","m","a","n","ee"],img:"🇩🇪",sentence:"Germany makes great cars!"},
    {word:"Russia",ph:["r","u","sh","a"],img:"🇷🇺",sentence:"Russia is the biggest country!"},
    {word:"Kenya",ph:["k","e","n","y","a"],img:"🇰🇪",sentence:"Kenya has amazing wildlife!"},
  
    {word:"Mexico",ph:["m","e","x","i","c","o"],img:"🇲🇽",sentence:"Mexico has yummy tacos!"},
    {word:"Korea",ph:["c","o","r","ee","a"],img:"🇰🇷",sentence:"Korea has K-pop music!"},
    {word:"Thailand",ph:["t","igh","l","a","n","d"],img:"🇹🇭",sentence:"Thailand has beautiful temples!"},
    {word:"Turkey",ph:["t","ur","k","ee"],img:"🇹🇷",sentence:"Turkey connects two continents!"},
    {word:"Greece",ph:["g","r","ee","s"],img:"🇬🇷",sentence:"Greece has the Olympics!"},
    {word:"Sweden",ph:["s","w","ee","d","e","n"],img:"🇸🇪",sentence:"Sweden has the Northern Lights!"},
    {word:"Nepal",ph:["n","e","p","or","l"],img:"🇳🇵",sentence:"Nepal has Mount Everest!"},
    {word:"Vietnam",ph:["v","ee","e","t","n","a","m"],img:"🇻🇳",sentence:"Vietnam has beautiful rice fields!"},
    {word:"Peru",ph:["p","e","r","oo"],img:"🇵🇪",sentence:"Peru has Machu Picchu!"},
    {word:"Nigeria",ph:["n","igh","j","ear","ee","a"],img:"🇳🇬",sentence:"Nigeria is in Africa!"},
  
    {word:"Singapore",ph:["s","i","ng","a","p","or"],img:"🇸🇬",sentence:"Singapore is a tiny country!"},
    {word:"Ireland",ph:["igh","er","l","a","n","d"],img:"🇮🇪",sentence:"Ireland is green and beautiful!"},
    {word:"Colombia",ph:["c","o","l","o","m","b","ee","a"],img:"🇨🇴",sentence:"Colombia has amazing coffee!"},
  ]},
  actions:{emoji:"🏃",color:"#F97316",words:[
    {word:"eat",ph:["ee","t"],img:"🍽️",sentence:"I eat my food!"},
    {word:"drink",ph:["d","r","i","n","k"],img:"🥤",sentence:"I drink water every day!"},
    {word:"sleep",ph:["s","l","ee","p"],img:"😴",sentence:"I sleep at night!"},
    {word:"read",ph:["r","ee","d"],img:"📖",sentence:"I read books every day!"},
    {word:"write",ph:["r","igh","t"],img:"✍️",sentence:"I write in my notebook!"},
    {word:"sing",ph:["s","i","ng"],img:"🎤",sentence:"I love to sing songs!"},
    {word:"draw",ph:["d","r","or"],img:"🖍️",sentence:"I draw pictures with colors!"},
    {word:"play",ph:["p","l","ai"],img:"🎮",sentence:"I play with my friends!"},
    {word:"cook",ph:["c","oo","k"],img:"👩‍🍳",sentence:"Mom can cook tasty food!"},
    {word:"wash",ph:["w","o","sh"],img:"🧼",sentence:"Wash your hands with soap!"},
    {word:"climb",ph:["c","l","igh","m"],img:"🧗",sentence:"I climb the big tree!"},
    {word:"fly",ph:["f","l","igh"],img:"🦅",sentence:"Birds can fly in the sky!"},
    {word:"paint",ph:["p","ai","n","t"],img:"🎨",sentence:"I paint beautiful pictures!"},
    {word:"clap",ph:["c","l","a","p"],img:"👏",sentence:"Clap your hands together!"},
    {word:"laugh",ph:["l","a","f"],img:"😂",sentence:"I laugh when I am happy!"},
  
    {word:"walk",ph:["w","or","k"],img:"🚶",sentence:"I walk to school!"},
    {word:"talk",ph:["t","or","k"],img:"🗣️",sentence:"I talk to my friends!"},
    {word:"smile",ph:["s","m","igh","l"],img:"😊",sentence:"Smile and be happy!"},
    {word:"cry",ph:["c","r","igh"],img:"😢",sentence:"It is okay to cry sometimes."},
    {word:"hug",ph:["h","u","g"],img:"🤗",sentence:"I hug my mom!"},
    {word:"build",ph:["b","i","l","d"],img:"🏗️",sentence:"I build with blocks!"},
    {word:"share",ph:["sh","air"],img:"🤝",sentence:"Share your toys with friends!"},
    {word:"think",ph:["th","i","n","k"],img:"🤔",sentence:"Think before you speak!"},
    {word:"help",ph:["h","e","l","p"],img:"🤲",sentence:"I help my parents!"},
    {word:"listen",ph:["l","i","s","e","n"],img:"👂",sentence:"Listen to your teacher!"},
    {word:"grow",ph:["g","r","ow"],img:"🌱",sentence:"Plants grow from seeds!"},
    {word:"push",ph:["p","oo","sh"],img:"🫸",sentence:"Push the door open!"},
    {word:"pull",ph:["p","oo","l"],img:"🫷",sentence:"Pull the rope hard!"},
    {word:"hide",ph:["h","igh","d"],img:"🫣",sentence:"Let us play hide and seek!"},
    {word:"wave",ph:["w","ai","v"],img:"👋",sentence:"Wave hello to your friend!"},
  ]},
  feelings:{emoji:"😊",color:"#A855F7",words:[
    {word:"happy",ph:["h","a","p","ee"],img:"😊",sentence:"I feel happy today!"},
    {word:"sad",ph:["s","a","d"],img:"😢",sentence:"Sometimes I feel sad."},
    {word:"angry",ph:["a","ng","r","ee"],img:"😠",sentence:"Take a deep breath when angry!"},
    {word:"scared",ph:["s","c","air","d"],img:"😨",sentence:"The dark can be scary!"},
    {word:"brave",ph:["b","r","ai","v"],img:"💪",sentence:"Be brave and try new things!"},
    {word:"kind",ph:["k","igh","n","d"],img:"🤗",sentence:"Always be kind to others!"},
    {word:"tired",ph:["t","igh","er","d"],img:"😴",sentence:"I am tired after playing!"},
    {word:"hungry",ph:["h","u","ng","r","ee"],img:"🤤",sentence:"I am hungry for lunch!"},
    {word:"excited",ph:["e","x","igh","t","i","d"],img:"🤩",sentence:"I am excited for my birthday!"},
    {word:"proud",ph:["p","r","ow","d"],img:"🏆",sentence:"I am proud of my work!"},
    {word:"shy",ph:["sh","igh"],img:"😳",sentence:"It is okay to be shy!"},
    {word:"calm",ph:["c","ar","m"],img:"😌",sentence:"Take a deep breath to be calm!"},
  
    {word:"love",ph:["l","u","v"],img:"❤️",sentence:"I love my family!"},
    {word:"hope",ph:["h","oa","p"],img:"🌈",sentence:"Hope makes us feel better!"},
    {word:"worry",ph:["w","u","r","ee"],img:"😟",sentence:"Do not worry, everything will be fine!"},
    {word:"joy",ph:["j","oi"],img:"🎉",sentence:"Joy means feeling very happy!"},
    {word:"lonely",ph:["l","o","n","l","ee"],img:"😔",sentence:"A friend helps when you feel lonely!"},
    {word:"curious",ph:["c","y","oo","r","ee","u","s"],img:"🔍",sentence:"Be curious and ask questions!"},
    {word:"thankful",ph:["th","a","n","k","f","u","l"],img:"🙏",sentence:"I am thankful for my family!"},
    {word:"patient",ph:["p","ai","sh","e","n","t"],img:"⏳",sentence:"Be patient and wait your turn!"},
  ]},
  things:{emoji:"🎒",color:"#6C5CE7",words:[
    {word:"cup",ph:["c","u","p"],img:"☕",sentence:"My cup is full of milk!"},
    {word:"bed",ph:["b","e","d"],img:"🛏️",sentence:"I sleep in my cozy bed!"},
    {word:"box",ph:["b","o","x"],img:"📦",sentence:"What is in the box?"},
    {word:"map",ph:["m","a","p"],img:"🗺️",sentence:"The map shows the way!"},
    {word:"key",ph:["k","ee"],img:"🔑",sentence:"A key opens the door!"},
    {word:"door",ph:["d","or"],img:"🚪",sentence:"Open the door please!"},
    {word:"lamp",ph:["l","a","m","p"],img:"💡",sentence:"The lamp lights the room!"},
    {word:"chair",ph:["ch","air"],img:"🪑",sentence:"I sit on a chair!"},
    {word:"table",ph:["t","ai","b","l"],img:"🪑",sentence:"We eat at the table!"},
    {word:"phone",ph:["f","oa","n"],img:"📱",sentence:"I call on the phone!"},
    {word:"watch",ph:["w","o","ch"],img:"⌚",sentence:"My watch tells the time!"},
    {word:"mirror",ph:["m","i","r","or"],img:"🪞",sentence:"I see myself in the mirror!"},
    {word:"umbrella",ph:["u","m","b","r","e","l","a"],img:"☂️",sentence:"An umbrella keeps me dry!"},
    {word:"camera",ph:["c","a","m","r","a"],img:"📷",sentence:"A camera takes pictures!"},
    {word:"candle",ph:["c","a","n","d","l"],img:"🕯️",sentence:"A candle gives soft light!"},
  
    {word:"ball",ph:["b","or","l"],img:"🏐",sentence:"The ball bounces high!"},
    {word:"kite",ph:["k","igh","t"],img:"🪁",sentence:"My kite flies in the wind!"},
    {word:"drum",ph:["d","r","u","m"],img:"🥁",sentence:"I bang the drum loud!"},
    {word:"bell",ph:["b","e","l"],img:"🔔",sentence:"The bell rings ding dong!"},
    {word:"gift",ph:["g","i","f","t"],img:"🎁",sentence:"I got a gift for my birthday!"},
    {word:"robot",ph:["r","o","b","o","t"],img:"🤖",sentence:"The robot can dance!"},
    {word:"teddy",ph:["t","e","d","ee"],img:"🧸",sentence:"I hug my teddy bear!"},
    {word:"puzzle",ph:["p","u","z","l"],img:"🧩",sentence:"I love solving puzzles!"},
    {word:"crown",ph:["c","r","ow","n"],img:"👑",sentence:"The king wears a crown!"},
    {word:"flag",ph:["f","l","a","g"],img:"🏁",sentence:"The flag waves in the wind!"},
    {word:"wheel",ph:["wh","ee","l"],img:"☸️",sentence:"A wheel goes round and round!"},
    {word:"star",ph:["s","t","ar"],img:"⭐",sentence:"I got a gold star!"},
    {word:"sword",ph:["s","or","d"],img:"⚔️",sentence:"Knights carry swords!"},
    {word:"castle",ph:["c","a","s","l"],img:"🏰",sentence:"The castle has tall towers!"},
    {word:"rocket",ph:["r","o","ck","i","t"],img:"🚀",sentence:"The rocket zooms to space!"},
  ]},
  math:{emoji:"➕",color:"#3B82F6",words:[
    {word:"add",ph:["a","d"],img:"➕",sentence:"Add means to put together!"},
    {word:"minus",ph:["m","igh","n","u","s"],img:"➖",sentence:"Minus means take away!"},
    {word:"equal",ph:["ee","q","a","l"],img:"🟰",sentence:"Equal means the same!"},
    {word:"plus",ph:["p","l","u","s"],img:"➕",sentence:"Two plus two is four!"},
    {word:"zero",ph:["z","ear","o"],img:"0️⃣",sentence:"Zero means nothing!"},
    {word:"half",ph:["h","ar","f"],img:"½",sentence:"Half means two equal parts!"},
    {word:"double",ph:["d","u","b","l"],img:"✖️",sentence:"Double means two times!"},
    {word:"count",ph:["c","ow","n","t"],img:"🔢",sentence:"Let us count to ten!"},
    {word:"sum",ph:["s","u","m"],img:"🧮",sentence:"The sum is the answer!"},
    {word:"number",ph:["n","u","m","b","er"],img:"🔢",sentence:"A number tells how many!"},
    {word:"first",ph:["f","ir","s","t"],img:"🥇",sentence:"I came first in the race!"},
    {word:"second",ph:["s","e","c","o","n","d"],img:"🥈",sentence:"She came second!"},
    {word:"third",ph:["th","ir","d"],img:"🥉",sentence:"He came third!"},
    {word:"ten",ph:["t","e","n"],img:"🔟",sentence:"I have ten fingers!"},
    {word:"hundred",ph:["h","u","n","d","r","e","d"],img:"💯",sentence:"A hundred is a big number!"},
  
    {word:"square",ph:["s","q","air"],img:"⬜",sentence:"A square has four equal sides!"},
    {word:"circle",ph:["s","ir","c","l"],img:"⭕",sentence:"A circle is round!"},
    {word:"triangle",ph:["t","r","igh","a","ng","l"],img:"🔺",sentence:"A triangle has three sides!"},
    {word:"bigger",ph:["b","i","g","er"],img:"📏",sentence:"An elephant is bigger than a cat!"},
    {word:"smaller",ph:["s","m","or","l","er"],img:"📏",sentence:"A mouse is smaller than a dog!"},
    {word:"tall",ph:["t","or","l"],img:"📐",sentence:"The giraffe is very tall!"},
    {word:"short",ph:["sh","or","t"],img:"📐",sentence:"The ant is very short!"},
    {word:"long",ph:["l","o","ng"],img:"📏",sentence:"A snake is very long!"},
    {word:"heavy",ph:["h","e","v","ee"],img:"⚖️",sentence:"The elephant is heavy!"},
    {word:"light",ph:["l","igh","t"],img:"⚖️",sentence:"A feather is very light!"},
    {word:"more",ph:["m","or"],img:"➕",sentence:"I want more apples!"},
    {word:"less",ph:["l","e","s"],img:"➖",sentence:"Less sugar is healthier!"},
  ]},

  places:{emoji:"🏛️",color:"#0891B2",words:[
    {word:"home",ph:["h","oa","m"],img:"🏠",sentence:"Home is where the heart is!"},
    {word:"park",ph:["p","ar","k"],img:"🏞️",sentence:"I play in the park!"},
    {word:"beach",ph:["b","ee","ch"],img:"🏖️",sentence:"The beach has sand and waves!"},
    {word:"zoo",ph:["z","oo"],img:"🦁",sentence:"I see animals at the zoo!"},
    {word:"farm",ph:["f","ar","m"],img:"🌾",sentence:"A farm grows food!"},
    {word:"shop",ph:["sh","o","p"],img:"🏪",sentence:"We buy things at the shop!"},
    {word:"bank",ph:["b","a","n","k"],img:"🏦",sentence:"A bank keeps money safe!"},
    {word:"airport",ph:["air","p","or","t"],img:"✈️",sentence:"Planes take off from airports!"},
    {word:"hospital",ph:["h","o","s","p","i","t","a","l"],img:"🏥",sentence:"Doctors work at the hospital!"},
    {word:"museum",ph:["m","y","oo","z","ee","u","m"],img:"🏛️",sentence:"I learn at the museum!"},
    {word:"cinema",ph:["s","i","n","e","m","a"],img:"🎬",sentence:"We watch movies at the cinema!"},
    {word:"temple",ph:["t","e","m","p","l"],img:"🛕",sentence:"We pray at the temple!"},
    {word:"market",ph:["m","ar","k","i","t"],img:"🏬",sentence:"Buy fruits at the market!"},
    {word:"school",ph:["s","c","oo","l"],img:"🏫",sentence:"I learn at school!"},
    {word:"stadium",ph:["s","t","ai","d","ee","u","m"],img:"🏟️",sentence:"We watch games at the stadium!"},
    {word:"church",ph:["ch","ur","ch"],img:"⛪",sentence:"The church has a bell tower!"},
    {word:"bridge",ph:["b","r","i","j"],img:"🌉",sentence:"A bridge crosses the river!"},
    {word:"tower",ph:["t","ow","er"],img:"🗼",sentence:"The tower is very tall!"},
    {word:"castle",ph:["c","a","s","l"],img:"🏰",sentence:"A castle has big walls!"},
    {word:"lighthouse",ph:["l","igh","t","h","ow","s"],img:"🗼",sentence:"The lighthouse guides ships at night!"},
  ]},
  music:{emoji:"🎵",color:"#D946EF",words:[
    {word:"drum",ph:["d","r","u","m"],img:"🥁",sentence:"Bang the drum to the beat!"},
    {word:"flute",ph:["f","l","oo","t"],img:"🪈",sentence:"The flute makes soft music!"},
    {word:"piano",ph:["p","ee","a","n","o"],img:"🎹",sentence:"I play the piano!"},
    {word:"guitar",ph:["g","i","t","ar"],img:"🎸",sentence:"Strum the guitar strings!"},
    {word:"violin",ph:["v","igh","o","l","i","n"],img:"🎻",sentence:"The violin makes beautiful sounds!"},
    {word:"song",ph:["s","o","ng"],img:"🎵",sentence:"I sing a happy song!"},
    {word:"music",ph:["m","y","oo","z","i","ck"],img:"🎶",sentence:"Music makes me happy!"},
    {word:"dance",ph:["d","a","n","s"],img:"💃",sentence:"I dance to the music!"},
    {word:"beat",ph:["b","ee","t"],img:"🥁",sentence:"Clap to the beat!"},
    {word:"sing",ph:["s","i","ng"],img:"🎤",sentence:"Let us all sing together!"},
    {word:"trumpet",ph:["t","r","u","m","p","i","t"],img:"🎺",sentence:"The trumpet is loud and bold!"},
    {word:"bell",ph:["b","e","l"],img:"🔔",sentence:"Ring the bell for music class!"},
    {word:"harp",ph:["h","ar","p"],img:"🎵",sentence:"The harp has many strings!"},
    {word:"band",ph:["b","a","n","d"],img:"🎷",sentence:"The band plays at the parade!"},
    {word:"choir",ph:["q","igh","er"],img:"🎵",sentence:"The choir sings beautifully!"},
    {word:"rhythm",ph:["r","i","th","m"],img:"🎶",sentence:"Feel the rhythm in your feet!"},
    {word:"melody",ph:["m","e","l","o","d","ee"],img:"🎵",sentence:"A melody is a nice tune!"},
    {word:"concert",ph:["c","o","n","s","er","t"],img:"🎤",sentence:"We went to a concert!"},
    {word:"note",ph:["n","oa","t"],img:"🎵",sentence:"Each note has a different sound!"},
    {word:"harmony",ph:["h","ar","m","o","n","ee"],img:"🎶",sentence:"Harmony is sounds blending together!"},
  ]},
sight:{emoji:"👁️",color:"#6C5CE7",words:[
    {word:"the",ph:["th","e"],img:"👆",sentence:"The dog is happy!"},
    {word:"and",ph:["a","n","d"],img:"🤝",sentence:"Bread and jam taste good!"},
    {word:"is",ph:["i","z"],img:"✅",sentence:"My cat is very soft!"},
    {word:"it",ph:["i","t"],img:"👉",sentence:"Look at it go fast!"},
    {word:"in",ph:["i","n"],img:"📥",sentence:"The toy is in the box!"},
    {word:"he",ph:["h","ee"],img:"👦",sentence:"He can run very fast!"},
    {word:"she",ph:["sh","ee"],img:"👧",sentence:"She loves to read books!"},
    {word:"we",ph:["w","ee"],img:"👫",sentence:"We play in the park!"},
    {word:"my",ph:["m","igh"],img:"🙋",sentence:"This is my red ball!"},
    {word:"you",ph:["y","oo"],img:"🫵",sentence:"Can you see the bird?"},
    {word:"can",ph:["c","a","n"],img:"💪",sentence:"I can jump so high!"},
    {word:"see",ph:["s","ee"],img:"👀",sentence:"I see a rainbow outside!"},
    {word:"go",ph:["g","oa"],img:"🏃",sentence:"Let us go to the park!"},
    {word:"up",ph:["u","p"],img:"⬆️",sentence:"The kite went up high!"},
    {word:"yes",ph:["y","e","s"],img:"👍",sentence:"Yes I want some cake!"},
    {word:"no",ph:["n","oa"],img:"🙅",sentence:"No thank you I am full!"},
    {word:"am",ph:["a","m"],img:"😊",sentence:"I am a good helper!"},
    {word:"at",ph:["a","t"],img:"📍",sentence:"I am at home today!"},
    {word:"on",ph:["o","n"],img:"🔛",sentence:"The cup is on the table!"},
    {word:"was",ph:["w","o","z"],img:"⏪",sentence:"It was a sunny day!"},
    {word:"his",ph:["h","i","z"],img:"👤",sentence:"That is his blue hat!"},
    {word:"her",ph:["h","er"],img:"👩",sentence:"I gave her a flower!"},
    {word:"all",ph:["or","l"],img:"🌍",sentence:"We all love ice cream!"},
    {word:"but",ph:["b","u","t"],img:"🔄",sentence:"I like cake but not pie!"},
    {word:"not",ph:["n","o","t"],img:"❌",sentence:"I am not tired yet!"},
    {word:"got",ph:["g","o","t"],img:"🎁",sentence:"I got a new toy today!"},
    {word:"did",ph:["d","i","d"],img:"✔️",sentence:"I did my homework first!"},
    {word:"say",ph:["s","ai"],img:"🗣️",sentence:"What did you say to me?"},
    {word:"has",ph:["h","a","z"],img:"🤲",sentence:"My dad has a red car!"},
    {word:"had",ph:["h","a","d"],img:"📦",sentence:"She had a big smile!"},
    {word:"put",ph:["p","oo","t"],img:"📥",sentence:"Put the book on the shelf!"},
    {word:"let",ph:["l","e","t"],img:"🚪",sentence:"Let me help you with that!"},
    {word:"out",ph:["ow","t"],img:"🚪",sentence:"The cat went out the door!"},
    {word:"new",ph:["n","oo"],img:"✨",sentence:"I got new shoes today!"},
    {word:"old",ph:["oa","l","d"],img:"👴",sentence:"My teddy is very old!"},
    {word:"ask",ph:["a","s","k"],img:"❓",sentence:"Always ask before you take!"},
    {word:"too",ph:["t","oo"],img:"➕",sentence:"I want to come too!"},
    {word:"man",ph:["m","a","n"],img:"🧔",sentence:"The tall man waved hello!"},
    {word:"may",ph:["m","ai"],img:"🙏",sentence:"May I have some water?"},
    {word:"now",ph:["n","ow"],img:"⏰",sentence:"We need to go now!"},
    {word:"how",ph:["h","ow"],img:"🤔",sentence:"How do you make a cake?"},
    {word:"any",ph:["e","n","ee"],img:"🔍",sentence:"Do you have any crayons?"},
    {word:"its",ph:["i","t","s"],img:"👆",sentence:"The dog wags its tail!"},
    {word:"own",ph:["oa","n"],img:"🏠",sentence:"I have my own bedroom!"},
    {word:"use",ph:["y","oo","z"],img:"🔧",sentence:"Please use a pencil to write!"},
  ]},
  cvc:{emoji:"🧩",color:"#F59E0B",words:[
    {word:"cap",ph:["c","a","p"],img:"🧢",sentence:"I wear a red cap!"},
    {word:"map",ph:["m","a","p"],img:"🗺️",sentence:"Look at the world map!"},
    {word:"tap",ph:["t","a","p"],img:"🚰",sentence:"Turn off the tap please!"},
    {word:"nap",ph:["n","a","p"],img:"😴",sentence:"The baby takes a nap!"},
    {word:"lap",ph:["l","a","p"],img:"🧑",sentence:"The cat sat on my lap!"},
    {word:"van",ph:["v","a","n"],img:"🚐",sentence:"We rode in a blue van!"},
    {word:"fan",ph:["f","a","n"],img:"🪭",sentence:"The fan keeps me cool!"},
    {word:"pan",ph:["p","a","n"],img:"🍳",sentence:"Cook eggs in a pan!"},
    {word:"yam",ph:["y","a","m"],img:"🍠",sentence:"A yam is orange inside!"},
    {word:"ram",ph:["r","a","m"],img:"🐏",sentence:"The ram has big horns!"},
    {word:"jet",ph:["j","e","t"],img:"✈️",sentence:"The jet flies very fast!"},
    {word:"net",ph:["n","e","t"],img:"🥅",sentence:"Kick the ball into the net!"},
    {word:"wet",ph:["w","e","t"],img:"💧",sentence:"I got wet in the rain!"},
    {word:"set",ph:["s","e","t"],img:"🎯",sentence:"Get ready get set go!"},
    {word:"pet",ph:["p","e","t"],img:"🐕",sentence:"My pet dog loves me!"},
    {word:"vet",ph:["v","e","t"],img:"👨‍⚕️",sentence:"The vet helps sick animals!"},
    {word:"bin",ph:["b","i","n"],img:"🗑️",sentence:"Put trash in the bin!"},
    {word:"fin",ph:["f","i","n"],img:"🦈",sentence:"A shark has a big fin!"},
    {word:"win",ph:["w","i","n"],img:"🏆",sentence:"I want to win the race!"},
    {word:"zip",ph:["z","i","p"],img:"🤐",sentence:"Zip up your jacket please!"},
    {word:"tip",ph:["t","i","p"],img:"💡",sentence:"Here is a helpful tip!"},
    {word:"dip",ph:["d","i","p"],img:"🫕",sentence:"Dip the chip in the sauce!"},
    {word:"hip",ph:["h","i","p"],img:"💃",sentence:"Shake your hip and dance!"},
    {word:"kit",ph:["k","i","t"],img:"🧰",sentence:"Get the first aid kit!"},
    {word:"bit",ph:["b","i","t"],img:"🍪",sentence:"I ate a bit of cookie!"},
    {word:"hit",ph:["h","i","t"],img:"🏏",sentence:"Hit the ball with the bat!"},
    {word:"hop",ph:["h","o","p"],img:"🐇",sentence:"The bunny can hop high!"},
    {word:"mop",ph:["m","o","p"],img:"🧹",sentence:"Use a mop to clean!"},
    {word:"pop",ph:["p","o","p"],img:"🎈",sentence:"The balloon went pop!"},
    {word:"top",ph:["t","o","p"],img:"🔝",sentence:"Climb to the top of the hill!"},
    {word:"hot",ph:["h","o","t"],img:"🌡️",sentence:"The soup is very hot!"},
    {word:"dot",ph:["d","o","t"],img:"⚫",sentence:"Draw a big red dot!"},
    {word:"cot",ph:["c","o","t"],img:"🛏️",sentence:"The baby sleeps in a cot!"},
    {word:"pot",ph:["p","o","t"],img:"🍲",sentence:"Stir the soup in the pot!"},
    {word:"jog",ph:["j","o","g"],img:"🏃",sentence:"I jog in the morning!"},
    {word:"log",ph:["l","o","g"],img:"🪵",sentence:"Sit on the big log!"},
    {word:"cub",ph:["c","u","b"],img:"🐻",sentence:"The bear cub is tiny!"},
    {word:"hub",ph:["h","u","b"],img:"🔵",sentence:"The wheel has a hub!"},
    {word:"tub",ph:["t","u","b"],img:"🛁",sentence:"Take a bath in the tub!"},
    {word:"dug",ph:["d","u","g"],img:"🕳️",sentence:"The dog dug a big hole!"},
    {word:"jug",ph:["j","u","g"],img:"🫗",sentence:"Pour water from the jug!"},
    {word:"mug",ph:["m","u","g"],img:"☕",sentence:"Drink milk from a mug!"},
    {word:"rug",ph:["r","u","g"],img:"🟫",sentence:"Sit on the soft rug!"},
    {word:"pup",ph:["p","u","p"],img:"🐶",sentence:"The little pup is cute!"},
    {word:"gum",ph:["g","u","m"],img:"🫧",sentence:"Do not swallow the gum!"},
    {word:"bun",ph:["b","u","n"],img:"🍞",sentence:"I ate a fresh warm bun!"},
  ]},
  blends:{emoji:"🔗",color:"#06B6D4",words:[
    {word:"black",ph:["b","l","a","ck"],img:"⬛",sentence:"The cat is all black!"},
    {word:"block",ph:["b","l","o","ck"],img:"🧱",sentence:"Stack the block up high!"},
    {word:"blow",ph:["b","l","ow"],img:"💨",sentence:"Blow out the candles!"},
    {word:"blend",ph:["b","l","e","n","d"],img:"🫐",sentence:"Blend the fruit for a shake!"},
    {word:"blink",ph:["b","l","i","n","k"],img:"😉",sentence:"Blink your eyes very fast!"},
    {word:"clap",ph:["c","l","a","p"],img:"👏",sentence:"Clap your hands with me!"},
    {word:"clip",ph:["c","l","i","p"],img:"📎",sentence:"Use a clip for the paper!"},
    {word:"class",ph:["c","l","a","s"],img:"🏫",sentence:"I love my art class!"},
    {word:"click",ph:["c","l","i","ck"],img:"🖱️",sentence:"Click the big red button!"},
    {word:"club",ph:["c","l","u","b"],img:"🏠",sentence:"I joined the book club!"},
    {word:"cross",ph:["c","r","o","s"],img:"❌",sentence:"Look both ways to cross!"},
    {word:"crisp",ph:["c","r","i","s","p"],img:"🍂",sentence:"The air is cold and crisp!"},
    {word:"drop",ph:["d","r","o","p"],img:"💧",sentence:"Do not drop the glass!"},
    {word:"drag",ph:["d","r","a","g"],img:"🖱️",sentence:"Drag the box over here!"},
    {word:"flat",ph:["f","l","a","t"],img:"📄",sentence:"The land is very flat!"},
    {word:"flip",ph:["f","l","i","p"],img:"🥞",sentence:"Flip the pancake over!"},
    {word:"glad",ph:["g","l","a","d"],img:"😊",sentence:"I am glad to see you!"},
    {word:"glow",ph:["g","l","ow"],img:"✨",sentence:"The stars glow at night!"},
    {word:"glue",ph:["g","l","oo"],img:"🧴",sentence:"Use glue to stick it down!"},
    {word:"grab",ph:["g","r","a","b"],img:"🤏",sentence:"Grab your bag and go!"},
    {word:"grin",ph:["g","r","i","n"],img:"😁",sentence:"She had a big grin!"},
    {word:"grip",ph:["g","r","i","p"],img:"✊",sentence:"Grip the rope very tight!"},
    {word:"plan",ph:["p","l","a","n"],img:"📋",sentence:"We made a fun plan!"},
    {word:"plug",ph:["p","l","u","g"],img:"🔌",sentence:"Plug in the night light!"},
    {word:"skit",ph:["s","k","i","t"],img:"🎭",sentence:"We did a funny skit!"},
    {word:"skip",ph:["s","k","i","p"],img:"🤸",sentence:"Skip along the path!"},
    {word:"slam",ph:["s","l","a","m"],img:"🚪",sentence:"Do not slam the door!"},
    {word:"slid",ph:["s","l","i","d"],img:"🛝",sentence:"I slid down the slide!"},
    {word:"slim",ph:["s","l","i","m"],img:"📏",sentence:"The book is thin and slim!"},
    {word:"slot",ph:["s","l","o","t"],img:"🎰",sentence:"Put a coin in the slot!"},
    {word:"snap",ph:["s","n","a","p"],img:"🫰",sentence:"Snap your fingers like this!"},
    {word:"snip",ph:["s","n","i","p"],img:"✂️",sentence:"Snip the paper in half!"},
    {word:"spin",ph:["s","p","i","n"],img:"🌀",sentence:"Watch the top spin around!"},
    {word:"spot",ph:["s","p","o","t"],img:"🔴",sentence:"The dog has a black spot!"},
    {word:"stem",ph:["s","t","e","m"],img:"🌱",sentence:"The flower has a long stem!"},
    {word:"step",ph:["s","t","e","p"],img:"👣",sentence:"Take one step at a time!"},
    {word:"stir",ph:["s","t","ir"],img:"🥄",sentence:"Stir the soup slowly!"},
    {word:"stop",ph:["s","t","o","p"],img:"🛑",sentence:"Stop and look both ways!"},
    {word:"strap",ph:["s","t","r","a","p"],img:"🎒",sentence:"Pull the strap on your bag!"},
    {word:"strip",ph:["s","t","r","i","p"],img:"📏",sentence:"Cut a strip of tape!"},
    {word:"trip",ph:["t","r","i","p"],img:"🧳",sentence:"We went on a fun trip!"},
    {word:"trim",ph:["t","r","i","m"],img:"✂️",sentence:"Trim the edges of the paper!"},
    {word:"trot",ph:["t","r","o","t"],img:"🐎",sentence:"The horse began to trot!"},
    {word:"twin",ph:["t","w","i","n"],img:"👯",sentence:"My friend has a twin!"},
    {word:"twist",ph:["t","w","i","s","t"],img:"🌀",sentence:"Twist the cap to open it!"},
  ]},
  weather:{emoji:"🌤️",color:"#38BDF8",words:[
    {word:"hot",ph:["h","o","t"],img:"🥵",sentence:"Today is so hot outside!"},
    {word:"cold",ph:["c","oa","l","d"],img:"🥶",sentence:"Wear a coat when it is cold!"},
    {word:"warm",ph:["w","or","m"],img:"☀️",sentence:"The sun makes us warm!"},
    {word:"cool",ph:["c","oo","l"],img:"😎",sentence:"The breeze feels nice and cool!"},
    {word:"wet",ph:["w","e","t"],img:"🌧️",sentence:"My shoes got wet in the rain!"},
    {word:"dry",ph:["d","r","igh"],img:"🏜️",sentence:"The desert is very dry!"},
    {word:"mist",ph:["m","i","s","t"],img:"🌫️",sentence:"The mist covers the lake!"},
    {word:"hail",ph:["h","ai","l"],img:"🧊",sentence:"Little balls of hail fell down!"},
    {word:"gust",ph:["g","u","s","t"],img:"💨",sentence:"A gust of wind blew my hat!"},
    {word:"bolt",ph:["b","oa","l","t"],img:"⚡",sentence:"A bolt of lightning lit the sky!"},
    {word:"dew",ph:["d","oo"],img:"💧",sentence:"Morning dew sits on the grass!"},
    {word:"breeze",ph:["b","r","ee","z"],img:"🍃",sentence:"A soft breeze blows the leaves!"},
    {word:"sunny",ph:["s","u","n","ee"],img:"☀️",sentence:"It is a bright sunny day!"},
    {word:"rainy",ph:["r","ai","n","ee"],img:"🌧️",sentence:"Grab your boots on rainy days!"},
    {word:"windy",ph:["w","i","n","d","ee"],img:"🌬️",sentence:"Hold your hat on windy days!"},
    {word:"snowy",ph:["s","n","oa","ee"],img:"❄️",sentence:"We love to play on snowy days!"},
    {word:"foggy",ph:["f","o","g","ee"],img:"🌫️",sentence:"I can not see in foggy air!"},
    {word:"cloudy",ph:["c","l","ow","d","ee"],img:"☁️",sentence:"The sky is gray and cloudy!"},
    {word:"frost",ph:["f","r","o","s","t"],img:"🥶",sentence:"Frost covers the window glass!"},
    {word:"flood",ph:["f","l","u","d"],img:"🌊",sentence:"Too much rain makes a flood!"},
    {word:"sleet",ph:["s","l","ee","t"],img:"🌨️",sentence:"Sleet is a mix of rain and ice!"},
    {word:"humid",ph:["h","y","oo","m","i","d"],img:"💦",sentence:"It is hot and humid today!"},
    {word:"drizzle",ph:["d","r","i","z","l"],img:"🌦️",sentence:"A light drizzle fell all day!"},
    {word:"rainbow",ph:["r","ai","n","b","ow"],img:"🌈",sentence:"A rainbow comes after the rain!"},
    {word:"thunder",ph:["th","u","n","d","er"],img:"⛈️",sentence:"Thunder makes a big loud boom!"},
  ]},
  home:{emoji:"🏠",color:"#F472B6",words:[
    {word:"room",ph:["r","oo","m"],img:"🚪",sentence:"Clean up your room please!"},
    {word:"wall",ph:["w","or","l"],img:"🧱",sentence:"Hang the picture on the wall!"},
    {word:"roof",ph:["r","oo","f"],img:"🏠",sentence:"The roof keeps the rain out!"},
    {word:"floor",ph:["f","l","or"],img:"🟫",sentence:"Do not sit on the cold floor!"},
    {word:"bath",ph:["b","ar","th"],img:"🛁",sentence:"Time for a warm bath!"},
    {word:"sink",ph:["s","i","n","k"],img:"🚰",sentence:"Wash your hands in the sink!"},
    {word:"sofa",ph:["s","oa","f","a"],img:"🛋️",sentence:"Sit on the soft sofa!"},
    {word:"shelf",ph:["sh","e","l","f"],img:"📚",sentence:"Put books on the shelf!"},
    {word:"oven",ph:["u","v","e","n"],img:"🫕",sentence:"The oven bakes the cake!"},
    {word:"stove",ph:["s","t","oa","v"],img:"🍳",sentence:"Mom cooks on the stove!"},
    {word:"stairs",ph:["s","t","air","z"],img:"🪜",sentence:"Walk slowly on the stairs!"},
    {word:"window",ph:["w","i","n","d","oa"],img:"🪟",sentence:"Look out the window!"},
    {word:"garden",ph:["g","ar","d","e","n"],img:"🌻",sentence:"Flowers grow in the garden!"},
    {word:"pillow",ph:["p","i","l","oa"],img:"🛏️",sentence:"Rest your head on the pillow!"},
    {word:"blanket",ph:["b","l","a","n","k","i","t"],img:"🛌",sentence:"Wrap up in a warm blanket!"},
    {word:"fridge",ph:["f","r","i","j"],img:"🧊",sentence:"Get milk from the fridge!"},
    {word:"towel",ph:["t","ow","e","l"],img:"🧖",sentence:"Dry off with a towel!"},
    {word:"spoon",ph:["s","p","oo","n"],img:"🥄",sentence:"Eat soup with a spoon!"},
    {word:"fork",ph:["f","or","k"],img:"🍴",sentence:"Use a fork for your pasta!"},
    {word:"knife",ph:["n","igh","f"],img:"🔪",sentence:"Be careful with the knife!"},
    {word:"plate",ph:["p","l","ai","t"],img:"🍽️",sentence:"Put food on your plate!"},
    {word:"bowl",ph:["b","oa","l"],img:"🥣",sentence:"Pour cereal in a bowl!"},
    {word:"broom",ph:["b","r","oo","m"],img:"🧹",sentence:"Sweep with the broom!"},
    {word:"couch",ph:["c","ow","ch"],img:"🛋️",sentence:"I love to read on the couch!"},
    {word:"closet",ph:["c","l","o","z","i","t"],img:"👚",sentence:"Hang your coat in the closet!"},
  ]},
  ocean:{emoji:"🐚",color:"#0EA5E9",words:[
    {word:"wave",ph:["w","ai","v"],img:"🌊",sentence:"A big wave splashed the shore!"},
    {word:"sand",ph:["s","a","n","d"],img:"🏖️",sentence:"Build a castle in the sand!"},
    {word:"reef",ph:["r","ee","f"],img:"🪸",sentence:"Fish live near the coral reef!"},
    {word:"tide",ph:["t","igh","d"],img:"🌊",sentence:"The tide goes in and out!"},
    {word:"surf",ph:["s","ur","f"],img:"🏄",sentence:"I want to learn to surf!"},
    {word:"clam",ph:["c","l","a","m"],img:"🐚",sentence:"The clam hides in its shell!"},
    {word:"kelp",ph:["k","e","l","p"],img:"🌿",sentence:"Kelp is a plant in the sea!"},
    {word:"shore",ph:["sh","or"],img:"🏝️",sentence:"Shells wash up on the shore!"},
    {word:"coral",ph:["c","o","r","a","l"],img:"🪸",sentence:"Coral comes in many colors!"},
    {word:"otter",ph:["o","t","er"],img:"🦦",sentence:"The otter floats on its back!"},
    {word:"squid",ph:["s","q","i","d"],img:"🦑",sentence:"A squid has ten long arms!"},
    {word:"prawn",ph:["p","r","or","n"],img:"🦐",sentence:"A prawn is small and pink!"},
    {word:"drift",ph:["d","r","i","f","t"],img:"🍂",sentence:"The leaf will drift on water!"},
    {word:"shell",ph:["sh","e","l"],img:"🐚",sentence:"I found a pretty shell!"},
    {word:"coast",ph:["c","oa","s","t"],img:"🏖️",sentence:"We drove along the coast!"},
    {word:"harbor",ph:["h","ar","b","er"],img:"⛵",sentence:"Boats rest in the harbor!"},
    {word:"anchor",ph:["a","n","k","er"],img:"⚓",sentence:"Drop the anchor to stop!"},
    {word:"pearl",ph:["p","ur","l"],img:"🫧",sentence:"The oyster made a pearl!"},
    {word:"island",ph:["igh","l","a","n","d"],img:"🏝️",sentence:"A palm tree grows on the island!"},
    {word:"starfish",ph:["s","t","ar","f","i","sh"],img:"⭐",sentence:"A starfish has five arms!"},
  ]},
  garden:{emoji:"🌱",color:"#84CC16",words:[
    {word:"weed",ph:["w","ee","d"],img:"🌾",sentence:"Pull the weed from the soil!"},
    {word:"soil",ph:["s","oi","l"],img:"🟤",sentence:"Plants grow in rich soil!"},
    {word:"bush",ph:["b","oo","sh"],img:"🌳",sentence:"A bird hides in the bush!"},
    {word:"vine",ph:["v","igh","n"],img:"🌿",sentence:"The vine climbs up the wall!"},
    {word:"bloom",ph:["b","l","oo","m"],img:"🌸",sentence:"The flowers bloom in spring!"},
    {word:"thorn",ph:["th","or","n"],img:"🌹",sentence:"Watch out for the thorn!"},
    {word:"petal",ph:["p","e","t","a","l"],img:"🌺",sentence:"A petal fell from the rose!"},
    {word:"root",ph:["r","oo","t"],img:"🌱",sentence:"The root grows under the ground!"},
    {word:"trunk",ph:["t","r","u","n","k"],img:"🌲",sentence:"The tree trunk is very thick!"},
    {word:"branch",ph:["b","r","a","n","ch"],img:"🌳",sentence:"A bird sits on the branch!"},
    {word:"pond",ph:["p","o","n","d"],img:"🐸",sentence:"Frogs jump in the pond!"},
    {word:"hedge",ph:["h","e","j"],img:"🌿",sentence:"The hedge is tall and green!"},
    {word:"lawn",ph:["l","or","n"],img:"🌿",sentence:"Dad cuts the green lawn!"},
    {word:"dig",ph:["d","i","g"],img:"🕳️",sentence:"Dig a hole to plant a seed!"},
    {word:"grow",ph:["g","r","ow"],img:"🌱",sentence:"Water helps plants grow tall!"},
    {word:"rake",ph:["r","ai","k"],img:"🍂",sentence:"Use a rake for the leaves!"},
    {word:"hose",ph:["h","oa","z"],img:"💦",sentence:"Spray water with the hose!"},
    {word:"pot",ph:["p","o","t"],img:"🪴",sentence:"Plant a flower in the pot!"},
    {word:"fence",ph:["f","e","n","s"],img:"🏡",sentence:"The fence goes around the yard!"},
    {word:"snail",ph:["s","n","ai","l"],img:"🐌",sentence:"A snail moves very slowly!"},
  ]},
  toys:{emoji:"🧸",color:"#EC4899",words:[
    {word:"doll",ph:["d","o","l"],img:"🧸",sentence:"My doll has a pink dress!"},
    {word:"top",ph:["t","o","p"],img:"🪀",sentence:"Spin the top on the floor!"},
    {word:"kite",ph:["k","igh","t"],img:"🪁",sentence:"Fly a kite on a windy day!"},
    {word:"ball",ph:["b","or","l"],img:"⚽",sentence:"Kick the ball to your friend!"},
    {word:"game",ph:["g","ai","m"],img:"🎮",sentence:"Let us play a fun game!"},
    {word:"card",ph:["c","ar","d"],img:"🃏",sentence:"Pick a card from the deck!"},
    {word:"dice",ph:["d","igh","s"],img:"🎲",sentence:"Roll the dice and count!"},
    {word:"mask",ph:["m","a","s","k"],img:"🎭",sentence:"Wear a mask for the show!"},
    {word:"clay",ph:["c","l","ai"],img:"🏺",sentence:"Make a cup from soft clay!"},
    {word:"lego",ph:["l","e","g","oa"],img:"🧱",sentence:"Build a house with Lego!"},
    {word:"swing",ph:["s","w","i","ng"],img:"🛝",sentence:"Push me on the swing!"},
    {word:"slide",ph:["s","l","igh","d"],img:"🛝",sentence:"Go down the slide again!"},
    {word:"sled",ph:["s","l","e","d"],img:"🛷",sentence:"Ride the sled down the hill!"},
    {word:"train",ph:["t","r","ai","n"],img:"🚂",sentence:"The toy train goes choo choo!"},
    {word:"truck",ph:["t","r","u","ck"],img:"🚚",sentence:"My big truck carries blocks!"},
    {word:"blocks",ph:["b","l","o","ck","s"],img:"🧱",sentence:"Stack the blocks very high!"},
    {word:"puzzle",ph:["p","u","z","l"],img:"🧩",sentence:"I finished the puzzle all alone!"},
    {word:"teddy",ph:["t","e","d","ee"],img:"🧸",sentence:"I sleep with my teddy bear!"},
    {word:"yo-yo",ph:["y","oa","y","oa"],img:"🪀",sentence:"Watch my yo yo go up and down!"},
    {word:"drum",ph:["d","r","u","m"],img:"🥁",sentence:"Bang the drum really loud!"},
    {word:"sand",ph:["s","a","n","d"],img:"🏖️",sentence:"Dig in the sand at the beach!"},
    {word:"chalk",ph:["ch","or","k"],img:"🖍️",sentence:"Draw with chalk on the ground!"},
    {word:"paint",ph:["p","ai","n","t"],img:"🎨",sentence:"I love to paint pictures!"},
    {word:"puppet",ph:["p","u","p","i","t"],img:"🧸",sentence:"Make the puppet wave hello!"},
    {word:"marble",ph:["m","ar","b","l"],img:"🔮",sentence:"The marble rolls across the floor!"},
  ]},
  opposites:{emoji:"↔️",color:"#14B8A6",words:[
    {word:"fast",ph:["f","a","s","t"],img:"🏎️",sentence:"The car goes very fast!"},
    {word:"slow",ph:["s","l","ow"],img:"🐢",sentence:"The turtle is very slow!"},
    {word:"loud",ph:["l","ow","d"],img:"📢",sentence:"The horn is so loud!"},
    {word:"soft",ph:["s","o","f","t"],img:"🧸",sentence:"The pillow is nice and soft!"},
    {word:"hard",ph:["h","ar","d"],img:"🪨",sentence:"A rock is very hard!"},
    {word:"full",ph:["f","oo","l"],img:"🍽️",sentence:"My tummy is very full!"},
    {word:"empty",ph:["e","m","p","t","ee"],img:"📭",sentence:"The box is totally empty!"},
    {word:"thin",ph:["th","i","n"],img:"📄",sentence:"The paper is very thin!"},
    {word:"thick",ph:["th","i","ck"],img:"📕",sentence:"That book is very thick!"},
    {word:"wide",ph:["w","igh","d"],img:"↔️",sentence:"The river is very wide!"},
    {word:"dark",ph:["d","ar","k"],img:"🌑",sentence:"The room is very dark!"},
    {word:"clean",ph:["c","l","ee","n"],img:"✨",sentence:"Keep your room nice and clean!"},
    {word:"dirty",ph:["d","ir","t","ee"],img:"🐷",sentence:"The pig got very dirty!"},
    {word:"wet",ph:["w","e","t"],img:"💧",sentence:"I got all wet from the rain!"},
    {word:"dry",ph:["d","r","igh"],img:"☀️",sentence:"Hang the clothes up to dry!"},
    {word:"deep",ph:["d","ee","p"],img:"🏊",sentence:"The pool is very deep!"},
    {word:"rich",ph:["r","i","ch"],img:"💰",sentence:"The soil is dark and rich!"},
    {word:"poor",ph:["p","or"],img:"🙁",sentence:"The poor dog had no food!"},
    {word:"safe",ph:["s","ai","f"],img:"🛡️",sentence:"You are safe here with me!"},
    {word:"open",ph:["oa","p","e","n"],img:"📖",sentence:"Open the book and read!"},
    {word:"shut",ph:["sh","u","t"],img:"🚪",sentence:"Shut the door when you leave!"},
    {word:"young",ph:["y","u","ng"],img:"👶",sentence:"The baby is very young!"},
    {word:"same",ph:["s","ai","m"],img:"👯",sentence:"We have the same blue shoes!"},
    {word:"sweet",ph:["s","w","ee","t"],img:"🍬",sentence:"Honey is very sweet!"},
    {word:"sour",ph:["s","ow","er"],img:"🍋",sentence:"The lemon is very sour!"},
    {word:"near",ph:["n","ear"],img:"📍",sentence:"The shop is very near!"},
    {word:"far",ph:["f","ar"],img:"🌅",sentence:"The mountain is very far away!"},
    {word:"above",ph:["a","b","u","v"],img:"⬆️",sentence:"The bird flies above the trees!"},
    {word:"below",ph:["b","i","l","oa"],img:"⬇️",sentence:"Fish swim below the boat!"},
    {word:"rough",ph:["r","u","f"],img:"🪨",sentence:"The rock feels very rough!"},
  ]},
  time:{emoji:"⏰",color:"#A855F7",words:[
    {word:"day",ph:["d","ai"],img:"☀️",sentence:"We play during the day!"},
    {word:"night",ph:["n","igh","t"],img:"🌙",sentence:"Stars come out at night!"},
    {word:"week",ph:["w","ee","k"],img:"📅",sentence:"There are seven days in a week!"},
    {word:"month",ph:["m","u","n","th"],img:"📆",sentence:"My birthday is next month!"},
    {word:"year",ph:["y","ear"],img:"🎆",sentence:"Happy new year everyone!"},
    {word:"hour",ph:["ow","er"],img:"🕐",sentence:"One hour has sixty minutes!"},
    {word:"clock",ph:["c","l","o","ck"],img:"🕰️",sentence:"Look at the big clock!"},
    {word:"soon",ph:["s","oo","n"],img:"⏳",sentence:"Lunch will be ready soon!"},
    {word:"late",ph:["l","ai","t"],img:"⏰",sentence:"Do not be late for school!"},
    {word:"early",ph:["er","l","ee"],img:"🌅",sentence:"I wake up very early!"},
    {word:"today",ph:["t","oo","d","ai"],img:"📍",sentence:"Today is a great day!"},
    {word:"spring",ph:["s","p","r","i","ng"],img:"🌸",sentence:"Flowers bloom in the spring!"},
    {word:"summer",ph:["s","u","m","er"],img:"☀️",sentence:"We swim a lot in summer!"},
    {word:"autumn",ph:["or","t","u","m"],img:"🍂",sentence:"Leaves fall down in autumn!"},
    {word:"winter",ph:["w","i","n","t","er"],img:"❄️",sentence:"It snows a lot in winter!"},
    {word:"morning",ph:["m","or","n","i","ng"],img:"🌅",sentence:"I eat breakfast in the morning!"},
    {word:"noon",ph:["n","oo","n"],img:"☀️",sentence:"We have lunch at noon!"},
    {word:"always",ph:["or","l","w","ai","z"],img:"♾️",sentence:"I always brush my teeth!"},
    {word:"never",ph:["n","e","v","er"],img:"🚫",sentence:"I never go to bed late!"},
    {word:"begin",ph:["b","i","g","i","n"],img:"▶️",sentence:"Let us begin the story!"},
  ]},};

const REWARDS=[{id:1,name:"Sticker Pack",emoji:"🌟",cost:50,desc:"5 shiny stickers!"},{id:2,name:"Ice Cream",emoji:"🍦",cost:100,desc:"A yummy treat!"},{id:3,name:"Toy Car",emoji:"🚗",cost:200,desc:"Vroom vroom!"},{id:4,name:"Burger Meal",emoji:"🍔",cost:150,desc:"Burger + fries!"},{id:5,name:"Teddy Bear",emoji:"🧸",cost:300,desc:"Soft & cuddly!"},{id:6,name:"Lego Set",emoji:"🧩",cost:500,desc:"Build anything!"},{id:7,name:"Book",emoji:"📚",cost:75,desc:"A new story!"},{id:8,name:"Candy Bag",emoji:"🍬",cost:50,desc:"Sweet treats!"},{id:9,name:"Movie Night",emoji:"🎬",cost:400,desc:"Pick a movie!"},{id:10,name:"Pizza Party",emoji:"🍕",cost:350,desc:"Yum yum!"},{id:11,name:"Art Kit",emoji:"🖍️",cost:200,desc:"Color & draw!"},{id:12,name:"Bike Ride",emoji:"🚲",cost:250,desc:"Outdoor fun!"}];

// ═══ ENGAGEMENT + SOUND SYSTEM ═══
const BADGES=[
  {id:"first",name:"First Step",emoji:"🌱",desc:"First lesson",check:p=>p.totalEarned>=5},
  {id:"num10",name:"Number Whiz",emoji:"🔢",desc:"10 numbers",check:p=>(p.completed?.numbers||[]).length>=10},
  {id:"abc10",name:"ABC Star",emoji:"🔤",desc:"10 letters",check:p=>(p.completed?.alphabet||[]).length>=10},
  {id:"word20",name:"Word Smith",emoji:"📖",desc:"20 words",check:p=>(p.completed?.phonics||[]).length>=20},
  {id:"shape12",name:"Shape Pro",emoji:"🔷",desc:"All shapes",check:p=>(p.completed?.shapes||[]).length>=12},
  {id:"color13",name:"Color Guru",emoji:"🎨",desc:"All colors",check:p=>(p.completed?.colors||[]).length>=13},
  {id:"s3",name:"On Fire",emoji:"🔥",desc:"3-day streak",check:p=>(p.streak||0)>=3},
  {id:"s7",name:"Unstoppable",emoji:"⚡",desc:"7-day streak",check:p=>(p.streak||0)>=7},
  {id:"p100",name:"Century",emoji:"💯",desc:"100 points",check:p=>p.totalEarned>=100},
  {id:"p500",name:"Legend",emoji:"🏆",desc:"500 points",check:p=>p.totalEarned>=500},
];
const XPLVL=[
  {lv:1,nm:"Seedling",em:"🌱",xp:0},{lv:2,nm:"Sprout",em:"🌿",xp:50},{lv:3,nm:"Bloom",em:"🌸",xp:150},
  {lv:4,nm:"Star",em:"⭐",xp:300},{lv:5,nm:"Rocket",em:"🚀",xp:500},{lv:6,nm:"Crown",em:"👑",xp:800},
  {lv:7,nm:"Diamond",em:"💎",xp:1200},{lv:8,nm:"Legend",em:"🏆",xp:2000},
];
const getLv=xp=>{let l=XPLVL[0];for(const v of XPLVL)if((xp||0)>=v.xp)l=v;return l;};
const getNextLv=xp=>{for(const v of XPLVL)if((xp||0)<v.xp)return v;return null;};
const getLvPct=xp=>{const c=getLv(xp),n=getNextLv(xp);if(!n)return 100;return Math.min(100,Math.round(((xp||0)-c.xp)/(n.xp-c.xp)*100));};
const sfxTap=()=>{try{const AC=window.AudioContext||window.webkitAudioContext;const a=new AC(),o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);o.frequency.value=660;o.type="sine";g.gain.value=0.06;o.start();g.gain.exponentialRampToValueAtTime(0.001,a.currentTime+0.08);o.stop(a.currentTime+0.08);}catch(e){}};
const sfxWin=()=>{try{const AC=window.AudioContext||window.webkitAudioContext;const a=new AC();[523,659,784].forEach((f,i)=>{const o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);o.frequency.value=f;o.type="sine";g.gain.value=0.05;o.start(a.currentTime+i*0.1);g.gain.exponentialRampToValueAtTime(0.001,a.currentTime+i*0.1+0.15);o.stop(a.currentTime+i*0.1+0.15);});}catch(e){}};
const sfxLvl=()=>{try{const AC=window.AudioContext||window.webkitAudioContext;const a=new AC();[523,659,784,1047].forEach((f,i)=>{const o=a.createOscillator(),g=a.createGain();o.connect(g);g.connect(a.destination);o.frequency.value=f;o.type="triangle";g.gain.value=0.06;o.start(a.currentTime+i*0.12);g.gain.exponentialRampToValueAtTime(0.001,a.currentTime+i*0.12+0.25);o.stop(a.currentTime+i*0.12+0.25);});}catch(e){}};
const chkStreak=p=>{const d=new Date().toDateString(),l=p?.lastActive;if(!l)return{s:1,n:true};const ld=new Date(l);const y=new Date();y.setDate(y.getDate()-1);if(ld.toDateString()===d)return{s:p.streak||1,n:false};if(ld.toDateString()===y.toDateString())return{s:(p.streak||0)+1,n:true};return{s:1,n:true};};


// ═══ PARENT CONTROL CENTER + STUDY PLAN + REWARDS ENGINE ═══
const PARENT_PIN_DEFAULT="1234";
const REWARD_CATALOG=[
  {cat:"Food",items:[{id:"burger",name:"Burger",emoji:"🍔",defPts:40},{id:"icecream",name:"Ice Cream",emoji:"🍦",defPts:20},{id:"pizza",name:"Pizza",emoji:"🍕",defPts:50},{id:"fries",name:"Fries",emoji:"🍟",defPts:15},{id:"cake",name:"Cake",emoji:"🎂",defPts:60},{id:"juice",name:"Juice Box",emoji:"🧃",defPts:10},{id:"cookie",name:"Cookies",emoji:"🍪",defPts:15},{id:"candy",name:"Candy",emoji:"🍬",defPts:10}]},
  {cat:"Toys",items:[{id:"lego",name:"Lego Set",emoji:"🧩",defPts:100},{id:"teddy",name:"Teddy Bear",emoji:"🧸",defPts:80},{id:"car",name:"Toy Car",emoji:"🚗",defPts:60},{id:"doll",name:"Doll",emoji:"🪆",defPts:70},{id:"puzzle",name:"Puzzle",emoji:"🧩",defPts:40},{id:"blocks",name:"Building Blocks",emoji:"🧱",defPts:50},{id:"ball",name:"Ball",emoji:"⚽",defPts:30},{id:"kite",name:"Kite",emoji:"🪁",defPts:35}]},
  {cat:"Activities",items:[{id:"park",name:"Park Visit",emoji:"🏞️",defPts:30},{id:"movie",name:"Movie Night",emoji:"🎬",defPts:80},{id:"swim",name:"Swimming",emoji:"🏊",defPts:50},{id:"zoo",name:"Zoo Trip",emoji:"🦁",defPts:100},{id:"bike",name:"Bike Ride",emoji:"🚲",defPts:25},{id:"paint",name:"Art Time",emoji:"🎨",defPts:20},{id:"game",name:"Game Night",emoji:"🎮",defPts:40},{id:"story",name:"Extra Story",emoji:"📖",defPts:15}]},
  {cat:"Screen Time",items:[{id:"tv30",name:"30min TV",emoji:"📺",defPts:30},{id:"tv60",name:"1hr TV",emoji:"📺",defPts:60},{id:"tablet",name:"30min Tablet",emoji:"📱",defPts:40},{id:"youtube",name:"YouTube Time",emoji:"▶️",defPts:35}]},
];
const STUDY_TOPICS=[
  {id:"numbers",name:"Numbers",emoji:"🔢",sub:[{id:"1-10",name:"1-10"},{id:"11-20",name:"11-20"},{id:"21-50",name:"21-50"},{id:"51-100",name:"51-100"}]},
  {id:"alphabet",name:"Alphabet",emoji:"🔤",sub:[{id:"A-M",name:"A to M"},{id:"N-Z",name:"N to Z"}]},
  {id:"phonics",name:"Phonics",emoji:"📖",sub:[{id:"animals",name:"Animals"},{id:"food",name:"Food"},{id:"nature",name:"Nature"},{id:"body",name:"Body"},{id:"transport",name:"Transport"},{id:"clothes",name:"Clothes"},{id:"house",name:"House"},{id:"toys",name:"Toys"}]},
  {id:"shapes",name:"Shapes",emoji:"🔷",sub:[{id:"basic",name:"Basic Shapes"},{id:"advanced",name:"Advanced"}]},
  {id:"colors",name:"Colors",emoji:"🎨",sub:[{id:"primary",name:"Primary"},{id:"all",name:"All Colors"}]},
  {id:"math",name:"Math Quiz",emoji:"➕",sub:[{id:"addition",name:"Addition"},{id:"subtraction",name:"Subtraction"},{id:"multiply",name:"Multiply"}]},
  {id:"writing",name:"Writing",emoji:"✏️",sub:[{id:"numbers",name:"Write Numbers"},{id:"caps",name:"Write Capitals"},{id:"small",name:"Write Lowercase"}]},
];
const ENGAGE_TIERS=[{mins:10,pts:5,label:"10 min"},{mins:20,pts:10,label:"20 min"},{mins:30,pts:20,label:"30 min"},{mins:45,pts:30,label:"45 min"},{mins:60,pts:50,label:"1 hour"}];


// ═══ MULTIPLAYER ARENA SYSTEM ═══
const ARENA_COLORS=["#6C5CE7","#00D2A0","#FF9F43","#FF6B81"];
const ARENA_AVATARS=["🦁","🦉","🦊","🐸"];
const genRoomCode=()=>{const c="ABCDEFGHJKLMNPQRSTUVWXYZ23456789";let r="";for(let i=0;i<6;i++)r+=c[Math.floor(Math.random()*c.length)];return r;};
const genPlayerId=()=>"P"+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
const ARENA_Q_TYPES=[
  // Number identification
  {type:"number_id",gen:(diff)=>{const n=diff==="easy"?Math.ceil(Math.random()*10):diff==="medium"?Math.ceil(Math.random()*50):Math.ceil(Math.random()*100);const opts=new Set([n]);while(opts.size<4){let o=n+Math.floor(Math.random()*7)-3;if(o<1)o=Math.ceil(Math.random()*10);opts.add(o);}return{q:`What number is "${NW[n]||n}"?`,answer:n,options:[...opts].sort(()=>Math.random()-0.5),emoji:"🔢",cat:"Numbers"};}},
  // Number word spelling
  {type:"number_word",gen:(diff)=>{const mx=diff==="easy"?10:diff==="medium"?20:50;const n=Math.ceil(Math.random()*mx);const correct=NW[n]||String(n);const opts=new Set([correct]);const nearby=[n-1,n+1,n+2,n-2].filter(x=>x>0&&NW[x]);nearby.forEach(x=>opts.add(NW[x]));while(opts.size<4){const r=Math.ceil(Math.random()*mx);if(NW[r])opts.add(NW[r]);}return{q:`How do you spell the number ${n}?`,answer:correct,options:[...opts].sort(()=>Math.random()-0.5),emoji:"✏️",cat:"Numbers"};}},
  // Math — Addition
  {type:"math_add",gen:(diff)=>{const mx=diff==="easy"?10:diff==="medium"?20:50;const a=Math.ceil(Math.random()*mx);const b=Math.ceil(Math.random()*(mx/2));const ans=a+b;const opts=new Set([ans]);while(opts.size<4){let o=ans+Math.floor(Math.random()*7)-3;if(o<0)o=Math.ceil(Math.random()*5);opts.add(o);}return{q:`${a} + ${b} = ?`,answer:ans,options:[...opts].sort(()=>Math.random()-0.5),emoji:"➕",cat:"Math"};}},
  // Math — Subtraction
  {type:"math_sub",gen:(diff)=>{const mx=diff==="easy"?10:diff==="medium"?20:50;const a=Math.ceil(Math.random()*mx);const b=Math.ceil(Math.random()*Math.min(a,mx/2));const ans=a-b;const opts=new Set([ans]);while(opts.size<4){let o=ans+Math.floor(Math.random()*7)-3;if(o<0)o=Math.ceil(Math.random()*5);opts.add(o);}return{q:`${a} − ${b} = ?`,answer:ans,options:[...opts].sort(()=>Math.random()-0.5),emoji:"➖",cat:"Math"};}},
  // Alphabet — uppercase to lowercase
  {type:"alpha_case",gen:()=>{const i=Math.floor(Math.random()*26);const L=ALPHA_LETTERS[i];const opts=new Set([L.toLowerCase()]);while(opts.size<4)opts.add(ALPHA_LETTERS[Math.floor(Math.random()*26)].toLowerCase());return{q:`What is the lowercase of "${L}"?`,answer:L.toLowerCase(),options:[...opts].sort(()=>Math.random()-0.5),emoji:"🔤",cat:"Alphabet"};}},
  // Alphabet — letter order
  {type:"alpha_next",gen:()=>{const i=Math.floor(Math.random()*25);const L=ALPHA_LETTERS[i];const next=ALPHA_LETTERS[i+1];const opts=new Set([next]);while(opts.size<4)opts.add(ALPHA_LETTERS[Math.floor(Math.random()*26)]);return{q:`What letter comes after "${L}"?`,answer:next,options:[...opts].sort(()=>Math.random()-0.5),emoji:"🔡",cat:"Alphabet"};}},
  // Shapes
  {type:"shape_id",gen:()=>{const s=SHAPES[Math.floor(Math.random()*SHAPES.length)];const opts=new Set([s.name]);while(opts.size<4)opts.add(SHAPES[Math.floor(Math.random()*SHAPES.length)].name);return{q:`Which shape is ${s.emoji}?`,answer:s.name,options:[...opts].sort(()=>Math.random()-0.5),emoji:s.emoji,cat:"Shapes"};}},
  // Colors
  {type:"color_id",gen:()=>{const c=COLORSDATA[Math.floor(Math.random()*COLORSDATA.length)];const opts=new Set([c.name]);while(opts.size<4)opts.add(COLORSDATA[Math.floor(Math.random()*COLORSDATA.length)].name);return{q:`What color is ${c.emoji} (${c.things?.[0]||c.name})?`,answer:c.name,options:[...opts].sort(()=>Math.random()-0.5),emoji:c.emoji||"🎨",cat:"Colors"};}},
  // Phonics — word identification
  {type:"phonics",gen:()=>{const cats=Object.keys(WCATS);const cat=cats[Math.floor(Math.random()*cats.length)];const words=WCATS[cat]?.words||[];if(words.length<4)return{q:"What sound does 🐱 make?",answer:"meow",options:["meow","woof","moo","baa"].sort(()=>Math.random()-0.5),emoji:"🐱",cat:"Phonics"};const w=words[Math.floor(Math.random()*words.length)];const opts=new Set([w.word]);while(opts.size<4){const rw=words[Math.floor(Math.random()*words.length)];opts.add(rw.word);}return{q:`What is this? ${w.img}`,answer:w.word,options:[...opts].sort(()=>Math.random()-0.5),emoji:w.img,cat:"Phonics"};}},
  // Counting
  {type:"counting",gen:(diff)=>{const n=diff==="easy"?Math.ceil(Math.random()*5):diff==="medium"?Math.ceil(Math.random()*10):Math.ceil(Math.random()*15);const emoji=["🍎","🌟","🐟","🦋","🎈"][Math.floor(Math.random()*5)];const opts=new Set([n]);while(opts.size<4){let o=n+Math.floor(Math.random()*5)-2;if(o<1)o=Math.ceil(Math.random()*3);opts.add(o);}return{q:`Count: ${emoji.repeat(n)}`,answer:n,options:[...opts].sort(()=>Math.random()-0.5),emoji:"🔢",cat:"Counting"};}},
];
const genArenaQ=(diff="easy")=>{const t=ARENA_Q_TYPES[Math.floor(Math.random()*ARENA_Q_TYPES.length)];return t.gen(diff);};


// ═══ FIRST-TIME QUESTIONNAIRE ═══
const QUESTIONNAIRE=[
  {q:"What does your child need most?",opts:["Numbers & Counting","Letters & Reading","Both equally","Fun & Games"]},
  {q:"How old is your child?",opts:["3-4 years","4-5 years","5-6 years","6-7 years"]},
  {q:"Can they recognize numbers 1-10?",opts:["Yes, easily","Some of them","Not yet","Not sure"]},
  {q:"Can they recognize alphabet letters?",opts:["Yes, most","Some letters","Not yet","Not sure"]},
  {q:"What learning style works best?",opts:["Visual (pictures)","Audio (sounds)","Hands-on (writing)","Mix of all"]},
  {q:"How much time per day?",opts:["10-15 minutes","15-30 minutes","30-60 minutes","No limit"]},
  {q:"What excites them most?",opts:["Animals & Nature","Space & Science","Art & Colors","Sports & Games"]},
];

const STORIES = [
  {id:1,title:"The Lost Kitten",emoji:"🐱",level:"easy",
    text:"A small kitten sat under a big tree. It was cold and wet from the rain. A kind girl named Mia saw the kitten. She picked it up gently. She took it home and gave it warm milk. Now the kitten has a cozy bed and a best friend!",
    questions:[
      {q:"Where was the kitten sitting?",opts:["Under a tree","On a roof","In a box","By the river"],answer:0},
      {q:"How was the weather?",opts:["Sunny","Snowy","Rainy","Windy"],answer:2},
      {q:"What did Mia give the kitten?",opts:["A toy","Warm milk","A hat","Some fish"],answer:1},
    ]},
  {id:2,title:"The Magic Garden",emoji:"🌻",level:"easy",
    text:"Tom planted a tiny seed in his garden. He watered it every single day. One morning he saw a green shoot! It grew and grew. Soon it became the tallest sunflower on the whole street. All the birds came to visit!",
    questions:[
      {q:"What did Tom plant?",opts:["A flower","A tree","A seed","A bush"],answer:2},
      {q:"What did the seed become?",opts:["A rose","A sunflower","An apple tree","A daisy"],answer:1},
      {q:"Who came to visit the flower?",opts:["Dogs","Cats","Birds","Fish"],answer:2},
    ]},
  {id:3,title:"The Brave Little Boat",emoji:"⛵",level:"easy",
    text:"A small blue boat sat by the lake. It wanted to cross to the other side. The wind was strong but the boat was brave. It sailed across the big waves. When it reached the shore, all the ducks cheered!",
    questions:[
      {q:"What color was the boat?",opts:["Red","Green","Yellow","Blue"],answer:3},
      {q:"How was the wind?",opts:["Calm","Strong","Cold","Hot"],answer:1},
      {q:"Who cheered for the boat?",opts:["Fish","Frogs","Ducks","Swans"],answer:2},
    ]},
  {id:4,title:"Bedtime for Bear",emoji:"🐻",level:"easy",
    text:"Little Bear did not want to sleep. He played with his toys. He read a book. He drew a picture. Then Mama Bear sang a soft song. Little Bear yawned. His eyes got heavy. Soon he was fast asleep and dreaming of honey!",
    questions:[
      {q:"What did Little Bear not want to do?",opts:["Eat","Play","Sleep","Sing"],answer:2},
      {q:"What did Mama Bear do?",opts:["Read a book","Sang a song","Made food","Told a joke"],answer:1},
      {q:"What did Bear dream about?",opts:["Stars","Friends","Honey","Toys"],answer:2},
    ]},
  {id:5,title:"The Rainbow Cake",emoji:"🎂",level:"medium",
    text:"Lily wanted to bake a special cake for her mom. She mixed red, orange, yellow, green, blue and purple batter. She put each color in the pan one by one. When the cake was done she put white frosting on top. Mom was so surprised! It was a rainbow inside! Everyone got a colorful slice.",
    questions:[
      {q:"Who was the cake for?",opts:["Her dad","Her friend","Her mom","Her teacher"],answer:2},
      {q:"How many colors did Lily use?",opts:["Three","Four","Five","Six"],answer:3},
      {q:"What was on top of the cake?",opts:["Sprinkles","White frosting","Chocolate","Fruit"],answer:1},
    ]},
  {id:6,title:"The Helpful Robot",emoji:"🤖",level:"medium",
    text:"Sam built a robot from boxes and tape. He called it Beep. Sam told Beep to clean his room. Beep picked up all the toys and put them in the right places. Then Beep folded the clothes. Mom came in and could not believe her eyes. The room was perfectly clean!",
    questions:[
      {q:"What was the robot made from?",opts:["Metal","Wood","Boxes and tape","Plastic"],answer:2},
      {q:"What was the robot's name?",opts:["Buzz","Beep","Bolt","Bop"],answer:1},
      {q:"What did Beep do first?",opts:["Folded clothes","Made the bed","Picked up toys","Swept the floor"],answer:2},
    ]},
  {id:7,title:"The Moon Visit",emoji:"🌙",level:"medium",
    text:"One clear night Maya looked up at the moon. She wished she could visit it. She closed her eyes tight. When she opened them she was standing on the moon! The ground was soft and gray. She bounced very high because the moon has less gravity. She could see the whole Earth below, blue and beautiful.",
    questions:[
      {q:"When did Maya look at the moon?",opts:["Morning","Afternoon","Night","Noon"],answer:2},
      {q:"Why could Maya bounce high?",opts:["She had wings","Less gravity","She was strong","The ground was bouncy"],answer:1},
      {q:"What color was Earth from the moon?",opts:["Green","Red","Blue","Yellow"],answer:2},
    ]},
  {id:8,title:"The Sharing Squirrel",emoji:"🐿️",level:"easy",
    text:"Nutkin the squirrel found a huge pile of acorns. He wanted to keep them all. But then he saw his friend Robin shivering in the cold with no food. Nutkin gave Robin half of his acorns. Robin smiled and shared some berries with Nutkin. Now they both had a yummy dinner!",
    questions:[
      {q:"What did Nutkin find?",opts:["Berries","Nuts","Acorns","Seeds"],answer:2},
      {q:"Why was Robin sad?",opts:["He was lost","He had no food","He was hurt","He was tired"],answer:1},
      {q:"What did Robin share with Nutkin?",opts:["Acorns","Honey","Berries","Bread"],answer:2},
    ]},
  {id:9,title:"The Flying Umbrella",emoji:"☂️",level:"medium",
    text:"On a very windy day Zara held her red umbrella tight. But a big gust of wind lifted her off the ground! She flew over the park and the school. She waved to her friends below. When the wind calmed down she landed gently in her own backyard. What an adventure!",
    questions:[
      {q:"What color was the umbrella?",opts:["Blue","Yellow","Red","Green"],answer:2},
      {q:"What lifted Zara up?",opts:["A bird","A balloon","A gust of wind","A plane"],answer:2},
      {q:"Where did Zara land?",opts:["At school","In the park","On a roof","In her backyard"],answer:3},
    ]},
  {id:10,title:"The Treasure Map",emoji:"🗺️",level:"hard",
    text:"Ben found an old map in his attic. It had a red X on it. He followed the map through the garden past the big oak tree and behind the shed. He dug where the X was. He found a small metal box! Inside was a note from his grandpa that said: The real treasure is the adventure. And a bag of gold chocolate coins!",
    questions:[
      {q:"Where did Ben find the map?",opts:["In the garden","Under his bed","In the attic","At school"],answer:2},
      {q:"What was behind the shed?",opts:["A dog","The treasure spot","A door","A pond"],answer:1},
      {q:"What was in the box?",opts:["Real gold","A toy","A note and chocolate coins","A key"],answer:2},
    ]},
];const SHAPES=[
  {name:"circle",emoji:"🔵",desc:"Round like a ball!",sides:0,ph:["s","ir","c","l"],sentence:"A circle is round like a ball!",
    scene:{bg:"linear-gradient(180deg,#87CEEB,#B0E0E6,#98FB98)",elements:[{emoji:"🔵",size:70,x:50,y:35,anim:"floatBob",dur:2},{emoji:"⚽",size:30,x:25,y:55,anim:"ballBounce",dur:1.5},{emoji:"🍩",size:28,x:75,y:55,anim:"eggWobble",dur:2},{emoji:"🌕",size:32,x:50,y:15,anim:"moonGlow",dur:3}]}},
  {name:"square",emoji:"🟧",desc:"Four equal sides!",sides:4,ph:["s","q","air"],sentence:"A square has four equal sides!",
    scene:{bg:"linear-gradient(180deg,#FFECD2,#FCB69F,#FF9A9E)",elements:[{emoji:"🟧",size:70,x:50,y:35,anim:"eggWobble",dur:2},{emoji:"📦",size:30,x:25,y:60,anim:"floatBob",dur:2},{emoji:"🧱",size:28,x:75,y:60,anim:"floatBob",dur:2.5,delay:0.3}]}},
  {name:"triangle",emoji:"🔺",desc:"Three corners!",sides:3,ph:["t","r","igh","a","ng","l"],sentence:"A triangle has three corners!",
    scene:{bg:"linear-gradient(180deg,#A8E6CF,#DCEDC1,#FFD3B6)",elements:[{emoji:"🔺",size:70,x:50,y:35,anim:"floatBob",dur:2},{emoji:"⛰️",size:40,x:25,y:55,anim:"sway",dur:3},{emoji:"🏔️",size:44,x:75,y:50,anim:"sway",dur:3.5,delay:0.3}]}},
  {name:"star",emoji:"⭐",desc:"Twinkle twinkle!",sides:5,ph:["s","t","ar"],sentence:"Stars twinkle in the night sky!",
    scene:{bg:"linear-gradient(180deg,#0D1B2A,#1B2838,#2C3E50)",elements:[...Array.from({length:12},(_,i)=>({emoji:"⭐",size:12+Math.random()*20,x:5+Math.random()*90,y:5+Math.random()*70,anim:"twinkle",dur:1+Math.random()*2,delay:Math.random()*2})),{emoji:"🌙",size:40,x:80,y:15,anim:"moonGlow",dur:3}]}},
  {name:"heart",emoji:"❤️",desc:"Full of love!",sides:0,ph:["h","ar","t"],sentence:"A heart means love!",
    scene:{bg:"linear-gradient(180deg,#FFE4E1,#FFC0CB,#FF69B4)",elements:[...Array.from({length:6},(_,i)=>({emoji:["❤️","💕","💗","💖"][i%4],size:18+Math.random()*20,x:10+Math.random()*80,y:10+Math.random()*60,anim:"floatBob",dur:2+Math.random()*2,delay:i*0.3}))]}},
  {name:"diamond",emoji:"💎",desc:"Sparkly!",sides:4,ph:["d","igh","m","u","n","d"],sentence:"A diamond sparkles in the light!",
    scene:{bg:"linear-gradient(180deg,#1B1B4B,#2B1B5B,#4B0082)",elements:[{emoji:"💎",size:60,x:50,y:35,anim:"sunPulse",dur:2},...Array.from({length:8},(_,i)=>({emoji:"✨",size:10+Math.random()*16,x:10+Math.random()*80,y:10+Math.random()*70,anim:"twinkle",dur:1+Math.random()*2,delay:i*0.2}))]}},

  {name:"oval",emoji:"🥚",desc:"Like an egg!",sides:0,ph:["o","v","a","l"],sentence:"An oval is shaped like an egg!",
    scene:{bg:"linear-gradient(180deg,#FFF8DC,#FAFAD2,#EEE8AA)",elements:[{emoji:"🥚",size:50,x:40,y:35,anim:"eggWobble",dur:2},{emoji:"🏈",size:36,x:65,y:50,anim:"floatBob",dur:2.5},{emoji:"🪞",size:28,x:25,y:55,anim:"sway",dur:3}]}},
  {name:"rectangle",emoji:"📦",desc:"Like a door!",sides:4,ph:["r","e","c","t","a","ng","l"],sentence:"A rectangle is like a door!",
    scene:{bg:"linear-gradient(180deg,#E8F5E9,#C8E6C9,#A5D6A7)",elements:[{emoji:"📦",size:50,x:40,y:35,anim:"floatBob",dur:2},{emoji:"🚪",size:40,x:65,y:45,anim:"sway",dur:3},{emoji:"📱",size:28,x:25,y:55,anim:"eggWobble",dur:2}]}},
  {name:"pentagon",emoji:"⬠",desc:"Five sides!",sides:5,ph:["p","e","n","t","a","g","o","n"],sentence:"A pentagon has five sides!",
    scene:{bg:"linear-gradient(180deg,#E3F2FD,#BBDEFB,#90CAF9)",elements:[{emoji:"⬠",size:60,x:50,y:35,anim:"floatBob",dur:2},{emoji:"🏠",size:36,x:25,y:55,anim:"sway",dur:3},{emoji:"⭐",size:24,x:75,y:25,anim:"twinkle",dur:2}]}},
  {name:"hexagon",emoji:"⬡",desc:"Six sides like a honeycomb!",sides:6,ph:["h","e","x","a","g","o","n"],sentence:"Bees make hexagon shapes!",
    scene:{bg:"linear-gradient(180deg,#FFF8E1,#FFECB3,#FFD54F)",elements:[{emoji:"⬡",size:50,x:50,y:35,anim:"floatBob",dur:2},{emoji:"🐝",size:30,x:30,y:50,anim:"birdFly",dur:3},{emoji:"🍯",size:28,x:70,y:55,anim:"eggWobble",dur:2}]}},
  {name:"arrow",emoji:"➡️",desc:"Points the way!",sides:0,ph:["a","r","ow"],sentence:"An arrow shows which way to go!",
    scene:{bg:"linear-gradient(180deg,#F3E5F5,#E1BEE7,#CE93D8)",elements:[{emoji:"➡️",size:50,x:50,y:35,anim:"truckDrive",dur:3},{emoji:"⬆️",size:24,x:30,y:25,anim:"floatBob",dur:2},{emoji:"⬇️",size:24,x:70,y:60,anim:"floatBob",dur:2.5}]}},
  {name:"crescent",emoji:"🌙",desc:"Like the moon!",sides:0,ph:["c","r","e","s","e","n","t"],sentence:"The crescent moon shines at night!",
    scene:{bg:"linear-gradient(180deg,#1A237E,#283593,#3949AB)",elements:[{emoji:"🌙",size:60,x:50,y:30,anim:"moonGlow",dur:3},...Array.from({length:8},(_,i)=>({emoji:"⭐",size:8+Math.random()*12,x:5+Math.random()*90,y:5+Math.random()*60,anim:"twinkle",dur:1+Math.random()*2,delay:Math.random()*2}))]}},
];
const COLORSDATA=[
  {name:"red",hex:"#EF4444",emoji:"🍎",things:["apple","fire truck","strawberry"],ph:["r","e","d"],sentence:"Red is the color of a fire truck!",
    scene:{bg:"linear-gradient(180deg,#FCA5A5,#EF4444,#DC2626)",elements:[{emoji:"🍎",size:40,x:30,y:30,anim:"floatBob",dur:2},{emoji:"🚒",size:50,x:60,y:50,anim:"truckDrive",dur:3},{emoji:"🍓",size:28,x:20,y:60,anim:"eggWobble",dur:2},{emoji:"🌹",size:30,x:75,y:25,anim:"sway",dur:3}]}},
  {name:"blue",hex:"#3B82F6",emoji:"🌊",things:["ocean","sky","blueberry"],ph:["b","l","oo"],sentence:"The sky is bright blue!",
    scene:{bg:"linear-gradient(180deg,#3B82F6,#60A5FA,#93C5FD)",elements:[{emoji:"☁️",size:36,x:20,y:15,anim:"cloudDrift",dur:8},{emoji:"☁️",size:30,x:70,y:10,anim:"cloudDrift",dur:10,delay:2},{emoji:"🌊",size:50,x:50,y:70,anim:"waveBob",dur:2},{emoji:"🐟",size:24,x:30,y:60,anim:"fishSwim",dur:4}]}},
  {name:"green",hex:"#22C55E",emoji:"🌿",things:["grass","frog","tree"],ph:["g","r","ee","n"],sentence:"Grass is always green!",
    scene:{bg:"linear-gradient(180deg,#86EFAC,#22C55E,#16A34A)",elements:[{emoji:"🌳",size:50,x:20,y:30,anim:"sway",dur:3},{emoji:"🌳",size:55,x:80,y:25,anim:"sway",dur:3.5,delay:0.3},{emoji:"🐸",size:36,x:50,y:55,anim:"birdBob",dur:1.5},{emoji:"🌿",size:24,x:40,y:70,anim:"sway",dur:2}]}},
  {name:"yellow",hex:"#EAB308",emoji:"🌻",things:["sun","banana","star"],ph:["y","e","l","ow"],sentence:"The sun is bright yellow!",
    scene:{bg:"linear-gradient(180deg,#FEF08A,#EAB308,#CA8A04)",elements:[{emoji:"☀️",size:60,x:50,y:25,anim:"sunPulse",dur:3},{emoji:"🌻",size:36,x:25,y:60,anim:"sway",dur:2.5},{emoji:"🍌",size:30,x:70,y:55,anim:"floatBob",dur:2}]}},
  {name:"orange",hex:"#F97316",emoji:"🍊",things:["orange","pumpkin","carrot"],ph:["o","r","i","n","j"],sentence:"An orange is round and sweet!",
    scene:{bg:"linear-gradient(180deg,#FDBA74,#F97316,#EA580C)",elements:[{emoji:"🍊",size:44,x:40,y:30,anim:"floatBob",dur:2},{emoji:"🎃",size:40,x:65,y:45,anim:"eggWobble",dur:2.5},{emoji:"🥕",size:28,x:25,y:55,anim:"sway",dur:2}]}},
  {name:"purple",hex:"#A855F7",emoji:"🍇",things:["grapes","plum","violet"],ph:["p","ur","p","l"],sentence:"Grapes are yummy and purple!",
    scene:{bg:"linear-gradient(180deg,#C084FC,#A855F7,#E67A30)",elements:[{emoji:"🍇",size:44,x:40,y:30,anim:"floatBob",dur:2},{emoji:"🔮",size:36,x:65,y:45,anim:"sunPulse",dur:3},{emoji:"🦄",size:30,x:25,y:60,anim:"birdBob",dur:1.8}]}},
  {name:"pink",hex:"#EC4899",emoji:"🌸",things:["flower","flamingo","candy"],ph:["p","i","n","k"],sentence:"Pink flowers smell so nice!",
    scene:{bg:"linear-gradient(180deg,#FBCFE8,#EC4899,#DB2777)",elements:[...Array.from({length:6},(_,i)=>({emoji:["🌸","🌷","🌺","💮"][i%4],size:20+Math.random()*16,x:10+Math.random()*80,y:10+Math.random()*60,anim:"floatBob",dur:2+Math.random()*2,delay:i*0.2})),{emoji:"🦩",size:36,x:50,y:70,anim:"birdBob",dur:1.8}]}},
  {name:"brown",hex:"#92400E",emoji:"🐻",things:["bear","chocolate","tree trunk"],ph:["b","r","ow","n"],sentence:"Bears are big and brown!",
    scene:{bg:"linear-gradient(180deg,#D2B48C,#92400E,#78350F)",elements:[{emoji:"🐻",size:56,x:50,y:35,anim:"puppyWag",dur:1.5},{emoji:"🌰",size:24,x:25,y:60,anim:"floatBob",dur:2},{emoji:"🍫",size:28,x:70,y:55,anim:"eggWobble",dur:2}]}},

  {name:"white",hex:"#F5F5F5",emoji:"☁️",things:["cloud","snow","milk"],ph:["w","igh","t"],sentence:"Clouds are fluffy and white!",
    scene:{bg:"linear-gradient(180deg,#F5F5F5,#E8E8E8,#FAFAFA)",elements:[{emoji:"☁️",size:50,x:40,y:25,anim:"cloudDrift",dur:8},{emoji:"❄️",size:20,x:60,y:40,anim:"twinkle",dur:2},{emoji:"🥛",size:30,x:30,y:60,anim:"floatBob",dur:2}]}},
  {name:"black",hex:"#1C1C2B",emoji:"🖤",things:["night","crow","coal"],ph:["b","l","a","ck"],sentence:"The night sky is black!",
    scene:{bg:"linear-gradient(180deg,#0a0a0a,#1a1a2e,#2d2d44)",elements:[{emoji:"🌑",size:40,x:50,y:25,anim:"moonGlow",dur:3},{emoji:"🦇",size:28,x:30,y:45,anim:"birdFly",dur:4},{emoji:"🐈‍⬛",size:32,x:65,y:60,anim:"puppyWag",dur:2}]}},
  {name:"gray",hex:"#9CA3AF",emoji:"🐘",things:["elephant","rock","cloud"],ph:["g","r","ai"],sentence:"Elephants are big and gray!",
    scene:{bg:"linear-gradient(180deg,#D1D5DB,#9CA3AF,#6B7280)",elements:[{emoji:"🐘",size:50,x:50,y:40,anim:"puppyWag",dur:2},{emoji:"🪨",size:24,x:25,y:60,anim:"floatBob",dur:2.5},{emoji:"🌫️",size:40,x:70,y:20,anim:"cloudDrift",dur:6}]}},
  {name:"gold",hex:"#FFD700",emoji:"🏆",things:["trophy","ring","coin"],ph:["g","o","l","d"],sentence:"Gold shines like the sun!",
    scene:{bg:"linear-gradient(180deg,#FFF8DC,#FFD700,#DAA520)",elements:[{emoji:"🏆",size:50,x:50,y:35,anim:"sunPulse",dur:2},{emoji:"💰",size:28,x:25,y:55,anim:"floatBob",dur:2},{emoji:"👑",size:32,x:70,y:25,anim:"eggWobble",dur:2.5}]}},
  {name:"silver",hex:"#C0C0C0",emoji:"🪙",things:["coin","spoon","star"],ph:["s","i","l","v","er"],sentence:"Silver coins are shiny!",
    scene:{bg:"linear-gradient(180deg,#E8E8E8,#C0C0C0,#A8A8A8)",elements:[{emoji:"🪙",size:40,x:40,y:35,anim:"coinSp",dur:2},{emoji:"⭐",size:28,x:65,y:25,anim:"twinkle",dur:2},{emoji:"🥈",size:32,x:30,y:55,anim:"floatBob",dur:2.5}]}},
];

// Fun facts for numbers 1-20 (used in Basics)
const NUM_FUN={1:"1 egg in an egg cup!",2:"2 eyes to see!",3:"3 little kittens!",4:"4 legs on a dog!",5:"5 fingers on a hand!",6:"6 legs on a bug!",7:"7 colors in a rainbow!",8:"8 legs on an octopus!",9:"9 planets long ago!",10:"10 toes on your feet!",11:"11 players in football!",12:"12 months in a year!",13:"13 is a baker\'s dozen!",14:"14 days in two weeks!",15:"15 minutes is a quarter hour!",16:"16 ounces in a pound!",17:"17 is a prime number!",18:"18 holes on a golf course!",19:"19 is almost twenty!",20:"20 fingers and toes!"};
const NUM_EMOJI={1:"🥚",2:"👀",3:"🐱",4:"🐕",5:"🖐️",6:"🐛",7:"🌈",8:"🐙",9:"🪐",10:"🦶",11:"⚽",12:"📅",13:"🍩",14:"📆",15:"⏰",16:"⚖️",17:"🔢",18:"⛳",19:"🔟",20:"👣"};

// Alphabet data — examples, phonics for each letter
const ALPHA_DATA={
A:{ph:"aaah",examples:[{w:"Apple",e:"🍎"},{w:"Ant",e:"🐜"},{w:"Aeroplane",e:"✈️"},{w:"Alligator",e:"🐊"},{w:"Astronaut",e:"👨‍🚀"}]},
B:{ph:"buh",examples:[{w:"Ball",e:"⚽"},{w:"Bear",e:"🐻"},{w:"Butterfly",e:"🦋"},{w:"Banana",e:"🍌"},{w:"Bus",e:"🚌"}]},
C:{ph:"kuh",examples:[{w:"Cat",e:"🐱"},{w:"Car",e:"🚗"},{w:"Cake",e:"🎂"},{w:"Cow",e:"🐮"},{w:"Crown",e:"👑"}]},
D:{ph:"duh",examples:[{w:"Dog",e:"🐶"},{w:"Duck",e:"🦆"},{w:"Drum",e:"🥁"},{w:"Diamond",e:"💎"},{w:"Dolphin",e:"🐬"}]},
E:{ph:"ehhh",examples:[{w:"Elephant",e:"🐘"},{w:"Egg",e:"🥚"},{w:"Eagle",e:"🦅"},{w:"Earth",e:"🌍"},{w:"Eye",e:"👁️"}]},
F:{ph:"fff",examples:[{w:"Fish",e:"🐟"},{w:"Flower",e:"🌸"},{w:"Frog",e:"🐸"},{w:"Fire",e:"🔥"},{w:"Football",e:"⚽"}]},
G:{ph:"guh",examples:[{w:"Grapes",e:"🍇"},{w:"Giraffe",e:"🦒"},{w:"Guitar",e:"🎸"},{w:"Gift",e:"🎁"},{w:"Globe",e:"🌍"}]},
H:{ph:"hah",examples:[{w:"Horse",e:"🐴"},{w:"Hat",e:"🎩"},{w:"Heart",e:"❤️"},{w:"House",e:"🏠"},{w:"Honey",e:"🍯"}]},
I:{ph:"iiih",examples:[{w:"Ice cream",e:"🍦"},{w:"Igloo",e:"🏔️"},{w:"Island",e:"🏝️"},{w:"Ink",e:"🖊️"},{w:"Insect",e:"🐛"}]},
J:{ph:"juh",examples:[{w:"Jelly",e:"🍮"},{w:"Juice",e:"🧃"},{w:"Jaguar",e:"🐆"},{w:"Jet",e:"✈️"},{w:"Jewel",e:"💎"}]},
K:{ph:"kuh",examples:[{w:"Kite",e:"🪁"},{w:"King",e:"🤴"},{w:"Kangaroo",e:"🦘"},{w:"Key",e:"🔑"},{w:"Koala",e:"🐨"}]},
L:{ph:"lll",examples:[{w:"Lion",e:"🦁"},{w:"Lamp",e:"💡"},{w:"Lemon",e:"🍋"},{w:"Leaf",e:"🍃"},{w:"Ladybug",e:"🐞"}]},
M:{ph:"mmm",examples:[{w:"Monkey",e:"🐒"},{w:"Moon",e:"🌙"},{w:"Mango",e:"🥭"},{w:"Music",e:"🎵"},{w:"Mountain",e:"⛰️"}]},
N:{ph:"nnn",examples:[{w:"Nest",e:"🪹"},{w:"Nose",e:"👃"},{w:"Nut",e:"🥜"},{w:"Night",e:"🌙"},{w:"Notebook",e:"📓"}]},
O:{ph:"ohhh",examples:[{w:"Orange",e:"🍊"},{w:"Owl",e:"🦉"},{w:"Octopus",e:"🐙"},{w:"Ocean",e:"🌊"},{w:"Onion",e:"🧅"}]},
P:{ph:"puh",examples:[{w:"Penguin",e:"🐧"},{w:"Pizza",e:"🍕"},{w:"Parrot",e:"🦜"},{w:"Piano",e:"🎹"},{w:"Ollie",e:"🦉"}]},
Q:{ph:"kwuh",examples:[{w:"Queen",e:"👸"},{w:"Quilt",e:"🛏️"},{w:"Question",e:"❓"},{w:"Quail",e:"🐦"},{w:"Quiet",e:"🤫"}]},
R:{ph:"rrr",examples:[{w:"Rabbit",e:"🐰"},{w:"Rainbow",e:"🌈"},{w:"Rocket",e:"🚀"},{w:"Rose",e:"🌹"},{w:"Robot",e:"🤖"}]},
S:{ph:"sss",examples:[{w:"Sun",e:"☀️"},{w:"Star",e:"⭐"},{w:"Snake",e:"🐍"},{w:"Ship",e:"🚢"},{w:"Strawberry",e:"🍓"}]},
T:{ph:"tuh",examples:[{w:"Tiger",e:"🐯"},{w:"Train",e:"🚂"},{w:"Tree",e:"🌳"},{w:"Turtle",e:"🐢"},{w:"Telescope",e:"🔭"}]},
U:{ph:"uhhh",examples:[{w:"Umbrella",e:"☂️"},{w:"Unicorn",e:"🦄"},{w:"Uniform",e:"👔"},{w:"Universe",e:"🌌"},{w:"Uncle",e:"👨"}]},
V:{ph:"vvv",examples:[{w:"Violin",e:"🎻"},{w:"Volcano",e:"🌋"},{w:"Van",e:"🚐"},{w:"Vase",e:"🏺"},{w:"Vulture",e:"🦅"}]},
W:{ph:"wuh",examples:[{w:"Whale",e:"🐋"},{w:"Watch",e:"⌚"},{w:"Watermelon",e:"🍉"},{w:"Wolf",e:"🐺"},{w:"Window",e:"🪟"}]},
X:{ph:"ks",examples:[{w:"Xylophone",e:"🎵"},{w:"X-ray",e:"🩻"},{w:"Fox",e:"🦊"},{w:"Box",e:"📦"},{w:"Taxi",e:"🚕"}]},
Y:{ph:"yuh",examples:[{w:"Yak",e:"🦬"},{w:"Yacht",e:"⛵"},{w:"Yogurt",e:"🥛"},{w:"Yellow",e:"🟡"},{w:"Yarn",e:"🧶"}]},
Z:{ph:"zzz",examples:[{w:"Zebra",e:"🦓"},{w:"Zoo",e:"🦁"},{w:"Zigzag",e:"⚡"},{w:"Zero",e:"0️⃣"},{w:"Zipper",e:"🤐"}]},
};
const ALPHA_LETTERS="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const ALPHA_COLORS=["#FF6B6B","#4ECDC4","#FF8C42","#A855F7","#F472B6","#3B82F6","#22C55E","#EAB308","#EF4444","#0EA5E9","#FF8C42","#14B8A6","#F97316"];

// Math visual emojis for counting
const MATH_EMOJI=["🍎","🍊","🍋","🍇","🍓","⭐","🌸","🐟","🦋","🎈","🍌","🍒","🌻","🐱","🐶"];
const getMathEmoji=(i)=>MATH_EMOJI[i%MATH_EMOJI.length];

// How to write each number - stroke descriptions for kids
const NUM_STROKES={
  1:"Start at top. One straight line down ↓",
  2:"Curve right at top ↗, slide down left ↙, then straight right →",
  3:"Curve right ↗ then curve right again ↗. Two bumps!",
  4:"Down ↓, go right →, then a tall line down ↓",
  5:"Go right →, down ↓, curve right ↗. Like a hook!",
  6:"Big curve down ↙ and around ↺ into a circle",
  7:"Straight right → then slide down left ↙",
  8:"Make an S going down, then loop back up ↺",
  9:"Small circle on top ○ then a line going down ↓",
  10:"One line down ↓ and a big circle ○ next to it",
  11:"Two straight lines down ↓ ↓ side by side",
  12:"One line ↓ then curve ↗ slide ↙ go right →",
  13:"One line ↓ then two bumps ↗↗",
  14:"One ↓ then down ↓ right → tall ↓",
  15:"One ↓ then right → down ↓ curve ↗",
  16:"One ↓ then curve ↙ around ↺ circle",
  17:"One ↓ then right → slide down ↙",
  18:"One ↓ then S loop ↺ back up",
  19:"One ↓ then circle ○ line down ↓",
  20:"Curve ↗ slide ↙ right → then big circle ○",
};

// Number templates: 6 cols x 8 rows grid. 1=ink expected
const NUM_TPL={
1:[0,0,1,0,0,0, 0,1,1,0,0,0, 0,0,1,0,0,0, 0,0,1,0,0,0, 0,0,1,0,0,0, 0,0,1,0,0,0, 0,0,1,0,0,0, 0,1,1,1,0,0],
2:[0,1,1,1,0,0, 1,0,0,0,1,0, 0,0,0,0,1,0, 0,0,0,1,0,0, 0,0,1,0,0,0, 0,1,0,0,0,0, 1,0,0,0,0,0, 1,1,1,1,1,0],
3:[0,1,1,1,0,0, 1,0,0,0,1,0, 0,0,0,0,1,0, 0,0,1,1,0,0, 0,0,0,0,1,0, 0,0,0,0,1,0, 1,0,0,0,1,0, 0,1,1,1,0,0],
4:[0,0,0,1,0,0, 0,0,1,1,0,0, 0,1,0,1,0,0, 1,0,0,1,0,0, 1,1,1,1,1,0, 0,0,0,1,0,0, 0,0,0,1,0,0, 0,0,0,1,0,0],
5:[1,1,1,1,1,0, 1,0,0,0,0,0, 1,0,0,0,0,0, 1,1,1,1,0,0, 0,0,0,0,1,0, 0,0,0,0,1,0, 1,0,0,0,1,0, 0,1,1,1,0,0],
6:[0,0,1,1,0,0, 0,1,0,0,0,0, 1,0,0,0,0,0, 1,1,1,1,0,0, 1,0,0,0,1,0, 1,0,0,0,1,0, 1,0,0,0,1,0, 0,1,1,1,0,0],
7:[1,1,1,1,1,0, 0,0,0,0,1,0, 0,0,0,1,0,0, 0,0,0,1,0,0, 0,0,1,0,0,0, 0,0,1,0,0,0, 0,1,0,0,0,0, 0,1,0,0,0,0],
8:[0,1,1,1,0,0, 1,0,0,0,1,0, 1,0,0,0,1,0, 0,1,1,1,0,0, 1,0,0,0,1,0, 1,0,0,0,1,0, 1,0,0,0,1,0, 0,1,1,1,0,0],
9:[0,1,1,1,0,0, 1,0,0,0,1,0, 1,0,0,0,1,0, 1,0,0,0,1,0, 0,1,1,1,1,0, 0,0,0,0,1,0, 0,0,0,1,0,0, 0,1,1,0,0,0],
0:[0,1,1,1,0,0, 1,0,0,0,1,0, 1,0,0,0,1,0, 1,0,0,0,1,0, 1,0,0,0,1,0, 1,0,0,0,1,0, 1,0,0,0,1,0, 0,1,1,1,0,0],
};

// Helpers
const wait=(ms)=>new Promise(r=>setTimeout(r,ms));
const N_GRADIENTS=["linear-gradient(135deg,#FF6B6B,#EE5A5A)","linear-gradient(135deg,#54A0FF,#2E86DE)","linear-gradient(135deg,#FF9F43,#EE8520)","linear-gradient(135deg,#00D2A0,#00B894)","linear-gradient(135deg,#A29BFE,#6C5CE7)","linear-gradient(135deg,#FD79A8,#E84393)","linear-gradient(135deg,#FECA57,#F9CA24)","linear-gradient(135deg,#00CEC9,#00B5AD)","linear-gradient(135deg,#74B9FF,#0984E3)","linear-gradient(135deg,#FF6348,#EE5A24)"];
const nGrad=(n)=>N_GRADIENTS[(n-1)%10];
const nClr=(n)=>["#FF6B6B","#54A0FF","#FF9F43","#00D2A0","#A29BFE","#FD79A8","#FECA57","#00CEC9","#74B9FF","#FF6348"][(n-1)%10];
// Normalize speech: "17" → "seventeen", strip filler words, fix common mishears
const normalizeSpoken=(text)=>{
  let t=text.trim().toLowerCase();
  // Replace digits with words: "17" → "seventeen"
  t=t.replace(/\b(\d+)\b/g,(match)=>{const n=parseInt(match);if(n>=0&&n<=100&&NW[n])return NW[n];return match;});
  // Strip filler words at start
  t=t.replace(/^(the |a |an |uh |um |oh |i said |it's |its |say )/i,'');
  // Common speech-to-text mishears
  const fixes={"for":"four","to":"two","too":"two","won":"one","ate":"eight","tree":"three","free":"three","sex":"six","tin":"ten","night":"nine",
    "read":"red","blew":"blue","grin":"green","greed":"green","yell":"yellow","yell oh":"yellow","pin":"pink","pinkish":"pink","orangey":"orange",
    "hart":"heart","hard":"heart","hut":"heart","start":"star","stare":"star",
    "sickle":"circle","circus":"circle","sir cool":"circle","squire":"square","try angle":"triangle","dime and":"diamond","dim end":"diamond",
    "rectangle":"rectangle","wreck tangle":"rectangle","oval":"oval","oh val":"oval"
  };
  for(const[wrong,right] of Object.entries(fixes)){
    if(t===wrong) t=right;
  }
  return t.trim();
};
const calcAcc=(e,g)=>{if(!e||!g)return 0;const a=e.trim().toLowerCase(),b=normalizeSpoken(g);if(a===b)return 100;const m=Array.from({length:a.length+1},(_,i)=>Array.from({length:b.length+1},(_,j)=>i===0?j:j===0?i:0));for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)m[i][j]=a[i-1]===b[j-1]?m[i-1][j-1]:1+Math.min(m[i-1][j],m[i][j-1],m[i-1][j-1]);return Math.max(0,Math.round((1-m[a.length][b.length]/Math.max(a.length,b.length))*100));};
const getStars=(a)=>a>=90?5:a>=75?4:a>=50?3:a>=35?2:a>=20?1:0;
const getStarPts=(s)=>[0,2,5,10,15,20][s]||0;

// Hooks
const useSpeech=()=>{const[v,setV]=useState([]);
  const onSpeakRef=useRef(null);
  const onDoneRef=useRef(null);
  const cloudAudioRef=useRef(null); // current cloud Audio element
  const cloudPlayingRef=useRef(false); // for lip sync polling
  const[ttsKey,setTtsKey]=useState("");

  // Load API key from storage on mount
  useEffect(()=>{(async()=>{try{const r=await window.storage.get("lg4_tts_key");if(r?.value)setTtsKey(r.value);}catch(e){}})();},[]);
  const saveTtsKey=useCallback(async(key)=>{setTtsKey(key);try{await window.storage.set("lg4_tts_key",key);}catch(e){}},[]);

  // Browser voices setup
  useEffect(()=>{const l=()=>{const x=speechSynthesis.getVoices();if(x.length)setV(x);};l();speechSynthesis.onvoiceschanged=l;return()=>{speechSynthesis.onvoiceschanged=null;};},[]);
  const getV=useCallback(()=>{
    const prefs=["Microsoft Jenny","Samantha","Google UK English Female","Karen","Microsoft Zira","Moira","Tessa","Victoria","Google US English Female","Google US English"];
    for(const n of prefs){const x=v.find(y=>y.name.includes(n)&&y.lang.startsWith("en"));if(x)return x;}
    const female=v.find(x=>x.lang.startsWith("en")&&(x.name.toLowerCase().includes("female")||x.name.includes("Samantha")||x.name.includes("Jenny")||x.name.includes("Zira")));
    if(female)return female;
    return v.find(x=>x.lang.startsWith("en"))||v[0];
  },[v]);

  // Browser TTS (fallback)
  const speakBrowser=useCallback((t,o={})=>new Promise(r=>{
    const u=new SpeechSynthesisUtterance(t);
    let voice=getV();
    if(!voice){
      const nv=speechSynthesis.getVoices();
      const prefs=["Microsoft Jenny","Samantha","Google UK English Female","Karen","Microsoft Zira","Moira","Tessa"];
      for(const n of prefs){const x=nv.find(y=>y.name.includes(n)&&y.lang.startsWith("en"));if(x){voice=x;break;}}
      if(!voice)voice=nv.find(x=>x.lang.startsWith("en"))||nv[0];
    }
    if(voice)u.voice=voice;
    u.rate=o.rate||0.92;u.pitch=o.pitch||1.05;u.lang="en-US";u.volume=1;
    u.onend=()=>{if(onDoneRef.current)onDoneRef.current();r();};
    u.onerror=()=>{r();};
    // ALWAYS cancel previous speech — no exceptions
    speechSynthesis.cancel();
    setTimeout(()=>{try{speechSynthesis.speak(u);}catch(e){r();}},250);
  }),[getV]);

  // Google Cloud TTS — sweet female voice, consistent across all devices
  const speakCloud=useCallback((t,o={})=>new Promise(async(r)=>{
    try{
      // ALWAYS cancel previous — cloud audio + browser TTS
      if(cloudAudioRef.current){
        cloudAudioRef.current.pause();
        cloudAudioRef.current.currentTime=0;
        cloudAudioRef.current=null;
        cloudPlayingRef.current=false;
      }
      speechSynthesis.cancel();

      const resp=await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${ttsKey}`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          input:{text:t},
          voice:{languageCode:"en-US",name:"en-US-Neural2-F"},
          audioConfig:{
            audioEncoding:"MP3",
            speakingRate:o.rate||0.92,
            pitch:(o.pitch?((o.pitch-1)*8):0.4), // map 1.05 → 0.4 semitones (slightly higher, sweet)
            volumeGainDb:1.0,
          }
        })
      });
      if(!resp.ok) throw new Error("Cloud TTS failed: "+resp.status);
      const data=await resp.json();
      if(!data.audioContent) throw new Error("No audio content");

      const audio=new Audio("data:audio/mp3;base64,"+data.audioContent);
      cloudAudioRef.current=audio;
      cloudPlayingRef.current=true;

      audio.onended=()=>{
        cloudPlayingRef.current=false;
        cloudAudioRef.current=null;
        if(onDoneRef.current)onDoneRef.current();
        r();
      };
      audio.onerror=()=>{
        cloudPlayingRef.current=false;
        cloudAudioRef.current=null;
        r();
      };
      await audio.play();
    }catch(e){
      console.log("Cloud TTS error, falling back to browser:",e.message);
      // Fallback to browser TTS
      speakBrowser(t,o).then(r);
    }
  }),[ttsKey,speakBrowser]);

  // Main speak function: cloud if key available, else browser
  const speak=useCallback((t,o={})=>{
    if(onSpeakRef.current)onSpeakRef.current(t);
    if(ttsKey) return speakCloud(t,o);
    return speakBrowser(t,o);
  },[ttsKey,speakCloud,speakBrowser]);

  // Stop both cloud and browser
  const stopAll=useCallback(()=>{
    speechSynthesis.cancel();
    if(cloudAudioRef.current){
      cloudAudioRef.current.pause();
      cloudAudioRef.current.currentTime=0;
      cloudAudioRef.current=null;
    }
    cloudPlayingRef.current=false;
  },[]);

  return{speak,stop:stopAll,onSpeakRef,onDoneRef,cloudPlayingRef,ttsKey,saveTtsKey};
};
const useRec=()=>{
  const[on,setOn]=useState(false);
  const[txt,setTxt]=useState("");
  const[err,setErr]=useState("");
  const supported=!!(window.SpeechRecognition||window.webkitSpeechRecognition);
  const cbRef=useRef(null);
  const recRef=useRef(null);
  const timeoutRef=useRef(null);
  const gotResultRef=useRef(false);
  const permRef=useRef(false); // mic permission granted?

  // Call this ONCE on first user tap — grants persistent mic permission
  const warmUp=useCallback(()=>{
    if(permRef.current) return;
    if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){
      navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
        stream.getTracks().forEach(t=>t.stop());
        permRef.current=true;
        console.log("Mic permission granted");
      }).catch(()=>{});
    }
  },[]);

  const retryCountRef=useRef(0);

  const start=useCallback((cb)=>{
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){setErr("Speech not supported");return;}

    try{recRef.current?.abort();}catch(e){}
    clearTimeout(timeoutRef.current);
    cbRef.current=cb;
    gotResultRef.current=false;
    retryCountRef.current=0;
    setTxt("");setErr("");setOn(true);

    try{speechSynthesis.cancel();}catch(e){}

    const doStart=()=>{
      if(speechSynthesis.speaking){setTimeout(doStart,400);return;}

      const r=new SR();
      r.continuous=true;        // KEEP listening — don't stop on first pause
      r.interimResults=true;
      r.lang="en-US";
      r.maxAlternatives=3;
      recRef.current=r;

      const startTime=Date.now();
      let bestFinal="";
      let bestInterim=""; // Track what user sees as "Heard: ..."
      let acceptTimer=null;

      r.onresult=(e)=>{
        let f="",interim="";
        for(let x=0;x<e.results.length;x++){
          if(e.results[x].isFinal)f+=e.results[x][0].transcript;
          else interim+=e.results[x][0].transcript;
        }
        const t=(f||interim).toLowerCase().trim();
        setTxt(t);
        // Always track best interim (what the user sees)
        if(t) bestInterim=t;
        if(f && t){
          bestFinal=t;
          clearTimeout(acceptTimer);
          acceptTimer=setTimeout(()=>{
            gotResultRef.current=true;
            clearTimeout(timeoutRef.current);
            try{r.stop();}catch(e){}
            setOn(false);
            cbRef.current?.(bestFinal);
          },800);
        }
      };
      r.onerror=(e)=>{
        if(e.error==="not-allowed"){setErr("Mic blocked.");setOn(false);return;}
        // If we heard something (even interim), accept it
        if(!gotResultRef.current && bestInterim){
          gotResultRef.current=true;setOn(false);cbRef.current?.(bestInterim);return;
        }
        if(!gotResultRef.current){retryCountRef.current++;setTxt("Listening...");setTimeout(doStart,2000);}
      };
      r.onend=()=>{
        clearTimeout(acceptTimer);
        // Accept best final if we have it
        if(bestFinal && !gotResultRef.current){
          gotResultRef.current=true;setOn(false);cbRef.current?.(bestFinal);return;
        }
        // FALLBACK: accept interim result if we heard something but browser never marked it final
        if(bestInterim && !gotResultRef.current){
          gotResultRef.current=true;setOn(false);cbRef.current?.(bestInterim);return;
        }
        if(!gotResultRef.current){
          const elapsed=Date.now()-startTime;
          if(elapsed<3000){setTxt("Listening...");setTimeout(doStart,200);return;}
          retryCountRef.current++;
          if(retryCountRef.current%3===0){
            setTxt("One more time!..");setOn(false);
            const u=new SpeechSynthesisUtterance("One more time!");
            u.rate=0.7;u.pitch=1.0;u.lang="en-US";
            u.onend=()=>{setTimeout(()=>{setOn(true);doStart();},800);};
            u.onerror=()=>{setTimeout(()=>{setOn(true);doStart();},800);};
            speechSynthesis.speak(u);
          } else {setTxt("Listening...");setTimeout(doStart,1500);}
        }
      };

      try{r.start();}catch(e){
        if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){
          navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
            stream.getTracks().forEach(t=>t.stop());permRef.current=true;
            try{r.start();}catch(e2){setTimeout(doStart,2000);}
          }).catch(()=>{setErr("Mic access denied.");setOn(false);});
        } else {setTimeout(doStart,2000);}
      }
      clearTimeout(timeoutRef.current);
    };

    setTimeout(doStart,800);
  },[]);



  const stopR=useCallback(()=>{
    clearTimeout(timeoutRef.current);
    try{recRef.current?.abort();}catch(e){}
    try{recRef.current?.stop();}catch(e){}
    setOn(false);
  },[]);

  const quickListen=useCallback((timeoutMs=5000)=>{
    return new Promise((resolve)=>{
      const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
      if(!SR){resolve("");return;}
      try{recRef.current?.abort();}catch(e){}
      clearTimeout(timeoutRef.current);
      const r=new SR();
      r.continuous=false;r.interimResults=true;r.lang="en-US";r.maxAlternatives=3;
      recRef.current=r;
      let resolved=false;let best="";
      const done=(val)=>{if(!resolved){resolved=true;setOn(false);clearTimeout(timeoutRef.current);try{r.abort();}catch(e){}resolve(val||best);}};
      r.onresult=(e)=>{
        let f="",interim="";
        for(let x=0;x<e.results.length;x++){if(e.results[x].isFinal)f+=e.results[x][0].transcript;else interim+=e.results[x][0].transcript;}
        if(f){done(f.toLowerCase().trim());}else if(interim){best=interim.toLowerCase().trim();clearTimeout(timeoutRef.current);timeoutRef.current=setTimeout(()=>done(best),800);}
      };
      r.onerror=()=>done("");r.onend=()=>done("");
      try{r.start();}catch(e){done("");}
      timeoutRef.current=setTimeout(()=>done(""),timeoutMs);
    });
  },[]);

  return{start,stop:stopR,warmUp,quickListen,on,txt,err,supported};
};
const useStore=()=>{const[d,setD]=useState(null);const[ok,setOk]=useState(false);useEffect(()=>{(async()=>{try{const r=await window.storage.get("lg4");if(r?.value)setD(JSON.parse(r.value));}catch(e){}setOk(true);})();},[]);const save=useCallback(async(nd)=>{setD(nd);try{await window.storage.set("lg4",JSON.stringify(nd));}catch(e){}},[]);return{data:d,save,loaded:ok};};

// Small components

// ═══ VIRTUAL TEACHER ═══
const TEACHER_MSGS={
  welcome:["Hi! I'm Ollie 🦉! 🌟","Ready to learn something amazing?","Let's have fun together!"],
  correct:["Wonderful job! ⭐","You're so smart! 🎉","That's perfect! Keep going!","Amazing work, superstar! 🌟","I'm so proud of you! 💪","Brilliant! You got it! ✨","Wow, you're a genius! 🧠"],
  wrong:["Almost there! Try again! 💪","Don't worry, let's try once more!","You can do it! I believe in you! 🌈","So close! Give it another go! ⭐"],
  encourage:["You're doing great! Keep it up!","I love how hard you're trying!","Every mistake helps you learn!","Practice makes perfect! 🎯"],
  celebrate:["SUPERSTAR! 🌟🎉✨","You're absolutely amazing!","I knew you could do it!","What a champion! 🏆"],
  start_numbers:["Let's learn numbers today!","Numbers are everywhere! 🔢"],
  start_phonics:["Time for word magic! 🔤","Let's read new words together!"],
  start_shapes:["Let's explore cool shapes! 🔷","Shapes are all around us!"],
  start_colors:["Colors make the world beautiful! 🎨","Let's paint with words!"],
  start_alphabet:["A-B-C time! Let's go! 🔠","Letters are the building blocks!"],
  start_basics:["Practice makes perfect! ✏️","Let's sharpen those skills!"],
  start_math:["Math is fun! Let's count! ➕","Numbers are your superpower!"],
  listening:["I'm listening... speak clearly! 👂","Go ahead, say it loud! 🗣️"],
  spelling:["Watch carefully! 👀","Let's spell it together!"],
};
const tMsg=(cat)=>{const msgs=TEACHER_MSGS[cat]||TEACHER_MSGS.encourage;return msgs[Math.floor(Math.random()*msgs.length)];};

const BellaChar=({mood,size=110,speaking=false,joyMode=false,shake="",mouthOpen=0})=>{
  const s=size;
  const W=mood==="waving",C=mood==="clapping",T=mood==="thinking",P=mood==="pointing",S=mood==="star",E=mood==="excited",PR=mood==="proud",H=mood==="happy",SAD=mood==="sad";
  const mo=Math.max(0,Math.min(1,mouthOpen));

  return<svg width={s} height={s} viewBox="0 0 80 90" style={{overflow:"visible"}}>
    <defs><style>{`
      @keyframes oFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
      @keyframes oBlink{0%,90%,94%,100%{ry:5}92%{ry:0.5}}
      @keyframes oWave{0%,100%{transform:rotate(0deg)}20%{transform:rotate(-20deg)}40%{transform:rotate(15deg)}60%{transform:rotate(-12deg)}80%{transform:rotate(8deg)}}
      @keyframes oEarTuft{0%,100%{transform:rotate(0deg)}50%{transform:rotate(5deg)}}
      @keyframes oSpark{0%,100%{opacity:0;transform:scale(.5)}50%{opacity:1;transform:scale(1.1)}}
      @keyframes oBlush{0%,100%{opacity:.3}50%{opacity:.55}}
      @keyframes oNod{0%,100%{transform:rotate(0deg)}50%{transform:rotate(2deg)}}
      @keyframes oLook{0%,100%{transform:rotate(0deg) translateX(0)}25%{transform:rotate(-2deg) translateX(-1px)}50%{transform:rotate(1deg) translateX(1px)}75%{transform:rotate(-1deg) translateX(0)}}
      @keyframes oJoy{0%{transform:rotate(0deg)}25%{transform:rotate(4deg)}50%{transform:rotate(-4deg)}75%{transform:rotate(2deg)}100%{transform:rotate(0deg)}}
      @keyframes oYes{0%{transform:rotate(0deg) translateY(0)}15%{transform:rotate(2deg) translateY(1.5px)}30%{transform:rotate(-1deg) translateY(-0.5px)}45%{transform:rotate(1deg) translateY(1px)}100%{transform:rotate(0deg)}}
      @keyframes oNo{0%{transform:rotate(0deg) translateX(0)}15%{transform:rotate(-3deg) translateX(-2px)}35%{transform:rotate(3deg) translateX(2px)}55%{transform:rotate(-2deg) translateX(-1px)}100%{transform:rotate(0deg)}}
      @keyframes oWingFlap{0%,100%{transform:rotate(0deg)}50%{transform:rotate(-12deg)}}
      @keyframes oSadBob{0%,100%{transform:translateY(0)}50%{transform:translateY(2px)}}
    `}</style>
      <radialGradient id="ob" cx="40%" cy="30%"><stop offset="0%" stopColor="#C68642"/><stop offset="100%" stopColor="#8B5E3C"/></radialGradient>
      <radialGradient id="of" cx="50%" cy="35%"><stop offset="0%" stopColor="#F5DEB3"/><stop offset="100%" stopColor="#DEB887"/></radialGradient>
      <radialGradient id="oh" cx="45%" cy="30%"><stop offset="0%" stopColor="#D2946B"/><stop offset="100%" stopColor="#A0704C"/></radialGradient>
    </defs>
    <g style={{animation:SAD?"oSadBob 1.5s ease-in-out infinite":joyMode?"oJoy 0.8s ease-in-out infinite":"oFloat 4s ease-in-out infinite"}}>
      {/* Shadow */}
      <ellipse cx="40" cy="86" rx="14" ry="2.5" fill="rgba(0,0,0,.06)"/>
      {/* Tail feathers */}
      <g style={{transformOrigin:"40px 72px"}}>
        <ellipse cx="34" cy="72" rx="4" ry="6" fill="#8B5E3C" transform="rotate(-10,34,72)"/>
        <ellipse cx="40" cy="73" rx="3.5" ry="6" fill="#A0704C"/>
        <ellipse cx="46" cy="72" rx="4" ry="6" fill="#8B5E3C" transform="rotate(10,46,72)"/>
      </g>
      {/* Body */}
      <ellipse cx="40" cy="58" rx="18" ry="20" fill="url(#ob)"/>
      {/* Belly — cream/white oval */}
      <ellipse cx="40" cy="62" rx="12" ry="14" fill="url(#of)"/>
      {/* Belly feather pattern (V shapes) */}
      <path d="M36,54 L38,57 L40,54" fill="none" stroke="#C68642" strokeWidth=".6" opacity=".4"/>
      <path d="M40,54 L42,57 L44,54" fill="none" stroke="#C68642" strokeWidth=".6" opacity=".4"/>
      <path d="M34,59 L36,62 L38,59" fill="none" stroke="#C68642" strokeWidth=".6" opacity=".3"/>
      <path d="M38,59 L40,62 L42,59" fill="none" stroke="#C68642" strokeWidth=".6" opacity=".3"/>
      <path d="M42,59 L44,62 L46,59" fill="none" stroke="#C68642" strokeWidth=".6" opacity=".3"/>
      {/* Feet */}
      <g>
        <ellipse cx="33" cy="77" rx="5" ry="2.5" fill="#FF9F43"/>
        <circle cx="29" cy="77" r="1.5" fill="#FF9F43"/><circle cx="33" cy="76" r="1.5" fill="#FF9F43"/><circle cx="37" cy="77" r="1.5" fill="#FF9F43"/>
      </g>
      <g>
        <ellipse cx="47" cy="77" rx="5" ry="2.5" fill="#FF9F43"/>
        <circle cx="43" cy="77" r="1.5" fill="#FF9F43"/><circle cx="47" cy="76" r="1.5" fill="#FF9F43"/><circle cx="51" cy="77" r="1.5" fill="#FF9F43"/>
      </g>
      {/* Left wing */}
      <g style={{transformOrigin:"22px 52px",animation:W||C?"oWingFlap .5s ease-in-out infinite":speaking?"oWingFlap 2s ease-in-out infinite":"none"}}>
        <ellipse cx={T?28:22} cy={T?42:55} rx="8" ry="13" fill="#A0704C" transform={T?"rotate(40,28,42)":"rotate(15,22,55)"}/>
        <ellipse cx={T?28:22} cy={T?42:55} rx="5" ry="9" fill="#8B5E3C" transform={T?"rotate(40,28,42)":"rotate(15,22,55)"}/>
      </g>
      {/* Right wing */}
      <g style={{transformOrigin:"58px 52px",animation:W?"oWave 1.2s ease-in-out infinite":C?"oWingFlap .5s ease-in-out infinite":"none"}}>
        <ellipse cx={W?60:58} cy={W?40:55} rx="8" ry="13" fill="#A0704C" transform={W?"rotate(-30,60,40)":"rotate(-15,58,55)"}/>
        <ellipse cx={W?60:58} cy={W?40:55} rx="5" ry="9" fill="#8B5E3C" transform={W?"rotate(-30,60,40)":"rotate(-15,58,55)"}/>
      </g>
      {/* Head */}
      <g style={{transformOrigin:"40px 28px",animation:shake==="yes"?"oYes 1s ease-in-out infinite":shake==="no"?"oNo 1.2s ease-in-out infinite":joyMode?"oJoy 0.8s ease-in-out infinite":speaking?"oNod 2s ease-in-out infinite":"oLook 8s ease-in-out infinite"}}>
        <ellipse cx="40" cy="28" rx="20" ry="17" fill="url(#oh)"/>
        {/* Face disc — lighter facial area (owl characteristic) */}
        <ellipse cx="40" cy="30" rx="15" ry="13" fill="#F5DEB3"/>
        <ellipse cx="40" cy="30" rx="14" ry="12" fill="#FAF0E6"/>
        {/* Ear tufts */}
        <g style={{transformOrigin:"22px 12px",animation:(E||S||W)?"oEarTuft .6s ease-in-out infinite":"none"}}>
          <ellipse cx="23" cy="14" rx="4" ry="8" fill="#8B5E3C" transform="rotate(-15,23,14)"/>
          <ellipse cx="24" cy="15" rx="2.5" ry="5" fill="#A0704C" transform="rotate(-15,24,15)"/>
        </g>
        <g style={{transformOrigin:"58px 12px",animation:(E||S||W)?"oEarTuft .6s ease-in-out .15s infinite":"none"}}>
          <ellipse cx="57" cy="14" rx="4" ry="8" fill="#8B5E3C" transform="rotate(15,57,14)"/>
          <ellipse cx="56" cy="15" rx="2.5" ry="5" fill="#A0704C" transform="rotate(15,56,15)"/>
        </g>
        {/* Big owl eyes — white circles */}
        <circle cx="32" cy="27" r="9" fill="#fff" stroke="#C68642" strokeWidth=".5"/>
        <circle cx="48" cy="27" r="9" fill="#fff" stroke="#C68642" strokeWidth=".5"/>
        {/* Iris */}
        <ellipse style={{animation:"oBlink 4s ease-in-out infinite"}} cx={T?31:SAD?32:33} cy={SAD?28:27} rx="5" ry={SAD?4.5:5} fill="#4A2C1A"/>
        <ellipse style={{animation:"oBlink 4s ease-in-out infinite"}} cx={T?47:SAD?48:49} cy={SAD?28:27} rx="5" ry={SAD?4.5:5} fill="#4A2C1A"/>
        {/* Pupil */}
        <circle cx={T?31:SAD?32:33} cy={SAD?27:26} r="2.5" fill="#111"/>
        <circle cx={T?47:SAD?48:49} cy={SAD?27:26} r="2.5" fill="#111"/>
        {/* Eye sparkle */}
        <circle cx={T?32:SAD?33:34} cy="24.5" r="1.3" fill="#fff"/><circle cx={T?48:SAD?49:50} cy="24.5" r="1.3" fill="#fff"/>
        {(E||S)&&<><circle cx="35" cy="23.5" r=".7" fill="#fff"/><circle cx="51" cy="23.5" r=".7" fill="#fff"/></>}
        {/* Sad tear */}
        {SAD&&<ellipse cx="24" cy="32" rx="1.2" ry="2" fill="#60A5FA" opacity=".7" style={{animation:"oSpark 1.5s ease-in-out infinite"}}/>}
        {/* Beak */}
        <path d="M 38,34 L 40,39 L 42,34 Z" fill="#FF9F43" stroke="#E88B30" strokeWidth=".3"/>
        {/* Mouth — below beak, opens when speaking */}
        {speaking?
          <ellipse cx="40" cy={40+mo*0.5} rx={2+mo*1.5} ry={0.5+mo*2} fill={mo>0.3?"#D93B4B":"none"} stroke="#D93B4B" strokeWidth={mo>0.3?".4":".8"} style={{transition:"rx 0.12s ease, ry 0.12s ease"}}/>:
          (E||S)?<path d="M 37,40 Q 40,43 43,40" fill="none" stroke="#D93B4B" strokeWidth=".8" strokeLinecap="round"/>:
          SAD?<path d="M 38,41 Q 40,38 42,41" fill="none" stroke="#888" strokeWidth=".8" strokeLinecap="round"/>:
          null
        }
        {/* Blush */}
        <ellipse cx="23" cy="33" rx="3" ry="1.8" fill="#FFB4B4" opacity=".35" style={{animation:"oBlush 3s ease-in-out infinite"}}/>
        <ellipse cx="57" cy="33" rx="3" ry="1.8" fill="#FFB4B4" opacity=".35" style={{animation:"oBlush 3s ease-in-out .5s infinite"}}/>
        {/* Graduation cap / scholar hat */}
        <rect x="28" y="11" width="24" height="3" rx="1" fill="#4A2C1A"/>
        <rect x="32" y="6" width="16" height="6" rx="1.5" fill="#4A2C1A"/>
        <circle cx="48" cy="8" r="1.5" fill="#FECA57"/>
        <line x1="48" y1="8" x2="52" y2="13" stroke="#FECA57" strokeWidth=".8"/>
        <circle cx="52" cy="14" r="1.2" fill="#FECA57"/>
      </g>
      {/* Sparkle effects */}
      {(S||E)&&[{x:3,y:10,e:"✨",d:0},{x:69,y:7,e:"⭐",d:.5},{x:70,y:45,e:"🌟",d:1}].map((p,i)=>
        <text key={i} x={p.x} y={p.y} fontSize="7" style={{animation:`oSpark 1.2s ease-in-out ${p.d}s infinite`}}>{p.e}</text>
      )}
      {PR&&[{x:4,y:13,e:"💕",d:0},{x:66,y:9,e:"💖",d:.5}].map((p,i)=>
        <text key={i} x={p.x} y={p.y} fontSize="7" style={{animation:`oSpark 1.8s ease-in-out ${p.d}s infinite`}}>{p.e}</text>
      )}
      {C&&<text x="34" y="48" fontSize="8" style={{animation:"oSpark .5s ease-in-out infinite"}}>👏</text>}
      {W&&<text x="66" y="33" fontSize="7" style={{animation:"oSpark .8s ease-in-out infinite"}}>✨</text>}
    </g>
  </svg>;
};



const Particles=({count=10,emojis=["⭐","✨","🌟","💫"]})=>{const items=useRef(Array.from({length:count},(_,i)=>({id:i,emoji:emojis[i%emojis.length],x:Math.random()*100,y:Math.random()*100,sz:12+Math.random()*14,dur:8+Math.random()*12,dl:-Math.random()*10,dr:20+Math.random()*40}))).current;return<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>{items.map(p=><div key={p.id} style={{position:"absolute",left:`${p.x}%`,top:`${p.y}%`,fontSize:p.sz,opacity:0.25,animation:`floatP ${p.dur}s ease-in-out ${p.dl}s infinite`,"--dr":`${p.dr}px`}}>{p.emoji}</div>)}</div>;};
const Confetti=({active,type})=>{
  const items=useRef(null);
  if(!active){items.current=null;return null;}
  if(!items.current){
    const t=type||0;
    if(t===0){
      // Confetti: colorful paper + a few emoji
      items.current=Array.from({length:55},(_,i)=>({
        isEmoji:i<6,
        emoji:["🎊","🎉","⭐","✨","🎊","🎉"][i]||null,
        x:2+Math.random()*96,
        color:["#FF6B6B","#FBBF24","#4ADE80","#60A5FA","#FFB066","#F472B6","#FF8C42","#34D399"][i%8],
        w:3+Math.random()*7, h:6+Math.random()*12,
        dur:2.2+Math.random()*1.8,
        del:Math.random()*0.8,
        drift:-30+Math.random()*60,
        rot:360+Math.random()*720,
        sz:i<6?(18+Math.random()*12):0,
      }));
    } else if(t===1){
      // Balloons: smooth rise
      items.current=Array.from({length:16},(_,i)=>({
        emoji:["🎈","🎈","🎈","🎈","🎈","🎈","🎈","🎈","🎈","🎈","🎈","🎈","🎈","🎈","🎈","🎈"][i],
        x:4+Math.random()*92,
        sz:30+Math.random()*18,
        dur:3+Math.random()*2,
        del:i*0.15+Math.random()*0.3,
        drift:-12+Math.random()*24,
      }));
    } else {
      // Fireworks: golden/white glowing particles bursting from points
      const sparks=[];
      const pts=[{x:30,y:28},{x:60,y:22},{x:45,y:40},{x:75,y:32}];
      pts.forEach((p,pi)=>{
        // Core flash
        sparks.push({type:"flash",cx:p.x,cy:p.y,sz:8,del:pi*0.5,dur:0.6});
        // Burst particles
        const count=20+Math.floor(Math.random()*10);
        for(let j=0;j<count;j++){
          const angle=(j/count)*Math.PI*2+Math.random()*0.3;
          const speed=50+Math.random()*80;
          const isGold=Math.random()>0.3;
          sparks.push({
            type:"spark",cx:p.x,cy:p.y,
            dx:Math.cos(angle)*speed, dy:Math.sin(angle)*speed,
            sz:2+Math.random()*3,
            color:isGold?`hsl(${40+Math.random()*20},100%,${60+Math.random()*30}%)`:"#fff",
            dur:0.8+Math.random()*0.8,
            del:pi*0.5+Math.random()*0.1,
            trail:6+Math.random()*10,
          });
        }
      });
      items.current=sparks;
    }
  }
  const t=type||0;

  if(t===1) return<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:999,overflow:"hidden"}}>
    {items.current.map((b,i)=><div key={i} style={{
      position:"absolute",left:`${b.x}%`,bottom:"-14%",
      fontSize:b.sz,opacity:0,
      animation:`cBalloon ${b.dur}s cubic-bezier(0.2,0.8,0.3,1) ${b.del}s forwards`,
      "--drift":`${b.drift}px`}}>{b.emoji}</div>)}
  </div>;

  if(t===2) return<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:999,overflow:"hidden",background:"transparent"}}>
    {items.current.map((s,i)=>s.type==="flash"?
      <div key={i} style={{
        position:"absolute",left:`${s.cx}%`,top:`${s.cy}%`,
        width:s.sz,height:s.sz,borderRadius:"50%",
        background:"radial-gradient(circle,#fff 0%,#FFD700 40%,transparent 70%)",
        animation:`cFlash ${s.dur}s ease-out ${s.del}s both`,
        transform:"translate(-50%,-50%)"}}/>:
      <div key={i} style={{
        position:"absolute",left:`${s.cx}%`,top:`${s.cy}%`,
        width:s.sz,height:s.trail,borderRadius:s.sz,
        background:`linear-gradient(to bottom, ${s.color}, transparent)`,
        boxShadow:`0 0 ${s.sz*2}px ${s.color}, 0 0 ${s.sz*4}px ${s.color}44`,
        opacity:0,
        animation:`cSpark ${s.dur}s ease-out ${s.del}s both`,
        "--dx":`${s.dx}px`,"--dy":`${s.dy}px`,
        transformOrigin:"center top"}}/>
    )}
  </div>;

  return<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:999,overflow:"hidden"}}>
    {items.current.map((c,i)=>c.isEmoji?
      <div key={i} style={{
        position:"absolute",left:`${c.x}%`,top:"-8%",
        fontSize:c.sz,opacity:0,
        animation:`cFallEmoji ${c.dur}s ease-in ${c.del}s forwards`,
        "--drift":`${c.drift}px`}}>{c.emoji}</div>:
      <div key={i} style={{
        position:"absolute",left:`${c.x}%`,top:"-5%",
        width:c.w, height:c.h,
        background:c.color, borderRadius:2,opacity:0,
        animation:`cFallPaper ${c.dur}s ease-in ${c.del}s forwards`,
        "--drift":`${c.drift}px`,"--rot":`${c.rot}deg`}}/>
    )}
  </div>;
};
const Stars=({count,size=26})=><div style={{display:"flex",gap:4,justifyContent:"center",margin:"8px 0"}}>{[1,2,3,4,5].map(i=><span key={i} style={{fontSize:size,opacity:i<=count?1:0.2,filter:i<=count?"drop-shadow(0 2px 8px rgba(251,191,36,0.5))":"none",animation:i<=count?`starPop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i*0.12}s both`:"none"}}>{i<=count?"⭐":"☆"}</span>)}</div>;
const Mascot=({mood="happy",msg=""})=>{const f={happy:"😊",excited:"🤩",thinking:"🤔",listening:"👂",cheering:"🥳",speaking:"🗣️",sad:"🥺"};return<div style={{display:"flex",alignItems:"flex-end",gap:10,margin:"4px 0"}}><div style={{fontSize:26,animation:"mascotB 2s ease-in-out infinite",flexShrink:0}}>{f[mood]||"😊"}</div>{msg&&<div style={{background:"#fff",borderRadius:"18px 18px 18px 4px",padding:"4px 10px",fontSize:11,fontWeight:600,color:"#3E4152",boxShadow:"var(--shadow-card)",animation:"bubPop 0.3s cubic-bezier(0.34,1.56,0.64,1)",maxWidth:260,fontFamily:"var(--font)",lineHeight:1.4}}>{msg}</div>}</div>;};
const SoundWave=()=><div style={{display:"flex",justifyContent:"center",gap:3,marginTop:14}}>{[1,2,3,4,5,6,7].map(i=><div key={i} style={{width:4,background:"#EF4444",borderRadius:4,animation:`sndWave 0.8s ease-in-out ${i*0.08}s infinite`}}/>)}</div>;
const ProgressRing=({pct,size=70,color="#22C55E"})=>{const r=(size-10)/2;const c=2*Math.PI*r;return<svg width={size} height={size} style={{transform:"rotate(-90deg)"}}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={10}/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={10} strokeDasharray={c} strokeDashoffset={c-((pct||0)/100)*c} strokeLinecap="round" style={{transition:"stroke-dashoffset 1s ease-out"}}/></svg>;};
const SubHead=({title,onBack,points})=><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 10px",background:"linear-gradient(135deg,#6C5CE7,#A29BFE)",position:"sticky",top:0,zIndex:50,borderRadius:"0 0 16px 16px",boxShadow:"0 4px 20px rgba(108,92,231,0.2)"}}><button onClick={()=>{sfxTap();onBack();}} style={{padding:"8px 14px",borderRadius:14,border:"none",background:"rgba(255,255,255,0.2)",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"var(--font)",color:"#fff",backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)"}}>← Back</button><span style={{fontFamily:"var(--font)",fontSize:18,fontWeight:800,color:"#fff",textShadow:"0 1px 3px rgba(0,0,0,0.15)"}}>{title}</span><div style={{display:"flex",alignItems:"center",gap:4,padding:"6px 12px",borderRadius:16,background:"rgba(255,255,255,0.2)",fontSize:13,fontWeight:800,color:"#FECA57",backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)"}}><span>⭐</span>{points||0}</div></div>;
const FlowSteps=({current,steps})=><div style={{display:"flex",gap:4,justifyContent:"center",margin:"2px 6px 2px",flexWrap:"wrap"}}>{steps.map((s,i)=>{const done=steps.findIndex(x=>x.id===current)>i;const act=current===s.id;return<div key={s.id} style={{display:"flex",alignItems:"center",gap:3}}><div style={{padding:"3px 8px",borderRadius:8,fontSize:9,fontWeight:800,fontFamily:"var(--font)",background:act?"linear-gradient(135deg,#FF8C42,#FF8C42)":done?"#22C55E":"#e5e7eb",color:(act||done)?"#fff":"#aaa",transform:act?"scale(1.08)":"scale(1)"}}>{s.icon} {s.label}</div>{i<steps.length-1&&<span style={{color:"#D4D5D9",fontSize:10}}>→</span>}</div>;})}</div>;
const ListeningBox=({transcript,onTapMic,isListening,error,onType,expected})=>{
  const[typed,setTyped]=useState("");
  return <div data-owl="mic-area" style={{textAlign:"center",padding:12,background:"#fff",borderRadius:20,border:"2px solid #FF8C4211"}}>
    <div style={{display:"flex",alignItems:"center",gap:12}}>
      <button onClick={onTapMic} style={{
        width:56,height:56,borderRadius:"50%",border:"none",cursor:"pointer",flexShrink:0,
        background:isListening?"linear-gradient(135deg,#EF4444,#DC2626)":"linear-gradient(135deg,#FF8C42,#FF8C42)",
        boxShadow:isListening?"0 0 0 6px rgba(239,68,68,0.15)":"0 4px 12px rgba(99,102,241,0.2)",
        animation:isListening?"micP 1.5s ease-in-out infinite":"none",
        display:"flex",alignItems:"center",justifyContent:"center"
      }}>
        <span style={{fontSize:28}}>🎤</span>
      </button>
      <div style={{flex:1,textAlign:"left"}}>
        <p style={{fontSize:12,fontWeight:800,color:isListening?"#DC2626":error?"#D97706":"#FF8C42",margin:0}}>
          {isListening?"🔴 Listening...":error||"Speak now!"}
        </p>
        <p style={{fontSize:16,fontWeight:900,color:"#2D2B3D",margin:"2px 0 0",letterSpacing:1}}>"{expected?.toUpperCase()}"</p>
        {transcript&&<p style={{fontSize:11,fontWeight:700,color:"#22C55E",margin:"2px 0 0"}}>Heard: "{transcript}"</p>}
      </div>
    </div>
    {isListening&&<SoundWave/>}
    <div style={{display:"flex",gap:6,marginTop:8}}>
      <input value={typed} onChange={e=>setTyped(e.target.value)} placeholder="Or type here..."
        style={{flex:1,padding:"7px 10px",borderRadius:10,border:"2px solid #E8E0D8",fontSize:13,fontWeight:600,fontFamily:"var(--font)",outline:"none",boxSizing:"border-box"}}
        onKeyDown={e=>{if(e.key==="Enter"&&typed.trim())onType(typed.trim().toLowerCase());}}
      />
      <button onClick={()=>{if(typed.trim())onType(typed.trim().toLowerCase());}}
        style={{padding:"7px 14px",borderRadius:10,background:"#FF8C42",color:"#2D2B3D",border:"none",fontWeight:800,fontSize:12,cursor:"pointer"}}>Go</button>
    </div>
  </div>;
};
const ResultBox=({acc,result,expected,onRetry,onDone,color,kidName,currentPoints})=>{
  const s=getStars(acc);const p=getStarPts(s);const nm=kidName||"Buddy";
  const pass=acc>=50; // 50% = pass for kids
  const nextReward=REWARDS.filter(r=>r.cost>(currentPoints||0)).sort((a,b)=>a.cost-b.cost)[0];
  const ptsNeeded=nextReward?(nextReward.cost-(currentPoints||0)):0;
  return<div data-owl="result-box" style={{padding:10,background:"#fff",borderRadius:18,boxShadow:"var(--shadow-float)",animation:"resBounce 0.5s cubic-bezier(0.34,1.56,0.64,1)"}}>
    {/* Stars + Score row */}
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
      <Stars count={s}/>
      <div style={{position:"relative",display:"inline-block"}}>
        <ProgressRing pct={acc} color={pass?"#22C55E":"#F59E0B"}/>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontFamily:"var(--font)",fontSize:18,fontWeight:800,color:pass?"#22C55E":"#F59E0B"}}>{acc}%</span>
        </div>
      </div>
    </div>
    {/* Mascot message */}
    <Mascot mood={s>=4?"cheering":s>=3?"excited":s>=1?"happy":"sad"}
      msg={s>=4?`WOW ${nm}! SUPERSTAR! 🌟`:s>=3?`Great job ${nm}! 🎉`:s>=1?`Good try ${nm}! 💪`:`Keep trying ${nm}! 💫`}/>
    {/* HEARD vs EXPECTED - clear split box */}
    <div style={{display:"flex",gap:6,margin:"6px 0"}}>
      <div style={{flex:1,padding:"8px 10px",borderRadius:14,background:pass?"#F0FDF4":"#FEF2F2",border:`2px solid ${pass?"#22C55E33":"#EF444433"}`,textAlign:"center"}}>
        <div style={{fontSize:9,fontWeight:800,color:"#8E8CA3",textTransform:"uppercase",letterSpacing:1}}>You said</div>
        <div style={{fontFamily:"var(--font)",fontSize:16,fontWeight:800,color:pass?"#16A34A":"#DC2626",marginTop:2}}>"{result}"</div>
      </div>
      <div style={{flex:1,padding:"8px 10px",borderRadius:14,background:"#fff",border:"2px solid #FF8C4233",textAlign:"center"}}>
        <div style={{fontSize:9,fontWeight:800,color:"#8E8CA3",textTransform:"uppercase",letterSpacing:1}}>Correct</div>
        <div style={{fontFamily:"var(--font)",fontSize:16,fontWeight:800,color:"#6C5CE7",marginTop:2}}>"{expected}"</div>
      </div>
    </div>
    {/* Points */}
    {p>0&&<div style={{fontSize:18,fontWeight:900,color:"#22C55E",fontFamily:"var(--font)",textAlign:"center",margin:"4px 0"}}>+{p} points! 💰</div>}
    {/* Reward hint */}
    {nextReward&&ptsNeeded<=50&&<div style={{padding:"6px 10px",background:"rgba(251,191,36,0.15)",borderRadius:12,textAlign:"center",margin:"4px 0"}}>
      <span style={{fontSize:11,fontWeight:700,color:"#8E8CA3",textTransform:"uppercase",letterSpacing:0.5}}>{ptsNeeded} more for {nextReward.emoji} {nextReward.name}!</span>
    </div>}
    {/* Buttons */}
    <div style={{display:"flex",gap:8,marginTop:8}}>
      {!pass&&<button onClick={onRetry} style={{flex:1,padding:10,borderRadius:14,border:"none",background:"linear-gradient(135deg,#F59E0B,#D97706)",color:"#2D2B3D",fontSize:13,fontWeight:800,fontFamily:"var(--font)",cursor:"pointer"}}>🔄 Try Again</button>}
      <button onClick={onDone} style={{flex:1,padding:10,borderRadius:14,border:"none",background:`linear-gradient(135deg,${color||"#22C55E"},${color||"#16A34A"})`,color:"#2D2B3D",fontSize:13,fontWeight:800,fontFamily:"var(--font)",cursor:"pointer"}}>{pass?"🎉 Next!":"✅ Done"}</button>
    </div>
  </div>;
};

const NUM_STEPS=[{id:"saying_number",icon:"🔊",label:"Number"},{id:"spelling",icon:"🔤",label:"Spelling"},{id:"saying_sentence",icon:"💬",label:"Sentence"},{id:"saying_phonics",icon:"🔡",label:"Phonics"},{id:"countdown",icon:"⏱️",label:"Ready"},{id:"result",icon:"⭐",label:"Stars"}];
const PH_STEPS=[{id:"saying_word",icon:"🔊",label:"Word"},{id:"spelling",icon:"🔤",label:"Spelling"},{id:"saying_sentence",icon:"💬",label:"Sentence"},{id:"saying_phonics",icon:"🔡",label:"Phonics"},{id:"countdown",icon:"⏱️",label:"Ready"},{id:"result",icon:"⭐",label:"Stars"}];

// ═══════════════════════════════════════════════════════════════
// 🎮 MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App(){
  const{data:prof,save,loaded}=useStore();const{speak,stop,onSpeakRef,onDoneRef,cloudPlayingRef,ttsKey,saveTtsKey}=useSpeech();const rec=useRec();
  const[scr,setScr]=useState("splash");
  const[obN,setObN]=useState("");const[obA,setObA]=useState(4);const[obG,setObG]=useState("boy");const[obAv,setObAv]=useState(0);const[obSt,setObSt]=useState(0);
  const[selNum,setSelNum]=useState(null);const[numTab,setNumTab]=useState("learn");
  const[numRange,setNumRange]=useState("1-10");const[numSpelling,setNumSpelling]=useState(true);
  const NUM_RANGES=["1-10","11-20","21-40","41-60","61-80","81-100"];
  const getNumRange=()=>{const[a,b]=numRange.split("-").map(Number);return{min:a,max:b};};
  // Alphabet match modes
  const[matchMode,setMatchMode]=useState("findSmall"); // "findSmall","findCaps","voiceQuiz"
  const[mathProblem,setMathProblem]=useState(null);const[mathAnswer,setMathAnswer]=useState(null);const[mathChoices,setMathChoices]=useState([]);const[mathFb,setMathFb]=useState(null);const[mathScore,setMathScore]=useState(0);const[mathTotal,setMathTotal]=useState(0);
  const[mathOp,setMathOp]=useState("mix"); // "mix","+","-","×"
  const[mathRange,setMathRange]=useState("1-10");const[nStep,setNStep]=useState("idle");const[aPhI,setAPhI]=useState(-1);const[spRes,setSpRes]=useState(null);const[spAcc,setSpAcc]=useState(null);
  const[phCat,setPhCat]=useState("animals");const[phW,setPhW]=useState(null);const[phStep,setPhStep]=useState("idle");const[phAI,setPhAI]=useState(-1);const[phRes,setPhRes]=useState(null);const[phAcc,setPhAcc]=useState(null);
  // Phonics teaching modes — parents choose what to include
  const[phModes,setPhModes]=useState({spelling:true,phonics:true,sentence:true,speak:false});
  const togglePhMode=(key)=>setPhModes(p=>({...p,[key]:!p[key]}));
  // Shapes + Colors detail
  const[selShape,setSelShape]=useState(null);const[shStep,setShStep]=useState("idle");const[shAI,setShAI]=useState(-1);const[shRes,setShRes]=useState(null);const[shAcc,setShAcc]=useState(null);
  const[selColor,setSelColor]=useState(null);const[coStep,setCoStep]=useState("idle");const[coAI,setCoAI]=useState(-1);const[coRes,setCoRes]=useState(null);const[coAcc,setCoAcc]=useState(null);
  const[confetti,setConfetti]=useState(false);const[teacherMsg,setTeacherMsg]=useState("");const[teacherMood,setTeacherMood]=useState("waving");const[pandaPos,setPandaPos]=useState({x:20,y:80});const[isSpeaking,setIsSpeaking]=useState(false);const[owlSize,setOllieSize]=useState(95);const[joyFly,setJoyFly]=useState(false);const[headShake,setHeadShake]=useState("");const[guideTour,setGuideTour]=useState(false);
  const[mouthOpen,setMouthOpen]=useState(0); // 0.0 to 1.0 smooth
  const teacherIdleRef=useRef(null);
  const guideTourRef=useRef(false);
  const showTeacher=(mood,msg)=>{setTeacherMood(mood);setTeacherMsg(msg);};
  // Smooth lip sync: checks both browser TTS and cloud audio
  useEffect(()=>{
    let tick=0;
    const iv=setInterval(()=>{
      const s=speechSynthesis.speaking || cloudPlayingRef.current;
      setIsSpeaking(s);
      if(s){
        tick++;
        const base=Math.abs(Math.sin(tick*0.7));
        const variation=Math.abs(Math.sin(tick*1.3))*0.3;
        setMouthOpen(Math.min(1,base*0.7+variation));
      } else {
        tick=0;
        setMouthOpen(0);
      }
    },180);
    return()=>clearInterval(iv);
  },[]);
  // Head reactions
  const headYes=()=>{setHeadShake("yes");setTeacherMood("star");setTimeout(()=>{setHeadShake("");setTeacherMood("happy");},1500);};
  const headNo=()=>{setHeadShake("no");setTeacherMood("sad");setTimeout(()=>{setHeadShake("");setTeacherMood("happy");},2000);};

  // Guided tour of home tiles
  const doHomeTour=async()=>{
    setGuideTour(true);
    guideTourRef.current=true;
    movePandaTo("bottomRight");
    const tiles=[
      {id:"learn",msg:"Learn! Numbers, letters, shapes and colors!"},
      {id:"phonics",msg:"Phonics! Learn to read over 500 words!"},
      {id:"quizzone",msg:"Quiz Zone! Test what you've learned!"},
      {id:"stories",msg:"Stories! Read fun tales and answer questions!"},
      {id:"rewards",msg:"Rewards! Spend your points on cool prizes!"},
      {id:"settings",msg:"And Settings! You can change your look here!"},
    ];
    // Dark overlay — tap to skip
    const backdrop=document.createElement("div");
    backdrop.id="tour-overlay";
    backdrop.style.cssText="position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:100;opacity:0;transition:opacity 0.3s;cursor:pointer;display:flex;align-items:flex-end;justify-content:center;padding-bottom:24px;";
    const skip=document.createElement("div");
    skip.textContent="Tap anywhere to skip";
    skip.style.cssText="color:rgba(255,255,255,0.7);font-size:13px;font-weight:600;font-family:'Fredoka',sans-serif;pointer-events:none;";
    backdrop.appendChild(skip);
    const cleanup=()=>{
      guideTourRef.current=false;stop();
      backdrop.style.opacity="0";setTimeout(()=>backdrop.remove(),300);
      const hp=document.getElementById("home-tiles");if(hp){hp.style.zIndex="";hp.style.position="";}
      document.querySelectorAll("[data-tile]").forEach(t=>{t.style.transform="";t.style.zIndex="";t.style.outline="";t.style.outlineOffset="";t.style.transition="";t.style.overflow="";});
      setGuideTour(false);setTeacherMood("happy");
    };
    backdrop.onclick=cleanup;
    document.body.appendChild(backdrop);
    // Elevate the grid parent above the overlay
    const hp=document.getElementById("home-tiles");
    if(hp){hp.style.zIndex="200";hp.style.position="relative";}
    await wait(50);backdrop.style.opacity="1";

    for(const tile of tiles){
      if(!guideTourRef.current)break;
      const el=document.querySelector('[data-tile="'+tile.id+'"]');
      if(!el)continue;
      el.scrollIntoView({behavior:"smooth",block:"center"});
      await wait(400);
      if(!guideTourRef.current)break;
      el.style.transition="transform 0.4s cubic-bezier(0.34,1.56,0.64,1), outline 0.3s";
      el.style.zIndex="10";
      el.style.overflow="visible";
      el.style.transform="scale(1.12)";
      el.style.outline="4px solid #FF8C42";
      el.style.outlineOffset="3px";
      setTeacherMood("excited");
      stop(); // cancel any lingering speech
      await wait(100);
      await speak(tile.msg,{rate:0.85,pitch:1.0});
      if(!guideTourRef.current)break;
      await wait(300);
      el.style.transform="scale(1)";
      el.style.outline="";el.style.outlineOffset="";
      await wait(500);
      el.style.zIndex="";el.style.transition="";el.style.overflow="";
    }
    if(guideTourRef.current){
      setTeacherMood("star");
      await speak("What do you wanna learn? Pick anything!",{rate:0.85,pitch:1.0});
      await wait(300);
    }
    cleanup();
  };


  // Joy fly: owl does a quick loop around screen
  const doJoyFly=()=>{
    setJoyFly(true);setTeacherMood("star");
    const w=window.innerWidth,h=window.innerHeight,ps=owlSize||95;
    const path=[{x:w/2-ps/2,y:20},{x:w-ps-10,y:h/3},{x:w/2-ps/2,y:h/2},{x:10,y:h/3},{x:w/2-ps/2,y:20}];
    let i=0;
    const step=()=>{
      if(i>=path.length){setJoyFly(false);movePandaTo("bottomRight");return;}
      setPandaPos(path[i]);i++;
      setTimeout(step,350);
    };
    step();
  };
  const flyTo=(e,mood)=>{
    if(!e?.currentTarget)return;
    const rect=e.currentTarget.getBoundingClientRect();
    const ps=owlSize||95;
    const x=Math.min(rect.right+6,window.innerWidth-ps);
    const y=Math.max(Math.min(rect.top+rect.height/2-ps/2,window.innerHeight-ps),0);
    setPandaPos({x,y});
    if(mood)setTeacherMood(mood);
  };
  const movePandaTo=(position)=>{
    const w=window.innerWidth,h=window.innerHeight;
    const ps=owlSize||95;
    const positions={
      topRight:{x:w-ps-4,y:4},
      midRight:{x:w-ps-4,y:h/2-ps/2},
      bottomRight:{x:w-ps-4,y:h-ps-6},
      topLeft:{x:4,y:56},
      midLeft:{x:6,y:h/2-ps/2},
      center:{x:w/2-ps/2,y:h/2-ps/2},
    };
    setPandaPos(positions[position]||positions.bottomRight);
  };
  // Hover near a specific content element
  const hoverNear=(selector,side="right",mood)=>{
    setTimeout(()=>{
      const el=document.querySelector(`[data-owl="${selector}"]`);
      if(!el){movePandaTo("bottomRight");return;}
      const r=el.getBoundingClientRect();
      const ps=owlSize||95;
      const w=window.innerWidth,h=window.innerHeight;
      let x,y;
      if(side==="right"){
        x=Math.min(r.right+4,w-ps);
        y=Math.max(Math.min(r.top+r.height/2-ps/2,h-ps),0);
      } else if(side==="left"){
        x=Math.max(r.left-ps-4,0);
        y=Math.max(Math.min(r.top+r.height/2-ps/2,h-ps),0);
      } else if(side==="above"){
        x=Math.max(Math.min(r.left+r.width/2-ps/2,w-ps),0);
        y=Math.max(r.top-ps-4,0);
      } else if(side==="below"){
        x=Math.max(Math.min(r.left+r.width/2-ps/2,w-ps),0);
        y=Math.min(r.bottom+4,h-ps);
      }
      setPandaPos({x,y});
      if(mood)setTeacherMood(mood);
    },200);
  };
  useEffect(()=>{
    onSpeakRef.current=(text)=>{
      let mood="happy";const lo=text.toLowerCase();
      if(lo.includes("correct")||lo.includes("perfect")||lo.includes("well done")||lo.includes("amazing")||lo.includes("yes")||lo.includes("awesome")||lo.includes("yay")||lo.includes("super")||lo.includes("right"))mood="star";
      else if(lo.includes("try again")||lo.includes("not quite")||lo.includes("almost")||lo.includes("oops"))mood="sad";
      else if(lo.includes("great")||lo.includes("good")||lo.includes("earned"))mood="star";
      else if(lo.includes("spell")||lo.includes("watch")||lo.includes("let")||lo.includes("repeat"))mood="excited";
      setTeacherMood(mood);
      clearTimeout(teacherIdleRef.current);
    };
    onDoneRef.current=()=>{
      clearTimeout(teacherIdleRef.current);
      teacherIdleRef.current=setTimeout(()=>{
        // Cycle through idle moods naturally — no text
        const idleMoods=["happy","waving","proud","happy","excited","happy"];
        setTeacherMood(idleMoods[Math.floor(Math.random()*idleMoods.length)]);
        // Return owl to its home position after speech ends
        movePandaTo("bottomRight");
      },2500);
    };
    return()=>{onSpeakRef.current=null;onDoneRef.current=null;clearTimeout(teacherIdleRef.current);};
  },[]);
  useEffect(()=>{
    const moods={home:"waving",numbers:"excited",phonics:"happy",shapes:"excited",colors:"happy",alphabet:"star",basics:"pointing",rewards:"excited",stories:"happy",settings:"happy"};
    const m=moods[scr];if(m)setTeacherMood(m);
    // Position owl based on screen
    const pos={home:"bottomRight",numbers:"bottomRight",phonics:"bottomRight",shapes:"bottomRight",colors:"bottomRight",alphabet:"bottomRight",basics:"bottomRight",rewards:"bottomRight",stories:"bottomRight",settings:"bottomRight",splash:"center",onboard:"bottomRight"};
    setTimeout(()=>movePandaTo(pos[scr]||"bottomRight"),100);
  },[scr]);
  // Basics state
  const[basicsTab,setBasicsTab]=useState("explore"); // legacy
  const[learnTab,setLearnTab]=useState("numbers");
  const[learnModes,setLearnModes]=useState({spelling:true,phonics:true,sentence:true,speak:false});
  const toggleLearnMode=(key)=>setLearnModes(p=>({...p,[key]:!p[key]})); // "numbers","abc","shapes","colors"
  const[quizTab,setQuizTab]=useState("numquiz"); // "numquiz","math","letters","write"
  const prevScrRef=useRef("home"); // track where user navigated from
  const[writeNum,setWriteNum]=useState(1);
  const[writeMode,setWriteMode]=useState("numbers"); // "numbers" or "letters"
  const[writeChar,setWriteChar]=useState("A"); // current letter to write
  const[writeCase,setWriteCase]=useState("caps"); // "caps" or "small"
  // Number Quiz state
  const[quizNum,setQuizNum]=useState(null);const[quizOpts,setQuizOpts]=useState([]);const[quizFb,setQuizFb]=useState(null);const[quizScore,setQuizScore]=useState(0);const[quizStreak,setQuizStreak]=useState(0);const[quizTotal,setQuizTotal]=useState(0);
  const quizUsedRef=useRef([]);
  const[quizRange,setQuizRange]=useState("1-20");
  // Alphabet state
  const[alphaTab,setAlphaTab]=useState("caps"); // "caps","small","match"
  const[selLetter,setSelLetter]=useState(null); // selected letter for detail
  const[matchPairs,setMatchPairs]=useState([]); // match game pairs
  const[matchLeft,setMatchLeft]=useState(null);const[matchIdx,setMatchIdx]=useState(0);const[matchWrong,setMatchWrong]=useState(null);const[matchCorrect,setMatchCorrect]=useState(null);const[matchOpts,setMatchOpts]=useState([]);
  const[matchScore,setMatchScore]=useState(0);const[matchDone,setMatchDone]=useState([]);const[drawPts,setDrawPts]=useState(0);const drawPtsRef=useRef(0);const[writeOk,setWriteOk]=useState(false);const writeOkRef=useRef(false);const[writeScore,setWriteScore]=useState(null);
  const cRef=useRef(null);const[ptAnim,setPtAnim]=useState(null);
  const[quizAnswers,setQuizAnswers]=useState(()=>{try{const s=localStorage.getItem("lg_quiz_answers");return s?JSON.parse(s):null;}catch(e){return null;}});
  const saveQuizAnswers=(a)=>{setQuizAnswers(a);localStorage.setItem("lg_quiz_answers",JSON.stringify(a));};
  const[qStep,setQStep]=useState(0);
  const[qAnswers,setQAnswers]=useState([]);
  // ═══ ARENA MULTIPLAYER STATE (Firebase Realtime DB) ═══
  const[arenaRoom,setArenaRoom]=useState(null);
  const[arenaId]=useState(()=>genPlayerId());
  const[arenaName,setArenaName]=useState("");
  const[arenaJoinCode,setArenaJoinCode]=useState("");
  const[arenaSec,setArenaSec]=useState(0);
  const[arenaPhase,setArenaPhase]=useState("lobby");
  const[arenaAnswered,setArenaAnswered]=useState(false);
  const[arenaFb,setArenaFb]=useState(null);
  const[arenaPaused,setArenaPaused]=useState(false);
  const[arenaMsg,setArenaMsg]=useState("");
  // Ollie speaks arena messages via TTS
  useEffect(()=>{
    if(!arenaMsg||scr!=="arena")return;
    try{
      const clean=arenaMsg.replace(/[🎯🦉🎉👏❌😅🏆]/g,"").trim();
      if(clean&&window.speechSynthesis){
        window.speechSynthesis.cancel();
        const u=new SpeechSynthesisUtterance(clean);
        u.rate=0.9;u.pitch=1.2;u.volume=0.8;
        window.speechSynthesis.speak(u);
      }
    }catch(e){}
  },[arenaMsg]);
  const[arenaDiff,setArenaDiff]=useState("easy");
  const[arenaRounds,setArenaRounds]=useState(10);
  const[fbReady,setFbReady]=useState(false);const fbConfig=FIREBASE_CONFIG;
  const[fbError,setFbError]=useState("");
  
  const fbListenerRef=useRef(null);
  const arenaRoomRef=useRef(null);

  // Firebase config from localStorage
  // Firebase config is hardcoded — no user setup needed

  // Initialize Firebase
  useEffect(()=>{
    if(!FIREBASE_CONFIG?.databaseURL||typeof window.firebase==="undefined")return;
    try{
      if(!window.firebase.apps?.length){
        window.firebase.initializeApp(FIREBASE_CONFIG);
      }
      setFbReady(true);setFbError("");
    }catch(e){setFbError("Firebase init failed: "+e.message);}
  },[]); // Init once on mount

  // Firebase helpers
  const fbRef=(path)=>window.firebase?.database?.()?.ref?.(path);
  const fbWrite=(path,data)=>{const r=fbRef(path);if(r)return r.set(data);};
  const fbUpdate=(path,data)=>{const r=fbRef(path);if(r)return r.update(data);};
  const fbListen=(path,cb,onDelete)=>{const r=fbRef(path);if(r){r.on("value",snap=>{const v=snap.val();if(v)cb(v);else if(onDelete)onDelete();});return()=>r.off("value");}return()=>{};};
  const lastRoundRef=useRef(0);

  // Create room → write to Firebase
  // Room deleted handler — kicks everyone back
  const onRoomDeleted=()=>{
    setArenaRoom(null);setArenaPhase("lobby");arenaRoomRef.current=null;lastRoundRef.current=0;
    setArenaAnswered(false);setArenaFb(null);setArenaPaused(false);
    if(fbListenerRef.current){fbListenerRef.current();fbListenerRef.current=null;}
  };
  // Room data handler
  const onRoomData=(data)=>{
    const players=data.players?Object.values(data.players):[];
    const merged={...data,players};
    arenaRoomRef.current=merged;
    setArenaRoom(merged);
    if(data.state==="paused"){setArenaPaused(true);setArenaPhase("playing");return;}
    setArenaPaused(false);
    if(data.state==="playing"&&data.question){
      // New round or resumed play
      if(data.round !== lastRoundRef.current){
        lastRoundRef.current=data.round;
        setArenaAnswered(false);setArenaFb(null);setArenaSec(6);
        // Ollie announces whose turn
        const tp=players.find(p=>p.id===data.turnPlayerId);
        if(tp){
          const isMe=tp.id===arenaId;
          setArenaMsg(isMe?"🎯 It's YOUR turn! Go go go!":"🦉 It's "+tp.name+"'s turn!");
          setTeacherMood(isMe?"star":"happy");
        }
      }
      setArenaPhase("playing");
    } else if(data.state==="result"){
      setArenaPhase("result");
      // Ollie celebrates or encourages
      const winner=players.find(p=>p.id===data.answerBy);
      if(winner){
        const pts=data.scores?.[winner.id]||0;
        if(winner.id===arenaId){
          setArenaMsg("🎉 Great job! You have "+pts+" point"+(pts!==1?"s":"")+"! Keep going!");
          setTeacherMood("star");
        } else {
          setArenaMsg("👏 "+winner.name+" got it right with "+pts+" point"+(pts!==1?"s":"")+"!");
          setTeacherMood("happy");
        }
      } else {
        setArenaMsg("😅 Nobody got it! Let's try the next one!");
        setTeacherMood("thinking");
      }
    }
    else if(data.state==="gameover"){
      setArenaPhase("gameover");
      const sorted=players.sort((a,b)=>(data.scores?.[b.id]||0)-(data.scores?.[a.id]||0));
      if(sorted[0]?.id===arenaId){setArenaMsg("🏆 You WON! Amazing!");setTeacherMood("star");}
      else{setArenaMsg("🏆 "+sorted[0]?.name+" wins! Great game everyone!");setTeacherMood("happy");}
    }
    else if(data.state==="waiting"){setArenaPhase("lobby");setArenaMsg("");}
  };

  const arenaCreateRoom=()=>{
    if(!fbReady)return;
    const roomCode=genRoomCode();
    const me={id:arenaId,name:arenaName||prof?.name||"Player 1",avatar:ARENA_AVATARS[0],color:ARENA_COLORS[0],isHost:true};
    const room={code:roomCode,players:{[arenaId]:me},hostId:arenaId,state:"waiting",question:null,turnIdx:0,turnPlayerId:arenaId,scores:{[arenaId]:0},round:0,maxRounds:arenaRounds,diff:arenaDiff,createdAt:Date.now()};
    fbWrite("rooms/"+roomCode,room).then(()=>{
      setArenaRoom({...room,players:[me]});setArenaPhase("lobby");setFbError("");
      const unsub=fbListen("rooms/"+roomCode,onRoomData,onRoomDeleted);
      fbListenerRef.current=unsub;
    }).catch(e=>setFbError("Create failed: "+e.message));
  };

  // Join room → read + add self to Firebase
  const arenaJoinRoom=(joinCode)=>{
    if(!fbReady){setFbError("Connecting... try again in a moment");return;}
    const c=joinCode.toUpperCase().trim();if(c.length!==6)return;
    setFbError("");
    const ref=fbRef("rooms/"+c);if(!ref){setFbError("Connection error");return;}
    ref.once("value").then(snap=>{
      const room=snap.val();
      if(!room){setFbError("Room not found! Check the code and try again.");return;}
      if(room.state==="gameover"){setFbError("This game has ended. Ask host to create a new room.");return;}
      const existingPlayers=room.players?Object.values(room.players):[];
      if(existingPlayers.length>=4){setFbError("Room is full! (4/4 players)");return;}
      if(!existingPlayers.find(p=>p.id===arenaId)){
        const pi=existingPlayers.length;
        const me={id:arenaId,name:arenaName||prof?.name||"Player",avatar:ARENA_AVATARS[pi%4],color:ARENA_COLORS[pi%4],isHost:false};
        fbUpdate("rooms/"+c,{["players/"+arenaId]:me,["scores/"+arenaId]:0});
      }
      if(fbListenerRef.current)fbListenerRef.current();
      const unsub=fbListen("rooms/"+c,onRoomData,onRoomDeleted);
      fbListenerRef.current=unsub;
      setArenaPhase("lobby");setFbError("");
    }).catch(e=>{setFbError("Join failed: "+e.message+". Check your internet connection.");});
  };

  // Host pauses/resumes
  const arenaTogglePause=()=>{
    const rm=arenaRoomRef.current||arenaRoom;
    if(!rm||rm.hostId!==arenaId)return;
    sfxTap();
    if(arenaPaused){
      fbUpdate("rooms/"+rm.code,{state:"playing",turnStartedAt:Date.now()});
      setArenaPaused(false);setArenaSec(6);
    } else {
      fbUpdate("rooms/"+rm.code,{state:"paused"});
      setArenaPaused(true);
    }
  };
  // Host resets — deletes room, kicks everyone
  const arenaResetGame=()=>{
    const rm=arenaRoomRef.current||arenaRoom;
    if(!rm)return;
    sfxTap();
    if(fbListenerRef.current){fbListenerRef.current();fbListenerRef.current=null;}
    fbWrite("rooms/"+rm.code,null); // Delete room — triggers onRoomDeleted for all listeners
    onRoomDeleted();
  };

  // Host starts round → write question to Firebase
  const arenaStartRound=()=>{
    const rm=arenaRoomRef.current||arenaRoom;
    if(!rm||rm.hostId!==arenaId||!fbReady)return;
    const q=genArenaQ(rm.diff||"easy");
    const players=rm.players||[];
    const firstPlayer=players[0];
    const nextRound=(rm.round||0)+1;
    lastRoundRef.current=nextRound;
    fbUpdate("rooms/"+rm.code,{
      question:q,turnIdx:0,turnPlayerId:firstPlayer?.id||arenaId,
      round:nextRound,state:"playing",answerBy:null,turnStartedAt:Date.now()
    });
    setArenaPhase("playing");setArenaAnswered(false);setArenaFb(null);setArenaSec(6);
  };

  // Player answers → write to Firebase
  const arenaAnswer=(opt)=>{
    if(arenaAnswered)return;
    const rm=arenaRoomRef.current||arenaRoom;
    if(!rm?.question||!fbReady)return;
    setArenaAnswered(true);sfxTap();
    const correct=opt===rm.question.answer;
    setArenaFb({playerId:arenaId,correct,answer:opt});
    const roomCode=rm.code;

    if(correct){
      sfxWin();
      const newScore=(rm.scores?.[arenaId]||0)+1;
      fbUpdate("rooms/"+roomCode,{["scores/"+arenaId]:newScore,state:"result",answerBy:arenaId});
    } else {
      // Wrong → pass turn to next player
      const players=rm.players||[];
      const nextIdx=((rm.turnIdx||0)+1)%players.length;
      if(nextIdx===0){
        // All players missed — go to result
        const nextName=players[0]?.name||"next player";
        setArenaMsg("❌ Everyone missed! Answer was: "+rm.question.answer);setTeacherMood("thinking");
        setTimeout(()=>{fbUpdate("rooms/"+roomCode,{state:"result",answerBy:null});},800);
      } else {
        // Pass to next player
        const nextPid=players[nextIdx]?.id;
        const nextName=players[nextIdx]?.name||"next player";
        setArenaMsg("❌ Wrong! "+nextName+"'s turn now!");setTeacherMood("thinking");
        setTimeout(()=>{
          fbUpdate("rooms/"+roomCode,{turnIdx:nextIdx,turnPlayerId:nextPid,turnStartedAt:Date.now()});
          setArenaAnswered(false);setArenaFb(null);setArenaSec(6);
        },1000);
      }
    }
  };

  // ═══ HOST AUTO-ADVANCE — Single effect that reliably advances the game ═══
  const advanceTimerRef=useRef(null);
  useEffect(()=>{
    // Only the host auto-advances
    const rm=arenaRoomRef.current||arenaRoom;
    if(!rm||rm.hostId!==arenaId)return;
    
    if(arenaPhase==="result"){
      // Clear any existing timer
      if(advanceTimerRef.current)clearTimeout(advanceTimerRef.current);
      // Auto-advance after 2.5s
      advanceTimerRef.current=setTimeout(()=>{
        const cur=arenaRoomRef.current||arenaRoom;
        if(!cur||cur.state!=="result")return; // Already moved on
        const currentRound=cur.round||0;
        const maxR=cur.maxRounds||10;
        const roomCode=cur.code;
        if(currentRound>=maxR){
          fbUpdate("rooms/"+roomCode,{state:"gameover"});
        } else {
          const q=genArenaQ(cur.diff||"easy");
          const players=cur.players||[];
          const fp=players[0];
          const nr=currentRound+1;
          lastRoundRef.current=nr;
          fbUpdate("rooms/"+roomCode,{
            question:q,turnIdx:0,turnPlayerId:fp?.id||arenaId,
            round:nr,state:"playing",answerBy:null,turnStartedAt:Date.now()
          });
          setArenaPhase("playing");setArenaAnswered(false);setArenaFb(null);setArenaSec(6);
        }
      },2500);
    }
    return()=>{if(advanceTimerRef.current)clearTimeout(advanceTimerRef.current);};
  },[arenaPhase,arenaRoom?.round]);

    // Timer countdown (stops when paused)
  useEffect(()=>{
    if(arenaPhase!=="playing"||arenaSec<=0||arenaPaused)return;
    const iv=setInterval(()=>{
      setArenaSec(prev=>{
        if(prev<=1){
          const rm=arenaRoomRef.current||arenaRoom;
          if(!arenaAnswered&&rm&&rm.turnPlayerId===arenaId){arenaAnswer(null);}
          return 0;
        }
        return prev-1;
      });
    },1000);
    return()=>clearInterval(iv);
  },[arenaPhase,arenaSec,arenaAnswered,arenaPaused]);

  // Reset timer when turn or round changes
  useEffect(()=>{
    if(arenaPhase==="playing"){
      setArenaSec(6);setArenaAnswered(false);setArenaFb(null);
    }
  },[arenaRoom?.turnPlayerId,arenaRoom?.turnIdx,arenaRoom?.round]);

  // Cleanup Firebase listener
  useEffect(()=>()=>{if(fbListenerRef.current)fbListenerRef.current();},[]);
  // ═══ PARENT SYSTEM STATE ═══
  const[parentMode,setParentMode]=useState(false);
  const[pinInput,setPinInput]=useState("");
  const[showPinModal,setShowPinModal]=useState(false);
  const[parentTab,setParentTab]=useState("plan"); // plan, rewards, dashboard
  const[studyPlan,setStudyPlan]=useState(()=>{try{const s=localStorage.getItem("lg_studyplan");return s?JSON.parse(s):[];}catch(e){return[];}});
  const[customRewards,setCustomRewards]=useState(()=>{try{const s=localStorage.getItem("lg_rewards");return s?JSON.parse(s):[];}catch(e){return[];}});
  const[parentPin,setParentPin]=useState(()=>localStorage.getItem("lg_pin")||PARENT_PIN_DEFAULT);
  const[engageStart]=useState(()=>Date.now());
  const[engageMins,setEngageMins]=useState(0);
  const[engageAwarded,setEngageAwarded]=useState(()=>{try{const s=localStorage.getItem("lg_engage_"+new Date().toDateString());return s?JSON.parse(s):[];}catch(e){return[];}});
  const[perfLog,setPerfLog]=useState(()=>{try{const s=localStorage.getItem("lg_perf");return s?JSON.parse(s):[];}catch(e){return[];}});
  const savePlan=(p)=>{setStudyPlan(p);localStorage.setItem("lg_studyplan",JSON.stringify(p));};
  const saveRewards=(r)=>{setCustomRewards(r);localStorage.setItem("lg_rewards",JSON.stringify(r));};
  const savePin=(p)=>{setParentPin(p);localStorage.setItem("lg_pin",p);};
  const logPerf=(cat,sub,correct,total)=>{const entry={cat,sub,correct,total,date:new Date().toISOString(),ts:Date.now()};const nl=[...perfLog,entry];setPerfLog(nl);localStorage.setItem("lg_perf",JSON.stringify(nl.slice(-500)));};
  // Engagement timer
  useEffect(()=>{const iv=setInterval(()=>{const m=Math.floor((Date.now()-engageStart)/60000);setEngageMins(m);
    // Auto-award engagement points
    const today=new Date().toDateString();
    ENGAGE_TIERS.forEach(t=>{if(m>=t.mins&&!engageAwarded.includes(t.mins)){
      const na=[...engageAwarded,t.mins];setEngageAwarded(na);localStorage.setItem("lg_engage_"+today,JSON.stringify(na));
      if(prof){const np={...prof,points:(prof.points||0)+t.pts,totalEarned:(prof.totalEarned||0)+t.pts};save(np);setPtAnim(`+${t.pts} ⏱️`);}
    }});
  },15000);return()=>clearInterval(iv);},[engageStart,engageAwarded,prof]);
  const[showStreakPop,setShowStreakPop]=useState(false);
  const[showBadgePop,setShowBadgePop]=useState(null);
  const[showLvlPop,setShowLvlPop]=useState(null);
  const[showDash,setShowDash]=useState(false);
  const[dLessons,setDLessons]=useState(0);const[dQuiz,setDQuiz]=useState(0);const[rwdMsg,setRwdMsg]=useState(null);
  const[speakMode,setSpeakMode]=useState(true); // toggle for speech practice
  const[countdown,setCountdown]=useState(0); // 3,2,1 countdown
  const[activeSpellIdx,setActiveSpellIdx]=useState(-1); // which letter is being spelled
  const[spellStatus,setSpellStatus]=useState([]); // per-letter: 'waiting'|'listening'|'correct'|'skipped'
  const pRef=useRef(false);
  // Highlight system — pulses any element Bella talks about
  const[glowTarget,setGlowTarget]=useState(null);
  const glowTimer=useRef(null);
  const glow=(id,dur=1800)=>{clearTimeout(glowTimer.current);setGlowTarget(id);glowTimer.current=setTimeout(()=>setGlowTarget(null),dur);};
  const glowStyle=(id)=>glowTarget===id?{animation:"itemGlow 0.8s ease-in-out infinite",position:"relative",zIndex:10,borderRadius:"inherit"}:{};
  // Stories state
  const[storyIdx,setStoryIdx]=useState(0);
  const[storyStep,setStoryStep]=useState("list"); // "list","reading","questions","done"
  const[storyAnswers,setStoryAnswers]=useState([]);
  const[storyScore,setStoryScore]=useState(0);
  const[storyPicked,setStoryPicked]=useState(null);

  const initDone=useRef(false);
  const welcomeSpoken=useRef(false);
  // Welcome speech function — can be called from init OR first tap
  const doWelcome=useCallback(()=>{
    if(welcomeSpoken.current)return;
    welcomeSpoken.current=true;
    speak("Welcome to Little Genius! I'm Ollie the Owl, your learning buddy! Let's learn and play together!",{rate:0.85,pitch:1.0});
    setTeacherMood("waving");
  },[speak]);

  useEffect(()=>{
    if(!loaded||initDone.current)return;
    initDone.current=true;
    setTeacherMood("waving");
    setOllieSize(100);
    setTimeout(()=>{
      const w=window.innerWidth,h=window.innerHeight;
      // Position owl BELOW the button area, not on top of it
      setPandaPos({x:w/2-60,y:h/2+120});
    },100);
  },[loaded]);

  const aCfg=prof?AGE_CFG[prof.age]||AGE_CFG[4]:AGE_CFG[4];

  const[celebType,setCelebType]=useState(0);
  const[wrongFlash,setWrongFlash]=useState(false);
  const[celebKey,setCelebKey]=useState(0);
  const celebTimer=useRef(null);
  const boom=()=>{
    // Clear any previous celebration timeout so it doesn't kill this one
    if(celebTimer.current)clearTimeout(celebTimer.current);
    setCelebType(Math.floor(Math.random()*3));
    setCelebKey(k=>k+1);
    setConfetti(true);
    celebTimer.current=setTimeout(()=>{setConfetti(false);celebTimer.current=null;},3500);
  };
  const flashWrong=()=>{setWrongFlash(true);setTimeout(()=>setWrongFlash(false),800);};
  const flyPts=(n)=>{setPtAnim(`+${n}`);setTimeout(()=>setPtAnim(null),1500);};
  // CRITICAL: Combined save to prevent stale state overwrites
  const awardPoints=useCallback((pts, type, id)=>{
    if(!prof)return;
    const c={...(prof.completed||{})};
    if(!c[type])c[type]=[];
    const alreadyDone=c[type].includes(id);
    if(alreadyDone) return; // already earned
    c[type].push(id);
    const updated={
      ...prof,
      points:(prof.points||0)+pts,
      totalEarned:(prof.totalEarned||0)+pts,
      completed:c,
    };
    save(updated);
    flyPts(pts);
  },[prof,save]);
  const isDone=(t,id)=>prof?.completed?.[t]?.includes(id);
  const getProgress=(t)=>{const c=prof?.completed?.[t]||[];if(t==="numbers")return Math.round((c.length/aCfg.max)*100);if(t==="phonics"){const x=Object.values(WCATS).reduce((s,cat)=>s+cat.words.length,0);return Math.round((c.length/x)*100);}if(t==="shapes")return Math.round((c.length/SHAPES.length)*100);if(t==="colors")return Math.round((c.length/COLORSDATA.length)*100);return 0;};
  const goHome=()=>{setJoyFly(false);setOllieSize(95);stop();pRef.current=false;guideTourRef.current=false;setGuideTour(false);const tourOv=document.getElementById("tour-overlay");if(tourOv)tourOv.remove();const hp2=document.getElementById("home-tiles");if(hp2){hp2.style.zIndex="";hp2.style.position="";}document.querySelectorAll("[data-tile]").forEach(t=>{t.style.transform="";t.style.zIndex="";t.style.outline="";t.style.outlineOffset="";t.style.transition="";t.style.overflow="";});setScr("home");setSelNum(null);setNStep("idle");setPhW(null);setPhStep("idle");setSelShape(null);setShStep("idle");setSelColor(null);setCoStep("idle");setMathProblem(null);setMathFb(null);setMathScore(0);setMathTotal(0);setSelLetter(null);setMatchPairs([]);setMatchLeft(null);setMatchDone([]);setMatchIdx(0);setMatchWrong(null);setMatchCorrect(null);setMatchOpts([]);drawPtsRef.current=0;setDrawPts(0);setWriteOk(false);writeOkRef.current=false;setWriteScore(null);setQuizNum(null);setQuizOpts([]);setQuizFb(null);setQuizScore(0);setQuizStreak(0);setQuizTotal(0);quizUsedRef.current=[];setGlowTarget(null);prevScrRef.current="home";};

  // ── Callbacks for mic ──
  const kidName = prof?.name || "Buddy";

  const handleNumResult=(result)=>{
    const w=NW[selNum];
    const normalized=normalizeSpoken(result);
    const acc=calcAcc(w,normalized);setSpRes(normalized);setSpAcc(acc);setNStep("result");
    const s=getStars(acc);const p=getStarPts(s);
    if(p>0){awardPoints(p,"numbers",selNum);boom();}else{flashWrong();}
    // Voice cheer with name and reward motivation!
    setTimeout(()=>{
      const nextR=REWARDS.filter(r=>r.cost>((prof?.points||0)+p)).sort((a,b)=>a.cost-b.cost)[0];
      const need=nextR?(nextR.cost-((prof?.points||0)+p)):0;
      if(s>=4){
        speak(`${kidName}, wow! That was perfect!`,{rate:0.8,pitch:1.0});
        if(nextR&&need<=30) setTimeout(()=>speak(`Only ${need} more for a ${nextR.name}!`,{rate:0.8,pitch:1.0}),2500);
      }
      else if(s>=3) speak(`Awesome ${kidName}! You nailed it!`,{rate:0.8,pitch:1.0});
      else if(s>=1){
        speak(`Nice try ${kidName}! Almost got it!`,{rate:0.8,pitch:1.0});
        if(nextR) setTimeout(()=>speak(`Keep going for your ${nextR.name}!`,{rate:0.8,pitch:1.0}),2200);
      }
      else{headNo();flashWrong();speak(`That's okay ${kidName}! Let's try again!`,{rate:0.8,pitch:1.0});}
    },300);
  };
  const handlePhResult=(result)=>{
    const normalized=normalizeSpoken(result);
    const acc=calcAcc(phW.word,normalized);setPhRes(normalized);setPhAcc(acc);setPhStep("result");
    const s=getStars(acc);const p=getStarPts(s);
    if(p>0){awardPoints(p,"phonics",phW.word);boom();}else{flashWrong();}
    setTimeout(()=>{
      const nextR=REWARDS.filter(r=>r.cost>((prof?.points||0)+p)).sort((a,b)=>a.cost-b.cost)[0];
      const need=nextR?(nextR.cost-((prof?.points||0)+p)):0;
      if(s>=4){
        speak(`${kidName}, that was amazing! You got it!`,{rate:0.8,pitch:1.0});
        if(nextR&&need<=30) setTimeout(()=>speak(`So close! ${need} more points for a ${nextR.name}.`,{rate:0.8,pitch:1.0}),2500);
      }
      else if(s>=3) speak(`Awesome ${kidName}! Keep going!`,{rate:0.8,pitch:1.0});
      else if(s>=1){
        speak(`Nice try ${kidName}! So close!`,{rate:0.8,pitch:1.0});
        if(nextR) setTimeout(()=>speak(`Keep going for your ${nextR.name}.`,{rate:0.8,pitch:1.0}),2200);
      }
      else speak(`You got this ${kidName}! Try again!`,{rate:0.8,pitch:1.0});
    },300);
  };

  const tapMicNum=()=>rec.start(handleNumResult);
  const tapMicPh=()=>rec.start(handlePhResult);
  const typeNum=(typed)=>handleNumResult(typed);
  const typePh=(typed)=>handlePhResult(typed);

  // Countdown: sing-song "Ready? Three! Two! One! Gooo!"
  const doCountdown=async(onStart)=>{
    await speak("Ready?",{rate:0.8,pitch:1.0});await wait(500);
    const nums=["three","two","one"];
    const pitches=[1.0,1.0,1.0];
    for(let i=0;i<3;i++){
      setCountdown(3-i);
      await speak(nums[i],{rate:0.7,pitch:1.0});
      await wait(500);
    }
    setCountdown(0);
    await speak("Go!",{rate:0.75,pitch:1.0});
    await wait(400);
    onStart();
  };

  // ═══ SPELLING: 2-ROUND APPROACH ═══
  // ROUND 1: App says each letter → 2 sec pause → green tick (ZERO mic)
  // ROUND 2: Tap-the-letters game — scrambled letters, kid taps in order
  
  const LN={a:"A",b:"B",c:"C",d:"D",e:"E",f:"F",g:"G",h:"H",i:"I",j:"J",k:"K",l:"L",m:"M",n:"N",o:"O",p:"P",q:"Q",r:"R",s:"S",t:"T",u:"U",v:"V",w:"W",x:"X",y:"Y",z:"Z"};

  const [spellRound,setSpellRound]=useState(0); // 0=not started, 1=app demo, 2=kid tap game
  const [scrambledLetters,setScrambledLetters]=useState([]);
  const [tapIndex,setTapIndex]=useState(0);
  const [tapWrong,setTapWrong]=useState(-1); // index of wrong tap (flash red)
  const spellResolveRef=useRef(null); // to resolve the tap game promise

  // Shuffle array (Fisher-Yates)
  const shuffle=(arr)=>{const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};

  // Handle letter tap in Round 2
  const handleLetterTap=(tappedLetter,tappedIdx)=>{
    const letters=spellResolveRef.current?.letters;
    if(!letters) return;
    const expectedLetter=letters[tapIndex];
    
    // ALWAYS speak the tapped letter
    speak(tappedLetter,{rate:0.8,pitch:1.0});
    
    if(tappedLetter.toLowerCase()===expectedLetter){
      setSpellStatus(prev=>{const n=[...prev];n[tapIndex]='correct';return n;});
      setScrambledLetters(prev=>prev.map((s,i)=>i===tappedIdx?{...s,used:true}:s));
      const nextIdx=tapIndex+1;
      setTapIndex(nextIdx);
      
      if(nextIdx>=letters.length){
        setTimeout(()=>spellResolveRef.current?.resolve(true),300);
      }
    } else {
      setTapWrong(tappedIdx);
      setTimeout(()=>setTapWrong(-1),600);
    }
  };

  const spellWord=async(word)=>{
    const letters=word.toLowerCase().split('');
    setSpellStatus(letters.map(()=>'waiting'));
    setSpellRound(0);

    // ─── ROUND 1: App spells it. NO mic. Just watch & listen. ───
    setSpellRound(1);
    for(let i=0;i<letters.length;i++){
      if(!pRef.current) return;
      setActiveSpellIdx(i);
      setSpellStatus(prev=>{const n=[...prev];n[i]='listening';return n;});
      
      await speak(LN[letters[i]]||letters[i],{rate:0.7,pitch:1.0});
      await wait(500);
      
      setSpellStatus(prev=>{const n=[...prev];n[i]='correct';return n;});
      await wait(200);
    }
    setActiveSpellIdx(-1);
    await wait(400);

    // ─── ROUND 2: Tap game — ALWAYS runs ───
    if(!pRef.current){setSpellRound(0);return;}

    setSpellRound(2);
    setSpellStatus(letters.map(()=>'waiting'));
    setTapIndex(0);
    setTapWrong(-1);

    const scrambled=shuffle(letters.map((l,i)=>({letter:l.toUpperCase(),id:i,used:false})));
    setScrambledLetters(scrambled);

    await speak("Your turn! Tap the letters!",{rate:0.75,pitch:1.0});
    await wait(400);
    // Auto-scroll to show scrambled letters
    setTimeout(()=>{const el=document.querySelector('[data-spell-tap]');if(el)el.scrollIntoView({behavior:"smooth",block:"center"});},200);

    // Wait for kid to finish tapping (resolved by handleLetterTap)
    const success=await new Promise((resolve)=>{
      spellResolveRef.current={resolve,letters};
      // Timeout: 30 seconds max
      setTimeout(()=>resolve(false),30000);
    });

    spellResolveRef.current=null;
    setSpellRound(0);
    await wait(300);

    if(success){
      await speak("You spelled it!",{rate:0.8,pitch:1.0});
    } else {
      // Show correct order
      await speak("Watch me!",{rate:0.75,pitch:1.0});
      setSpellStatus(letters.map(()=>'waiting'));
      for(let i=0;i<letters.length;i++){
        if(!pRef.current) return;
        setActiveSpellIdx(i);
        setSpellStatus(prev=>{const n=[...prev];n[i]='correct';return n;});
        await speak(LN[letters[i]],{rate:0.8,pitch:1.0});
        await wait(1000);
      }
      setActiveSpellIdx(-1);
    }
  };


  // NUMBER PLAY FLOW
  const playNum=async(num)=>{
    if(pRef.current){stop();pRef.current=false;setNStep("idle");return;}
    pRef.current=true;setSelNum(num);setSpRes(null);setSpAcc(null);setAPhI(-1);setActiveSpellIdx(-1);setSpellStatus([]);
    const w=NW[num];const scene=getScene(num);

    // Step 1: Say the number (always)
    setNStep("saying_number");
    glow("num-display");
    glow("num-display");
    await speak(`This is the number, ${w}!`,{rate:0.7,pitch:1.0});
    await wait(500);if(!pRef.current)return;

    // Step 2: Interactive spelling (if enabled)
    if(learnModes.spelling){
      setNStep("spelling");
      await spellWord(w.replace(/\s/g,''));
      await wait(400);if(!pRef.current)return;
      await speak(`Awesome! That spells, ${w}.`,{rate:0.75,pitch:1.0});
      await wait(500);if(!pRef.current)return;
    }

    // Step 3: Sentence (if enabled)
    if(learnModes.sentence){
      setNStep("saying_sentence");
      glow("num-scene");
      await speak(`Here's a fun sentence!`,{rate:0.8,pitch:1.0});await wait(250);if(!pRef.current)return;
      glow("num-sentence");
      await speak(scene.sentence,{rate:0.75,pitch:1.0});
      await wait(600);if(!pRef.current)return;
    }

    // Step 4: Phonics sounds (if enabled)
    if(learnModes.phonics){
      const phs=NPH[num];
      if(phs){
        setNStep("saying_phonics");
        await speak(`Repeat after me!`,{rate:0.75,pitch:1.0});await wait(400);if(!pRef.current)return;
        for(let i=0;i<phs.length;i++){if(!pRef.current)return;setAPhI(i);await speak(gPh(phs[i]).s,{rate:0.5,pitch:1.0});await wait(700);}
        setAPhI(-1);await wait(400);if(!pRef.current)return;
        await speak(`Now say it with me, ${w}!`,{rate:0.7,pitch:1.0});await wait(400);if(!pRef.current)return;
      }
    }

    // Step 5: Speaking practice (if enabled)
    if(learnModes.speak){
      await speak(`Your turn ${kidName}! Can you say, ${w}?`,{rate:0.75,pitch:1.0});await wait(500);if(!pRef.current)return;
      stop();await wait(600);setNStep("listening");pRef.current=false;showTeacher("happy","I'm listening!");rec.start(handleNumResult);
    }else{
      pRef.current=false;
      if(!isDone("numbers",num)) awardPoints(5,"numbers",num);
      await speak(`Nice job ${kidName}!`,{rate:0.8,pitch:1.0});
      setNStep("idle");
    }
  };
  const retryNum=async()=>{showTeacher("happy","Try again! You can do it! 💪");
    setSpRes(null);setSpAcc(null);
    setNStep("countdown");
    await speak(`One more time!`,{rate:0.75,pitch:1.0});await wait(300);
    stop();await wait(600);setNStep("listening");rec.start(handleNumResult);
  };

  // PHONICS PLAY FLOW
  const playPh=async(wd)=>{
    if(pRef.current){stop();pRef.current=false;setPhStep("idle");return;}
    pRef.current=true;setPhW(wd);setPhRes(null);setPhAcc(null);setPhAI(-1);setActiveSpellIdx(-1);setSpellStatus([]);

    // Step 1: Say the word (always)
    setPhStep("saying_word");
    glow("ph-word");
    glow("ph-word");
    await speak(`This word is, ${wd.word}!`,{rate:0.7,pitch:1.0});
    await wait(500);if(!pRef.current)return;

    // Step 2: Interactive spelling (if enabled)
    if(phModes.spelling){
      setPhStep("spelling");
      await spellWord(wd.word);
      await wait(400);if(!pRef.current)return;
      glow("ph-word");
      await speak(`Awesome! That spells, ${wd.word}.`,{rate:0.75,pitch:1.0});
      await wait(500);if(!pRef.current)return;
    }

    // Step 3: Sentence (if enabled)
    if(phModes.sentence){
      setPhStep("saying_sentence");
      glow("ph-sentence");
      await speak(`Here's a fun sentence!`,{rate:0.8,pitch:1.0});await wait(250);if(!pRef.current)return;
      glow("ph-sentence");
      await speak(wd.sentence,{rate:0.75,pitch:1.0});
      await wait(600);if(!pRef.current)return;
    }

    // Step 4: Phonics sounds (if enabled)
    if(phModes.phonics){
      setPhStep("saying_phonics");
      await speak(`Repeat after me!`,{rate:0.75,pitch:1.0});await wait(400);if(!pRef.current)return;
      for(let i=0;i<wd.ph.length;i++){if(!pRef.current)return;setPhAI(i);await speak(gPh(wd.ph[i]).s,{rate:0.5,pitch:1.0});await wait(700);}
      setPhAI(-1);await wait(400);if(!pRef.current)return;
      await speak(`Now say it with me, ${wd.word}!`,{rate:0.7,pitch:1.0});await wait(400);if(!pRef.current)return;
    }

    // Step 5: Speaking practice (if enabled)
    if(phModes.speak){
      await speak(`Your turn ${kidName}! Can you say, ${wd.word}?`,{rate:0.75,pitch:1.0});await wait(500);if(!pRef.current)return;
      stop();await wait(600);setPhStep("listening");pRef.current=false;showTeacher("happy","Your turn!");rec.start(handlePhResult);
    }else{
      pRef.current=false;
      if(!isDone("phonics",wd.word)) awardPoints(5,"phonics",wd.word);
      await speak(`Nice job ${kidName}!`,{rate:0.8,pitch:1.0});
      setPhStep("idle");
    }
  };
  const retryPh=async()=>{showTeacher("happy","One more try! I believe in you! 🌈");
    setPhRes(null);setPhAcc(null);
    setPhStep("countdown");
    await speak(`One more time!`,{rate:0.75,pitch:1.0});await wait(300);
    stop();await wait(600);setPhStep("listening");rec.start(handlePhResult);
  };

  // ═══ SHAPE PLAY FLOW ═══
  const handleShResult=(result)=>{
    const normalized=normalizeSpoken(result);
    const acc=calcAcc(selShape.name,normalized);setShRes(normalized);setShAcc(acc);setShStep("result");
    const s=getStars(acc);const p=getStarPts(s);
    if(p>0){awardPoints(p,"shapes",selShape.name);boom();}else{flashWrong();}
    setTimeout(()=>{
      if(s>=3) speak(`${kidName}, you got it!`,{rate:0.8,pitch:1.0});
      else speak(`Nice try ${kidName}!`,{rate:0.8,pitch:1.0});
    },300);
  };
  const playShape=async(sh)=>{
    if(pRef.current){stop();pRef.current=false;setShStep("idle");return;}
    pRef.current=true;setSelShape(sh);setShRes(null);setShAcc(null);setShAI(-1);setActiveSpellIdx(-1);setSpellStatus([]);
    setShStep("saying_word");glow("shape-display");
    await speak(`This shape is called, ${sh.name}!`,{rate:0.7,pitch:1.0});await wait(500);if(!pRef.current)return;
    setShStep("spelling");
    await spellWord(sh.name);await wait(400);if(!pRef.current)return;
    await speak(`Awesome! That spells, ${sh.name}.`,{rate:0.75,pitch:1.0});await wait(500);if(!pRef.current)return;
    setShStep("saying_sentence");glow("shape-sentence");
    await speak(sh.sentence,{rate:0.75,pitch:1.0});await wait(600);if(!pRef.current)return;
    if(sh.ph){
      setShStep("saying_phonics");
      await speak("Repeat after me!",{rate:0.75,pitch:1.0});await wait(400);if(!pRef.current)return;
      for(let i=0;i<sh.ph.length;i++){if(!pRef.current)return;setShAI(i);await speak(gPh(sh.ph[i]).s,{rate:0.5,pitch:1.0});await wait(700);}
      setShAI(-1);await wait(400);if(!pRef.current)return;
      await speak(`Now say it with me, ${sh.name}!`,{rate:0.7,pitch:1.0});await wait(400);if(!pRef.current)return;
    }
    if(speakMode){
      await speak(`Your turn ${kidName}! Can you say, ${sh.name}?`,{rate:0.75,pitch:1.0});await wait(500);if(!pRef.current)return;
      stop();await wait(600);setShStep("listening");pRef.current=false;rec.start(handleShResult);
    }else{pRef.current=false;if(!isDone("shapes",sh.name))awardPoints(5,"shapes",sh.name);await speak(`Nice job ${kidName}!`,{rate:0.8,pitch:1.0});setShStep("idle");}
  };
  const retryShape=async()=>{setShRes(null);setShAcc(null);await speak(`One more time!`,{rate:0.75,pitch:1.0});await wait(300);stop();await wait(600);setShStep("listening");rec.start(handleShResult);};

  // ═══ COLOR PLAY FLOW ═══
  const handleCoResult=(result)=>{
    const normalized=normalizeSpoken(result);
    const acc=calcAcc(selColor.name,normalized);setCoRes(normalized);setCoAcc(acc);setCoStep("result");
    const s=getStars(acc);const p=getStarPts(s);
    if(p>0){awardPoints(p,"colors",selColor.name);boom();}else{flashWrong();}
    setTimeout(()=>{
      if(s>=3) speak(`${kidName}, you got it!`,{rate:0.8,pitch:1.0});
      else speak(`Nice try ${kidName}!`,{rate:0.8,pitch:1.0});
    },300);
  };
  const playColor=async(co)=>{
    if(pRef.current){stop();pRef.current=false;setCoStep("idle");return;}
    pRef.current=true;setSelColor(co);setCoRes(null);setCoAcc(null);setCoAI(-1);setActiveSpellIdx(-1);setSpellStatus([]);
    setCoStep("saying_word");glow("color-display");
    await speak(`This color is, ${co.name}!`,{rate:0.7,pitch:1.0});await wait(500);if(!pRef.current)return;
    setCoStep("spelling");
    await spellWord(co.name);await wait(400);if(!pRef.current)return;
    await speak(`Awesome! That spells, ${co.name}.`,{rate:0.75,pitch:1.0});await wait(500);if(!pRef.current)return;
    setCoStep("saying_sentence");glow("color-sentence");
    await speak(co.sentence,{rate:0.75,pitch:1.0});await wait(600);if(!pRef.current)return;
    if(co.ph){
      setCoStep("saying_phonics");
      await speak("Repeat after me!",{rate:0.75,pitch:1.0});await wait(400);if(!pRef.current)return;
      for(let i=0;i<co.ph.length;i++){if(!pRef.current)return;setCoAI(i);await speak(gPh(co.ph[i]).s,{rate:0.5,pitch:1.0});await wait(700);}
      setCoAI(-1);await wait(400);if(!pRef.current)return;
      await speak(`Now say it with me, ${co.name}!`,{rate:0.7,pitch:1.0});await wait(400);if(!pRef.current)return;
    }
    if(speakMode){
      await speak(`Your turn ${kidName}! Can you say, ${co.name}?`,{rate:0.75,pitch:1.0});await wait(500);if(!pRef.current)return;
      stop();await wait(600);setCoStep("listening");pRef.current=false;rec.start(handleCoResult);
    }else{pRef.current=false;if(!isDone("colors",co.name))awardPoints(5,"colors",co.name);await speak(`Nice job ${kidName}!`,{rate:0.8,pitch:1.0});setCoStep("idle");}
  };
  const retryColor=async()=>{setCoRes(null);setCoAcc(null);await speak(`One more time!`,{rate:0.75,pitch:1.0});await wait(300);stop();await wait(600);setCoStep("listening");rec.start(handleCoResult);};




  // ═══ MATH FUNCTIONS ═══
  const genMath=(overrideRange,overrideOp)=>{
    const range=overrideRange||mathRange;
    const opSel=overrideOp||mathOp;
    const[rMin,rMax]=range.split("-").map(Number);
    let op;
    if(opSel==="mix"){
      const ops=["+","-","×"];op=ops[Math.floor(Math.random()*ops.length)];
    } else op=opSel;
    
    let a,b,answer;
    if(op==="+"){
      a=rMin+Math.floor(Math.random()*(rMax-rMin+1));
      b=rMin+Math.floor(Math.random()*(rMax-rMin+1));
      answer=a+b;
    } else if(op==="-"){
      a=rMin+Math.floor(Math.random()*(rMax-rMin+1));
      b=rMin+Math.floor(Math.random()*(rMax-rMin+1));
      if(a<b){const t=a;a=b;b=t;}
      answer=a-b;
    } else {
      const mMax=Math.min(rMax,12);
      a=Math.max(1,rMin)+Math.floor(Math.random()*(mMax-Math.max(1,rMin)+1));
      b=1+Math.floor(Math.random()*Math.min(mMax,10));
      answer=a*b;
    }
    
    const choices=new Set([answer]);
    while(choices.size<4){
      const wrong=answer+Math.floor(Math.random()*7)-3;
      if(wrong>=0&&wrong!==answer)choices.add(wrong);
    }
    setMathProblem({a,b,op,answer});
    setMathChoices(shuffle([...choices]));
    setMathFb(null);setMathAnswer(null);
    const opWord=op==="+"?"plus":op==="-"?"minus":"times";
    speak(`What is ${a} ${opWord} ${b}?`,{rate:0.8,pitch:1.0});
  };
  const onMathTap=async(choice)=>{
    if(mathFb)return;
    setMathAnswer(choice);
    setMathTotal(t=>t+1);
    if(choice===mathProblem.answer){
      setMathFb("correct");headYes();boom();
      setMathScore(s=>s+1);
      awardPoints(3,"math",`${mathProblem.a}${mathProblem.op}${mathProblem.b}`);
      await speak(`${choice}! Yes, that's right!`,{rate:0.85,pitch:1.0});
      await wait(1000);
      genMath();
    } else {
      setMathFb("wrong");headNo();flashWrong();
      await speak(`Oops! ${mathProblem.a} ${mathProblem.op==="+"?"plus":mathProblem.op==="-"?"minus":"times"} ${mathProblem.b} equals ${mathProblem.answer}.`,{rate:0.8,pitch:1.0});
      await wait(2000);
      genMath();
    }
  };

  // ═══ ALPHABET FUNCTIONS ═══
  const alphaRef=useRef("");
  const playLetter=async(letter)=>{
    // STOP everything from previous letter
    stop(); // cancel all TTS
    pRef.current=true; // mark as playing
    alphaRef.current=letter; // track which letter is active
    setSelLetter(letter);
    const d=ALPHA_DATA[letter];if(!d)return;
    await wait(200); // let cancel settle
    // Check if still on this letter after each step
    const ok=()=>alphaRef.current===letter&&pRef.current;
    glow("letter-big");
    await speak(`${letter}!`,{rate:0.85,pitch:1.0});
    if(!ok())return;
    await wait(200);
    if(!ok())return;
    await speak(`${letter} says`,{rate:0.85,pitch:1.0});
    await wait(200);
    glow("letter-sound");
    await speak(`${d.ph}`,{rate:0.5,pitch:1.0});
    if(!ok())return;
    await wait(300);
    for(let ei=0;ei<d.examples.length;ei++){
      const ex=d.examples[ei];
      if(!ok())return;
      glow("letter-ex-"+ei);
      await speak(`${letter} for ${ex.w}!`,{rate:0.8,pitch:1.0});
      if(!ok())return;
      await wait(500);
    }
    if(!ok())return;
    await wait(200);
    await speak(`And that's the letter ${letter}!`,{rate:0.85,pitch:1.0});
  };
  const closeLetter=()=>{stop();pRef.current=false;alphaRef.current="";setSelLetter(null);};
  // Generate shuffled options: correct letter + 4 random wrong ones
  const genOpts=(correct)=>{
    const opts=new Set([correct]);
    while(opts.size<5){
      const r=ALPHA_LETTERS[Math.floor(Math.random()*26)];
      if(r!==correct)opts.add(r);
    }
    return shuffle([...opts]);
  };
  const matchModeRef=useRef("findSmall");
  const genVoiceOpts=(correct)=>{
    const opts=[correct];
    const pool=ALPHA_LETTERS.filter(l=>l!==correct);
    for(let i=0;i<5;i++){const idx=Math.floor(Math.random()*pool.length);opts.push(pool[idx]);pool.splice(idx,1);}
    return shuffle(opts);
  };
  const startMatch=async(mode)=>{
    stop();
    const m=mode||matchModeRef.current;
    matchModeRef.current=m;setMatchMode(m);
    const picked=shuffle(ALPHA_LETTERS.slice()).slice(0,8);
    setMatchPairs(picked.map(l=>({cap:l})));
    setMatchLeft(null);setMatchScore(0);setMatchDone([]);setMatchIdx(0);setMatchWrong(null);setMatchCorrect(null);
    const correct=picked[0];
    if(m==="voiceQuiz"){
      setMatchOpts(genVoiceOpts(correct));
      await wait(300);
      await speak("Listen carefully!",{rate:0.85,pitch:1.0});
      await wait(400);
      await speak(correct,{rate:0.6,pitch:1.0});
    } else if(m==="findCaps"){
      setMatchOpts(genOpts(correct));
      await wait(300);
      await speak("Find the capital letter!",{rate:0.85,pitch:1.0});
      await wait(400);
      await speak("Find capital "+correct+".",{rate:0.85,pitch:1.0});
    } else {
      setMatchOpts(genOpts(correct));
      await wait(300);
      await speak("Let's match letters!",{rate:0.85,pitch:1.0});
      await wait(400);
      await speak("Find small "+correct.toLowerCase()+".",{rate:0.85,pitch:1.0});
    }
  };
  const advanceMatch=async(nextIdx,pairs)=>{
    stop();
    if(nextIdx>=pairs.length){
      setMatchIdx(nextIdx);setMatchOpts([]);
      boom();
      await wait(300);
      await speak("Wow! You matched them all!",{rate:0.85,pitch:1.0});
    } else {
      const correct=pairs[nextIdx].cap;
      setMatchIdx(nextIdx);
      const m=matchModeRef.current;
      if(m==="voiceQuiz"){
        setMatchOpts(genVoiceOpts(correct));
        await wait(500);
        await speak(correct,{rate:0.6,pitch:1.0});
      } else {
        setMatchOpts(genOpts(correct));
        await wait(300);
        if(m==="findCaps") await speak("Find capital "+correct+".",{rate:0.85,pitch:1.0});
        else await speak("Find small "+correct.toLowerCase()+".",{rate:0.85,pitch:1.0});
      }
    }
  };
  const onMatchTap=async(tappedLetter)=>{
    if(matchWrong||matchCorrect)return;
    const currentCap=matchPairs[matchIdx]?.cap;
    if(!currentCap)return;
    stop();
    const isCorrect=tappedLetter.toUpperCase()===currentCap.toUpperCase();
    if(isCorrect){
      setMatchCorrect(tappedLetter);
      setMatchDone(p=>[...p,currentCap]);
      setMatchScore(s=>s+1);
      boom();headYes();
      await speak(currentCap+"! Yes!",{rate:0.85,pitch:1.0});
      await wait(600);
      setMatchCorrect(null);
      await advanceMatch(matchIdx+1,matchPairs);
    } else {
      setMatchWrong(tappedLetter);
      setMatchCorrect(currentCap);
      headNo();flashWrong();
      await speak("Oops! That is "+tappedLetter+". We need "+currentCap+".",{rate:0.8,pitch:1.0});
      await wait(1500);
      setMatchWrong(null);setMatchCorrect(null);
      setMatchDone(p=>[...p,currentCap]);
      await advanceMatch(matchIdx+1,matchPairs);
    }
  };

  // ═══ BASICS FUNCTIONS ═══
  const sayNum=(n)=>{
    glow("num-explore-"+n);
    speak(`${NW[n]||n}.`,{rate:0.8,pitch:1.0});
  };
  // ═══ NUMBER QUIZ ═══
  const newQuiz=(overrideRange)=>{
    const range=overrideRange||quizRange;
    const[rMin,rMax]=range.split("-").map(Number);
    // Build pool of unused numbers in range
    let pool=[];
    for(let i=rMin;i<=rMax;i++){if(!quizUsedRef.current.includes(i))pool.push(i);}
    // Full cycle done — reset
    if(pool.length===0){
      quizUsedRef.current=[];
      pool=[];for(let i=rMin;i<=rMax;i++)pool.push(i);
    }
    const n=pool[Math.floor(Math.random()*pool.length)];
    quizUsedRef.current=[...quizUsedRef.current,n];
    // Generate 6 options from the SAME range + correct, all unique
    const opts=new Set([n]);
    const rangeSize=rMax-rMin+1;
    while(opts.size<Math.min(6,rangeSize)){
      const wrong=rMin+Math.floor(Math.random()*(rMax-rMin+1));
      opts.add(wrong);
    }
    const shuffled=[...opts].sort(()=>Math.random()-0.5);
    setQuizNum(n);setQuizOpts(shuffled);setQuizFb(null);
    movePandaTo("bottomRight");
    setTimeout(()=>speak(`${NW[n]||n}`,{rate:0.75,pitch:1.0}),300);
  };
  const repeatQuiz=()=>{if(quizNum)speak(`${NW[quizNum]||quizNum}`,{rate:0.75,pitch:1.0});};
  const onQuizTap=async(tapped)=>{
    if(quizFb)return;
    setQuizTotal(t=>t+1);
    if(tapped===quizNum){
      setQuizFb({ok:true,n:tapped});setQuizScore(s=>s+1);setQuizStreak(s=>s+1);
      headYes();
      if(!isDone("quiz",quizNum))awardPoints(3,"quiz",quizNum);
      const cheers=["Yes!","Awesome!","Yay!","Right!","Super!"];
      speak(cheers[Math.floor(Math.random()*cheers.length)],{rate:1.0,pitch:1.1});
      boom();
      await wait(1200);
      movePandaTo("bottomRight");
      newQuiz();
    } else {
      setQuizFb({ok:false,n:tapped});setQuizStreak(0);
      headNo();flashWrong();
      speak("Oops! Try again!",{rate:0.9,pitch:1.0});
      await wait(1000);
      setQuizFb(null);
      movePandaTo("bottomRight");
      speak(`${NW[quizNum]||quizNum}`,{rate:0.75,pitch:1.0});
    }
  };
  // Drawing pad
  const initCanvas=()=>{
    const c=cRef.current;if(!c)return;
    const rect=c.getBoundingClientRect();
    if(rect.width===0||rect.height===0){
      // Canvas not visible yet — retry in 100ms
      setTimeout(initCanvas,100);return;
    }
    const dpr=window.devicePixelRatio||1;
    c.width=rect.width*dpr;
    c.height=rect.height*dpr;
    const ctx=c.getContext("2d");
    ctx.scale(dpr,dpr);
    const penW=Math.max(20,Math.round(rect.width*0.08));
    ctx.lineWidth=penW;ctx.lineCap="round";ctx.lineJoin="round";ctx.strokeStyle="#FF8C42";
  };
  const getPos=(e)=>{
    const c=cRef.current;if(!c)return{x:0,y:0};
    const rect=c.getBoundingClientRect();
    const t=e.touches?e.touches[0]:(e.nativeEvent?.touches?e.nativeEvent.touches[0]:e);
    const cx=t.clientX||t.pageX||0;
    const cy=t.clientY||t.pageY||0;
    return{x:cx-rect.left,y:cy-rect.top};
  };
  const drawStart=(e)=>{
    e.preventDefault&&e.preventDefault();
    const c=cRef.current;if(!c)return;
    const ctx=c.getContext("2d");
    const{x,y}=getPos(e);
    ctx.beginPath();ctx.moveTo(x,y);
    const rect2=c.getBoundingClientRect();
    const penW2=Math.max(20,Math.round(rect2.width*0.08));
    ctx.strokeStyle="#FF8C42";ctx.lineWidth=penW2;ctx.lineCap="round";ctx.lineJoin="round";
    c._drawing=true;
    drawPtsRef.current++;setDrawPts(p=>p+1);
  };
  const drawMove=(e)=>{
    e.preventDefault&&e.preventDefault();
    const c=cRef.current;if(!c||!c._drawing)return;
    const ctx=c.getContext("2d");
    const{x,y}=getPos(e);
    ctx.lineTo(x,y);ctx.stroke();
    drawPtsRef.current++;setDrawPts(p=>p+1);
  };
  const scoreWriting=()=>{
    const c=cRef.current;if(!c)return 0;
    const ctx=c.getContext("2d");
    const dpr=window.devicePixelRatio||1;
    const w=c.width,h=c.height;
    const dispW=w/dpr,dispH=h/dpr;
    if(w===0||h===0)return 0;
    try{
      // 1. Save user drawing
      const userPixels=ctx.getImageData(0,0,w,h);
      const userData=new Uint8Array(userPixels.data);
      
      // 2. Reset transform and render template character
      ctx.save();
      ctx.setTransform(1,0,0,1,0,0); // reset ALL transforms
      ctx.clearRect(0,0,w,h);
      ctx.scale(dpr,dpr); // apply DPR once
      const fontSize=Math.round(dispW*0.5);
      ctx.font=`900 ${fontSize}px 'Fredoka',Arial,sans-serif`;
      ctx.textAlign="center";
      ctx.textBaseline="middle";
      ctx.fillStyle="rgba(0,0,0,1)";
      const isNum=writeMode==="numbers";
      const target=isNum?String(writeNum):(writeCase==="caps"?writeChar.toUpperCase():writeChar.toLowerCase());
      ctx.fillText(target,dispW/2,dispH/2);
      ctx.restore();
      
      // 3. Read template pixels
      const tplData=ctx.getImageData(0,0,w,h).data;
      
      // 4. Restore user drawing
      ctx.save();
      ctx.setTransform(1,0,0,1,0,0);
      ctx.clearRect(0,0,w,h);
      ctx.putImageData(userPixels,0,0);
      ctx.restore();
      
      // 5. Pixel comparison (sample every 4th pixel)
      let tplCount=0,inkCount=0,overlap=0;
      for(let i=3;i<userData.length;i+=16){
        const hasTpl=tplData[i]>20;
        const hasInk=userData[i]>10;
        if(hasTpl)tplCount++;
        if(hasInk)inkCount++;
        if(hasTpl&&hasInk)overlap++;
      }
      
      if(tplCount<5||inkCount<3)return 0;
      
      // Coverage: % of watermark filled by ink
      const coverage=overlap/tplCount;
      // Precision: % of ink that is ON the watermark
      const precision=overlap/inkCount;
      // Score = coverage × precision × boost
      return Math.min(100,Math.max(0,Math.round(coverage*precision*140)));
    }catch(e){return 0;}
  };
  const drawEnd=()=>{
    if(!cRef.current)return;
    cRef.current._drawing=false;
    // Always calculate score after drawing
    const score=scoreWriting();
    setWriteScore(score);
    if(score>=60&&!writeOkRef.current){
      setWriteOk(true);writeOkRef.current=true;
      headYes();boom();speak(`Perfect!`,{rate:0.85,pitch:1.0});
      if(!isDone("basics_w",writeMode==="numbers"?writeNum:writeChar)) awardPoints(5,"basics_w",writeMode==="numbers"?writeNum:writeChar);
      setTimeout(()=>{
        if(writeMode==="numbers"){
          setWriteNum(prev=>{
            const n=(prev%20)+1;
            setWriteOk(false);writeOkRef.current=false;setWriteScore(null);drawPtsRef.current=0;setDrawPts(0);
            setTimeout(()=>{initCanvas();speak(`Now write ${NW[n]||n}.`,{rate:0.75,pitch:1.0});},300);
            return n;
          });
        } else {
          setWriteChar(prev=>{
            const idx=ALPHA_LETTERS.indexOf(prev.toUpperCase());
            const next=ALPHA_LETTERS[(idx+1)%26];
            const ch=writeCase==="caps"?next:next.toLowerCase();
            setWriteOk(false);writeOkRef.current=false;setWriteScore(null);drawPtsRef.current=0;setDrawPts(0);
            setTimeout(()=>{initCanvas();speak(`Now write ${ch}.`,{rate:0.75,pitch:1.0});},300);
            return next;
          });
        }
      },2500);
    } else if(score>=35&&!writeOkRef.current){
      setWriteOk(true);writeOkRef.current=true;
      headYes();boom();speak(`Good job!`,{rate:0.85,pitch:1.0});
      if(!isDone("basics_w",writeMode==="numbers"?writeNum:writeChar)) awardPoints(3,"basics_w",writeMode==="numbers"?writeNum:writeChar);
      setTimeout(()=>{
        if(writeMode==="numbers"){
          setWriteNum(prev=>{
            const n=(prev%20)+1;
            setWriteOk(false);writeOkRef.current=false;setWriteScore(null);drawPtsRef.current=0;setDrawPts(0);
            setTimeout(()=>{initCanvas();speak(`Now write ${NW[n]||n}.`,{rate:0.75,pitch:1.0});},300);
            return n;
          });
        } else {
          setWriteChar(prev=>{
            const idx=ALPHA_LETTERS.indexOf(prev.toUpperCase());
            const next=ALPHA_LETTERS[(idx+1)%26];
            const ch=writeCase==="caps"?next:next.toLowerCase();
            setWriteOk(false);writeOkRef.current=false;setWriteScore(null);drawPtsRef.current=0;setDrawPts(0);
            setTimeout(()=>{initCanvas();speak(`Now write ${ch}.`,{rate:0.75,pitch:1.0});},300);
            return next;
          });
        }
      },2500);
    }
  };
  const clearPad=()=>{
    const c=cRef.current;if(!c)return;
    initCanvas(); // Re-init instead of just clearing
    drawPtsRef.current=0;setDrawPts(0);setWriteOk(false);writeOkRef.current=false;setWriteScore(null);
  };
  const nextWrite=()=>{
    setWriteNum(n=>n>=100?1:n+1);
    drawPtsRef.current=0;setDrawPts(0);setWriteOk(false);writeOkRef.current=false;setWriteScore(null);
    setTimeout(()=>{initCanvas();},100);
    speak(`Write ${NW[writeNum>=100?1:writeNum+1]||writeNum+1}.`,{rate:0.75,pitch:1.0});
  };

    const buyR=(r)=>{if((prof?.points||0)<r.cost)return;save({...prof,points:prof.points-r.cost,rewards:[...(prof.rewards||[]),{...r,at:Date.now()}]});boom();setRwdMsg(`${r.emoji} Yay! You earned ${r.name}! Show your parents!`);setTimeout(()=>setRwdMsg(null),4000);};

  // ═══ DRAGGABLE VIRTUAL TEACHER (renders on all screens) ═══
  const dragRef=useRef(null);
  const dragStartRef=useRef(null);
  const owlDragStart=(e)=>{
    const t=e.touches?e.touches[0]:e;
    dragStartRef.current={x:t.clientX-pandaPos.x,y:t.clientY-pandaPos.y};
    dragRef.current=true;
  };
  const owlDragMove=(e)=>{
    if(!dragRef.current)return;
    e.preventDefault();
    const t=e.touches?e.touches[0]:e;
    const x=Math.max(0,Math.min(t.clientX-dragStartRef.current.x,window.innerWidth-owlSize));
    const y=Math.max(0,Math.min(t.clientY-dragStartRef.current.y,window.innerHeight-owlSize));
    setPandaPos({x,y});
  };
  const owlDragEnd=()=>{dragRef.current=false;};
  useEffect(()=>{
    window.addEventListener("mousemove",owlDragMove);
    window.addEventListener("mouseup",owlDragEnd);
    window.addEventListener("touchmove",owlDragMove,{passive:false});
    window.addEventListener("touchend",owlDragEnd);
    return()=>{
      window.removeEventListener("mousemove",owlDragMove);
      window.removeEventListener("mouseup",owlDragEnd);
      window.removeEventListener("touchmove",owlDragMove);
      window.removeEventListener("touchend",owlDragEnd);
    };
  });

  // Ollie tap reactions — fun interactive responses when kid taps the owl
  const owlTapReactions=[
    {mood:"excited",emoji:"😄",sound:"Hee hee!"},
    {mood:"star",emoji:"⭐",sound:"Yay!"},
    {mood:"waving",emoji:"👋",sound:"Hello!"},
    {mood:"clapping",emoji:"👏",sound:"Woo hoo!"},
    {mood:"proud",emoji:"💕",sound:"I love you!"},
    {mood:"excited",emoji:"🎉",sound:"Let's play!"},
    {mood:"star",emoji:"✨",sound:"You're amazing!"},
    {mood:"waving",emoji:"🌟",sound:"Hi there!"},
    {mood:"clapping",emoji:"🎊",sound:"Great job!"},
    {mood:"happy",emoji:"🤗",sound:"Hug!"},
  ];
  const owlTapRef=useRef(0);
  const owlTapTime=useRef(0);
  const onOllieTap=()=>{
    const reaction=owlTapReactions[owlTapRef.current%owlTapReactions.length];
    owlTapRef.current++;
    setTeacherMood(reaction.mood);
    
    speak(reaction.sound,{rate:1.0,pitch:1.1});
  };

  const TeacherBubble=<>{wrongFlash&&<div style={{position:"fixed",inset:0,background:"rgba(239,68,68,0.25)",zIndex:198,pointerEvents:"none",animation:"cWrongPulse 0.8s ease-out forwards"}}/>}<div style={{position:"fixed",left:pandaPos.x,top:pandaPos.y,zIndex:200,pointerEvents:"none",transition:dragRef.current?"none":joyFly?"left 0.3s ease-out, top 0.3s ease-out":"left 1s cubic-bezier(0.4,0,0.2,1), top 1s cubic-bezier(0.4,0,0.2,1)",filter:"drop-shadow(0 4px 10px rgba(0,0,0,.1))"}}>
    {/* Ollie — draggable + tappable */}
    <div
      onMouseDown={(e)=>{owlTapTime.current=Date.now();owlDragStart(e);}}
      onMouseUp={()=>{if(Date.now()-owlTapTime.current<250)onOllieTap();}}
      onTouchStart={(e)=>{owlTapTime.current=Date.now();owlDragStart(e);}}
      onTouchEnd={()=>{if(Date.now()-owlTapTime.current<250)onOllieTap();}}
      style={{cursor:"pointer",pointerEvents:"auto",userSelect:"none",WebkitUserSelect:"none"}}>
      <BellaChar mood={teacherMood} size={owlSize} speaking={isSpeaking} joyMode={joyFly} shake={headShake} mouthOpen={mouthOpen}/>
    </div>
  </div></>;

  // ═══ SCREENS ═══

  if(scr==="splash")return<div onClick={async()=>{
    rec.warmUp();
    // Speak welcome and WAIT for it to finish
    await speak("Welcome to Little Genius! I'm Ollie the Owl, your learning buddy!",{rate:0.85,pitch:1.0});
    welcomeSpoken.current=true;
    await wait(400);
    stop(); // clean silence before transition
    setOllieSize(95);
    if(prof){
      setScr("home");
      await wait(600);
      movePandaTo("bottomRight");
      await wait(400);
      await speak("Hi "+(prof?.name||"friend")+"! So good to see you!",{rate:0.85,pitch:1.0});
      setTimeout(()=>doHomeTour(),1500);
    } else {
      setScr("onboard");
      await wait(600);
      movePandaTo("bottomRight");
      await wait(400);
      speak("Ooh, you're new! What's your name?",{rate:0.85,pitch:1.0});
      setTeacherMood("happy");
    }
  }} style={{background:"linear-gradient(135deg,#6C5CE7 0%,#A29BFE 30%,#74B9FF 60%,#55EFC4 100%)",backgroundSize:"300% 300%",animation:"gradientMove 6s ease infinite",position:"fixed",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflow:"hidden",fontFamily:"var(--font)",cursor:"pointer"}}>
    <Particles count={15} emojis={["⭐","✨","🌟","💫"]}/>
    <div style={{textAlign:"center",zIndex:2,animation:"splashPop 0.8s cubic-bezier(0.34,1.56,0.64,1)"}}>
      <h1 style={{fontSize:48,fontWeight:900,color:"#fff",margin:0,letterSpacing:-1,textShadow:"0 3px 12px rgba(0,0,0,0.15)"}}>Little Genius 🦉</h1>
      <p style={{color:"rgba(255,255,255,0.85)",fontSize:14,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginTop:8}}>Learn • Play • Grow</p>
      <button style={{marginTop:32,padding:"18px 48px",borderRadius:50,border:"3px solid rgba(255,255,255,0.3)",background:"rgba(255,255,255,0.2)",color:"#fff",fontSize:20,fontWeight:800,cursor:"pointer",fontFamily:"var(--font)",boxShadow:"0 8px 32px rgba(0,0,0,0.15)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",animation:"numPulse 2s ease-in-out infinite"}}>Tap to Start! 🦉</button>
    </div>
    {TeacherBubble}<style>{CSS}</style>
  </div>;


  if(scr==="onboard")return<div style={{height:"100vh",overflow:"auto",background:"linear-gradient(135deg,#6C5CE7 0%,#A29BFE 40%,#74B9FF 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,position:"relative",fontFamily:"var(--font)"}}>
    <Particles count={6} emojis={["🌸","🦋","⭐","🌈"]}/>
    <div style={{background:"rgba(255,255,255,0.95)",borderRadius:32,padding:"32px 24px",maxWidth:420,width:"100%",boxShadow:"0 20px 60px rgba(108,92,231,0.2),0 4px 12px rgba(0,0,0,0.06)",zIndex:2,animation:"slideUp 0.5s ease-out",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)"}}>
    {obSt===0?<>
      {/* Step 1: Name + Age */}
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{textAlign:"center",fontSize:56,animation:"mascotB 2s ease-in-out infinite"}}>👋</div>
        <h2 style={{fontSize:28,fontWeight:900,color:"#2D2B3D",margin:"8px 0 4px"}}>Hello there!</h2>
        <p style={{fontSize:13,color:"#8E8CA3",fontWeight:600}}>Let's set up your profile</p>
      </div>
      <label style={{fontSize:12,fontWeight:800,color:"#6C5CE7",textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:8}}>What's your name?</label>
      <input value={obN} onChange={e=>setObN(e.target.value)} placeholder="Type your name..." style={{width:"100%",padding:"14px 16px",border:"2px solid #DFE6E9",borderRadius:18,fontSize:17,fontWeight:700,fontFamily:"var(--font)",outline:"none",boxSizing:"border-box",background:"#F8FAFF"}}/>
      <label style={{fontSize:12,fontWeight:800,color:"#6C5CE7",textTransform:"uppercase",letterSpacing:1.5,display:"block",margin:"20px 0 10px"}}>How old are you?</label>
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8}}>
        {[3,4,5,6,7,8].map(a=><button key={a} onClick={()=>setObA(a)} style={{
          padding:"14px 0",borderRadius:16,border:"3px solid",
          borderColor:obA===a?"#6C5CE7":"#DFE6E9",
          background:obA===a?"linear-gradient(135deg,#6C5CE7,#A29BFE)":"#fff",
          color:obA===a?"#fff":"#1C1C2B",fontSize:20,fontWeight:900,
          fontFamily:"var(--font)",cursor:"pointer",transform:obA===a?"scale(1.08)":"scale(1)",
          boxShadow:obA===a?"0 4px 12px rgba(252,128,25,.3)":"none"
        }}>{a}</button>)}
      </div>
      <button onClick={()=>{setObSt(1);speak("Cool name! Now pick your style!",{rate:0.8,pitch:1.0});setTeacherMood("excited");}} style={{width:"100%",padding:16,borderRadius:18,border:"none",background:"linear-gradient(135deg,#6C5CE7,#A29BFE)",color:"#fff",fontSize:17,fontWeight:800,fontFamily:"var(--font)",cursor:"pointer",marginTop:24,boxShadow:"var(--shadow-btn)",letterSpacing:0.5}}>Next →</button>
    </>:
    <>
      {/* Step 2: Gender + Avatar */}
      <div style={{textAlign:"center",marginBottom:16}}>
        <h2 style={{fontSize:24,fontWeight:900,color:"#2D2B3D",margin:0}}>Pick your look! ✨</h2>
        <p style={{fontSize:13,color:"#8E8CA3",fontWeight:600,marginTop:4}}>Choose your character</p>
      </div>
      <label style={{fontSize:12,fontWeight:800,color:"#6C5CE7",textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:6}}>I am a...</label>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginBottom:20}}>
        {[{g:"boy",e:"👦",c:"#FF8C42"},{g:"girl",e:"👧",c:"#EC4899"}].map(x=><button key={x.g} onClick={()=>setObG(x.g)} style={{
          padding:20,borderRadius:20,border:"3px solid",
          borderColor:obG===x.g?x.c:"#E8E8E8",
          background:obG===x.g?(x.g==="boy"?"#FFF5EB":"#FDF2F8"):"#fff",
          cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8,transform:obG===x.g?"scale(1.04)":"scale(1)",
          boxShadow:obG===x.g?`0 4px 16px ${x.c}33`:"none"
        }}>
          <span style={{fontSize:44}}>{x.e}</span>
          <span style={{fontWeight:800,fontSize:15,color:obG===x.g?x.c:"#8E8CA3"}}>{x.g.charAt(0).toUpperCase()+x.g.slice(1)}</span>
        </button>)}
      </div>
      <label style={{fontSize:12,fontWeight:800,color:"#6C5CE7",textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:10}}>Pick an avatar</label>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
        {AVATARS[obG].map((av,i)=><button key={i} onClick={()=>setObAv(i)} style={{
          padding:14,borderRadius:18,border:"3px solid",
          borderColor:obAv===i?"#FF8C42":"#E8E8E8",
          background:obAv===i?"#FFF5EB":"#F8F9FB",
          fontSize:34,cursor:"pointer",
          transform:obAv===i?"scale(1.12)":"scale(1)",
          display:"flex",alignItems:"center",justifyContent:"center",
          boxShadow:obAv===i?"0 4px 12px rgba(252,128,25,.2)":"none"
        }}>{av}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:10,marginTop:24}}>
        <button onClick={()=>setObSt(0)} style={{padding:14,borderRadius:16,border:"2px solid #E8E0D8",background:"#fff",fontSize:15,fontWeight:800,fontFamily:"var(--font)",cursor:"pointer",color:"#8E8CA3"}}>← Back</button>
        <button onClick={()=>{rec.warmUp();save({name:obN||"Buddy",age:obA,gender:obG,avatar:obAv,points:0,totalEarned:0,completed:{},rewards:[],at:Date.now()});speak("Yay! Let's look around together!",{rate:0.85,pitch:1.0});setTeacherMood("star");setScr("home");setTimeout(()=>doHomeTour(),2000);}} style={{padding:14,borderRadius:16,border:"none",background:"linear-gradient(135deg,#6C5CE7,#A29BFE)",color:"#fff",fontSize:17,fontWeight:800,fontFamily:"var(--font)",cursor:"pointer",boxShadow:"var(--shadow-btn)"}}>Let's Go! 🚀</button>
      </div>
    </>}
    </div>
    {TeacherBubble}<style>{CSS}</style>
  </div>;


  // ═══ BOTTOM NAV BAR (renders on home, learn, quizzone, phonics, stories, rewards) ═══
  const showNav=["home","learn","quizzone","phonics","stories","rewards","settings","studyplan"].includes(scr)&&!selNum&&!selShape&&!selColor&&!phW;
  const BottomNav=showNav?<div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"calc(100% - 32px)",maxWidth:488,display:"flex",background:"#fff",border:"none",zIndex:90,fontFamily:"var(--font)",boxShadow:"0 4px 30px rgba(108,92,231,0.15),0 1px 4px rgba(0,0,0,0.06)",borderRadius:24,padding:"4px"}}>
    {[
      {id:"home",icon:"🏠",label:"Home"},
      {id:"learn",icon:"📚",label:"Learn"},
      {id:"quizzone",icon:"🎯",label:"Quiz"},
      {id:"stories",icon:"📖",label:"Stories"},
      {id:"settings",icon:"👤",label:"Profile"},
    ].map(t=><button key={t.id} onClick={()=>{sfxTap();stop();if(t.id==="home")goHome();else{movePandaTo("bottomRight");rec.warmUp();setTeacherMood("star");setScr(t.id);}}} style={{
      flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:2,
      padding:"6px 4px 8px",border:"none",cursor:"pointer",
      background:scr===t.id?"linear-gradient(135deg,#6C5CE7,#A29BFE)":"transparent",
      borderRadius:20,
      borderTop:"none"}}>
      <span style={{fontSize:18,filter:scr===t.id?"none":"grayscale(0.4) opacity(0.5)"}}>{t.icon}</span>
      <span style={{fontSize:9,fontWeight:700,color:scr===t.id?"#fff":"#A4B0BE"}}>{t.label}</span>
    </button>)}
  </div>:null;


  // ═══ QUESTIONNAIRE (first-time only) ═══
  if(scr==="questionnaire")return<div style={{fontFamily:"var(--font)",height:"100vh",overflow:"auto",background:"linear-gradient(135deg,#6C5CE7 0%,#A29BFE 40%,#74B9FF 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
    <div style={{background:"rgba(255,255,255,0.95)",borderRadius:32,padding:"28px 22px",maxWidth:420,width:"100%",boxShadow:"0 20px 60px rgba(108,92,231,0.2)",textAlign:"center"}}>
      <div style={{fontSize:48}}>🦉</div>
      <h2 style={{fontFamily:"var(--font)",fontSize:20,fontWeight:800,color:"var(--dark)",margin:"8px 0 4px"}}>Quick Questions!</h2>
      <p style={{fontSize:12,color:"#A4B0BE",fontWeight:600,marginBottom:16}}>Help Ollie personalize your experience ({qStep+1}/{QUESTIONNAIRE.length})</p>
      
      <div style={{fontSize:16,fontWeight:700,color:"var(--dark)",marginBottom:14}}>{QUESTIONNAIRE[qStep]?.q}</div>
      
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {QUESTIONNAIRE[qStep]?.opts.map((opt,i)=><button key={i} onClick={()=>{
          sfxTap();
          const newA=[...qAnswers,opt];setQAnswers(newA);
          if(qStep<QUESTIONNAIRE.length-1){setQStep(qStep+1);}
          else{saveQuizAnswers(newA);setScr("home");setTeacherMood("star");}
        }} style={{
          padding:"14px 18px",borderRadius:18,border:"none",cursor:"pointer",fontFamily:"var(--font)",
          fontSize:14,fontWeight:700,textAlign:"left",
          background:["linear-gradient(135deg,#6C5CE7,#A29BFE)","linear-gradient(135deg,#00D2A0,#55EFC4)","linear-gradient(135deg,#FF9F43,#FECA57)","linear-gradient(135deg,#54A0FF,#74B9FF)"][i%4],
          color:"#fff",boxShadow:"0 3px 12px rgba(0,0,0,0.1)",
          transition:"all 0.2s"
        }}>{opt}</button>)}
      </div>
      
      <button onClick={()=>{
        sfxTap();
        if(qStep<QUESTIONNAIRE.length-1){setQAnswers([...qAnswers,"skipped"]);setQStep(qStep+1);}
        else{saveQuizAnswers([...qAnswers,"skipped"]);setScr("home");}
      }} style={{marginTop:12,padding:"8px 16px",borderRadius:12,border:"none",background:"transparent",color:"#A4B0BE",fontSize:12,fontWeight:700,cursor:"pointer"}}>Skip →</button>
      
      {/* Progress dots */}
      <div style={{display:"flex",gap:6,justifyContent:"center",marginTop:14}}>
        {QUESTIONNAIRE.map((_,i)=><div key={i} style={{width:i===qStep?20:8,height:8,borderRadius:4,background:i<qStep?"#00D2A0":i===qStep?"#6C5CE7":"#E0E0E0",transition:"all 0.3s"}}/>)}
      </div>
    </div>
  </div>;

  if(scr==="home")return<div style={{fontFamily:"var(--font)",height:"100vh",overflow:"hidden",background:"var(--bg)",maxWidth:520,margin:"0 auto",position:"relative",display:"flex",flexDirection:"column"}}>
    <Confetti key={celebKey} active={confetti} type={celebType}/>
    {ptAnim&&<div style={{position:"fixed",top:20,right:20,zIndex:999,animation:"ptFly 1.5s ease-out forwards",fontFamily:"var(--font)",fontSize:28,fontWeight:800,color:"#22C55E"}}>{ptAnim}</div>}
    {/* ═══ TOP BAR ═══ */}
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",flexShrink:0,background:"linear-gradient(135deg,#6C5CE7 0%,#A29BFE 50%,#74B9FF 100%)",borderRadius:"0 0 20px 20px",boxShadow:"0 4px 24px rgba(108,92,231,0.2)"}}>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:44,height:44,borderRadius:"50%",background:"rgba(255,255,255,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,boxShadow:"inset 0 0 0 2px rgba(255,255,255,0.3)",backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)"}}>{AVATARS[prof?.gender||"boy"][prof?.avatar||0]}</div>
        <div>
          <div style={{color:"#fff",fontWeight:800,fontSize:18,lineHeight:1,textShadow:"0 1px 3px rgba(0,0,0,.1)"}}>{prof?.name||"Buddy"}</div>
          <div style={{color:"rgba(255,255,255,.85)",fontSize:13,fontWeight:600}}>Age {prof?.age||4}</div>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <div style={{padding:"8px 14px",borderRadius:20,background:"rgba(255,255,255,.15)",display:"flex",alignItems:"center",gap:4,backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)",border:"1px solid rgba(255,255,255,0.2)"}}>
          <span style={{fontSize:16}}>⭐</span>
          <span style={{color:"#FECA57",fontWeight:800,fontSize:16}}>{prof?.points||0}</span>
        </div>
      </div>
    </div>

    {/* ═══ GREETING ═══ */}
    <div style={{padding:"4px 12px 0",textAlign:"center"}}>
      <h2 style={{fontSize:18,fontWeight:800,color:"var(--dark)",margin:0}}>What shall we learn? 🎯</h2>
    </div>

    {/* ═══ TILES GRID ═══ */}
    <div id="home-tiles" style={{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",padding:"4px 16px 85px"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
        {[
          // Dynamic tile order based on questionnaire
          ...(()=>{
            const base=[
              {id:"learn",icon:"📚",title:"Learn",sub:"Numbers, ABC, Shapes & Colors",accent:"#6C5CE7",grad:"linear-gradient(135deg,#6C5CE7,#A29BFE)",priority:1},
              {id:"phonics",icon:"📖",title:"Phonics",sub:"500+ Words & Sounds",accent:"#00D2A0",grad:"linear-gradient(135deg,#00D2A0,#55EFC4)",priority:2},
              {id:"quizzone",icon:"🎯",title:"Quiz Zone",sub:"Test Your Skills!",accent:"#54A0FF",grad:"linear-gradient(135deg,#54A0FF,#74B9FF)",priority:3},
              {id:"arena",icon:"🏟️",title:"Arena",sub:"Multiplayer Quiz!",accent:"#E84393",grad:"linear-gradient(135deg,#E84393,#FD79A8)",priority:4},
              {id:"studyplan",icon:"📋",title:"Study Plan",sub:studyPlan.length>0?`${studyPlan.length} tasks assigned`:"No plan yet",accent:"#FF9F43",grad:"linear-gradient(135deg,#FF9F43,#FECA57)",priority:5},
              {id:"stories",icon:"📚",title:"Stories",sub:"Read & Learn",accent:"#FF9F43",grad:"linear-gradient(135deg,#FF9F43,#FECA57)",priority:6},
              {id:"rewards",icon:"🎁",title:"Rewards",sub:"Spend Points",accent:"#FF6B81",grad:"linear-gradient(135deg,#FF6B81,#FDA7DF)",priority:7},
              {id:"settings",icon:"⚙️",title:"Settings",sub:"Profile & Voice",accent:"#00CEC9",grad:"linear-gradient(135deg,#00CEC9,#81ECEC)",priority:8},
              {id:"parent",icon:"👨‍👩‍👧",title:"Parents",sub:"Control Center",accent:"#636E72",grad:"linear-gradient(135deg,#636E72,#B2BEC3)",priority:9},
            ];
            // Reorder based on questionnaire answers
            if(quizAnswers){
              const focus=quizAnswers[0];
              if(focus==="Numbers & Counting"){base.find(t=>t.id==="learn").priority=0;base.find(t=>t.id==="quizzone").priority=1;}
              else if(focus==="Letters & Reading"){base.find(t=>t.id==="phonics").priority=0;base.find(t=>t.id==="learn").priority=1;}
              else if(focus==="Fun & Games"){base.find(t=>t.id==="arena").priority=0;base.find(t=>t.id==="quizzone").priority=1;}
            }
            return base.sort((a,b)=>a.priority-b.priority);
          })(),
        ].map((m,i)=><button key={m.id} data-r="tile" data-tile={m.id} onClick={()=>{sfxTap();stop();movePandaTo("bottomRight");if(guideTourRef.current){guideTourRef.current=false;setGuideTour(false);const ov2=document.getElementById("tour-overlay");if(ov2)ov2.remove();document.querySelectorAll("[data-tile]").forEach(t=>{t.style.transform="";t.style.zIndex="";t.style.outline="";t.style.outlineOffset="";t.style.transition="";});}rec.warmUp();setTeacherMood("star");if(m.id==="parent"){setShowPinModal(true);}else{setScr(m.id);}}} style={{
          display:"flex",alignItems:"center",gap:14,
          padding:"12px 10px",borderRadius:16,cursor:"pointer",
          fontFamily:"var(--font)",background:m.grad,
          border:"none",
          boxShadow:`0 6px 20px ${m.accent}30`,
          animation:`gridPop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i*0.06}s both`,
          textAlign:"left"
        }}>
          <span style={{fontSize:26,flexShrink:0}}>{m.icon}</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{color:"#fff",fontWeight:800,fontSize:15}}>{m.title}</div>
            <div style={{color:"rgba(255,255,255,0.8)",fontSize:11,fontWeight:600,marginTop:2}}>{m.sub}</div>
          </div>
        </button>)}
      </div>
    </div>
    {/* ═══ PIN MODAL ═══ */}
    {showPinModal&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center"}} onClick={()=>{setShowPinModal(false);setPinInput("");}}>
      <div onClick={e=>e.stopPropagation()} style={{background:"#fff",borderRadius:28,padding:"28px 24px",maxWidth:320,width:"90%",textAlign:"center",boxShadow:"var(--shadow-float)"}}>
        <span style={{fontSize:48}}>🔒</span>
        <h3 style={{fontFamily:"var(--font)",fontSize:18,fontWeight:800,margin:"8px 0"}}>Parent Access</h3>
        <p style={{fontSize:12,color:"#A4B0BE",fontWeight:600}}>Enter PIN to continue</p>
        <div style={{display:"flex",gap:8,justifyContent:"center",margin:"16px 0"}}>
          {[1,2,3,4].map(i=><div key={i} style={{width:44,height:44,borderRadius:12,background:pinInput.length>=i?"linear-gradient(135deg,#6C5CE7,#A29BFE)":"#F0F4FF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,fontWeight:800,color:pinInput.length>=i?"#fff":"#DFE6E9",boxShadow:"var(--shadow-card)"}}>{pinInput.length>=i?"●":"○"}</div>)}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,maxWidth:240,margin:"0 auto"}}>
          {[1,2,3,4,5,6,7,8,9,0,"⌫"].map((n,i)=>n===""?<div key={i}/>:<button key={i} onClick={()=>{
            sfxTap();
            if(n==="⌫"){setPinInput(p=>p.slice(0,-1));}
            else{const np=pinInput+n;setPinInput(np);
              if(np.length===4){if(np===parentPin){setShowPinModal(false);setPinInput("");setScr("parent");setParentMode(true);}else{setPinInput("");}}
            }
          }} style={{padding:"14px",borderRadius:14,border:"none",background:n==="⌫"?"#FEE2E2":"#F0F4FF",fontSize:n==="⌫"?18:22,fontWeight:800,cursor:"pointer",fontFamily:"var(--font)",color:n==="⌫"?"#FF6B81":"var(--dark)",boxShadow:"var(--shadow-card)"}}>{n}</button>)}
        </div>
        <p style={{fontSize:10,color:"#A4B0BE",marginTop:10}}>Default PIN: 1234</p>
      </div>
    </div>}
    {BottomNav}{TeacherBubble}<style>{CSS}</style>
  </div>;




  // ═══ MULTIPLAYER ARENA (Firebase Universal) ═══
  if(scr==="arena")return<div style={{fontFamily:"var(--font)",height:"100vh",overflow:"hidden",background:"linear-gradient(180deg,#1B1464 0%,#3B1F8E 40%,#6C5CE7 100%)",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column",color:"#fff"}}>
    {/* Header */}
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",flexShrink:0}}>
      <button onClick={()=>{
        sfxTap();
        if(fbListenerRef.current){fbListenerRef.current();fbListenerRef.current=null;}
        if(arenaRoom){
          if(arenaRoom.hostId===arenaId){
            // Host exits → delete room, kick everyone
            fbWrite("rooms/"+arenaRoom.code,null);
          } else {
            // Non-host exits → just remove self
            fbUpdate("rooms/"+arenaRoom.code,{["players/"+arenaId]:null,["scores/"+arenaId]:null});
          }
        }
        onRoomDeleted();goHome();
      }} style={{padding:"10px 18px",borderRadius:16,border:"none",background:"rgba(255,255,255,0.15)",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"var(--font)",backdropFilter:"blur(4px)",WebkitBackdropFilter:"blur(4px)"}}>← Exit</button>
      <span style={{fontSize:20,fontWeight:800}}>🏟️ Arena</span>
      {arenaRoom&&<span style={{padding:"6px 14px",borderRadius:14,background:"rgba(255,255,255,0.15)",fontSize:13,fontWeight:700,letterSpacing:2,fontFamily:"monospace"}}>{arenaRoom.code}</span>}
    </div>

    <div style={{flex:1,overflowY:"auto",overflowX:"hidden",minHeight:0,WebkitOverflowScrolling:"touch"}}>

    
    {/* ═══ NO ROOM — Create or Join ═══ */}
    {!arenaRoom&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px 24px",gap:16}}>
      <div style={{fontSize:72,animation:"floatY 2s ease-in-out infinite"}}>🏟️</div>
      <h2 style={{fontSize:24,fontWeight:800,textAlign:"center"}}>Multiplayer Quiz Arena</h2>
      <p style={{fontSize:12,color:"rgba(255,255,255,0.6)",textAlign:"center",maxWidth:280}}>Play from ANY device! Parent & child join from different phones using the same room code.</p>
      <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",borderRadius:12,background:fbReady?"rgba(0,210,160,0.2)":"rgba(255,107,129,0.2)"}}>
        <span style={{fontSize:10,fontWeight:800,color:fbReady?"#55EFC4":"#FF6B81"}}>{fbReady?"🟢 Online":"🔴 Connecting..."}</span>
      </div>

      <input value={arenaName} onChange={e=>setArenaName(e.target.value)} placeholder={prof?.name||"Your name"} style={{width:"100%",maxWidth:300,padding:"14px 18px",borderRadius:18,border:"2px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.1)",color:"#fff",fontSize:16,fontWeight:700,fontFamily:"var(--font)",textAlign:"center",outline:"none"}}/>

      <div style={{display:"flex",gap:8,width:"100%",maxWidth:300}}>
        <div style={{flex:1}}>
          <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.5)",marginBottom:4}}>DIFFICULTY</div>
          <div style={{display:"flex",gap:4}}>
            {["easy","medium","hard"].map(d=><button key={d} onClick={()=>{sfxTap();setArenaDiff(d);}} style={{flex:1,padding:"6px 2px",borderRadius:10,border:"none",background:arenaDiff===d?"#FECA57":"rgba(255,255,255,0.1)",color:arenaDiff===d?"#1B1464":"rgba(255,255,255,0.6)",fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)",textTransform:"capitalize"}}>{d}</button>)}
          </div>
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.5)",marginBottom:4}}>ROUNDS</div>
          <div style={{display:"flex",gap:4}}>
            {[5,10,20].map(r=><button key={r} onClick={()=>{sfxTap();setArenaRounds(r);}} style={{flex:1,padding:"6px 2px",borderRadius:10,border:"none",background:arenaRounds===r?"#FECA57":"rgba(255,255,255,0.1)",color:arenaRounds===r?"#1B1464":"rgba(255,255,255,0.6)",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)"}}>{r}</button>)}
          </div>
        </div>
      </div>

      <button onClick={()=>{sfxTap();arenaCreateRoom();}} disabled={!fbReady} style={{width:"100%",maxWidth:300,padding:"18px",borderRadius:22,border:"none",background:fbReady?"linear-gradient(135deg,#FECA57,#FF9F43)":"rgba(255,255,255,0.1)",color:fbReady?"#1B1464":"rgba(255,255,255,0.3)",fontSize:18,fontWeight:800,cursor:fbReady?"pointer":"default",fontFamily:"var(--font)",boxShadow:fbReady?"0 6px 24px rgba(254,202,87,0.3)":"none"}}>Create Room 🎯</button>

      <div style={{display:"flex",alignItems:"center",gap:12,width:"100%",maxWidth:300}}>
        <div style={{flex:1,height:1,background:"rgba(255,255,255,0.2)"}}/>
        <span style={{fontSize:12,color:"rgba(255,255,255,0.5)",fontWeight:700}}>OR JOIN</span>
        <div style={{flex:1,height:1,background:"rgba(255,255,255,0.2)"}}/>
      </div>

      <div style={{display:"flex",gap:8,width:"100%",maxWidth:300}}>
        <input value={arenaJoinCode} onChange={e=>setArenaJoinCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g).slice(0,6))} placeholder="ROOM CODE" maxLength={6} style={{flex:1,padding:"14px 18px",borderRadius:18,border:"2px solid rgba(255,255,255,0.2)",background:"rgba(255,255,255,0.1)",color:"#fff",fontSize:18,fontWeight:800,fontFamily:"monospace",textAlign:"center",letterSpacing:4,outline:"none"}}/>
        <button onClick={()=>{sfxTap();arenaJoinRoom(arenaJoinCode);}} disabled={arenaJoinCode.length!==6||!fbReady} style={{padding:"14px 24px",borderRadius:18,border:"none",background:arenaJoinCode.length===6&&fbReady?"linear-gradient(135deg,#00D2A0,#55EFC4)":"rgba(255,255,255,0.1)",color:arenaJoinCode.length===6&&fbReady?"#1B1464":"rgba(255,255,255,0.3)",fontSize:16,fontWeight:800,cursor:arenaJoinCode.length===6&&fbReady?"pointer":"default",fontFamily:"var(--font)"}}>Join</button>
      </div>
      {fbError&&<p style={{color:"#FF6B81",fontSize:12,fontWeight:700,textAlign:"center"}}>{fbError}</p>}
      <p style={{fontSize:10,color:"rgba(255,255,255,0.35)",textAlign:"center"}}>Works on any phone, tablet, or computer — just enter the same room code!</p>
    </div>}

    {/* ═══ LOBBY — Waiting for players ═══ */}
    {arenaRoom&&arenaPhase==="lobby"&&<div style={{display:"flex",flexDirection:"column",padding:"16px 20px",gap:14}}>
      <div style={{textAlign:"center",padding:20,borderRadius:24,background:"rgba(255,255,255,0.08)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.1)"}}>
        <div style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:2}}>Room Code — Share This!</div>
        <div style={{fontSize:42,fontWeight:800,letterSpacing:8,fontFamily:"monospace",color:"#FECA57",marginTop:4}}>{arenaRoom.code}</div>
        <p style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginTop:6}}>Open littlegenius on another device → tap Arena → enter this code</p>
      </div>

      <div style={{fontSize:13,fontWeight:800,color:"rgba(255,255,255,0.7)"}}>Players ({arenaRoom.players?.length||0}/4)</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {(arenaRoom.players||[]).map((p,i)=><div key={p.id} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:20,background:`linear-gradient(135deg,${ARENA_COLORS[i%4]}CC,${ARENA_COLORS[i%4]}88)`,boxShadow:`0 4px 14px ${ARENA_COLORS[i%4]}30`}}>
          <span style={{fontSize:32}}>{ARENA_AVATARS[i%4]}</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:800,fontSize:16}}>{p.name}{p.id===arenaId?" (You)":""}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,0.7)"}}>{p.isHost?"👑 Host":"Player "+(i+1)}</div>
          </div>
          <div style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.5)"}}>{i===0?"🎯 First":"⏳ Turn "+(i+1)}</div>
        </div>)}
        {Array.from({length:4-(arenaRoom.players?.length||0)}).map((_,i)=><div key={"e"+i} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:20,background:"rgba(255,255,255,0.05)",border:"2px dashed rgba(255,255,255,0.15)"}}>
          <span style={{fontSize:32,opacity:0.3}}>👤</span>
          <span style={{fontSize:14,color:"rgba(255,255,255,0.3)",fontWeight:600}}>Waiting for player...</span>
        </div>)}
      </div>

      {arenaRoom.hostId===arenaId&&(arenaRoom.players?.length||0)>=1&&<button onClick={()=>{sfxTap();arenaStartRound();}} style={{padding:"18px",borderRadius:22,border:"none",background:"linear-gradient(135deg,#FECA57,#FF9F43)",color:"#1B1464",fontSize:18,fontWeight:800,cursor:"pointer",fontFamily:"var(--font)",boxShadow:"0 6px 24px rgba(254,202,87,0.3)",marginTop:8}}>Start Game! 🚀</button>}
      {arenaRoom.hostId===arenaId&&<button onClick={()=>{sfxTap();if(window.confirm("Close room? All players will be disconnected.")){arenaResetGame();}}} style={{padding:"12px",borderRadius:16,border:"none",background:"rgba(255,107,129,0.15)",color:"#FF6B81",fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)",marginTop:6,width:"100%"}}>Close Room 🚪</button>}
      {arenaRoom.hostId!==arenaId&&<div style={{textAlign:"center",padding:16,fontSize:14,color:"rgba(255,255,255,0.5)"}}>Waiting for host to start...</div>}
    </div>}

    {/* Ollie message bubble */}
    {arenaMsg&&(arenaPhase==="playing"||arenaPhase==="result")&&<div style={{padding:"8px 16px",margin:"0 18px",borderRadius:16,background:"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
      <span style={{fontSize:28}}>🦉</span>
      <span style={{fontSize:13,fontWeight:700,color:"#fff",flex:1}}>{arenaMsg}</span>
    </div>}

    {/* ═══ PLAYING — Question + Timer + Options ═══ */}
    {arenaRoom&&arenaPhase==="playing"&&arenaRoom.question&&<div style={{display:"flex",flexDirection:"column",padding:"12px 18px",gap:10,position:"relative"}}>
      {/* Paused overlay */}
      {arenaPaused&&<div style={{position:"absolute",inset:0,background:"rgba(27,20,100,0.92)",zIndex:20,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:16,gap:12}}>
        <span style={{fontSize:64}}>⏸️</span>
        <h2 style={{fontSize:24,fontWeight:800,color:"#fff"}}>Game Paused</h2>
        <p style={{fontSize:13,color:"rgba(255,255,255,0.6)"}}>
          {arenaRoom.hostId===arenaId?"Tap Resume to continue":"Waiting for host to resume..."}
        </p>
        {arenaRoom.hostId===arenaId&&<div style={{display:"flex",gap:10,marginTop:8}}>
          <button onClick={arenaTogglePause} style={{padding:"14px 28px",borderRadius:18,border:"none",background:"linear-gradient(135deg,#FECA57,#FF9F43)",color:"#1B1464",fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:"var(--font)"}}>▶️ Resume</button>
          <button onClick={()=>{if(window.confirm("Reset game? All players will be disconnected.")){arenaResetGame();}}} style={{padding:"14px 28px",borderRadius:18,border:"none",background:"linear-gradient(135deg,#FF6B81,#EE5A6F)",color:"#fff",fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:"var(--font)"}}>🔄 Reset</button>
        </div>}
      </div>}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <span style={{fontSize:12,fontWeight:700,color:"rgba(255,255,255,0.6)"}}>Round {arenaRoom.round}/{arenaRoom.maxRounds}</span>
        {/* Host controls: Pause + Reset */}
        {arenaRoom.hostId===arenaId&&!arenaPaused&&<div style={{display:"flex",gap:6}}>
          <button onClick={arenaTogglePause} style={{padding:"6px 12px",borderRadius:12,border:"none",background:"rgba(255,255,255,0.15)",color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)"}}>⏸️</button>
          <button onClick={()=>{if(window.confirm("Reset game? Everyone will be disconnected.")){arenaResetGame();}}} style={{padding:"6px 12px",borderRadius:12,border:"none",background:"rgba(255,107,129,0.3)",color:"#FF6B81",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)"}}>🔄</button>
        </div>}
        <div style={{display:"flex",gap:6}}>
          {(arenaRoom.players||[]).map((p,i)=><div key={p.id} style={{display:"flex",alignItems:"center",gap:4,padding:"4px 10px",borderRadius:12,background:arenaRoom.turnPlayerId===p.id?"#FECA57":"rgba(255,255,255,0.1)",color:arenaRoom.turnPlayerId===p.id?"#1B1464":"#fff"}}>
            <span style={{fontSize:14}}>{ARENA_AVATARS[i%4]}</span>
            <span style={{fontSize:12,fontWeight:800}}>{arenaRoom.scores?.[p.id]||0}</span>
          </div>)}
        </div>
      </div>

      <div style={{textAlign:"center",flexShrink:0}}>
        <div style={{position:"relative",display:"inline-block"}}>
          <svg width={80} height={80} style={{transform:"rotate(-90deg)"}}>
            <circle cx={40} cy={40} r={34} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={8}/>
            <circle cx={40} cy={40} r={34} fill="none" stroke={arenaSec<=2?"#FF6B81":"#FECA57"} strokeWidth={8} strokeDasharray={2*Math.PI*34} strokeDashoffset={2*Math.PI*34*(1-arenaSec/6)} strokeLinecap="round" style={{transition:"stroke-dashoffset 0.3s linear"}}/>
          </svg>
          <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontWeight:800,color:arenaSec<=2?"#FF6B81":"#FECA57"}}>{arenaSec}</div>
        </div>
      </div>

      <div style={{textAlign:"center",padding:"8px 16px",borderRadius:16,background:arenaRoom.turnPlayerId===arenaId?"linear-gradient(135deg,#FECA57,#FF9F43)":"rgba(255,255,255,0.08)",flexShrink:0}}>
        <span style={{fontSize:14,fontWeight:800,color:arenaRoom.turnPlayerId===arenaId?"#1B1464":"rgba(255,255,255,0.7)"}}>
          {arenaRoom.turnPlayerId===arenaId?"🎯 YOUR TURN — Answer now!":
           `⏳ ${(arenaRoom.players||[]).find(p=>p.id===arenaRoom.turnPlayerId)?.name||"Player"}'s turn`}
        </span>
      </div>

      <div style={{textAlign:"center",padding:"20px 16px",borderRadius:24,background:"rgba(255,255,255,0.08)",flexShrink:0}}>
        <span style={{fontSize:36}}>{arenaRoom.question.emoji}</span>
        <div style={{fontSize:22,fontWeight:800,marginTop:8}}>{arenaRoom.question.q}</div>
      </div>

      {(()=>{
        const isMyTurn=arenaRoom.turnPlayerId===arenaId;
        const canAnswer=isMyTurn&&!arenaAnswered&&arenaSec>0;
        return<div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
          {arenaRoom.question.options.map((opt,i)=>{
            const isCorrect=arenaFb&&opt===arenaRoom.question.answer;
            const isWrong=arenaFb&&arenaFb.answer===opt&&!arenaFb.correct;
            return<button key={String(opt)+i} disabled={!canAnswer} onClick={()=>canAnswer&&arenaAnswer(opt)} style={{
              padding:"22px 12px",borderRadius:22,border:"none",cursor:canAnswer?"pointer":"default",
              background:isCorrect?"linear-gradient(135deg,#00D2A0,#55EFC4)":isWrong?"linear-gradient(135deg,#FF6B81,#EE5A6F)":canAnswer?`linear-gradient(135deg,${ARENA_COLORS[i%4]},${ARENA_COLORS[i%4]}BB)`:"rgba(255,255,255,0.06)",
              color:canAnswer||isCorrect||isWrong?"#fff":"rgba(255,255,255,0.25)",
              fontSize:typeof opt==="number"?28:18,fontWeight:800,fontFamily:"var(--font)",
              boxShadow:canAnswer?`0 4px 14px ${ARENA_COLORS[i%4]}30`:"none",
              opacity:canAnswer?1:isCorrect||isWrong?1:0.4,
              transform:isCorrect?"scale(1.08)":isWrong?"scale(0.94)":"scale(1)",textTransform:"capitalize"
            }}>{opt}</button>;
          })}
        </div>;
      })()}
    </div>}

    {/* ═══ ROUND RESULT ═══ */}
    {arenaRoom&&arenaPhase==="result"&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px 24px",gap:14}}>
      <div style={{fontSize:56,animation:"floatY 1.5s ease-in-out infinite"}}>{arenaRoom.answerBy?"🎉":"😢"}</div>
      <h2 style={{fontSize:22,fontWeight:800}}>Round {arenaRoom.round} Complete!</h2>
      <div style={{fontSize:15,color:"rgba(255,255,255,0.7)"}}>Answer: <strong style={{color:"#FECA57"}}>{String(arenaRoom.question?.answer)}</strong></div>
      {arenaRoom.answerBy&&<div style={{fontSize:13,color:"#55EFC4"}}>✅ {(arenaRoom.players||[]).find(p=>p.id===arenaRoom.answerBy)?.name||"Someone"} got it right!</div>}
      <div style={{width:"100%",maxWidth:320,display:"flex",flexDirection:"column",gap:8,marginTop:4}}>
        {(arenaRoom.players||[]).sort((a,b)=>(arenaRoom.scores?.[b.id]||0)-(arenaRoom.scores?.[a.id]||0)).map((p,i)=><div key={p.id} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 16px",borderRadius:18,background:i===0?"linear-gradient(135deg,#FECA57,#FF9F43)":"rgba(255,255,255,0.08)"}}>
          <span style={{fontSize:13,fontWeight:800,color:i===0?"#1B1464":"rgba(255,255,255,0.5)"}}>{["🥇","🥈","🥉","🏅"][i]}</span>
          <span style={{fontSize:24}}>{ARENA_AVATARS[(arenaRoom.players||[]).indexOf(p)%4]}</span>
          <span style={{flex:1,fontWeight:700,fontSize:14,color:i===0?"#1B1464":"#fff"}}>{p.name}</span>
          <span style={{fontSize:18,fontWeight:800,color:i===0?"#1B1464":"#FECA57"}}>{arenaRoom.scores?.[p.id]||0}</span>
        </div>)}
      </div>
      <p style={{fontSize:11,color:"rgba(255,255,255,0.35)"}}>Next question coming...</p>
    </div>}

    {/* ═══ GAME OVER ═══ */}
    {arenaRoom&&arenaPhase==="gameover"&&<div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px 24px",gap:12}}>
      <div style={{fontSize:64,animation:"floatY 1.5s ease-in-out infinite"}}>🏆</div>
      <h2 style={{fontSize:26,fontWeight:800}}>Game Over!</h2>
      <div style={{width:"100%",maxWidth:320,display:"flex",flexDirection:"column",gap:10}}>
        {(arenaRoom.players||[]).sort((a,b)=>(arenaRoom.scores?.[b.id]||0)-(arenaRoom.scores?.[a.id]||0)).map((p,i)=><div key={p.id} style={{display:"flex",alignItems:"center",gap:12,padding:"16px 18px",borderRadius:22,background:i===0?"linear-gradient(135deg,#FECA57,#FF9F43)":"rgba(255,255,255,0.08)",transform:i===0?"scale(1.05)":"scale(1)",boxShadow:i===0?"0 6px 24px rgba(254,202,87,0.3)":"none"}}>
          <span style={{fontSize:24}}>{["🥇","🥈","🥉","🏅"][i]}</span>
          <span style={{fontSize:32}}>{ARENA_AVATARS[(arenaRoom.players||[]).indexOf(p)%4]}</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:800,fontSize:16,color:i===0?"#1B1464":"#fff"}}>{p.name}{p.id===arenaId?" (You)":""}</div>
            <div style={{fontSize:11,color:i===0?"rgba(27,20,100,0.6)":"rgba(255,255,255,0.5)"}}>{arenaRoom.scores?.[p.id]||0}/{arenaRoom.maxRounds} correct</div>
          </div>
          <span style={{fontSize:28,fontWeight:800,color:i===0?"#1B1464":"#FECA57"}}>{arenaRoom.scores?.[p.id]||0}</span>
        </div>)}
      </div>
      <div style={{display:"flex",gap:10,marginTop:10}}>
        <button onClick={()=>{sfxTap();lastRoundRef.current=0;if(arenaRoom.hostId===arenaId){fbUpdate("rooms/"+arenaRoom.code,{round:0,state:"waiting",question:null,scores:Object.fromEntries((arenaRoom.players||[]).map(p=>[p.id,0]))});}setArenaPhase("lobby");}} style={{padding:"14px 24px",borderRadius:18,border:"none",background:"linear-gradient(135deg,#FECA57,#FF9F43)",color:"#1B1464",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"var(--font)"}}>Play Again 🔄</button>
        <button onClick={()=>{
          sfxTap();
          if(fbListenerRef.current){fbListenerRef.current();fbListenerRef.current=null;}
          if(arenaRoom){
            if(arenaRoom.hostId===arenaId){fbWrite("rooms/"+arenaRoom.code,null);}
            else{fbUpdate("rooms/"+arenaRoom.code,{["players/"+arenaId]:null,["scores/"+arenaId]:null});}
          }
          onRoomDeleted();goHome();
        }} style={{padding:"14px 24px",borderRadius:18,border:"none",background:"rgba(255,255,255,0.15)",color:"#fff",fontSize:15,fontWeight:800,cursor:"pointer",fontFamily:"var(--font)"}}>Exit 👋</button>
      </div>
    </div>}

    </div>
    <style>{CSS}</style>
  </div>;

  // ═══ PARENT CONTROL CENTER ═══
  if(scr==="parent")return<div style={{fontFamily:"var(--font)",height:"100vh",overflow:"hidden",background:"var(--bg)",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column"}}>
    <SubHead title="Parent Center 👨‍👩‍👧" onBack={()=>{setParentMode(false);goHome();}} points={prof?.points||0}/>
    {/* Tabs */}
    <div style={{display:"flex",gap:6,padding:"2px 8px",flexShrink:0,background:"#fff"}}>
      {[{id:"plan",label:"📋 Study Plan"},{id:"rewards",label:"🎁 Rewards"},{id:"dashboard",label:"📊 Dashboard"}].map(t=>
        <button key={t.id} onClick={()=>{sfxTap();setParentTab(t.id);}} style={{
          flex:1,padding:"9px 4px",borderRadius:12,border:"none",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"var(--font)",
          background:parentTab===t.id?"linear-gradient(135deg,#6C5CE7,#A29BFE)":"#F0F4FF",
          color:parentTab===t.id?"#fff":"#A4B0BE",boxShadow:parentTab===t.id?"var(--shadow-btn)":"none"
        }}>{t.label}</button>
      )}
    </div>
    <div style={{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",padding:"12px 16px 40px",minHeight:0}}>

    {/* ═══ STUDY PLAN TAB ═══ */}
    {parentTab==="plan"&&<div>
      <h3 style={{fontFamily:"var(--font)",fontSize:16,fontWeight:800,marginBottom:10}}>Assign Topics to Study Plan</h3>
      <p style={{fontSize:11,color:"#A4B0BE",fontWeight:600,marginBottom:12}}>Select what your child should practice. They'll see these in "Study Plan" on their home screen.</p>
      {STUDY_TOPICS.map(topic=><div key={topic.id} style={{marginBottom:12}}>
        <div style={{fontWeight:800,fontSize:14,color:"var(--dark)",marginBottom:6}}>{topic.emoji} {topic.name}</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {topic.sub.map(sub=>{
            const isAdded=studyPlan.some(s=>s.topicId===topic.id&&s.subId===sub.id);
            return<button key={sub.id} onClick={()=>{sfxTap();
              if(isAdded){savePlan(studyPlan.filter(s=>!(s.topicId===topic.id&&s.subId===sub.id)));}
              else{savePlan([...studyPlan,{topicId:topic.id,subId:sub.id,completed:false,addedAt:Date.now()}]);}
            }} style={{
              padding:"12px 18px",borderRadius:16,border:"none",cursor:"pointer",fontFamily:"var(--font)",
              fontSize:13,fontWeight:700,
              background:isAdded?"linear-gradient(135deg,#00D2A0,#55EFC4)":"#F0F4FF",
              color:isAdded?"#fff":"#636E72",
              boxShadow:isAdded?"0 3px 10px rgba(0,210,160,0.2)":"var(--shadow-card)"}}>{isAdded?"✅ ":""}{sub.name}</button>;
          })}
        </div>
      </div>)}
      {studyPlan.length>0&&<div style={{marginTop:16,padding:14,borderRadius:18,background:"linear-gradient(135deg,#6C5CE7,#A29BFE)",boxShadow:"var(--shadow-btn)"}}>
        <div style={{color:"#fff",fontWeight:800,fontSize:14}}>{studyPlan.length} task{studyPlan.length!==1?"s":""} assigned</div>
        <button onClick={()=>{sfxTap();savePlan([]);}} style={{marginTop:8,padding:"8px 16px",borderRadius:12,border:"none",background:"rgba(255,255,255,0.2)",color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer"}}>Clear All</button>
      </div>}
    </div>}

    {/* ═══ REWARDS TAB ═══ */}
    {parentTab==="rewards"&&<div>
      <h3 style={{fontFamily:"var(--font)",fontSize:16,fontWeight:800,marginBottom:6}}>Custom Rewards</h3>
      <p style={{fontSize:11,color:"#A4B0BE",fontWeight:600,marginBottom:4}}>1 point per correct answer from Study Plan. Set point goals for real rewards!</p>
      <div style={{padding:12,borderRadius:16,background:"linear-gradient(135deg,#FF9F43,#FECA57)",marginBottom:12,boxShadow:"0 4px 14px rgba(255,159,67,0.2)"}}>
        <div style={{color:"#fff",fontWeight:800,fontSize:13}}>⏱️ Engagement Time Bonus</div>
        <div style={{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"}}>
          {ENGAGE_TIERS.map(t=><span key={t.mins} style={{padding:"4px 10px",borderRadius:10,background:"rgba(255,255,255,0.25)",color:"#fff",fontSize:10,fontWeight:700}}>{t.label}=+{t.pts}pts</span>)}
        </div>
      </div>
      {/* Active rewards */}
      {customRewards.length>0&&<div style={{marginBottom:12}}>
        <div style={{fontSize:13,fontWeight:800,color:"var(--dark)",marginBottom:6}}>Active Rewards:</div>
        {customRewards.map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#fff",borderRadius:16,marginBottom:6,boxShadow:"var(--shadow-card)"}}>
          <span style={{fontSize:24}}>{r.emoji}</span>
          <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13}}>{r.name}</div><div style={{fontSize:10,color:"#A4B0BE"}}>{r.pts} points needed</div></div>
          <button onClick={()=>{sfxTap();saveRewards(customRewards.filter((_,j)=>j!==i));}} style={{padding:"6px 10px",borderRadius:10,border:"none",background:"#FEE2E2",color:"#FF6B81",fontSize:11,fontWeight:700,cursor:"pointer"}}>✕</button>
        </div>)}
      </div>}
      {/* Catalog */}
      {REWARD_CATALOG.map(cat=><div key={cat.cat} style={{marginBottom:14}}>
        <div style={{fontWeight:800,fontSize:14,color:"var(--dark)",marginBottom:8}}>{cat.cat}</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
          {cat.items.map(item=>{
            const isAdded=customRewards.some(r=>r.id===item.id);
            return<button key={item.id} onClick={()=>{sfxTap();
              if(!isAdded){
                const pts=prompt(`Points needed for ${item.name}?`,item.defPts);
                if(pts){saveRewards([...customRewards,{...item,pts:parseInt(pts)||item.defPts}]);}
              }
            }} style={{
              display:"flex",flexDirection:"column",alignItems:"center",padding:"10px 4px",borderRadius:16,border:"none",cursor:"pointer",
              background:isAdded?"linear-gradient(135deg,#00D2A0,#55EFC4)":"#F0F4FF",
              color:isAdded?"#fff":"var(--dark)",fontSize:10,fontWeight:700,fontFamily:"var(--font)",
              boxShadow:isAdded?"0 3px 10px rgba(0,210,160,0.15)":"var(--shadow-card)",
              opacity:isAdded?0.6:1
            }}>
              <span style={{fontSize:24}}>{item.emoji}</span>
              <span style={{marginTop:2}}>{item.name}</span>
              <span style={{fontSize:9,color:isAdded?"rgba(255,255,255,0.7)":"#A4B0BE"}}>{item.defPts}pts</span>
            </button>;
          })}
        </div>
      </div>)}
      {/* PIN change */}
      <div style={{marginTop:16,padding:14,borderRadius:16,background:"#F0F4FF"}}>
        <div style={{fontWeight:800,fontSize:13,marginBottom:6}}>🔒 Change PIN</div>
        <div style={{display:"flex",gap:8}}>
          <input value={pinInput} onChange={e=>setPinInput(e.target.value.replace(/\D/g).slice(0,4))} placeholder="New 4-digit PIN" style={{flex:1,padding:"10px 14px",borderRadius:12,border:"2px solid #DFE6E9",fontSize:14,fontWeight:700,fontFamily:"var(--font)"}}/>
          <button onClick={()=>{if(pinInput.length===4){savePin(pinInput);setPinInput("");alert("PIN updated!");}}} style={{padding:"10px 16px",borderRadius:12,border:"none",background:"linear-gradient(135deg,#6C5CE7,#A29BFE)",color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer"}}>Save</button>
        </div>
      </div>
    </div>}

    {/* ═══ DASHBOARD TAB ═══ */}
    {parentTab==="dashboard"&&<div>
      <h3 style={{fontFamily:"var(--font)",fontSize:16,fontWeight:800,marginBottom:10}}>📊 {prof?.name||"Child"}'s Performance</h3>
      {/* Time Period Selector */}
      {(()=>{
        const now=new Date();
        const today=now.toDateString();
        const weekAgo=new Date(now-7*86400000);
        const monthAgo=new Date(now-30*86400000);
        const todayLogs=perfLog.filter(l=>new Date(l.date).toDateString()===today);
        const weekLogs=perfLog.filter(l=>new Date(l.date)>=weekAgo);
        const monthLogs=perfLog.filter(l=>new Date(l.date)>=monthAgo);
        const calcStats=(logs)=>{
          if(logs.length===0)return{total:0,correct:0,pct:0,cats:{}};
          let total=0,correct=0;const cats={};
          logs.forEach(l=>{total+=l.total;correct+=l.correct;if(!cats[l.cat])cats[l.cat]={correct:0,total:0};cats[l.cat].correct+=l.correct;cats[l.cat].total+=l.total;});
          return{total,correct,pct:total>0?Math.round(correct/total*100):0,cats};
        };
        const dS=calcStats(todayLogs),wS=calcStats(weekLogs),mS=calcStats(monthLogs);
        return<div>
          {/* Summary Cards */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:14}}>
            {[{label:"Today",s:dS,color:"#6C5CE7"},{label:"This Week",s:wS,color:"#54A0FF"},{label:"This Month",s:mS,color:"#00D2A0"}].map(p=>
              <div key={p.label} style={{padding:14,borderRadius:18,background:`linear-gradient(135deg,${p.color},${p.color}AA)`,textAlign:"center",boxShadow:`0 4px 14px ${p.color}25`}}>
                <div style={{color:"rgba(255,255,255,0.8)",fontSize:10,fontWeight:700}}>{p.label}</div>
                <div style={{color:"#fff",fontSize:28,fontWeight:800,margin:"4px 0"}}>{p.s.pct}%</div>
                <div style={{color:"rgba(255,255,255,0.7)",fontSize:10,fontWeight:600}}>{p.s.correct}/{p.s.total} correct</div>
              </div>
            )}
          </div>
          {/* Strengths & Weaknesses */}
          <div style={{fontWeight:800,fontSize:14,marginBottom:8}}>💪 Strengths & 📉 Weaknesses</div>
          {Object.entries(mS.cats).length===0?<p style={{color:"#A4B0BE",fontSize:12}}>No data yet — complete some activities!</p>:
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {Object.entries(mS.cats).sort((a,b)=>(b[1].total>0?b[1].correct/b[1].total:0)-(a[1].total>0?a[1].correct/a[1].total:0)).map(([cat,data])=>{
              const pct=data.total>0?Math.round(data.correct/data.total*100):0;
              const isStrong=pct>=70;
              return<div key={cat} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:16,background:"#fff",boxShadow:"var(--shadow-card)"}}>
                <span style={{fontSize:10,fontWeight:800,color:isStrong?"#00D2A0":"#FF6B81"}}>{isStrong?"💪":"📉"}</span>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:12,textTransform:"capitalize"}}>{cat}</div>
                  <div style={{height:6,borderRadius:3,background:"#F0F4FF",marginTop:4,overflow:"hidden"}}>
                    <div style={{height:"100%",borderRadius:3,background:pct>=70?"linear-gradient(90deg,#00D2A0,#55EFC4)":pct>=40?"linear-gradient(90deg,#FF9F43,#FECA57)":"linear-gradient(90deg,#FF6B81,#FDA7DF)",width:`${pct}%`}}/>
                  </div>
                </div>
                <span style={{fontSize:14,fontWeight:800,color:isStrong?"#00D2A0":"#FF6B81"}}>{pct}%</span>
              </div>;
            })}
          </div>}
          {/* Engagement time today */}
          <div style={{marginTop:14,padding:14,borderRadius:18,background:"linear-gradient(135deg,#6C5CE7,#A29BFE)",boxShadow:"var(--shadow-btn)"}}>
            <div style={{color:"#fff",fontWeight:800,fontSize:14}}>⏱️ Active Time Today: {engageMins} min</div>
            <div style={{display:"flex",gap:4,marginTop:6}}>
              {ENGAGE_TIERS.map(t=><div key={t.mins} style={{flex:1,padding:"4px",borderRadius:8,background:engageMins>=t.mins?"#FECA57":"rgba(255,255,255,0.15)",textAlign:"center"}}>
                <div style={{fontSize:9,fontWeight:700,color:engageMins>=t.mins?"#2D3436":"rgba(255,255,255,0.5)"}}>{t.label}</div>
              </div>)}
            </div>
          </div>
          {/* Points summary */}
          <div style={{marginTop:14,display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8}}>
            <div style={{padding:14,borderRadius:16,background:"#fff",boxShadow:"var(--shadow-card)",textAlign:"center"}}>
              <div style={{fontSize:9,fontWeight:700,color:"#A4B0BE"}}>TOTAL POINTS</div>
              <div style={{fontSize:28,fontWeight:800,color:"#FF9F43"}}>{prof?.totalEarned||0}</div>
            </div>
            <div style={{padding:14,borderRadius:16,background:"#fff",boxShadow:"var(--shadow-card)",textAlign:"center"}}>
              <div style={{fontSize:9,fontWeight:700,color:"#A4B0BE"}}>AVAILABLE</div>
              <div style={{fontSize:28,fontWeight:800,color:"#00D2A0"}}>{prof?.points||0}</div>
            </div>
          </div>
          {/* Custom rewards progress */}
          {customRewards.length>0&&<div style={{marginTop:14}}>
            <div style={{fontWeight:800,fontSize:14,marginBottom:8}}>🎁 Reward Progress</div>
            {customRewards.map((r,i)=>{const pct=Math.min(100,Math.round(((prof?.points||0)/r.pts)*100));return<div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#fff",borderRadius:16,marginBottom:6,boxShadow:"var(--shadow-card)"}}>
              <span style={{fontSize:24}}>{r.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:12}}>{r.name}</div>
                <div style={{height:8,borderRadius:4,background:"#F0F4FF",marginTop:4,overflow:"hidden"}}>
                  <div style={{height:"100%",borderRadius:4,background:pct>=100?"linear-gradient(90deg,#00D2A0,#55EFC4)":"linear-gradient(90deg,#FF9F43,#FECA57)",width:`${pct}%`}}/>
                </div>
              </div>
              <span style={{fontSize:11,fontWeight:800,color:pct>=100?"#00D2A0":"#A4B0BE"}}>{prof?.points||0}/{r.pts}</span>
            </div>;})}
          </div>}
        </div>;
      })()}
    </div>}
    </div>
    {TeacherBubble}<style>{CSS}</style>
  </div>;

  // ═══ STUDY PLAN SCREEN (Kid View) ═══
  if(scr==="studyplan")return<div style={{fontFamily:"var(--font)",height:"100vh",overflow:"hidden",background:"var(--bg)",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column"}}>
    <SubHead title="My Study Plan 📋" onBack={goHome} points={prof?.points||0}/>
    <div style={{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",padding:"12px 16px 160px",minHeight:0}}>
      {studyPlan.length===0?<div style={{textAlign:"center",padding:40}}>
        <span style={{fontSize:64}}>📋</span>
        <h3 style={{fontFamily:"var(--font)",fontSize:20,fontWeight:800,color:"var(--dark)",marginTop:12}}>No study plan yet!</h3>
        <p style={{fontSize:13,color:"#A4B0BE",fontWeight:600,marginTop:6}}>Ask your parents to create one for you</p>
      </div>:
      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {studyPlan.map((task,i)=>{
          const topic=STUDY_TOPICS.find(t=>t.id===task.topicId);
          const isDone=task.completed;
          return<button key={i} data-r="tile" onClick={()=>{sfxTap();
            // Route to the appropriate screen based on topic
            if(task.topicId==="numbers"){setScr("learn");setLearnTab("numbers");}
            else if(task.topicId==="alphabet"){setScr("learn");setLearnTab("abc");}
            else if(task.topicId==="shapes"){setScr("learn");setLearnTab("shapes");}
            else if(task.topicId==="colors"){setScr("learn");setLearnTab("colors");}
            else if(task.topicId==="phonics"){setScr("phonics");}
            else if(task.topicId==="math"){setScr("quizzone");setQuizTab("math");}
            else if(task.topicId==="writing"){setScr("quizzone");setQuizTab("write");}
          }} style={{
            display:"flex",alignItems:"center",gap:14,padding:"18px 16px",borderRadius:22,border:"none",cursor:"pointer",
            background:isDone?"linear-gradient(135deg,#00D2A0,#55EFC4)":"#fff",
            boxShadow:isDone?"0 4px 14px rgba(0,210,160,0.2)":"var(--shadow-card)"}}>
            <span style={{fontSize:32}}>{isDone?"✅":topic?.emoji||"📚"}</span>
            <div style={{flex:1,textAlign:"left"}}>
              <div style={{fontWeight:800,fontSize:16,color:isDone?"#fff":"var(--dark)"}}>{topic?.name||task.topicId} — {task.subId}</div>
              <div style={{fontSize:11,fontWeight:600,color:isDone?"rgba(255,255,255,0.8)":"#A4B0BE",marginTop:2}}>{isDone?"Completed! 🎉":"Tap to start"}</div>
            </div>
            <div style={{padding:"6px 12px",borderRadius:12,background:isDone?"rgba(255,255,255,0.2)":"linear-gradient(135deg,#6C5CE7,#A29BFE)",color:"#fff",fontSize:11,fontWeight:800}}>
              {isDone?"Done":"Go →"}
            </div>
          </button>;
        })}
        {/* Engagement time tracker */}
        <div style={{padding:16,borderRadius:22,background:"linear-gradient(135deg,#6C5CE7,#A29BFE)",marginTop:8,boxShadow:"0 4px 14px rgba(108,92,231,0.2)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{color:"#fff",fontWeight:800,fontSize:14}}>⏱️ Active Time Today</div>
              <div style={{color:"rgba(255,255,255,0.8)",fontSize:24,fontWeight:800,marginTop:4}}>{engageMins} min</div>
            </div>
            <div style={{textAlign:"right"}}>
              {ENGAGE_TIERS.map(t=><div key={t.mins} style={{fontSize:10,fontWeight:700,color:engageMins>=t.mins?"#FECA57":"rgba(255,255,255,0.4)",marginBottom:2}}>
                {engageMins>=t.mins?"✅":"○"} {t.label} → +{t.pts}pts
              </div>)}
            </div>
          </div>
          <div style={{height:8,borderRadius:4,background:"rgba(255,255,255,0.2)",marginTop:8,overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:4,background:"#FECA57",width:`${Math.min(100,(engageMins/60)*100)}%`,transition:"width 1s"}}/>
          </div>
        </div>
      </div>}
    </div>
    
    {BottomNav}{TeacherBubble}<style>{CSS}</style>
  </div>;

  // ═══ NUMBER DETAIL with ANIMATED SCENE ═══
  if((scr==="numbers"||scr==="learn")&&selNum){const w=NW[selNum];const scene=getScene(selNum);const color=nClr(selNum);const phs=NPH[selNum];return<div style={{fontFamily:"var(--font)",height:"100vh",overflowY:"auto",overflowX:"hidden",background:"var(--bg)",maxWidth:520,margin:"0 auto",position:"relative",display:"flex",flexDirection:"column"}}><Confetti key={celebKey} active={confetti} type={celebType}/>{ptAnim&&<div style={{position:"fixed",top:20,right:20,zIndex:999,animation:"ptFly 1.5s ease-out forwards",fontFamily:"var(--font)",fontSize:28,fontWeight:800,color:"#22C55E"}}>{ptAnim}</div>}<SubHead title={`Number ${selNum}`} onBack={()=>{stop();pRef.current=false;setSelNum(null);setNStep("idle");if(prevScrRef.current==="learn")setScr("learn");}} points={prof?.points||0}/>
    {nStep!=="idle"&&<FlowSteps current={nStep} steps={NUM_STEPS}/>}
    <div style={{padding:"6px 10px",overflow:"hidden"}}>
      {/* 🎯 NUMBER HERO */}
      <div style={{...glowStyle("num-display")}}>
      <NumberHero num={selNum} word={w} color={color} active={nStep==="saying_sentence"} sentence={getScene(selNum).sentence}/>
      </div>

      {/* Phonemes */}
      {phs&&(nStep==="saying_phonics"||nStep==="idle")&&<div style={{marginTop:6,background:"#fff",borderRadius:14,padding:8,animation:"slideUp 0.4s ease-out"}}><div style={{fontSize:11,fontWeight:700,color:"#8E8CA3",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🗣️ Say each sound</div><div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>{phs.map((ph,i)=>{const d=gPh(ph);const act=aPhI===i;return<button key={i} onClick={()=>{if(!pRef.current)speak(d.s,{rate:0.5,pitch:1.0});}} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"6px 10px 5px",borderRadius:12,border:"none",cursor:"pointer",fontFamily:"var(--font)",minWidth:44,background:act?color:"#FFF0E0",color:act?"#fff":"#333",transform:act?"scale(1.3) translateY(-4px)":"scale(1)",boxShadow:act?`0 8px 24px ${color}55`:"0 2px 8px rgba(0,0,0,0.04)",transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}><span style={{fontSize:16,fontWeight:900,fontFamily:"var(--font)"}}>{ph.toUpperCase()}</span><span style={{fontSize:9,fontWeight:700,color:act?"#fffc":"#999",marginTop:2}}>{d.d}</span></button>;})}</div></div>}

      {/* Play controls */}
      <div style={{marginTop:12}}>
        {nStep==="idle"&&<>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:8}}>
            {/* Speech Toggle */}
            <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#fff",borderRadius:14,flex:1}}>
              <span style={{fontSize:12,fontWeight:700,color:speakMode?"#22C55E":"#999"}}>🎤</span>
              <button onClick={()=>setSpeakMode(!speakMode)} style={{width:40,height:22,borderRadius:11,border:"none",cursor:"pointer",background:speakMode?"#22C55E":"#ddd",position:"relative",transition:"background 0.3s"}}>
                <div style={{width:18,height:18,borderRadius:9,background:"#fff",position:"absolute",top:2,left:speakMode?20:2,transition:"left 0.3s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/>
              </button>
              <span style={{fontSize:11,color:speakMode?"#22C55E":"#8E8CA3",fontWeight:600}}>{speakMode?"Speak ON":"Speak OFF"}</span>
            </div>
            <button onClick={()=>playNum(selNum)} style={{padding:"10px 20px",borderRadius:14,border:"none",color:"#2D2B3D",fontSize:14,fontWeight:800,fontFamily:"var(--font)",cursor:"pointer",background:`linear-gradient(135deg,${color},${color}dd)`,display:"flex",alignItems:"center",gap:6}}>🔄 Replay</button>
          </div>
        </>}
        {nStep==="saying_number"&&<div style={{textAlign:"center",padding:12,background:"#fff",borderRadius:16,animation:"slideUp 0.3s"}}>
          <span style={{fontSize:14,fontWeight:700,color:"#6C5CE7"}}>🔊 Listen to the number!</span>
        </div>}
        {/* SPELLING */}
        {nStep==="spelling"&&(
          <div style={{animation:"slideUp 0.3s ease-out"}}>
            <div style={{textAlign:"center",padding:"8px 12px",background:"#fff",borderRadius:14,marginBottom:8}}>
              <span style={{fontSize:13,fontWeight:700,color:"#6C5CE7"}}>{spellRound===1?"👀 Watch and listen!":"👆 Tap the letters in order!"}</span>
            </div>
            <div style={{padding:14,background:"#fff",borderRadius:20}}>
              {/* Letter slots */}
              <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap",marginBottom:spellRound===2?20:0}}>
                {w.replace(/\s/g,'').toUpperCase().split('').map((letter,i)=>{
                  const st=spellStatus[i]||'waiting';
                  const isActive=activeSpellIdx===i;
                  const isTapTarget=spellRound===2 && i===tapIndex;
                  return <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                    <span style={{
                      fontSize:32,fontFamily:"var(--font)",fontWeight:800,
                      padding:"10px 14px",borderRadius:16,minWidth:48,textAlign:"center",
                      background:isActive?color:st==='correct'?"#22C55E":st==='wrong'?"#EF4444":"#FFF0E0",
                      color:(isActive||st==='correct'||st==='wrong')?"#fff":"#ddd",
                      transform:isActive?"scale(1.15) translateY(-4px)":isTapTarget?"scale(1.05)":"scale(1)",
                      boxShadow:isActive?`0 8px 24px ${color}55`:isTapTarget?`0 4px 16px ${color}33`:"0 2px 8px rgba(0,0,0,.04)",
                      transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}>{letter}</span>
                    {st==='correct'&&!isActive&&<span style={{fontSize:14}}>✅</span>}
                    {st==='wrong'&&!isActive&&<span style={{fontSize:14}}>❌</span>}
                    {isActive&&spellRound===1&&<span style={{fontSize:14,animation:"pulse 1s ease-in-out infinite"}}>👂</span>}
                    {isTapTarget&&spellRound===2&&<span style={{fontSize:14,color:color,fontWeight:800,animation:"pulse 1s ease-in-out infinite"}}>👆</span>}
                  </div>;
                })}
              </div>
              {/* Scrambled tappable letters (Round 2 only) */}
              {spellRound===2&&(
                <div data-spell-tap="true" style={{marginTop:4}}>
                  <div style={{textAlign:"center",fontSize:13,fontWeight:700,color:"#6C5CE7",marginBottom:12}}>Tap each letter:</div>
                  <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
                    {scrambledLetters.map((item,i)=>(
                      <button key={item.id} disabled={item.used}
                        onClick={()=>!item.used&&handleLetterTap(item.letter,i)}
                        style={{
                          fontSize:34,fontFamily:"var(--font)",fontWeight:800,
                          padding:"10px 16px",borderRadius:18,minWidth:56,
                          border:"3px solid",cursor:item.used?"default":"pointer",
                          borderColor:tapWrong===i?"#EF4444":item.used?"#ddd":color,
                          background:tapWrong===i?"#FEE2E2":item.used?"#f9fafb":"#fff",
                          color:item.used?"#ddd":tapWrong===i?"#EF4444":"#2D2B3D",
                          transform:tapWrong===i?"scale(0.9) rotate(-5deg)":item.used?"scale(0.8)":"scale(1)",
                          opacity:item.used?0.35:1,
                          transition:"all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                          boxShadow:!item.used&&tapWrong!==i?`0 4px 14px ${color}22`:"none"}}>{item.letter}</button>
                    ))}
                  </div>
                </div>
              )}
              {spellRound===1&&<div style={{textAlign:"center",marginTop:12,padding:"10px 14px",background:"#fff",borderRadius:14}}>
                <p style={{fontSize:14,fontWeight:700,color:"#6C5CE7",margin:0}}>👀 Watch and listen!</p>
              </div>}
            </div>
          </div>
        )}
        {nStep==="saying_sentence"&&<div style={{textAlign:"center",padding:12,background:"#FFF5EB",borderRadius:16,animation:"slideUp 0.3s"}}>
          <span style={{fontSize:14,fontWeight:700,color:"#6C5CE7"}}>💬 Listen to the sentence!</span>
        </div>}
        {nStep==="saying_phonics"&&<div style={{textAlign:"center",padding:12,background:"#D1FAE5",borderRadius:16,animation:"slideUp 0.3s"}}>
          <span style={{fontSize:14,fontWeight:700,color:"#16A34A"}}>🗣️ Repeat after me!</span>
        </div>}
        {/* COUNTDOWN */}
        {nStep==="countdown"&&(
          <div style={{textAlign:"center",padding:24,background:"#fff",borderRadius:24,animation:"slideUp 0.3s ease-out"}}>
            <Mascot mood="listening" msg={`Say "${w.toUpperCase()}" when I say Start!`}/>
            <div style={{fontSize:48,fontFamily:"var(--font)",fontWeight:800,color:countdown>0?color:"#22C55E",animation:"numPulse 0.5s ease-in-out infinite",marginTop:8}}>
              {countdown>0?countdown:"🎤 Start!"}
            </div>
          </div>
        )}
        {nStep==="listening"&&<ListeningBox transcript={rec.txt} onTapMic={tapMicNum} isListening={rec.on} error={rec.err} onType={typeNum} expected={NW[selNum]}/>}
        {nStep==="result"&&spRes!==null&&<ResultBox acc={spAcc} result={spRes} expected={w} onRetry={retryNum} onDone={()=>{setSpRes(null);const next=selNum>=(aCfg?.max||20)?1:selNum+1;setSelNum(next);setNStep("idle");setTimeout(()=>playNum(next),200);}} color={color} kidName={kidName} currentPoints={prof?.points||0}/>}
      </div>
    </div><div style={{height:90,flexShrink:0,pointerEvents:"none"}}/>{TeacherBubble}<style>{CSS}</style></div>;}

  // ═══ NUMBERS GRID ═══

  // ═══ LEARN HUB ═══
  if(scr==="learn"&&!selNum&&!selShape&&!selColor)return<div style={{fontFamily:"var(--font)",height:"100vh",overflow:"hidden",background:"var(--bg)",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column",WebkitOverflowScrolling:"touch"}}>
    <Confetti key={celebKey} active={confetti} type={celebType}/>
    <SubHead title="Learn 📚" onBack={goHome} points={prof?.points||0}/>
    {/* Teaching mode toggles */}
    <div style={{display:"flex",gap:3,padding:"2px 6px",background:"#fff",flexShrink:0,flexWrap:"wrap"}}>
      {[
        {key:"spelling",icon:"🔤",label:"Spell"},
        {key:"phonics",icon:"🔡",label:"Sounds"},
        {key:"sentence",icon:"💬",label:"Sentence"},
        {key:"speak",icon:"🎤",label:"Speak"},
      ].map(m=><button key={m.key} onClick={()=>toggleLearnMode(m.key)} style={{
        display:"flex",alignItems:"center",gap:3,padding:"6px 10px",borderRadius:10,
        border:"none",
        background:learnModes[m.key]?"linear-gradient(135deg,#00D2A0,#55EFC4)":"#F0F4FF",
        color:learnModes[m.key]?"#fff":"#A4B0BE",
        boxShadow:learnModes[m.key]?"0 3px 10px rgba(0,210,160,0.2)":"none",
        fontSize:10,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)"
      }}><span style={{fontSize:12}}>{m.icon}</span>{m.label}{learnModes[m.key]&&<span style={{fontSize:8}}>✓</span>}</button>)}
    </div>
    {/* Tab bar */}
    <div style={{display:"flex",gap:3,padding:"2px 6px",background:"#fff",flexShrink:0}}>
      {[{id:"numbers",label:"🔢 Numbers"},{id:"abc",label:"🔤 ABC"},{id:"shapes",label:"🔷 Shapes"},{id:"colors",label:"🎨 Colors"}].map(t=>
        <button key={t.id} onClick={()=>{stop();movePandaTo("bottomRight");setTeacherMood("happy");setLearnTab(t.id);}}
          style={{flex:1,padding:"9px 4px",borderRadius:12,border:"none",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"var(--font)",
            background:learnTab===t.id?"linear-gradient(135deg,#6C5CE7,#A29BFE)":"#F0F4FF",color:learnTab===t.id?"#fff":"#A4B0BE",boxShadow:learnTab===t.id?"var(--shadow-btn)":"none"
          }}>{t.label}</button>
      )}
    </div>

    {/* ═══ NUMBERS TAB ═══ */}
    {learnTab==="numbers"&&<div style={{flex:1,overflowY:"auto",overflowX:"hidden",display:"flex",flexDirection:"column",minHeight:0,WebkitOverflowScrolling:"touch"}}>
      <div style={{padding:"2px 8px",flexShrink:0}}>
        <div style={{fontSize:10,fontWeight:700,color:"#8E8CA3",textTransform:"uppercase",letterSpacing:0.5,marginBottom:2}}>📊 Pick a range:</div>
        <div style={{display:"flex",gap:4,overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
        {NUM_RANGES.map(r=><button key={r} onClick={()=>setNumRange(r)} style={{
          padding:"5px 10px",borderRadius:10,border:"2px solid",whiteSpace:"nowrap",
          borderColor:numRange===r?"#6C5CE7":"#DFE6E9",background:numRange===r?"linear-gradient(135deg,#6C5CE7,#A29BFE)":"#fff",boxShadow:numRange===r?"var(--shadow-btn)":"none",
          color:numRange===r?"#fff":"#8E8CA3",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)"
        }}>{r}</button>)}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:4,padding:"2px 6px",background:"#F0F4FF",borderRadius:8,marginTop:3}}>
          <span style={{fontSize:10,fontWeight:700,color:numSpelling?"#22C55E":"#999"}}>Abc</span>
          <button onClick={()=>setNumSpelling(!numSpelling)} style={{width:30,height:16,borderRadius:8,border:"none",cursor:"pointer",background:numSpelling?"#22C55E":"#ddd",position:"relative"}}>
            <div style={{width:12,height:12,borderRadius:6,background:"#fff",position:"absolute",top:2,left:numSpelling?16:2,transition:"left 0.3s"}}/>
          </button>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",padding:"6px 10px"}}>{(()=>{const{min,max}=getNumRange();const count=max-min+1;const cols=count<=10?3:count<=20?4:5;return<div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:count<=10?10:6}}>
        {Array.from({length:count}).map((_,i)=>{const n=min+i;const done=isDone("numbers",n);return<button key={n} data-r="num" onClick={()=>{sfxTap();stop();prevScrRef.current="learn";movePandaTo("bottomRight");rec.warmUp();setSelNum(n);setNStep("idle");setTimeout(()=>playNum(n),100);}} style={{
          position:"relative",padding:count<=10?"22px 10px":count<=20?"16px 8px":"12px 6px",borderRadius:22,
          border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,
          fontFamily:"var(--font)",background:nGrad(n),
          boxShadow:`0 4px 14px ${nClr(n)}33`,...glowStyle("num-explore-"+n)
        }}>{done&&<span style={{position:"absolute",top:4,right:6,fontSize:12,background:"#fff",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",color:"#22C55E",fontWeight:900,boxShadow:"0 2px 6px rgba(0,0,0,0.15)"}}>✓</span>}
          <span style={{fontFamily:"var(--font)",fontSize:count<=10?32:count<=20?22:18,fontWeight:800,color:"#fff",textShadow:"0 2px 4px rgba(0,0,0,0.15)"}}>{n}</span>
          {numSpelling&&<span style={{fontSize:count<=10?10:8,fontWeight:700,color:"rgba(255,255,255,0.85)"}}>{NW[n]||""}</span>}
        </button>;})}</div>;})()}</div>
    </div>}

    {/* ═══ ABC TAB ═══ */}
    {learnTab==="abc"&&<div style={{flex:1,overflowY:"auto",overflowX:"hidden",display:"flex",flexDirection:"column",minHeight:0,WebkitOverflowScrolling:"touch"}}>
      <div style={{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",padding:"6px 10px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
          {ALPHA_LETTERS.map((l,i)=>{const done=isDone("alphabet",l);return<button key={l} data-r="letter" onClick={()=>{sfxTap();stop();prevScrRef.current="learn";movePandaTo("bottomRight");pRef.current=true;setScr("alphabet");setSelLetter(l);playLetter(l);}} style={{
            position:"relative",padding:"16px 6px",borderRadius:20,
            border:"none",cursor:"pointer",
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,
            fontFamily:"var(--font)",
            background:`linear-gradient(135deg,${ALPHA_COLORS[i%13]},${ALPHA_COLORS[i%13]}CC)`,
            boxShadow:`0 4px 14px ${ALPHA_COLORS[i%13]}33`}}>{done&&<span style={{position:"absolute",top:3,right:5,fontSize:12,background:"#fff",borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",color:"#22C55E",fontWeight:900,boxShadow:"0 2px 4px rgba(0,0,0,0.15)"}}>✓</span>}
            <span style={{fontSize:24,fontWeight:900,color:"#fff",lineHeight:1,textShadow:"0 2px 4px rgba(0,0,0,0.15)"}}>{l}{l.toLowerCase()}</span>
            <span style={{fontSize:8,fontWeight:700,color:"rgba(255,255,255,0.8)"}}>{ALPHA_DATA[l]?.examples[0]?.w||""}</span>
          </button>;})}
        </div>
      </div>
    </div>}

    {/* ═══ SHAPES TAB ═══ */}
    {learnTab==="shapes"&&<div style={{flex:1,overflowY:"auto",overflowX:"hidden",display:"flex",flexDirection:"column",minHeight:0,WebkitOverflowScrolling:"touch"}}>
      <div style={{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",padding:"6px 10px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {SHAPES.map((s,i)=>{const done=isDone("shapes",s.name);return<button key={s.name} data-r="shape" onClick={()=>{sfxTap();stop();prevScrRef.current="learn";movePandaTo("bottomRight");rec.warmUp();setSelShape(s);setShStep("idle");setTimeout(()=>playShape(s),100);}} style={{
            position:"relative",padding:"18px 8px",borderRadius:22,
            border:"none",cursor:"pointer",
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,
            fontFamily:"var(--font)",
            background:`linear-gradient(135deg,${["#6C5CE7","#00D2A0","#FF9F43","#54A0FF","#FECA57","#FD79A8","#00CEC9","#FF6B81","#A29BFE","#74B9FF","#FF6348","#55EFC4"][i%12]},${["#5A4BD1","#00B894","#EE8520","#2E86DE","#F9CA24","#E84393","#00B5AD","#EE5A6F","#6C5CE7","#0984E3","#EE5A24","#00D2A0"][i%12]})`,
            boxShadow:`0 4px 14px ${["#6C5CE7","#00D2A0","#FF9F43","#54A0FF","#FECA57","#FD79A8","#00CEC9","#FF6B81","#A29BFE","#74B9FF","#FF6348","#55EFC4"][i%12]}33`}}>{done&&<span style={{position:"absolute",top:4,right:5,fontSize:12,background:"#fff",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",color:"#22C55E",fontWeight:900,boxShadow:"0 2px 4px rgba(0,0,0,0.15)"}}>✓</span>}
            <span style={{fontSize:36,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.2))"}}>{s.emoji}</span>
            <span style={{fontSize:12,fontWeight:700,textTransform:"capitalize",color:"#fff",textShadow:"0 1px 3px rgba(0,0,0,0.15)"}}>{s.name}</span>
          </button>;})}
        </div>
      </div>
    </div>}

    {/* ═══ COLORS TAB ═══ */}
    {learnTab==="colors"&&<div style={{flex:1,overflowY:"auto",overflowX:"hidden",display:"flex",flexDirection:"column",minHeight:0,WebkitOverflowScrolling:"touch"}}>
      <div style={{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",padding:"6px 10px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
          {COLORSDATA.map((c,i)=>{const done=isDone("colors",c.name);return<button key={c.name} data-r="color" onClick={()=>{sfxTap();stop();prevScrRef.current="learn";movePandaTo("bottomRight");rec.warmUp();setSelColor(c);setCoStep("idle");setTimeout(()=>playColor(c),100);}} style={{
            position:"relative",padding:"16px 8px",borderRadius:22,
            cursor:"pointer",
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,
            fontFamily:"var(--font)",
            background:`linear-gradient(145deg,${c.hex},${c.hex}CC)`,
            boxShadow:`0 4px 14px ${c.hex}33`,
            border:(c.name==="white"||c.name==="silver"||c.name==="gray")?"2px solid #DFE6E9":"none"}}>{done&&<span style={{position:"absolute",top:4,right:5,fontSize:12,background:"#fff",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",color:"#22C55E",fontWeight:900,boxShadow:"0 2px 4px rgba(0,0,0,0.15)"}}>✓</span>}
            <div style={{width:44,height:44,borderRadius:14,background:(c.name==="white"||c.name==="silver"||c.name==="gray")?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,boxShadow:"inset 0 2px 4px rgba(255,255,255,0.3)"}}>{c.emoji||"●"}</div>
            <span style={{fontSize:12,fontWeight:700,textTransform:"capitalize",color:(c.name==="white"||c.name==="silver"||c.name==="gray"||c.name==="yellow"||c.name==="gold")?"#2D3436":"#fff",textShadow:(c.name==="white"||c.name==="silver"||c.name==="gray")?"none":"0 1px 3px rgba(0,0,0,0.2)"}}>{c.name}</span>
          </button>;})}
        </div>
      </div>
    </div>}

    <div style={{height:90,flexShrink:0,pointerEvents:"none"}}/>{BottomNav}{TeacherBubble}<style>{CSS}</style>
  </div>;

  // ═══ QUIZ ZONE ═══
  if(scr==="quizzone")return<div style={{fontFamily:"var(--font)",height:"100vh",overflow:"hidden",background:"var(--bg)",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column",WebkitOverflowScrolling:"touch"}}>
    <Confetti key={celebKey} active={confetti} type={celebType}/>
    <SubHead title="Quiz Zone 🎯" onBack={goHome} points={prof?.points||0}/>
    {/* Tab bar */}
    <div style={{display:"flex",gap:3,padding:"4px 8px",background:"#fff",borderBottom:"none",flexShrink:0}}>
      {[{id:"numquiz",label:"🔢 Numbers"},{id:"math",label:"➕ Math"},{id:"letters",label:"🔤 Letters"},{id:"write",label:"✏️ Write"}].map(t=>
        <button key={t.id} onClick={()=>{
          stop();movePandaTo("bottomRight");setTeacherMood("happy");setQuizTab(t.id);
          if(t.id==="numquiz"&&!quizNum)newQuiz();
          if(t.id==="math"&&!mathProblem)genMath();
          if(t.id==="letters"&&matchPairs.length===0)startMatch();
          if(t.id==="write"){setTimeout(()=>{initCanvas();speak(`Write ${NW[writeNum]||writeNum}.`,{rate:0.75,pitch:1.0});},500);}
        }} style={{flex:1,padding:"9px 4px",borderRadius:12,border:"none",fontWeight:700,fontSize:11,cursor:"pointer",fontFamily:"var(--font)",
          background:quizTab===t.id?"linear-gradient(135deg,#54A0FF,#74B9FF)":"#F0F4FF",color:quizTab===t.id?"#fff":"#A4B0BE",boxShadow:quizTab===t.id?"var(--shadow-btn)":"none"}}>{t.label}</button>
      )}
    </div>

    {/* ═══ NUMBER QUIZ ═══ */}
    {quizTab==="numquiz"&&<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto",overflowX:"hidden",minHeight:0,WebkitOverflowScrolling:"touch"}}>
      {/* Range filter */}
      <div style={{padding:"2px 8px",background:"#fff",flexShrink:0}}>
        <div style={{fontSize:10,fontWeight:700,color:"#8E8CA3",textTransform:"uppercase",letterSpacing:0.5,marginBottom:2}}>📊 Pick a range:</div>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
        {["1-10","1-20","11-20","21-50","51-100","1-100"].map(r=><button key={r} onClick={()=>{setQuizRange(r);quizUsedRef.current=[];setQuizScore(0);setQuizStreak(0);setQuizTotal(0);newQuiz(r);}} style={{
          padding:"6px 12px",borderRadius:12,border:"2px solid",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)",
          borderColor:quizRange===r?"#54A0FF":"#DFE6E9",background:quizRange===r?"linear-gradient(135deg,#54A0FF,#74B9FF)":"#fff",boxShadow:quizRange===r?"var(--shadow-btn)":"none",color:quizRange===r?"#fff":"#8E8CA3"
        }}>{r}</button>)}
        </div>
      </div>
      <div style={{padding:"8px 12px",background:"linear-gradient(135deg,#FFF5EB,#FFFBF5)",display:"flex",alignItems:"center",gap:8,flexShrink:0,borderBottom:"none"}}>
        {quizNum?<>
          <button onClick={repeatQuiz} style={{padding:"10px 16px",borderRadius:14,border:"none",background:"linear-gradient(135deg,#6C5CE7,#A29BFE)",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)",boxShadow:"var(--shadow-btn)"}}>🔊 Hear</button>
          <div style={{flex:1,textAlign:"center"}}><div style={{fontSize:14,fontWeight:700,color:"#6C5CE7"}}>Which number? 👂</div></div>
          <div><div style={{fontSize:14,fontWeight:700,color:"#6C5CE7"}}>🏆 {quizScore}</div>{quizStreak>=3&&<span style={{fontSize:10,fontWeight:700,color:"#EF4444"}}>🔥{quizStreak}</span>}</div>
        </>:<button onClick={()=>newQuiz()} style={{width:"100%",padding:"14px",borderRadius:16,border:"none",background:"linear-gradient(135deg,#6C5CE7,#A29BFE)",color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)"}}>▶️ Start Quiz!</button>}
      </div>
      {quizNum&&<div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,width:"100%",maxWidth:360}}>
          {quizOpts.map((n,i)=>{
            const isCorrect=quizFb?.ok&&quizFb?.n===n;
            const isWrong=quizFb&&!quizFb.ok&&quizFb.n===n;
            return<button key={n} data-r="quiz" onClick={()=>{sfxTap();onQuizTap(n);}} style={{
              padding:"26px 10px",borderRadius:24,border:"none",cursor:"pointer",
              background:isCorrect?"linear-gradient(135deg,#00D2A0,#00B894)":isWrong?"linear-gradient(135deg,#FF6B81,#EE5A6F)":nGrad(n),
              fontFamily:"var(--font)",fontSize:32,fontWeight:800,
              color:"#fff",textShadow:"0 2px 4px rgba(0,0,0,0.15)",
              transform:isCorrect?"scale(1.1)":isWrong?"scale(0.95)":"scale(1)",boxShadow:isCorrect?"0 6px 20px rgba(0,210,160,0.3)":isWrong?"0 4px 16px rgba(255,107,129,0.3)":`0 4px 14px ${nClr(n)}30`
            }}>{n}</button>;
          })}
        </div>
      </div>}
    </div>}

    {/* ═══ MATH QUIZ ═══ */}
    {quizTab==="math"&&<div style={{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",padding:"12px 14px",minHeight:0}}>
      <div style={{marginBottom:10}}>
        <div style={{fontSize:10,fontWeight:700,color:"#8E8CA3",textTransform:"uppercase",letterSpacing:0.5,marginBottom:2}}>📊 Difficulty:</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
          <div style={{display:"flex",gap:4,flex:1,flexWrap:"wrap"}}>
          {["1-10","1-20","1-50","1-100"].map(r=><button key={r} onClick={()=>{setMathRange(r);genMath(r,mathOp);}} style={{
            padding:"7px 12px",borderRadius:12,border:"2px solid",fontSize:11,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"var(--font)",
            borderColor:mathRange===r?"#54A0FF":"#DFE6E9",background:mathRange===r?"linear-gradient(135deg,#54A0FF,#74B9FF)":"#fff",boxShadow:mathRange===r?"var(--shadow-btn)":"none",color:mathRange===r?"#fff":"#8E8CA3"
          }}>{r}</button>)}
          </div>
          <div style={{display:"flex",gap:4}}>
          {[{id:"mix",label:"Mix"},{id:"+",label:"+"},{id:"-",label:"−"},{id:"×",label:"×"}].map(o=><button key={o.id} onClick={()=>{setMathOp(o.id);genMath(mathRange,o.id);}} style={{
            padding:"7px 12px",borderRadius:12,border:"2px solid",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"var(--font)",
            borderColor:mathOp===o.id?"#FF9F43":"#DFE6E9",background:mathOp===o.id?"linear-gradient(135deg,#FF9F43,#FECA57)":"#fff",boxShadow:mathOp===o.id?"var(--shadow-btn)":"none",color:mathOp===o.id?"#fff":"#8E8CA3"
          }}>{o.label}</button>)}
          </div>
        </div>
      </div>
      {mathProblem?<div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{fontSize:14,fontWeight:800,color:"#6C5CE7"}}>🏆 {mathScore}/{mathTotal}</span>
          <button onClick={()=>genMath()} style={{padding:"6px 14px",borderRadius:10,border:"none",background:"#FF8C42",color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer"}}>Skip ➡️</button>
        </div>
        <div style={{background:"#fff",borderRadius:20,padding:14,textAlign:"center",marginBottom:12}}>
          <div style={{fontFamily:"var(--font)",fontSize:30,fontWeight:900,color:"#fff",marginTop:4,textShadow:"0 2px 4px rgba(0,0,0,0.15)"}}>
            {mathProblem.a} {mathProblem.op} {mathProblem.b} = <span style={{color:"#FECA57",textShadow:"0 0 12px rgba(254,202,87,0.5)"}}>?</span>
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
          {mathChoices.map((c,i)=>{
            const isRight=mathFb&&c===mathProblem.answer;
            const isWrong=mathFb==="wrong"&&c===mathAnswer;
            return<button key={c+"-"+i} data-r="quiz" onClick={()=>{sfxTap();onMathTap(c);}} style={{
              padding:"22px 12px",borderRadius:24,border:"none",cursor:"pointer",
              background:isRight?"linear-gradient(135deg,#00D2A0,#00B894)":isWrong?"linear-gradient(135deg,#FF6B81,#EE5A6F)":"linear-gradient(135deg,#54A0FF,#74B9FF)",
              fontFamily:"var(--font)",fontSize:26,fontWeight:800,
              color:"#fff",textShadow:"0 2px 4px rgba(0,0,0,0.1)",boxShadow:isRight?"0 4px 16px rgba(0,210,160,0.25)":isWrong?"0 4px 16px rgba(255,107,129,0.25)":"0 4px 14px rgba(84,160,255,0.25)"
            }}>{c}</button>;
          })}
        </div>
      </div>:<button onClick={()=>genMath()} style={{width:"100%",padding:"14px",borderRadius:16,border:"none",background:"linear-gradient(135deg,#6C5CE7,#A29BFE)",color:"#fff",fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)"}}>▶️ Start Math!</button>}
    </div>}

    {/* ═══ LETTER MATCH ═══ */}
    {quizTab==="letters"&&<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto",overflowX:"hidden",minHeight:0,WebkitOverflowScrolling:"touch",padding:"10px 14px"}}>
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {[{id:"findSmall",label:"A→a"},{id:"findCaps",label:"a→A"},{id:"voiceQuiz",label:"🔊 Listen"}].map(m=>
          <button key={m.id} onClick={()=>{stop();setTeacherMood("excited");startMatch(m.id);}} style={{
            flex:1,padding:"6px 2px",borderRadius:10,border:"2px solid",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)",
            borderColor:matchMode===m.id?"#FF8C42":"#E8E0D8",background:matchMode===m.id?"#FF8C42":"#FFFBF5",
            color:matchMode===m.id?"#fff":"#8E8CA3"}}>{m.label}</button>
        )}
      </div>
      <div style={{textAlign:"center",padding:"10px",background:"linear-gradient(135deg,#FFF5EB,#FFF5EB)",borderRadius:16,marginBottom:10}}>
        {matchIdx<matchPairs.length?<>
          <div style={{fontSize:12,fontWeight:700,color:"#8E8CA3"}}>
            {matchMode==="findSmall"?"Find the small letter for:":matchMode==="findCaps"?"Find the CAPITAL for:":"Which letter did you hear?"}
          </div>
          {matchMode==="voiceQuiz"?
            <div style={{marginTop:6}}>
              <button onClick={()=>speak(`${matchPairs[matchIdx]?.cap}`,{rate:0.6,pitch:1.0})} style={{
                fontSize:16,fontWeight:700,fontFamily:"var(--font)",
                background:"linear-gradient(135deg,#FF8C42,#FFB066)",border:"none",borderRadius:16,
                padding:"12px 24px",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",gap:8,margin:"0 auto"
              }}>🔊 Hear Again</button>
            </div>:
            <div style={{fontSize:56,fontWeight:900,color:"#6C5CE7",fontFamily:"var(--font)",lineHeight:1,animation:"numPulse 1.5s ease-in-out infinite"}}>
              {matchMode==="findCaps"?(matchPairs[matchIdx]?.cap||"").toLowerCase():(matchPairs[matchIdx]?.cap||"")}
            </div>
          }
          <div style={{fontSize:14,fontWeight:800,color:"#6C5CE7",marginTop:4}}>🏆 {matchScore}/8</div>
        </>:<>
          <div style={{fontSize:36}}>🎉</div>
          <div style={{fontSize:18,fontWeight:800,color:"#6C5CE7"}}>All Done! {matchScore}/{matchPairs.length} correct</div>
          <button onClick={()=>{stop();startMatch();}} style={{marginTop:8,padding:"10px 24px",borderRadius:14,border:"none",background:"#FF8C42",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer"}}>🔄 Play Again</button>
        </>}
      </div>
      {matchIdx<matchPairs.length&&matchOpts.length>0&&<div style={{display:"grid",gridTemplateColumns:matchMode==="voiceQuiz"?"repeat(3,1fr)":"repeat(5,1fr)",gap:10}}>
        {matchOpts.map((l,i)=>{
          const isWrong=matchWrong===l;
          const isCorrect=matchCorrect===l||matchCorrect===l.toUpperCase()||matchCorrect===l.toLowerCase();
          const displayLetter=matchMode==="findCaps"?l.toUpperCase():matchMode==="voiceQuiz"?l.toUpperCase():l.toLowerCase();
          return<button key={"m"+l+matchIdx+matchMode} data-r="quiz" onClick={()=>{sfxTap();onMatchTap(l);}} style={{
            padding:matchMode==="voiceQuiz"?"20px 6px":"16px 6px",borderRadius:18,border:"3px solid",cursor:"pointer",
            borderColor:isWrong?"#FF6B81":isCorrect?"#00D2A0":"transparent",
            background:isWrong?"linear-gradient(135deg,#FF6B81,#EE5A6F)":isCorrect?"linear-gradient(135deg,#00D2A0,#55EFC4)":"linear-gradient(135deg,#6C5CE7,#A29BFE)",
            fontSize:matchMode==="voiceQuiz"?36:30,fontWeight:900,
            color:"#fff",textShadow:"0 2px 4px rgba(0,0,0,0.15)",fontFamily:"var(--font)",
            transform:isCorrect?"scale(1.2)":isWrong?"scale(0.9)":"scale(1)",boxShadow:isCorrect?"0 6px 20px rgba(0,210,160,.3)":isWrong?"0 4px 16px rgba(255,107,129,.25)":"0 4px 14px rgba(108,92,231,.2)"
          }}>{displayLetter}</button>;
        })}
      </div>}
    </div>}

    {/* ═══ WRITING TAB ═══ */}
    {quizTab==="write"&&<div style={{flex:1,display:"flex",flexDirection:"column",overflowY:"auto",overflowX:"hidden",minHeight:0,WebkitOverflowScrolling:"touch",padding:"10px 14px"}}>
      {/* Mode toggle: Numbers vs Letters */}
      <div style={{display:"flex",gap:4,marginBottom:4}}>
        {[{id:"numbers",label:"🔢 Numbers"},{id:"letters",label:"🔤 Letters"}].map(m=>
          <button key={m.id} onClick={()=>{setWriteMode(m.id);setWriteOk(false);writeOkRef.current=false;setWriteScore(null);drawPtsRef.current=0;setDrawPts(0);setTimeout(()=>{initCanvas();if(m.id==="numbers")speak(`Write ${NW[writeNum]||writeNum}.`,{rate:0.75});else speak(`Write ${writeCase==="caps"?writeChar:writeChar.toLowerCase()}.`,{rate:0.75});},300);}} style={{
            flex:1,padding:"9px",borderRadius:12,border:"2px solid",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)",
            borderColor:writeMode===m.id?"#FF8C42":"#E8E0D8",background:writeMode===m.id?"#FF8C42":"#FFFBF5",color:writeMode===m.id?"#fff":"#8E8CA3"
          }}>{m.label}</button>
        )}
      </div>
      {/* Caps/Small toggle for letters */}
      {writeMode==="letters"&&<div style={{display:"flex",gap:4,marginBottom:4}}>
        {[{id:"caps",label:"ABC Capital"},{id:"small",label:"abc Small"}].map(m=>
          <button key={m.id} onClick={()=>{setWriteCase(m.id);setWriteOk(false);writeOkRef.current=false;setWriteScore(null);drawPtsRef.current=0;setDrawPts(0);const ch=m.id==="caps"?writeChar.toUpperCase():writeChar.toLowerCase();setTimeout(()=>{initCanvas();speak(`Write ${ch}.`,{rate:0.75});},300);}} style={{
            flex:1,padding:"8px",borderRadius:12,border:"2px solid",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)",
            borderColor:writeCase===m.id?"#FF8C42":"#E8E0D8",background:writeCase===m.id?"#FF8C42":"#FFFBF5",color:writeCase===m.id?"#fff":"#8E8CA3"
          }}>{m.label}</button>
        )}
      </div>}
      {/* Current target + score */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
        <div style={{textAlign:"center",minWidth:60}}>
          <span style={{fontFamily:"var(--font)",fontSize:44,fontWeight:900,color:"#6C5CE7",lineHeight:1}}>
            {writeMode==="numbers"?writeNum:(writeCase==="caps"?writeChar.toUpperCase():writeChar.toLowerCase())}
          </span>
          <div style={{fontSize:11,fontWeight:700,color:"#6C5CE7",textTransform:"capitalize"}}>
            {writeMode==="numbers"?(NW[writeNum]||writeNum):(writeCase==="caps"?"Capital":"Small")}
          </div>
        </div>
        <div style={{flex:1}}>
          {writeScore!==null?<div style={{display:"flex",alignItems:"center",gap:6}}>
            <div style={{flex:1,height:10,background:"#fff",borderRadius:5,overflow:"hidden"}}>
              <div style={{height:"100%",background:writeScore>=60?"#22C55E":writeScore>=35?"#F59E0B":"#F87171",borderRadius:5,width:`${Math.max(3,writeScore)}%`,transition:"width 0.3s"}}/>
            </div>
            <span style={{fontSize:14,fontWeight:800,minWidth:40,color:writeScore>=60?"#22C55E":writeScore>=35?"#F59E0B":"#F87171"}}>{writeScore}%</span>
          </div>:<div style={{fontSize:12,fontWeight:600,color:"#8E8CA3"}}>✏️ Trace on the watermark!</div>}
          {writeOk&&<div style={{fontSize:12,fontWeight:700,color:"#22C55E",marginTop:2}}>✅ Next coming up...</div>}
        </div>
        <button onClick={()=>{
          if(writeMode==="numbers"){const n=(writeNum%20)+1;setWriteNum(n);}
          else{const idx=ALPHA_LETTERS.indexOf(writeChar.toUpperCase());setWriteChar(ALPHA_LETTERS[(idx+1)%26]);}
          setWriteOk(false);writeOkRef.current=false;setWriteScore(null);drawPtsRef.current=0;setDrawPts(0);
          setTimeout(()=>{initCanvas();speak(`Write ${writeMode==="numbers"?NW[(writeNum%20)+1]||"":ALPHA_LETTERS[(ALPHA_LETTERS.indexOf(writeChar.toUpperCase())+1)%26]}.`,{rate:0.75});},300);
        }} style={{padding:"8px 16px",borderRadius:12,border:"none",background:"#FF8C42",color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer"}}>Skip ➡️</button>
      </div>
      {/* Canvas */}
      <div style={{position:"relative",background:"#fff",borderRadius:16,border:"3px solid #E8E0D8",overflow:"hidden",aspectRatio:"1",width:"100%",maxWidth:320,margin:"0 auto"}}>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:160,fontWeight:900,color:"#f0f0f0",fontFamily:"var(--font)",pointerEvents:"none",zIndex:0,lineHeight:1}}>
          {writeMode==="numbers"?writeNum:(writeCase==="caps"?writeChar.toUpperCase():writeChar.toLowerCase())}
        </div>
        <canvas ref={cRef} style={{position:"relative",zIndex:1,width:"100%",height:"100%",touchAction:"none",cursor:"crosshair"}}
          onPointerDown={drawStart} onPointerMove={drawMove} onPointerUp={drawEnd} onPointerLeave={drawEnd}/>
      </div>
      <div style={{display:"flex",gap:10,marginTop:10}}>
        <button onClick={clearPad} style={{flex:1,padding:"10px",borderRadius:14,border:"none",background:"#fff",color:"#888",fontSize:14,fontWeight:700,cursor:"pointer"}}>🗑️ Clear</button>
        <button onClick={()=>speak(`Write ${writeMode==="numbers"?(NW[writeNum]||writeNum):writeChar}.`,{rate:0.75})} style={{flex:1,padding:"10px",borderRadius:14,border:"none",background:"linear-gradient(135deg,#6C5CE7,#A29BFE)",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>🔊 Hear</button>
      </div>
    </div>}

    <div style={{height:90,flexShrink:0,pointerEvents:"none"}}/>{BottomNav}{TeacherBubble}<style>{CSS}</style>
  </div>;

  if(scr==="numbers"&&!selNum)return<div style={{fontFamily:"var(--font)",height:"100vh",overflow:"hidden",background:"var(--bg)",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column"}}><Particles count={8}/><SubHead title="Numbers" onBack={goHome} points={prof?.points||0}/>
    {/* Tab bar */}
    <div style={{display:"flex",gap:6,padding:"6px 10px",background:"#fff",borderBottom:"none",flexShrink:0}}>
      {[{id:"learn",label:"🔢 Learn"},{id:"math",label:"➕ Math"},{id:"write",label:"✏️ Write"}].map(t=>
        <button key={t.id} onClick={()=>{stop();movePandaTo("bottomRight");setTeacherMood("happy");setNumTab(t.id);if(t.id==="math"&&!mathProblem)genMath();if(t.id==="write")setTimeout(()=>{initCanvas();speak(`Write ${NW[writeNum]||writeNum}.`,{rate:0.75,pitch:1.0});},500);}}
          style={{flex:1,padding:"10px 6px",borderRadius:14,border:"none",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"var(--font)",
            background:numTab===t.id?"#FF8C42":"#EDE5DC",color:numTab===t.id?"#fff":"#8E8CA3"}}>{t.label}</button>
      )}
    </div>
    {numTab==="learn"&&<div style={{flex:1,overflowY:"auto",overflowX:"hidden",display:"flex",flexDirection:"column",minHeight:0,WebkitOverflowScrolling:"touch"}}>
      {/* Range filter */}
      <div style={{display:"flex",gap:6,padding:"8px 12px",flexWrap:"wrap",flexShrink:0}}>
        {NUM_RANGES.map(r=><button key={r} onClick={()=>setNumRange(r)} style={{
          padding:"6px 12px",borderRadius:14,border:"2px solid",whiteSpace:"nowrap",
          borderColor:numRange===r?"#FF8C42":"#E8E0D8",
          background:numRange===r?"#FF8C42":"#FFFBF5",
          color:numRange===r?"#fff":"#8E8CA3",fontSize:12,fontWeight:700,
          cursor:"pointer",fontFamily:"var(--font)",flexShrink:0
        }}>{r}</button>)}
        {/* Spelling toggle */}
        <div style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",background:"#fff",borderRadius:14,flexShrink:0}}>
          <span style={{fontSize:11,fontWeight:700,color:numSpelling?"#22C55E":"#999"}}>ABC</span>
          <button onClick={()=>setNumSpelling(!numSpelling)} style={{width:34,height:18,borderRadius:9,border:"none",cursor:"pointer",background:numSpelling?"#22C55E":"#ddd",position:"relative",transition:"background 0.3s"}}>
            <div style={{width:14,height:14,borderRadius:7,background:"#fff",position:"absolute",top:2,left:numSpelling?18:2,transition:"left 0.3s"}}/>
          </button>
        </div>
      </div>
      {/* Number grid */}
      <div style={{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",padding:"8px 14px"}}>{(()=>{const{min,max}=getNumRange();const count=max-min+1;const cols=count<=10?3:count<=20?4:5;return<div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:count<=10?14:count<=20?10:8}}>
        {Array.from({length:count}).map((_,i)=>{const n=min+i;const done=isDone("numbers",n);return<button key={n} onClick={(e)=>{stop();movePandaTo("bottomRight");rec.warmUp();setSelNum(n);setNStep("idle");setTimeout(()=>playNum(n),100);}} style={{
          position:"relative",
          padding:count<=10?"22px 10px":count<=20?"16px 8px":"12px 6px",
          borderRadius:18,
          border:`2px solid ${done?nClr(n)+"44":"#E8E0D8"}`,
          cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,
          fontFamily:"var(--font)",
          background:done?`linear-gradient(135deg,${nClr(n)}08,${nClr(n)}15)`:"#fff",
          animation:`gridPop 0.3s ease ${i*0.02}s both`,
          boxShadow:"var(--shadow-card)"
        }}>{done&&<span style={{position:"absolute",top:3,right:4,fontSize:11,color:"#4ADE80",fontWeight:900}}>✓</span>}
          <span style={{fontFamily:"var(--font)",fontSize:count<=10?30:count<=20?22:16,fontWeight:800,color:nClr(n)}}>{n}</span>
          {numSpelling&&<span style={{fontSize:count<=10?9:7,fontWeight:700,color:"#8E8CA3",textTransform:"capitalize"}}>{NW[n]||""}</span>}
        </button>;})}</div>;})()}</div>
    </div>}
    {/* ═══ MATH TAB ═══ */}
    {numTab==="math"&&<div style={{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",padding:"12px 14px",minHeight:0}}>
      {/* Math settings bar */}
      <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:4,flex:1,flexWrap:"wrap"}}>
          {["1-10","1-20","1-50","1-100"].map(r=><button key={r} onClick={()=>{setMathRange(r);genMath(r,mathOp);}} style={{
            padding:"7px 12px",borderRadius:12,border:"2px solid",fontSize:11,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap",fontFamily:"var(--font)",
            borderColor:mathRange===r?"#54A0FF":"#DFE6E9",background:mathRange===r?"linear-gradient(135deg,#54A0FF,#74B9FF)":"#fff",boxShadow:mathRange===r?"var(--shadow-btn)":"none",color:mathRange===r?"#fff":"#8E8CA3"
          }}>{r}</button>)}
        </div>
        <div style={{display:"flex",gap:4}}>
          {[{id:"mix",label:"Mix"},{id:"+",label:"+"},{id:"-",label:"−"},{id:"×",label:"×"}].map(o=><button key={o.id} onClick={()=>{setMathOp(o.id);genMath(mathRange,o.id);}} style={{
            padding:"7px 12px",borderRadius:12,border:"2px solid",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"var(--font)",
            borderColor:mathOp===o.id?"#FF9F43":"#DFE6E9",background:mathOp===o.id?"linear-gradient(135deg,#FF9F43,#FECA57)":"#fff",boxShadow:mathOp===o.id?"var(--shadow-btn)":"none",color:mathOp===o.id?"#fff":"#8E8CA3"
          }}>{o.label}</button>)}
        </div>
      </div>
      {mathProblem?<div data-owl="math-problem">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{fontSize:14,fontWeight:800,color:"#6C5CE7"}}>🏆 {mathScore}/{mathTotal}</span>
          <button onClick={genMath} style={{padding:"6px 14px",borderRadius:10,border:"none",background:"#FF8C42",color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer"}}>Skip ➡️</button>
        </div>
        {/* Visual problem with emojis */}
        <div style={{background:"#fff",borderRadius:20,padding:14,textAlign:"center",marginBottom:12}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginBottom:6}}>
            {Array.from({length:Math.min(mathProblem.a,15)}).map((_,i)=>
              <span key={"a"+i} style={{fontSize:26,animation:`gridPop 0.2s ease ${i*0.04}s both`}}>{getMathEmoji(0)}</span>
            )}
          </div>
          <div style={{fontSize:32,fontWeight:900,color:mathProblem.op==="+"?"#60B246":mathProblem.op==="-"?"#E23744":"#FF8C42",margin:"4px 0"}}>{mathProblem.op}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginBottom:6}}>
            {Array.from({length:Math.min(mathProblem.b,15)}).map((_,i)=>
              <span key={"b"+i} style={{fontSize:26,animation:`gridPop 0.2s ease ${(mathProblem.a+i)*0.04}s both`}}>{getMathEmoji(1)}</span>
            )}
          </div>
          <div style={{fontFamily:"var(--font)",fontSize:30,fontWeight:900,color:"#fff",marginTop:4,textShadow:"0 2px 4px rgba(0,0,0,0.15)"}}>
            {mathProblem.a} {mathProblem.op} {mathProblem.b} = <span style={{color:"#FECA57",textShadow:"0 0 12px rgba(254,202,87,0.5)"}}>?</span>
          </div>
        </div>
        {/* 4 answer choices */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
          {mathChoices.map((c,i)=>{
            const isRight=mathFb&&c===mathProblem.answer;
            const isWrong=mathFb==="wrong"&&c===mathAnswer;
            return<button key={i} onClick={(e)=>{onMathTap(c);}} style={{
              padding:"16px 8px",borderRadius:16,border:"3px solid",cursor:"pointer",
              borderColor:isRight?"#60B246":isWrong?"#E23744":"#E8E8E8",
              background:isRight?"#FFF5EB":isWrong?"#FEF2F2":"#fff",
              fontSize:26,fontWeight:900,fontFamily:"var(--font)",
              color:isRight?"#60B246":isWrong?"#E23744":"#1C1C2B",
              transform:isRight?"scale(1.05)":isWrong?"scale(0.95)":"scale(1)"}}>{c}{isRight?" ✅":""}{isWrong?" ❌":""}</button>;
          })}
        </div>
        {mathFb==="wrong"&&<div style={{marginTop:10,padding:10,background:"#fff",borderRadius:14,textAlign:"center"}}>
          <span style={{fontSize:14,fontWeight:800,color:"#6C5CE7"}}>{mathProblem.a} {mathProblem.op} {mathProblem.b} = {mathProblem.answer}</span>
          <div style={{display:"flex",flexWrap:"wrap",gap:3,justifyContent:"center",marginTop:4}}>
            {Array.from({length:Math.min(mathProblem.answer,20)}).map((_,i)=>
              <span key={"r"+i} style={{fontSize:18}}>{getMathEmoji(2)}</span>
            )}
          </div>
        </div>}
      </div>:<div style={{textAlign:"center",paddingTop:60}}>
        <span style={{fontSize:56}}>➕</span>
        <p style={{fontSize:18,fontWeight:800,color:"#2D2B3D",marginTop:10}}>Ready for Math?</p>
        <button onClick={genMath} style={{marginTop:16,padding:"14px 32px",borderRadius:16,border:"none",background:"linear-gradient(135deg,#6C5CE7,#A29BFE)",color:"#fff",fontSize:16,fontWeight:800,cursor:"pointer"}}>▶️ Start!</button>
      </div>}
    </div>}
    {/* ═══ WRITE TAB ═══ */}
    {numTab==="write"&&<div data-owl="write-canvas" style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{flexShrink:0,background:"#fff",borderBottom:"3px solid #FF8C42",overflow:"hidden"}}>
        <div style={{position:"relative",padding:"8px 14px",backgroundImage:"repeating-linear-gradient(transparent,transparent 27px,#E8E8E8 27px,#E8E8E8 28px)",backgroundSize:"100% 28px",backgroundPosition:"0 8px"}}>
          <div style={{position:"absolute",left:30,top:0,bottom:0,width:2,background:"#FECACA"}}/>
          <div style={{display:"flex",alignItems:"center",gap:10,paddingLeft:36}}>
            <span style={{fontFamily:"var(--font)",fontSize:52,fontWeight:900,color:"#6C5CE7",lineHeight:1}}>{writeNum}</span>
            <div style={{flex:1}}><div style={{fontWeight:800,fontSize:15,color:"#2D2B3D",textTransform:"capitalize"}}>{NW[writeNum]||""} {NUM_EMOJI[writeNum]||""}</div><div style={{fontSize:10,fontWeight:700,color:"#8E8CA3"}}>{NUM_STROKES[writeNum]||"Write it!"}</div></div>
            <button onClick={()=>speak(`${NW[writeNum]||writeNum}. ${NUM_STROKES[writeNum]||""}`,{rate:0.75,pitch:1.0})} style={{padding:"8px 12px",borderRadius:10,border:"none",background:"#FF8C42",color:"#fff",fontSize:11,fontWeight:800,cursor:"pointer"}}>🔊</button>
          </div>
        </div>
        {writeScore!==null&&<div style={{padding:"5px 14px",background:writeScore>=85?"#FFF5EB":writeScore>=50?"#FFF8E1":"#FEF2F2",display:"flex",alignItems:"center",gap:8}}>
          <div style={{flex:1,height:8,borderRadius:4,background:"#E8E8E8",overflow:"hidden"}}><div style={{height:"100%",borderRadius:4,transition:"width 0.5s",background:writeScore>=85?"#60B246":writeScore>=50?"#FF8C42":"#E23744",width:`${writeScore}%`}}/></div>
          <span style={{fontSize:12,fontWeight:800,color:writeScore>=85?"#60B246":writeScore>=50?"#FF8C42":"#E23744"}}>{writeScore}%</span>
          <span style={{fontSize:11,fontWeight:700,color:writeScore>=85?"#60B246":writeScore>=50?"#FF8C42":"#E23744"}}>{writeScore>=85?"⭐ Perfect!":writeScore>=50?"✅ Pass!":"Keep tracing!"}</span>
          {writeOk&&<span style={{fontSize:16}}>✅</span>}
        </div>}
      </div>
      <div style={{flex:1,position:"relative",touchAction:"none",overflow:"hidden",background:"#fff"}}>
        <div style={{position:"absolute",left:36,top:0,bottom:0,width:2,background:"#FECACA",zIndex:1,pointerEvents:"none"}}/>
        <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0,backgroundImage:"repeating-linear-gradient(transparent,transparent 47px,#E8E8E8 47px,#E8E8E8 48px)",backgroundSize:"100% 48px",backgroundPosition:"0 24px"}}/>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",zIndex:0}}><span style={{fontFamily:"var(--font)",fontSize:writeNum>9?180:240,fontWeight:800,color:"rgba(0,0,0,.07)",userSelect:"none",lineHeight:1}}>{writeNum}</span></div>
        <canvas ref={cRef} style={{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:2,cursor:"crosshair",touchAction:"none"}} onPointerDown={drawStart} onPointerMove={drawMove} onPointerUp={drawEnd} onPointerLeave={drawEnd}/>
      </div>
      <div style={{display:"flex",gap:6,padding:"8px 10px",background:"#fff",borderTop:"1px solid rgba(255,255,255,.06)",flexShrink:0}}>
        <button onClick={clearPad} style={{flex:1,padding:"10px",borderRadius:12,border:"2px solid #E8E0D8",background:"transparent",color:"#2D2B3D",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"var(--font)"}}>🗑️ Clear</button>
        <button onClick={()=>speak(`${NW[writeNum]||writeNum}. ${NUM_STROKES[writeNum]||""}`,{rate:0.75,pitch:1.0})} style={{flex:1,padding:"10px",borderRadius:12,border:"2px solid #E8E0D8",background:"transparent",color:"#2D2B3D",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"var(--font)"}}>🔊 How</button>
        <button onClick={nextWrite} style={{flex:1,padding:"10px",borderRadius:12,border:"none",background:"linear-gradient(135deg,var(--green),var(--cyan))",color:"#000",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"var(--font)"}}>Next ➡️</button>
      </div>
    </div>}
    <div style={{height:90,flexShrink:0,pointerEvents:"none"}}/>{TeacherBubble}<style>{CSS}</style></div>;
  if(scr==="phonics"&&phW){const cc=WCATS[phCat]?.color||"#FF8C42";return<div style={{fontFamily:"var(--font)",height:"100vh",overflowY:"auto",overflowX:"hidden",background:"var(--bg)",maxWidth:520,margin:"0 auto",position:"relative",display:"flex",flexDirection:"column"}}><Confetti key={celebKey} active={confetti} type={celebType}/>{ptAnim&&<div style={{position:"fixed",top:20,right:20,zIndex:999,animation:"ptFly 1.5s ease-out forwards",fontFamily:"var(--font)",fontSize:28,fontWeight:800,color:"#22C55E"}}>{ptAnim}</div>}<SubHead title="Phonics" onBack={()=>{stop();pRef.current=false;setPhW(null);setPhStep("idle");}} points={prof?.points||0}/>
    {phStep!=="idle"&&<FlowSteps current={phStep} steps={PH_STEPS.filter(s=>
      s.id==="saying_word"||(s.id==="spelling"&&phModes.spelling)||(s.id==="saying_sentence"&&phModes.sentence)||(s.id==="saying_phonics"&&phModes.phonics)||(s.id==="countdown"&&phModes.speak)||(s.id==="result"&&phModes.speak)
    )}/>}
    <div style={{padding:"6px 10px"}}>
      {/* Animated Scene for phonics word */}
      {(()=>{
        const catBg={animals:"linear-gradient(180deg,#87CEEB,#90EE90,#228B22)",food:"linear-gradient(180deg,#FFECD2,#FCB69F,#FF9A9E)",nature:"linear-gradient(180deg,#87CEEB,#B0E0E6,#98FB98)",things:"linear-gradient(180deg,#FFF5EB,#C7D2FE,#A5B4FC)",colors:"linear-gradient(180deg,#FF9A9E,#FECFEF,#FBC2EB)"};
        const catEmojis={animals:["🌳","🌿","☁️","🌸","🦋"],food:["🍽️","🧑‍🍳","✨","🌟","💫"],nature:["☀️","🌈","🦋","🌺","💧"],things:["🏠","⭐","☁️","🌟","✨"],colors:["🎨","✨","🌈","💫","🎉"]};
        const bg=catBg[phCat]||catBg.things;
        const extras=catEmojis[phCat]||catEmojis.things;
        return <div style={{position:"relative",width:"100%",height:120,borderRadius:16,overflow:"hidden",background:bg,boxShadow:"inset 0 0 40px rgba(0,0,0,0.1)",...glowStyle("ph-word")}}>
          {/* Main word emoji - big, bouncing */}
          <div style={{position:"absolute",left:"50%",top:"40%",transform:"translate(-50%,-50%)",fontSize:56,zIndex:3,animation:"scene_floatBob 2s ease-in-out infinite",filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.2))"}}>{phW.img}</div>
          {/* Category ambient elements */}
          {extras.map((e,i)=><div key={i} style={{position:"absolute",left:`${15+i*18}%`,top:`${10+Math.sin(i)*20+15}%`,fontSize:20+Math.random()*12,zIndex:1,opacity:0.6,animation:`scene_${["floatBob","sway","twinkle","sparkle","cloudDrift"][i%5]} ${2+i*0.5}s ease-in-out ${i*0.3}s infinite`}}>{e}</div>)}
          {/* Word label overlay */}
          <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"24px 16px 12px",background:"linear-gradient(transparent,rgba(0,0,0,0.5))",zIndex:10,textAlign:"center"}}>
            <h2 style={{fontFamily:"var(--font)",fontSize:22,fontWeight:800,color:"#2D2B3D",letterSpacing:3,margin:0,textShadow:"0 2px 8px rgba(0,0,0,0.3)"}}>{phW.word.toUpperCase()}{phStep==="saying_word"&&<span style={{animation:"pulse 0.5s infinite",fontSize:20,marginLeft:8}}>🔊</span>}</h2>
          </div>
          {/* Sentence overlay */}
          {phStep==="saying_sentence"&&<div style={{position:"absolute",top:8,left:8,right:8,padding:"8px 14px",background:"#fff",borderRadius:14,zIndex:11,animation:"slideUp 0.3s ease-out",...glowStyle("ph-sentence")}}><span style={{fontSize:13,fontWeight:700,color:"#6C5CE7"}}>💬 {phW.sentence}</span></div>}
        </div>;
      })()}
      {/* Phoneme chips */}
      <div style={{marginTop:12,display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>{phW.ph.map((ph,i)=>{const d=gPh(ph);const act=phAI===i;return<button key={i} onClick={()=>{if(!pRef.current)speak(d.s,{rate:0.5,pitch:1.0});}} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"6px 10px 5px",borderRadius:12,border:"none",cursor:"pointer",fontFamily:"var(--font)",minWidth:46,background:act?cc:"#FFF0E0",color:act?"#fff":"#333",transform:act?"scale(1.3) translateY(-4px)":"scale(1)",boxShadow:act?`0 8px 24px ${cc}55`:"0 2px 8px rgba(0,0,0,0.04)",transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}><span style={{fontSize:16,fontWeight:900,fontFamily:"var(--font)"}}>{ph.toUpperCase()}</span><span style={{fontSize:9,fontWeight:700,color:act?"#fffc":"#999",marginTop:2}}>{d.d}</span></button>;})}</div>
      <div style={{marginTop:14}}>
        {phStep==="idle"&&<>
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8}}>
            <div style={{display:"flex",gap:4,flex:1,flexWrap:"wrap"}}>
              {phModes.spelling&&<span style={{fontSize:10,fontWeight:700,background:"#FFF5EB",color:"#16A34A",padding:"4px 8px",borderRadius:8}}>🔤 Spelling</span>}
              {phModes.phonics&&<span style={{fontSize:10,fontWeight:700,background:"#FFF5EB",color:"#16A34A",padding:"4px 8px",borderRadius:8}}>🔡 Sounds</span>}
              {phModes.sentence&&<span style={{fontSize:10,fontWeight:700,background:"#FFF5EB",color:"#16A34A",padding:"4px 8px",borderRadius:8}}>💬 Sentence</span>}
              {phModes.speak&&<span style={{fontSize:10,fontWeight:700,background:"#FFF5EB",color:"#16A34A",padding:"4px 8px",borderRadius:8}}>🎤 Speak</span>}
            </div>
            <button onClick={()=>playPh(phW)} style={{padding:"10px 20px",borderRadius:14,border:"none",color:"#2D2B3D",fontSize:14,fontWeight:800,fontFamily:"var(--font)",cursor:"pointer",background:`linear-gradient(135deg,${cc},${cc}dd)`,display:"flex",alignItems:"center",gap:6}}>🔄 Replay</button>
          </div>
        </>}
        {phStep==="saying_word"&&<Mascot mood="speaking" msg={`Listen! "${phW.word.toUpperCase()}" 🔊`}/>}
        {phStep==="spelling"&&(
          <div style={{animation:"slideUp 0.3s ease-out"}}>
            <Mascot mood="thinking" msg={spellRound===1?"Watch and listen! 🔤":spellRound===2?"Tap the letters in order! 👆":"🔤"}/>
            <div style={{padding:10,background:"#fff",borderRadius:16}}>
              <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:spellRound===2?16:0}}>
                {phW.word.toUpperCase().split('').map((letter,i)=>{
                  const st=spellStatus[i]||'waiting';
                  const isActive=activeSpellIdx===i;
                  const isTapTarget=spellRound===2 && i===tapIndex;
                  return <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                    <span style={{
                      fontSize:24,fontFamily:"var(--font)",fontWeight:800,
                      padding:"6px 10px",borderRadius:12,minWidth:36,textAlign:"center",
                      background:isActive?cc:st==='correct'?"#22C55E":st==='wrong'?"#EF4444":"#FFF0E0",
                      color:(isActive||st==='correct'||st==='wrong')?"#fff":"#ddd",
                      transform:isActive?"scale(1.2) translateY(-4px)":isTapTarget?"scale(1.1)":"scale(1)",
                      boxShadow:isActive?`0 6px 20px ${cc}55`:isTapTarget?`0 4px 16px ${cc}33`:"none",
                      transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}>{letter}</span>
                    {st==='correct'&&!isActive&&<span style={{fontSize:12}}>✅</span>}
                    {st==='wrong'&&!isActive&&<span style={{fontSize:12}}>❌</span>}
                    {isActive&&spellRound===1&&<span style={{fontSize:12,animation:"pulse 1s ease-in-out infinite"}}>👂</span>}
                    {isTapTarget&&spellRound===2&&<span style={{fontSize:12,color:cc,fontWeight:800,animation:"pulse 1s ease-in-out infinite"}}>👆</span>}
                  </div>;
                })}
              </div>
              {spellRound===2&&(
                <div>
                  <div style={{textAlign:"center",fontSize:12,fontWeight:700,color:"#6C5CE7",marginBottom:10}}>Tap each letter:</div>
                  <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                    {scrambledLetters.map((item,i)=>(
                      <button key={item.id} disabled={item.used}
                        onClick={()=>!item.used&&handleLetterTap(item.letter,i)}
                        style={{
                          fontSize:28,fontFamily:"var(--font)",fontWeight:800,
                          padding:"6px 10px",borderRadius:16,minWidth:50,
                          border:"3px solid",cursor:item.used?"default":"pointer",
                          borderColor:tapWrong===i?"#EF4444":item.used?"#ddd":cc,
                          background:tapWrong===i?"#FEE2E2":item.used?"#f9fafb":"#fff",
                          color:item.used?"#ddd":tapWrong===i?"#EF4444":"#1a1a2e",
                          transform:tapWrong===i?"scale(0.9) rotate(-5deg)":item.used?"scale(0.8)":"scale(1)",
                          opacity:item.used?0.4:1,
                          transition:"all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                          boxShadow:!item.used&&tapWrong!==i?`0 4px 12px ${cc}22`:"none"}}>{item.letter}</button>
                    ))}
                  </div>
                </div>
              )}
              {spellRound===1&&<div style={{textAlign:"center",marginTop:12,padding:"8px 14px",background:"#fff",borderRadius:12}}>
                <p style={{fontSize:13,fontWeight:700,color:"#6C5CE7"}}>👀 Watch and listen!</p>
              </div>}
            </div>
          </div>
        )}
        {phStep==="saying_sentence"&&<Mascot mood="excited" msg="Listen to this sentence! 💬"/>}
        {phStep==="saying_phonics"&&<Mascot mood="thinking" msg="Repeat after me! 🗣️"/>}
        {phStep==="countdown"&&(
          <div style={{textAlign:"center",padding:24,background:"#fff",borderRadius:24,animation:"slideUp 0.3s ease-out"}}>
            <Mascot mood="listening" msg={`Say "${phW.word.toUpperCase()}" when I say Start!`}/>
            <div style={{fontSize:48,fontFamily:"var(--font)",fontWeight:800,color:countdown>0?cc:"#22C55E",animation:"numPulse 0.5s ease-in-out infinite",marginTop:8}}>
              {countdown>0?countdown:"🎤 Start!"}
            </div>
          </div>
        )}
        {phStep==="listening"&&<ListeningBox transcript={rec.txt} onTapMic={tapMicPh} isListening={rec.on} error={rec.err} onType={typePh} expected={phW?.word||""}/>}
        {phStep==="result"&&phRes!==null&&<ResultBox acc={phAcc} result={phRes} expected={phW.word} onRetry={retryPh} onDone={()=>{setPhRes(null);const ws=WCATS[phCat]?.words||[];const idx=ws.findIndex(x=>x.word===phW?.word);const next=ws[(idx+1)%ws.length];setPhW(next);setPhStep("idle");setTimeout(()=>playPh(next),200);}} color={cc} kidName={kidName} currentPoints={prof?.points||0}/>}
      </div>
    </div><div style={{height:90,flexShrink:0,pointerEvents:"none"}}/>{TeacherBubble}<style>{CSS}</style></div>;}

  // ═══ PHONICS GRID ═══
  if(scr==="phonics")return<div style={{fontFamily:"var(--font)",height:"100vh",overflow:"auto",background:"var(--bg)",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column"}}><Particles count={8}/><SubHead title="Phonics" onBack={goHome} points={prof?.points||0}/>
    {/* Teaching mode toggles */}
    <div style={{padding:"2px 8px",background:"#fff",flexShrink:0}}>
      <div style={{fontSize:10,fontWeight:700,color:"#8E8CA3",textTransform:"uppercase",letterSpacing:0.5,marginBottom:2}}>⚙️ What to teach:</div>
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
      {[
        {key:"spelling",icon:"🔤",label:"Spelling"},
        {key:"phonics",icon:"🔡",label:"Sounds"},
        {key:"sentence",icon:"💬",label:"Sentence"},
        {key:"speak",icon:"🎤",label:"Speak"},
      ].map(m=><button key={m.key} onClick={()=>togglePhMode(m.key)} style={{
        display:"flex",alignItems:"center",gap:3,padding:"5px 10px",borderRadius:10,
        border:"none",
        background:phModes[m.key]?"linear-gradient(135deg,#00D2A0,#55EFC4)":"#F0F4FF",
        boxShadow:phModes[m.key]?"0 3px 10px rgba(0,210,160,0.2)":"none",
        color:phModes[m.key]?"#FF8C42":"#8E8CA3",
        fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)"}}><span style={{fontSize:14}}>{m.icon}</span>{m.label}{phModes[m.key]?<span style={{fontSize:10}}>✓</span>:null}</button>)}
      </div>
    </div>
    <nav style={{display:"flex",gap:8,padding:"10px 16px",overflowX:"auto",background:"#fff",borderBottom:"none",flexShrink:0}}>{Object.entries(WCATS).map(([k,d])=><button key={k} data-r="pill" onClick={()=>{sfxTap();setPhCat(k);setTeacherMood("happy");}} style={{padding:"7px 12px",borderRadius:14,border:"2px solid",borderColor:phCat===k?"transparent":"#DFE6E9",background:phCat===k?"linear-gradient(135deg,#6C5CE7,#A29BFE)":"#fff",boxShadow:phCat===k?"0 3px 12px rgba(108,92,231,0.2)":"none",color:phCat===k?"#fff":"#8E8CA3",fontSize:12,fontWeight:800,whiteSpace:"nowrap",cursor:"pointer",fontFamily:"var(--font)",flexShrink:0}}>{d.emoji} {k.charAt(0).toUpperCase()+k.slice(1)}</button>)}</nav><div style={{flex:1,overflowY:"auto",overflowX:"hidden",minHeight:0,WebkitOverflowScrolling:"touch"}}><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,padding:16}}>{WCATS[phCat]?.words.map((w,i)=>{const done=isDone("phonics",w.word);const cc=WCATS[phCat].color;return<button key={w.word} data-r="word" onClick={(e)=>{sfxTap();stop();movePandaTo("bottomRight");rec.warmUp();setPhW(w);setPhStep("idle");setTimeout(()=>playPh(w),100);}} style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",padding:"18px 10px 12px",borderRadius:20,border:"none",background:done?`linear-gradient(135deg,${cc},${cc}DD)`:"#fff",cursor:"pointer",fontFamily:"var(--font)",boxShadow:done?`0 4px 14px ${cc}30`:"var(--shadow-card)",animation:`gridPop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i*0.06}s both`}}>{done&&<span style={{position:"absolute",top:6,right:6,width:20,height:20,borderRadius:"50%",background:"#22C55E",color:"#2D2B3D",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900}}>✓</span>}<span style={{fontSize:34,animation:"none",filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.1))"}}>{w.img}</span><span style={{fontFamily:"var(--font)",fontSize:18,fontWeight:700,marginTop:4,color:done?"#fff":"#2D3436"}}>{w.word}</span><div style={{display:"flex",gap:3,marginTop:5}}>{w.ph.map((ph,j)=><span key={j} style={{fontSize:9,fontWeight:800,background:"#fff",color:"#8E8CA3",padding:"2px 7px",borderRadius:7}}>{ph}</span>)}</div></button>;})}</div></div><div style={{height:90,flexShrink:0,pointerEvents:"none"}}/>{TeacherBubble}<style>{CSS}</style></div>;

  // ═══ SHAPES ═══
  // ═══ SHAPE DETAIL ═══
  if((scr==="shapes"||scr==="learn")&&selShape){const sh=selShape;const shColor="#A855F7";return<div style={{fontFamily:"var(--font)",height:"100vh",overflowY:"auto",overflowX:"hidden",background:"var(--bg)",maxWidth:520,margin:"0 auto",position:"relative",display:"flex",flexDirection:"column"}}><Confetti key={celebKey} active={confetti} type={celebType}/>{ptAnim&&<div style={{position:"fixed",top:20,right:20,zIndex:999,animation:"ptFly 1.5s ease-out forwards",fontFamily:"var(--font)",fontSize:28,fontWeight:800,color:"#22C55E"}}>{ptAnim}</div>}<SubHead title={sh.name} onBack={()=>{stop();pRef.current=false;setSelShape(null);setShStep("idle");if(prevScrRef.current==="learn")setScr("learn");}} points={prof?.points||0}/>
    {shStep!=="idle"&&<FlowSteps current={shStep} steps={PH_STEPS}/>}
    <div style={{padding:"6px 10px"}}>
      {/* Animated Scene */}
      {sh.scene&&<div style={{position:"relative",width:"100%",height:120,borderRadius:16,overflow:"hidden",background:sh.scene.bg,boxShadow:"inset 0 0 40px rgba(0,0,0,0.1)",...glowStyle("shape-display")}}>
        {sh.scene.elements.map((el,i)=><div key={i} style={{position:"absolute",left:`${el.x}%`,top:`${el.y}%`,transform:"translate(-50%,-50%)",fontSize:el.size,zIndex:2,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.2))",animation:el.anim!=="none"?`scene_${el.anim} ${el.dur}s ease-in-out ${el.delay||0}s infinite`:"none"}}>{el.emoji}</div>)}
        {shStep==="saying_sentence"&&<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px 16px 10px",background:"linear-gradient(transparent,rgba(0,0,0,0.6))",zIndex:10,...glowStyle("shape-sentence")}}><p style={{color:"#2D2B3D",fontSize:13,fontWeight:700,textAlign:"center"}}>💬 {sh.sentence}</p></div>}
      </div>}
      <div style={{textAlign:"center",marginTop:4}}><span style={{fontSize:30}}>{sh.emoji}</span><div style={{fontFamily:"var(--font)",fontSize:18,fontWeight:700,textTransform:"capitalize"}}>{sh.name}</div>{sh.sides>0&&<span style={{fontSize:12,fontWeight:700,background:"#fff",color:"#6C5CE7",padding:"4px 12px",borderRadius:10}}>{sh.sides} sides</span>}</div>
      {sh.ph&&(shStep==="saying_phonics"||shStep==="idle")&&<div style={{marginTop:6,background:"#fff",borderRadius:14,padding:8}}><div style={{fontSize:11,fontWeight:700,color:"#8E8CA3",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🗣️ Say each sound</div><div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>{sh.ph.map((ph,i)=>{const d=gPh(ph);const act=shAI===i;return<button key={i} onClick={()=>{if(!pRef.current)speak(d.s,{rate:0.5,pitch:1.0});}} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"6px 10px 5px",borderRadius:12,border:"none",cursor:"pointer",fontFamily:"var(--font)",minWidth:44,background:act?shColor:"#FFF0E0",color:act?"#fff":"#333",transform:act?"scale(1.3) translateY(-4px)":"scale(1)",transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}><span style={{fontSize:16,fontWeight:900,fontFamily:"var(--font)"}}>{ph.toUpperCase()}</span><span style={{fontSize:9,fontWeight:700,color:act?"#fffc":"#999",marginTop:2}}>{d.d}</span></button>;})}</div></div>}
      <div style={{marginTop:12}}>
        {shStep==="idle"&&<div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#fff",borderRadius:14,flex:1}}><span style={{fontSize:12,fontWeight:700,color:speakMode?"#22C55E":"#999"}}>🎤</span><button onClick={()=>setSpeakMode(!speakMode)} style={{width:40,height:22,borderRadius:11,border:"none",cursor:"pointer",background:speakMode?"#22C55E":"#ddd",position:"relative",transition:"background 0.3s"}}><div style={{width:18,height:18,borderRadius:9,background:"#fff",position:"absolute",top:2,left:speakMode?20:2,transition:"left 0.3s"}}/></button><span style={{fontSize:11,color:"#8E8CA3",fontWeight:600}}>{speakMode?"ON":"OFF"}</span></div><button onClick={()=>playShape(sh)} style={{padding:"10px 20px",borderRadius:14,border:"none",color:"#2D2B3D",fontSize:14,fontWeight:800,fontFamily:"var(--font)",cursor:"pointer",background:`linear-gradient(135deg,${shColor},${shColor}dd)`,display:"flex",alignItems:"center",gap:6}}>🔄 Replay</button></div>}
        {shStep==="saying_word"&&<Mascot mood="speaking" msg={`This is a ${sh.name}! 🔊`}/>}
        {shStep==="spelling"&&<div data-owl="spell-area" style={{animation:"slideUp 0.3s ease-out"}}><Mascot mood="thinking" msg={spellRound===1?"Watch and listen! 🔤":spellRound===2?"Tap the letters! 👆":"🔤"}/><div style={{padding:10,background:"#fff",borderRadius:16}}><div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:spellRound===2?16:0}}>{sh.name.toUpperCase().split('').map((letter,i)=>{const st=spellStatus[i]||'waiting';const isActive=activeSpellIdx===i;const isTap=spellRound===2&&i===tapIndex;return<div key={i} data-owl={isActive?"spell-letter":undefined} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><span style={{fontSize:32,fontFamily:"var(--font)",fontWeight:800,padding:"10px 14px",borderRadius:16,minWidth:44,textAlign:"center",background:isActive?shColor:st==='correct'?"#22C55E":st==='wrong'?"#EF4444":"#FFF0E0",color:(isActive||st==='correct'||st==='wrong')?"#fff":"#ddd",transform:isActive?"scale(1.2) translateY(-4px)":"scale(1)"}}>{letter}</span>{st==='correct'&&!isActive&&<span style={{fontSize:12}}>✅</span>}{isTap&&<span style={{fontSize:12,animation:"pulse 1s infinite"}}>👆</span>}</div>;})}</div>{spellRound===2&&<div><div style={{textAlign:"center",fontSize:12,fontWeight:700,color:"#6C5CE7",marginBottom:10}}>Tap each letter:</div><div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>{scrambledLetters.map((item,i)=><button key={item.id} disabled={item.used} onClick={()=>!item.used&&handleLetterTap(item.letter,i)} style={{fontSize:28,fontFamily:"var(--font)",fontWeight:800,padding:"6px 10px",borderRadius:16,border:"3px solid",borderColor:tapWrong===i?"#EF4444":item.used?"#ddd":"#FF8C42",background:tapWrong===i?"#FEE2E2":item.used?"#f9fafb":"#fff",color:item.used?"#ddd":"#1a1a2e",opacity:item.used?0.4:1,cursor:item.used?"default":"pointer"}}>{item.letter}</button>)}</div></div>}{spellRound===1&&<div style={{textAlign:"center",marginTop:12,padding:"8px",background:"#fff",borderRadius:12}}><p style={{fontSize:13,fontWeight:700,color:"#6C5CE7"}}>👀 Watch and listen!</p></div>}</div></div>}
        {shStep==="saying_sentence"&&<Mascot mood="excited" msg="Listen! 💬"/>}
        {shStep==="saying_phonics"&&<Mascot mood="thinking" msg="How to speak this word... 🔡"/>}
        {shStep==="countdown"&&<div style={{textAlign:"center",padding:24,background:"#fff",borderRadius:24,animation:"slideUp 0.3s ease-out"}}><div style={{fontSize:48,fontFamily:"var(--font)",fontWeight:800,color:countdown>0?shColor:"#22C55E",animation:"numPulse 0.5s ease-in-out infinite"}}>{countdown>0?countdown:"🎤 Go!"}</div></div>}
        {shStep==="listening"&&<ListeningBox transcript={rec.txt} onTapMic={()=>rec.start(handleShResult)} isListening={rec.on} error={rec.err} onType={(t)=>handleShResult(t)} expected={sh.name}/>}
        {shStep==="result"&&shRes!==null&&<ResultBox acc={shAcc} result={shRes} expected={sh.name} onRetry={retryShape} onDone={()=>{setShRes(null);const idx=SHAPES.findIndex(x=>x.name===sh.name);const next=SHAPES[(idx+1)%SHAPES.length];setSelShape(next);setShStep("idle");setTimeout(()=>playShape(next),200);}} color={shColor} kidName={kidName} currentPoints={prof?.points||0}/>}
      </div>
    </div><div style={{height:90,flexShrink:0,pointerEvents:"none"}}/>{TeacherBubble}<style>{CSS}</style></div>;}

  // ═══ SHAPES GRID ═══
  if(scr==="shapes")return<div style={{fontFamily:"var(--font)",height:"100vh",overflowY:"auto",overflowX:"hidden",background:"var(--bg)",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column"}}><Particles count={8} emojis={["🔷","🔺","⭐","💎","❤️"]}/><SubHead title="Shapes" onBack={goHome} points={prof?.points||0}/><div style={{flex:1,overflow:"auto",minHeight:0,WebkitOverflowScrolling:"touch"}}><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14,padding:16}}>{SHAPES.map((s,i)=>{const done=isDone("shapes",s.name);return<button key={s.name} data-r="shape" onClick={(e)=>{sfxTap();stop();movePandaTo("bottomRight");rec.warmUp();setSelShape(s);setShStep("idle");setTimeout(()=>playShape(s),100);}} style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",padding:24,borderRadius:22,border:"none",background:done?"linear-gradient(135deg,#A29BFE,#6C5CE7)":"linear-gradient(145deg,#fff,#F8FAFF)",cursor:"pointer",fontFamily:"var(--font)",boxShadow:done?"0 4px 14px rgba(108,92,231,0.25)":"var(--shadow-card)",animation:`gridPop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i*0.1}s both`}}>{done&&<span style={{position:"absolute",top:6,right:6,width:20,height:20,borderRadius:"50%",background:"#22C55E",color:"#2D2B3D",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900}}>✓</span>}<span style={{fontSize:48,animation:"none",filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.1))"}}>{s.emoji}</span><span style={{fontFamily:"var(--font)",fontSize:16,fontWeight:700,marginTop:6,textTransform:"capitalize",color:done?"#fff":"#2D3436"}}>{s.name}</span><span style={{fontSize:11,color:done?"rgba(255,255,255,0.8)":"#A4B0BE",fontWeight:600}}>{s.desc}</span></button>;})}</div></div><div style={{height:90,flexShrink:0,pointerEvents:"none"}}/>{TeacherBubble}<style>{CSS}</style></div>;


  // ═══ COLORS ═══
  // ═══ COLOR DETAIL ═══
  if((scr==="colors"||scr==="learn")&&selColor){const co=selColor;return<div style={{fontFamily:"var(--font)",height:"100vh",overflowY:"auto",overflowX:"hidden",background:"var(--bg)",maxWidth:520,margin:"0 auto",position:"relative",display:"flex",flexDirection:"column"}}><Confetti key={celebKey} active={confetti} type={celebType}/>{ptAnim&&<div style={{position:"fixed",top:20,right:20,zIndex:999,animation:"ptFly 1.5s ease-out forwards",fontFamily:"var(--font)",fontSize:28,fontWeight:800,color:"#22C55E"}}>{ptAnim}</div>}<SubHead title={co.name} onBack={()=>{stop();pRef.current=false;setSelColor(null);setCoStep("idle");if(prevScrRef.current==="learn")setScr("learn");}} points={prof?.points||0}/>
    {coStep!=="idle"&&<FlowSteps current={coStep} steps={PH_STEPS}/>}
    <div style={{padding:"6px 10px"}}>
      {/* Animated Scene */}
      {co.scene&&<div style={{position:"relative",width:"100%",height:120,borderRadius:16,overflow:"hidden",background:co.scene.bg,boxShadow:"inset 0 0 40px rgba(0,0,0,0.1)",...glowStyle("color-display")}}>
        {co.scene.elements.map((el,i)=><div key={i} style={{position:"absolute",left:`${el.x}%`,top:`${el.y}%`,transform:"translate(-50%,-50%)",fontSize:el.size,zIndex:2,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.2))",animation:el.anim!=="none"?`scene_${el.anim} ${el.dur}s ease-in-out ${el.delay||0}s infinite`:"none"}}>{el.emoji}</div>)}
        {coStep==="saying_sentence"&&<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px 16px 10px",background:"linear-gradient(transparent,rgba(0,0,0,0.6))",zIndex:10,...glowStyle("color-sentence")}}><p style={{color:"#2D2B3D",fontSize:13,fontWeight:700,textAlign:"center"}}>💬 {co.sentence}</p></div>}
      </div>}
      <div style={{textAlign:"center",marginTop:4}}><div style={{width:50,height:50,borderRadius:16,background:co.hex,margin:"0 auto 8px",boxShadow:`0 8px 24px ${co.hex}44`}}/><div style={{fontFamily:"var(--font)",fontSize:18,fontWeight:700,textTransform:"capitalize"}}>{co.name}</div><div style={{display:"flex",gap:6,justifyContent:"center",marginTop:6}}>{co.things.map((t,j)=><span key={j} style={{fontSize:11,fontWeight:700,background:"#fff",color:"#6C5CE7",padding:"4px 10px",borderRadius:8}}>{t}</span>)}</div></div>
      {co.ph&&(coStep==="saying_phonics"||coStep==="idle")&&<div style={{marginTop:6,background:"#fff",borderRadius:14,padding:8}}><div style={{fontSize:11,fontWeight:700,color:"#8E8CA3",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🗣️ Say each sound</div><div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>{co.ph.map((ph,i)=>{const d=gPh(ph);const act=coAI===i;return<button key={i} onClick={()=>{if(!pRef.current)speak(d.s,{rate:0.5,pitch:1.0});}} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"6px 10px 5px",borderRadius:12,border:"none",cursor:"pointer",fontFamily:"var(--font)",minWidth:44,background:act?co.hex:"#FFF0E0",color:act?"#fff":"#333",transform:act?"scale(1.3) translateY(-4px)":"scale(1)",transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}><span style={{fontSize:16,fontWeight:900,fontFamily:"var(--font)"}}>{ph.toUpperCase()}</span><span style={{fontSize:9,fontWeight:700,color:act?"#fffc":"#999",marginTop:2}}>{d.d}</span></button>;})}</div></div>}
      <div style={{marginTop:12}}>
        {coStep==="idle"&&<div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#fff",borderRadius:14,flex:1}}><span style={{fontSize:12,fontWeight:700,color:speakMode?"#22C55E":"#999"}}>🎤</span><button onClick={()=>setSpeakMode(!speakMode)} style={{width:40,height:22,borderRadius:11,border:"none",cursor:"pointer",background:speakMode?"#22C55E":"#ddd",position:"relative",transition:"background 0.3s"}}><div style={{width:18,height:18,borderRadius:9,background:"#fff",position:"absolute",top:2,left:speakMode?20:2,transition:"left 0.3s"}}/></button><span style={{fontSize:11,color:"#8E8CA3",fontWeight:600}}>{speakMode?"ON":"OFF"}</span></div><button onClick={()=>playColor(co)} style={{padding:"10px 20px",borderRadius:14,border:"none",color:"#2D2B3D",fontSize:14,fontWeight:800,fontFamily:"var(--font)",cursor:"pointer",background:`linear-gradient(135deg,${co.hex},${co.hex}dd)`,display:"flex",alignItems:"center",gap:6}}>🔄 Replay</button></div>}
        {coStep==="saying_word"&&<Mascot mood="speaking" msg={`This color is ${co.name}! 🔊`}/>}
        {coStep==="spelling"&&<div data-owl="spell-area" style={{animation:"slideUp 0.3s ease-out"}}><Mascot mood="thinking" msg={spellRound===1?"Watch and listen! 🔤":spellRound===2?"Tap the letters! 👆":"🔤"}/><div style={{padding:10,background:"#fff",borderRadius:16}}><div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:spellRound===2?16:0}}>{co.name.toUpperCase().split('').map((letter,i)=>{const st=spellStatus[i]||'waiting';const isActive=activeSpellIdx===i;const isTap=spellRound===2&&i===tapIndex;return<div key={i} data-owl={isActive?"spell-letter":undefined} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><span style={{fontSize:32,fontFamily:"var(--font)",fontWeight:800,padding:"10px 14px",borderRadius:16,minWidth:44,textAlign:"center",background:isActive?co.hex:st==='correct'?"#22C55E":st==='wrong'?"#EF4444":"#FFF0E0",color:(isActive||st==='correct'||st==='wrong')?"#fff":"#ddd",transform:isActive?"scale(1.2) translateY(-4px)":"scale(1)"}}>{letter}</span>{st==='correct'&&!isActive&&<span style={{fontSize:12}}>✅</span>}{isTap&&<span style={{fontSize:12,animation:"pulse 1s infinite"}}>👆</span>}</div>;})}</div>{spellRound===2&&<div><div style={{textAlign:"center",fontSize:12,fontWeight:700,color:"#6C5CE7",marginBottom:10}}>Tap each letter:</div><div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>{scrambledLetters.map((item,i)=><button key={item.id} disabled={item.used} onClick={()=>!item.used&&handleLetterTap(item.letter,i)} style={{fontSize:28,fontFamily:"var(--font)",fontWeight:800,padding:"6px 10px",borderRadius:16,border:"3px solid",borderColor:tapWrong===i?"#EF4444":item.used?"#ddd":co.hex,background:tapWrong===i?"#FEE2E2":item.used?"#f9fafb":"#fff",color:item.used?"#ddd":"#1a1a2e",opacity:item.used?0.4:1,cursor:item.used?"default":"pointer"}}>{item.letter}</button>)}</div></div>}{spellRound===1&&<div style={{textAlign:"center",marginTop:12,padding:"8px",background:"#fff",borderRadius:12}}><p style={{fontSize:13,fontWeight:700,color:"#6C5CE7"}}>👀 Watch and listen!</p></div>}</div></div>}
        {coStep==="saying_sentence"&&<Mascot mood="excited" msg="Listen! 💬"/>}
        {coStep==="saying_phonics"&&<Mascot mood="thinking" msg="How to speak this word... 🔡"/>}
        {coStep==="countdown"&&<div style={{textAlign:"center",padding:24,background:"#fff",borderRadius:24}}><div style={{fontSize:48,fontFamily:"var(--font)",fontWeight:800,color:countdown>0?co.hex:"#22C55E",animation:"numPulse 0.5s ease-in-out infinite"}}>{countdown>0?countdown:"🎤 Go!"}</div></div>}
        {coStep==="listening"&&<ListeningBox transcript={rec.txt} onTapMic={()=>rec.start(handleCoResult)} isListening={rec.on} error={rec.err} onType={(t)=>handleCoResult(t)} expected={co.name}/>}
        {coStep==="result"&&coRes!==null&&<ResultBox acc={coAcc} result={coRes} expected={co.name} onRetry={retryColor} onDone={()=>{setCoRes(null);const idx=COLORSDATA.findIndex(x=>x.name===co.name);const next=COLORSDATA[(idx+1)%COLORSDATA.length];setSelColor(next);setCoStep("idle");setTimeout(()=>playColor(next),200);}} color={co.hex} kidName={kidName} currentPoints={prof?.points||0}/>}
      </div>
    </div><div style={{height:90,flexShrink:0,pointerEvents:"none"}}/>{TeacherBubble}<style>{CSS}</style></div>;}

  // ═══ COLORS GRID ═══
  if(scr==="colors")return<div style={{fontFamily:"var(--font)",height:"100vh",overflowY:"auto",overflowX:"hidden",background:"var(--bg)",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column"}}><Particles count={8} emojis={["🌈","🎨","🖍️","✨"]}/><SubHead title="Colors" onBack={goHome} points={prof?.points||0}/><div style={{flex:1,overflow:"auto",minHeight:0,WebkitOverflowScrolling:"touch"}}><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14,padding:16}}>{COLORSDATA.map((c,i)=>{const done=isDone("colors",c.name);return<button key={c.name} onClick={(e)=>{stop();movePandaTo("bottomRight");rec.warmUp();setSelColor(c);setCoStep("idle");setTimeout(()=>playColor(c),100);}} style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",padding:22,borderRadius:22,border:["#F5F5F5","#C0C0C0","#9CA3AF","#FFD700","#EAB308"].includes(c.hex)?"2px solid #DFE6E9":"none",background:`linear-gradient(145deg,${c.hex},${c.hex}CC)`,cursor:"pointer",fontFamily:"var(--font)",animation:`gridPop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i*0.1}s both`,boxShadow:`0 4px 14px ${c.hex}33`}}>{done&&<span style={{position:"absolute",top:6,right:6,width:20,height:20,borderRadius:"50%",background:"#fff",color:"#22C55E",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900,boxShadow:"0 2px 4px rgba(0,0,0,0.15)"}}>✓</span>}<div style={{width:48,height:48,borderRadius:14,background:["#F5F5F5","#C0C0C0","#9CA3AF","#FFD700","#EAB308"].includes(c.hex)?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.25)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,marginBottom:4}}>{c.emoji}</div><span style={{fontFamily:"var(--font)",fontSize:15,fontWeight:700,textTransform:"capitalize",color:["#F5F5F5","#C0C0C0","#9CA3AF","#FFD700","#EAB308"].includes(c.hex)?"#2D3436":"#fff",textShadow:["#F5F5F5","#C0C0C0","#9CA3AF","#FFD700","#EAB308"].includes(c.hex)?"none":"0 1px 3px rgba(0,0,0,0.2)"}}>{c.name}</span></button>;})}</div></div><div style={{height:90,flexShrink:0,pointerEvents:"none"}}/>{TeacherBubble}<style>{CSS}</style></div>;




  // ═══ ALPHABET ═══
  if(scr==="alphabet")return<div style={{fontFamily:"var(--font)",height:"100vh",overflow:"hidden",background:"var(--bg)",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column"}}><Confetti key={celebKey} active={confetti} type={celebType}/>
    <SubHead title="ABC 🔠" onBack={()=>{stop();pRef.current=false;alphaRef.current="";setSelLetter(null);if(prevScrRef.current==="learn")setScr("learn");else goHome();}} points={prof?.points||0}/>
    {/* Tab bar */}
    <div style={{display:"flex",gap:6,padding:"6px 10px",background:"#fff",borderBottom:"none"}}>
      {[{id:"caps",label:"🔤 CAPITAL"},{id:"small",label:"🔡 small"}].map(t=>
        <button key={t.id} onClick={()=>{stop();movePandaTo("bottomRight");setTeacherMood("happy");setAlphaTab(t.id);setSelLetter(null);}}
          style={{flex:1,padding:"10px 6px",borderRadius:14,border:"none",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"var(--font)",
            background:alphaTab===t.id?"#FF8C42":"#EDE5DC",color:alphaTab===t.id?"#fff":"#8E8CA3"}}>{t.label}</button>
      )}
    </div>

    {/* ═══ LETTER DETAIL OVERLAY ═══ */}
    {selLetter&&<div data-owl="letter-detail" style={{position:"absolute",inset:0,background:"rgba(255,255,255,.97)",zIndex:30,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,animation:"fadeIn 0.3s",padding:20}}>
      <button onClick={closeLetter} style={{position:"absolute",top:12,right:16,padding:"8px 14px",borderRadius:12,border:"2px solid #E8E0D8",background:"#fff",fontSize:13,fontWeight:800,cursor:"pointer"}}>✕ Close</button>
      <div style={{fontSize:80,fontFamily:"var(--font)",fontWeight:900,color:ALPHA_COLORS[ALPHA_LETTERS.indexOf(selLetter)%13],lineHeight:1,animation:"numPulse 1.5s ease-in-out infinite",...glowStyle("letter-big")}}>{selLetter}{selLetter.toLowerCase()}</div>
      <div style={{fontSize:18,fontWeight:800,color:"#2D2B3D",marginTop:4,...glowStyle("letter-sound")}}>"{ALPHA_DATA[selLetter]?.ph}" sound</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",marginTop:8}}>
        {ALPHA_DATA[selLetter]?.examples.map((ex,i)=>
          <button key={i} onClick={()=>speak(`${selLetter} for ${ex.w}!`,{rate:0.85,pitch:1.0})} style={{
            display:"flex",flexDirection:"column",alignItems:"center",padding:"12px 14px",borderRadius:16,
            border:"2px solid #E8E0D8",background:"#fff",cursor:"pointer",minWidth:80,
            animation:`gridPop 0.3s ease ${i*0.08}s both`,
            ...glowStyle("letter-ex-"+i)
          }}>
            <span style={{fontSize:32}}>{ex.e}</span>
            <span style={{fontSize:12,fontWeight:800,color:"#2D2B3D",marginTop:4}}>{selLetter} for {ex.w}</span>
          </button>
        )}
      </div>
      <div style={{display:"flex",gap:10,marginTop:12}}>
        <button onClick={()=>{stop();playLetter(selLetter);}} style={{flex:1,padding:"12px 20px",borderRadius:16,border:"none",background:"linear-gradient(135deg,#6C5CE7,#A29BFE)",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer"}}>🔊 Again</button>
        <button onClick={()=>{const idx=ALPHA_LETTERS.indexOf(selLetter);const next=ALPHA_LETTERS[(idx+1)%26];pRef.current=true;setSelLetter(next);playLetter(next);}} style={{flex:1,padding:"12px 20px",borderRadius:16,border:"none",background:"linear-gradient(135deg,#6C5CE7,#A29BFE)",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer"}}>Next ➡️</button>
      </div>
    </div>}

    {/* ═══ CAPITAL LETTERS TAB ═══ */}
    {alphaTab==="caps"&&!selLetter&&<div style={{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",padding:"10px 12px"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
        {ALPHA_LETTERS.map((l,i)=>
          <button key={l} onClick={(e)=>{stop();movePandaTo("bottomRight");pRef.current=true;playLetter(l);}} style={{
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
            padding:"10px 4px",borderRadius:14,border:"2px solid #E8E0D8",cursor:"pointer",
            background:"#fff",boxShadow:"var(--shadow-card)",
            animation:`gridPop 0.2s ease ${i*0.02}s both`
          }}>
            <span style={{fontSize:24,fontWeight:900,color:ALPHA_COLORS[i%13]}}>{l}</span>
            <span style={{fontSize:10,fontWeight:700,color:"#8E8CA3"}}>{ALPHA_DATA[l]?.examples[0]?.e||""}</span>
          </button>
        )}
      </div>
    </div>}

    {/* ═══ SMALL LETTERS TAB ═══ */}
    {alphaTab==="small"&&!selLetter&&<div style={{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",padding:"10px 12px"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
        {ALPHA_LETTERS.map((l,i)=>
          <button key={l} onClick={(e)=>{stop();movePandaTo("bottomRight");pRef.current=true;playLetter(l);}} style={{
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
            padding:"10px 4px",borderRadius:14,border:"2px solid #E8E0D8",cursor:"pointer",
            background:"#fff",boxShadow:"var(--shadow-card)",
            animation:`gridPop 0.2s ease ${i*0.02}s both`
          }}>
            <span style={{fontSize:24,fontWeight:900,color:ALPHA_COLORS[i%13]}}>{l.toLowerCase()}</span>
            <span style={{fontSize:10,fontWeight:700,color:"#8E8CA3"}}>{ALPHA_DATA[l]?.examples[0]?.e||""}</span>
          </button>
        )}
      </div>
    </div>}

    {/* ═══ MATCH GAME TAB ═══ */}
    {alphaTab==="match"&&!selLetter&&<div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",padding:"10px 14px"}}>
      {/* Mode selector */}
      <div style={{display:"flex",gap:6,marginBottom:10}}>
        {[{id:"findSmall",label:"A→a"},{id:"findCaps",label:"a→A"},{id:"voiceQuiz",label:"🔊 Listen"}].map(m=>
          <button key={m.id} onClick={()=>{stop();setTeacherMood("excited");startMatch(m.id);}} style={{
            flex:1,padding:"6px 2px",borderRadius:10,border:"2px solid",fontSize:12,fontWeight:700,
            cursor:"pointer",fontFamily:"var(--font)",
            borderColor:matchMode===m.id?"#FF8C42":"#E8E0D8",
            background:matchMode===m.id?"#FF8C42":"#FFFBF5",
            color:matchMode===m.id?"#fff":"#8E8CA3"}}>{m.label}</button>
        )}
      </div>
      {/* Current letter prompt */}
      <div style={{textAlign:"center",padding:"10px",background:"linear-gradient(135deg,#FFF5EB,#FFF5EB)",borderRadius:16,marginBottom:10}}>
        {matchIdx<matchPairs.length?<>
          <div style={{fontSize:12,fontWeight:700,color:"#8E8CA3"}}>
            {matchMode==="findSmall"?"Find the small letter for:":matchMode==="findCaps"?"Find the CAPITAL for:":"Which letter did you hear?"}
          </div>
          {matchMode==="voiceQuiz"?
            <div style={{marginTop:6}}>
              <button onClick={()=>speak(`${matchPairs[matchIdx]?.cap}`,{rate:0.65,pitch:1.0})} style={{
                fontSize:16,fontWeight:700,fontFamily:"var(--font)",
                background:"linear-gradient(135deg,#FF8C42,#FFB066)",border:"none",borderRadius:16,
                padding:"12px 24px",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",gap:8,margin:"0 auto"
              }}>🔊 Hear Again</button>
            </div>:
            <div style={{fontSize:56,fontWeight:900,color:"#6C5CE7",fontFamily:"var(--font)",lineHeight:1,animation:"numPulse 1.5s ease-in-out infinite"}}>
              {matchMode==="findCaps"?(matchPairs[matchIdx]?.cap||"").toLowerCase():(matchPairs[matchIdx]?.cap||"")}
            </div>
          }
          <div style={{fontSize:14,fontWeight:800,color:"#6C5CE7",marginTop:4}}>🏆 {matchScore}/8</div>
        </>:<>
          <div style={{fontSize:36}}>🎉</div>
          <div style={{fontSize:18,fontWeight:800,color:"#6C5CE7"}}>All Done! {matchScore}/{matchPairs.length} correct</div>
          <button onClick={()=>{stop();startMatch();}} style={{marginTop:8,padding:"10px 24px",borderRadius:14,border:"none",background:"#FF8C42",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer"}}>🔄 Play Again</button>
        </>}
      </div>
      {/* Answer options */}
      {matchIdx<matchPairs.length&&matchOpts.length>0&&<div style={{display:"grid",gridTemplateColumns:matchMode==="voiceQuiz"?"repeat(3,1fr)":"repeat(5,1fr)",gap:10}}>
        {matchOpts.map((l,i)=>{
          const isWrong=matchWrong===l;
          const isCorrect=matchCorrect===l||matchCorrect===l.toUpperCase()||matchCorrect===l.toLowerCase();
          const displayLetter=matchMode==="findCaps"?l.toUpperCase():matchMode==="voiceQuiz"?l.toUpperCase():l.toLowerCase();
          return<button key={"m"+l+matchIdx+matchMode} data-r="quiz" onClick={()=>{sfxTap();onMatchTap(l);}} style={{
            padding:matchMode==="voiceQuiz"?"20px 6px":"16px 6px",borderRadius:18,border:"3px solid",cursor:"pointer",
            borderColor:isWrong?"#FF6B81":isCorrect?"#00D2A0":"transparent",
            background:isWrong?"linear-gradient(135deg,#FF6B81,#EE5A6F)":isCorrect?"linear-gradient(135deg,#00D2A0,#55EFC4)":"linear-gradient(135deg,#6C5CE7,#A29BFE)",
            fontSize:matchMode==="voiceQuiz"?36:30,fontWeight:900,
            color:isWrong?"#F87171":isCorrect?"#4ADE80":"#2D2B3D",
            fontFamily:"var(--font)",
            transform:isCorrect?"scale(1.2)":isWrong?"scale(0.9)":"scale(1)",
            animation:`gridPop 0.3s ease ${i*0.06}s both`,
            boxShadow:isCorrect?"0 6px 20px rgba(0,210,160,.3)":isWrong?"0 4px 16px rgba(255,107,129,.25)":"0 4px 14px rgba(108,92,231,.2)"
          }}>{displayLetter}</button>;
        })}
      </div>}
    </div>}
    <div style={{height:90,flexShrink:0,pointerEvents:"none"}}/>{TeacherBubble}<style>{CSS}</style>
  </div>;

  // ═══ BASICS DASHBOARD ═══
  if(scr==="basics")return<div style={{fontFamily:"var(--font)",height:"100vh",overflow:"hidden",background:"var(--bg)",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column"}}>
    <Confetti key={celebKey} active={confetti} type={celebType}/>
    <SubHead title="Basics 🧩" onBack={goHome} points={prof?.points||0}/>
    {/* 4 Tab bar */}
    <div style={{display:"flex",gap:3,padding:"2px 6px",background:"#fff",flexShrink:0}}>
      {[{id:"explore",label:"🔢 Numbers"},{id:"quiz",label:"🎯 Quiz"},{id:"write",label:"✏️ Write"}].map(t=>
        <button key={t.id} onClick={()=>{
          stop();movePandaTo("bottomRight");setTeacherMood("happy");setBasicsTab(t.id);
          if(t.id==="quiz"){if(!quizNum)newQuiz();}
          if(t.id==="write")
          if(t.id==="explore")
          if(t.id==="write"){setTimeout(()=>{initCanvas();speak(`Write ${NW[writeNum]||writeNum}.`,{rate:0.75,pitch:1.0});},500);}
        }} style={{flex:1,padding:"11px 6px",borderRadius:14,border:"none",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"var(--font)",
          background:basicsTab===t.id?"#FF8C42":"#FFF0E0",color:basicsTab===t.id?"#fff":"#888"}}>{t.label}</button>
      )}
    </div>

    {/* ═══ EXPLORE: Simple number grid — tap to hear ═══ */}
    {basicsTab==="explore"&&<div data-owl="explore-grid" style={{flex:1,overflowY:"auto",overflowX:"hidden",display:"flex",flexDirection:"column",minHeight:0,WebkitOverflowScrolling:"touch"}}>
      {/* Range filter + spelling toggle */}
      <div style={{display:"flex",gap:5,padding:"8px 10px",flexWrap:"wrap",flexShrink:0}}>
        {NUM_RANGES.map(r=><button key={r} onClick={()=>setNumRange(r)} style={{
          padding:"5px 10px",borderRadius:10,border:"2px solid",whiteSpace:"nowrap",
          borderColor:numRange===r?"#FF8C42":"#E8E0D8",
          background:numRange===r?"#FF8C42":"#FFFBF5",
          color:numRange===r?"#fff":"#8E8CA3",fontSize:11,fontWeight:700,
          cursor:"pointer",fontFamily:"var(--font)",flexShrink:0
        }}>{r}</button>)}
        <div style={{display:"flex",alignItems:"center",gap:4,padding:"3px 8px",background:"#fff",borderRadius:10,flexShrink:0}}>
          <span style={{fontSize:10,fontWeight:700,color:numSpelling?"#22C55E":"#999"}}>Abc</span>
          <button onClick={()=>setNumSpelling(!numSpelling)} style={{width:30,height:16,borderRadius:8,border:"none",cursor:"pointer",background:numSpelling?"#22C55E":"#ddd",position:"relative"}}>
            <div style={{width:12,height:12,borderRadius:6,background:"#fff",position:"absolute",top:2,left:numSpelling?16:2,transition:"left 0.3s"}}/>
          </button>
        </div>
      </div>
      {/* Number grid */}
      <div style={{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",padding:"6px 10px"}}>{(()=>{const{min,max}=getNumRange();const count=max-min+1;const cols=count<=10?3:count<=20?4:5;return<div style={{display:"grid",gridTemplateColumns:`repeat(${cols},1fr)`,gap:count<=10?10:6,width:"100%"}}>
        {Array.from({length:count}).map((_,i)=>{const n=min+i;
          return<button key={n} onClick={()=>{stop();sayNum(n);}} style={{
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
            padding:count<=10?"14px 8px":"10px 6px",
            borderRadius:16,border:"2px solid #E8E0D8",cursor:"pointer",
            background:"#fff",boxShadow:"0 2px 8px rgba(0,0,0,.04)",fontFamily:"var(--font)",...glowStyle("num-explore-"+n)
          }}>
            <span style={{fontSize:count<=10?26:count<=20?20:16,fontWeight:800,color:nClr(n),lineHeight:1}}>{n}</span>
            {numSpelling&&<span style={{fontSize:count<=10?9:7,fontWeight:700,color:"#8E8CA3",marginTop:2}}>{NW[n]||""}</span>}
          </button>;
        })}
      </div>;})()}</div>
    </div>}

    {/* ═══ NUMBER QUIZ: Listen & tap the right number ═══ */}
    {basicsTab==="quiz"&&<div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      {/* Quiz header */}
      <div style={{padding:"12px 16px",background:"linear-gradient(135deg,#FFF5EB,#FFFBF5)",display:"flex",alignItems:"center",gap:10,borderBottom:"none"}}>
        {quizNum?<>
          <button onClick={repeatQuiz} style={{padding:"10px 18px",borderRadius:14,border:"none",background:"linear-gradient(135deg,#6C5CE7,#A29BFE)",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)",boxShadow:"var(--shadow-btn)",display:"flex",alignItems:"center",gap:6}}>
            🔊 Hear Again
          </button>
          <div style={{flex:1,textAlign:"center"}}>
            <div style={{fontFamily:"var(--font)",fontSize:16,fontWeight:700,color:"#6C5CE7"}}>Which number is it? 👂</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"var(--font)",fontSize:16,fontWeight:700,color:"#6C5CE7"}}>🏆 {quizScore}</div>
            {quizStreak>=3&&<span style={{fontSize:10,fontWeight:700,color:"#EF4444"}}>🔥{quizStreak}</span>}
          </div>
        </>:<button onClick={newQuiz} style={{width:"100%",padding:"16px",borderRadius:16,border:"none",background:"linear-gradient(135deg,#6C5CE7,#A29BFE)",color:"#fff",fontSize:18,fontWeight:700,cursor:"pointer",fontFamily:"var(--font)",boxShadow:"0 6px 20px rgba(139,92,246,.3)"}}>▶️ Start Quiz!</button>}
      </div>
      {/* Quiz options grid */}
      {quizNum&&<div style={{flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,width:"100%",maxWidth:360}}>
          {quizOpts.map((n,i)=>{
            const isCorrect=quizFb?.ok&&quizFb?.n===n;
            const isWrong=quizFb&&!quizFb.ok&&quizFb.n===n;
            return<button key={n} data-r="quiz" onClick={()=>{sfxTap();onQuizTap(n);}} style={{
              padding:"28px 10px",borderRadius:22,
              border:"3px solid",cursor:quizFb?"default":"pointer",
              borderColor:isCorrect?"#4ADE80":isWrong?"#F87171":"#E8E0D8",
              background:isCorrect?"#DCFCE7":isWrong?"#FEE2E2":"#FFFBF5",
              fontFamily:"var(--font)",
              fontSize:36,fontWeight:800,color:isCorrect?"#16A34A":isWrong?"#DC2626":nClr(n),
              boxShadow:isCorrect?"0 6px 24px rgba(74,222,128,.3)":isWrong?"0 4px 16px rgba(248,113,113,.2)":"0 3px 12px rgba(0,0,0,.06)",
              transform:isCorrect?"scale(1.15)":isWrong?"scale(0.92)":"scale(1)",
              animation:isCorrect?"numPulse 0.5s ease-in-out":"none"
            }}>{n}</button>;
          })}
        </div>
      </div>}
    </div>}


    {/* ═══ WRITE TAB: Split screen - top shows number, bottom is notepad ═══ */}
    {basicsTab==="write"&&<div data-owl="write-canvas" style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      {/* ═══ TOP: Compact reference with ruled lines ═══ */}
      <div style={{flexShrink:0,background:"#fff",borderBottom:"3px solid #FF8C42",overflow:"hidden"}}>
        <div style={{position:"relative",padding:"8px 14px",
          backgroundImage:"repeating-linear-gradient(transparent,transparent 27px,#E8E8E8 27px,#E8E8E8 28px)",
          backgroundSize:"100% 28px",backgroundPosition:"0 8px"
        }}>
          <div style={{position:"absolute",left:30,top:0,bottom:0,width:2,background:"#FECACA"}}/>
          <div style={{display:"flex",alignItems:"center",gap:10,paddingLeft:36}}>
            <span style={{fontFamily:"var(--font)",fontSize:52,fontWeight:900,color:"#6C5CE7",lineHeight:1}}>{writeNum}</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:15,color:"#2D2B3D",textTransform:"capitalize"}}>{NW[writeNum]||""} {NUM_EMOJI[writeNum]||""}</div>
              <div style={{fontSize:10,fontWeight:700,color:"#8E8CA3"}}>{NUM_STROKES[writeNum]||"Write it!"}</div>
            </div>
            <button onClick={()=>speak(`${NW[writeNum]||writeNum}. ${NUM_STROKES[writeNum]||""}`,{rate:0.75,pitch:1.0})} style={{padding:"8px 12px",borderRadius:10,border:"none",background:"#FF8C42",color:"#fff",fontSize:11,fontWeight:800,cursor:"pointer"}}>🔊</button>
          </div>
        </div>
        {writeScore!==null&&<div style={{padding:"5px 14px",background:writeScore>=85?"#FFF5EB":writeScore>=50?"#FFF8E1":"#FEF2F2",display:"flex",alignItems:"center",gap:8}}>
          <div style={{flex:1,height:8,borderRadius:4,background:"#E8E8E8",overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:4,transition:"width 0.5s",background:writeScore>=85?"#60B246":writeScore>=50?"#FF8C42":"#E23744",width:`${writeScore}%`}}/>
          </div>
          <span style={{fontSize:12,fontWeight:800,color:writeScore>=85?"#60B246":writeScore>=50?"#FF8C42":"#E23744"}}>{writeScore}%</span>
          <span style={{fontSize:11,fontWeight:700,color:writeScore>=85?"#60B246":writeScore>=50?"#FF8C42":"#E23744"}}>{writeScore>=85?"⭐ Perfect!":writeScore>=50?"✅ Pass!":"Keep tracing!"}</span>
          {writeOk&&<span style={{fontSize:16}}>✅</span>}
        </div>}
      </div>


      {/* ═══ BOTTOM HALF: Big writing canvas ═══ */}
      <div style={{flex:1,position:"relative",touchAction:"none",overflow:"hidden",background:"#fff"}}>
        {/* Red margin line */}
        <div style={{position:"absolute",left:36,top:0,bottom:0,width:2,background:"#FECACA",zIndex:1,pointerEvents:"none"}}/>
        {/* Blue ruled lines */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0,
          backgroundImage:"repeating-linear-gradient(transparent,transparent 47px,#E8E8E8 47px,#E8E8E8 48px)",
          backgroundSize:"100% 48px",backgroundPosition:"0 24px"
        }}/>
        {/* Ghost number */}
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",zIndex:0}}>
          <span style={{fontFamily:"var(--font)",fontSize:writeNum>9?180:240,fontWeight:800,color:"rgba(0,0,0,.07)",userSelect:"none",lineHeight:1}}>{writeNum}</span>
        </div>
        {/* Canvas */}
        <canvas ref={cRef}
          style={{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:2,cursor:"crosshair",touchAction:"none"}}
          onPointerDown={drawStart} onPointerMove={drawMove} onPointerUp={drawEnd} onPointerLeave={drawEnd}
        />
      </div>

      {/* Bottom controls */}
      <div style={{display:"flex",gap:6,padding:"8px 10px",background:"#fff",borderTop:"1px solid rgba(255,255,255,.06)",flexShrink:0}}>
        <button onClick={clearPad} style={{flex:1,padding:"10px",borderRadius:12,border:"2px solid #E8E0D8",background:"transparent",color:"#2D2B3D",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"var(--font)"}}>🗑️ Clear</button>
        <button onClick={()=>speak(`${NW[writeNum]||writeNum}. ${NUM_STROKES[writeNum]||""}`,{rate:0.75,pitch:1.0})} style={{flex:1,padding:"10px",borderRadius:12,border:"2px solid #E8E0D8",background:"transparent",color:"#2D2B3D",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"var(--font)"}}>🔊 How</button>
        <button onClick={nextWrite} style={{flex:1,padding:"10px",borderRadius:12,border:"none",background:"linear-gradient(135deg,var(--green),var(--cyan))",color:"#000",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"var(--font)"}}>Next ➡️</button>
      </div>
    </div>}<div style={{height:90,flexShrink:0,pointerEvents:"none"}}/>{TeacherBubble}<style>{CSS}</style>
  </div>;

  // ═══ STORIES ═══
  if(scr==="stories")return<div style={{fontFamily:"var(--font)",height:"100vh",overflow:"auto",background:"var(--bg)",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column"}}>
    <SubHead title="Stories 📖" onBack={()=>{goHome();setStoryStep("list");setStoryPicked(null);}} points={prof?.points||0}/>
    {/* STORY LIST */}
    {storyStep==="list"&&<div style={{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",padding:16}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr",gap:12}}>
        {STORIES.map((st,i)=>{const done=isDone("stories",st.id);return<button key={st.id} onClick={()=>{stop();setStoryPicked(st);setStoryStep("reading");setStoryAnswers([]);setStoryScore(0);speak(st.title,{rate:0.85});}} style={{
          display:"flex",alignItems:"center",gap:14,padding:"18px 16px",borderRadius:22,
          border:done?"2.5px solid #4ADE8044":"2px solid #E8E0D8",cursor:"pointer",
          background:done?"#F0FDF4":"#FFFBF5",textAlign:"left",
          boxShadow:"0 4px 14px rgba(0,0,0,.05)",
          animation:`gridPop 0.3s ease ${i*0.05}s both`
        }}>
          <span style={{fontSize:42,flexShrink:0}}>{st.emoji}</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:16,color:"#2D2B3D"}}>{st.title}</div>
            <div style={{fontSize:12,color:"#8E8CA3",fontWeight:500,marginTop:2}}>
              {st.level==="easy"?"⭐ Easy":st.level==="medium"?"⭐⭐ Medium":"⭐⭐⭐ Hard"}
              {done&&" · ✅ Done"}
            </div>
          </div>
          <span style={{fontSize:20,color:"#8E8CA3"}}>→</span>
        </button>;})}
      </div>
    </div>}
    {/* READING VIEW */}
    {storyStep==="reading"&&storyPicked&&<div style={{flex:1,overflowY:"auto",overflowX:"hidden",WebkitOverflowScrolling:"touch",padding:16}}>
      <div style={{textAlign:"center",marginBottom:16}}>
        <span style={{fontSize:64}}>{storyPicked.emoji}</span>
        <h2 style={{fontSize:22,fontWeight:700,color:"#2D2B3D",margin:"8px 0 4px"}}>{storyPicked.title}</h2>
        <span style={{fontSize:12,color:"#8E8CA3",fontWeight:500}}>{storyPicked.level==="easy"?"⭐ Easy":storyPicked.level==="medium"?"⭐⭐ Medium":"⭐⭐⭐ Hard"}</span>
      </div>
      <div style={{background:"#fff",borderRadius:20,padding:"20px 18px",border:"1.5px solid #FFE0C2",lineHeight:1.8,fontSize:16,fontWeight:500,color:"#2D2B3D"}}>
        {storyPicked.text}
      </div>
      <div style={{display:"flex",gap:10,marginTop:16}}>
        <button onClick={()=>{speak(storyPicked.text,{rate:0.8});}} style={{flex:1,padding:14,borderRadius:16,border:"none",background:"#3B82F6",color:"#fff",fontSize:15,fontWeight:700,cursor:"pointer"}}>🔊 Read to Me</button>
        <button onClick={()=>{stop();setStoryStep("questions");setStoryIdx(0);speak("Now answer these questions!",{rate:0.85});}} style={{flex:1,padding:14,borderRadius:16,border:"none",background:"#4ADE80",color:"#2D2B3D",fontSize:15,fontWeight:700,cursor:"pointer"}}>📝 Questions</button>
      </div>
    </div>}
    {/* QUESTIONS VIEW */}
    {storyStep==="questions"&&storyPicked&&<div style={{flex:1,overflow:"auto",padding:16}}>
      {storyIdx<storyPicked.questions.length?<div>
        <div style={{textAlign:"center",marginBottom:12}}>
          <span style={{fontSize:13,fontWeight:700,color:"#3B82F6"}}>Question {storyIdx+1} of {storyPicked.questions.length}</span>
          <div style={{width:"100%",height:6,background:"#E8E0D8",borderRadius:4,marginTop:6,overflow:"hidden"}}>
            <div style={{height:"100%",background:"#3B82F6",borderRadius:4,width:`${((storyIdx)/storyPicked.questions.length)*100}%`,transition:"width 0.5s"}}/>
          </div>
        </div>
        <div style={{background:"#DBEAFE",borderRadius:20,padding:"18px 16px",marginBottom:14,border:"1.5px solid #93C5FD"}}>
          <p style={{fontSize:17,fontWeight:700,color:"#1E40AF",textAlign:"center"}}>{storyPicked.questions[storyIdx].q}</p>
        </div>
        <div style={{display:"grid",gap:10}}>
          {storyPicked.questions[storyIdx].opts.map((opt,oi)=>{
            const answered=storyAnswers[storyIdx]!==undefined;
            const isCorrect=oi===storyPicked.questions[storyIdx].answer;
            const isPicked=storyAnswers[storyIdx]===oi;
            return<button key={oi} disabled={answered} onClick={async()=>{
              const correct=oi===storyPicked.questions[storyIdx].answer;
              const newAnswers=[...storyAnswers];newAnswers[storyIdx]=oi;setStoryAnswers(newAnswers);
              if(correct){setStoryScore(s=>s+1);headYes();boom();speak("That's right!",{rate:0.9});}
              else{headNo();flashWrong();speak("Not quite!",{rate:0.9});}
              await wait(1800);
              if(storyIdx+1<storyPicked.questions.length){setStoryIdx(storyIdx+1);}
              else{
                setStoryStep("done");
                const pts=correct?(storyScore+1)*5:storyScore*5;
                if(pts>0)awardPoints(pts,"stories",storyPicked.id);
                if(storyScore+1>=storyPicked.questions.length){boom();speak("Perfect! You got them all right!",{rate:0.85});}
                else speak("Good try! Keep reading!",{rate:0.85});
              }
            }} style={{
              padding:"16px 18px",borderRadius:18,border:"2.5px solid",cursor:answered?"default":"pointer",
              fontSize:15,fontWeight:600,textAlign:"left",
              borderColor:answered?(isCorrect?"#4ADE80":isPicked?"#F87171":"#E8E0D8"):"#E8E0D8",
              background:answered?(isCorrect?"#F0FDF4":isPicked?"#FEF2F2":"#FFFBF5"):"#FFFBF5",
              color:"#2D2B3D",
              animation:`gridPop 0.2s ease ${oi*0.05}s both`
            }}>{answered&&isCorrect?"✅ ":answered&&isPicked?"❌ ":""}{opt}</button>;
          })}
        </div>
      </div>:null}
    </div>}
    {/* DONE VIEW */}
    {storyStep==="done"&&storyPicked&&<div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,gap:12}}>
      <Confetti active={storyScore>=storyPicked.questions.length}/>
      <span style={{fontSize:64}}>{storyScore>=storyPicked.questions.length?"🎉":"📖"}</span>
      <h2 style={{fontSize:24,fontWeight:700,color:"#2D2B3D"}}>
        {storyScore>=storyPicked.questions.length?"Perfect Score!":"Nice Try!"}
      </h2>
      <Stars count={storyScore>=3?5:storyScore>=2?4:storyScore>=1?3:1}/>
      <p style={{fontSize:16,fontWeight:600,color:"#8E8CA3"}}>{storyScore} / {storyPicked.questions.length} correct</p>
      {storyScore>0&&<p style={{fontSize:16,fontWeight:700,color:"#4ADE80"}}>+{storyScore*5} points!</p>}
      <div style={{display:"flex",gap:10,marginTop:12,width:"100%",maxWidth:320}}>
        <button onClick={()=>{stop();setStoryStep("reading");setStoryAnswers([]);setStoryScore(0);setStoryIdx(0);}} style={{flex:1,padding:14,borderRadius:16,border:"2px solid #E8E0D8",background:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>🔄 Try Again</button>
        <button onClick={()=>{stop();setStoryStep("list");setStoryPicked(null);}} style={{flex:1,padding:14,borderRadius:16,border:"none",background:"#3B82F6",color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}>📚 More Stories</button>
      </div>
    </div>}
    <div style={{height:90,flexShrink:0,pointerEvents:"none"}}/>{TeacherBubble}<style>{CSS}</style>
  </div>;

    // ═══ REWARDS ═══
  if(scr==="rewards")return<div style={{fontFamily:"var(--font)",height:"100vh",overflow:"auto",background:"var(--bg)",maxWidth:520,margin:"0 auto",position:"relative",display:"flex",flexDirection:"column"}}><Confetti key={celebKey} active={confetti} type={celebType}/><SubHead title="Rewards 🎁" onBack={goHome} points={prof?.points||0}/>{rwdMsg&&<div style={{position:"fixed",top:60,left:16,right:16,padding:14,background:"linear-gradient(135deg,#22C55E,#16A34A)",color:"#2D2B3D",borderRadius:18,fontWeight:800,textAlign:"center",zIndex:999,animation:"slideUp 0.3s ease-out",fontSize:13,maxWidth:490,margin:"0 auto"}}>{rwdMsg}</div>}<div style={{margin:"14px 16px 0",padding:"18px 20px",background:"linear-gradient(135deg,#FF9F43,#FECA57)",borderRadius:24,display:"flex",alignItems:"center",gap:14,boxShadow:"0 8px 28px rgba(255,159,67,0.25)"}}><span style={{fontSize:36,animation:"coinSp 2s ease-in-out infinite"}}>💰</span><div><div style={{color:"#2D2B3D",fontFamily:"var(--font)",fontSize:28,fontWeight:800}}>{prof?.points||0}</div><div style={{color:"rgba(255,255,255,.8)",fontSize:11,fontWeight:700}}>Earn more by practicing!</div></div></div><p style={{padding:"8px 16px",fontSize:11,color:"#8E8CA3",fontWeight:700,textAlign:"center"}}>🎉 Show parents when you earn a reward!</p><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,padding:"0 16px 20px"}}>{REWARDS.map((r,i)=>{const can=(prof?.points||0)>=r.cost;return<button key={r.id} data-r="reward" onClick={()=>{if(can){sfxTap();buyR(r);}}} disabled={!can} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:16,borderRadius:20,border:"none",background:can?"linear-gradient(145deg,#fff,#F8FAFF)":"#F0F0F0",boxShadow:can?"var(--shadow-card)":"none",cursor:can?"pointer":"default",fontFamily:"var(--font)",opacity:can?1:0.4,animation:`cardIn 0.3s ease ${i*0.05}s both`}}><span style={{fontSize:36}}>{r.emoji}</span><span style={{fontFamily:"var(--font)",fontSize:14,fontWeight:700,marginTop:4}}>{r.name}</span><span style={{fontSize:10,color:"#8E8CA3",fontWeight:600}}>{r.desc}</span><span style={{marginTop:6,padding:"5px 14px",borderRadius:12,fontSize:12,fontWeight:800,background:can?"linear-gradient(135deg,#00D2A0,#00B894)":"#D4D5D9",boxShadow:can?"0 3px 10px rgba(0,210,160,0.2)":"none",color:can?"#fff":"#999"}}>💰 {r.cost}</span></button>;})}</div>{(prof?.rewards||[]).length>0&&<div style={{padding:"0 16px 20px"}}><h3 style={{fontFamily:"var(--font)",fontSize:16,fontWeight:700,marginBottom:8}}>🏆 Your Rewards</h3>{(prof?.rewards||[]).slice(-6).reverse().map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"linear-gradient(145deg,#fff,#F8FAFF)",borderRadius:18,border:"none",marginBottom:8,boxShadow:"var(--shadow-card)"}}><span style={{fontSize:24}}>{r.emoji}</span><span style={{fontWeight:800,fontSize:13,flex:1}}>{r.name}</span><span style={{fontSize:10,color:"#8E8CA3"}}>{new Date(r.at).toLocaleDateString()}</span></div>)}</div>}<div style={{height:90,flexShrink:0,pointerEvents:"none"}}/>{TeacherBubble}<style>{CSS}</style></div>;

  // ═══ SETTINGS ═══
  if(scr==="settings")return<div style={{fontFamily:"var(--font)",height:"100vh",overflow:"auto",background:"var(--bg)",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column"}}><SubHead title="Settings" onBack={goHome} points={prof?.points||0}/><div style={{padding:18}}><div style={{textAlign:"center",padding:24,background:"#fff",borderRadius:24,boxShadow:"var(--shadow-card)"}}><span style={{fontSize:56,display:"block",animation:"mascotB 3s ease-in-out infinite"}}>{AVATARS[prof?.gender||"boy"][prof?.avatar||0]}</span><h2 style={{fontFamily:"var(--font)",fontSize:24,fontWeight:700,margin:"6px 0 2px"}}>{prof?.name}</h2><p style={{color:"#8E8CA3",fontSize:13,fontWeight:600}}>Age {prof?.age} • {aCfg.diff}</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginTop:14}}>{[{n:prof?.totalEarned||0,l:"Points Earned",c:"#FF8C42"},{n:(prof?.completed?.numbers||[]).length,l:"Numbers",c:"#FF6B6B"},{n:(prof?.completed?.phonics||[]).length,l:"Words",c:"#4ECDC4"},{n:(prof?.rewards||[]).length,l:"Rewards",c:"#FBBF24"}].map((s,i)=><div key={i} style={{background:"linear-gradient(145deg,#fff,#F8FAFF)",borderRadius:22,padding:18,textAlign:"center",border:"none",boxShadow:"var(--shadow-card)"}}><span style={{fontFamily:"var(--font)",fontSize:28,fontWeight:800,color:s.c,display:"block"}}>{s.n}</span><span style={{fontSize:10,fontWeight:700,color:"#8E8CA3"}}>{s.l}</span></div>)}</div><button onClick={()=>{setScr("onboard");setObSt(0);}} style={{width:"100%",padding:14,borderRadius:18,border:"none",background:"#fff",color:"#6C5CE7",fontSize:14,fontWeight:800,fontFamily:"var(--font)",cursor:"pointer",marginTop:14}}>🔄 Change Profile</button>
{/* Voice Settings */}
<div style={{marginTop:16,padding:16,background:"#fff",borderRadius:20,border:"none"}}>
<div style={{fontSize:13,fontWeight:800,color:"#6C5CE7",marginBottom:8}}>🔊 Voice Settings</div>
<p style={{fontSize:11,color:"#8E8CA3",fontWeight:600,marginBottom:10}}>{ttsKey?"Using Google Cloud voice (same sweet voice on all devices!)":"Using your device's built-in voice. Add a Google Cloud API key for a consistent sweet voice everywhere."}</p>
<input value={ttsKey} onChange={e=>saveTtsKey(e.target.value.trim())} placeholder="Paste Google Cloud API key..." style={{width:"100%",padding:"10px 12px",border:"2px solid #E8E0D8",borderRadius:12,fontSize:12,fontWeight:600,fontFamily:"var(--font)",outline:"none",boxSizing:"border-box",background:"#fff"}}/>
<div style={{display:"flex",gap:8,marginTop:8}}>
<button onClick={()=>{speak("Hi! I'm Ollie! This is how I sound!",{rate:0.92,pitch:1.05});}} style={{flex:1,padding:"10px",borderRadius:12,border:"none",background:ttsKey?"linear-gradient(135deg,#FF8C42,#FFB066)":"#E8E8E8",color:ttsKey?"#fff":"#666",fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"var(--font)"}}>🔊 Test Voice</button>
{ttsKey&&<button onClick={()=>saveTtsKey("")} style={{padding:"10px 14px",borderRadius:12,border:"2px solid #E8E0D8",background:"#fff",color:"#E23744",fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"var(--font)"}}>Remove</button>}
</div>
{ttsKey&&<p style={{fontSize:10,color:"#22C55E",fontWeight:700,marginTop:6}}>✅ Cloud voice active</p>}
</div>
<button onClick={()=>{if(window.confirm("Are you sure? This will delete all your progress and points!")){save(null);setScr("onboard");setObSt(0);}}} style={{width:"100%",padding:14,borderRadius:18,border:"none",background:"#FEE2E2",color:"#DC2626",fontSize:14,fontWeight:800,fontFamily:"var(--font)",cursor:"pointer",marginTop:8}}>🗑️ Reset</button></div><div style={{height:90,flexShrink:0,pointerEvents:"none"}}/>{TeacherBubble}<style>{CSS}</style></div>;

  return<div><div style={{height:90,flexShrink:0,pointerEvents:"none"}}/>{TeacherBubble}<style>{CSS}</style></div>;
}

// ═══════════════════════════════════════════════════════════════
const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700;800&display=swap');
:root{
  --bg:#F0F4FF;--bg2:#E8EEFF;--card:#FFFFFF;--card2:#F8FAFF;
  --primary:#6C5CE7;--primary-light:#A29BFE;--primary-dark:#5A4BD1;
  --orange:#FF9F43;--orange-light:#FECA57;--orange-dark:#EE8520;
  --green:#00D2A0;--green-light:#55EFC4;--green-dark:#00B894;
  --red:#FF6B81;--red-light:#FF8A9B;--red-dark:#EE5A6F;
  --blue:#54A0FF;--blue-light:#74B9FF;--blue-dark:#2E86DE;
  --pink:#FD79A8;--pink-light:#FDA7DF;--pink-dark:#E84393;
  --cyan:#00CEC9;--cyan-light:#81ECEC;--cyan-dark:#00B5AD;
  --yellow:#FECA57;--yellow-dark:#F9CA24;
  --dark:#2D3436;--gray:#A4B0BE;--muted:#B2BEC3;--light:#DFE6E9;
  --radius:20px;--radius-lg:28px;--radius-xl:36px;
  --shadow-card:0 4px 20px rgba(108,92,231,0.08),0 1px 3px rgba(0,0,0,0.04);
  --shadow-btn:0 4px 14px rgba(108,92,231,0.15),0 1px 3px rgba(0,0,0,0.06);
  --shadow-float:0 8px 30px rgba(108,92,231,0.12),0 2px 6px rgba(0,0,0,0.04);
  --shadow-glow:0 0 20px rgba(108,92,231,0.15);
  --font:'Fredoka','Nunito',system-ui,-apple-system,sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;}
html,body{background:#F0F4FF;overflow-x:hidden;color:var(--dark);font-family:var(--font);-webkit-text-size-adjust:100%;-webkit-font-smoothing:antialiased;}
*{-webkit-overflow-scrolling:touch;}
::-webkit-scrollbar{width:5px;}
[style*="scrollbarWidth"]::-webkit-scrollbar{display:none;}::-webkit-scrollbar-thumb{background:linear-gradient(180deg,var(--primary-light),var(--primary));border-radius:5px;}::-webkit-scrollbar-track{background:transparent;}
button{font-family:var(--font);touch-action:manipulation;-webkit-touch-callout:none;transition:transform 0.15s ease,opacity 0.15s ease;-webkit-appearance:none;}
button:active{transform:scale(0.96);}

/* ═══ REACTIVE HOVER SYSTEM (Safari-safe, no !important) ═══ */
@media(hover:hover){
  [data-r]{transition:transform 0.2s ease,box-shadow 0.2s ease;cursor:pointer;}
  [data-r]:hover{transform:scale(1.04) translateY(-2px);z-index:2;}
  [data-r]:active{transform:scale(0.96);}
}
} /* end hover:hover */
@media(hover:none){
  [data-r]{cursor:pointer;-webkit-tap-highlight-color:transparent;}
  [data-r]:active{transform:scale(0.96);opacity:0.9;}
}

/* ═══ CORE ANIMATIONS ═══ */
@keyframes emojiPop{0%{transform:scale(1) rotate(0)}25%{transform:scale(1.2) rotate(-8deg)}50%{transform:scale(1.15) rotate(6deg)}75%{transform:scale(1.18) rotate(-4deg)}100%{transform:scale(1) rotate(0)}}
@keyframes tapPop{0%{transform:scale(1)}40%{transform:scale(0.92)}100%{transform:scale(1)}}
@keyframes popIn{0%{transform:scale(0) rotate(-5deg);opacity:0}60%{transform:scale(1.08) rotate(1deg);opacity:1}100%{transform:scale(1) rotate(0)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes wiggle{0%,100%{transform:rotate(0)}20%{transform:rotate(-6deg)}40%{transform:rotate(6deg)}60%{transform:rotate(-4deg)}80%{transform:rotate(3deg)}}
@keyframes gradientMove{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
/* Animations */
@keyframes fadeIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}} @keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes splashPop{from{opacity:0;transform:scale(.5)}to{opacity:1;transform:scale(1)}}
@keyframes mascotB{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes floatP{0%,100%{transform:translateY(0) translateX(0)}25%{transform:translateY(calc(-1*var(--dr,15px))) translateX(10px)}75%{transform:translateY(5px) translateX(-10px)}}
@keyframes cFallPaper{
  0%{opacity:1;transform:translateY(0) translateX(0) rotate(0deg)}
  100%{opacity:0;transform:translateY(110vh) translateX(var(--drift)) rotate(var(--rot))}
}
@keyframes cFallEmoji{
  0%{opacity:1;transform:translateY(0) translateX(0) scale(1) rotate(0deg)}
  100%{opacity:0;transform:translateY(110vh) translateX(var(--drift)) scale(0.4) rotate(25deg)}
}
@keyframes cBalloon{
  0%{opacity:0;transform:translateY(0) translateX(0) scale(0.3)}
  8%{opacity:1;transform:translateY(-8vh) translateX(calc(var(--drift)*0.1)) scale(1.05)}
  100%{opacity:0;transform:translateY(-115vh) translateX(var(--drift)) scale(0.85)}
}
@keyframes cSpark{
  0%{opacity:1;transform:translate(0,0) scaleY(1)}
  30%{opacity:1;transform:translate(calc(var(--dx)*0.5),calc(var(--dy)*0.5)) scaleY(1.5)}
  100%{opacity:0;transform:translate(var(--dx),var(--dy)) scaleY(0.3)}
}
@keyframes cFlash{
  0%{opacity:0;transform:translate(-50%,-50%) scale(0)}
  15%{opacity:1;transform:translate(-50%,-50%) scale(12)}
  40%{opacity:0.8;transform:translate(-50%,-50%) scale(18)}
  100%{opacity:0;transform:translate(-50%,-50%) scale(25)}
}
@keyframes cWrongPulse{
  0%{background:rgba(239,68,68,0.35)}
  50%{background:rgba(239,68,68,0.15)}
  100%{background:rgba(239,68,68,0)}
}
@keyframes itemGlow{
  0%,100%{box-shadow:0 0 0 3px #FBBF24, 0 0 16px rgba(251,191,36,0.4)}
  50%{box-shadow:0 0 0 5px #FBBF24, 0 0 28px rgba(251,191,36,0.6), 0 0 48px rgba(251,191,36,0.2)}
}
@keyframes coinSp{0%,100%{transform:rotateY(0)}50%{transform:rotateY(180deg)}}
@keyframes numPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.12)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes dotB{0%,80%,100%{opacity:.3;transform:scale(.7)}40%{opacity:1;transform:scale(1.1)}}
@keyframes starPop{from{opacity:0;transform:scale(0) rotate(-30deg)}to{opacity:1;transform:scale(1) rotate(0)}}
@keyframes resBounce{0%{transform:scale(.5) translateY(30px);opacity:0}60%{transform:scale(1.08);opacity:1}100%{transform:scale(1)}}
@keyframes ptFly{0%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-40px)}}
@keyframes sndWave{0%,100%{height:6px}50%{height:28px}}
@keyframes micP{0%,100%{box-shadow:0 0 0 0 rgba(252,128,25,.4)}50%{box-shadow:0 0 0 12px rgba(252,128,25,0)}}
@keyframes listenBlink{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes bubPop{from{opacity:0;transform:scale(.7) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes btnP{0%,100%{box-shadow:0 4px 16px rgba(252,128,25,.3)}50%{box-shadow:0 8px 24px rgba(252,128,25,.5)}}
@keyframes tipW{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}
@keyframes readyP{0%,100%{transform:scale(1)}50%{transform:scale(1.02)}}
@keyframes gridPop{0%{opacity:0;transform:scale(0.9)}100%{opacity:1;transform:scale(1)}}
@keyframes cardFloat{0%,100%{transform:translateY(0)}25%{transform:translateY(-4px)}75%{transform:translateY(-6px)}}
@keyframes cardBounce{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
@keyframes numBounce{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-3px) scale(1.06)}}
@keyframes cardIn{from{opacity:0;transform:scale(.5) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes iconF{0%,100%{transform:translateY(0) scale(1)}25%{transform:translateY(-5px) scale(1.06) rotate(3deg)}75%{transform:translateY(-7px) scale(1.04) rotate(-2deg)}}
@keyframes findPulse{0%,100%{box-shadow:0 0 0 0 rgba(252,128,25,.4)}50%{box-shadow:0 0 0 8px rgba(252,128,25,0)}}
/* Scene animations */
@keyframes scene_floatBob{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-12px)}}
@keyframes scene_sparkle{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.3}50%{transform:translate(-50%,-50%) scale(1.5);opacity:1}}
@keyframes scene_sway{0%,100%{transform:translate(-50%,-50%) rotate(-3deg)}50%{transform:translate(-50%,-50%) rotate(3deg)}}
@keyframes scene_cloudDrift{0%{transform:translate(-50%,-50%) translateX(-40px)}50%{transform:translate(-50%,-50%) translateX(40px)}100%{transform:translate(-50%,-50%) translateX(-40px)}}
@keyframes scene_birdBob{0%,100%{transform:translate(-50%,-50%) translateY(0) rotate(-3deg)}25%{transform:translate(-50%,-50%) translateY(-6px)}50%{transform:translate(-50%,-50%) translateY(0) rotate(3deg)}75%{transform:translate(-50%,-50%) translateY(-4px)}}
@keyframes scene_mouseRun{0%,100%{transform:translate(-50%,-50%) translateX(0)}50%{transform:translate(-50%,-50%) translateX(30px)}}
@keyframes scene_eggWobble{0%,100%{transform:translate(-50%,-50%) rotate(-4deg)}50%{transform:translate(-50%,-50%) rotate(4deg)}}
@keyframes scene_ballBounce{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-20px)}}
@keyframes scene_puppyWag{0%,100%{transform:translate(-50%,-50%) rotate(-5deg)}50%{transform:translate(-50%,-50%) rotate(5deg)}}
@keyframes scene_handWave{0%{transform:translate(-50%,-50%) rotate(0)}25%{transform:translate(-50%,-50%) rotate(15deg)}75%{transform:translate(-50%,-50%) rotate(-15deg)}100%{transform:translate(-50%,-50%) rotate(0)}}
@keyframes scene_fingerCount{0%{transform:translate(-50%,-50%) scale(0)}50%{transform:translate(-50%,-50%) scale(1.2)}100%{transform:translate(-50%,-50%) scale(1)}}
@keyframes scene_footWiggle{0%,100%{transform:translate(-50%,-50%) rotate(0)}25%{transform:translate(-50%,-50%) rotate(8deg)}75%{transform:translate(-50%,-50%) rotate(-8deg)}}
@keyframes scene_toeWiggle{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-6px)}}
@keyframes scene_sunPulse{0%,100%{transform:translate(-50%,-50%) scale(1);filter:brightness(1)}50%{transform:translate(-50%,-50%) scale(1.15);filter:brightness(1.3)}}
@keyframes scene_twinkle{0%,100%{opacity:.2;transform:translate(-50%,-50%) scale(.6)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.2)}}
@keyframes scene_moonGlow{0%,100%{filter:brightness(1) drop-shadow(0 0 8px rgba(255,255,200,.5))}50%{filter:brightness(1.3) drop-shadow(0 0 20px rgba(255,255,200,.8))}}
@keyframes scene_birdFly{0%{transform:translate(-50%,-50%) translateX(-30px) translateY(0)}25%{transform:translate(-50%,-50%) translateX(0) translateY(-15px)}50%{transform:translate(-50%,-50%) translateX(30px) translateY(0)}75%{transform:translate(-50%,-50%) translateX(0) translateY(-10px)}100%{transform:translate(-50%,-50%) translateX(-30px) translateY(0)}}
@keyframes scene_fishSwim{0%{transform:translate(-50%,-50%) translateX(-25px) scaleX(1)}49%{transform:translate(-50%,-50%) translateX(25px) scaleX(1)}50%{transform:translate(-50%,-50%) translateX(25px) scaleX(-1)}100%{transform:translate(-50%,-50%) translateX(-25px) scaleX(-1)}}
@keyframes scene_fishSwimR{0%{transform:translate(-50%,-50%) translateX(25px) scaleX(-1)}49%{transform:translate(-50%,-50%) translateX(-25px) scaleX(-1)}50%{transform:translate(-50%,-50%) translateX(-25px) scaleX(1)}100%{transform:translate(-50%,-50%) translateX(25px) scaleX(1)}}
@keyframes scene_waveBob{0%,100%{transform:translate(-50%,-50%) translateY(0) scaleX(1)}25%{transform:translate(-50%,-50%) translateY(-4px) scaleX(1.02)}75%{transform:translate(-50%,-50%) translateY(4px) scaleX(.98)}}
@keyframes scene_truckDrive{0%{transform:translate(-50%,-50%) translateX(-20px)}50%{transform:translate(-50%,-50%) translateX(20px)}100%{transform:translate(-50%,-50%) translateX(-20px)}}
@keyframes scene_none{0%,100%{transform:translate(-50%,-50%)}}
@keyframes scene_smokePuff{0%{opacity:.8;transform:translate(-50%,-50%) scale(1)}100%{opacity:0;transform:translate(-50%,-50%) scale(2) translateY(-30px)}}
@keyframes scene_alarmShake{0%,100%{transform:translate(-50%,-50%) rotate(0)}10%{transform:translate(-50%,-50%) rotate(10deg)}20%{transform:translate(-50%,-50%) rotate(-10deg)}30%{transform:translate(-50%,-50%) rotate(8deg)}40%{transform:translate(-50%,-50%) rotate(-8deg)}50%{transform:translate(-50%,-50%) rotate(0)}}
@keyframes scene_clockTick{0%{transform:translate(-50%,-50%) rotate(0)}100%{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes scene_hourglassFlip{0%,45%{transform:translate(-50%,-50%) rotate(0)}50%,95%{transform:translate(-50%,-50%) rotate(180deg)}100%{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes scene_wheelSpin{0%{transform:translate(-50%,-50%) rotate(0)}100%{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes scene_dayNight{0%,100%{filter:brightness(1)}50%{filter:brightness(.6)}}
@keyframes scene_candleFlicker{0%,100%{opacity:1;transform:translate(-50%,-50%) scaleY(1)}30%{opacity:.7;transform:translate(-50%,-50%) scaleY(.85)}60%{opacity:.9;transform:translate(-50%,-50%) scaleY(1.1)}}
@keyframes scene_cakeAppear{0%{transform:translate(-50%,-50%) scale(0) rotate(-20deg)}60%{transform:translate(-50%,-50%) scale(1.15) rotate(5deg)}100%{transform:translate(-50%,-50%) scale(1) rotate(0)}}
@keyframes scene_partyPop{0%,100%{transform:translate(-50%,-50%) scale(1)}25%{transform:translate(-50%,-50%) scale(1.3) rotate(10deg)}75%{transform:translate(-50%,-50%) scale(.9) rotate(-5deg)}}
@keyframes scene_owlBlink{0%,40%,100%{transform:translate(-50%,-50%) scaleY(1)}45%{transform:translate(-50%,-50%) scaleY(.1)}50%{transform:translate(-50%,-50%) scaleY(1)}}
@keyframes scene_fadeStep{0%{opacity:0;transform:translate(-50%,-50%) translateY(10px)}100%{opacity:1;transform:translate(-50%,-50%) translateY(0)}}
@keyframes scene_rainbowGrow{0%{transform:translate(-50%,-50%) scaleX(0);opacity:0}100%{transform:translate(-50%,-50%) scaleX(1);opacity:1}}
@keyframes scene_octoFloat{0%,100%{transform:translate(-50%,-50%) translateY(0) rotate(0)}25%{transform:translate(-50%,-50%) translateY(-10px) rotate(5deg)}75%{transform:translate(-50%,-50%) translateY(-5px) rotate(-5deg)}}
@keyframes scene_bubbleRise{0%{transform:translate(-50%,-50%) translateY(0);opacity:.8}100%{transform:translate(-50%,-50%) translateY(-60px);opacity:0}}
@keyframes scene_orbitSpin{0%{transform:translate(-50%,-50%) rotate(0) translateX(var(--orbit,40px)) rotate(0)}100%{transform:translate(-50%,-50%) rotate(360deg) translateX(var(--orbit,40px)) rotate(-360deg)}}
@keyframes scene_monthPop{0%{transform:translate(-50%,-50%) scale(0)}60%{transform:translate(-50%,-50%) scale(1.15)}100%{transform:translate(-50%,-50%) scale(1)}}
@keyframes scene_pastryBob{0%,100%{transform:translate(-50%,-50%) translateY(0) rotate(-2deg)}50%{transform:translate(-50%,-50%) translateY(-8px) rotate(2deg)}}
@keyframes scene_colorBounce{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.2)}}
`;
