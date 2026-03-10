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
      <div style={{position:"absolute",top:8,right:12,fontFamily:"'Fredoka One',cursive",fontSize:48,fontWeight:800,color:"rgba(255,255,255,0.15)",lineHeight:1,zIndex:1}}>{num}</div>
      
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
          <p style={{color:"#fff",fontFamily:"'Nunito',sans-serif",fontSize:14,fontWeight:700,textAlign:"center",textShadow:"0 1px 4px rgba(0,0,0,0.5)",lineHeight:1.3}}>
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
  ]},
  food:{emoji:"🍎",color:"#4ECDC4",words:[
    {word:"jam",ph:["j","a","m"],img:"🍯",sentence:"I love jam on toast!"},
    {word:"egg",ph:["e","g","g"],img:"🥚",sentence:"I eat an egg for breakfast!"},
    {word:"nut",ph:["n","u","t"],img:"🥜",sentence:"A nut grows on a tree!"},
    {word:"pea",ph:["p","ea"],img:"🫛",sentence:"The pea is small and green!"},
    {word:"ham",ph:["h","a","m"],img:"🍖",sentence:"Ham goes in a sandwich!"},
    {word:"bun",ph:["b","u","n"],img:"🍞",sentence:"The bun is soft and warm!"},
    {word:"pie",ph:["p","igh"],img:"🥧",sentence:"Mom baked a yummy pie!"},
    {word:"yam",ph:["y","a","m"],img:"🍠",sentence:"A yam is like a potato!"},
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
  ]},
  things:{emoji:"🎒",color:"#FF8C42",words:[
    {word:"hat",ph:["h","a","t"],img:"🎩",sentence:"I wear my hat outside!"},
    {word:"cup",ph:["c","u","p"],img:"☕",sentence:"My cup is full of milk!"},
    {word:"bed",ph:["b","e","d"],img:"🛏️",sentence:"I sleep in my cozy bed!"},
    {word:"box",ph:["b","o","x"],img:"📦",sentence:"What is in the box?"},
    {word:"map",ph:["m","a","p"],img:"🗺️",sentence:"The map shows the way!"},
    {word:"pen",ph:["p","e","n"],img:"🖊️",sentence:"I write with my pen!"},
    {word:"bus",ph:["b","u","s"],img:"🚌",sentence:"The bus takes me to school!"},
    {word:"van",ph:["v","a","n"],img:"🚐",sentence:"The van drives fast!"},
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
];

// Fun facts for numbers 1-20 (used in Basics)
const NUM_FUN={1:"1 egg in an egg cup!",2:"2 eyes to see!",3:"3 little kittens!",4:"4 legs on a dog!",5:"5 fingers on a hand!",6:"6 legs on a bug!",7:"7 colors in a rainbow!",8:"8 legs on an octopus!",9:"9 planets long ago!",10:"10 toes on your feet!",11:"11 players in football!",12:"12 months in a year!",13:"13 is a baker\'s dozen!",14:"14 days in two weeks!",15:"15 minutes is a quarter hour!",16:"16 ounces in a pound!",17:"17 is a prime number!",18:"18 holes on a golf course!",19:"19 is almost twenty!",20:"20 fingers and toes!"};
const NUM_EMOJI={1:"🥚",2:"👀",3:"🐱",4:"🐕",5:"🖐️",6:"🐛",7:"🌈",8:"🐙",9:"🪐",10:"🦶",11:"⚽",12:"📅",13:"🍩",14:"📆",15:"⏰",16:"⚖️",17:"🔢",18:"⛳",19:"🔟",20:"👣"};

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
  useEffect(()=>{const l=()=>{const x=speechSynthesis.getVoices();if(x.length)setV(x);};l();speechSynthesis.onvoiceschanged=l;return()=>{speechSynthesis.onvoiceschanged=null;};},[]);
  const getV=useCallback(()=>{
    const prefs=["Google US English","Samantha","Karen","Moira","Tessa","Victoria","Google UK English Female","Microsoft Zira","Microsoft Jenny"];
    for(const n of prefs){const x=v.find(y=>y.name.includes(n));if(x)return x;}
    return v.find(x=>x.lang.startsWith("en"))||v[0];
  },[v]);
  const speak=useCallback((t,o={})=>new Promise(r=>{
    const u=new SpeechSynthesisUtterance(t);const x=getV();if(x)u.voice=x;
    u.rate=o.rate||0.9;u.pitch=o.pitch||1;u.lang="en-US";u.volume=1;
    u.onend=()=>r();u.onerror=()=>r();
    if(!o.noCancel) speechSynthesis.cancel();
    setTimeout(()=>speechSynthesis.speak(u),o.noCancel?20:60);
  }),[getV]);
  return{speak,stop:useCallback(()=>speechSynthesis.cancel(),[])};
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

    const doStart=()=>{
      const r=new SR();
      r.continuous=false;
      r.interimResults=true;
      r.lang="en-US";
      r.maxAlternatives=3;
      recRef.current=r;

      r.onresult=(e)=>{
        let f="",interim="";
        for(let x=0;x<e.results.length;x++){
          if(e.results[x].isFinal)f+=e.results[x][0].transcript;
          else interim+=e.results[x][0].transcript;
        }
        const t=(f||interim).toLowerCase().trim();
        setTxt(t);
        if(f && t){
          gotResultRef.current=true;
          clearTimeout(timeoutRef.current);
          try{r.stop();}catch(e){}
          setOn(false);
          cbRef.current?.(t);
        }
      };
      r.onerror=(e)=>{
        if(e.error==="not-allowed"){
          setErr("Mic blocked. Allow microphone in browser settings.");
          setOn(false);
          return;
        }
        // Auto-retry on no-speech or other recoverable errors
        if(!gotResultRef.current && retryCountRef.current<3){
          retryCountRef.current++;
          setTxt(`Listening... (retry ${retryCountRef.current})`);
          setTimeout(doStart,300);
        } else {
          setErr("Couldn't hear you. Tap mic to try again.");
          setOn(false);
        }
      };
      r.onend=()=>{
        // If no result yet, auto-restart mic
        if(!gotResultRef.current && retryCountRef.current<3){
          retryCountRef.current++;
          setTxt(`Listening... (retry ${retryCountRef.current})`);
          setTimeout(doStart,300);
        } else if(!gotResultRef.current){
          setErr("Didn't catch that. Tap mic to try again.");
          setOn(false);
        }
      };

      try{r.start();}catch(e){
        if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){
          navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
            stream.getTracks().forEach(t=>t.stop());
            permRef.current=true;
            try{r.start();}catch(e2){setErr("Could not start mic.");setOn(false);}
          }).catch(()=>{setErr("Mic access denied.");setOn(false);});
        } else {
          setErr("Could not start mic.");setOn(false);
        }
      }

      // 15 second total timeout (longer because of retries)
      clearTimeout(timeoutRef.current);
      timeoutRef.current=setTimeout(()=>{
        if(!gotResultRef.current){
          retryCountRef.current=99; // prevent more retries
          try{r.stop();}catch(e){}
          setOn(false);
          setErr("Timed out. Tap mic to try again.");
        }
      },15000);
    };

    setTimeout(doStart,250);
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
const Particles=({count=10,emojis=["⭐","✨","🌟","💫"]})=>{const items=useRef(Array.from({length:count},(_,i)=>({id:i,emoji:emojis[i%emojis.length],x:Math.random()*100,y:Math.random()*100,sz:12+Math.random()*14,dur:8+Math.random()*12,dl:-Math.random()*10,dr:20+Math.random()*40}))).current;return<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>{items.map(p=><div key={p.id} style={{position:"absolute",left:`${p.x}%`,top:`${p.y}%`,fontSize:p.sz,opacity:0.25,animation:`floatP ${p.dur}s ease-in-out ${p.dl}s infinite`,"--dr":`${p.dr}px`}}>{p.emoji}</div>)}</div>;};
const Confetti=({active})=>{if(!active)return null;return<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:999}}>{Array.from({length:40},(_,i)=><div key={i} style={{position:"absolute",left:`${10+Math.random()*80}%`,top:"-5%",width:6+Math.random()*8,height:4+Math.random()*5,background:["#FF6B6B","#4ECDC4","#FFE66D","#A855F7","#F472B6","#34D399","#60A5FA","#FBBF24"][i%8],borderRadius:2,animation:`confFall ${1+Math.random()*1.5}s ease-in ${Math.random()*0.5}s forwards`}}/>)}</div>;};
const Stars=({count,size=26})=><div style={{display:"flex",gap:4,justifyContent:"center",margin:"8px 0"}}>{[1,2,3,4,5].map(i=><span key={i} style={{fontSize:size,opacity:i<=count?1:0.2,filter:i<=count?"drop-shadow(0 2px 8px rgba(251,191,36,0.5))":"none",animation:i<=count?`starPop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i*0.12}s both`:"none"}}>{i<=count?"⭐":"☆"}</span>)}</div>;
const Mascot=({mood="happy",msg=""})=>{const f={happy:"😊",excited:"🤩",thinking:"🤔",listening:"👂",cheering:"🥳",speaking:"🗣️",sad:"🥺"};return<div style={{display:"flex",alignItems:"flex-end",gap:10,margin:"4px 0"}}><div style={{fontSize:26,animation:"mascotB 2s ease-in-out infinite",flexShrink:0}}>{f[mood]||"😊"}</div>{msg&&<div style={{background:"rgba(255,255,255,0.06)",borderRadius:"18px 18px 18px 4px",padding:"4px 10px",fontSize:11,fontWeight:600,color:"rgba(255,255,255,0.8)",boxShadow:"0 4px 16px rgba(0,0,0,0.3)",animation:"bubPop 0.3s cubic-bezier(0.34,1.56,0.64,1)",maxWidth:260,fontFamily:"'Nunito',sans-serif",lineHeight:1.4}}>{msg}</div>}</div>;};
const SoundWave=()=><div style={{display:"flex",justifyContent:"center",gap:3,marginTop:14}}>{[1,2,3,4,5,6,7].map(i=><div key={i} style={{width:4,background:"#EF4444",borderRadius:4,animation:`sndWave 0.8s ease-in-out ${i*0.08}s infinite`}}/>)}</div>;
const ProgressRing=({pct,size=70,color="#22C55E"})=>{const r=(size-10)/2;const c=2*Math.PI*r;return<svg width={size} height={size} style={{transform:"rotate(-90deg)"}}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={10}/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={10} strokeDasharray={c} strokeDashoffset={c-((pct||0)/100)*c} strokeLinecap="round" style={{transition:"stroke-dashoffset 1s ease-out"}}/></svg>;};
const SubHead=({title,onBack,points})=><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"6px 10px",background:"rgba(0,0,0,.5)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,.06)",position:"sticky",top:0,zIndex:50}}><button onClick={onBack} style={{padding:"8px 16px",borderRadius:14,border:"2px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.06)",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>← Back</button><span style={{fontFamily:"'Fredoka One',cursive",fontSize:17,fontWeight:700,color:"#fff"}}>{title}</span><div style={{display:"flex",alignItems:"center",gap:4,padding:"6px 14px",borderRadius:16,background:"linear-gradient(135deg,#FEF3C7,#FDE68A)",fontSize:13,fontWeight:800,color:"var(--yellow)"}}><span style={{animation:"coinSp 2s ease-in-out infinite"}}>💰</span>{points||0}</div></div>;
const FlowSteps=({current,steps})=><div style={{display:"flex",gap:4,justifyContent:"center",margin:"2px 6px 2px",flexWrap:"wrap"}}>{steps.map((s,i)=>{const done=steps.findIndex(x=>x.id===current)>i;const act=current===s.id;return<div key={s.id} style={{display:"flex",alignItems:"center",gap:3}}><div style={{padding:"3px 8px",borderRadius:8,fontSize:9,fontWeight:800,fontFamily:"'Nunito',sans-serif",background:act?"linear-gradient(135deg,#6366F1,#8B5CF6)":done?"#22C55E":"#e5e7eb",color:(act||done)?"#fff":"#aaa",transition:"all 0.3s",transform:act?"scale(1.08)":"scale(1)"}}>{s.icon} {s.label}</div>{i<steps.length-1&&<span style={{color:"rgba(255,255,255,0.2)",fontSize:10}}>→</span>}</div>;})}</div>;
const ListeningBox=({transcript,onTapMic,isListening,error,onType,expected})=>{
  const[typed,setTyped]=useState("");
  return <div style={{textAlign:"center",padding:12,background:"rgba(255,255,255,0.06)",borderRadius:20,border:"2px solid #6366F111"}}>
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
        <p style={{fontSize:16,fontWeight:900,color:"#fff",margin:"2px 0 0",letterSpacing:1}}>"{expected?.toUpperCase()}"</p>
        {transcript&&<p style={{fontSize:11,fontWeight:700,color:"#22C55E",margin:"2px 0 0"}}>Heard: "{transcript}"</p>}
      </div>
    </div>
    {isListening&&<SoundWave/>}
    <div style={{display:"flex",gap:6,marginTop:8}}>
      <input value={typed} onChange={e=>setTyped(e.target.value)} placeholder="Or type here..."
        style={{flex:1,padding:"7px 10px",borderRadius:10,border:"2px solid rgba(255,255,255,0.1)",fontSize:13,fontWeight:600,fontFamily:"'Nunito',sans-serif",outline:"none",boxSizing:"border-box"}}
        onKeyDown={e=>{if(e.key==="Enter"&&typed.trim())onType(typed.trim().toLowerCase());}}
      />
      <button onClick={()=>{if(typed.trim())onType(typed.trim().toLowerCase());}}
        style={{padding:"7px 14px",borderRadius:10,background:"#6366F1",color:"#fff",border:"none",fontWeight:800,fontSize:12,cursor:"pointer"}}>Go</button>
    </div>
  </div>;
};
const ResultBox=({acc,result,expected,onRetry,onDone,color,kidName,currentPoints})=>{
  const s=getStars(acc);const p=getStarPts(s);const nm=kidName||"Buddy";
  const pass=acc>=50; // 50% = pass for kids
  const nextReward=REWARDS.filter(r=>r.cost>(currentPoints||0)).sort((a,b)=>a.cost-b.cost)[0];
  const ptsNeeded=nextReward?(nextReward.cost-(currentPoints||0)):0;
  return<div style={{padding:10,background:"rgba(255,255,255,0.06)",borderRadius:18,boxShadow:"0 8px 24px rgba(0,0,0,0.06)",animation:"resBounce 0.5s cubic-bezier(0.34,1.56,0.64,1)"}}>
    {/* Stars + Score row */}
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
      <Stars count={s}/>
      <div style={{position:"relative",display:"inline-block"}}>
        <ProgressRing pct={acc} color={pass?"#22C55E":"#F59E0B"}/>
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontFamily:"'Fredoka One',cursive",fontSize:18,fontWeight:800,color:pass?"#22C55E":"#F59E0B"}}>{acc}%</span>
        </div>
      </div>
    </div>
    {/* Mascot message */}
    <Mascot mood={s>=4?"cheering":s>=3?"excited":s>=1?"happy":"sad"}
      msg={s>=4?`WOW ${nm}! SUPERSTAR! 🌟`:s>=3?`Great job ${nm}! 🎉`:s>=1?`Good try ${nm}! 💪`:`Keep trying ${nm}! 💫`}/>
    {/* HEARD vs EXPECTED - clear split box */}
    <div style={{display:"flex",gap:6,margin:"6px 0"}}>
      <div style={{flex:1,padding:"8px 10px",borderRadius:14,background:pass?"#F0FDF4":"#FEF2F2",border:`2px solid ${pass?"#22C55E33":"#EF444433"}`,textAlign:"center"}}>
        <div style={{fontSize:9,fontWeight:800,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:1}}>You said</div>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:16,fontWeight:800,color:pass?"#16A34A":"#DC2626",marginTop:2}}>"{result}"</div>
      </div>
      <div style={{flex:1,padding:"8px 10px",borderRadius:14,background:"rgba(99,102,241,0.15)",border:"2px solid #6366F133",textAlign:"center"}}>
        <div style={{fontSize:9,fontWeight:800,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:1}}>Correct</div>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:16,fontWeight:800,color:"var(--cyan)",marginTop:2}}>"{expected}"</div>
      </div>
    </div>
    {/* Points */}
    {p>0&&<div style={{fontSize:18,fontWeight:900,color:"#22C55E",fontFamily:"'Fredoka One',cursive",textAlign:"center",margin:"4px 0"}}>+{p} points! 💰</div>}
    {/* Reward hint */}
    {nextReward&&ptsNeeded<=50&&<div style={{padding:"6px 10px",background:"rgba(251,191,36,0.15)",borderRadius:12,textAlign:"center",margin:"4px 0"}}>
      <span style={{fontSize:11,fontWeight:800,color:"var(--yellow)"}}>{ptsNeeded} more for {nextReward.emoji} {nextReward.name}!</span>
    </div>}
    {/* Buttons */}
    <div style={{display:"flex",gap:8,marginTop:8}}>
      {!pass&&<button onClick={onRetry} style={{flex:1,padding:10,borderRadius:14,border:"none",background:"linear-gradient(135deg,#F59E0B,#D97706)",color:"#fff",fontSize:13,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer"}}>🔄 Try Again</button>}
      <button onClick={onDone} style={{flex:1,padding:10,borderRadius:14,border:"none",background:`linear-gradient(135deg,${color||"#22C55E"},${color||"#16A34A"})`,color:"#fff",fontSize:13,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer"}}>{pass?"🎉 Next!":"✅ Done"}</button>
    </div>
  </div>;
};

const NUM_STEPS=[{id:"saying_number",icon:"🔊",label:"Number"},{id:"spelling",icon:"🔤",label:"Spelling"},{id:"saying_sentence",icon:"💬",label:"Sentence"},{id:"saying_phonics",icon:"🔡",label:"Phonics"},{id:"countdown",icon:"⏱️",label:"Ready"},{id:"result",icon:"⭐",label:"Stars"}];
const PH_STEPS=[{id:"saying_word",icon:"🔊",label:"Word"},{id:"spelling",icon:"🔤",label:"Spelling"},{id:"saying_sentence",icon:"💬",label:"Sentence"},{id:"saying_phonics",icon:"🔡",label:"Phonics"},{id:"countdown",icon:"⏱️",label:"Ready"},{id:"result",icon:"⭐",label:"Stars"}];

// ═══════════════════════════════════════════════════════════════
// 🎮 MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App(){
  const{data:prof,save,loaded}=useStore();const{speak,stop}=useSpeech();const rec=useRec();
  const[scr,setScr]=useState("splash");
  const[obN,setObN]=useState("");const[obA,setObA]=useState(4);const[obG,setObG]=useState("boy");const[obAv,setObAv]=useState(0);const[obSt,setObSt]=useState(0);
  const[selNum,setSelNum]=useState(null);const[nStep,setNStep]=useState("idle");const[aPhI,setAPhI]=useState(-1);const[spRes,setSpRes]=useState(null);const[spAcc,setSpAcc]=useState(null);
  const[phCat,setPhCat]=useState("animals");const[phW,setPhW]=useState(null);const[phStep,setPhStep]=useState("idle");const[phAI,setPhAI]=useState(-1);const[phRes,setPhRes]=useState(null);const[phAcc,setPhAcc]=useState(null);
  // Shapes + Colors detail
  const[selShape,setSelShape]=useState(null);const[shStep,setShStep]=useState("idle");const[shAI,setShAI]=useState(-1);const[shRes,setShRes]=useState(null);const[shAcc,setShAcc]=useState(null);
  const[selColor,setSelColor]=useState(null);const[coStep,setCoStep]=useState("idle");const[coAI,setCoAI]=useState(-1);const[coRes,setCoRes]=useState(null);const[coAcc,setCoAcc]=useState(null);
  const[confetti,setConfetti]=useState(false);
  // Basics state
  const[basicsTab,setBasicsTab]=useState("explore"); // "explore", "find", "write"
  const[findTarget,setFindTarget]=useState(null);const[findScore,setFindScore]=useState(0);const[findStreak,setFindStreak]=useState(0);const[findFb,setFindFb]=useState(null);
  const[writeNum,setWriteNum]=useState(1);const[drawPts,setDrawPts]=useState(0);const[writeOk,setWriteOk]=useState(false);
  const cRef=useRef(null);const[ptAnim,setPtAnim]=useState(null);const[rwdMsg,setRwdMsg]=useState(null);
  const[speakMode,setSpeakMode]=useState(true); // toggle for speech practice
  const[countdown,setCountdown]=useState(0); // 3,2,1 countdown
  const[activeSpellIdx,setActiveSpellIdx]=useState(-1); // which letter is being spelled
  const[spellStatus,setSpellStatus]=useState([]); // per-letter: 'waiting'|'listening'|'correct'|'skipped'
  const pRef=useRef(false);

  const initDone=useRef(false);
  useEffect(()=>{
    if(!loaded||initDone.current)return;
    initDone.current=true;
    const t=setTimeout(()=>setScr(prof?"home":"onboard"),2500);
    return()=>clearTimeout(t);
  },[loaded]);
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
  const goHome=()=>{stop();pRef.current=false;setScr("home");setSelNum(null);setNStep("idle");setPhW(null);setPhStep("idle");setSelShape(null);setShStep("idle");setSelColor(null);setCoStep("idle");setFindTarget(null);setFindFb(null);setDrawPts(0);setWriteOk(false);};

  // ── Callbacks for mic ──
  const kidName = prof?.name || "Buddy";

  const handleNumResult=(result)=>{
    const w=NW[selNum];
    const normalized=normalizeSpoken(result);
    const acc=calcAcc(w,normalized);setSpRes(normalized);setSpAcc(acc);setNStep("result");
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
      else speak(`No worries ${kidName}. Let's try again.`,{rate:0.8,pitch:1.0});
    },300);
  };
  const handlePhResult=(result)=>{
    const normalized=normalizeSpoken(result);
    const acc=calcAcc(phW.word,normalized);setPhRes(normalized);setPhAcc(acc);setPhStep("result");
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
    speak(tappedLetter,{rate:0.6,pitch:1.0,noCancel:true});
    
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
      
      await speak(LN[letters[i]]||letters[i],{rate:0.5,pitch:1.0,noCancel:true});
      await wait(2000);
      
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
    setNStep("spelling");
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
      for(let i=0;i<phs.length;i++){if(!pRef.current)return;setAPhI(i);await speak(gPh(phs[i]).s,{rate:0.45,pitch:1.0,noCancel:true});await wait(500);}
      setAPhI(-1);await wait(400);if(!pRef.current)return;
      await speak(`And the word is, ${w}.`,{rate:0.7,pitch:1.0});await wait(400);if(!pRef.current)return;
    }

    // Step 5: Speaking practice (if enabled)
    if(speakMode){
      await speak(`${kidName}, your turn. Say, ${w}.`,{rate:0.75,pitch:1.0});await wait(500);if(!pRef.current)return;
      stop();await wait(300);setNStep("listening");pRef.current=false;rec.start(handleNumResult);
    }else{
      pRef.current=false;
      if(!isDone("numbers",num)) awardPoints(5,"numbers",num);
      await speak(`Well done ${kidName}.`,{rate:0.8,pitch:1.0});
      setNStep("idle");
    }
  };
  const retryNum=async()=>{
    setSpRes(null);setSpAcc(null);
    setNStep("countdown");
    await speak(`Try again.`,{rate:0.75,pitch:1.0});await wait(300);
    stop();await wait(300);setNStep("listening");rec.start(handleNumResult);
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
    setPhStep("spelling");
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
    for(let i=0;i<wd.ph.length;i++){if(!pRef.current)return;setPhAI(i);await speak(gPh(wd.ph[i]).s,{rate:0.45,pitch:1.0,noCancel:true});await wait(500);}
    setPhAI(-1);await wait(400);if(!pRef.current)return;
    await speak(`And the word is, ${wd.word}.`,{rate:0.7,pitch:1.0});await wait(400);if(!pRef.current)return;

    // Step 5: Speaking (if enabled)
    if(speakMode){
      await speak(`${kidName}, your turn. Say, ${wd.word}.`,{rate:0.75,pitch:1.0});await wait(500);if(!pRef.current)return;
      stop();await wait(300);setPhStep("listening");pRef.current=false;rec.start(handlePhResult);
    }else{
      pRef.current=false;
      if(!isDone("phonics",wd.word)) awardPoints(5,"phonics",wd.word);
      await speak(`Well done ${kidName}.`,{rate:0.8,pitch:1.0});
      setPhStep("idle");
    }
  };
  const retryPh=async()=>{
    setPhRes(null);setPhAcc(null);
    setPhStep("countdown");
    await speak(`Try again.`,{rate:0.75,pitch:1.0});await wait(300);
    stop();await wait(300);setPhStep("listening");rec.start(handlePhResult);
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
    setShStep("spelling");
    await spellWord(sh.name);await wait(400);if(!pRef.current)return;
    await speak(`Well done. That spells, ${sh.name}.`,{rate:0.75,pitch:1.0});await wait(500);if(!pRef.current)return;
    setShStep("saying_sentence");
    await speak(sh.sentence,{rate:0.75,pitch:1.0});await wait(600);if(!pRef.current)return;
    if(sh.ph){
      setShStep("saying_phonics");
      await speak("Now, let's understand how to speak this word.",{rate:0.75,pitch:1.0});await wait(400);if(!pRef.current)return;
      for(let i=0;i<sh.ph.length;i++){if(!pRef.current)return;setShAI(i);await speak(gPh(sh.ph[i]).s,{rate:0.45,pitch:1.0,noCancel:true});await wait(500);}
      setShAI(-1);await wait(400);if(!pRef.current)return;
      await speak(`And the word is, ${sh.name}.`,{rate:0.7,pitch:1.0});await wait(400);if(!pRef.current)return;
    }
    if(speakMode){
      await speak(`${kidName}, your turn. Say, ${sh.name}.`,{rate:0.75,pitch:1.0});await wait(500);if(!pRef.current)return;
      stop();await wait(300);setShStep("listening");pRef.current=false;rec.start(handleShResult);
    }else{pRef.current=false;if(!isDone("shapes",sh.name))awardPoints(5,"shapes",sh.name);await speak(`Well done ${kidName}.`,{rate:0.8,pitch:1.0});setShStep("idle");}
  };
  const retryShape=async()=>{setShRes(null);setShAcc(null);await speak(`Try again.`,{rate:0.75,pitch:1.0});await wait(300);stop();await wait(300);setShStep("listening");rec.start(handleShResult);};

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
    setCoStep("spelling");
    await spellWord(co.name);await wait(400);if(!pRef.current)return;
    await speak(`Well done. That spells, ${co.name}.`,{rate:0.75,pitch:1.0});await wait(500);if(!pRef.current)return;
    setCoStep("saying_sentence");
    await speak(co.sentence,{rate:0.75,pitch:1.0});await wait(600);if(!pRef.current)return;
    if(co.ph){
      setCoStep("saying_phonics");
      await speak("Now, let's understand how to speak this word.",{rate:0.75,pitch:1.0});await wait(400);if(!pRef.current)return;
      for(let i=0;i<co.ph.length;i++){if(!pRef.current)return;setCoAI(i);await speak(gPh(co.ph[i]).s,{rate:0.45,pitch:1.0,noCancel:true});await wait(500);}
      setCoAI(-1);await wait(400);if(!pRef.current)return;
      await speak(`And the word is, ${co.name}.`,{rate:0.7,pitch:1.0});await wait(400);if(!pRef.current)return;
    }
    if(speakMode){
      await speak(`${kidName}, your turn. Say, ${co.name}.`,{rate:0.75,pitch:1.0});await wait(500);if(!pRef.current)return;
      stop();await wait(300);setCoStep("listening");pRef.current=false;rec.start(handleCoResult);
    }else{pRef.current=false;if(!isDone("colors",co.name))awardPoints(5,"colors",co.name);await speak(`Well done ${kidName}.`,{rate:0.8,pitch:1.0});setCoStep("idle");}
  };
  const retryColor=async()=>{setCoRes(null);setCoAcc(null);await speak(`Try again.`,{rate:0.75,pitch:1.0});await wait(300);stop();await wait(300);setCoStep("listening");rec.start(handleCoResult);};


  // ═══ BASICS FUNCTIONS ═══
  const newFindTarget=()=>{
    const max=aCfg?.max||20;
    const n=Math.floor(Math.random()*max)+1;
    setFindTarget(n);setFindFb(null);
    speak(`Find, number, ${NW[n]||n}.`,{rate:0.55,pitch:1.0});
  };
  const onFindTap=(n)=>{
    if(!findTarget)return;
    speak(NW[n]||String(n),{rate:0.55,pitch:1.0,noCancel:true});
    if(n===findTarget){
      setFindFb({ok:true,n});setFindScore(s=>s+1);setFindStreak(s=>s+1);
      const fact=NUM_FUN[n]||"";
      setTimeout(()=>speak(`Correct! ${fact}`,{rate:0.6,pitch:1.0}),600);
      if(!isDone("basics",n)) awardPoints(3,"basics",n);
      if((findStreak+1)%5===0) boom();
      setTimeout(newFindTarget,3000);
    } else {
      setFindFb({ok:false,n});setFindStreak(0);
      setTimeout(()=>setFindFb(null),800);
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
    ctx.lineWidth=5;ctx.lineCap="round";ctx.lineJoin="round";ctx.strokeStyle="var(--cyan)";
  };
  const getPos=(e)=>{
    const c=cRef.current;if(!c)return{x:0,y:0};
    const rect=c.getBoundingClientRect();
    const touch=e.touches?e.touches[0]:e;
    return{x:touch.clientX-rect.left,y:touch.clientY-rect.top};
  };
  const drawStart=(e)=>{
    const c=cRef.current;if(!c)return;
    const ctx=c.getContext("2d");
    const{x,y}=getPos(e);
    ctx.beginPath();ctx.moveTo(x,y);
    ctx.strokeStyle="#33EEFF";ctx.lineWidth=5;ctx.lineCap="round";ctx.lineJoin="round";
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
  const drawEnd=()=>{
    if(!cRef.current)return;
    cRef.current._drawing=false;
    if(drawPts>20&&!writeOk){
      setWriteOk(true);
      speak(`Good job writing ${NW[writeNum]||writeNum}! ${NUM_FUN[writeNum]||""}`,{rate:0.8,pitch:1.0});
      if(!isDone("basics_w",writeNum)) awardPoints(3,"basics_w",writeNum);
    }
  };
  const clearPad=()=>{
    const c=cRef.current;if(!c)return;
    initCanvas(); // Re-init instead of just clearing
    setDrawPts(0);setWriteOk(false);
  };
  const nextWrite=()=>{
    setWriteNum(n=>n>=100?1:n+1);
    setDrawPts(0);setWriteOk(false);
    setTimeout(()=>{initCanvas();},100);
    speak(`Write ${NW[writeNum>=100?1:writeNum+1]||writeNum+1}.`,{rate:0.75,pitch:1.0});
  };

    const buyR=(r)=>{if((prof?.points||0)<r.cost)return;save({...prof,points:prof.points-r.cost,rewards:[...(prof.rewards||[]),{...r,at:Date.now()}]});boom();setRwdMsg(`${r.emoji} Yay! You earned ${r.name}! Show your parents!`);setTimeout(()=>setRwdMsg(null),4000);};

  // ═══ SCREENS ═══

  if(scr==="splash")return<div style={{background:"var(--bg)",position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}><Particles count={20} emojis={["⭐","✨","🌟","💫"]}/><div style={{textAlign:"center",zIndex:2,animation:"splashPop 0.8s cubic-bezier(0.34,1.56,0.64,1)"}}><div style={{fontSize:90,animation:"mascotB 2s ease-in-out infinite"}}>🧒</div><h1 style={{fontFamily:"'Fredoka One',cursive",fontSize:48,color:"var(--yellow)",fontWeight:800}}>Little Genius</h1><p style={{color:"#ffffff88",fontSize:14,fontWeight:600,fontFamily:"'Nunito',sans-serif",letterSpacing:3,textTransform:"uppercase"}}>Learn • Play • Grow</p><div style={{display:"flex",gap:12,justifyContent:"center",marginTop:36}}>{[0,1,2].map(i=><div key={i} style={{width:12,height:12,borderRadius:"50%",background:"#FFE66D",animation:`dotB 1.2s ease-in-out ${i*0.15}s infinite`}}/>)}</div></div><style>{CSS}</style></div>;

  if(scr==="onboard")return<div style={{minHeight:"100vh",background:"var(--bg)",display:"flex",alignItems:"center",justifyContent:"center",padding:16,position:"relative",overflow:"hidden"}}><Particles count={8} emojis={["🌸","🦋","⭐","🌈"]}/><div style={{background:"rgba(0,0,0,.5)",backdropFilter:"blur(20px)",borderRadius:32,padding:"28px 24px",maxWidth:400,width:"100%",boxShadow:"0 24px 80px rgba(99,102,241,0.12)",zIndex:2,animation:"slideUp 0.5s ease-out"}}>
    {obSt===0?<><div style={{textAlign:"center",fontSize:56,animation:"mascotB 2s ease-in-out infinite"}}>👋</div><h2 style={{fontFamily:"'Fredoka One',cursive",fontSize:26,textAlign:"center",color:"#fff",margin:"8px 0"}}>Hello!</h2><label style={{fontSize:11,fontWeight:800,color:"#6366F1",textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:6,fontFamily:"'Nunito',sans-serif"}}>Your Name</label><input value={obN} onChange={e=>setObN(e.target.value)} placeholder="Type name..." style={{width:"100%",padding:"6px 10px",border:"3px solid rgba(255,255,255,0.1)",borderRadius:16,fontSize:16,fontWeight:700,fontFamily:"'Nunito',sans-serif",outline:"none",boxSizing:"border-box",background:"rgba(255,255,255,0.04)"}}/><label style={{fontSize:11,fontWeight:800,color:"#6366F1",textTransform:"uppercase",letterSpacing:1,display:"block",margin:"16px 0 6px",fontFamily:"'Nunito',sans-serif"}}>Age</label><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{[3,4,5,6,7,8].map(a=><button key={a} onClick={()=>setObA(a)} style={{padding:"10px 18px",borderRadius:14,border:"3px solid",borderColor:obA===a?"#6366F1":"#e5e7eb",background:obA===a?"linear-gradient(135deg,#6366F1,#8B5CF6)":"#fff",color:obA===a?"#fff":"#333",fontSize:18,fontWeight:800,fontFamily:"'Fredoka One',cursive",cursor:"pointer",transition:"all 0.3s",transform:obA===a?"scale(1.1)":"scale(1)"}}>{a}</button>)}</div><button onClick={()=>setObSt(1)} style={{width:"100%",padding:14,borderRadius:18,border:"none",background:"linear-gradient(135deg,#6366F1,#8B5CF6)",color:"#fff",fontSize:16,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",marginTop:20}}>Next →</button></>:
    <><h2 style={{fontFamily:"'Fredoka One',cursive",fontSize:24,textAlign:"center",color:"#fff"}}>Pick your look! ✨</h2><div style={{display:"flex",gap:12,justifyContent:"center",margin:"14px 0"}}>{[{g:"boy",e:"👦",c:"#6366F1"},{g:"girl",e:"👧",c:"#EC4899"}].map(x=><button key={x.g} onClick={()=>setObG(x.g)} style={{flex:1,padding:18,borderRadius:20,border:"3px solid",borderColor:obG===x.g?x.c:"#e5e7eb",background:obG===x.g?"#EEF2FF":"#fff",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,transition:"all 0.3s"}}><span style={{fontSize:40}}>{x.e}</span><span style={{fontWeight:800,fontSize:13,fontFamily:"'Nunito',sans-serif"}}>{x.g.charAt(0).toUpperCase()+x.g.slice(1)}</span></button>)}</div><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>{AVATARS[obG].map((av,i)=><button key={i} onClick={()=>setObAv(i)} style={{padding:12,borderRadius:16,border:"3px solid",borderColor:obAv===i?"#6366F1":"#e5e7eb",background:"rgba(255,255,255,0.06)",fontSize:30,cursor:"pointer",transition:"all 0.3s",transform:obAv===i?"scale(1.15)":"scale(1)",display:"flex",alignItems:"center",justifyContent:"center"}}>{av}</button>)}</div><div style={{display:"flex",gap:10,marginTop:18}}><button onClick={()=>setObSt(0)} style={{flex:1,padding:12,borderRadius:16,border:"3px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.06)",fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer"}}>← Back</button><button onClick={()=>{rec.warmUp();save({name:obN||"Buddy",age:obA,gender:obG,avatar:obAv,points:0,totalEarned:0,completed:{},rewards:[],at:Date.now()});setScr("home");}} style={{flex:2,padding:12,borderRadius:16,border:"none",background:"linear-gradient(135deg,#6366F1,#8B5CF6)",color:"#fff",fontSize:16,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer"}}>Let's Go! 🚀</button></div></>}
  </div><style>{CSS}</style></div>;

  if(scr==="home")return<div style={{fontFamily:"'Nunito',sans-serif",height:"100dvh",overflow:"auto",background:"var(--bg)",maxWidth:520,margin:"0 auto",position:"relative",overflow:"hidden"}}><Particles/><Confetti active={confetti}/>{ptAnim&&<div style={{position:"fixed",top:20,right:20,zIndex:999,animation:"ptFly 1.5s ease-out forwards",fontFamily:"'Fredoka One',cursive",fontSize:28,fontWeight:800,color:"#22C55E"}}>{ptAnim}</div>}<div style={{background:"linear-gradient(135deg,var(--card),var(--card2))",padding:"20px 20px 44px",borderRadius:"0 0 36px 36px",position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:-30,right:-30,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.08)"}}/><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:2}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{fontSize:36,animation:"mascotB 3s ease-in-out infinite"}}>{AVATARS[prof?.gender||"boy"][prof?.avatar||0]}</div><div><div style={{color:"#fff",fontWeight:800,fontSize:16}}>{prof?.name||"Buddy"}</div><div style={{color:"#ffffffaa",fontSize:11,fontWeight:600}}>Age {prof?.age||4} • {aCfg.diff}</div></div></div><div style={{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.15)",padding:"8px 16px",borderRadius:24}}><span style={{fontSize:18,animation:"coinSp 2s ease-in-out infinite"}}>💰</span><span style={{color:"var(--yellow)",fontWeight:900,fontSize:18,fontFamily:"'Fredoka One',cursive"}}>{prof?.points||0}</span></div></div><h2 style={{fontFamily:"'Fredoka One',cursive",color:"var(--yellow)",fontSize:22,marginTop:14,position:"relative",zIndex:2}}>What shall we learn? 🎯</h2></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,padding:"14px 12px 10px",marginTop:-22,position:"relative",zIndex:3}}>{[{id:"numbers",icon:"🔢",title:"Numbers",sub:`1-${aCfg.max}`,grad:"linear-gradient(135deg,#FF6B6B,#ee5a24)"},{id:"phonics",icon:"🔤",title:"Phonics",sub:"Words",grad:"linear-gradient(135deg,#4ECDC4,#0abde3)"},{id:"basics",icon:"🧩",title:"Basics",sub:"Find & Write",grad:"linear-gradient(135deg,#F59E0B,#D97706)"},{id:"shapes",icon:"🔷",title:"Shapes",sub:"Shapes",grad:"linear-gradient(135deg,#A855F7,#7c3aed)"},{id:"colors",icon:"🎨",title:"Colors",sub:"Rainbow",grad:"linear-gradient(135deg,#F472B6,#ec4899)"},{id:"rewards",icon:"🎁",title:"Rewards",sub:"Spend!",grad:"linear-gradient(135deg,#FBBF24,#f59e0b)"},{id:"settings",icon:"⚙️",title:"Settings",sub:"Profile",grad:"linear-gradient(135deg,#94A3B8,#64748b)"}].map((m,i)=><button key={m.id} onClick={()=>{rec.warmUp();setScr(m.id);}} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"18px 8px 14px",borderRadius:20,border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",background:m.grad,animation:`gridPop 0.6s cubic-bezier(0.34,1.56,0.64,1) ${i*0.08}s both, cardBounce ${3+i*0.3}s ease-in-out ${0.7+i*0.08}s infinite`,position:"relative",overflow:"hidden"}}><span style={{fontSize:36,marginBottom:4,animation:`iconF 3s ease-in-out ${i*0.3}s infinite`}}>{m.icon}</span><span style={{color:"#fff",fontWeight:800,fontSize:14,fontFamily:"'Fredoka One',cursive"}}>{m.title}</span><span style={{color:"rgba(255,255,255,0.85)",fontSize:10,fontWeight:600}}>{m.sub}</span>{(m.id==="numbers"||m.id==="phonics"||m.id==="shapes"||m.id==="colors")&&<div style={{width:"80%",height:4,background:"rgba(255,255,255,0.25)",borderRadius:6,marginTop:6,overflow:"hidden"}}><div style={{height:"100%",background:"rgba(255,255,255,0.06)",borderRadius:6,width:`${getProgress(m.id)}%`,transition:"width 0.8s"}}/></div>}</button>)}</div>
    <div style={{margin:"6px 16px 16px",padding:"14px 16px",background:"rgba(251,191,36,0.1)",borderRadius:18,border:"2px solid rgba(255,224,51,0.15)",display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:26,animation:"tipW 2s ease-in-out infinite"}}>💡</span><p style={{fontSize:12,color:"var(--yellow)",fontWeight:700,flex:1}}>⭐⭐⭐⭐⭐ = 20 points per word!</p></div><style>{CSS}</style></div>;

  // ═══ NUMBER DETAIL with ANIMATED SCENE ═══
  if(scr==="numbers"&&selNum){const w=NW[selNum];const scene=getScene(selNum);const color=nClr(selNum);const phs=NPH[selNum];return<div style={{fontFamily:"'Nunito',sans-serif",height:"100dvh",overflow:"auto",background:"var(--bg)",maxWidth:520,margin:"0 auto",position:"relative"}}><Confetti active={confetti}/>{ptAnim&&<div style={{position:"fixed",top:20,right:20,zIndex:999,animation:"ptFly 1.5s ease-out forwards",fontFamily:"'Fredoka One',cursive",fontSize:28,fontWeight:800,color:"#22C55E"}}>{ptAnim}</div>}<SubHead title={`Number ${selNum}`} onBack={()=>{stop();pRef.current=false;setSelNum(null);setNStep("idle");}} points={prof?.points||0}/>
    {nStep!=="idle"&&<FlowSteps current={nStep} steps={NUM_STEPS}/>}
    <div style={{padding:"6px 10px"}}>
      {/* 🎬 ANIMATED SCENE */}
      <AnimatedScene num={selNum} active={nStep==="saying_sentence"}/>
      
      {/* Number + Word below scene */}
      <div style={{textAlign:"center",marginTop:4}}>
        <span style={{fontFamily:"'Fredoka One',cursive",fontSize:36,fontWeight:800,color,lineHeight:1,animation:nStep==="saying_number"?"numPulse 0.8s ease-in-out infinite":"none"}}>{selNum}</span>
        <div style={{fontFamily:"'Fredoka One',cursive",fontSize:16,color:"#6366F1",fontWeight:600,textTransform:"capitalize"}}>{w}</div>
      </div>

      {/* Phonemes */}
      {phs&&(nStep==="saying_phonics"||nStep==="idle")&&<div style={{marginTop:6,background:"rgba(255,255,255,0.06)",borderRadius:14,padding:8,animation:"slideUp 0.4s ease-out"}}><div style={{fontSize:11,fontWeight:800,color:"#6366F1",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🔊 Phonics</div><div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>{phs.map((ph,i)=>{const d=gPh(ph);const act=aPhI===i;return<button key={i} onClick={()=>{if(!pRef.current)speak(d.s,{rate:0.55,pitch:1.1});}} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"6px 10px 5px",borderRadius:12,border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",minWidth:44,background:act?color:"#f3f4f6",color:act?"#fff":"#333",transform:act?"scale(1.3) translateY(-4px)":"scale(1)",boxShadow:act?`0 8px 24px ${color}55`:"0 2px 8px rgba(0,0,0,0.04)",transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}><span style={{fontSize:16,fontWeight:900,fontFamily:"'Fredoka One',cursive"}}>{ph.toUpperCase()}</span><span style={{fontSize:9,fontWeight:700,color:act?"#fffc":"#999",marginTop:2}}>{d.d}</span></button>;})}</div></div>}

      {/* Play controls */}
      <div style={{marginTop:12}}>
        {nStep==="idle"&&<>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:8}}>
            {/* Speech Toggle */}
            <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"rgba(255,255,255,0.06)",borderRadius:14,flex:1}}>
              <span style={{fontSize:12,fontWeight:700,color:speakMode?"#22C55E":"#999"}}>🎤</span>
              <button onClick={()=>setSpeakMode(!speakMode)} style={{width:40,height:22,borderRadius:11,border:"none",cursor:"pointer",background:speakMode?"#22C55E":"#ddd",position:"relative",transition:"background 0.3s"}}>
                <div style={{width:18,height:18,borderRadius:9,background:"rgba(255,255,255,0.06)",position:"absolute",top:2,left:speakMode?20:2,transition:"left 0.3s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/>
              </button>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:600}}>{speakMode?"Speak ON":"Speak OFF"}</span>
            </div>
            <button onClick={()=>playNum(selNum)} style={{padding:"10px 20px",borderRadius:14,border:"none",color:"#fff",fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",background:`linear-gradient(135deg,${color},${color}dd)`,display:"flex",alignItems:"center",gap:6}}>🔄 Replay</button>
          </div>
        </>}
        {nStep==="saying_number"&&<Mascot mood="speaking" msg={`Listen! "${w.toUpperCase()}" 🔊`}/>}
        {/* SPELLING */}
        {nStep==="spelling"&&(
          <div style={{animation:"slideUp 0.3s ease-out"}}>
            <Mascot mood="thinking" msg={spellRound===1?"Watch and listen! 🔤":spellRound===2?"Tap the letters in order! 👆":"🔤"}/>
            <div style={{padding:10,background:"rgba(255,255,255,0.06)",borderRadius:16}}>
              {/* Letter slots (top row) */}
              <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:spellRound===2?16:0}}>
                {w.replace(/\s/g,'').toUpperCase().split('').map((letter,i)=>{
                  const st=spellStatus[i]||'waiting';
                  const isActive=activeSpellIdx===i;
                  const isTapTarget=spellRound===2 && i===tapIndex;
                  return <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                    <span style={{
                      fontSize:24,fontFamily:"'Fredoka One',cursive",fontWeight:800,
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
                          fontSize:28,fontFamily:"'Fredoka One',cursive",fontWeight:800,
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
              {spellRound===1&&<div style={{textAlign:"center",marginTop:12,padding:"8px 14px",background:"rgba(99,102,241,0.15)",borderRadius:12}}>
                <p style={{fontSize:13,fontWeight:700,color:"var(--cyan)"}}>👀 Watch and listen!</p>
              </div>}
            </div>
          </div>
        )}
        {nStep==="saying_sentence"&&<Mascot mood="excited" msg="Listen to this sentence! 🎬"/>}
        {nStep==="saying_phonics"&&<Mascot mood="thinking" msg="Let's understand how to speak this word... 🔡"/>}
        {/* COUNTDOWN */}
        {nStep==="countdown"&&(
          <div style={{textAlign:"center",padding:24,background:"rgba(255,255,255,0.06)",borderRadius:24,animation:"slideUp 0.3s ease-out"}}>
            <Mascot mood="listening" msg={`Say "${w.toUpperCase()}" when I say Start!`}/>
            <div style={{fontSize:48,fontFamily:"'Fredoka One',cursive",fontWeight:800,color:countdown>0?color:"#22C55E",animation:"numPulse 0.5s ease-in-out infinite",marginTop:8}}>
              {countdown>0?countdown:"🎤 Start!"}
            </div>
          </div>
        )}
        {nStep==="listening"&&<ListeningBox transcript={rec.txt} onTapMic={tapMicNum} isListening={rec.on} error={rec.err} onType={typeNum} expected={NW[selNum]}/>}
        {nStep==="result"&&spRes!==null&&<ResultBox acc={spAcc} result={spRes} expected={w} onRetry={retryNum} onDone={()=>{setNStep("idle");setSpRes(null);}} color={color} kidName={kidName} currentPoints={prof?.points||0}/>}
      </div>
    </div><style>{CSS}</style></div>;}

  // ═══ NUMBERS GRID ═══
  if(scr==="numbers")return<div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",background:"var(--bg)",maxWidth:520,margin:"0 auto"}}><div className="star-bg"/><Particles count={8}/><SubHead title={`Numbers 1-${aCfg.max}`} onBack={goHome} points={prof?.points||0}/><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,padding:"14px 12px"}}>{Array.from({length:aCfg.max}).map((_,i)=>{const n=i+1;const done=isDone("numbers",n);return<button key={n} onClick={()=>{rec.warmUp();setSelNum(n);setNStep("idle");setTimeout(()=>playNum(n),100);}} style={{position:"relative",padding:"12px 4px 8px",borderRadius:14,border:`2px solid ${done?nClr(n)+"44":"#eee"}`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,fontFamily:"'Nunito',sans-serif",background:done?`linear-gradient(135deg,${nClr(n)}08,${nClr(n)}15)`:"#fff",animation:`gridPop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i*0.02}s both, cardFloat ${2+Math.random()*2}s ease-in-out ${0.5+i*0.02}s infinite`,boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}}>{done&&<span style={{position:"absolute",top:2,right:3,fontSize:10,color:"#22C55E",fontWeight:900}}>✓</span>}<span style={{fontFamily:"'Fredoka One',cursive",fontSize:20,fontWeight:800,color:nClr(n),animation:`numBounce ${1.5+Math.random()}s ease-in-out ${Math.random()*2}s infinite`}}>{n}</span></button>;})}</div><style>{CSS}</style></div>;

  // ═══ PHONICS DETAIL ═══
  if(scr==="phonics"&&phW){const cc=WCATS[phCat]?.color||"#6366F1";return<div style={{fontFamily:"'Nunito',sans-serif",height:"100dvh",overflow:"auto",background:"var(--bg)",maxWidth:520,margin:"0 auto",position:"relative"}}><Confetti active={confetti}/>{ptAnim&&<div style={{position:"fixed",top:20,right:20,zIndex:999,animation:"ptFly 1.5s ease-out forwards",fontFamily:"'Fredoka One',cursive",fontSize:28,fontWeight:800,color:"#22C55E"}}>{ptAnim}</div>}<SubHead title="Phonics" onBack={()=>{stop();pRef.current=false;setPhW(null);setPhStep("idle");}} points={prof?.points||0}/>
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
            <h2 style={{fontFamily:"'Fredoka One',cursive",fontSize:22,fontWeight:800,color:"#fff",letterSpacing:3,margin:0,textShadow:"0 2px 8px rgba(0,0,0,0.3)"}}>{phW.word.toUpperCase()}{phStep==="saying_word"&&<span style={{animation:"pulse 0.5s infinite",fontSize:20,marginLeft:8}}>🔊</span>}</h2>
          </div>
          {/* Sentence overlay */}
          {phStep==="saying_sentence"&&<div style={{position:"absolute",top:8,left:8,right:8,padding:"8px 14px",background:"rgba(0,0,0,.5)",borderRadius:14,zIndex:11,animation:"slideUp 0.3s ease-out"}}><span style={{fontSize:13,fontWeight:700,color:"var(--cyan)"}}>💬 {phW.sentence}</span></div>}
        </div>;
      })()}
      {/* Phoneme chips */}
      <div style={{marginTop:12,display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>{phW.ph.map((ph,i)=>{const d=gPh(ph);const act=phAI===i;return<button key={i} onClick={()=>{if(!pRef.current)speak(d.s,{rate:0.45,pitch:1.0});}} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"6px 10px 5px",borderRadius:12,border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",minWidth:46,background:act?cc:"#f3f4f6",color:act?"#fff":"#333",transform:act?"scale(1.3) translateY(-4px)":"scale(1)",boxShadow:act?`0 8px 24px ${cc}55`:"0 2px 8px rgba(0,0,0,0.04)",transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}><span style={{fontSize:16,fontWeight:900,fontFamily:"'Fredoka One',cursive"}}>{ph.toUpperCase()}</span><span style={{fontSize:9,fontWeight:700,color:act?"#fffc":"#999",marginTop:2}}>{d.d}</span></button>;})}</div>
      <div style={{marginTop:14}}>
        {phStep==="idle"&&<>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"rgba(255,255,255,0.06)",borderRadius:14,flex:1}}>
              <span style={{fontSize:12,fontWeight:700,color:speakMode?"#22C55E":"#999"}}>🎤</span>
              <button onClick={()=>setSpeakMode(!speakMode)} style={{width:40,height:22,borderRadius:11,border:"none",cursor:"pointer",background:speakMode?"#22C55E":"#ddd",position:"relative",transition:"background 0.3s"}}>
                <div style={{width:18,height:18,borderRadius:9,background:"rgba(255,255,255,0.06)",position:"absolute",top:2,left:speakMode?20:2,transition:"left 0.3s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/>
              </button>
              <span style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:600}}>{speakMode?"Speak ON":"Speak OFF"}</span>
            </div>
            <button onClick={()=>playPh(phW)} style={{padding:"10px 20px",borderRadius:14,border:"none",color:"#fff",fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",background:`linear-gradient(135deg,${cc},${cc}dd)`,display:"flex",alignItems:"center",gap:6}}>🔄 Replay</button>
          </div>
        </>}
        {phStep==="saying_word"&&<Mascot mood="speaking" msg={`Listen! "${phW.word.toUpperCase()}" 🔊`}/>}
        {phStep==="spelling"&&(
          <div style={{animation:"slideUp 0.3s ease-out"}}>
            <Mascot mood="thinking" msg={spellRound===1?"Watch and listen! 🔤":spellRound===2?"Tap the letters in order! 👆":"🔤"}/>
            <div style={{padding:10,background:"rgba(255,255,255,0.06)",borderRadius:16}}>
              <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:spellRound===2?16:0}}>
                {phW.word.toUpperCase().split('').map((letter,i)=>{
                  const st=spellStatus[i]||'waiting';
                  const isActive=activeSpellIdx===i;
                  const isTapTarget=spellRound===2 && i===tapIndex;
                  return <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                    <span style={{
                      fontSize:24,fontFamily:"'Fredoka One',cursive",fontWeight:800,
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
                          fontSize:28,fontFamily:"'Fredoka One',cursive",fontWeight:800,
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
              {spellRound===1&&<div style={{textAlign:"center",marginTop:12,padding:"8px 14px",background:"rgba(99,102,241,0.15)",borderRadius:12}}>
                <p style={{fontSize:13,fontWeight:700,color:"var(--cyan)"}}>👀 Watch and listen!</p>
              </div>}
            </div>
          </div>
        )}
        {phStep==="saying_sentence"&&<Mascot mood="excited" msg="Listen to this sentence! 💬"/>}
        {phStep==="saying_phonics"&&<Mascot mood="thinking" msg="Let's understand how to speak this word... 🔡"/>}
        {phStep==="countdown"&&(
          <div style={{textAlign:"center",padding:24,background:"rgba(255,255,255,0.06)",borderRadius:24,animation:"slideUp 0.3s ease-out"}}>
            <Mascot mood="listening" msg={`Say "${phW.word.toUpperCase()}" when I say Start!`}/>
            <div style={{fontSize:48,fontFamily:"'Fredoka One',cursive",fontWeight:800,color:countdown>0?cc:"#22C55E",animation:"numPulse 0.5s ease-in-out infinite",marginTop:8}}>
              {countdown>0?countdown:"🎤 Start!"}
            </div>
          </div>
        )}
        {phStep==="listening"&&<ListeningBox transcript={rec.txt} onTapMic={tapMicPh} isListening={rec.on} error={rec.err} onType={typePh} expected={phW?.word||""}/>}
        {phStep==="result"&&phRes!==null&&<ResultBox acc={phAcc} result={phRes} expected={phW.word} onRetry={retryPh} onDone={()=>{setPhStep("idle");setPhRes(null);}} color={cc} kidName={kidName} currentPoints={prof?.points||0}/>}
      </div>
    </div><style>{CSS}</style></div>;}

  // ═══ PHONICS GRID ═══
  if(scr==="phonics")return<div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",background:"var(--bg)",maxWidth:520,margin:"0 auto"}}><div className="star-bg"/><Particles count={8}/><SubHead title="Phonics" onBack={goHome} points={prof?.points||0}/><nav style={{display:"flex",gap:8,padding:"10px 16px",overflowX:"auto",background:"rgba(0,0,0,.5)",borderBottom:"1px solid rgba(255,255,255,.06)"}}>{Object.entries(WCATS).map(([k,d])=><button key={k} onClick={()=>setPhCat(k)} style={{padding:"7px 14px",borderRadius:18,border:"2px solid",borderColor:phCat===k?d.color:"#eee",background:phCat===k?d.color:"rgba(255,255,255,0.06)",color:phCat===k?"#fff":"#555",fontSize:12,fontWeight:800,whiteSpace:"nowrap",cursor:"pointer",fontFamily:"'Nunito',sans-serif",flexShrink:0,transition:"all 0.3s"}}>{d.emoji} {k.charAt(0).toUpperCase()+k.slice(1)}</button>)}</nav><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,padding:16}}>{WCATS[phCat]?.words.map((w,i)=>{const done=isDone("phonics",w.word);const cc=WCATS[phCat].color;return<button key={w.word} onClick={()=>{rec.warmUp();setPhW(w);setPhStep("idle");setTimeout(()=>playPh(w),100);}} style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",padding:"18px 10px 12px",borderRadius:20,border:`2px solid ${done?cc+"44":"#eee"}`,background:done?`linear-gradient(135deg,${cc}05,${cc}10)`:"#fff",cursor:"pointer",fontFamily:"'Nunito',sans-serif",animation:`gridPop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i*0.06}s both, cardFloat ${2.5+Math.random()*1.5}s ease-in-out ${0.5+i*0.06}s infinite`,boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}}>{done&&<span style={{position:"absolute",top:6,right:6,width:20,height:20,borderRadius:"50%",background:"#22C55E",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900}}>✓</span>}<span style={{fontSize:34,animation:`iconF 3s ease-in-out ${i*0.2}s infinite`}}>{w.img}</span><span style={{fontFamily:"'Fredoka One',cursive",fontSize:18,fontWeight:700,marginTop:4}}>{w.word}</span><div style={{display:"flex",gap:3,marginTop:5}}>{w.ph.map((ph,j)=><span key={j} style={{fontSize:9,fontWeight:800,background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.4)",padding:"2px 7px",borderRadius:7}}>{ph}</span>)}</div></button>;})}</div><style>{CSS}</style></div>;

  // ═══ SHAPES ═══
  // ═══ SHAPE DETAIL ═══
  if(scr==="shapes"&&selShape){const sh=selShape;const shColor="#A855F7";return<div style={{fontFamily:"'Nunito',sans-serif",height:"100dvh",overflow:"auto",background:"var(--bg)",maxWidth:520,margin:"0 auto",position:"relative"}}><Confetti active={confetti}/>{ptAnim&&<div style={{position:"fixed",top:20,right:20,zIndex:999,animation:"ptFly 1.5s ease-out forwards",fontFamily:"'Fredoka One',cursive",fontSize:28,fontWeight:800,color:"#22C55E"}}>{ptAnim}</div>}<SubHead title={sh.name} onBack={()=>{stop();pRef.current=false;setSelShape(null);setShStep("idle");}} points={prof?.points||0}/>
    {shStep!=="idle"&&<FlowSteps current={shStep} steps={PH_STEPS}/>}
    <div style={{padding:"6px 10px"}}>
      {/* Animated Scene */}
      {sh.scene&&<div style={{position:"relative",width:"100%",height:120,borderRadius:16,overflow:"hidden",background:sh.scene.bg,boxShadow:"inset 0 0 40px rgba(0,0,0,0.1)"}}>
        {sh.scene.elements.map((el,i)=><div key={i} style={{position:"absolute",left:`${el.x}%`,top:`${el.y}%`,transform:"translate(-50%,-50%)",fontSize:el.size,zIndex:2,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.2))",animation:el.anim!=="none"?`scene_${el.anim} ${el.dur}s ease-in-out ${el.delay||0}s infinite`:"none"}}>{el.emoji}</div>)}
        {shStep==="saying_sentence"&&<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px 16px 10px",background:"linear-gradient(transparent,rgba(0,0,0,0.6))",zIndex:10}}><p style={{color:"#fff",fontSize:13,fontWeight:700,textAlign:"center"}}>💬 {sh.sentence}</p></div>}
      </div>}
      <div style={{textAlign:"center",marginTop:4}}><span style={{fontSize:30}}>{sh.emoji}</span><div style={{fontFamily:"'Fredoka One',cursive",fontSize:18,fontWeight:700,textTransform:"capitalize"}}>{sh.name}</div>{sh.sides>0&&<span style={{fontSize:12,fontWeight:700,background:"rgba(99,102,241,0.15)",color:"var(--cyan)",padding:"4px 12px",borderRadius:10}}>{sh.sides} sides</span>}</div>
      {sh.ph&&(shStep==="saying_phonics"||shStep==="idle")&&<div style={{marginTop:6,background:"rgba(255,255,255,0.06)",borderRadius:14,padding:8}}><div style={{fontSize:11,fontWeight:800,color:"#6366F1",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🔊 Phonics</div><div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>{sh.ph.map((ph,i)=>{const d=gPh(ph);const act=shAI===i;return<button key={i} onClick={()=>{if(!pRef.current)speak(d.s,{rate:0.45,pitch:1.0});}} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"6px 10px 5px",borderRadius:12,border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",minWidth:44,background:act?shColor:"#f3f4f6",color:act?"#fff":"#333",transform:act?"scale(1.3) translateY(-4px)":"scale(1)",transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}><span style={{fontSize:16,fontWeight:900,fontFamily:"'Fredoka One',cursive"}}>{ph.toUpperCase()}</span><span style={{fontSize:9,fontWeight:700,color:act?"#fffc":"#999",marginTop:2}}>{d.d}</span></button>;})}</div></div>}
      <div style={{marginTop:12}}>
        {shStep==="idle"&&<div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"rgba(255,255,255,0.06)",borderRadius:14,flex:1}}><span style={{fontSize:12,fontWeight:700,color:speakMode?"#22C55E":"#999"}}>🎤</span><button onClick={()=>setSpeakMode(!speakMode)} style={{width:40,height:22,borderRadius:11,border:"none",cursor:"pointer",background:speakMode?"#22C55E":"#ddd",position:"relative",transition:"background 0.3s"}}><div style={{width:18,height:18,borderRadius:9,background:"rgba(255,255,255,0.06)",position:"absolute",top:2,left:speakMode?20:2,transition:"left 0.3s"}}/></button><span style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:600}}>{speakMode?"ON":"OFF"}</span></div><button onClick={()=>playShape(sh)} style={{padding:"10px 20px",borderRadius:14,border:"none",color:"#fff",fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",background:`linear-gradient(135deg,${shColor},${shColor}dd)`,display:"flex",alignItems:"center",gap:6}}>🔄 Replay</button></div>}
        {shStep==="saying_word"&&<Mascot mood="speaking" msg={`This is a ${sh.name}! 🔊`}/>}
        {shStep==="spelling"&&<div style={{animation:"slideUp 0.3s ease-out"}}><Mascot mood="thinking" msg={spellRound===1?"Watch and listen! 🔤":spellRound===2?"Tap the letters! 👆":"🔤"}/><div style={{padding:10,background:"rgba(255,255,255,0.06)",borderRadius:16}}><div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:spellRound===2?16:0}}>{sh.name.toUpperCase().split('').map((letter,i)=>{const st=spellStatus[i]||'waiting';const isActive=activeSpellIdx===i;const isTap=spellRound===2&&i===tapIndex;return<div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><span style={{fontSize:32,fontFamily:"'Fredoka One',cursive",fontWeight:800,padding:"10px 14px",borderRadius:16,minWidth:44,textAlign:"center",background:isActive?shColor:st==='correct'?"#22C55E":st==='wrong'?"#EF4444":"#f3f4f6",color:(isActive||st==='correct'||st==='wrong')?"#fff":"#ddd",transform:isActive?"scale(1.2) translateY(-4px)":"scale(1)",transition:"all 0.3s"}}>{letter}</span>{st==='correct'&&!isActive&&<span style={{fontSize:12}}>✅</span>}{isTap&&<span style={{fontSize:12,animation:"pulse 1s infinite"}}>👆</span>}</div>;})}</div>{spellRound===2&&<div><div style={{textAlign:"center",fontSize:12,fontWeight:700,color:"#6366F1",marginBottom:10}}>Tap each letter:</div><div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>{scrambledLetters.map((item,i)=><button key={item.id} disabled={item.used} onClick={()=>!item.used&&handleLetterTap(item.letter,i)} style={{fontSize:28,fontFamily:"'Fredoka One',cursive",fontWeight:800,padding:"6px 10px",borderRadius:16,border:"3px solid",borderColor:tapWrong===i?"#EF4444":item.used?"#ddd":"#6366F1",background:tapWrong===i?"#FEE2E2":item.used?"#f9fafb":"#fff",color:item.used?"#ddd":"#1a1a2e",opacity:item.used?0.4:1,transition:"all 0.2s",cursor:item.used?"default":"pointer"}}>{item.letter}</button>)}</div></div>}{spellRound===1&&<div style={{textAlign:"center",marginTop:12,padding:"8px",background:"rgba(99,102,241,0.15)",borderRadius:12}}><p style={{fontSize:13,fontWeight:700,color:"var(--cyan)"}}>👀 Watch and listen!</p></div>}</div></div>}
        {shStep==="saying_sentence"&&<Mascot mood="excited" msg="Listen! 💬"/>}
        {shStep==="saying_phonics"&&<Mascot mood="thinking" msg="How to speak this word... 🔡"/>}
        {shStep==="countdown"&&<div style={{textAlign:"center",padding:24,background:"rgba(255,255,255,0.06)",borderRadius:24,animation:"slideUp 0.3s ease-out"}}><div style={{fontSize:48,fontFamily:"'Fredoka One',cursive",fontWeight:800,color:countdown>0?shColor:"#22C55E",animation:"numPulse 0.5s ease-in-out infinite"}}>{countdown>0?countdown:"🎤 Go!"}</div></div>}
        {shStep==="listening"&&<ListeningBox transcript={rec.txt} onTapMic={()=>rec.start(handleShResult)} isListening={rec.on} error={rec.err} onType={(t)=>handleShResult(t)} expected={sh.name}/>}
        {shStep==="result"&&shRes!==null&&<ResultBox acc={shAcc} result={shRes} expected={sh.name} onRetry={retryShape} onDone={()=>{setShStep("idle");setShRes(null);}} color={shColor} kidName={kidName} currentPoints={prof?.points||0}/>}
      </div>
    </div><style>{CSS}</style></div>;}

  // ═══ SHAPES GRID ═══
  if(scr==="shapes")return<div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",background:"var(--bg)",maxWidth:520,margin:"0 auto"}}><div className="star-bg"/><Particles count={8} emojis={["🔷","🔺","⭐","💎","❤️"]}/><SubHead title="Shapes" onBack={goHome} points={prof?.points||0}/><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14,padding:16}}>{SHAPES.map((s,i)=>{const done=isDone("shapes",s.name);return<button key={s.name} onClick={()=>{rec.warmUp();setSelShape(s);setShStep("idle");setTimeout(()=>playShape(s),100);}} style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",padding:20,borderRadius:22,border:`2px solid ${done?"#A855F744":"#eee"}`,background:done?"linear-gradient(135deg,#A855F705,#A855F710)":"#fff",cursor:"pointer",fontFamily:"'Nunito',sans-serif",animation:`gridPop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i*0.1}s both, cardFloat ${2.5+Math.random()*2}s ease-in-out ${0.6+i*0.1}s infinite`,boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}}>{done&&<span style={{position:"absolute",top:6,right:6,width:20,height:20,borderRadius:"50%",background:"#22C55E",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900}}>✓</span>}<span style={{fontSize:48,animation:`iconF 3s ease-in-out ${i*0.3}s infinite`}}>{s.emoji}</span><span style={{fontFamily:"'Fredoka One',cursive",fontSize:16,fontWeight:700,marginTop:6,textTransform:"capitalize"}}>{s.name}</span><span style={{fontSize:11,color:"rgba(255,255,255,0.4)",fontWeight:600}}>{s.desc}</span></button>;})}</div><style>{CSS}</style></div>;


  // ═══ COLORS ═══
  // ═══ COLOR DETAIL ═══
  if(scr==="colors"&&selColor){const co=selColor;return<div style={{fontFamily:"'Nunito',sans-serif",height:"100dvh",overflow:"auto",background:"var(--bg)",maxWidth:520,margin:"0 auto",position:"relative"}}><Confetti active={confetti}/>{ptAnim&&<div style={{position:"fixed",top:20,right:20,zIndex:999,animation:"ptFly 1.5s ease-out forwards",fontFamily:"'Fredoka One',cursive",fontSize:28,fontWeight:800,color:"#22C55E"}}>{ptAnim}</div>}<SubHead title={co.name} onBack={()=>{stop();pRef.current=false;setSelColor(null);setCoStep("idle");}} points={prof?.points||0}/>
    {coStep!=="idle"&&<FlowSteps current={coStep} steps={PH_STEPS}/>}
    <div style={{padding:"6px 10px"}}>
      {/* Animated Scene */}
      {co.scene&&<div style={{position:"relative",width:"100%",height:120,borderRadius:16,overflow:"hidden",background:co.scene.bg,boxShadow:"inset 0 0 40px rgba(0,0,0,0.1)"}}>
        {co.scene.elements.map((el,i)=><div key={i} style={{position:"absolute",left:`${el.x}%`,top:`${el.y}%`,transform:"translate(-50%,-50%)",fontSize:el.size,zIndex:2,filter:"drop-shadow(0 2px 4px rgba(0,0,0,0.2))",animation:el.anim!=="none"?`scene_${el.anim} ${el.dur}s ease-in-out ${el.delay||0}s infinite`:"none"}}>{el.emoji}</div>)}
        {coStep==="saying_sentence"&&<div style={{position:"absolute",bottom:0,left:0,right:0,padding:"20px 16px 10px",background:"linear-gradient(transparent,rgba(0,0,0,0.6))",zIndex:10}}><p style={{color:"#fff",fontSize:13,fontWeight:700,textAlign:"center"}}>💬 {co.sentence}</p></div>}
      </div>}
      <div style={{textAlign:"center",marginTop:4}}><div style={{width:50,height:50,borderRadius:16,background:co.hex,margin:"0 auto 8px",boxShadow:`0 8px 24px ${co.hex}44`}}/><div style={{fontFamily:"'Fredoka One',cursive",fontSize:18,fontWeight:700,textTransform:"capitalize"}}>{co.name}</div><div style={{display:"flex",gap:6,justifyContent:"center",marginTop:6}}>{co.things.map((t,j)=><span key={j} style={{fontSize:11,fontWeight:700,background:"rgba(255,255,255,0.08)",color:"rgba(255,255,255,0.5)",padding:"4px 10px",borderRadius:8}}>{t}</span>)}</div></div>
      {co.ph&&(coStep==="saying_phonics"||coStep==="idle")&&<div style={{marginTop:6,background:"rgba(255,255,255,0.06)",borderRadius:14,padding:8}}><div style={{fontSize:11,fontWeight:800,color:"#6366F1",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🔊 Phonics</div><div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>{co.ph.map((ph,i)=>{const d=gPh(ph);const act=coAI===i;return<button key={i} onClick={()=>{if(!pRef.current)speak(d.s,{rate:0.45,pitch:1.0});}} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"6px 10px 5px",borderRadius:12,border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",minWidth:44,background:act?co.hex:"#f3f4f6",color:act?"#fff":"#333",transform:act?"scale(1.3) translateY(-4px)":"scale(1)",transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}><span style={{fontSize:16,fontWeight:900,fontFamily:"'Fredoka One',cursive"}}>{ph.toUpperCase()}</span><span style={{fontSize:9,fontWeight:700,color:act?"#fffc":"#999",marginTop:2}}>{d.d}</span></button>;})}</div></div>}
      <div style={{marginTop:12}}>
        {coStep==="idle"&&<div style={{display:"flex",gap:10,alignItems:"center"}}><div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"rgba(255,255,255,0.06)",borderRadius:14,flex:1}}><span style={{fontSize:12,fontWeight:700,color:speakMode?"#22C55E":"#999"}}>🎤</span><button onClick={()=>setSpeakMode(!speakMode)} style={{width:40,height:22,borderRadius:11,border:"none",cursor:"pointer",background:speakMode?"#22C55E":"#ddd",position:"relative",transition:"background 0.3s"}}><div style={{width:18,height:18,borderRadius:9,background:"rgba(255,255,255,0.06)",position:"absolute",top:2,left:speakMode?20:2,transition:"left 0.3s"}}/></button><span style={{fontSize:11,color:"rgba(255,255,255,0.35)",fontWeight:600}}>{speakMode?"ON":"OFF"}</span></div><button onClick={()=>playColor(co)} style={{padding:"10px 20px",borderRadius:14,border:"none",color:"#fff",fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",background:`linear-gradient(135deg,${co.hex},${co.hex}dd)`,display:"flex",alignItems:"center",gap:6}}>🔄 Replay</button></div>}
        {coStep==="saying_word"&&<Mascot mood="speaking" msg={`This color is ${co.name}! 🔊`}/>}
        {coStep==="spelling"&&<div style={{animation:"slideUp 0.3s ease-out"}}><Mascot mood="thinking" msg={spellRound===1?"Watch and listen! 🔤":spellRound===2?"Tap the letters! 👆":"🔤"}/><div style={{padding:10,background:"rgba(255,255,255,0.06)",borderRadius:16}}><div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap",marginBottom:spellRound===2?16:0}}>{co.name.toUpperCase().split('').map((letter,i)=>{const st=spellStatus[i]||'waiting';const isActive=activeSpellIdx===i;const isTap=spellRound===2&&i===tapIndex;return<div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><span style={{fontSize:32,fontFamily:"'Fredoka One',cursive",fontWeight:800,padding:"10px 14px",borderRadius:16,minWidth:44,textAlign:"center",background:isActive?co.hex:st==='correct'?"#22C55E":st==='wrong'?"#EF4444":"#f3f4f6",color:(isActive||st==='correct'||st==='wrong')?"#fff":"#ddd",transform:isActive?"scale(1.2) translateY(-4px)":"scale(1)",transition:"all 0.3s"}}>{letter}</span>{st==='correct'&&!isActive&&<span style={{fontSize:12}}>✅</span>}{isTap&&<span style={{fontSize:12,animation:"pulse 1s infinite"}}>👆</span>}</div>;})}</div>{spellRound===2&&<div><div style={{textAlign:"center",fontSize:12,fontWeight:700,color:"#6366F1",marginBottom:10}}>Tap each letter:</div><div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>{scrambledLetters.map((item,i)=><button key={item.id} disabled={item.used} onClick={()=>!item.used&&handleLetterTap(item.letter,i)} style={{fontSize:28,fontFamily:"'Fredoka One',cursive",fontWeight:800,padding:"6px 10px",borderRadius:16,border:"3px solid",borderColor:tapWrong===i?"#EF4444":item.used?"#ddd":co.hex,background:tapWrong===i?"#FEE2E2":item.used?"#f9fafb":"#fff",color:item.used?"#ddd":"#1a1a2e",opacity:item.used?0.4:1,transition:"all 0.2s",cursor:item.used?"default":"pointer"}}>{item.letter}</button>)}</div></div>}{spellRound===1&&<div style={{textAlign:"center",marginTop:12,padding:"8px",background:"rgba(99,102,241,0.15)",borderRadius:12}}><p style={{fontSize:13,fontWeight:700,color:"var(--cyan)"}}>👀 Watch and listen!</p></div>}</div></div>}
        {coStep==="saying_sentence"&&<Mascot mood="excited" msg="Listen! 💬"/>}
        {coStep==="saying_phonics"&&<Mascot mood="thinking" msg="How to speak this word... 🔡"/>}
        {coStep==="countdown"&&<div style={{textAlign:"center",padding:24,background:"rgba(255,255,255,0.06)",borderRadius:24}}><div style={{fontSize:48,fontFamily:"'Fredoka One',cursive",fontWeight:800,color:countdown>0?co.hex:"#22C55E",animation:"numPulse 0.5s ease-in-out infinite"}}>{countdown>0?countdown:"🎤 Go!"}</div></div>}
        {coStep==="listening"&&<ListeningBox transcript={rec.txt} onTapMic={()=>rec.start(handleCoResult)} isListening={rec.on} error={rec.err} onType={(t)=>handleCoResult(t)} expected={co.name}/>}
        {coStep==="result"&&coRes!==null&&<ResultBox acc={coAcc} result={coRes} expected={co.name} onRetry={retryColor} onDone={()=>{setCoStep("idle");setCoRes(null);}} color={co.hex} kidName={kidName} currentPoints={prof?.points||0}/>}
      </div>
    </div><style>{CSS}</style></div>;}

  // ═══ COLORS GRID ═══
  if(scr==="colors")return<div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",background:"var(--bg)",maxWidth:520,margin:"0 auto"}}><div className="star-bg"/><Particles count={8} emojis={["🌈","🎨","🖍️","✨"]}/><SubHead title="Colors" onBack={goHome} points={prof?.points||0}/><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:14,padding:16}}>{COLORSDATA.map((c,i)=>{const done=isDone("colors",c.name);return<button key={c.name} onClick={()=>{rec.warmUp();setSelColor(c);setCoStep("idle");setTimeout(()=>playColor(c),100);}} style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",padding:16,borderRadius:22,border:`2px solid ${done?c.hex+"44":"#eee"}`,background:done?`linear-gradient(135deg,${c.hex}05,${c.hex}10)`:"#fff",cursor:"pointer",fontFamily:"'Nunito',sans-serif",animation:`gridPop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i*0.1}s both, cardFloat ${2.5+Math.random()*2}s ease-in-out ${0.6+i*0.1}s infinite`,boxShadow:"0 4px 16px rgba(0,0,0,0.3)"}}>{done&&<span style={{position:"absolute",top:6,right:6,width:20,height:20,borderRadius:"50%",background:"#22C55E",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900}}>✓</span>}<div style={{width:54,height:54,borderRadius:16,background:c.hex,marginBottom:6,boxShadow:`0 4px 12px ${c.hex}44`}}/><span style={{fontFamily:"'Fredoka One',cursive",fontSize:16,fontWeight:700,textTransform:"capitalize"}}>{c.name}</span><span style={{fontSize:22}}>{c.emoji}</span></button>;})}</div><style>{CSS}</style></div>;



  // ═══ BASICS DASHBOARD ═══
  if(scr==="basics")return<div style={{fontFamily:"'Nunito',sans-serif",height:"100dvh",overflow:"hidden",background:"var(--bg)",maxWidth:520,margin:"0 auto",display:"flex",flexDirection:"column"}}>
    <SubHead title="Basics 🧩" onBack={goHome} points={prof?.points||0}/>
    {/* 3 Tab bar */}
    <div style={{display:"flex",gap:4,padding:"4px 8px",background:"rgba(255,255,255,0.06)"}}>
      {[{id:"explore",label:"📖 Numbers"},{id:"find",label:"🔍 Find"},{id:"write",label:"✏️ Write"}].map(t=>
        <button key={t.id} onClick={()=>{
          setBasicsTab(t.id);
          if(t.id==="find"&&!findTarget)newFindTarget();
          if(t.id==="write"){setTimeout(()=>{initCanvas();speak(`Write ${NW[writeNum]||writeNum}.`,{rate:0.75,pitch:1.0});},500);}
        }} style={{flex:1,padding:"10px 6px",borderRadius:12,border:"none",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"'Nunito',sans-serif",
          background:basicsTab===t.id?"#6366F1":"#f3f4f6",color:basicsTab===t.id?"#fff":"#888",transition:"all 0.2s"
        }}>{t.label}</button>
      )}
    </div>

    {/* ═══ EXPLORE: Grid of all numbers ═══ */}
    {basicsTab==="explore"&&<div style={{flex:1,overflow:"auto",padding:"6px 8px"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:5}}>
        {Array.from({length:aCfg?.max||20}).map((_,i)=>{const n=i+1;const em=NUM_EMOJI[n]||"";
          return<button key={n} onClick={()=>sayNum(n)} style={{
            display:"flex",flexDirection:"column",alignItems:"center",padding:"5px 2px",borderRadius:10,border:"none",cursor:"pointer",
            background:"rgba(255,255,255,0.06)",boxShadow:"0 2px 8px rgba(0,0,0,0.3)",fontFamily:"'Fredoka One',cursive",
            animation:`gridPop 0.2s ease ${i*0.01}s both`,transition:"transform 0.1s"
          }}>
            <span style={{fontSize:18,fontWeight:800,color:nClr(n),lineHeight:1}}>{n}</span>
            {em&&<span style={{fontSize:14,lineHeight:1}}>{em}</span>}
          </button>;
        })}
      </div>
    </div>}

    {/* ═══ FIND GAME ═══ */}
    {basicsTab==="find"&&<div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{padding:"8px 12px",background:"linear-gradient(135deg,#FEF3C7,#FDE68A)",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
        {findTarget?<>
          <span style={{fontSize:28,animation:"numPulse 1s ease-in-out infinite"}}>{NUM_EMOJI[findTarget]||"🔢"}</span>
          <div>
            <div style={{fontFamily:"'Fredoka One',cursive",fontSize:28,fontWeight:800,color:"var(--yellow)",lineHeight:1}}>Find: {findTarget}</div>
            {findFb&&<span style={{fontSize:11,fontWeight:800,color:findFb.ok?"#16A34A":"#DC2626"}}>{findFb.ok?"✅ Correct!":"❌ Try again!"}</span>}
          </div>
          <div style={{marginLeft:"auto"}}><span style={{fontFamily:"'Fredoka One',cursive",fontSize:16,fontWeight:800,color:"var(--orange)"}}>🏆{findScore}</span>
          {findStreak>=3&&<span style={{fontSize:10,fontWeight:800,color:"#EF4444",marginLeft:4}}>🔥{findStreak}</span>}</div>
        </>:<button onClick={newFindTarget} style={{padding:"10px 24px",borderRadius:14,border:"none",background:"linear-gradient(135deg,#F59E0B,#D97706)",color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>▶️ Start!</button>}
      </div>
      <div style={{flex:1,overflow:"auto",padding:"6px 8px"}}><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:4}}>
        {Array.from({length:aCfg?.max||20}).map((_,i)=>{const n=i+1;const fb=findFb?.n===n?findFb:null;
          return<button key={n} onClick={()=>onFindTap(n)} style={{
            padding:"10px 4px",borderRadius:12,border:"2px solid",cursor:"pointer",
            borderColor:fb?(fb.ok?"#22C55E":"#EF4444"):"transparent",
            background:fb?(fb.ok?"#ECFDF5":"#FEF2F2"):"#fff",
            fontFamily:"'Fredoka One',cursive",fontSize:20,fontWeight:800,color:nClr(n),
            boxShadow:"0 2px 8px rgba(0,0,0,0.3)",
            transform:fb?.ok?"scale(1.15)":"scale(1)",transition:"all 0.15s"
          }}>{n}</button>;
        })}
      </div></div>
    </div>}

    {/* ═══ WRITE TAB: Split screen - top shows number, bottom is notepad ═══ */}
    {basicsTab==="write"&&<div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
      {/* TOP: Compact reference with stroke guide */}
      <div style={{padding:"6px 10px",background:"var(--card)",borderBottom:"2px solid var(--pink)",display:"flex",alignItems:"center",gap:8}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontFamily:"'Fredoka One',cursive",fontSize:36,color:"var(--cyan)",lineHeight:1,textShadow:"0 0 16px rgba(51,238,255,.4)"}}>{writeNum}</span>
          <div>
            <div style={{fontFamily:"'Nunito',sans-serif",fontWeight:900,fontSize:13,color:"var(--yellow)",textTransform:"capitalize"}}>{NW[writeNum]||""} {NUM_EMOJI[writeNum]||""}</div>
            <div style={{fontSize:9,fontWeight:700,color:"var(--cyan)",lineHeight:1.2}}>{NUM_STROKES[writeNum]||"Write the number!"}</div>
          </div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",gap:4}}>
          <button onClick={()=>speak(`${NW[writeNum]||writeNum}. ${NUM_STROKES[writeNum]||""}`,{rate:0.55,pitch:1.0})} style={{padding:"6px 10px",borderRadius:8,border:"none",background:"linear-gradient(135deg,var(--pink),var(--purple))",color:"#fff",fontSize:10,fontWeight:800,cursor:"pointer"}}>🔊</button>
          {writeOk&&<span style={{fontSize:16}}>✅</span>}
        </div>
      </div>
      {/* NOTEBOOK: Ruled paper with ghost number */}
      <div style={{flex:1,position:"relative",touchAction:"none",overflow:"hidden",
        background:"var(--card2)",
      }}>
        {/* Red margin line */}
        <div style={{position:"absolute",left:40,top:0,bottom:0,width:2,background:"rgba(255,68,85,.25)",zIndex:1,pointerEvents:"none"}}/>
        {/* Blue ruled lines */}
        <div style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:0,
          backgroundImage:"repeating-linear-gradient(transparent,transparent 31px,rgba(51,238,255,.12) 31px,rgba(51,238,255,.12) 32px)",
          backgroundSize:"100% 32px",backgroundPosition:"0 16px"
        }}/>
        {/* Ghost number to trace — large, centered, very faint */}
        <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none",zIndex:0}}>
          <span style={{fontFamily:"'Fredoka One',cursive",fontSize:Math.min(160,writeNum>9?120:160),fontWeight:800,color:"rgba(255,255,255,.06)",userSelect:"none",lineHeight:1,
            textShadow:"0 0 30px rgba(51,238,255,.05)"
          }}>{writeNum}</span>
        </div>
        {/* Drawing canvas — sized to fill exactly */}
        <canvas ref={cRef}
          style={{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:2,cursor:"crosshair"}}
          onMouseDown={drawStart} onMouseMove={drawMove} onMouseUp={drawEnd} onMouseLeave={drawEnd}
          onTouchStart={(e)=>{e.preventDefault();drawStart(e);}} onTouchMove={(e)=>{e.preventDefault();drawMove(e);}} onTouchEnd={drawEnd}
        />
      </div>
      {/* Bottom controls */}
      <div style={{display:"flex",gap:6,padding:"6px 8px",background:"var(--card)",borderTop:"1px solid rgba(255,255,255,.06)"}}>
        <button onClick={clearPad} style={{flex:1,padding:"10px",borderRadius:12,border:"2px solid rgba(255,255,255,.1)",background:"transparent",color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>🗑️ Clear</button>
        <button onClick={()=>speak(`${NW[writeNum]||writeNum}`,{rate:0.7,pitch:1.0})} style={{flex:1,padding:"10px",borderRadius:12,border:"2px solid rgba(255,255,255,.1)",background:"transparent",color:"#fff",fontSize:12,fontWeight:800,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>🔊 Say</button>
        <button onClick={nextWrite} style={{flex:1,padding:"10px",borderRadius:12,border:"none",background:"linear-gradient(135deg,var(--green),var(--cyan))",color:"#000",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"'Fredoka One',cursive"}}>Next ➡️</button>
      </div>
    </div>}
    <style>{CSS}</style>
  </div>;

    // ═══ REWARDS ═══
  if(scr==="rewards")return<div style={{fontFamily:"'Nunito',sans-serif",height:"100dvh",overflow:"auto",background:"var(--bg)",maxWidth:520,margin:"0 auto",position:"relative"}}><Confetti active={confetti}/><SubHead title="Rewards 🎁" onBack={goHome} points={prof?.points||0}/>{rwdMsg&&<div style={{position:"fixed",top:60,left:16,right:16,padding:14,background:"linear-gradient(135deg,#22C55E,#16A34A)",color:"#fff",borderRadius:18,fontWeight:800,textAlign:"center",zIndex:999,animation:"slideUp 0.3s ease-out",fontSize:13,maxWidth:490,margin:"0 auto"}}>{rwdMsg}</div>}<div style={{margin:"14px 16px 0",padding:"18px 20px",background:"linear-gradient(135deg,#FBBF24,#F59E0B)",borderRadius:22,display:"flex",alignItems:"center",gap:14,boxShadow:"0 8px 28px #FBBF2444"}}><span style={{fontSize:36,animation:"coinSp 2s ease-in-out infinite"}}>💰</span><div><div style={{color:"#fff",fontFamily:"'Fredoka One',cursive",fontSize:28,fontWeight:800}}>{prof?.points||0}</div><div style={{color:"#ffffffcc",fontSize:11,fontWeight:700}}>Earn more by practicing!</div></div></div><p style={{padding:"8px 16px",fontSize:11,color:"rgba(255,255,255,0.4)",fontWeight:700,textAlign:"center"}}>🎉 Show parents when you earn a reward!</p><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,padding:"0 16px 20px"}}>{REWARDS.map((r,i)=>{const can=(prof?.points||0)>=r.cost;return<button key={r.id} onClick={()=>can&&buyR(r)} disabled={!can} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:16,borderRadius:20,border:`2px solid ${can?"#eee":"#f3f4f6"}`,background:can?"#fff":"#fafafa",cursor:can?"pointer":"default",fontFamily:"'Nunito',sans-serif",opacity:can?1:0.4,animation:`cardIn 0.3s ease ${i*0.05}s both`}}><span style={{fontSize:36}}>{r.emoji}</span><span style={{fontFamily:"'Fredoka One',cursive",fontSize:14,fontWeight:700,marginTop:4}}>{r.name}</span><span style={{fontSize:10,color:"rgba(255,255,255,0.4)",fontWeight:600}}>{r.desc}</span><span style={{marginTop:6,padding:"5px 14px",borderRadius:12,color:"#fff",fontSize:12,fontWeight:800,background:can?"linear-gradient(135deg,#22C55E,#16A34A)":"#94A3B8"}}>💰 {r.cost}</span></button>;})}</div>{(prof?.rewards||[]).length>0&&<div style={{padding:"0 16px 20px"}}><h3 style={{fontFamily:"'Fredoka One',cursive",fontSize:16,fontWeight:700,marginBottom:8}}>🏆 Your Rewards</h3>{(prof?.rewards||[]).slice(-6).reverse().map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"rgba(255,255,255,0.06)",borderRadius:14,border:"1px solid rgba(255,255,255,0.06)",marginBottom:6}}><span style={{fontSize:24}}>{r.emoji}</span><span style={{fontWeight:800,fontSize:13,flex:1}}>{r.name}</span><span style={{fontSize:10,color:"rgba(255,255,255,0.35)"}}>{new Date(r.at).toLocaleDateString()}</span></div>)}</div>}<style>{CSS}</style></div>;

  // ═══ SETTINGS ═══
  if(scr==="settings")return<div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",background:"var(--bg)",maxWidth:520,margin:"0 auto"}}><SubHead title="Settings" onBack={goHome} points={prof?.points||0}/><div style={{padding:18}}><div style={{textAlign:"center",padding:24,background:"rgba(255,255,255,0.06)",borderRadius:24,boxShadow:"0 4px 16px rgba(0,0,0,0.4)"}}><span style={{fontSize:56,display:"block",animation:"mascotB 3s ease-in-out infinite"}}>{AVATARS[prof?.gender||"boy"][prof?.avatar||0]}</span><h2 style={{fontFamily:"'Fredoka One',cursive",fontSize:24,fontWeight:700,margin:"6px 0 2px"}}>{prof?.name}</h2><p style={{color:"rgba(255,255,255,0.4)",fontSize:13,fontWeight:600}}>Age {prof?.age} • {aCfg.diff}</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginTop:14}}>{[{n:prof?.totalEarned||0,l:"Points Earned",c:"#6366F1"},{n:(prof?.completed?.numbers||[]).length,l:"Numbers",c:"#FF6B6B"},{n:(prof?.completed?.phonics||[]).length,l:"Words",c:"#4ECDC4"},{n:(prof?.rewards||[]).length,l:"Rewards",c:"#FBBF24"}].map((s,i)=><div key={i} style={{background:"rgba(255,255,255,0.06)",borderRadius:18,padding:16,textAlign:"center",border:"1px solid rgba(255,255,255,0.06)"}}><span style={{fontFamily:"'Fredoka One',cursive",fontSize:28,fontWeight:800,color:s.c,display:"block"}}>{s.n}</span><span style={{fontSize:10,fontWeight:700,color:"rgba(255,255,255,0.4)"}}>{s.l}</span></div>)}</div><button onClick={()=>{setScr("onboard");setObSt(0);}} style={{width:"100%",padding:14,borderRadius:18,border:"none",background:"rgba(99,102,241,0.15)",color:"var(--cyan)",fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",marginTop:14}}>🔄 Change Profile</button><button onClick={()=>{save(null);setScr("onboard");setObSt(0);}} style={{width:"100%",padding:14,borderRadius:18,border:"none",background:"#FEE2E2",color:"#DC2626",fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",marginTop:8}}>🗑️ Reset</button></div><style>{CSS}</style></div>;

  return<div><style>{CSS}</style></div>;
}

// ═══════════════════════════════════════════════════════════════
const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@600;700;800;900&display=swap');
:root{--bg:#080820;--card:#12123a;--card2:#1a1a50;--yellow:#FFE033;--pink:#FF5FA0;--cyan:#33EEFF;--green:#44FF88;--orange:#FF8833;--purple:#CC55FF;--red:#FF4455;}
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
html,body{background:var(--bg)!important;overflow-x:hidden;color:#fff;}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:rgba(255,255,255,.15);border-radius:4px;}::-webkit-scrollbar-track{background:transparent;}
button:active{transform:scale(0.95)!important;}
/* Star BG */
.star-bg{position:fixed;inset:0;z-index:0;pointer-events:none;background-image:radial-gradient(1px 1px at 8% 12%,rgba(255,255,255,.5) 0%,transparent 100%),radial-gradient(1px 1px at 22% 58%,rgba(255,255,255,.3) 0%,transparent 100%),radial-gradient(1px 1px at 37% 25%,rgba(255,255,255,.4) 0%,transparent 100%),radial-gradient(1px 1px at 51% 78%,rgba(255,255,255,.3) 0%,transparent 100%),radial-gradient(1px 1px at 66% 40%,rgba(255,255,255,.5) 0%,transparent 100%),radial-gradient(1px 1px at 80% 18%,rgba(255,255,255,.4) 0%,transparent 100%),radial-gradient(1px 1px at 92% 70%,rgba(255,255,255,.3) 0%,transparent 100%),radial-gradient(1px 1px at 14% 88%,rgba(255,255,255,.4) 0%,transparent 100%);}
/* Animations */
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
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
@keyframes micP{0%,100%{box-shadow:0 0 0 0 rgba(255,95,160,.4)}50%{box-shadow:0 0 0 12px rgba(255,95,160,0)}}
@keyframes listenBlink{0%,100%{opacity:1}50%{opacity:.4}}
@keyframes bubPop{from{opacity:0;transform:scale(.7) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes btnP{0%,100%{box-shadow:0 6px 20px rgba(204,85,255,.4)}50%{box-shadow:0 10px 30px rgba(204,85,255,.7)}}
@keyframes tipW{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}
@keyframes readyP{0%,100%{transform:scale(1)}50%{transform:scale(1.02)}}
@keyframes gridPop{0%{transform:scale(0) rotate(-10deg);opacity:0}60%{transform:scale(1.1) rotate(2deg);opacity:1}100%{transform:scale(1) rotate(0);opacity:1}}
@keyframes cardFloat{0%,100%{transform:translateY(0)}25%{transform:translateY(-5px) rotate(.5deg)}75%{transform:translateY(-7px) rotate(-.5deg)}}
@keyframes cardBounce{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}
@keyframes numBounce{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-3px) scale(1.08)}}
@keyframes cardIn{from{opacity:0;transform:scale(.5) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes iconF{0%,100%{transform:translateY(0) scale(1)}25%{transform:translateY(-6px) scale(1.08) rotate(4deg)}75%{transform:translateY(-8px) scale(1.06) rotate(-3deg)}}
@keyframes findPulse{0%,100%{box-shadow:0 0 0 0 rgba(255,224,51,.4)}50%{box-shadow:0 0 0 8px rgba(255,224,51,0)}}
/* Animated scenes */
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
