import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════
   🌟 LITTLE GENIUS v4 — Animated Scenes Edition
   Each number has a LIVING animated scene matching its sentence
   ═══════════════════════════════════════════════════════════════ */

const AVATARS={boy:["🦸‍♂️","🧑‍🚀","🦊","🐻","🦁","🐯","🐸","🐵"],girl:["🦸‍♀️","👸","🦄","🐱","🐰","🦋","🐼","🐨"]};
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
const AnimatedScene = ({num, active}) => {
  const scene = getScene(num);
  return (
    <div style={{position:"relative",width:"100%",height:220,borderRadius:24,overflow:"hidden",background:scene.bg,boxShadow:"inset 0 0 40px rgba(0,0,0,0.1)"}}>
      {/* Scene number overlay */}
      <div style={{position:"absolute",top:8,right:12,fontFamily:"'Poppins',sans-serif",fontSize:48,fontWeight:800,color:"rgba(0,0,0,0.06)",lineHeight:1,zIndex:1}}>{num}</div>
      
      {/* Wall element for #2 */}
      {scene.elements.filter(e=>e.isWall).map((_,i)=>(
        <div key={`wall-${i}`} style={{position:"absolute",bottom:0,left:0,right:0,height:"35%",background:"repeating-linear-gradient(90deg,#8B4513 0px,#8B4513 28px,#654321 28px,#654321 30px)",borderTop:"3px solid #654321",
          backgroundSize:"60px 30px",backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 28px,#654321 28px,#654321 30px),repeating-linear-gradient(90deg,#8B4513 0px,#8B4513 28px,#654321 28px,#654321 30px)"}}/>
      ))}
      
      {/* Box element for #6 */}
      {scene.elements.filter(e=>e.isBox).map((_,i)=>(
        <div key={`box-${i}`} style={{position:"absolute",left:"20%",right:"20%",top:"25%",bottom:"20%",background:"#D2691E",borderRadius:8,border:"3px solid #8B4513",boxShadow:"inset 0 0 20px rgba(0,0,0,0.2)"}}/>
      ))}
      
      {/* Animated elements */}
      {scene.elements.filter(e=>!e.isWall && !e.isBox).map((el,i) => (
        <div key={i} style={{
          position:"absolute",
          left:`${el.x}%`,top:`${el.y}%`,
          transform:"translate(-50%,-50%)",
          fontSize:el.size,lineHeight:1,
          animation:el.anim !== "none" ? `scene_${el.anim} ${el.dur}s ease-in-out ${el.delay||0}s infinite` : "none",
          zIndex:2,
          filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
          ...(el.anim === "orbitSpin" ? {
            animation:`scene_orbitSpin ${el.dur}s linear ${el.delay||0}s infinite`,
            transformOrigin:"50% 50%",
            "--orbit":`${el.orbit||30}px`,
          } : {}),
        }}>{el.emoji}</div>
      ))}
      
      {/* Sentence overlay */}
      {active && (
        <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"24px 16px 12px",background:"linear-gradient(transparent,rgba(0,0,0,0.6))",zIndex:10}}>
          <p style={{color:"#1C1C2B",fontFamily:"'Poppins',sans-serif",fontSize:14,fontWeight:700,textAlign:"center",textShadow:"0 1px 4px rgba(0,0,0,0.5)",lineHeight:1.3}}>
            💬 {scene.sentence}
          </p>
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════
// REST OF APP DATA
// ═══════════════════════════════════════════════════════════════
const PM={b:{s:"buh",d:"/b/"},c:{s:"kuh",d:"/k/"},d:{s:"duh",d:"/d/"},f:{s:"fff",d:"/f/"},g:{s:"guh",d:"/g/"},h:{s:"huh",d:"/h/"},j:{s:"juh",d:"/dʒ/"},k:{s:"kuh",d:"/k/"},l:{s:"lll",d:"/l/"},m:{s:"mmm",d:"/m/"},n:{s:"nnn",d:"/n/"},p:{s:"puh",d:"/p/"},r:{s:"rrr",d:"/r/"},s:{s:"sss",d:"/s/"},t:{s:"tuh",d:"/t/"},v:{s:"vvv",d:"/v/"},w:{s:"wuh",d:"/w/"},x:{s:"ks",d:"/ks/"},y:{s:"yuh",d:"/j/"},z:{s:"zzz",d:"/z/"},a:{s:"aah",d:"/æ/"},e:{s:"eh",d:"/ɛ/"},i:{s:"ih",d:"/ɪ/"},o:{s:"aww",d:"/ɒ/"},u:{s:"uh",d:"/ʌ/"}};
const DM={sh:{s:"shh",d:"/ʃ/"},ch:{s:"chuh",d:"/tʃ/"},th:{s:"thh",d:"/θ/"},ck:{s:"kuh",d:"/k/"},ng:{s:"nng",d:"/ŋ/"},ee:{s:"eee",d:"/iː/"},oo:{s:"ooo",d:"/uː/"},ai:{s:"ay",d:"/eɪ/"},ow:{s:"ow",d:"/aʊ/"},ar:{s:"are",d:"/ɑːr/"},er:{s:"err",d:"/ɜːr/"},ir:{s:"err",d:"/ɜːr/"},or:{s:"ore",d:"/ɔːr/"},ea:{s:"eee",d:"/iː/"},igh:{s:"eye",d:"/aɪ/"}};
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
    {word:"panda",ph:["p","a","n","d","a"],img:"🐼",sentence:"The panda eats bamboo!"},
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
    {word:"flamingo",ph:["f","l","a","m","i","ng","g","o"],img:"🦩",sentence:"Flamingos are pink birds!"},
  ]},
  food:{emoji:"🍎",color:"#4ECDC4",words:[
    {word:"jam",ph:["j","a","m"],img:"🍯",sentence:"I love jam on toast!"},
    {word:"egg",ph:["e","g","g"],img:"🥚",sentence:"I eat an egg for breakfast!"},
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
    {word:"fig",ph:["f","i","g"],img:"🫒",sentence:"Figs grow on trees!"},
    {word:"lime",ph:["l","igh","m"],img:"🍋",sentence:"Lime is green and sour!"},
    {word:"date",ph:["d","ai","t"],img:"🌴",sentence:"Dates are sweet brown fruits!"},
    {word:"papaya",ph:["p","a","p","igh","a"],img:"🥭",sentence:"Papaya is orange inside!"},
    {word:"apricot",ph:["ai","p","r","i","c","o","t"],img:"🍑",sentence:"Apricots are small and orange!"},
    {word:"avocado",ph:["a","v","o","c","ar","d","o"],img:"🥑",sentence:"Avocado is green and creamy!"},
    {word:"blueberry",ph:["b","l","oo","b","e","r","ee"],img:"🫐",sentence:"Blueberries are tiny and sweet!"},
    {word:"raspberry",ph:["r","a","z","b","e","r","ee"],img:"🫐",sentence:"Raspberries are red and tangy!"},
    {word:"jackfruit",ph:["j","a","ck","f","r","oo","t"],img:"🍈",sentence:"Jackfruit is the biggest fruit!"},
  
    {word:"grape",ph:["g","r","ai","p"],img:"🍇",sentence:"Grapes come in bunches!"},
    {word:"pomegranate",ph:["p","o","m","e","g","r","a","n","i","t"],img:"🫐",sentence:"Pomegranate has many seeds!"},
    {word:"dragonfruit",ph:["d","r","a","g","o","n","f","r","oo","t"],img:"🍈",sentence:"Dragonfruit is pink outside!"},
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
  clothes:{emoji:"👕",color:"#8B5CF6",words:[
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
  school:{emoji:"🏫",color:"#6366F1",words:[
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
    {word:"angry",ph:["a","ng","g","r","ee"],img:"😠",sentence:"Take a deep breath when angry!"},
    {word:"scared",ph:["s","c","air","d"],img:"😨",sentence:"The dark can be scary!"},
    {word:"brave",ph:["b","r","ai","v"],img:"💪",sentence:"Be brave and try new things!"},
    {word:"kind",ph:["k","igh","n","d"],img:"🤗",sentence:"Always be kind to others!"},
    {word:"tired",ph:["t","igh","er","d"],img:"😴",sentence:"I am tired after playing!"},
    {word:"hungry",ph:["h","u","ng","g","r","ee"],img:"🤤",sentence:"I am hungry for lunch!"},
    {word:"excited",ph:["e","x","s","igh","t","i","d"],img:"🤩",sentence:"I am excited for my birthday!"},
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
  things:{emoji:"🎒",color:"#FF8C42",words:[
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
    {word:"equal",ph:["ee","q","w","a","l"],img:"🟰",sentence:"Equal means the same!"},
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
  
    {word:"square",ph:["s","q","w","air"],img:"⬜",sentence:"A square has four equal sides!"},
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
    {word:"choir",ph:["q","w","igh","er"],img:"🎵",sentence:"The choir sings beautifully!"},
    {word:"rhythm",ph:["r","i","th","m"],img:"🎶",sentence:"Feel the rhythm in your feet!"},
    {word:"melody",ph:["m","e","l","o","d","ee"],img:"🎵",sentence:"A melody is a nice tune!"},
    {word:"concert",ph:["c","o","n","s","er","t"],img:"🎤",sentence:"We went to a concert!"},
    {word:"note",ph:["n","oa","t"],img:"🎵",sentence:"Each note has a different sound!"},
    {word:"harmony",ph:["h","ar","m","o","n","ee"],img:"🎶",sentence:"Harmony is sounds blending together!"},
  ]},
};

const REWARDS=[{id:1,name:"Sticker Pack",emoji:"🌟",cost:50,desc:"5 shiny stickers!"},{id:2,name:"Ice Cream",emoji:"🍦",cost:100,desc:"A yummy treat!"},{id:3,name:"Toy Car",emoji:"🚗",cost:200,desc:"Vroom vroom!"},{id:4,name:"Burger Meal",emoji:"🍔",cost:150,desc:"Burger + fries!"},{id:5,name:"Teddy Bear",emoji:"🧸",cost:300,desc:"Soft & cuddly!"},{id:6,name:"Lego Set",emoji:"🧩",cost:500,desc:"Build anything!"},{id:7,name:"Book",emoji:"📚",cost:75,desc:"A new story!"},{id:8,name:"Candy Bag",emoji:"🍬",cost:50,desc:"Sweet treats!"},{id:9,name:"Movie Night",emoji:"🎬",cost:400,desc:"Pick a movie!"},{id:10,name:"Pizza Party",emoji:"🍕",cost:350,desc:"Yum yum!"},{id:11,name:"Art Kit",emoji:"🖍️",cost:200,desc:"Color & draw!"},{id:12,name:"Bike Ride",emoji:"🚲",cost:250,desc:"Outdoor fun!"}];
const SHAPES=[
  {name:"circle",emoji:"🔵",desc:"Round like a ball!",sides:0,ph:["s","ir","c","l"],sentence:"A circle is round like a ball!",
    scene:{bg:"linear-gradient(180deg,#87CEEB,#B0E0E6,#98FB98)",elements:[{emoji:"🔵",size:70,x:50,y:35,anim:"floatBob",dur:2},{emoji:"⚽",size:30,x:25,y:55,anim:"ballBounce",dur:1.5},{emoji:"🍩",size:28,x:75,y:55,anim:"eggWobble",dur:2},{emoji:"🌕",size:32,x:50,y:15,anim:"moonGlow",dur:3}]}},
  {name:"square",emoji:"🟧",desc:"Four equal sides!",sides:4,ph:["s","qu","air"],sentence:"A square has four equal sides!",
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
    scene:{bg:"linear-gradient(180deg,#C084FC,#A855F7,#7C3AED)",elements:[{emoji:"🍇",size:44,x:40,y:30,anim:"floatBob",dur:2},{emoji:"🔮",size:36,x:65,y:45,anim:"sunPulse",dur:3},{emoji:"🦄",size:30,x:25,y:60,anim:"birdBob",dur:1.8}]}},
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
A:{ph:"æ",examples:[{w:"Apple",e:"🍎"},{w:"Ant",e:"🐜"},{w:"Aeroplane",e:"✈️"},{w:"Alligator",e:"🐊"},{w:"Astronaut",e:"👨‍🚀"}]},
B:{ph:"buh",examples:[{w:"Ball",e:"⚽"},{w:"Bear",e:"🐻"},{w:"Butterfly",e:"🦋"},{w:"Banana",e:"🍌"},{w:"Bus",e:"🚌"}]},
C:{ph:"kuh",examples:[{w:"Cat",e:"🐱"},{w:"Car",e:"🚗"},{w:"Cake",e:"🎂"},{w:"Cow",e:"🐮"},{w:"Crown",e:"👑"}]},
D:{ph:"duh",examples:[{w:"Dog",e:"🐶"},{w:"Duck",e:"🦆"},{w:"Drum",e:"🥁"},{w:"Diamond",e:"💎"},{w:"Dolphin",e:"🐬"}]},
E:{ph:"eh",examples:[{w:"Elephant",e:"🐘"},{w:"Egg",e:"🥚"},{w:"Eagle",e:"🦅"},{w:"Earth",e:"🌍"},{w:"Eye",e:"👁️"}]},
F:{ph:"fuh",examples:[{w:"Fish",e:"🐟"},{w:"Flower",e:"🌸"},{w:"Frog",e:"🐸"},{w:"Fire",e:"🔥"},{w:"Football",e:"⚽"}]},
G:{ph:"guh",examples:[{w:"Grapes",e:"🍇"},{w:"Giraffe",e:"🦒"},{w:"Guitar",e:"🎸"},{w:"Gift",e:"🎁"},{w:"Globe",e:"🌍"}]},
H:{ph:"huh",examples:[{w:"Horse",e:"🐴"},{w:"Hat",e:"🎩"},{w:"Heart",e:"❤️"},{w:"House",e:"🏠"},{w:"Honey",e:"🍯"}]},
I:{ph:"ih",examples:[{w:"Ice cream",e:"🍦"},{w:"Igloo",e:"🏔️"},{w:"Island",e:"🏝️"},{w:"Ink",e:"🖊️"},{w:"Insect",e:"🐛"}]},
J:{ph:"juh",examples:[{w:"Jelly",e:"🍮"},{w:"Juice",e:"🧃"},{w:"Jaguar",e:"🐆"},{w:"Jet",e:"✈️"},{w:"Jewel",e:"💎"}]},
K:{ph:"kuh",examples:[{w:"Kite",e:"🪁"},{w:"King",e:"🤴"},{w:"Kangaroo",e:"🦘"},{w:"Key",e:"🔑"},{w:"Koala",e:"🐨"}]},
L:{ph:"luh",examples:[{w:"Lion",e:"🦁"},{w:"Lamp",e:"💡"},{w:"Lemon",e:"🍋"},{w:"Leaf",e:"🍃"},{w:"Ladybug",e:"🐞"}]},
M:{ph:"muh",examples:[{w:"Monkey",e:"🐒"},{w:"Moon",e:"🌙"},{w:"Mango",e:"🥭"},{w:"Music",e:"🎵"},{w:"Mountain",e:"⛰️"}]},
N:{ph:"nuh",examples:[{w:"Nest",e:"🪹"},{w:"Nose",e:"👃"},{w:"Nut",e:"🥜"},{w:"Night",e:"🌙"},{w:"Notebook",e:"📓"}]},
O:{ph:"oh",examples:[{w:"Orange",e:"🍊"},{w:"Owl",e:"🦉"},{w:"Octopus",e:"🐙"},{w:"Ocean",e:"🌊"},{w:"Onion",e:"🧅"}]},
P:{ph:"puh",examples:[{w:"Penguin",e:"🐧"},{w:"Pizza",e:"🍕"},{w:"Parrot",e:"🦜"},{w:"Piano",e:"🎹"},{w:"Panda",e:"🐼"}]},
Q:{ph:"kwuh",examples:[{w:"Queen",e:"👸"},{w:"Quilt",e:"🛏️"},{w:"Question",e:"❓"},{w:"Quail",e:"🐦"},{w:"Quiet",e:"🤫"}]},
R:{ph:"ruh",examples:[{w:"Rabbit",e:"🐰"},{w:"Rainbow",e:"🌈"},{w:"Rocket",e:"🚀"},{w:"Rose",e:"🌹"},{w:"Robot",e:"🤖"}]},
S:{ph:"sss",examples:[{w:"Sun",e:"☀️"},{w:"Star",e:"⭐"},{w:"Snake",e:"🐍"},{w:"Ship",e:"🚢"},{w:"Strawberry",e:"🍓"}]},
T:{ph:"tuh",examples:[{w:"Tiger",e:"🐯"},{w:"Train",e:"🚂"},{w:"Tree",e:"🌳"},{w:"Turtle",e:"🐢"},{w:"Telescope",e:"🔭"}]},
U:{ph:"uh",examples:[{w:"Umbrella",e:"☂️"},{w:"Unicorn",e:"🦄"},{w:"Uniform",e:"👔"},{w:"Universe",e:"🌌"},{w:"Uncle",e:"👨"}]},
V:{ph:"vuh",examples:[{w:"Violin",e:"🎻"},{w:"Volcano",e:"🌋"},{w:"Van",e:"🚐"},{w:"Vase",e:"🏺"},{w:"Vulture",e:"🦅"}]},
W:{ph:"wuh",examples:[{w:"Whale",e:"🐋"},{w:"Watch",e:"⌚"},{w:"Watermelon",e:"🍉"},{w:"Wolf",e:"🐺"},{w:"Window",e:"🪟"}]},
X:{ph:"eks",examples:[{w:"Xylophone",e:"🎵"},{w:"X-ray",e:"🩻"},{w:"Fox",e:"🦊"},{w:"Box",e:"📦"},{w:"Taxi",e:"🚕"}]},
Y:{ph:"yuh",examples:[{w:"Yak",e:"🦬"},{w:"Yacht",e:"⛵"},{w:"Yogurt",e:"🥛"},{w:"Yellow",e:"🟡"},{w:"Yarn",e:"🧶"}]},
Z:{ph:"zzz",examples:[{w:"Zebra",e:"🦓"},{w:"Zoo",e:"🦁"},{w:"Zigzag",e:"⚡"},{w:"Zero",e:"0️⃣"},{w:"Zipper",e:"🤐"}]},
};
const ALPHA_LETTERS="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const ALPHA_COLORS=["#FF6B6B","#4ECDC4","#FC8019","#A855F7","#F472B6","#3B82F6","#22C55E","#EAB308","#EF4444","#0EA5E9","#8B5CF6","#14B8A6","#F97316"];

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
const nClr=(n)=>["#FF6B6B","#4ECDC4","#45B7D1","#FF8C42","#A855F7","#F472B6","#34D399","#FBBF24","#60A5FA","#F87171"][(Math.floor((n-1)/10))%10];
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
  const onSpeakRef=useRef(null); // callback when speak is called
  const onDoneRef=useRef(null);  // callback when speech ends
  useEffect(()=>{const l=()=>{const x=speechSynthesis.getVoices();if(x.length)setV(x);};l();speechSynthesis.onvoiceschanged=l;return()=>{speechSynthesis.onvoiceschanged=null;};},[]);
  const getV=useCallback(()=>{
    const prefs=["Google US English","Samantha","Karen","Moira","Tessa","Victoria","Google UK English Female","Microsoft Zira","Microsoft Jenny"];
    for(const n of prefs){const x=v.find(y=>y.name.includes(n));if(x)return x;}
    return v.find(x=>x.lang.startsWith("en"))||v[0];
  },[v]);
  const speak=useCallback((t,o={})=>new Promise(r=>{
    if(onSpeakRef.current)onSpeakRef.current(t);
    const u=new SpeechSynthesisUtterance(t);
    // Try React state voice first, fallback to native
    let voice=getV();
    if(!voice){
      const nv=speechSynthesis.getVoices();
      const prefs=["Google US English","Samantha","Karen","Moira","Tessa"];
      for(const n of prefs){const x=nv.find(y=>y.name.includes(n));if(x){voice=x;break;}}
      if(!voice)voice=nv.find(x=>x.lang.startsWith("en"))||nv[0];
    }
    if(voice)u.voice=voice;
    u.rate=o.rate||0.9;u.pitch=o.pitch||1.0;u.lang="en-US";u.volume=1;
    u.onend=()=>{if(onDoneRef.current)onDoneRef.current();r();};
    u.onerror=()=>{r();};
    if(!o.noCancel) speechSynthesis.cancel();
    setTimeout(()=>{try{speechSynthesis.speak(u);}catch(e){r();}},o.noCancel?20:60);
  }),[getV]);
  return{speak,stop:useCallback(()=>speechSynthesis.cancel(),[]),onSpeakRef,onDoneRef};
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
            setTxt("Try again...");setOn(false);
            const u=new SpeechSynthesisUtterance("Try again.");
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
  welcome:["Hi! I'm Bella 🐼! 🌟","Ready to learn something amazing?","Let's have fun together!"],
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

const BellaChar=({mood,size=70,speaking=false,hiFive=false,joyMode=false,shake=""})=>{
  const s=size;
  const W=mood==="waving",C=mood==="clapping",T=mood==="thinking",P=mood==="pointing",S=mood==="star",E=mood==="excited",PR=mood==="proud";
  return<svg width={s} height={s} viewBox="0 0 80 85" style={{overflow:"visible"}}>
    <defs><style>{`
      @keyframes pFloat{0%,100%{transform:translateY(0) translateX(0)}25%{transform:translateY(-3px) translateX(2px)}50%{transform:translateY(-5px) translateX(0)}75%{transform:translateY(-3px) translateX(-2px)}}
      @keyframes pBlink{0%,92%,100%{ry:3.5}96%{ry:0.3}}
      @keyframes pMouth{0%{ry:1.5;rx:3}20%{ry:4;rx:4.5}45%{ry:2;rx:3}65%{ry:4.5;rx:5}85%{ry:2.5;rx:3.5}100%{ry:1.5;rx:3}}
      @keyframes pWave{0%,100%{transform:rotate(0deg)}20%{transform:rotate(-30deg)}40%{transform:rotate(25deg)}60%{transform:rotate(-20deg)}80%{transform:rotate(15deg)}}
      @keyframes pClapR{0%,100%{transform:translate(0,0)}50%{transform:translate(5px,-3px)}}
      @keyframes pClapL{0%,100%{transform:translate(0,0)}50%{transform:translate(-5px,-3px)}}
      @keyframes pEar{0%,100%{transform:rotate(0deg)}50%{transform:rotate(6deg)}}
      @keyframes pSpark{0%,100%{opacity:0;transform:scale(.5)}50%{opacity:1;transform:scale(1.1)}}
      @keyframes pTailWag{0%,100%{transform:rotate(-6deg)}50%{transform:rotate(10deg)}}
      @keyframes pBlush{0%,100%{opacity:.3}50%{opacity:.65}}
      @keyframes pNod{0%,100%{transform:rotate(0deg)}50%{transform:rotate(3deg)}}
      @keyframes pLookAround{0%,100%{transform:rotate(0deg) translateX(0)}15%{transform:rotate(-5deg) translateX(-2px)}35%{transform:rotate(6deg) translateX(3px)}55%{transform:rotate(-3deg) translateX(-1px)}75%{transform:rotate(7deg) translateX(2px)}90%{transform:rotate(-2deg) translateX(-1px)}}
      @keyframes pHiFive{0%{transform:rotate(0deg) scale(1)}30%{transform:rotate(-15deg) scale(1.2)}60%{transform:rotate(10deg) scale(1.1)}100%{transform:rotate(0deg) scale(1)}}
      @keyframes pJoySpin{0%{transform:rotate(0deg)}25%{transform:rotate(8deg)}50%{transform:rotate(-8deg)}75%{transform:rotate(5deg)}100%{transform:rotate(0deg)}}
      @keyframes pHandReach{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(10px,-15px) rotate(-30deg)}}
      @keyframes pHeadYes{0%,100%{transform:rotate(0deg) translateY(0)}20%{transform:rotate(10deg) translateY(3px)}40%{transform:rotate(-4deg) translateY(-1px)}60%{transform:rotate(8deg) translateY(2px)}80%{transform:rotate(-3deg) translateY(-1px)}}
      @keyframes pHeadNo{0%,100%{transform:rotate(0deg) translateX(0)}15%{transform:rotate(-12deg) translateX(-4px)}35%{transform:rotate(12deg) translateX(4px)}55%{transform:rotate(-10deg) translateX(-3px)}75%{transform:rotate(10deg) translateX(3px)}90%{transform:rotate(-5deg) translateX(-1px)}}
      @keyframes pSadBody{0%,100%{transform:translateY(0)}50%{transform:translateY(3px)}}
    `}</style>
      <radialGradient id="pf" cx="40%" cy="30%"><stop offset="0%" stopColor="#fff"/><stop offset="100%" stopColor="#EDEDED"/></radialGradient>
      <radialGradient id="pp" cx="50%" cy="40%"><stop offset="0%" stopColor="#3a3a3a"/><stop offset="100%" stopColor="#111"/></radialGradient>
    </defs>
    <g style={{animation:shake==="no"?"pSadBody 1s ease-in-out infinite":joyMode?"pJoySpin 0.4s ease-in-out infinite":"pFloat 3s ease-in-out infinite"}}>
      <ellipse cx="40" cy="83" rx="14" ry="2.5" fill="rgba(0,0,0,.06)"/>
      {/* Tail */}
      <g style={{transformOrigin:"54px 65px",animation:"pTailWag 1.2s ease-in-out infinite"}}>
        <ellipse cx="56" cy="64" rx="5" ry="4" fill="#333"/>
      </g>
      {/* Body */}
      <ellipse cx="40" cy="56" rx="17" ry="17" fill="url(#pf)"/>
      <ellipse cx="40" cy="58" rx="10" ry="11" fill="#F6F6F6"/>
      {/* Legs */}
      <ellipse cx="32" cy="71" rx="6" ry="4.5" fill="#333"/>
      <ellipse cx="48" cy="71" rx="6" ry="4.5" fill="#333"/>
      <circle cx="30" cy="73" r="1" fill="#FFB4B4"/><circle cx="32" cy="74" r="1" fill="#FFB4B4"/><circle cx="34" cy="73" r="1" fill="#FFB4B4"/>
      <circle cx="46" cy="73" r="1" fill="#FFB4B4"/><circle cx="48" cy="74" r="1" fill="#FFB4B4"/><circle cx="50" cy="73" r="1" fill="#FFB4B4"/>
      {/* Left arm */}
      <g style={{transformOrigin:"24px 50px",animation:C?"pClapL .4s ease-in-out infinite":"none"}}>
        <ellipse cx={T?30:22} cy={T?37:52} rx="6.5" ry="5" fill="#333" transform={T?"rotate(50,30,37)":"rotate(15,22,52)"}/>
        {T&&<circle cx="31" cy="33" r="2.5" fill="#333"/>}
      </g>
      {/* Right arm */}
      <g style={{transformOrigin:"56px 50px",animation:W?"pWave .8s ease-in-out infinite":C?"pClapR .4s ease-in-out infinite":"none"}}>
        <ellipse cx={W||P?58:58} cy={W||P?36:52} rx="6.5" ry="5" fill="#333" transform={W?"rotate(-30,58,36)":P?"rotate(-50,58,36)":"rotate(-15,58,52)"}/>
        {P&&<><line x1="62" y1="32" x2="66" y2="23" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/><circle cx="66" cy="22" r="1.8" fill="#333"/></>}
      </g>
      {/* Head */}
      <g style={{transformOrigin:"40px 26px",animation:shake==="yes"?"pHeadYes 0.4s ease-in-out infinite":shake==="no"?"pHeadNo 0.3s ease-in-out infinite":joyMode?"pJoySpin 0.5s ease-in-out infinite":T?"pNod 3s ease-in-out infinite":speaking?"pNod 1.5s ease-in-out infinite":"pLookAround 8s ease-in-out infinite"}}>
        <ellipse cx="40" cy="26" rx="17" ry="15" fill="url(#pf)"/>
        {/* Ears */}
        <g style={{transformOrigin:"24px 13px",animation:(E||S)?"pEar .5s ease-in-out infinite":"none"}}>
          <circle cx="24" cy="13" r="7.5" fill="#333"/><circle cx="24" cy="13" r="4" fill="#FFB4B4" opacity=".45"/>
        </g>
        <g style={{transformOrigin:"56px 13px",animation:(E||S)?"pEar .5s ease-in-out .1s infinite":"none"}}>
          <circle cx="56" cy="13" r="7.5" fill="#333"/><circle cx="56" cy="13" r="4" fill="#FFB4B4" opacity=".45"/>
        </g>
        {/* Eye patches */}
        <ellipse cx="32" cy="25" rx="8" ry="6.5" fill="url(#pp)" transform="rotate(-5,32,25)"/>
        <ellipse cx="48" cy="25" rx="8" ry="6.5" fill="url(#pp)" transform="rotate(5,48,25)"/>
        {/* Eyes */}
        <ellipse cx="32" cy="25" rx="4" ry="3.8" fill="#fff"/>
        <ellipse cx="48" cy="25" rx="4" ry="3.8" fill="#fff"/>
        <ellipse style={{animation:"pBlink 3.5s ease-in-out infinite"}} cx={T?31:33} cy="25" rx="2.5" ry="3.5" fill="#111"/>
        <ellipse style={{animation:"pBlink 3.5s ease-in-out infinite"}} cx={T?47:49} cy="25" rx="2.5" ry="3.5" fill="#111"/>
        <circle cx={T?31.5:33.5} cy="23.5" r="1" fill="#fff"/><circle cx={T?47.5:49.5} cy="23.5" r="1" fill="#fff"/>
        {/* Nose */}
        <ellipse cx="40" cy="31" rx="3" ry="2.2" fill="#222"/><ellipse cx="39.5" cy="30.5" rx=".9" ry=".6" fill="#444"/>
        {/* Mouth */}
        {speaking?
          <ellipse cx="40" cy="35.5" rx="3" ry="2" fill="#D93B4B" stroke="#222" strokeWidth=".5" style={{animation:"pMouth .35s linear infinite"}}/>:
          (E||S)?<path d="M 35,35 Q 40,41 45,35" fill="#D93B4B" stroke="#222" strokeWidth=".6"/>:
          PR?<path d="M 36,35 Q 40,39 44,35" fill="none" stroke="#222" strokeWidth=".9" strokeLinecap="round"/>:
          shake==="no"?<path d="M 36,38 Q 40,35 44,38" fill="none" stroke="#222" strokeWidth=".9" strokeLinecap="round"/>:
          <path d="M 35,35 Q 40,39 45,35" fill="none" stroke="#E23744" strokeWidth="1" strokeLinecap="round"/>
        }
        {/* Blush */}
        <ellipse cx="25" cy="31" rx="3.5" ry="2" fill="#FFB4B4" opacity=".4" style={{animation:"pBlush 2s ease-in-out infinite"}}/>
        <ellipse cx="55" cy="31" rx="3.5" ry="2" fill="#FFB4B4" opacity=".4" style={{animation:"pBlush 2s ease-in-out .3s infinite"}}/>
        {/* Hat */}
        <ellipse cx="40" cy="13" rx="12" ry="3.5" fill="#6366F1"/><ellipse cx="40" cy="11" rx="9" ry="5.5" fill="#6366F1"/><circle cx="40" cy="6.5" r="2" fill="#818CF8"/>
      </g>
      {/* Effects */}
      {(S||E)&&[{x:3,y:7,e:"✨",d:0},{x:68,y:3,e:"⭐",d:.4},{x:70,y:44,e:"🌟",d:.8}].map((p,i)=>
        <text key={i} x={p.x} y={p.y} fontSize="8" style={{animation:`pSpark 1s ease-in-out ${p.d}s infinite`}}>{p.e}</text>
      )}
      {PR&&[{x:6,y:11,e:"💕",d:0},{x:64,y:7,e:"💖",d:.5}].map((p,i)=>
        <text key={i} x={p.x} y={p.y} fontSize="8" style={{animation:`pSpark 1.5s ease-in-out ${p.d}s infinite`}}>{p.e}</text>
      )}
      {C&&<text x="34" y="46" fontSize="9" style={{animation:"pSpark .4s ease-in-out infinite"}}>👏</text>}
      {W&&<text x="65" y="30" fontSize="8" style={{animation:"pSpark .6s ease-in-out infinite"}}>✨</text>}
      {/* High-five hand */}
      {hiFive&&<g style={{animation:"pHiFive 0.8s ease-in-out infinite",transformOrigin:"60px 30px"}}>
        <text x="50" y="20" fontSize="24" style={{animation:"pHandReach 0.6s ease-in-out infinite"}}>✋</text>
        <text x="10" y="10" fontSize="10" style={{animation:"pSpark .5s ease-in-out infinite"}}>⭐</text>
        <text x="60" y="5" fontSize="10" style={{animation:"pSpark .5s ease-in-out .2s infinite"}}>✨</text>
        <text x="5" y="50" fontSize="8" style={{animation:"pSpark .5s ease-in-out .4s infinite"}}>🌟</text>
      </g>}
    </g>
  </svg>;
};

const Particles=({count=10,emojis=["⭐","✨","🌟","💫"]})=>{const items=useRef(Array.from({length:count},(_,i)=>({id:i,emoji:emojis[i%emojis.length],x:Math.random()*100,y:Math.random()*100,sz:12+Math.random()*14,dur:8+Math.random()*12,dl:-Math.random()*10,dr:20+Math.random()*40}))).current;return<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>{items.map(p=><div key={p.id} style={{position:"absolute",left:`${p.x}%`,top:`${p.y}%`,fontSize:p.sz,opacity:0.25,animation:`floatP ${p.dur}s ease-in-out ${p.dl}s infinite`,"--dr":`${p.dr}px`}}>{p.emoji}</div>)}</div>;};
const Confetti=({active})=>{if(!active)return null;return<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:999}}>{Array.from({length:40},(_,i)=><div key={i} style={{position:"absolute",left:`${10+Math.random()*80}%`,top:"-5%",width:6+Math.random()*8,height:4+Math.random()*5,background:["#FC8019","#60B246","#E23744","#5D8CF4","#FF9933","#8B5CF6","#EC4899","#FBBF24"][i%8],borderRadius:2,animation:`confFall ${1+Math.random()*1.5}s ease-in ${Math.random()*0.5}s forwards`}}/>)}</div>;};
const Stars=({count,size=26})=><div style={{display:"flex",gap:4,justifyContent:"center",margin:"8px 0"}}>{[1,2,3,4,5].map(i=><span key={i} style={{fontSize:size,opacity:i<=count?1:0.2,filter:i<=count?"drop-shadow(0 2px 8px rgba(251,191,36,0.5))":"none",animation:i<=count?`starPop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i*0.12}s both`:"none"}}>{i<=count?"⭐":"☆"}</span>)}</div>;
const Mascot=({mood="happy",msg=""})=>{const f={happy:"😊",excited:"🤩",thinking:"🤔",listening:"👂",cheering:"🥳",speaking:"🗣️",sad:"🥺"};return<div style={{display:"flex",alignItems:"flex-end",gap:10,margin:"4px 0"}}><div style={{fontSize:26,animation:"mascotB 2s ease-in-out infinite",flexShrink:0}}>{f[mood]||"😊"}</div>{msg&&<div style={{background:"#F1F3F7",borderRadius:"18px 18px 18px 4px",padding:"4px 10px",fontSize:11,fontWeight:600,color:"#3E4152",boxShadow:"0 2px 8px rgba(0,0,0,.08)",animation:"bubPop 0.3s cubic-bezier(0.34,1.56,0.64,1)",maxWidth:260,fontFamily:"'Poppins',sans-serif",lineHeight:1.4}}>{msg}</div>}</div>;};
const SoundWave=()=><div style={{display:"flex",justifyContent:"center",gap:3,marginTop:14}}>{[1,2,3,4,5,6,7].map(i=><div key={i} style={{width:4,background:"#EF4444",borderRadius:4,animation:`sndWave 0.8s ease-in-out ${i*0.08}s infinite`}}/>)}</div>;
const ProgressRing=({pct,size=70,color="#22C55E"})=>{const r=(size-10)/2;const c=2*Math.PI*r;return<svg width={size} height={size} style={{transform:"rotate(-90deg)"}}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={10}/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={10} strokeDasharray={c} strokeDashoffset={c-((pct||0)/100)*c} strokeLinecap="round" style={{transition:"stroke-dashoffset 1s ease-out"}}/></svg>;};
const SubHead=({title,onBack,points})=><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 10px",background:"#F8F9FB",backdropFilter:"blur(20px)",borderBottom:"1px solid #EFEFEF",position:"sticky",top:0,zIndex:50}}><button onClick={onBack} style={{padding:"8px 16px",borderRadius:14,border:"2px solid #E8E8E8",background:"#F1F3F7",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>← Back</button><span style={{fontFamily:"'Poppins',sans-serif",fontSize:17,fontWeight:700,color:"#1C1C2B"}}>{title}</span><div style={{display:"flex",alignItems:"center",gap:4,padding:"6px 14px",borderRadius:16,background:"linear-gradient(135deg,#FEF3C7,#FDE68A)",fontSize:13,fontWeight:800,color:"#FC8019"}}><span style={{animation:"coinSp 2s ease-in-out infinite"}}>💰</span>{points||0}</div></div>;
const FlowSteps=({current,steps})=><div style={{display:"flex",gap:4,justifyContent:"center",margin:"2px 6px 2px",flexWrap:"wrap"}}>{steps.map((s,i)=>{const done=steps.findIndex(x=>x.id===current)>i;const act=current===s.id;return<div key={s.id} style={{display:"flex",alignItems:"center",gap:3}}><div style={{padding:"3px 8px",borderRadius:8,fontSize:9,fontWeight:800,fontFamily:"'Poppins',sans-serif",background:act?"linear-gradient(135deg,#6366F1,#8B5CF6)":done?"#22C55E":"#e5e7eb",color:(act||done)?"#fff":"#aaa",transition:"all 0.3s",transform:act?"scale(1.08)":"scale(1)"}}>{s.icon} {s.label}</div>{i<steps.length-1&&<span style={{color:"#D4D5D9",fontSize:10}}>→</span>}</div>;})}</div>;
const ListeningBox=({transcript,onTapMic,isListening,error,onType,expected})=>{
  const[typed,setTyped]=useState("");
  return <div data-panda="mic-area" style={{textAlign:"center",padding:12,background:"#F1F3F7",borderRadius:20,border:"2px solid #6366F111"}}>
    <div style={{display:"flex",alignItems:"center",gap:12}}>
      <button onClick={onTapMic} style={{
        width:56,height:56,borderRadius:"50%",border:"none",cursor:"pointer",flexShrink:0,
        background:isListening?"linear-gradient(135deg,#EF4444,#DC2626)":"linear-gradient(135deg,#6366F1,#8B5CF6)",
        boxShadow:isListening?"0 0 0 6px rgba(239,68,68,0.15)":"0 4px 12px rgba(99,102,241,0.2)",
        animation:isListening?"micP 1.5s ease-in-out infinite":"none",
        display:"flex",alignItems:"center",justifyContent:"center"
      }}>
        <span style={{fontSize:28}}>🎤</span>
      </button>
      <div style={{flex:1,textAlign:"left"}}>
        <p style={{fontSize:12,fontWeight:800,color:isListening?"#DC2626":error?"#D97706":"#6366F1",margin:0}}>
          {isListening?"🔴 Listening...":error||"Speak now!"}
        </p>
        <p style={{fontSize:16,fontWeight:900,color:"#1C1C2B",margin:"2px 0 0",letterSpacing:1}}>"{expected?.toUpperCase()}"</p>
        {transcript&&<p style={{fontSize:11,fontWeight:700,color:"#22C55E",margin:"2px 0 0"}}>Heard: "{transcript}"</p>}
      </div>
    </div>
    {isListening&&<SoundWave/>}
    <div style={{display:"flex",gap:6,marginTop:8}}>
      <input value={typed} onChange={e=>setTyped(e.target.value)} placeholder="Or type here..."
        style={{flex:1,padding:"7px 10px",borderRadius:10,border:"2px solid #E8E8E8",fontSize:13,fontWeight:600,fontFamily:"'Poppins',sans-serif",outline:"none",boxSizing:"border-box"}}
        onKeyDown={e=>{if(e.key==="Enter"&&typed.trim())onType(typed.trim().toLowerCase());}}
      />
      <button onClick={()=>{if(typed.trim())onType(typed.trim().toLowerCase());}}
        style={{padding:"7px 14px",borderRadius:10,background:"#6366F1",color:"#1C1C2B",border:"none",fontWeight:800,fontSize:12,cursor:"pointer"}}>Go</button>
    </div>
  </div>;
};
const ResultBox=({acc,result,expected,onRetry,onDone,color,kidName,currentPoints})=>{
  const s=getStars(acc);const p=getStarPts(s);const nm=kidName||"Buddy";
  const pass=acc>=50; // 50% = pass for kids
  const nextReward=REWARDS.filter(r=>r.cost>(currentPoints||0)).sort((a,b)=>a.cost-b.cost)[0];
  const ptsNeeded=nextReward?(nextReward.cost-(currentPoints||0)):0;
  return<div data-panda="result-box" style={{padding:10,background:"#F1F3F7",borderRadius:18,boxShadow:"0 8px 24px rgba(0,0,0,0.06)",animation:"resBounce 0.5s cubic-bezier(0.34,1.56,0.64,1)"}}>
    {/* Stars + Score row */}
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
      <Stars count={s}/>
      <div style={{position:"relative",display:"inline-block"}}>
        <ProgressRing pct={acc} color={pass?"#22C55E":"#F59E0B"}/>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontFamily:"'Poppins',sans-serif",fontSize:18,fontWeight:800,color:pass?"#22C55E":"#F59E0B"}}>{acc}%</span>
        </div>
      </div>
    </div>
    {/* Mascot message */}
    <Mascot mood={s>=4?"cheering":s>=3?"excited":s>=1?"happy":"sad"}
      msg={s>=4?`WOW ${nm}! SUPERSTAR! 🌟`:s>=3?`Great job ${nm}! 🎉`:s>=1?`Good try ${nm}! 💪`:`Keep trying ${nm}! 💫`}/>
    {/* HEARD vs EXPECTED - clear split box */}
    <div style={{display:"flex",gap:6,margin:"6px 0"}}>
      <div style={{flex:1,padding:"8px 10px",borderRadius:14,background:pass?"#F0FDF4":"#FEF2F2",border:`2px solid ${pass?"#22C55E33":"#EF444433"}`,textAlign:"center"}}>
        <div style={{fontSize:9,fontWeight:800,color:"#93959F",textTransform:"uppercase",letterSpacing:1}}>You said</div>
        <div style={{fontFamily:"'Poppins',sans-serif",fontSize:16,fontWeight:800,color:pass?"#16A34A":"#DC2626",marginTop:2}}>"{result}"</div>
      </div>
      <div style={{flex:1,padding:"8px 10px",borderRadius:14,background:"#FFF5EB",border:"2px solid #6366F133",textAlign:"center"}}>
        <div style={{fontSize:9,fontWeight:800,color:"#93959F",textTransform:"uppercase",letterSpacing:1}}>Correct</div>
        <div style={{fontFamily:"'Poppins',sans-serif",fontSize:16,fontWeight:800,color:"#FC8019",marginTop:2}}>"{expected}"</div>
      </div>
    </div>
    {/* Points */}
    {p>0&&<div style={{fontSize:18,fontWeight:900,color:"#22C55E",fontFamily:"'Poppins',sans-serif",textAlign:"center",margin:"4px 0"}}>+{p} points! 💰</div>}
    {/* Reward hint */}
    {nextReward&&ptsNeeded<=50&&<div style={{padding:"6px 10px",background:"rgba(251,191,36,0.15)",borderRadius:12,textAlign:"center",margin:"4px 0"}}>
      <span style={{fontSize:11,fontWeight:800,color:"#FC8019"}}>{ptsNeeded} more for {nextReward.emoji} {nextReward.name}!</span>
    </div>}
    {/* Buttons */}
    <div style={{display:"flex",gap:8,marginTop:8}}>
      {!pass&&<button onClick={onRetry} style={{flex:1,padding:10,borderRadius:14,border:"none",background:"linear-gradient(135deg,#F59E0B,#D97706)",color:"#1C1C2B",fontSize:13,fontWeight:800,fontFamily:"'Poppins',sans-serif",cursor:"pointer"}}>🔄 Try Again</button>}
      <button onClick={onDone} style={{flex:1,padding:10,borderRadius:14,border:"none",background:`linear-gradient(135deg,${color||"#22C55E"},${color||"#16A34A"})`,color:"#1C1C2B",fontSize:13,fontWeight:800,fontFamily:"'Poppins',sans-serif",cursor:"pointer"}}>{pass?"🎉 Next!":"✅ Done"}</button>
    </div>
  </div>;
};

const NUM_STEPS=[{id:"saying_number",icon:"🔊",label:"Number"},{id:"spelling",icon:"🔤",label:"Spelling"},{id:"saying_sentence",icon:"💬",label:"Sentence"},{id:"saying_phonics",icon:"🔡",label:"Phonics"},{id:"countdown",icon:"⏱️",label:"Ready"},{id:"result",icon:"⭐",label:"Stars"}];
const PH_STEPS=[{id:"saying_word",icon:"🔊",label:"Word"},{id:"spelling",icon:"🔤",label:"Spelling"},{id:"saying_sentence",icon:"💬",label:"Sentence"},{id:"saying_phonics",icon:"🔡",label:"Phonics"},{id:"countdown",icon:"⏱️",label:"Ready"},{id:"result",icon:"⭐",label:"Stars"}];

// ═══════════════════════════════════════════════════════════════
// 🎮 MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App(){
  const{data:prof,save,loaded}=useStore();const{speak,stop,onSpeakRef,onDoneRef}=useSpeech();const rec=useRec();
  const[scr,setScr]=useState("splash");
  const[obN,setObN]=useState("");const[obA,setObA]=useState(4);const[obG,setObG]=useState("boy");const[obAv,setObAv]=useState(0);const[obSt,setObSt]=useState(0);
  const[selNum,setSelNum]=useState(null);const[numTab,setNumTab]=useState("learn"); // "learn" or "math"
  const[mathProblem,setMathProblem]=useState(null);const[mathAnswer,setMathAnswer]=useState(null);const[mathChoices,setMathChoices]=useState([]);const[mathFb,setMathFb]=useState(null);const[mathScore,setMathScore]=useState(0);const[mathTotal,setMathTotal]=useState(0);const[nStep,setNStep]=useState("idle");const[aPhI,setAPhI]=useState(-1);const[spRes,setSpRes]=useState(null);const[spAcc,setSpAcc]=useState(null);
  const[phCat,setPhCat]=useState("animals");const[phW,setPhW]=useState(null);const[phStep,setPhStep]=useState("idle");const[phAI,setPhAI]=useState(-1);const[phRes,setPhRes]=useState(null);const[phAcc,setPhAcc]=useState(null);
  // Shapes + Colors detail
  const[selShape,setSelShape]=useState(null);const[shStep,setShStep]=useState("idle");const[shAI,setShAI]=useState(-1);const[shRes,setShRes]=useState(null);const[shAcc,setShAcc]=useState(null);
  const[selColor,setSelColor]=useState(null);const[coStep,setCoStep]=useState("idle");const[coAI,setCoAI]=useState(-1);const[coRes,setCoRes]=useState(null);const[coAcc,setCoAcc]=useState(null);
  const[confetti,setConfetti]=useState(false);const[teacherMsg,setTeacherMsg]=useState("");const[teacherMood,setTeacherMood]=useState("waving");const[pandaPos,setPandaPos]=useState({x:20,y:80});const[pandaEmoji,setPandaEmoji]=useState("");const[isSpeaking,setIsSpeaking]=useState(false);const[pandaSize,setPandaSize]=useState(70);const[highFive,setHighFive]=useState(false);const[joyFly,setJoyFly]=useState(false);const[headShake,setHeadShake]=useState("");const[guideTour,setGuideTour]=useState(false);
  const teacherIdleRef=useRef(null);
  const showTeacher=(mood,msg)=>{setTeacherMood(mood);setTeacherMsg(msg);};
  // Lip sync only — position handled by CSS
  useEffect(()=>{
    const iv=setInterval(()=>setIsSpeaking(speechSynthesis.speaking),200);
    return()=>clearInterval(iv);
  },[]);
  const pandaEmojiTimer=useRef(null);
  // Head reactions
  const headYes=()=>{setHeadShake("yes");setTimeout(()=>setHeadShake(""),1500);};
  const headNo=()=>{setHeadShake("no");setTimeout(()=>setHeadShake(""),1500);};

  // Guided tour of home tiles
  const doHomeTour=async()=>{
    setGuideTour(true);
    const tiles=[
      {id:"numbers",msg:"This is Numbers! You can learn counting and math here!"},
      {id:"alphabet",msg:"This is A B C! Learn all the letters of the alphabet!"},
      {id:"phonics",msg:"This is Phonics! Learn to read over 500 words!"},
      {id:"basics",msg:"This is Basics! Practice finding and writing numbers!"},
      {id:"shapes",msg:"This is Shapes! Learn circles, triangles and more!"},
      {id:"colors",msg:"This is Colors! Discover the rainbow!"},
      {id:"rewards",msg:"This is Rewards! Spend your points on cool prizes!"},
      {id:"settings",msg:"And this is Settings! Change your profile here!"},
    ];
    for(const tile of tiles){
      if(!guideTour)break;
      const el=document.querySelector('[data-tile="'+tile.id+'"]');
      if(el){
        const r=el.getBoundingClientRect();
        setPandaPos({x:Math.min(r.left-10,window.innerWidth-78),y:Math.max(r.top-20,10)});
        setTeacherMood("pointing");
      }
      await speak(tile.msg,{rate:0.6,pitch:1.0});
      await wait(400);
    }
    setTeacherMood("star");
    setPandaPos({x:window.innerWidth/2-35,y:window.innerHeight/2-35});
    await speak("So, what do you want to learn today? Tap anything to start!",{rate:0.6,pitch:1.0});
    await wait(500);
    movePandaTo("topRight");
    setGuideTour(false);
  };

  // High-five: panda zooms to center, gets big, shows hand
  const doHighFive=async()=>{
    setHighFive(true);
    setPandaSize(130);
    setPandaPos({x:window.innerWidth/2-65,y:window.innerHeight/2-65});
    setTeacherMood("clapping");
    await wait(1800);
    setHighFive(false);
    setPandaSize(70);
    movePandaTo("midRight");
  };
  // Joy fly: panda does a quick loop around screen
  const doJoyFly=()=>{
    setJoyFly(true);setTeacherMood("star");
    const w=window.innerWidth,h=window.innerHeight;
    const path=[{x:w/2-30,y:30},{x:w-70,y:h/3},{x:w/2-30,y:h/2},{x:10,y:h/3},{x:w/2-30,y:30}];
    let i=0;
    const step=()=>{
      if(i>=path.length){setJoyFly(false);movePandaTo("midRight");return;}
      setPandaPos(path[i]);i++;
      setTimeout(step,350);
    };
    step();
  };
  const flyTo=(e,mood)=>{
    if(!e?.currentTarget)return;
    const rect=e.currentTarget.getBoundingClientRect();
    const x=Math.min(rect.right+10,window.innerWidth-78);
    const y=Math.max(rect.top+rect.height/2-30,10);
    setPandaPos({x,y});
    if(mood)setTeacherMood(mood);
  };
  const movePandaTo=(position)=>{
    const w=window.innerWidth,h=window.innerHeight;
    const positions={
      topRight:{x:w-78,y:10},
      midRight:{x:w-78,y:h/2-35},
      bottomRight:{x:w-78,y:h-90},
      topLeft:{x:10,y:58},
      midLeft:{x:10,y:h/2-30},
      center:{x:w/2-35,y:h/2-35},
    };
    setPandaPos(positions[position]||positions.midRight);
  };
  // Hover near a specific content element
  const hoverNear=(selector,side="right",mood)=>{
    setTimeout(()=>{
      const el=document.querySelector(`[data-panda="${selector}"]`);
      if(!el)return;
      const r=el.getBoundingClientRect();
      let x,y;
      if(side==="right"){x=Math.min(r.right+6,window.innerWidth-78);y=r.top+r.height/2-30;}
      else if(side==="left"){x=Math.max(r.left-68,4);y=r.top+r.height/2-30;}
      else if(side==="above"){x=r.left+r.width/2-30;y=Math.max(r.top-68,4);}
      else if(side==="below"){x=r.left+r.width/2-30;y=Math.min(r.bottom+6,window.innerHeight-80);}
      else{x=r.left+r.width/2-30;y=r.top+r.height/2-30;}
      setPandaPos({x:Math.max(4,Math.min(x,window.innerWidth-78)),y:Math.max(4,Math.min(y,window.innerHeight-80))});
      if(mood)setTeacherMood(mood);
    },150); // small delay so DOM has rendered
  };
  const showPandaEmoji=(emoji)=>{
    setPandaEmoji(emoji);
    clearTimeout(pandaEmojiTimer.current);
    pandaEmojiTimer.current=setTimeout(()=>setPandaEmoji(""),1500);
  };
  useEffect(()=>{
    onSpeakRef.current=(text)=>{
      let mood="happy";const lo=text.toLowerCase();
      if(lo.includes("correct")||lo.includes("perfect")||lo.includes("well done")||lo.includes("amazing")){mood="star";showPandaEmoji("⭐");}
      else if(lo.includes("try again")||lo.includes("not quite")||lo.includes("almost")){mood="thinking";showPandaEmoji("💪");}
      else if(lo.includes("find")||lo.includes("tap")||lo.includes("match"))mood="pointing";
      else if(lo.includes("spell")||lo.includes("watch")||lo.includes("let"))mood="excited";
      else if(lo.includes("great")||lo.includes("good")||lo.includes("earned")){mood="proud";showPandaEmoji("🎉");}
      setTeacherMood(mood);setTeacherMsg(text.length>55?text.slice(0,52)+"...":text);
      clearTimeout(teacherIdleRef.current);
    };
    onDoneRef.current=()=>{
      clearTimeout(teacherIdleRef.current);
      teacherIdleRef.current=setTimeout(()=>{
        const idle=["What shall we do next?","Tap something!","I'm here to help!","Keep learning!","You're doing great!"];
        setTeacherMood("happy");setTeacherMsg(idle[Math.floor(Math.random()*idle.length)]);
      },4000);
    };
    return()=>{onSpeakRef.current=null;onDoneRef.current=null;clearTimeout(teacherIdleRef.current);};
  },[]);
  useEffect(()=>{
    const msgs={home:["waving","Hi! Ready to learn?"],numbers:["excited","Numbers time!"],phonics:["happy","Word magic!"],shapes:["excited","Shape hunt!"],colors:["happy","Color world!"],alphabet:["star","ABC time!"],basics:["pointing","Practice time!"],rewards:["excited","Your prizes!"],settings:["happy","Your profile!"]};
    const m=msgs[scr];if(m)showTeacher(m[0],m[1]);
    // Position panda based on screen
    const pos={home:"topRight",numbers:"midRight",phonics:"midRight",shapes:"midRight",colors:"midRight",alphabet:"midRight",basics:"midRight",rewards:"topRight",settings:"topRight",splash:"center",onboard:"midRight"};
    setTimeout(()=>movePandaTo(pos[scr]||"midRight"),100);
  },[scr]);
  // Basics state
  const[basicsTab,setBasicsTab]=useState("explore"); // "explore", "find", "write"
  const[findTarget,setFindTarget]=useState(null);const[findScore,setFindScore]=useState(0);const[findStreak,setFindStreak]=useState(0);const[findFb,setFindFb]=useState(null);const[findUsed,setFindUsed]=useState([]);const[findLevel,setFindLevel]=useState(1);
  const[foundNum,setFoundNum]=useState(null); // shows celebration + spelling when correct
  const[writeNum,setWriteNum]=useState(1);
  // Alphabet state
  const[alphaTab,setAlphaTab]=useState("caps"); // "caps","small","match"
  const[selLetter,setSelLetter]=useState(null); // selected letter for detail
  const[matchPairs,setMatchPairs]=useState([]); // match game pairs
  const[matchLeft,setMatchLeft]=useState(null);const[matchIdx,setMatchIdx]=useState(0);const[matchWrong,setMatchWrong]=useState(null);const[matchCorrect,setMatchCorrect]=useState(null);const[matchOpts,setMatchOpts]=useState([]);
  const[matchScore,setMatchScore]=useState(0);const[matchDone,setMatchDone]=useState([]);const[drawPts,setDrawPts]=useState(0);const[writeOk,setWriteOk]=useState(false);const[writeScore,setWriteScore]=useState(null);
  const cRef=useRef(null);const[ptAnim,setPtAnim]=useState(null);const[rwdMsg,setRwdMsg]=useState(null);
  const[speakMode,setSpeakMode]=useState(true); // toggle for speech practice
  const[countdown,setCountdown]=useState(0); // 3,2,1 countdown
  const[activeSpellIdx,setActiveSpellIdx]=useState(-1); // which letter is being spelled
  const[spellStatus,setSpellStatus]=useState([]); // per-letter: 'waiting'|'listening'|'correct'|'skipped'
  const pRef=useRef(false);

  const initDone=useRef(false);
  const welcomeSpoken=useRef(false);
  // Welcome speech function — can be called from init OR first tap
  const doWelcome=useCallback(()=>{
    if(welcomeSpoken.current)return;
    welcomeSpoken.current=true;
    speak("Welcome to Little Genius! I am Bella, your friendly panda! Let us have fun learning together!",{rate:0.6,pitch:1.0});
    setTeacherMood("waving");
  },[speak]);

  useEffect(()=>{
    if(!loaded||initDone.current)return;
    initDone.current=true;
    setTeacherMood("waving");
    movePandaTo("center");

    // Try to speak immediately — may be blocked by browser autoplay
    const trySpeak=()=>{
      try{
        const voices=speechSynthesis.getVoices();
        if(voices.length>0){
          doWelcome();
        } else {
          setTimeout(trySpeak,400);
        }
      }catch(e){}
    };
    setTimeout(trySpeak,600);

    // Also try speaking via a silent utterance first (unlocks on some browsers)
    try{
      const unlock=new SpeechSynthesisUtterance("");
      unlock.volume=0;
      speechSynthesis.speak(unlock);
      setTimeout(()=>trySpeak(),200);
    }catch(e){}

    const t=setTimeout(()=>{
      setScr(prof?"home":"onboard");
      setTimeout(()=>{
        if(prof){
          const name=prof?.name||"friend";
          speak("Hi "+name+"! Great to see you again! Let us have fun!",{rate:0.6,pitch:1.0});
          setTimeout(()=>doHomeTour(),2500);
        } else {
          speak("Let us set up your profile! Type your name, little genius!",{rate:0.6,pitch:1.0});
          setTeacherMood("pointing");
          movePandaTo("center");
        }
      },800);
    },4500);
    return()=>clearTimeout(t);
  },[loaded]);

  // Fallback: if browser blocked auto-speech, speak on first tap anywhere
  useEffect(()=>{
    const onFirstTap=()=>{
      if(!welcomeSpoken.current)doWelcome();
      document.removeEventListener("click",onFirstTap);
      document.removeEventListener("touchstart",onFirstTap);
    };
    document.addEventListener("click",onFirstTap);
    document.addEventListener("touchstart",onFirstTap);
    return()=>{document.removeEventListener("click",onFirstTap);document.removeEventListener("touchstart",onFirstTap);};
  },[doWelcome]);
  const aCfg=prof?AGE_CFG[prof.age]||AGE_CFG[4]:AGE_CFG[4];

  const boom=()=>{setConfetti(true);setTimeout(()=>setConfetti(false),3000);};
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
  const goHome=()=>{setHighFive(false);setJoyFly(false);setPandaSize(70);stop();pRef.current=false;setScr("home");setSelNum(null);setNStep("idle");setPhW(null);setPhStep("idle");setSelShape(null);setShStep("idle");setSelColor(null);setCoStep("idle");setFindTarget(null);setFindFb(null);setFoundNum(null);setFindUsed([]);setFindLevel(1);setMathProblem(null);setMathFb(null);setMathScore(0);setMathTotal(0);setSelLetter(null);setMatchPairs([]);setMatchLeft(null);setMatchDone([]);setMatchIdx(0);setMatchWrong(null);setMatchCorrect(null);setMatchOpts([]);setDrawPts(0);setWriteOk(false);setWriteScore(null);};

  // ── Callbacks for mic ──
  const kidName = prof?.name || "Buddy";

  const handleNumResult=(result)=>{
    const w=NW[selNum];
    const normalized=normalizeSpoken(result);
    const acc=calcAcc(w,normalized);setSpRes(normalized);setSpAcc(acc);setNStep("result");hoverNear("result-box","right","star");
    const s=getStars(acc);const p=getStarPts(s);
    if(p>0) awardPoints(p,"numbers",selNum);
    if(s>=3)boom();
    // Voice cheer with name and reward motivation!
    setTimeout(()=>{
      const nextR=REWARDS.filter(r=>r.cost>((prof?.points||0)+p)).sort((a,b)=>a.cost-b.cost)[0];
      const need=nextR?(nextR.cost-((prof?.points||0)+p)):0;
      if(s>=4){
        speak(`${kidName}, that was perfect. You are a superstar.`,{rate:0.8,pitch:1.0});
        if(nextR&&need<=30) setTimeout(()=>speak(`Just ${need} more points for a ${nextR.name}. Keep going.`,{rate:0.8,pitch:1.0}),2500);
      }
      else if(s>=3) speak(`Great work ${kidName}. Keep going.`,{rate:0.8,pitch:1.0});
      else if(s>=1){
        speak(`Good try ${kidName}. You can do better.`,{rate:0.8,pitch:1.0});
        if(nextR) setTimeout(()=>speak(`Practice more to earn your ${nextR.name}.`,{rate:0.8,pitch:1.0}),2200);
      }
      else{headNo();setTeacherMood("thinking");speak(`No worries ${kidName}. Let us try again.`,{rate:0.8,pitch:1.0});}
    },300);
  };
  const handlePhResult=(result)=>{
    const normalized=normalizeSpoken(result);
    const acc=calcAcc(phW.word,normalized);setPhRes(normalized);setPhAcc(acc);setPhStep("result");hoverNear("result-box","right","star");
    const s=getStars(acc);const p=getStarPts(s);
    if(p>0) awardPoints(p,"phonics",phW.word);
    if(s>=3)boom();
    setTimeout(()=>{
      const nextR=REWARDS.filter(r=>r.cost>((prof?.points||0)+p)).sort((a,b)=>a.cost-b.cost)[0];
      const need=nextR?(nextR.cost-((prof?.points||0)+p)):0;
      if(s>=4){
        speak(`${kidName}, that was brilliant. You said it perfectly.`,{rate:0.8,pitch:1.0});
        if(nextR&&need<=30) setTimeout(()=>speak(`Almost there. ${need} more points for a ${nextR.name}.`,{rate:0.8,pitch:1.0}),2500);
      }
      else if(s>=3) speak(`Well done ${kidName}. Keep it up.`,{rate:0.8,pitch:1.0});
      else if(s>=1){
        speak(`Good try ${kidName}. Almost there.`,{rate:0.8,pitch:1.0});
        if(nextR) setTimeout(()=>speak(`Keep practicing for your ${nextR.name}.`,{rate:0.8,pitch:1.0}),2200);
      }
      else speak(`Don't give up ${kidName}. You're learning.`,{rate:0.8,pitch:1.0});
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
      await speak(nums[i],{rate:0.7,pitch:1.0,noCancel:true});
      await wait(500);
    }
    setCountdown(0);
    await speak("Go.",{rate:0.75,pitch:1.0,noCancel:true});
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
    speak(tappedLetter,{rate:0.8,pitch:1.0,noCancel:true});
    
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
      
      await speak(LN[letters[i]]||letters[i],{rate:0.7,pitch:1.0,noCancel:true});
      await wait(500);
      
      setSpellStatus(prev=>{const n=[...prev];n[i]='correct';return n;});
      await wait(200);
    }
    setActiveSpellIdx(-1);
    await wait(400);

    // ─── ROUND 2: Tap game (if speakMode) ───
    if(!speakMode || !pRef.current){setSpellRound(0);return;}

    setSpellRound(2);
    setSpellStatus(letters.map(()=>'waiting'));
    setTapIndex(0);
    setTapWrong(-1);

    // Create scrambled letter buttons (with unique IDs for duplicates)
    const scrambled=shuffle(letters.map((l,i)=>({letter:l.toUpperCase(),id:i,used:false})));
    setScrambledLetters(scrambled);

    await speak("Now tap the letters in the right order.",{rate:0.75,pitch:1.0});
    await wait(400);

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
      await speak("Perfect spelling!",{rate:0.8,pitch:1.0});
    } else {
      // Show correct order
      await speak("Let me show you.",{rate:0.75,pitch:1.0});
      setSpellStatus(letters.map(()=>'waiting'));
      for(let i=0;i<letters.length;i++){
        if(!pRef.current) return;
        setActiveSpellIdx(i);
        setSpellStatus(prev=>{const n=[...prev];n[i]='correct';return n;});
        await speak(LN[letters[i]],{rate:0.5,pitch:1.0,noCancel:true});
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

    // Step 1: Say the number with excitement (high pitch, warm)
    setNStep("saying_number");
    await speak(`Hello ${kidName}!`,{rate:0.8,pitch:1.05});
    await wait(300);
    await speak(`This number is, ${w}.`,{rate:0.7,pitch:1.0});
    await wait(500);if(!pRef.current)return;

    // Step 2: Interactive spelling
    setNStep("spelling");hoverNear("spell-area","right","pointing");
    await spellWord(w.replace(/\s/g,''));
    await wait(400);if(!pRef.current)return;
    await speak(`Well done. That spells, ${w}.`,{rate:0.75,pitch:1.0});
    await wait(500);if(!pRef.current)return;

    // Step 3: Sentence
    setNStep("saying_sentence");
    await speak(`Now listen to this sentence.`,{rate:0.8,pitch:1.0});await wait(250);if(!pRef.current)return;
    await speak(scene.sentence,{rate:0.75,pitch:1.0});
    await wait(600);if(!pRef.current)return;

    // Step 4: Phonics - "Now let's understand how to speak this"
    const phs=NPH[num];
    if(phs){
      setNStep("saying_phonics");
      await speak(`Now, let's understand how to speak this word.`,{rate:0.75,pitch:1.0});await wait(400);if(!pRef.current)return;
      for(let i=0;i<phs.length;i++){if(!pRef.current)return;setAPhI(i);await speak(gPh(phs[i]).s,{rate:0.55,pitch:1.0,noCancel:true});await wait(300);}
      setAPhI(-1);await wait(400);if(!pRef.current)return;
      await speak(`And the word is, ${w}.`,{rate:0.7,pitch:1.0});await wait(400);if(!pRef.current)return;
    }

    // Step 5: Speaking practice (if enabled)
    if(speakMode){
      await speak(`${kidName}, your turn. Say, ${w}.`,{rate:0.75,pitch:1.0});await wait(500);if(!pRef.current)return;
      stop();await wait(600);setNStep("listening");pRef.current=false;hoverNear("mic-area","left","happy");showTeacher("happy","I'm listening!");rec.start(handleNumResult);
    }else{
      pRef.current=false;
      if(!isDone("numbers",num)) awardPoints(5,"numbers",num);
      await speak(`Well done ${kidName}.`,{rate:0.8,pitch:1.0});
      setNStep("idle");
    }
  };
  const retryNum=async()=>{showTeacher("happy","Try again! You can do it! 💪");
    setSpRes(null);setSpAcc(null);
    setNStep("countdown");hoverNear("countdown","right","excited");
    await speak(`Try again.`,{rate:0.75,pitch:1.0});await wait(300);
    stop();await wait(600);setNStep("listening");rec.start(handleNumResult);
  };

  // PHONICS PLAY FLOW
  const playPh=async(wd)=>{
    if(pRef.current){stop();pRef.current=false;setPhStep("idle");return;}
    pRef.current=true;setPhW(wd);setPhRes(null);setPhAcc(null);setPhAI(-1);setActiveSpellIdx(-1);setSpellStatus([]);

    // Step 1: Say the word with excitement
    setPhStep("saying_word");
    await speak(`Hello ${kidName}!`,{rate:0.8,pitch:1.05});
    await wait(300);
    await speak(`This word is, ${wd.word}.`,{rate:0.7,pitch:1.0});
    await wait(500);if(!pRef.current)return;

    // Step 2: Interactive spelling
    setPhStep("spelling");hoverNear("spell-area","right","pointing");
    await spellWord(wd.word);
    await wait(400);if(!pRef.current)return;
    await speak(`Well done. That spells, ${wd.word}.`,{rate:0.75,pitch:1.0});
    await wait(500);if(!pRef.current)return;

    // Step 3: Sentence
    setPhStep("saying_sentence");
    await speak(`Now listen to this sentence.`,{rate:0.8,pitch:1.0});await wait(250);if(!pRef.current)return;
    await speak(wd.sentence,{rate:0.75,pitch:1.0});
    await wait(600);if(!pRef.current)return;

    // Step 4: Phonics - "let's understand how to speak this word"
    setPhStep("saying_phonics");
    await speak(`Now, let's understand how to speak this word.`,{rate:0.75,pitch:1.0});await wait(400);if(!pRef.current)return;
    for(let i=0;i<wd.ph.length;i++){if(!pRef.current)return;setPhAI(i);await speak(gPh(wd.ph[i]).s,{rate:0.55,pitch:1.0,noCancel:true});await wait(300);}
    setPhAI(-1);await wait(400);if(!pRef.current)return;
    await speak(`And the word is, ${wd.word}.`,{rate:0.7,pitch:1.0});await wait(400);if(!pRef.current)return;

    // Step 5: Speaking (if enabled)
    if(speakMode){
      await speak(`${kidName}, your turn. Say, ${wd.word}.`,{rate:0.75,pitch:1.0});await wait(500);if(!pRef.current)return;
      stop();await wait(600);setPhStep("listening");pRef.current=false;hoverNear("mic-area","left","happy");showTeacher("happy","Your turn!");rec.start(handlePhResult);
    }else{
      pRef.current=false;
      if(!isDone("phonics",wd.word)) awardPoints(5,"phonics",wd.word);
      await speak(`Well done ${kidName}.`,{rate:0.8,pitch:1.0});
      setPhStep("idle");
    }
  };
  const retryPh=async()=>{showTeacher("happy","One more try! I believe in you! 🌈");
    setPhRes(null);setPhAcc(null);
    setPhStep("countdown");hoverNear("countdown","right","excited");
    await speak(`Try again.`,{rate:0.75,pitch:1.0});await wait(300);
    stop();await wait(600);setPhStep("listening");rec.start(handlePhResult);
  };

  // ═══ SHAPE PLAY FLOW ═══
  const handleShResult=(result)=>{
    const normalized=normalizeSpoken(result);
    const acc=calcAcc(selShape.name,normalized);setShRes(normalized);setShAcc(acc);setShStep("result");
    const s=getStars(acc);const p=getStarPts(s);
    if(p>0) awardPoints(p,"shapes",selShape.name);
    if(s>=3)boom();
    setTimeout(()=>{
      if(s>=3) speak(`${kidName}, that was great.`,{rate:0.8,pitch:1.0});
      else speak(`Good try ${kidName}.`,{rate:0.8,pitch:1.0});
    },300);
  };
  const playShape=async(sh)=>{
    if(pRef.current){stop();pRef.current=false;setShStep("idle");return;}
    pRef.current=true;setSelShape(sh);setShRes(null);setShAcc(null);setShAI(-1);setActiveSpellIdx(-1);setSpellStatus([]);
    setShStep("saying_word");
    await speak(`Hello ${kidName}!`,{rate:0.8,pitch:1.05});await wait(300);
    await speak(`This shape is, ${sh.name}.`,{rate:0.7,pitch:1.0});await wait(500);if(!pRef.current)return;
    setShStep("spelling");hoverNear("spell-area","right","pointing");
    await spellWord(sh.name);await wait(400);if(!pRef.current)return;
    await speak(`Well done. That spells, ${sh.name}.`,{rate:0.75,pitch:1.0});await wait(500);if(!pRef.current)return;
    setShStep("saying_sentence");
    await speak(sh.sentence,{rate:0.75,pitch:1.0});await wait(600);if(!pRef.current)return;
    if(sh.ph){
      setShStep("saying_phonics");
      await speak("Now, let's understand how to speak this word.",{rate:0.75,pitch:1.0});await wait(400);if(!pRef.current)return;
      for(let i=0;i<sh.ph.length;i++){if(!pRef.current)return;setShAI(i);await speak(gPh(sh.ph[i]).s,{rate:0.55,pitch:1.0,noCancel:true});await wait(300);}
      setShAI(-1);await wait(400);if(!pRef.current)return;
      await speak(`And the word is, ${sh.name}.`,{rate:0.7,pitch:1.0});await wait(400);if(!pRef.current)return;
    }
    if(speakMode){
      await speak(`${kidName}, your turn. Say, ${sh.name}.`,{rate:0.75,pitch:1.0});await wait(500);if(!pRef.current)return;
      stop();await wait(600);setShStep("listening");hoverNear("mic-area","left","happy");pRef.current=false;rec.start(handleShResult);
    }else{pRef.current=false;if(!isDone("shapes",sh.name))awardPoints(5,"shapes",sh.name);await speak(`Well done ${kidName}.`,{rate:0.8,pitch:1.0});setShStep("idle");}
  };
  const retryShape=async()=>{setShRes(null);setShAcc(null);await speak(`Try again.`,{rate:0.75,pitch:1.0});await wait(300);stop();await wait(600);setShStep("listening");rec.start(handleShResult);};

  // ═══ COLOR PLAY FLOW ═══
  const handleCoResult=(result)=>{
    const normalized=normalizeSpoken(result);
    const acc=calcAcc(selColor.name,normalized);setCoRes(normalized);setCoAcc(acc);setCoStep("result");
    const s=getStars(acc);const p=getStarPts(s);
    if(p>0) awardPoints(p,"colors",selColor.name);
    if(s>=3)boom();
    setTimeout(()=>{
      if(s>=3) speak(`${kidName}, that was great.`,{rate:0.8,pitch:1.0});
      else speak(`Good try ${kidName}.`,{rate:0.8,pitch:1.0});
    },300);
  };
  const playColor=async(co)=>{
    if(pRef.current){stop();pRef.current=false;setCoStep("idle");return;}
    pRef.current=true;setSelColor(co);setCoRes(null);setCoAcc(null);setCoAI(-1);setActiveSpellIdx(-1);setSpellStatus([]);
    setCoStep("saying_word");
    await speak(`Hello ${kidName}!`,{rate:0.8,pitch:1.05});await wait(300);
    await speak(`This color is, ${co.name}.`,{rate:0.7,pitch:1.0});await wait(500);if(!pRef.current)return;
    setCoStep("spelling");hoverNear("spell-area","right","pointing");
    await spellWord(co.name);await wait(400);if(!pRef.current)return;
    await speak(`Well done. That spells, ${co.name}.`,{rate:0.75,pitch:1.0});await wait(500);if(!pRef.current)return;
    setCoStep("saying_sentence");
    await speak(co.sentence,{rate:0.75,pitch:1.0});await wait(600);if(!pRef.current)return;
    if(co.ph){
      setCoStep("saying_phonics");
      await speak("Now, let's understand how to speak this word.",{rate:0.75,pitch:1.0});await wait(400);if(!pRef.current)return;
      for(let i=0;i<co.ph.length;i++){if(!pRef.current)return;setCoAI(i);await speak(gPh(co.ph[i]).s,{rate:0.55,pitch:1.0,noCancel:true});await wait(300);}
      setCoAI(-1);await wait(400);if(!pRef.current)return;
      await speak(`And the word is, ${co.name}.`,{rate:0.7,pitch:1.0});await wait(400);if(!pRef.current)return;
    }
    if(speakMode){
      await speak(`${kidName}, your turn. Say, ${co.name}.`,{rate:0.75,pitch:1.0});await wait(500);if(!pRef.current)return;
      stop();await wait(600);setCoStep("listening");hoverNear("mic-area","left","happy");pRef.current=false;rec.start(handleCoResult);
    }else{pRef.current=false;if(!isDone("colors",co.name))awardPoints(5,"colors",co.name);await speak(`Well done ${kidName}.`,{rate:0.8,pitch:1.0});setCoStep("idle");}
  };
  const retryColor=async()=>{setCoRes(null);setCoAcc(null);await speak(`Try again.`,{rate:0.75,pitch:1.0});await wait(300);stop();await wait(600);setCoStep("listening");rec.start(handleCoResult);};




  // ═══ MATH FUNCTIONS ═══
  const genMath=()=>{
    const age=prof?.age||4;
    let a,b,op,answer,maxN;
    // Age-based difficulty
    if(age<=4){maxN=5;op="+";}
    else if(age<=5){maxN=10;op=Math.random()>0.3?"+":"-";}
    else if(age<=6){maxN=12;const r=Math.random();op=r>0.6?"+":r>0.3?"-":"×";}
    else{maxN=15;const r=Math.random();op=r>0.5?"+":r>0.25?"-":"×";}
    
    if(op==="+"){
      a=Math.floor(Math.random()*maxN)+1;
      b=Math.floor(Math.random()*(maxN-a))+1;
      answer=a+b;
    } else if(op==="-"){
      a=Math.floor(Math.random()*maxN)+2;
      b=Math.floor(Math.random()*(a-1))+1;
      answer=a-b;
    } else {
      a=Math.floor(Math.random()*5)+1;
      b=Math.floor(Math.random()*5)+1;
      answer=a*b;
    }
    
    // Generate 4 choices including correct answer
    const choices=new Set([answer]);
    while(choices.size<4){
      const wrong=answer+Math.floor(Math.random()*7)-3;
      if(wrong>=0&&wrong!==answer)choices.add(wrong);
    }
    const shuffled=shuffle([...choices]);
    
    setMathProblem({a,b,op,answer});hoverNear("math-problem","right","pointing");
    setMathChoices(shuffled);
    setMathFb(null);setMathAnswer(null);
    
    const opWord=op==="+"?"plus":op==="-"?"minus":"times";
    speak(`What is ${a} ${opWord} ${b}?`,{rate:0.55,pitch:1.0});
  };
  const onMathTap=async(choice)=>{
    if(mathFb)return;
    setMathAnswer(choice);
    setMathTotal(t=>t+1);
    if(choice===mathProblem.answer){
      setMathFb("correct");headYes();showTeacher("clapping","That's right! You're so smart! 🧠");
      setMathScore(s=>s+1);
      awardPoints(3,"math",`${mathProblem.a}${mathProblem.op}${mathProblem.b}`);
      await speak(`${choice}! Correct! Well done!`,{rate:0.6,pitch:1.0});
      await wait(1000);
      genMath();
    } else {
      setMathFb("wrong");headNo();showTeacher("thinking","Almost! Let me show you the answer 🤔");
      await speak(`Not quite. ${mathProblem.a} ${mathProblem.op==="+"?"plus":mathProblem.op==="-"?"minus":"times"} ${mathProblem.b} equals ${mathProblem.answer}.`,{rate:0.55,pitch:1.0});
      await wait(2000);
      genMath();
    }
  };

  // ═══ ALPHABET FUNCTIONS ═══
  const alphaRef=useRef("");
  const playLetter=async(letter)=>{hoverNear("letter-detail","left","star");
    // STOP everything from previous letter
    stop(); // cancel all TTS
    alphaRef.current=letter; // track which letter is active
    setSelLetter(letter);
    const d=ALPHA_DATA[letter];if(!d)return;
    await wait(200); // let cancel settle
    // Check if still on this letter after each step
    const ok=()=>alphaRef.current===letter&&pRef.current;
    await speak(`${letter}!`,{rate:0.6,pitch:1.0});
    if(!ok())return;
    await wait(200);
    if(!ok())return;
    await speak(`${letter} says ${d.ph}!`,{rate:0.6,pitch:1.0});
    if(!ok())return;
    await wait(300);
    for(const ex of d.examples){
      if(!ok())return;
      await speak(`${letter} for ${ex.w}!`,{rate:0.65,pitch:1.0});
      if(!ok())return;
      await wait(400);
    }
    if(!ok())return;
    await wait(200);
    await speak(`That is the letter ${letter}!`,{rate:0.65,pitch:1.0});
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
  const startMatch=()=>{
    const picked=shuffle(ALPHA_LETTERS.slice()).slice(0,8);
    setMatchPairs(picked.map(l=>({cap:l})));
    setMatchLeft(null);setMatchScore(0);setMatchDone([]);setMatchIdx(0);setMatchWrong(null);setMatchCorrect(null);setMatchOpts([]);
    setMatchOpts(genOpts(picked[0]));
    (async()=>{
      await speak("Match the letters!",{rate:0.6,pitch:1.0});
      await wait(400);
      await speak(`Find small ${picked[0].toLowerCase()}.`,{rate:0.6,pitch:1.0});
    })();
  };
  const advanceMatch=(nextIdx,pairs)=>{
    if(nextIdx>=pairs.length){
      setMatchIdx(nextIdx);setMatchOpts([]);
      boom(); // 🎉 big celebration for finishing all
      (async()=>{
        await wait(300);
        await speak("Amazing! All matched! You are a star!",{rate:0.6,pitch:1.0});
      })();
    } else {
      setMatchIdx(nextIdx);
      setMatchOpts(genOpts(pairs[nextIdx].cap)); // ← NEW random options each time
      (async()=>{
        await wait(300);
        await speak(`Find small ${pairs[nextIdx].cap.toLowerCase()}.`,{rate:0.6,pitch:1.0});
      })();
    }
  };
  const onMatchSmallTap=async(tappedLetter)=>{
    if(matchWrong||matchCorrect)return;
    const currentCap=matchPairs[matchIdx]?.cap;
    if(!currentCap)return;

    if(tappedLetter===currentCap){
      // ✅ CORRECT — fire confetti!
      setMatchCorrect(tappedLetter);
      setMatchDone(p=>[...p,tappedLetter]);
      setMatchScore(s=>s+1);
      boom();headYes(); // 🎆 CONFETTI + teacher on every correct match!
      await speak(`${tappedLetter}! Correct! Well done!`,{rate:0.7,pitch:1.0});
      await wait(800);
      setMatchCorrect(null);
      advanceMatch(matchIdx+1,matchPairs);
    } else {
      // ❌ WRONG — freeze wrong, highlight correct
      setMatchWrong(tappedLetter);
      setMatchCorrect(currentCap);
      await speak(`No. That is ${tappedLetter.toLowerCase()}. The correct one is ${currentCap.toLowerCase()}.`,{rate:0.55,pitch:1.0});
      await wait(2000);
      setMatchWrong(null);setMatchCorrect(null);
      setMatchDone(p=>[...p,currentCap]);
      advanceMatch(matchIdx+1,matchPairs);
    }
  };

  // ═══ BASICS FUNCTIONS ═══
  const newFindTarget=()=>{
    const max=aCfg?.max||20;
    // Progressive difficulty: start with 1-5, then 1-10, then 1-15, etc.
    const levelMax=Math.min(max, findLevel*5);
    
    // Build pool of unused numbers within current level
    let pool=[];
    for(let i=1;i<=levelMax;i++){
      if(!findUsed.includes(i)) pool.push(i);
    }
    // If all used in this level, advance level and reset
    if(pool.length===0){
      const nextLevel=findLevel+1;
      const nextMax=Math.min(max, nextLevel*5);
      if(nextMax>levelMax){
        setFindLevel(nextLevel);
        pool=[];
        for(let i=1;i<=nextMax;i++) pool.push(i);
        setFindUsed([]);
      } else {
        // All numbers done! Reset everything
        setFindLevel(1);setFindUsed([]);
        pool=[];
        for(let i=1;i<=Math.min(max,5);i++) pool.push(i);
      }
    }
    // Pick random from available pool
    const n=pool[Math.floor(Math.random()*pool.length)]||1;
    setFindUsed(prev=>[...prev,n]);
    setFindTarget(n);setFindFb(null);setFoundNum(null);hoverNear("find-prompt","right","pointing");
    speak(`Find, number, ${NW[n]||n}.`,{rate:0.55,pitch:1.0});
  };
  const repeatFind=()=>{
    if(findTarget) speak(`Find, number, ${NW[findTarget]||findTarget}.`,{rate:0.55,pitch:1.0});
  };
  const onFindTap=(n)=>{
    if(!findTarget||foundNum)return;
    speak(NW[n]||String(n),{rate:0.55,pitch:1.0,noCancel:true});
    if(n===findTarget){
      setFindFb({ok:true,n});setFindScore(s=>s+1);headYes();setTeacherMood("star");setFindStreak(s=>s+1);
      if(!isDone("basics",n)) awardPoints(3,"basics",n);
      if((findStreak+1)%5===0) boom();
      showTeacher("clapping","You found it! Excellent! 🎯");
      // Show celebration overlay with spelling
      setFoundNum(n);
      (async()=>{
        await wait(500);
        await speak(`Correct! This is ${NW[n]||n}.`,{rate:0.55,pitch:1.0});
        await wait(400);
        // Spell the word
        const word=NW[n]||String(n);
        const letters=word.replace(/\s/g,'').split('');
        await speak(`Let me spell it.`,{rate:0.6,pitch:1.0});
        await wait(300);
        for(const letter of letters){
          await speak(letter.toUpperCase(),{rate:0.7,pitch:1.0,noCancel:true});
          await wait(350);
        }
        await wait(300);
        await speak(`${NW[n]||n}! ${NUM_FUN[n]||""}`,{rate:0.55,pitch:1.0});
        await wait(1500);
        setFoundNum(null);
        setFindFb(null);
        newFindTarget();
      })();
    } else {
      setFindFb({ok:false,n});setFindStreak(0);headNo();setTeacherMood("thinking");
      (async()=>{
        await wait(300);
        await speak(`That is ${NW[n]||n}. Try again. Find ${NW[findTarget]||findTarget}.`,{rate:0.55,pitch:1.0});
        await wait(600);
        setFindFb(null);
      })();
    }
  };
  const sayNum=(n)=>{
    speak(`${NW[n]||n}. ${NUM_FUN[n]||""}`,{rate:0.55,pitch:1.0});
  };
  // Drawing pad
  const initCanvas=()=>{
    const c=cRef.current;if(!c)return;
    // Match canvas pixels to display pixels exactly — no scaling
    const rect=c.getBoundingClientRect();
    c.width=rect.width;
    c.height=rect.height;
    const ctx=c.getContext("2d");
    ctx.lineWidth=14;ctx.lineCap="round";ctx.lineJoin="round";ctx.strokeStyle="#FC8019";
  };
  const getPos=(e)=>{
    const c=cRef.current;if(!c)return{x:0,y:0};
    const rect=c.getBoundingClientRect();
    const touch=e.touches?e.touches[0]:e;
    return{x:touch.clientX-rect.left,y:touch.clientY-rect.top};
  };
  const drawStart=(e)=>{hoverNear("write-canvas","left","excited");
    const c=cRef.current;if(!c)return;
    const ctx=c.getContext("2d");
    const{x,y}=getPos(e);
    ctx.beginPath();ctx.moveTo(x,y);
    ctx.strokeStyle="#FC8019";ctx.lineWidth=14;ctx.lineCap="round";ctx.lineJoin="round";
    c._drawing=true;
    setDrawPts(p=>p+1);
  };
  const drawMove=(e)=>{
    const c=cRef.current;if(!c||!c._drawing)return;
    const ctx=c.getContext("2d");
    const{x,y}=getPos(e);
    ctx.lineTo(x,y);ctx.stroke();
    setDrawPts(p=>p+1);
  };
  // Score handwriting — check how many template cells have ink (forgiving)
  const scoreWriting=()=>{
    const c=cRef.current;if(!c)return 0;
    const ctx=c.getContext("2d");
    const w=c.width,h=c.height;
    if(w===0||h===0)return 0;
    const COLS=6,ROWS=8;
    const digits=String(writeNum).split("").map(Number);
    let hit=0,total=0;
    digits.forEach((d,di)=>{
      const tpl=NUM_TPL[d];if(!tpl)return;
      const offX=digits.length>1?(di===0?0:w/2):0;
      const dW=digits.length>1?w/2:w;
      const cW=dW/COLS,cH=h/ROWS;
      for(let r=0;r<ROWS;r++){
        for(let cl=0;cl<COLS;cl++){
          if(tpl[r*COLS+cl]!==1)continue;
          total++;
          // Sample center of cell + nearby — generous detection
          const cx=Math.floor(offX+cl*cW+cW/2);
          const cy=Math.floor(r*cH+cH/2);
          const sz=Math.max(4,Math.floor(Math.min(cW,cH)*0.7));
          const sx=Math.max(0,cx-Math.floor(sz/2));
          const sy=Math.max(0,cy-Math.floor(sz/2));
          const sw=Math.min(sz,w-sx);
          const sh=Math.min(sz,h-sy);
          if(sw<=0||sh<=0)continue;
          try{
            const data=ctx.getImageData(sx,sy,sw,sh).data;
            for(let p=0;p<data.length;p+=4){
              // Check for any non-transparent pixel (R,G,B > 0 or A > 30)
              if(data[p]>30||data[p+1]>30||data[p+2]>30||data[p+3]>30){hit++;break;}
            }
          }catch(e){}
        }
      }
    });
    return total>0?Math.min(100,Math.round((hit/total)*110)):0; // slight boost
  };
  const drawEnd=()=>{
    if(!cRef.current)return;
    cRef.current._drawing=false;
    // Only score after enough strokes — don't score tiny taps
    if(drawPts>25&&!writeOk){
      const score=scoreWriting();
      setWriteScore(score);
      if(score>=85){
        setWriteOk(true);
        headYes();speak(`Perfect! Great job writing ${NW[writeNum]||writeNum}! ${NUM_FUN[writeNum]||""}`,{rate:0.6,pitch:1.0});
        if(!isDone("basics_w",writeNum)) awardPoints(5,"basics_w",writeNum);
      } else if(score>=50){
        setWriteOk(true);
        headYes();speak(`Good! ${NW[writeNum]||writeNum}! That's a pass!`,{rate:0.6,pitch:1.0});
        if(!isDone("basics_w",writeNum)) awardPoints(3,"basics_w",writeNum);
      } else if(score>=40){
        speak("Almost there! Keep tracing.",{rate:0.6,pitch:1.0});
      }
      // Don't say anything below 40% — kid is still drawing
    }
  };
  const clearPad=()=>{
    const c=cRef.current;if(!c)return;
    initCanvas(); // Re-init instead of just clearing
    setDrawPts(0);setWriteOk(false);setWriteScore(null);
  };
  const nextWrite=()=>{
    setWriteNum(n=>n>=100?1:n+1);
    setDrawPts(0);setWriteOk(false);setWriteScore(null);
    setTimeout(()=>{initCanvas();},100);
    speak(`Write ${NW[writeNum>=100?1:writeNum+1]||writeNum+1}.`,{rate:0.75,pitch:1.0});
  };

    const buyR=(r)=>{if((prof?.points||0)<r.cost)return;save({...prof,points:prof.points-r.cost,rewards:[...(prof.rewards||[]),{...r,at:Date.now()}]});boom();setRwdMsg(`${r.emoji} Yay! You earned ${r.name}! Show your parents!`);setTimeout(()=>setRwdMsg(null),4000);};

  // ═══ VIRTUAL TEACHER (renders on all screens) ═══
  const TeacherBubble=<div style={{position:"fixed",left:pandaPos.x,top:pandaPos.y,zIndex:200,pointerEvents:highFive?"auto":"none",transition:joyFly?"left 0.3s ease-out, top 0.3s ease-out":"left 1.2s ease-in-out, top 1.2s ease-in-out",filter:"drop-shadow(0 4px 10px rgba(0,0,0,.1))"}}>
    {/* Reaction emoji floats up */}
    {pandaEmoji&&<div key={pandaEmoji+Date.now()} style={{position:"absolute",top:-24,left:"50%",transform:"translateX(-50%)",fontSize:22,animation:"ptFly 1.5s ease-out forwards"}}>{pandaEmoji}</div>}
    {highFive&&<div style={{position:"absolute",top:-40,left:"50%",transform:"translateX(-50%)",whiteSpace:"nowrap",background:"linear-gradient(135deg,#FC8019,#FF9933)",color:"#fff",padding:"6px 16px",borderRadius:20,fontSize:16,fontWeight:900,animation:"slideUp 0.3s ease-out",boxShadow:"0 4px 16px rgba(252,128,25,.3)"}}>High Five! ✋</div>}
    <BellaChar mood={teacherMood} size={pandaSize} speaking={isSpeaking} hiFive={highFive} joyMode={joyFly} shake={headShake}/>
  </div>;

  // ═══ SCREENS ═══

  if(scr==="splash")return<div style={{background:"linear-gradient(160deg,#FFF5EB,#fff,#EEF2FF)",position:"fixed",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",overflow:"hidden",fontFamily:"'Poppins',sans-serif"}}>
    <Particles count={15} emojis={["⭐","✨","🌟","💫"]}/>
    <div style={{textAlign:"center",zIndex:2,animation:"splashPop 0.8s cubic-bezier(0.34,1.56,0.64,1)"}}>
      <div style={{fontSize:80,animation:"mascotB 2s ease-in-out infinite",marginBottom:8}}>🐼</div>
      <h1 style={{fontSize:42,fontWeight:900,color:"#FC8019",margin:0,letterSpacing:-1}}>Little Genius</h1>
      <p style={{color:"#93959F",fontSize:14,fontWeight:700,letterSpacing:3,textTransform:"uppercase",marginTop:6}}>Learn • Play • Grow</p>
      <div style={{display:"flex",gap:10,justifyContent:"center",marginTop:24}}>
        {[0,1,2].map(i=><div key={i} style={{width:10,height:10,borderRadius:"50%",background:"#FC8019",animation:`dotB 1.2s ease-in-out ${i*0.15}s infinite`}}/>)}
      </div>
    </div>
    {TeacherBubble}<style>{CSS}</style>
  </div>;


  if(scr==="onboard")return<div style={{height:"100dvh",overflow:"auto",background:"linear-gradient(160deg,#FFF5EB,#fff,#EEF2FF)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,position:"relative",fontFamily:"'Poppins',sans-serif"}}>
    <Particles count={6} emojis={["🌸","🦋","⭐","🌈"]}/>
    <div style={{background:"#fff",borderRadius:28,padding:"32px 24px",maxWidth:420,width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,.08)",zIndex:2,animation:"slideUp 0.5s ease-out"}}>
    {obSt===0?<>
      {/* Step 1: Name + Age */}
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{textAlign:"center",fontSize:56,animation:"mascotB 2s ease-in-out infinite"}}>👋</div>
        <h2 style={{fontSize:28,fontWeight:900,color:"#1C1C2B",margin:"8px 0 4px"}}>Hello there!</h2>
        <p style={{fontSize:13,color:"#93959F",fontWeight:600}}>Let's set up your profile</p>
      </div>
      <label style={{fontSize:12,fontWeight:800,color:"#FC8019",textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:8}}>What's your name?</label>
      <input value={obN} onChange={e=>setObN(e.target.value)} placeholder="Type your name..." style={{width:"100%",padding:"14px 16px",border:"2px solid #E8E8E8",borderRadius:16,fontSize:17,fontWeight:700,fontFamily:"'Poppins',sans-serif",outline:"none",boxSizing:"border-box",background:"#F8F9FB",transition:"border-color 0.2s"}}/>
      <label style={{fontSize:12,fontWeight:800,color:"#FC8019",textTransform:"uppercase",letterSpacing:1.5,display:"block",margin:"20px 0 10px"}}>How old are you?</label>
      <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8}}>
        {[3,4,5,6,7,8].map(a=><button key={a} onClick={()=>setObA(a)} style={{
          padding:"14px 0",borderRadius:16,border:"3px solid",
          borderColor:obA===a?"#FC8019":"#E8E8E8",
          background:obA===a?"linear-gradient(135deg,#FC8019,#FF9933)":"#fff",
          color:obA===a?"#fff":"#1C1C2B",fontSize:20,fontWeight:900,
          fontFamily:"'Poppins',sans-serif",cursor:"pointer",
          transition:"all 0.2s",transform:obA===a?"scale(1.08)":"scale(1)",
          boxShadow:obA===a?"0 4px 12px rgba(252,128,25,.3)":"none"
        }}>{a}</button>)}
      </div>
      <button onClick={()=>{setObSt(1);speak("Awesome! Now pick if you are a boy or a girl, and choose your look!",{rate:0.55,pitch:1.0});setTeacherMood("excited");}} style={{width:"100%",padding:16,borderRadius:18,border:"none",background:"linear-gradient(135deg,#FC8019,#FF9933)",color:"#fff",fontSize:17,fontWeight:800,fontFamily:"'Poppins',sans-serif",cursor:"pointer",marginTop:24,boxShadow:"0 6px 20px rgba(252,128,25,.3)",letterSpacing:0.5}}>Next →</button>
    </>:
    <>
      {/* Step 2: Gender + Avatar */}
      <div style={{textAlign:"center",marginBottom:16}}>
        <h2 style={{fontSize:24,fontWeight:900,color:"#1C1C2B",margin:0}}>Pick your look! ✨</h2>
        <p style={{fontSize:13,color:"#93959F",fontWeight:600,marginTop:4}}>Choose your character</p>
      </div>
      <label style={{fontSize:12,fontWeight:800,color:"#FC8019",textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:10}}>I am a...</label>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,marginBottom:20}}>
        {[{g:"boy",e:"👦",c:"#6366F1"},{g:"girl",e:"👧",c:"#EC4899"}].map(x=><button key={x.g} onClick={()=>setObG(x.g)} style={{
          padding:20,borderRadius:20,border:"3px solid",
          borderColor:obG===x.g?x.c:"#E8E8E8",
          background:obG===x.g?(x.g==="boy"?"#EEF2FF":"#FDF2F8"):"#fff",
          cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:8,
          transition:"all 0.2s",transform:obG===x.g?"scale(1.04)":"scale(1)",
          boxShadow:obG===x.g?`0 4px 16px ${x.c}33`:"none"
        }}>
          <span style={{fontSize:44}}>{x.e}</span>
          <span style={{fontWeight:800,fontSize:15,color:obG===x.g?x.c:"#93959F"}}>{x.g.charAt(0).toUpperCase()+x.g.slice(1)}</span>
        </button>)}
      </div>
      <label style={{fontSize:12,fontWeight:800,color:"#FC8019",textTransform:"uppercase",letterSpacing:1.5,display:"block",marginBottom:10}}>Pick an avatar</label>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
        {AVATARS[obG].map((av,i)=><button key={i} onClick={()=>setObAv(i)} style={{
          padding:14,borderRadius:18,border:"3px solid",
          borderColor:obAv===i?"#FC8019":"#E8E8E8",
          background:obAv===i?"#FFF5EB":"#F8F9FB",
          fontSize:34,cursor:"pointer",transition:"all 0.2s",
          transform:obAv===i?"scale(1.12)":"scale(1)",
          display:"flex",alignItems:"center",justifyContent:"center",
          boxShadow:obAv===i?"0 4px 12px rgba(252,128,25,.2)":"none"
        }}>{av}</button>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 2fr",gap:10,marginTop:24}}>
        <button onClick={()=>setObSt(0)} style={{padding:14,borderRadius:16,border:"2px solid #E8E8E8",background:"#fff",fontSize:15,fontWeight:800,fontFamily:"'Poppins',sans-serif",cursor:"pointer",color:"#93959F"}}>← Back</button>
        <button onClick={()=>{rec.warmUp();save({name:obN||"Buddy",age:obA,gender:obG,avatar:obAv,points:0,totalEarned:0,completed:{},rewards:[],at:Date.now()});speak("Right on! Let me show you around!",{rate:0.6,pitch:1.0});setTeacherMood("star");setScr("home");setTimeout(()=>doHomeTour(),2000);}} style={{padding:14,borderRadius:16,border:"none",background:"linear-gradient(135deg,#FC8019,#FF9933)",color:"#fff",fontSize:17,fontWeight:800,fontFamily:"'Poppins',sans-serif",cursor:"pointer",boxShadow:"0 6px 20px rgba(252,128,25,.3)"}}>Let's Go! 🚀</button>
      </div>
    </>}
    </div>
    {TeacherBubble}<style>{CSS}</style>
  </div>;


  if(scr==="home")return<div style={{fontFamily:"'Poppins',sans-serif",height:"100dvh",overflow:"auto",background:"#F8F9FB",maxWidth:520,margin:"0 auto",position:"relative",display:"flex",flexDirection:"column"}}>
    <Confetti active={confetti}/>
    {ptAnim&&<div style={{position:"fixed",top:20,right:20,zIndex:999,animation:"ptFly 1.5s ease-out forwards",fontFamily:"'Poppins',sans-serif",fontSize:28,fontWeight:800,color:"#22C55E"}}>{ptAnim}</div>}
    {/* ═══ HEADER ═══ */}
    <div style={{background:"linear-gradient(135deg,#FC8019,#FF9933)",padding:"20px 20px 24px",flexShrink:0,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:-50,right:-50,width:140,height:140,borderRadius:"50%",background:"rgba(255,255,255,.08)"}}/>
      <div style={{position:"absolute",bottom:-30,left:-20,width:80,height:80,borderRadius:"50%",background:"rgba(255,255,255,.06)"}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:2}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:48,height:48,borderRadius:16,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30}}>{AVATARS[prof?.gender||"boy"][prof?.avatar||0]}</div>
          <div>
            <div style={{color:"#fff",fontWeight:800,fontSize:18}}>{prof?.name||"Buddy"}</div>
            <div style={{color:"rgba(255,255,255,.8)",fontSize:12,fontWeight:600}}>Age {prof?.age||4} • {aCfg.diff}</div>
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,.2)",padding:"8px 16px",borderRadius:24,display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:16}}>💰</span>
          <span style={{color:"#fff",fontWeight:900,fontSize:17}}>{prof?.points||0}</span>
        </div>
      </div>
      <h2 style={{color:"#fff",fontSize:20,fontWeight:800,marginTop:14,position:"relative",zIndex:2}}>What shall we learn? 🎯</h2>
    </div>
    {/* ═══ TILES GRID ═══ */}
    <div style={{flex:1,overflow:"auto",padding:"16px"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14}}>
        {[
          {id:"numbers",icon:"🔢",title:"Numbers",sub:`Learn 1-${aCfg.max}`,grad:"linear-gradient(135deg,#FF6B6B,#FF4757)",shadow:"rgba(255,71,87,.2)"},
          {id:"alphabet",icon:"🔠",title:"ABC",sub:"A-Z Letters",grad:"linear-gradient(135deg,#6366F1,#818CF8)",shadow:"rgba(99,102,241,.2)"},
          {id:"phonics",icon:"🔤",title:"Phonics",sub:"500+ Words",grad:"linear-gradient(135deg,#4ECDC4,#26D0CE)",shadow:"rgba(78,205,196,.2)"},
          {id:"basics",icon:"🧩",title:"Basics",sub:"Find & Write",grad:"linear-gradient(135deg,#FC8019,#FF9F43)",shadow:"rgba(252,128,25,.2)"},
          {id:"shapes",icon:"🔷",title:"Shapes",sub:"12 Shapes",grad:"linear-gradient(135deg,#A855F7,#8B5CF6)",shadow:"rgba(168,85,247,.2)"},
          {id:"colors",icon:"🎨",title:"Colors",sub:"13 Colors",grad:"linear-gradient(135deg,#F472B6,#EC4899)",shadow:"rgba(244,114,182,.2)"},
          {id:"rewards",icon:"🎁",title:"Rewards",sub:"Spend Points",grad:"linear-gradient(135deg,#FBBF24,#F59E0B)",shadow:"rgba(251,191,36,.2)"},
          {id:"settings",icon:"⚙️",title:"Settings",sub:"Profile",grad:"linear-gradient(135deg,#94A3B8,#64748B)",shadow:"rgba(148,163,184,.2)"}
        ].map((m,i)=><button key={m.id} onClick={()=>{rec.warmUp();speak("Right on! I am excited! Let us go!",{rate:0.65,pitch:1.0});setTeacherMood("star");headYes();setScr(m.id);}} style={{
          display:"flex",alignItems:"center",gap:12,
          padding:"18px 16px",borderRadius:20,border:"none",cursor:"pointer",
          fontFamily:"'Poppins',sans-serif",background:m.grad,
          boxShadow:`0 4px 16px ${m.shadow}`,
          animation:`gridPop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i*0.05}s both`,
          position:"relative",overflow:"hidden",textAlign:"left",width:"100%","data-tile":m.id
        }}>
          <div style={{position:"absolute",top:-16,right:-16,width:56,height:56,borderRadius:"50%",background:"rgba(255,255,255,.1)"}}/>
          <span style={{fontSize:34,flexShrink:0}}>{m.icon}</span>
          <div style={{flex:1,minWidth:0}}>
            <div style={{color:"#fff",fontWeight:800,fontSize:16}}>{m.title}</div>
            <div style={{color:"rgba(255,255,255,.8)",fontSize:12,fontWeight:600,marginTop:1}}>{m.sub}</div>
            {(m.id==="numbers"||m.id==="phonics"||m.id==="shapes"||m.id==="colors")&&<div style={{width:"100%",height:4,background:"rgba(255,255,255,.2)",borderRadius:3,marginTop:6,overflow:"hidden"}}><div style={{height:"100%",background:"#fff",borderRadius:3,width:`${getProgress(m.id)}%`,transition:"width 0.8s"}}/></div>}
          </div>
        </button>)}
      </div>
      {TeacherBubble}
      {/* Tip */}
      <div style={{margin:"14px 0 8px",padding:"12px 16px",background:"#fff",borderRadius:16,display:"flex",alignItems:"center",gap:10,boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
        <span style={{fontSize:22}}>💡</span>
        <p style={{fontSize:12,color:"#93959F",fontWeight:700,flex:1}}>⭐⭐⭐⭐⭐ = 20 points per word!</p>
      </div>
    </div>
    {TeacherBubble}<style>{CSS}</style>
  </div>;


  // ═══ NUMBER DETAIL with ANIMATED SCENE ═══
  if(scr==="numbers"&&selNum){const w=NW[selNum];const scene=getScene(selNum);const color=nClr(selNum);const phs=NPH[selNum];return<div style={{fontFamily:"'Poppins',sans-serif",height:"100dvh",overflow:"auto",background:"#fff",maxWidth:520,margin:"0 auto",position:"relative",display:"flex",flexDirection:"column"}}><Confetti active={confetti}/>{ptAnim&&<div style={{position:"fixed",top:20,right:20,zIndex:999,animation:"ptFly 1.5s ease-out forwards",fontFamily:"'Poppins',sans-serif",fontSize:28,fontWeight:800,color:"#22C55E"}}>{ptAnim}</div>}<SubHead title={`Number ${selNum}`} onBack={()=>{stop();pRef.current=false;setSelNum(null);setNStep("idle");}} points={prof?.points||0}/>
    {nStep!=="idle"&&<FlowSteps current={nStep} steps={NUM_STEPS}/>}
    <div style={{padding:"6px 10px"}}>
      {/* 🎬 ANIMATED SCENE */}
      <AnimatedScene num={selNum} active={nStep==="saying_sentence"}/>
      
      {/* Number + Word below scene */}
      <div style={{textAlign:"center",marginTop:4}}>
        <span style={{fontFamily:"'Poppins',sans-serif",fontSize:36,fontWeight:800,color,lineHeight:1,animation:nStep==="saying_number"?"numPulse 0.8s ease-in-out infinite":"none"}}>{selNum}</span>
        <div style={{fontFamily:"'Poppins',sans-serif",fontSize:16,color:"#6366F1",fontWeight:600,textTransform:"capitalize"}}>{w}</div>
      </div>

      {/* Phonemes */}
      {phs&&(nStep==="saying_phonics"||nStep==="idle")&&<div style={{marginTop:6,background:"#F1F3F7",borderRadius:14,padding:8,animation:"slideUp 0.4s ease-out"}}><div style={{fontSize:11,fontWeight:800,color:"#6366F1",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🔊 Phonics</div><div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>{phs.map((ph,i)=>{const d=gPh(ph);const act=aPhI===i;return<button key={i} onClick={()=>{if(!pRef.current)speak(d.s,{rate:0.55,pitch:1.1});}} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"6px 10px 5px",borderRadius:12,border:"none",cursor:"pointer",fontFamily:"'Poppins',sans-serif",minWidth:44,background:act?color:"#f3f4f6",color:act?"#fff":"#333",transform:act?"scale(1.3) translateY(-4px)":"scale(1)",boxShadow:act?`0 8px 24px ${color}55`:"0 2px 8px rgba(0,0,0,0.04)",transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}><span style={{fontSize:16,fontWeight:900,fontFamily:"'Poppins',sans-serif"}}>{ph.toUpperCase()}</span><span style={{fontSize:9,fontWeight:700,color:act?"#fffc":"#999",marginTop:2}}>{d.d}</span></button>;})}</div></div>}

      {/* Play controls */}
      <div style={{marginTop:12}}>
        {nStep==="idle"&&<>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:8}}>
            {/* Speech Toggle */}
            <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#F1F3F7",borderRadius:14,flex:1}}>
              <span style={{fontSize:12,fontWeight:700,color:speakMode?"#22C55E":"#999"}}>🎤</span>
              <button onClick={()=>setSpeakMode(!speakMode)} style={{width:40,height:22,borderRadius:11,border:"none",cursor:"pointer",background:speakMode?"#22C55E":"#ddd",position:"relative",transition:"background 0.3s"}}>
                <div style={{width:18,height:18,borderRadius:9,background:"#F1F3F7",position:"absolute",top:2,left:speakMode?20:2,transition:"left 0.3s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/>
              </button>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:600}}>{speakMode?"Speak ON":"Speak OFF"}</span>
            </div>
            <button onClick={()=>playNum(selNum)} style={{padding:"10px 20px",borderRadius:14,border:"none",color:"#1C1C2B",fontSize:14,fontWeight:800,fontFamily:"'Poppins',sans-serif",cursor:"pointer",background:`linear-gradient(135deg,${color},${color}dd)`,display:"flex",alignItems:"center",gap:6}}>🔄 Replay</button>
          </div>
        </>}
        {nStep==="saying_number"&&<Mascot mood="speaking" msg={`Listen! "${w.toUpperCase()}" 🔊`}/>}
        {/* SPELLING */}
        {nStep==="spelling"&&(
          <div style={{animation:"slideUp 0.3s ease-out"}}>
            <Mascot mood="thinking" msg={spellRound===1?"Watch and listen! 🔤":spellRound===2?"Tap the letters in order! 👆":"🔤"}/>
            <div style={{padding:10,background:"#F1F3F7",borderRadius:16}}>
              {/* Letter slots (top row) */}
              <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:spellRound===2?16:0}}>
                {w.replace(/\s/g,'').toUpperCase().split('').map((letter,i)=>{
                  const st=spellStatus[i]||'waiting';
                  const isActive=activeSpellIdx===i;
                  const isTapTarget=spellRound===2 && i===tapIndex;
                  return <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                    <span style={{
                      fontSize:24,fontFamily:"'Poppins',sans-serif",fontWeight:800,
                      padding:"6px 10px",borderRadius:12,minWidth:36,textAlign:"center",
                      background:isActive?color:st==='correct'?"#22C55E":st==='wrong'?"#EF4444":"#f3f4f6",
                      color:(isActive||st==='correct'||st==='wrong')?"#fff":"#ddd",
                      transform:isActive?"scale(1.2) translateY(-4px)":isTapTarget?"scale(1.1)":"scale(1)",
                      boxShadow:isActive?`0 6px 20px ${color}55`:isTapTarget?`0 4px 16px ${color}33`:"none",
                      transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                    }}>{letter}</span>
                    {st==='correct'&&!isActive&&<span style={{fontSize:12}}>✅</span>}
                    {st==='wrong'&&!isActive&&<span style={{fontSize:12}}>❌</span>}
                    {isActive&&spellRound===1&&<span style={{fontSize:12,animation:"pulse 1s ease-in-out infinite"}}>👂</span>}
                    {isTapTarget&&spellRound===2&&<span style={{fontSize:12,color:color,fontWeight:800,animation:"pulse 1s ease-in-out infinite"}}>👆</span>}
                  </div>;
                })}
              </div>
              {/* Scrambled tappable letters (Round 2 only) */}
              {spellRound===2&&(
                <div>
                  <div style={{textAlign:"center",fontSize:12,fontWeight:700,color:"#6366F1",marginBottom:10}}>Tap each letter:</div>
                  <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                    {scrambledLetters.map((item,i)=>(
                      <button key={item.id} disabled={item.used}
                        onClick={()=>!item.used&&handleLetterTap(item.letter,i)}
                        style={{
                          fontSize:28,fontFamily:"'Poppins',sans-serif",fontWeight:800,
                          padding:"6px 10px",borderRadius:16,minWidth:50,
                          border:"3px solid",cursor:item.used?"default":"pointer",
                          borderColor:tapWrong===i?"#EF4444":item.used?"#ddd":"#6366F1",
                          background:tapWrong===i?"#FEE2E2":item.used?"#f9fafb":"#fff",
                          color:item.used?"#ddd":tapWrong===i?"#EF4444":"#1a1a2e",
                          transform:tapWrong===i?"scale(0.9) rotate(-5deg)":item.used?"scale(0.8)":"scale(1)",
                          opacity:item.used?0.4:1,
                          transition:"all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                          boxShadow:!item.used&&tapWrong!==i?"0 4px 12px rgba(99,102,241,0.15)":"none",
                        }}>{item.letter}</button>
                    ))}
                  </div>
                </div>
              )}
              {spellRound===1&&<div style={{textAlign:"center",marginTop:12,padding:"8px 14px",background:"#FFF5EB",borderRadius:12}}>
                <p style={{fontSize:13,fontWeight:700,color:"#FC8019"}}>👀 Watch and listen!</p>
              </div>}
            </div>
          </div>
        )}
        {nStep==="saying_sentence"&&<Mascot mood="excited" msg="Listen to this sentence! 🎬"/>}
        {nStep==="saying_phonics"&&<Mascot mood="thinking" msg="Let's understand how to speak this word... 🔡"/>}
        {/* COUNTDOWN */}
        {nStep==="countdown"&&(
          <div style={{textAlign:"center",padding:24,background:"#F1F3F7",borderRadius:24,animation:"slideUp 0.3s ease-out"}}>
            <Mascot mood="listening" msg={`Say "${w.toUpperCase()}" when I say Start!`}/>
            <div style={{fontSize:48,fontFamily:"'Poppins',sans-serif",fontWeight:800,color:countdown>0?color:"#22C55E",animation:"numPulse 0.5s ease-in-out infinite",marginTop:8}}>
              {countdown>0?countdown:"🎤 Start!"}
            </div>
          </div>
        )}
        {nStep==="listening"&&<ListeningBox transcript={rec.txt} onTapMic={tapMicNum} isListening={rec.on} error={rec.err} onType={typeNum} expected={NW[selNum]}/>}
        {nStep==="result"&&spRes!==null&&<ResultBox acc={spAcc} result={spRes} expected={w} onRetry={retryNum} onDone={()=>{setSpRes(null);const next=selNum>=(aCfg?.max||20)?1:selNum+1;setSelNum(next);setNStep("idle");setTimeout(()=>playNum(next),200);}} color={color} kidName={kidName} currentPoints={prof?.points||0}/>}
      </div>
    </div>{TeacherBubble}<style>{CSS}</style></div>;}

  // ═══ NUMBERS GRID ═══
  if(scr==="numbers"&&!selNum)return<div style={{fontFamily:"'Poppins',sans-serif",height:"100dvh",overflow:"hidden",background:"#fff",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column"}}><Particles count={8}/><SubHead title="Numbers" onBack={goHome} points={prof?.points||0}/>
    {/* Tab bar */}
    <div style={{display:"flex",gap:6,padding:"6px 10px",background:"#F8F9FB",borderBottom:"1px solid #EFEFEF",flexShrink:0}}>
      {[{id:"learn",label:"🔢 Numbers"},{id:"math",label:"➕ Math"}].map(t=>
        <button key={t.id} onClick={()=>{setNumTab(t.id);if(t.id==="math"&&!mathProblem)genMath();}}
          style={{flex:1,padding:"10px 6px",borderRadius:14,border:"none",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"'Poppins',sans-serif",
            background:numTab===t.id?"#FC8019":"#F1F3F7",color:numTab===t.id?"#fff":"#93959F",transition:"all 0.2s"
          }}>{t.label}</button>
      )}
    </div>
    {numTab==="learn"&&<div style={{flex:1,overflow:"auto",padding:"12px 14px"}}><div style={{display:"grid",gridTemplateColumns:`repeat(${aCfg.max<=10?3:aCfg.max<=20?4:5},1fr)`,gap:aCfg.max<=10?14:aCfg.max<=20?10:8}}>
      {Array.from({length:aCfg.max}).map((_,i)=>{const n=i+1;const done=isDone("numbers",n);return<button key={n} onClick={(e)=>{flyTo(e,"excited");rec.warmUp();setSelNum(n);setNStep("idle");setTimeout(()=>playNum(n),100);}} style={{
        position:"relative",
        padding:aCfg.max<=10?"20px 8px":aCfg.max<=20?"14px 6px":"10px 4px",
        borderRadius:18,
        border:`2px solid ${done?nClr(n)+"44":"#E8E8E8"}`,
        cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,
        fontFamily:"'Poppins',sans-serif",
        background:done?`linear-gradient(135deg,${nClr(n)}08,${nClr(n)}15)`:"#fff",
        animation:`gridPop 0.3s ease ${i*0.02}s both`,
        boxShadow:"0 2px 10px rgba(0,0,0,.06)",
        aspectRatio:aCfg.max<=20?"1":"auto"
      }}>{done&&<span style={{position:"absolute",top:4,right:5,fontSize:12,color:"#60B246",fontWeight:900}}>✓</span>}
        <span style={{fontFamily:"'Poppins',sans-serif",fontSize:aCfg.max<=10?32:aCfg.max<=20?24:18,fontWeight:800,color:nClr(n)}}>{n}</span>
        {aCfg.max<=20&&<span style={{fontSize:aCfg.max<=10?10:8,fontWeight:700,color:"#93959F",textTransform:"capitalize"}}>{NW[n]||""}</span>}
      </button>;})}</div></div>}
    {/* ═══ MATH TAB ═══ */}
    {numTab==="math"&&<div style={{flex:1,overflow:"auto",padding:"12px 14px"}}>
      {mathProblem?<div data-panda="math-problem">
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <span style={{fontSize:14,fontWeight:800,color:"#FC8019"}}>🏆 {mathScore}/{mathTotal}</span>
          <button onClick={genMath} style={{padding:"6px 14px",borderRadius:10,border:"none",background:"#FC8019",color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer"}}>Skip ➡️</button>
        </div>
        {/* Visual problem with emojis */}
        <div style={{background:"#F8F9FB",borderRadius:20,padding:14,textAlign:"center",marginBottom:12}}>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginBottom:6}}>
            {Array.from({length:Math.min(mathProblem.a,15)}).map((_,i)=>
              <span key={"a"+i} style={{fontSize:26,animation:`gridPop 0.2s ease ${i*0.04}s both`}}>{getMathEmoji(0)}</span>
            )}
          </div>
          <div style={{fontSize:32,fontWeight:900,color:mathProblem.op==="+"?"#60B246":mathProblem.op==="-"?"#E23744":"#6366F1",margin:"4px 0"}}>{mathProblem.op}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,justifyContent:"center",marginBottom:6}}>
            {Array.from({length:Math.min(mathProblem.b,15)}).map((_,i)=>
              <span key={"b"+i} style={{fontSize:26,animation:`gridPop 0.2s ease ${(mathProblem.a+i)*0.04}s both`}}>{getMathEmoji(1)}</span>
            )}
          </div>
          <div style={{fontFamily:"'Poppins',sans-serif",fontSize:28,fontWeight:900,color:"#1C1C2B",marginTop:4}}>
            {mathProblem.a} {mathProblem.op} {mathProblem.b} = <span style={{color:"#FC8019"}}>?</span>
          </div>
        </div>
        {/* 4 answer choices */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
          {mathChoices.map((c,i)=>{
            const isRight=mathFb&&c===mathProblem.answer;
            const isWrong=mathFb==="wrong"&&c===mathAnswer;
            return<button key={i} onClick={(e)=>{flyTo(e,"excited");onMathTap(c);}} style={{
              padding:"16px 8px",borderRadius:16,border:"3px solid",cursor:"pointer",
              borderColor:isRight?"#60B246":isWrong?"#E23744":"#E8E8E8",
              background:isRight?"#ECFDF5":isWrong?"#FEF2F2":"#fff",
              fontSize:26,fontWeight:900,fontFamily:"'Poppins',sans-serif",
              color:isRight?"#60B246":isWrong?"#E23744":"#1C1C2B",
              transform:isRight?"scale(1.05)":isWrong?"scale(0.95)":"scale(1)",
              transition:"all 0.2s"
            }}>{c}{isRight?" ✅":""}{isWrong?" ❌":""}</button>;
          })}
        </div>
        {mathFb==="wrong"&&<div style={{marginTop:10,padding:10,background:"#FFF5EB",borderRadius:14,textAlign:"center"}}>
          <span style={{fontSize:14,fontWeight:800,color:"#FC8019"}}>{mathProblem.a} {mathProblem.op} {mathProblem.b} = {mathProblem.answer}</span>
          <div style={{display:"flex",flexWrap:"wrap",gap:3,justifyContent:"center",marginTop:4}}>
            {Array.from({length:Math.min(mathProblem.answer,20)}).map((_,i)=>
              <span key={"r"+i} style={{fontSize:18}}>{getMathEmoji(2)}</span>
            )}
          </div>
        </div>}
      </div>:<div style={{textAlign:"center",paddingTop:60}}>
        <span style={{fontSize:56}}>➕</span>
        <p style={{fontSize:18,fontWeight:800,color:"#1C1C2B",marginTop:10}}>Ready for Math?</p>
        <button onClick={genMath} style={{marginTop:16,padding:"14px 32px",borderRadius:16,border:"none",background:"linear-gradient(135deg,#FC8019,#FF9933)",color:"#fff",fontSize:16,fontWeight:800,cursor:"pointer"}}>▶️ Start!</button>
      </div>}
    </div>}
    {TeacherBubble}<style>{CSS}</style></div>;

  // ═══ PHONICS DETAIL ═══
  if(scr==="phonics"&&phW){const cc=WCATS[phCat]?.color||"#6366F1";return<div style={{fontFamily:"'Poppins',sans-serif",height:"100dvh",overflow:"auto",background:"#fff",maxWidth:520,margin:"0 auto",position:"relative",display:"flex",flexDirection:"column"}}><Confetti active={confetti}/>{ptAnim&&<div style={{position:"fixed",top:20,right:20,zIndex:999,animation:"ptFly 1.5s ease-out forwards",fontFamily:"'Poppins',sans-serif",fontSize:28,fontWeight:800,color:"#22C55E"}}>{ptAnim}</div>}<SubHead title="Phonics" onBack={()=>{stop();pRef.current=false;setPhW(null);setPhStep("idle");}} points={prof?.points||0}/>
    {phStep!=="idle"&&<FlowSteps current={phStep} steps={PH_STEPS}/>}
    <div style={{padding:"6px 10px"}}>
      {/* Animated Scene for phonics word */}
      {(()=>{
        const catBg={animals:"linear-gradient(180deg,#87CEEB,#90EE90,#228B22)",food:"linear-gradient(180deg,#FFECD2,#FCB69F,#FF9A9E)",nature:"linear-gradient(180deg,#87CEEB,#B0E0E6,#98FB98)",things:"linear-gradient(180deg,#E0E7FF,#C7D2FE,#A5B4FC)",colors:"linear-gradient(180deg,#FF9A9E,#FECFEF,#FBC2EB)"};
        const catEmojis={animals:["🌳","🌿","☁️","🌸","🦋"],food:["🍽️","🧑‍🍳","✨","🌟","💫"],nature:["☀️","🌈","🦋","🌺","💧"],things:["🏠","⭐","☁️","🌟","✨"],colors:["🎨","✨","🌈","💫","🎉"]};
        const bg=catBg[phCat]||catBg.things;
        const extras=catEmojis[phCat]||catEmojis.things;
        return <div style={{position:"relative",width:"100%",height:120,borderRadius:16,overflow:"hidden",background:bg,boxShadow:"inset 0 0 40px rgba(0,0,0,0.1)"}}>
          {/* Main word emoji - big, bouncing */}
          <div style={{position:"absolute",left:"50%",top:"40%",transform:"translate(-50%,-50%)",fontSize:56,zIndex:3,animation:"scene_floatBob 2s ease-in-out infinite",filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.2))"}}>{phW.img}</div>
          {/* Category ambient elements */}
          {extras.map((e,i)=><div key={i} style={{position:"absolute",left:`${15+i*18}%`,top:`${10+Math.sin(i)*20+15}%`,fontSize:20+Math.random()*12,zIndex:1,opacity:0.6,animation:`scene_${["floatBob","sway","twinkle","sparkle","cloudDrift"][i%5]} ${2+i*0.5}s ease-in-out ${i*0.3}s infinite`}}>{e}</div>)}
          {/* Word label overlay */}
          <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"24px 16px 12px",background:"linear-gradient(transparent,rgba(0,0,0,0.5))",zIndex:10,textAlign:"center"}}>
            <h2 style={{fontFamily:"'Poppins',sans-serif",fontSize:22,fontWeight:800,color:"#1C1C2B",letterSpacing:3,margin:0,textShadow:"0 2px 8px rgba(0,0,0,0.3)"}}>{phW.word.toUpperCase()}{phStep==="saying_word"&&<span style={{animation:"pulse 0.5s infinite",fontSize:20,marginLeft:8}}>🔊</span>}</h2>
          </div>
          {/* Sentence overlay */}
          {phStep==="saying_sentence"&&<div style={{position:"absolute",top:8,left:8,right:8,padding:"8px 14px",background:"#F8F9FB",borderRadius:14,zIndex:11,animation:"slideUp 0.3s ease-out"}}><span style={{fontSize:13,fontWeight:700,color:"#FC8019"}}>💬 {phW.sentence}</span></div>}
        </div>;
      })()}
      {/* Phoneme chips */}
      <div style={{marginTop:12,display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>{phW.ph.map((ph,i)=>{const d=gPh(ph);const act=phAI===i;return<button key={i} onClick={()=>{if(!pRef.current)speak(d.s,{rate:0.45,pitch:1.0});}} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"6px 10px 5px",borderRadius:12,border:"none",cursor:"pointer",fontFamily:"'Poppins',sans-serif",minWidth:46,background:act?cc:"#f3f4f6",color:act?"#fff":"#333",transform:act?"scale(1.3) translateY(-4px)":"scale(1)",boxShadow:act?`0 8px 24px ${cc}55`:"0 2px 8px rgba(0,0,0,0.04)",transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}><span style={{fontSize:16,fontWeight:900,fontFamily:"'Poppins',sans-serif"}}>{ph.toUpperCase()}</span><span style={{fontSize:9,fontWeight:700,color:act?"#fffc":"#999",marginTop:2}}>{d.d}</span></button>;})}</div>
      <div style={{marginTop:14}}>
        {phStep==="idle"&&<>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#F1F3F7",borderRadius:14,flex:1}}>
              <span style={{fontSize:12,fontWeight:700,color:speakMode?"#22C55E":"#999"}}>🎤</span>
              <button onClick={()=>setSpeakMode(!speakMode)} style={{width:40,height:22,borderRadius:11,border:"none",cursor:"pointer",background:speakMode?"#22C55E":"#ddd",position:"relative",transition:"background 0.3s"}}>
                <div style={{width:18,height:18,borderRadius:9,background:"#F1F3F7",position:"absolute",top:2,left:speakMode?20:2,transition:"left 0.3s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/>
              </button>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:600}}>{speakMode?"Speak ON":"Speak OFF"}</span>
            </div>
            <button onClick={()=>playPh(phW)} style={{padding:"10px 20px",borderRadius:14,border:"none",color:"#1C1C2B",fontSize:14,fontWeight:800,fontFamily:"'Poppins',sans-serif",cursor:"pointer",background:`linear-gradient(135deg,${cc},${cc}dd)`,display:"flex",alignItems:"center",gap:6}}>🔄 Replay</button>
          </div>
        </>}
        {phStep==="saying_word"&&<Mascot mood="speaking" msg={`Listen! "${phW.word.toUpperCase()}" 🔊`}/>}
        {phStep==="spelling"&&(
          <div style={{animation:"slideUp 0.3s ease-out"}}>
            <Mascot mood="thinking" msg={spellRound===1?"Watch and listen! 🔤":spellRound===2?"Tap the letters in order! 👆":"🔤"}/>
            <div style={{padding:10,background:"#F1F3F7",borderRadius:16}}>
              <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:spellRound===2?16:0}}>
                {phW.word.toUpperCase().split('').map((letter,i)=>{
                  const st=spellStatus[i]||'waiting';
                  const isActive=activeSpellIdx===i;
                  const isTapTarget=spellRound===2 && i===tapIndex;
                  return <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                    <span style={{
                      fontSize:24,fontFamily:"'Poppins',sans-serif",fontWeight:800,
                      padding:"6px 10px",borderRadius:12,minWidth:36,textAlign:"center",
                      background:isActive?cc:st==='correct'?"#22C55E":st==='wrong'?"#EF4444":"#f3f4f6",
                      color:(isActive||st==='correct'||st==='wrong')?"#fff":"#ddd",
                      transform:isActive?"scale(1.2) translateY(-4px)":isTapTarget?"scale(1.1)":"scale(1)",
                      boxShadow:isActive?`0 6px 20px ${cc}55`:isTapTarget?`0 4px 16px ${cc}33`:"none",
                      transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                    }}>{letter}</span>
                    {st==='correct'&&!isActive&&<span style={{fontSize:12}}>✅</span>}
                    {st==='wrong'&&!isActive&&<span style={{fontSize:12}}>❌</span>}
                    {isActive&&spellRound===1&&<span style={{fontSize:12,animation:"pulse 1s ease-in-out infinite"}}>👂</span>}
                    {isTapTarget&&spellRound===2&&<span style={{fontSize:12,color:cc,fontWeight:800,animation:"pulse 1s ease-in-out infinite"}}>👆</span>}
                  </div>;
                })}
              </div>
              {spellRound===2&&(
                <div>
                  <div style={{textAlign:"center",fontSize:12,fontWeight:700,color:"#6366F1",marginBottom:10}}>Tap each letter:</div>
                  <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                    {scrambledLetters.map((item,i)=>(
                      <button key={item.id} disabled={item.used}
                        onClick={()=>!item.used&&handleLetterTap(item.letter,i)}
                        style={{
                          fontSize:28,fontFamily:"'Poppins',sans-serif",fontWeight:800,
                          padding:"6px 10px",borderRadius:16,minWidth:50,
                          border:"3px solid",cursor:item.used?"default":"pointer",
                          borderColor:tapWrong===i?"#EF4444":item.used?"#ddd":cc,
                          background:tapWrong===i?"#FEE2E2":item.used?"#f9fafb":"#fff",
                          color:item.used?"#ddd":tapWrong===i?"#EF4444":"#1a1a2e",
                          transform:tapWrong===i?"scale(0.9) rotate(-5deg)":item.used?"scale(0.8)":"scale(1)",
                          opacity:item.used?0.4:1,
                          transition:"all 0.2s cubic-bezier(0.34,1.56,0.64,1)",
                          boxShadow:!item.used&&tapWrong!==i?`0 4px 12px ${cc}22`:"none",
                        }}>{item.letter}</button>
                    ))}
                  </div>
                </div>
              )}
              {spellRound===1&&<div style={{textAlign:"center",marginTop:12,padding:"8px 14px",background:"#FFF5EB",borderRadius:12}}>
                <p style={{fontSize:13,fontWeight:700,color:"#FC8019"}}>👀 Watch and listen!</p>
              </div>}
            </div>
          </div>
        )}
        {phStep==="saying_sentence"&&<Mascot mood="excited" msg="Listen to this sentence! 💬"/>}
        {phStep==="saying_phonics"&&<Mascot mood="thinking" msg="Let's understand how to speak this word... 🔡"/>}
        {phStep==="countdown"&&(
          <div style={{textAlign:"center",padding:24,background:"#F1F3F7",borderRadius:24,animation:"slideUp 0.3s ease-out"}}>
            <Mascot mood="listening" msg={`Say "${phW.word.toUpperCase()}" when I say Start!`}/>
            <div style={{fontSize:48,fontFamily:"'Poppins',sans-serif",fontWeight:800,color:countdown>0?cc:"#22C55E",animation:"numPulse 0.5s ease-in-out infinite",marginTop:8}}>
              {countdown>0?countdown:"🎤 Start!"}
            </div>
          </div>
        )}
        {phStep==="listening"&&<ListeningBox transcript={rec.txt} onTapMic={tapMicPh} isListening={rec.on} error={rec.err} onType={typePh} expected={phW?.word||""}/>}
        {phStep==="result"&&phRes!==null&&<ResultBox acc={phAcc} result={phRes} expected={phW.word} onRetry={retryPh} onDone={()=>{setPhRes(null);const ws=WCATS[phCat]?.words||[];const idx=ws.findIndex(x=>x.word===phW?.word);const next=ws[(idx+1)%ws.length];setPhW(next);setPhStep("idle");setTimeout(()=>playPh(next),200);}} color={cc} kidName={kidName} currentPoints={prof?.points||0}/>}
      </div>
    </div>{TeacherBubble}<style>{CSS}</style></div>;}

  // ═══ PHONICS GRID ═══
  if(scr==="phonics")return<div style={{fontFamily:"'Poppins',sans-serif",height:"100dvh",overflow:"auto",background:"#fff",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column"}}><Particles count={8}/><SubHead title="Phonics" onBack={goHome} points={prof?.points||0}/><nav style={{display:"flex",gap:8,padding:"10px 16px",overflowX:"auto",background:"#F8F9FB",borderBottom:"1px solid #EFEFEF"}}>{Object.entries(WCATS).map(([k,d])=><button key={k} onClick={()=>setPhCat(k)} style={{padding:"7px 14px",borderRadius:18,border:"2px solid",borderColor:phCat===k?d.color:"#eee",background:phCat===k?d.color:"rgba(255,255,255,0.06)",color:phCat===k?"#fff":"#555",fontSize:12,fontWeight:800,whiteSpace:"nowrap",cursor:"pointer",fontFamily:"'Poppins',sans-serif",flexShrink:0,transition:"all 0.3s"}}>{d.emoji} {k.charAt(0).toUpperCase()+k.slice(1)}</button>)}</nav><div style={{flex:1,overflow:"auto"}}><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,padding:16}}>{WCATS[phCat]?.words.map((w,i)=>{const done=isDone("phonics",w.word);const cc=WCATS[phCat].color;return<button key={w.word} onClick={(e)=>{flyTo(e,"happy");rec.warmUp();setPhW(w);setPhStep("idle");setTimeout(()=>playPh(w),100);}} style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",padding:"18px 10px 12px",borderRadius:20,border:`2px solid ${done?cc+"44":"#eee"}`,background:done?`linear-gradient(135deg,${cc}05,${cc}10)`:"#fff",cursor:"pointer",fontFamily:"'Poppins',sans-serif",animation:`gridPop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i*0.06}s both, cardFloat ${2.5+Math.random()*1.5}s ease-in-out ${0.5+i*0.06}s infinite`,boxShadow:"0 2px 8px rgba(0,0,0,.08)"}}>{done&&<span style={{position:"absolute",top:6,right:6,width:20,height:20,borderRadius:"50%",background:"#22C55E",color:"#1C1C2B",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900}}>✓</span>}<span style={{fontSize:34,animation:`iconF 3s ease-in-out ${i*0.2}s infinite`}}>{w.img}</span><span style={{fontFamily:"'Poppins',sans-serif",fontSize:18,fontWeight:700,marginTop:4}}>{w.word}</span><div style={{display:"flex",gap:3,marginTop:5}}>{w.ph.map((ph,j)=><span key={j} style={{fontSize:9,fontWeight:800,background:"#F1F3F7",color:"#93959F",padding:"2px 7px",borderRadius:7}}>{ph}</span>)}</div></button>;})}</div></div>{TeacherBubble}<style>{CSS}</style></div>;

  // ═══ SHAPES ═══
  // ═══ SHAPE DETAIL ═══
  if(scr==="shapes"&&selShape){const sh=selShape;const shColor="#A855F7";return<div style={{fontFamily:"'Poppins',sans-serif",height:"100dvh",overflow:"auto",background:"#fff",maxWidth:520,margin:"0 auto",position:"relative",display:"flex",flexDirection:"column"}}><Confetti active={confetti}/>{ptAnim&&<div style={{position:"fixed",top:20,right:20,zIndex:999,animation:"ptFly 1.5s ease-out forwards",fontFamily:"'Poppins',sans-serif",fontSize:28,fontWeight:800,color:"#22C55E"}}>{ptAnim}</div>}<SubHead title={sh.name} onBack={()=>{stop();pRef.current=false;setSelShape(null);setShStep("idle");}} points={prof?.points||0}/>
    {shStep!=="idle"&&<FlowSteps current={shStep} steps={PH_STEPS}/>}
    <div style={{padding:"6px 10px"}}>
      {/* Animated Scene */}
      {sh.scene&&<div style={{position:"relative",width:"100%",height:120,borderRadius:16,overflow:"hidden",background:sh.scene.bg,boxShadow:"inset 0 0 40px rgba(0,0,0,0.1)"}}>
        {sh.scene.elements.map((el,i)=><div key={i} style={{position:"absolute",left:`${el.x}%`,top:`${el.y}%`,transform:"translate(-50%,-50%)",fontSize:el.size,zIndex:2,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.2))",animation:el.anim!=="none"?`scene_${el.anim} ${el.dur}s ease-in-out ${el.delay||0}s infinite`:"none"}}>{el.emoji}</div>)}
        {shStep==="saying_sentence"&&<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px 16px 10px",background:"linear-gradient(transparent,rgba(0,0,0,0.6))",zIndex:10}}><p style={{color:"#1C1C2B",fontSize:13,fontWeight:700,textAlign:"center"}}>💬 {sh.sentence}</p></div>}
      </div>}
      <div style={{textAlign:"center",marginTop:4}}><span style={{fontSize:30}}>{sh.emoji}</span><div style={{fontFamily:"'Poppins',sans-serif",fontSize:18,fontWeight:700,textTransform:"capitalize"}}>{sh.name}</div>{sh.sides>0&&<span style={{fontSize:12,fontWeight:700,background:"#FFF5EB",color:"#FC8019",padding:"4px 12px",borderRadius:10}}>{sh.sides} sides</span>}</div>
      {sh.ph&&(shStep==="saying_phonics"||shStep==="idle")&&<div style={{marginTop:6,background:"#F1F3F7",borderRadius:14,padding:8}}><div style={{fontSize:11,fontWeight:800,color:"#6366F1",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🔊 Phonics</div><div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>{sh.ph.map((ph,i)=>{const d=gPh(ph);const act=shAI===i;return<button key={i} onClick={()=>{if(!pRef.current)speak(d.s,{rate:0.45,pitch:1.0});}} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"6px 10px 5px",borderRadius:12,border:"none",cursor:"pointer",fontFamily:"'Poppins',sans-serif",minWidth:44,background:act?shColor:"#f3f4f6",color:act?"#fff":"#333",transform:act?"scale(1.3) translateY(-4px)":"scale(1)",transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}><span style={{fontSize:16,fontWeight:900,fontFamily:"'Poppins',sans-serif"}}>{ph.toUpperCase()}</span><span style={{fontSize:9,fontWeight:700,color:act?"#fffc":"#999",marginTop:2}}>{d.d}</span></button>;})}</div></div>}
      <div style={{marginTop:12}}>
        {shStep==="idle"&&<div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#F1F3F7",borderRadius:14,flex:1}}><span style={{fontSize:12,fontWeight:700,color:speakMode?"#22C55E":"#999"}}>🎤</span><button onClick={()=>setSpeakMode(!speakMode)} style={{width:40,height:22,borderRadius:11,border:"none",cursor:"pointer",background:speakMode?"#22C55E":"#ddd",position:"relative",transition:"background 0.3s"}}><div style={{width:18,height:18,borderRadius:9,background:"#F1F3F7",position:"absolute",top:2,left:speakMode?20:2,transition:"left 0.3s"}}/></button><span style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:600}}>{speakMode?"ON":"OFF"}</span></div><button onClick={()=>playShape(sh)} style={{padding:"10px 20px",borderRadius:14,border:"none",color:"#1C1C2B",fontSize:14,fontWeight:800,fontFamily:"'Poppins',sans-serif",cursor:"pointer",background:`linear-gradient(135deg,${shColor},${shColor}dd)`,display:"flex",alignItems:"center",gap:6}}>🔄 Replay</button></div>}
        {shStep==="saying_word"&&<Mascot mood="speaking" msg={`This is a ${sh.name}! 🔊`}/>}
        {shStep==="spelling"&&<div data-panda="spell-area" style={{animation:"slideUp 0.3s ease-out"}}><Mascot mood="thinking" msg={spellRound===1?"Watch and listen! 🔤":spellRound===2?"Tap the letters! 👆":"🔤"}/><div style={{padding:10,background:"#F1F3F7",borderRadius:16}}><div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:spellRound===2?16:0}}>{sh.name.toUpperCase().split('').map((letter,i)=>{const st=spellStatus[i]||'waiting';const isActive=activeSpellIdx===i;const isTap=spellRound===2&&i===tapIndex;return<div key={i} data-panda={isActive?"spell-letter":undefined} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><span style={{fontSize:32,fontFamily:"'Poppins',sans-serif",fontWeight:800,padding:"10px 14px",borderRadius:16,minWidth:44,textAlign:"center",background:isActive?shColor:st==='correct'?"#22C55E":st==='wrong'?"#EF4444":"#f3f4f6",color:(isActive||st==='correct'||st==='wrong')?"#fff":"#ddd",transform:isActive?"scale(1.2) translateY(-4px)":"scale(1)",transition:"all 0.3s"}}>{letter}</span>{st==='correct'&&!isActive&&<span style={{fontSize:12}}>✅</span>}{isTap&&<span style={{fontSize:12,animation:"pulse 1s infinite"}}>👆</span>}</div>;})}</div>{spellRound===2&&<div><div style={{textAlign:"center",fontSize:12,fontWeight:700,color:"#6366F1",marginBottom:10}}>Tap each letter:</div><div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>{scrambledLetters.map((item,i)=><button key={item.id} disabled={item.used} onClick={()=>!item.used&&handleLetterTap(item.letter,i)} style={{fontSize:28,fontFamily:"'Poppins',sans-serif",fontWeight:800,padding:"6px 10px",borderRadius:16,border:"3px solid",borderColor:tapWrong===i?"#EF4444":item.used?"#ddd":"#6366F1",background:tapWrong===i?"#FEE2E2":item.used?"#f9fafb":"#fff",color:item.used?"#ddd":"#1a1a2e",opacity:item.used?0.4:1,transition:"all 0.2s",cursor:item.used?"default":"pointer"}}>{item.letter}</button>)}</div></div>}{spellRound===1&&<div style={{textAlign:"center",marginTop:12,padding:"8px",background:"#FFF5EB",borderRadius:12}}><p style={{fontSize:13,fontWeight:700,color:"#FC8019"}}>👀 Watch and listen!</p></div>}</div></div>}
        {shStep==="saying_sentence"&&<Mascot mood="excited" msg="Listen! 💬"/>}
        {shStep==="saying_phonics"&&<Mascot mood="thinking" msg="How to speak this word... 🔡"/>}
        {shStep==="countdown"&&<div style={{textAlign:"center",padding:24,background:"#F1F3F7",borderRadius:24,animation:"slideUp 0.3s ease-out"}}><div style={{fontSize:48,fontFamily:"'Poppins',sans-serif",fontWeight:800,color:countdown>0?shColor:"#22C55E",animation:"numPulse 0.5s ease-in-out infinite"}}>{countdown>0?countdown:"🎤 Go!"}</div></div>}
        {shStep==="listening"&&<ListeningBox transcript={rec.txt} onTapMic={()=>rec.start(handleShResult)} isListening={rec.on} error={rec.err} onType={(t)=>handleShResult(t)} expected={sh.name}/>}
        {shStep==="result"&&shRes!==null&&<ResultBox acc={shAcc} result={shRes} expected={sh.name} onRetry={retryShape} onDone={()=>{setShRes(null);const idx=SHAPES.findIndex(x=>x.name===sh.name);const next=SHAPES[(idx+1)%SHAPES.length];setSelShape(next);setShStep("idle");setTimeout(()=>playShape(next),200);}} color={shColor} kidName={kidName} currentPoints={prof?.points||0}/>}
      </div>
    </div>{TeacherBubble}<style>{CSS}</style></div>;}

  // ═══ SHAPES GRID ═══
  if(scr==="shapes")return<div style={{fontFamily:"'Poppins',sans-serif",height:"100dvh",overflow:"auto",background:"#fff",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column"}}><Particles count={8} emojis={["🔷","🔺","⭐","💎","❤️"]}/><SubHead title="Shapes" onBack={goHome} points={prof?.points||0}/><div style={{flex:1,overflow:"auto"}}><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14,padding:16}}>{SHAPES.map((s,i)=>{const done=isDone("shapes",s.name);return<button key={s.name} onClick={(e)=>{flyTo(e,"excited");rec.warmUp();setSelShape(s);setShStep("idle");setTimeout(()=>playShape(s),100);}} style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",padding:24,borderRadius:22,border:`2px solid ${done?"#A855F744":"#E8E8E8"}`,background:done?"linear-gradient(135deg,#A855F705,#A855F710)":"#fff",cursor:"pointer",fontFamily:"'Poppins',sans-serif",animation:`gridPop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i*0.1}s both, cardFloat ${2.5+Math.random()*2}s ease-in-out ${0.6+i*0.1}s infinite`,boxShadow:"0 2px 8px rgba(0,0,0,.08)"}}>{done&&<span style={{position:"absolute",top:6,right:6,width:20,height:20,borderRadius:"50%",background:"#22C55E",color:"#1C1C2B",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900}}>✓</span>}<span style={{fontSize:48,animation:`iconF 3s ease-in-out ${i*0.3}s infinite`}}>{s.emoji}</span><span style={{fontFamily:"'Poppins',sans-serif",fontSize:16,fontWeight:700,marginTop:6,textTransform:"capitalize"}}>{s.name}</span><span style={{fontSize:11,color:"#93959F",fontWeight:600}}>{s.desc}</span></button>;})}</div></div>{TeacherBubble}<style>{CSS}</style></div>;


  // ═══ COLORS ═══
  // ═══ COLOR DETAIL ═══
  if(scr==="colors"&&selColor){const co=selColor;return<div style={{fontFamily:"'Poppins',sans-serif",height:"100dvh",overflow:"auto",background:"#fff",maxWidth:520,margin:"0 auto",position:"relative",display:"flex",flexDirection:"column"}}><Confetti active={confetti}/>{ptAnim&&<div style={{position:"fixed",top:20,right:20,zIndex:999,animation:"ptFly 1.5s ease-out forwards",fontFamily:"'Poppins',sans-serif",fontSize:28,fontWeight:800,color:"#22C55E"}}>{ptAnim}</div>}<SubHead title={co.name} onBack={()=>{stop();pRef.current=false;setSelColor(null);setCoStep("idle");}} points={prof?.points||0}/>
    {coStep!=="idle"&&<FlowSteps current={coStep} steps={PH_STEPS}/>}
    <div style={{padding:"6px 10px"}}>
      {/* Animated Scene */}
      {co.scene&&<div style={{position:"relative",width:"100%",height:120,borderRadius:16,overflow:"hidden",background:co.scene.bg,boxShadow:"inset 0 0 40px rgba(0,0,0,0.1)"}}>
        {co.scene.elements.map((el,i)=><div key={i} style={{position:"absolute",left:`${el.x}%`,top:`${el.y}%`,transform:"translate(-50%,-50%)",fontSize:el.size,zIndex:2,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.2))",animation:el.anim!=="none"?`scene_${el.anim} ${el.dur}s ease-in-out ${el.delay||0}s infinite`:"none"}}>{el.emoji}</div>)}
        {coStep==="saying_sentence"&&<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px 16px 10px",background:"linear-gradient(transparent,rgba(0,0,0,0.6))",zIndex:10}}><p style={{color:"#1C1C2B",fontSize:13,fontWeight:700,textAlign:"center"}}>💬 {co.sentence}</p></div>}
      </div>}
      <div style={{textAlign:"center",marginTop:4}}><div style={{width:50,height:50,borderRadius:16,background:co.hex,margin:"0 auto 8px",boxShadow:`0 8px 24px ${co.hex}44`}}/><div style={{fontFamily:"'Poppins',sans-serif",fontSize:18,fontWeight:700,textTransform:"capitalize"}}>{co.name}</div><div style={{display:"flex",gap:6,justifyContent:"center",marginTop:6}}>{co.things.map((t,j)=><span key={j} style={{fontSize:11,fontWeight:700,background:"#F1F3F7",color:"rgba(255,255,255,0.5)",padding:"4px 10px",borderRadius:8}}>{t}</span>)}</div></div>
      {co.ph&&(coStep==="saying_phonics"||coStep==="idle")&&<div style={{marginTop:6,background:"#F1F3F7",borderRadius:14,padding:8}}><div style={{fontSize:11,fontWeight:800,color:"#6366F1",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🔊 Phonics</div><div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>{co.ph.map((ph,i)=>{const d=gPh(ph);const act=coAI===i;return<button key={i} onClick={()=>{if(!pRef.current)speak(d.s,{rate:0.45,pitch:1.0});}} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"6px 10px 5px",borderRadius:12,border:"none",cursor:"pointer",fontFamily:"'Poppins',sans-serif",minWidth:44,background:act?co.hex:"#f3f4f6",color:act?"#fff":"#333",transform:act?"scale(1.3) translateY(-4px)":"scale(1)",transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}><span style={{fontSize:16,fontWeight:900,fontFamily:"'Poppins',sans-serif"}}>{ph.toUpperCase()}</span><span style={{fontSize:9,fontWeight:700,color:act?"#fffc":"#999",marginTop:2}}>{d.d}</span></button>;})}</div></div>}
      <div style={{marginTop:12}}>
        {coStep==="idle"&&<div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#F1F3F7",borderRadius:14,flex:1}}><span style={{fontSize:12,fontWeight:700,color:speakMode?"#22C55E":"#999"}}>🎤</span><button onClick={()=>setSpeakMode(!speakMode)} style={{width:40,height:22,borderRadius:11,border:"none",cursor:"pointer",background:speakMode?"#22C55E":"#ddd",position:"relative",transition:"background 0.3s"}}><div style={{width:18,height:18,borderRadius:9,background:"#F1F3F7",position:"absolute",top:2,left:speakMode?20:2,transition:"left 0.3s"}}/></button><span style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:600}}>{speakMode?"ON":"OFF"}</span></div><button onClick={()=>playColor(co)} style={{padding:"10px 20px",borderRadius:14,border:"none",color:"#1C1C2B",fontSize:14,fontWeight:800,fontFamily:"'Poppins',sans-serif",cursor:"pointer",background:`linear-gradient(135deg,${co.hex},${co.hex}dd)`,display:"flex",alignItems:"center",gap:6}}>🔄 Replay</button></div>}
        {coStep==="saying_word"&&<Mascot mood="speaking" msg={`This color is ${co.name}! 🔊`}/>}
        {coStep==="spelling"&&<div data-panda="spell-area" style={{animation:"slideUp 0.3s ease-out"}}><Mascot mood="thinking" msg={spellRound===1?"Watch and listen! 🔤":spellRound===2?"Tap the letters! 👆":"🔤"}/><div style={{padding:10,background:"#F1F3F7",borderRadius:16}}><div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:spellRound===2?16:0}}>{co.name.toUpperCase().split('').map((letter,i)=>{const st=spellStatus[i]||'waiting';const isActive=activeSpellIdx===i;const isTap=spellRound===2&&i===tapIndex;return<div key={i} data-panda={isActive?"spell-letter":undefined} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><span style={{fontSize:32,fontFamily:"'Poppins',sans-serif",fontWeight:800,padding:"10px 14px",borderRadius:16,minWidth:44,textAlign:"center",background:isActive?co.hex:st==='correct'?"#22C55E":st==='wrong'?"#EF4444":"#f3f4f6",color:(isActive||st==='correct'||st==='wrong')?"#fff":"#ddd",transform:isActive?"scale(1.2) translateY(-4px)":"scale(1)",transition:"all 0.3s"}}>{letter}</span>{st==='correct'&&!isActive&&<span style={{fontSize:12}}>✅</span>}{isTap&&<span style={{fontSize:12,animation:"pulse 1s infinite"}}>👆</span>}</div>;})}</div>{spellRound===2&&<div><div style={{textAlign:"center",fontSize:12,fontWeight:700,color:"#6366F1",marginBottom:10}}>Tap each letter:</div><div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>{scrambledLetters.map((item,i)=><button key={item.id} disabled={item.used} onClick={()=>!item.used&&handleLetterTap(item.letter,i)} style={{fontSize:28,fontFamily:"'Poppins',sans-serif",fontWeight:800,padding:"6px 10px",borderRadius:16,border:"3px solid",borderColor:tapWrong===i?"#EF4444":item.used?"#ddd":co.hex,background:tapWrong===i?"#FEE2E2":item.used?"#f9fafb":"#fff",color:item.used?"#ddd":"#1a1a2e",opacity:item.used?0.4:1,transition:"all 0.2s",cursor:item.used?"default":"pointer"}}>{item.letter}</button>)}</div></div>}{spellRound===1&&<div style={{textAlign:"center",marginTop:12,padding:"8px",background:"#FFF5EB",borderRadius:12}}><p style={{fontSize:13,fontWeight:700,color:"#FC8019"}}>👀 Watch and listen!</p></div>}</div></div>}
        {coStep==="saying_sentence"&&<Mascot mood="excited" msg="Listen! 💬"/>}
        {coStep==="saying_phonics"&&<Mascot mood="thinking" msg="How to speak this word... 🔡"/>}
        {coStep==="countdown"&&<div style={{textAlign:"center",padding:24,background:"#F1F3F7",borderRadius:24}}><div style={{fontSize:48,fontFamily:"'Poppins',sans-serif",fontWeight:800,color:countdown>0?co.hex:"#22C55E",animation:"numPulse 0.5s ease-in-out infinite"}}>{countdown>0?countdown:"🎤 Go!"}</div></div>}
        {coStep==="listening"&&<ListeningBox transcript={rec.txt} onTapMic={()=>rec.start(handleCoResult)} isListening={rec.on} error={rec.err} onType={(t)=>handleCoResult(t)} expected={co.name}/>}
        {coStep==="result"&&coRes!==null&&<ResultBox acc={coAcc} result={coRes} expected={co.name} onRetry={retryColor} onDone={()=>{setCoRes(null);const idx=COLORSDATA.findIndex(x=>x.name===co.name);const next=COLORSDATA[(idx+1)%COLORSDATA.length];setSelColor(next);setCoStep("idle");setTimeout(()=>playColor(next),200);}} color={co.hex} kidName={kidName} currentPoints={prof?.points||0}/>}
      </div>
    </div>{TeacherBubble}<style>{CSS}</style></div>;}

  // ═══ COLORS GRID ═══
  if(scr==="colors")return<div style={{fontFamily:"'Poppins',sans-serif",height:"100dvh",overflow:"auto",background:"#fff",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column"}}><Particles count={8} emojis={["🌈","🎨","🖍️","✨"]}/><SubHead title="Colors" onBack={goHome} points={prof?.points||0}/><div style={{flex:1,overflow:"auto"}}><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14,padding:16}}>{COLORSDATA.map((c,i)=>{const done=isDone("colors",c.name);return<button key={c.name} onClick={(e)=>{flyTo(e,"happy");rec.warmUp();setSelColor(c);setCoStep("idle");setTimeout(()=>playColor(c),100);}} style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",padding:22,borderRadius:22,border:`2px solid ${done?c.hex+"44":"#E8E8E8"}`,background:done?`linear-gradient(135deg,${c.hex}05,${c.hex}10)`:"#fff",cursor:"pointer",fontFamily:"'Poppins',sans-serif",animation:`gridPop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i*0.1}s both, cardFloat ${2.5+Math.random()*2}s ease-in-out ${0.6+i*0.1}s infinite`,boxShadow:"0 2px 8px rgba(0,0,0,.08)"}}>{done&&<span style={{position:"absolute",top:6,right:6,width:20,height:20,borderRadius:"50%",background:"#22C55E",color:"#1C1C2B",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900}}>✓</span>}<div style={{width:54,height:54,borderRadius:16,background:c.hex,marginBottom:6,boxShadow:`0 4px 12px ${c.hex}44`}}/><span style={{fontFamily:"'Poppins',sans-serif",fontSize:16,fontWeight:700,textTransform:"capitalize"}}>{c.name}</span><span style={{fontSize:22}}>{c.emoji}</span></button>;})}</div></div>{TeacherBubble}<style>{CSS}</style></div>;




  // ═══ ALPHABET ═══
  if(scr==="alphabet")return<div style={{fontFamily:"'Poppins',sans-serif",height:"100dvh",overflow:"hidden",background:"#fff",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column"}}><Confetti active={confetti}/>
    <SubHead title="ABC 🔠" onBack={goHome} points={prof?.points||0}/>
    {/* Tab bar */}
    <div style={{display:"flex",gap:6,padding:"6px 10px",background:"#F8F9FB",borderBottom:"1px solid #EFEFEF"}}>
      {[{id:"caps",label:"🔤 CAPITAL"},{id:"small",label:"🔡 small"},{id:"match",label:"🎯 Match"}].map(t=>
        <button key={t.id} onClick={()=>{setAlphaTab(t.id);setSelLetter(null);if(t.id==="match"&&matchPairs.length===0)startMatch();}}
          style={{flex:1,padding:"10px 6px",borderRadius:14,border:"none",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"'Poppins',sans-serif",
            background:alphaTab===t.id?"#6366F1":"#F1F3F7",color:alphaTab===t.id?"#fff":"#93959F",transition:"all 0.2s"
          }}>{t.label}</button>
      )}
    </div>

    {/* ═══ LETTER DETAIL OVERLAY ═══ */}
    {selLetter&&<div data-panda="letter-detail" style={{position:"absolute",inset:0,background:"rgba(255,255,255,.97)",zIndex:30,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,animation:"fadeIn 0.3s",padding:20}}>
      <button onClick={closeLetter} style={{position:"absolute",top:12,right:16,padding:"8px 14px",borderRadius:12,border:"2px solid #E8E8E8",background:"#fff",fontSize:13,fontWeight:800,cursor:"pointer"}}>✕ Close</button>
      <div style={{fontSize:80,fontFamily:"'Poppins',sans-serif",fontWeight:900,color:ALPHA_COLORS[ALPHA_LETTERS.indexOf(selLetter)%13],lineHeight:1,animation:"numPulse 1.5s ease-in-out infinite"}}>{selLetter}{selLetter.toLowerCase()}</div>
      <div style={{fontSize:18,fontWeight:800,color:"#1C1C2B",marginTop:4}}>"{ALPHA_DATA[selLetter]?.ph}" sound</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:10,justifyContent:"center",marginTop:8}}>
        {ALPHA_DATA[selLetter]?.examples.map((ex,i)=>
          <button key={i} onClick={()=>speak(`${selLetter} for ${ex.w}!`,{rate:0.65,pitch:1.0})} style={{
            display:"flex",flexDirection:"column",alignItems:"center",padding:"12px 14px",borderRadius:16,
            border:"2px solid #E8E8E8",background:"#F8F9FB",cursor:"pointer",minWidth:80,
            animation:`gridPop 0.3s ease ${i*0.08}s both`
          }}>
            <span style={{fontSize:32}}>{ex.e}</span>
            <span style={{fontSize:12,fontWeight:800,color:"#1C1C2B",marginTop:4}}>{selLetter} for {ex.w}</span>
          </button>
        )}
      </div>
      <div style={{display:"flex",gap:10,marginTop:12}}>
        <button onClick={()=>playLetter(selLetter)} style={{flex:1,padding:"12px 20px",borderRadius:16,border:"none",background:"linear-gradient(135deg,#6366F1,#818CF8)",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer"}}>🔊 Again</button>
        <button onClick={()=>{const idx=ALPHA_LETTERS.indexOf(selLetter);const next=ALPHA_LETTERS[(idx+1)%26];pRef.current=true;setSelLetter(next);playLetter(next);}} style={{flex:1,padding:"12px 20px",borderRadius:16,border:"none",background:"linear-gradient(135deg,#FC8019,#FF9933)",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer"}}>Next ➡️</button>
      </div>
    </div>}

    {/* ═══ CAPITAL LETTERS TAB ═══ */}
    {alphaTab==="caps"&&!selLetter&&<div style={{flex:1,overflow:"auto",padding:"10px 12px"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
        {ALPHA_LETTERS.map((l,i)=>
          <button key={l} onClick={(e)=>{flyTo(e,"star");pRef.current=true;playLetter(l);}} style={{
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
            padding:"10px 4px",borderRadius:14,border:"2px solid #E8E8E8",cursor:"pointer",
            background:"#fff",boxShadow:"0 2px 8px rgba(0,0,0,.06)",
            animation:`gridPop 0.2s ease ${i*0.02}s both`
          }}>
            <span style={{fontSize:24,fontWeight:900,color:ALPHA_COLORS[i%13]}}>{l}</span>
            <span style={{fontSize:10,fontWeight:700,color:"#93959F"}}>{ALPHA_DATA[l]?.examples[0]?.e||""}</span>
          </button>
        )}
      </div>
    </div>}

    {/* ═══ SMALL LETTERS TAB ═══ */}
    {alphaTab==="small"&&!selLetter&&<div style={{flex:1,overflow:"auto",padding:"10px 12px"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8}}>
        {ALPHA_LETTERS.map((l,i)=>
          <button key={l} onClick={(e)=>{flyTo(e,"star");pRef.current=true;playLetter(l);}} style={{
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
            padding:"10px 4px",borderRadius:14,border:"2px solid #E8E8E8",cursor:"pointer",
            background:"#fff",boxShadow:"0 2px 8px rgba(0,0,0,.06)",
            animation:`gridPop 0.2s ease ${i*0.02}s both`
          }}>
            <span style={{fontSize:24,fontWeight:900,color:ALPHA_COLORS[i%13]}}>{l.toLowerCase()}</span>
            <span style={{fontSize:10,fontWeight:700,color:"#93959F"}}>{ALPHA_DATA[l]?.examples[0]?.e||""}</span>
          </button>
        )}
      </div>
    </div>}

    {/* ═══ MATCH GAME TAB ═══ */}
    {alphaTab==="match"&&!selLetter&&<div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",padding:"10px 14px"}}>
      {/* Current letter being asked */}
      <div style={{textAlign:"center",padding:"10px",background:"linear-gradient(135deg,#EEF2FF,#E0E7FF)",borderRadius:16,marginBottom:10}}>
        {matchIdx<matchPairs.length?<>
          <div style={{fontSize:12,fontWeight:700,color:"#93959F"}}>Find the small letter for:</div>
          <div style={{fontSize:56,fontWeight:900,color:"#6366F1",fontFamily:"'Poppins',sans-serif",lineHeight:1,animation:"numPulse 1.5s ease-in-out infinite"}}>{matchPairs[matchIdx]?.cap||""}</div>
          <div style={{fontSize:14,fontWeight:800,color:"#6366F1"}}>🏆 {matchScore}/8</div>
        </>:<>
          <div style={{fontSize:36}}>🎉</div>
          <div style={{fontSize:18,fontWeight:800,color:"#6366F1"}}>All Done! {matchScore}/{matchPairs.length} correct</div>
          <button onClick={startMatch} style={{marginTop:8,padding:"10px 24px",borderRadius:14,border:"none",background:"#6366F1",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer"}}>🔄 Play Again</button>
        </>}
      </div>
      {/* Small letters to tap */}
      {matchIdx<matchPairs.length&&matchOpts.length>0&&<div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10}}>
        {matchOpts.map((l,i)=>{
          const isWrong=matchWrong===l;
          const isCorrect=matchCorrect===l;
          return<button key={"m"+l+matchIdx} onClick={(e)=>{flyTo(e,"pointing");onMatchSmallTap(l);}} style={{
            padding:"16px 6px",borderRadius:18,border:"3px solid",cursor:"pointer",
            borderColor:isWrong?"#E23744":isCorrect?"#60B246":"#6366F1",
            background:isWrong?"#FEF2F2":isCorrect?"#ECFDF5":"#fff",
            fontSize:30,fontWeight:900,
            color:isWrong?"#E23744":isCorrect?"#60B246":"#1C1C2B",
            fontFamily:"'Poppins',sans-serif",
            transform:isCorrect?"scale(1.2)":isWrong?"scale(0.9)":"scale(1)",
            transition:"all 0.2s",
            animation:`gridPop 0.3s ease ${i*0.06}s both`,
            boxShadow:isCorrect?"0 6px 24px rgba(96,178,70,.3)":isWrong?"0 4px 16px rgba(226,55,68,.2)":"0 2px 10px rgba(99,102,241,.12)"
          }}>{l.toLowerCase()}</button>;
        })}
      </div>}
    </div>}
    {TeacherBubble}<style>{CSS}</style>
  </div>;

  // ═══ BASICS DASHBOARD ═══
  if(scr==="basics")return<div style={{fontFamily:"'Poppins',sans-serif",height:"100dvh",overflow:"hidden",background:"#fff",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column"}}>
    <SubHead title="Basics 🧩" onBack={goHome} points={prof?.points||0}/>
    {/* 3 Tab bar */}
    <div style={{display:"flex",gap:6,padding:"6px 10px",background:"#F8F9FB",borderBottom:"1px solid #EFEFEF"}}>
      {[{id:"explore",label:"📖 Numbers"},{id:"find",label:"🔍 Find"},{id:"write",label:"✏️ Write"}].map(t=>
        <button key={t.id} onClick={()=>{
          setBasicsTab(t.id);
          if(t.id==="find"){if(!findTarget)newFindTarget();}if(t.id==="write")hoverNear("write-canvas","left","pointing");if(t.id==="explore")hoverNear("explore-grid","right","happy");
          if(t.id==="write"){setTimeout(()=>{initCanvas();speak(`Write ${NW[writeNum]||writeNum}.`,{rate:0.75,pitch:1.0});},500);}
        }} style={{flex:1,padding:"12px 8px",borderRadius:14,border:"none",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"'Poppins',sans-serif",
          background:basicsTab===t.id?"#6366F1":"#f3f4f6",color:basicsTab===t.id?"#fff":"#888",transition:"all 0.2s"
        }}>{t.label}</button>
      )}
    </div>

    {/* ═══ EXPLORE: Grid of all numbers ═══ */}
    {basicsTab==="explore"&&<div data-panda="explore-grid" style={{flex:1,overflow:"auto",padding:"10px 12px",display:"flex",alignItems:"flex-start"}}>
      <div style={{display:"grid",gridTemplateColumns:`repeat(${(aCfg?.max||20)<=10?3:(aCfg?.max||20)<=20?4:5},1fr)`,gap:10,width:"100%"}}>
        {Array.from({length:aCfg?.max||20}).map((_,i)=>{const n=i+1;const em=NUM_EMOJI[n]||"";
          return<button key={n} onClick={()=>sayNum(n)} style={{
            display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
            padding:(aCfg?.max||20)<=10?"16px 8px":"10px 4px",
            borderRadius:16,border:"2px solid #F1F3F7",cursor:"pointer",
            background:"#fff",boxShadow:"0 2px 8px rgba(0,0,0,.06)",fontFamily:"'Poppins',sans-serif",
            animation:`gridPop 0.3s ease ${i*0.03}s both`,transition:"all 0.15s",
            aspectRatio:(aCfg?.max||20)<=10?"1":"auto"
          }}>
            <span style={{fontSize:(aCfg?.max||20)<=10?28:(aCfg?.max||20)<=20?22:18,fontWeight:800,color:nClr(n),lineHeight:1}}>{n}</span>
            {em&&<span style={{fontSize:(aCfg?.max||20)<=10?20:14,lineHeight:1,marginTop:4}}>{em}</span>}
            <span style={{fontSize:(aCfg?.max||20)<=10?10:8,fontWeight:700,color:"#93959F",marginTop:2,textTransform:"capitalize"}}>{NW[n]||""}</span>
          </button>;
        })}
      </div>
    </div>}


    {/* ═══ FIND GAME ═══ */}
    {basicsTab==="find"&&<div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"}}>
      {/* Header — NO number shown, just listen prompt */}
      <div data-panda="find-prompt" style={{padding:"10px 14px",background:"linear-gradient(135deg,#FFF5EB,#FEF3C7)",display:"flex",alignItems:"center",gap:10}}>
        {findTarget?<>
          <button onClick={repeatFind} style={{padding:"10px 18px",borderRadius:14,border:"none",background:"linear-gradient(135deg,#FC8019,#FF9933)",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"'Poppins',sans-serif",boxShadow:"0 4px 12px rgba(252,128,25,.3)",display:"flex",alignItems:"center",gap:6}}>
            🔊 Hear Again
          </button>
          <div style={{flex:1,textAlign:"center"}}>
            <div style={{fontFamily:"'Poppins',sans-serif",fontSize:16,fontWeight:800,color:"#FC8019"}}>Listen and find! 👂</div>
            {findFb&&!foundNum&&<span style={{fontSize:12,fontWeight:800,color:findFb.ok?"#60B246":"#E23744"}}>{findFb.ok?"✅ Correct!":"❌ Try again!"}</span>}
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontFamily:"'Poppins',sans-serif",fontSize:16,fontWeight:800,color:"#FC8019"}}>🏆 {findScore}</div>
            {findStreak>=3&&<span style={{fontSize:10,fontWeight:800,color:"#E23744"}}>🔥{findStreak}</span>}
          </div>
        </>:<button onClick={newFindTarget} style={{width:"100%",padding:"16px",borderRadius:16,border:"none",background:"linear-gradient(135deg,#FC8019,#FF9933)",color:"#fff",fontSize:18,fontWeight:800,cursor:"pointer",fontFamily:"'Poppins',sans-serif",boxShadow:"0 6px 20px rgba(252,128,25,.3)"}}>▶️ Start Game!</button>}
      </div>
      {/* Number grid */}
      <div style={{flex:1,overflow:"auto",padding:"10px 12px"}}><div style={{display:"grid",gridTemplateColumns:`repeat(${(aCfg?.max||20)<=10?3:(aCfg?.max||20)<=20?4:5},1fr)`,gap:10}}>
        {Array.from({length:aCfg?.max||20}).map((_,i)=>{const n=i+1;const fb=findFb?.n===n?findFb:null;
          return<button key={n} onClick={()=>onFindTap(n)} style={{
            padding:(aCfg?.max||20)<=10?"18px 8px":"12px 4px",
            borderRadius:16,border:"3px solid",cursor:"pointer",
            borderColor:fb?(fb.ok?"#60B246":"#E23744"):"#E8E8E8",
            background:fb?(fb.ok?"#ECFDF5":"#FEF2F2"):"#fff",
            fontFamily:"'Poppins',sans-serif",
            fontSize:(aCfg?.max||20)<=10?28:(aCfg?.max||20)<=20?24:20,
            fontWeight:800,color:nClr(n),
            boxShadow:fb?.ok?"0 4px 16px rgba(96,178,70,.2)":"0 2px 8px rgba(0,0,0,.06)",
            transform:fb?.ok?"scale(1.1)":"scale(1)",transition:"all 0.15s",
            aspectRatio:(aCfg?.max||20)<=10?"1":"auto"
          }}>{n}</button>;
        })}
      </div></div>

      {/* ═══ CELEBRATION OVERLAY when correct ═══ */}
      {foundNum&&<div style={{position:"absolute",inset:0,background:"rgba(255,255,255,.97)",zIndex:20,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8,animation:"fadeIn 0.3s ease"}}>
        <span style={{fontSize:48}}>{NUM_EMOJI[foundNum]||"🎉"}</span>
        <div style={{fontFamily:"'Poppins',sans-serif",fontSize:72,fontWeight:900,color:"#FC8019",lineHeight:1,animation:"numPulse 1s ease-in-out infinite"}}>{foundNum}</div>
        <div style={{fontFamily:"'Poppins',sans-serif",fontSize:22,fontWeight:800,color:"#1C1C2B",textTransform:"capitalize"}}>{NW[foundNum]||""}</div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center"}}>
          {(NW[foundNum]||"").replace(/\s/g,"").split("").map((l,i)=>
            <span key={i} style={{fontSize:24,fontFamily:"'Poppins',sans-serif",fontWeight:800,padding:"6px 10px",borderRadius:10,background:"#FFF5EB",color:"#FC8019",border:"2px solid #FC801933",animation:`gridPop 0.3s ease ${i*0.08}s both`}}>{l.toUpperCase()}</span>
          )}
        </div>
        {NUM_FUN[foundNum]&&<p style={{fontSize:14,fontWeight:700,color:"#93959F",marginTop:4}}>{NUM_FUN[foundNum]}</p>}
      </div>}
    </div>}


    {/* ═══ WRITE TAB: Split screen - top shows number, bottom is notepad ═══ */}
    {basicsTab==="write"&&<div data-panda="write-canvas" style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      {/* ═══ TOP: Compact reference with ruled lines ═══ */}
      <div style={{flexShrink:0,background:"#fff",borderBottom:"3px solid #FC8019",overflow:"hidden"}}>
        <div style={{position:"relative",padding:"8px 14px",
          backgroundImage:"repeating-linear-gradient(transparent,transparent 27px,#E8E8E8 27px,#E8E8E8 28px)",
          backgroundSize:"100% 28px",backgroundPosition:"0 8px"
        }}>
          <div style={{position:"absolute",left:30,top:0,bottom:0,width:2,background:"#FECACA"}}/>
          <div style={{display:"flex",alignItems:"center",gap:10,paddingLeft:36}}>
            <span style={{fontFamily:"'Poppins',sans-serif",fontSize:52,fontWeight:900,color:"#FC8019",lineHeight:1}}>{writeNum}</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:800,fontSize:15,color:"#1C1C2B",textTransform:"capitalize"}}>{NW[writeNum]||""} {NUM_EMOJI[writeNum]||""}</div>
              <div style={{fontSize:10,fontWeight:700,color:"#93959F"}}>{NUM_STROKES[writeNum]||"Write it!"}</div>
            </div>
            <button onClick={()=>speak(`${NW[writeNum]||writeNum}. ${NUM_STROKES[writeNum]||""}`,{rate:0.5,pitch:1.0})} style={{padding:"8px 12px",borderRadius:10,border:"none",background:"#FC8019",color:"#fff",fontSize:11,fontWeight:800,cursor:"pointer"}}>🔊</button>
          </div>
        </div>
        {writeScore!==null&&<div style={{padding:"5px 14px",background:writeScore>=85?"#ECFDF5":writeScore>=50?"#FFF8E1":"#FEF2F2",display:"flex",alignItems:"center",gap:8}}>
          <div style={{flex:1,height:8,borderRadius:4,background:"#E8E8E8",overflow:"hidden"}}>
            <div style={{height:"100%",borderRadius:4,transition:"width 0.5s",background:writeScore>=85?"#60B246":writeScore>=50?"#FC8019":"#E23744",width:`${writeScore}%`}}/>
          </div>
          <span style={{fontSize:12,fontWeight:800,color:writeScore>=85?"#60B246":writeScore>=50?"#FC8019":"#E23744"}}>{writeScore}%</span>
          <span style={{fontSize:11,fontWeight:700,color:writeScore>=85?"#60B246":writeScore>=50?"#FC8019":"#E23744"}}>{writeScore>=85?"⭐ Perfect!":writeScore>=50?"✅ Pass!":"Keep tracing!"}</span>
          {writeOk&&<span style={{fontSize:16}}>✅</span>}
        </div>}
      </div>


      {/* ═══ BOTTOM HALF: Big writing canvas ═══ */}
      <div style={{flex:1,position:"relative",touchAction:"none",overflow:"hidden",background:"#F1F3F7"}}>
        {/* Red margin line */}
        <div style={{position:"absolute",left:36,top:0,bottom:0,width:2,background:"#FECACA",zIndex:1,pointerEvents:"none"}}/>
        {/* Blue ruled lines */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0,
          backgroundImage:"repeating-linear-gradient(transparent,transparent 47px,#E8E8E8 47px,#E8E8E8 48px)",
          backgroundSize:"100% 48px",backgroundPosition:"0 24px"
        }}/>
        {/* Ghost number */}
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",zIndex:0}}>
          <span style={{fontFamily:"'Poppins',sans-serif",fontSize:writeNum>9?180:240,fontWeight:800,color:"rgba(0,0,0,.07)",userSelect:"none",lineHeight:1}}>{writeNum}</span>
        </div>
        {/* Canvas */}
        <canvas ref={cRef}
          style={{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:2,cursor:"crosshair"}}
          onMouseDown={drawStart} onMouseMove={drawMove} onMouseUp={drawEnd} onMouseLeave={drawEnd}
          onTouchStart={(e)=>{e.preventDefault();drawStart(e);}} onTouchMove={(e)=>{e.preventDefault();drawMove(e);}} onTouchEnd={drawEnd}
        />
      </div>

      {/* Bottom controls */}
      <div style={{display:"flex",gap:6,padding:"8px 10px",background:"#F8F9FB",borderTop:"1px solid rgba(255,255,255,.06)",flexShrink:0}}>
        <button onClick={clearPad} style={{flex:1,padding:"10px",borderRadius:12,border:"2px solid #E8E8E8",background:"transparent",color:"#1C1C2B",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>🗑️ Clear</button>
        <button onClick={()=>speak(`${NW[writeNum]||writeNum}. ${NUM_STROKES[writeNum]||""}`,{rate:0.5,pitch:1.0})} style={{flex:1,padding:"10px",borderRadius:12,border:"2px solid #E8E8E8",background:"transparent",color:"#1C1C2B",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>🔊 How</button>
        <button onClick={nextWrite} style={{flex:1,padding:"10px",borderRadius:12,border:"none",background:"linear-gradient(135deg,var(--green),var(--cyan))",color:"#000",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"'Poppins',sans-serif"}}>Next ➡️</button>
      </div>
    </div>}{TeacherBubble}<style>{CSS}</style>
  </div>;

    // ═══ REWARDS ═══
  if(scr==="rewards")return<div style={{fontFamily:"'Poppins',sans-serif",height:"100dvh",overflow:"auto",background:"#fff",maxWidth:520,margin:"0 auto",position:"relative",display:"flex",flexDirection:"column"}}><Confetti active={confetti}/><SubHead title="Rewards 🎁" onBack={goHome} points={prof?.points||0}/>{rwdMsg&&<div style={{position:"fixed",top:60,left:16,right:16,padding:14,background:"linear-gradient(135deg,#22C55E,#16A34A)",color:"#1C1C2B",borderRadius:18,fontWeight:800,textAlign:"center",zIndex:999,animation:"slideUp 0.3s ease-out",fontSize:13,maxWidth:490,margin:"0 auto"}}>{rwdMsg}</div>}<div style={{margin:"14px 16px 0",padding:"18px 20px",background:"linear-gradient(135deg,#FBBF24,#F59E0B)",borderRadius:22,display:"flex",alignItems:"center",gap:14,boxShadow:"0 8px 28px #FBBF2444"}}><span style={{fontSize:36,animation:"coinSp 2s ease-in-out infinite"}}>💰</span><div><div style={{color:"#1C1C2B",fontFamily:"'Poppins',sans-serif",fontSize:28,fontWeight:800}}>{prof?.points||0}</div><div style={{color:"rgba(255,255,255,.8)",fontSize:11,fontWeight:700}}>Earn more by practicing!</div></div></div><p style={{padding:"8px 16px",fontSize:11,color:"#93959F",fontWeight:700,textAlign:"center"}}>🎉 Show parents when you earn a reward!</p><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,padding:"0 16px 20px"}}>{REWARDS.map((r,i)=>{const can=(prof?.points||0)>=r.cost;return<button key={r.id} onClick={()=>can&&buyR(r)} disabled={!can} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:16,borderRadius:20,border:`2px solid ${can?"#eee":"#f3f4f6"}`,background:can?"#fff":"#fafafa",cursor:can?"pointer":"default",fontFamily:"'Poppins',sans-serif",opacity:can?1:0.4,animation:`cardIn 0.3s ease ${i*0.05}s both`}}><span style={{fontSize:36}}>{r.emoji}</span><span style={{fontFamily:"'Poppins',sans-serif",fontSize:14,fontWeight:700,marginTop:4}}>{r.name}</span><span style={{fontSize:10,color:"#93959F",fontWeight:600}}>{r.desc}</span><span style={{marginTop:6,padding:"5px 14px",borderRadius:12,color:"#1C1C2B",fontSize:12,fontWeight:800,background:can?"linear-gradient(135deg,#60B246,#4CAF50)":"#D4D5D9",color:"#fff"}}>💰 {r.cost}</span></button>;})}</div>{(prof?.rewards||[]).length>0&&<div style={{padding:"0 16px 20px"}}><h3 style={{fontFamily:"'Poppins',sans-serif",fontSize:16,fontWeight:700,marginBottom:8}}>🏆 Your Rewards</h3>{(prof?.rewards||[]).slice(-6).reverse().map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#F1F3F7",borderRadius:14,border:"1px solid #EFEFEF",marginBottom:6}}><span style={{fontSize:24}}>{r.emoji}</span><span style={{fontWeight:800,fontSize:13,flex:1}}>{r.name}</span><span style={{fontSize:10,color:"rgba(255,255,255,0.35)"}}>{new Date(r.at).toLocaleDateString()}</span></div>)}</div>}{TeacherBubble}<style>{CSS}</style></div>;

  // ═══ SETTINGS ═══
  if(scr==="settings")return<div style={{fontFamily:"'Poppins',sans-serif",height:"100dvh",overflow:"auto",background:"#fff",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column"}}><SubHead title="Settings" onBack={goHome} points={prof?.points||0}/><div style={{padding:18}}><div style={{textAlign:"center",padding:24,background:"#F1F3F7",borderRadius:24,boxShadow:"0 2px 8px rgba(0,0,0,.08)"}}><span style={{fontSize:56,display:"block",animation:"mascotB 3s ease-in-out infinite"}}>{AVATARS[prof?.gender||"boy"][prof?.avatar||0]}</span><h2 style={{fontFamily:"'Poppins',sans-serif",fontSize:24,fontWeight:700,margin:"6px 0 2px"}}>{prof?.name}</h2><p style={{color:"#93959F",fontSize:13,fontWeight:600}}>Age {prof?.age} • {aCfg.diff}</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginTop:14}}>{[{n:prof?.totalEarned||0,l:"Points Earned",c:"#6366F1"},{n:(prof?.completed?.numbers||[]).length,l:"Numbers",c:"#FF6B6B"},{n:(prof?.completed?.phonics||[]).length,l:"Words",c:"#4ECDC4"},{n:(prof?.rewards||[]).length,l:"Rewards",c:"#FBBF24"}].map((s,i)=><div key={i} style={{background:"#F1F3F7",borderRadius:18,padding:16,textAlign:"center",border:"1px solid #EFEFEF"}}><span style={{fontFamily:"'Poppins',sans-serif",fontSize:28,fontWeight:800,color:s.c,display:"block"}}>{s.n}</span><span style={{fontSize:10,fontWeight:700,color:"#93959F"}}>{s.l}</span></div>)}</div><button onClick={()=>{setScr("onboard");setObSt(0);}} style={{width:"100%",padding:14,borderRadius:18,border:"none",background:"#FFF5EB",color:"#FC8019",fontSize:14,fontWeight:800,fontFamily:"'Poppins',sans-serif",cursor:"pointer",marginTop:14}}>🔄 Change Profile</button><button onClick={()=>{save(null);setScr("onboard");setObSt(0);}} style={{width:"100%",padding:14,borderRadius:18,border:"none",background:"#FEE2E2",color:"#DC2626",fontSize:14,fontWeight:800,fontFamily:"'Poppins',sans-serif",cursor:"pointer",marginTop:8}}>🗑️ Reset</button></div>{TeacherBubble}<style>{CSS}</style></div>;

  return<div>{TeacherBubble}<style>{CSS}</style></div>;
}

// ═══════════════════════════════════════════════════════════════
const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800;900&display=swap');
:root{--bg:#FFFFFF;--card:#F8F9FB;--card2:#F1F3F7;--primary:#FC8019;--orange:#FC8019;--green:#60B246;--red:#E23744;--dark:#1C1C2B;--gray:#93959F;--light:#D4D5D9;--blue:#5D8CF4;--purple:#8B5CF6;--pink:#EC4899;}
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
html,body{background:var(--bg)!important;overflow-x:hidden;color:var(--dark);}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:var(--light);border-radius:4px;}::-webkit-scrollbar-track{background:transparent;}
button:active{transform:scale(0.96)!important;}
/* Animations */
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes fadeIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}} @keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes splashPop{from{opacity:0;transform:scale(.5)}to{opacity:1;transform:scale(1)}}
@keyframes mascotB{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes floatP{0%,100%{transform:translateY(0) translateX(0)}25%{transform:translateY(calc(-1*var(--dr,15px))) translateX(10px)}75%{transform:translateY(5px) translateX(-10px)}}
@keyframes confFall{0%{opacity:1;transform:translateY(0) rotate(0) scale(1)}100%{opacity:0;transform:translateY(350px) rotate(720deg) scale(.2)}}
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
@keyframes gridPop{0%{transform:scale(0) rotate(-5deg);opacity:0}60%{transform:scale(1.05) rotate(1deg);opacity:1}100%{transform:scale(1) rotate(0);opacity:1}}
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
