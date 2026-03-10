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
      <div style={{position:"absolute",top:8,right:12,fontFamily:"'Baloo 2',cursive",fontSize:48,fontWeight:800,color:"rgba(255,255,255,0.15)",lineHeight:1,zIndex:1}}>{num}</div>
      
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
const SHAPES=[{name:"circle",emoji:"🔵",desc:"Round!",sides:0},{name:"square",emoji:"🟧",desc:"4 equal sides!",sides:4},{name:"triangle",emoji:"🔺",desc:"3 corners!",sides:3},{name:"star",emoji:"⭐",desc:"Twinkle!",sides:5},{name:"heart",emoji:"❤️",desc:"Love!",sides:0},{name:"diamond",emoji:"💎",desc:"Sparkly!",sides:4}];
const COLORSDATA=[{name:"Red",hex:"#EF4444",emoji:"🍎",things:["apple","fire truck"]},{name:"Blue",hex:"#3B82F6",emoji:"🌊",things:["ocean","sky"]},{name:"Green",hex:"#22C55E",emoji:"🌿",things:["grass","frog"]},{name:"Yellow",hex:"#EAB308",emoji:"🌻",things:["sun","banana"]},{name:"Orange",hex:"#F97316",emoji:"🍊",things:["orange"]},{name:"Purple",hex:"#A855F7",emoji:"🍇",things:["grapes"]},{name:"Pink",hex:"#EC4899",emoji:"🌸",things:["flower"]}];

// Helpers
const wait=(ms)=>new Promise(r=>setTimeout(r,ms));
const nClr=(n)=>["#FF6B6B","#4ECDC4","#45B7D1","#FF8C42","#A855F7","#F472B6","#34D399","#FBBF24","#60A5FA","#F87171"][(Math.floor((n-1)/10))%10];
// Normalize speech: "13" → "thirteen", strip filler words
const normalizeSpoken=(text)=>{
  let t=text.trim().toLowerCase();
  t=t.replace(/\b(\d+)\b/g,(match)=>{const n=parseInt(match);if(n>=0&&n<=100&&NW[n])return NW[n];return match;});
  t=t.replace(/^(the |a |an |uh |um |oh )/i,'');
  return t.trim();
};
const calcAcc=(e,g)=>{if(!e||!g)return 0;const a=e.trim().toLowerCase(),b=normalizeSpoken(g);if(a===b)return 100;const m=Array.from({length:a.length+1},(_,i)=>Array.from({length:b.length+1},(_,j)=>i===0?j:j===0?i:0));for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)m[i][j]=a[i-1]===b[j-1]?m[i-1][j-1]:1+Math.min(m[i-1][j],m[i][j-1],m[i-1][j-1]);return Math.max(0,Math.round((1-m[a.length][b.length]/Math.max(a.length,b.length))*100));};
const getStars=(a)=>a>=95?5:a>=85?4:a>=75?3:a>=60?2:a>=40?1:0;
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
  const[supported,setSupported]=useState(true);
  const cbRef=useRef(null);
  const recRef=useRef(null);
  const timeoutRef=useRef(null);

  useEffect(()=>{
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR)setSupported(false);
  },[]);

  // Create FRESH recognition each time (fixes mobile bug)
  const start=useCallback((cb)=>{
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){setSupported(false);setErr("Speech not supported on this browser");return;}

    // Stop any existing
    try{recRef.current?.abort();}catch(e){}
    clearTimeout(timeoutRef.current);

    const r=new SR();
    r.continuous=false;
    r.interimResults=true;
    r.lang="en-US";
    r.maxAlternatives=5;
    recRef.current=r;
    cbRef.current=cb;

    setTxt("");setErr("");setOn(true);

    r.onresult=(e)=>{
      let f="",interim="";
      for(let x=0;x<e.results.length;x++){
        if(e.results[x].isFinal)f+=e.results[x][0].transcript;
        else interim+=e.results[x][0].transcript;
      }
      const t=(f||interim).toLowerCase().trim();
      setTxt(t);
      if(f){
        clearTimeout(timeoutRef.current);
        cbRef.current?.(t);
        setOn(false);
      }
    };
    r.onerror=(e)=>{
      console.log("Speech error:",e.error);
      if(e.error==="not-allowed")setErr("Mic blocked! Tap the lock icon in your browser address bar → allow microphone.");
      else if(e.error==="no-speech")setErr("No speech heard. Tap the mic and try again.");
      else setErr("Mic error: "+e.error);
      setOn(false);
    };
    r.onend=()=>{
      // If still "on" but no result, it ended silently
      setOn(prev=>{
        if(prev && !txt){setErr("Didn't catch that. Tap the mic and speak clearly.");}
        return false;
      });
    };

    // Request mic permission first on mobile
    if(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia){
      navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>{
        stream.getTracks().forEach(t=>t.stop()); // release immediately
        try{r.start();}catch(e){setErr("Could not start mic. Try again.");setOn(false);}
      }).catch(()=>{
        setErr("Microphone access denied. Please allow mic access in your browser settings.");
        setOn(false);
      });
    }else{
      try{r.start();}catch(e){setErr("Could not start mic.");setOn(false);}
    }

    // Auto-timeout after 10 seconds
    timeoutRef.current=setTimeout(()=>{
      try{r.stop();}catch(e){}
      setOn(false);
      setErr("Timed out. Tap the mic and try again, or type your answer.");
    },10000);

  },[]);

  // Quick listen - opens mic for a few seconds, returns what was heard (or "")
  const quickListen=useCallback((timeoutMs=5000)=>{
    return new Promise((resolve)=>{
      const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
      if(!SR){resolve("");return;}
      try{recRef.current?.abort();}catch(e){}
      clearTimeout(timeoutRef.current);
      const r=new SR();
      r.continuous=false;
      r.interimResults=true; // Capture partial results for single letters
      r.lang="en-US";
      r.maxAlternatives=5;
      recRef.current=r;
      let resolved=false;
      let bestResult="";
      const done=(val)=>{
        if(!resolved){
          resolved=true;
          setOn(false);
          clearTimeout(timeoutRef.current);
          try{r.abort();}catch(e){}
          resolve(val || bestResult);
        }
      };
      r.onresult=(e)=>{
        let f="",interim="";
        for(let x=0;x<e.results.length;x++){
          if(e.results[x].isFinal) f+=e.results[x][0].transcript;
          else interim+=e.results[x][0].transcript;
        }
        // For single letters, interim is often all we get
        if(f){
          done(f.toLowerCase().trim());
        } else if(interim){
          bestResult=interim.toLowerCase().trim();
          // If we got something, resolve quickly for snappy feel
          clearTimeout(timeoutRef.current);
          timeoutRef.current=setTimeout(()=>done(bestResult),800);
        }
      };
      r.onerror=()=>done("");
      r.onend=()=>done("");
      setOn(true);
      try{r.start();}catch(e){done("");}
      timeoutRef.current=setTimeout(()=>done(""),timeoutMs);
    });
  },[]);

  const stopR=useCallback(()=>{
    clearTimeout(timeoutRef.current);
    try{recRef.current?.abort();}catch(e){}
    try{recRef.current?.stop();}catch(e){}
    setOn(false);
  },[]);

  return{start,stop:stopR,quickListen,on,txt,err,supported};
};
const useStore=()=>{const[d,setD]=useState(null);const[ok,setOk]=useState(false);useEffect(()=>{(async()=>{try{const r=await window.storage.get("lg4");if(r?.value)setD(JSON.parse(r.value));}catch(e){}setOk(true);})();},[]);const save=useCallback(async(nd)=>{setD(nd);try{await window.storage.set("lg4",JSON.stringify(nd));}catch(e){}},[]);return{data:d,save,loaded:ok};};

// Small components
const Particles=({count=10,emojis=["⭐","✨","🌟","💫"]})=>{const items=useRef(Array.from({length:count},(_,i)=>({id:i,emoji:emojis[i%emojis.length],x:Math.random()*100,y:Math.random()*100,sz:12+Math.random()*14,dur:8+Math.random()*12,dl:-Math.random()*10,dr:20+Math.random()*40}))).current;return<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>{items.map(p=><div key={p.id} style={{position:"absolute",left:`${p.x}%`,top:`${p.y}%`,fontSize:p.sz,opacity:0.25,animation:`floatP ${p.dur}s ease-in-out ${p.dl}s infinite`,"--dr":`${p.dr}px`}}>{p.emoji}</div>)}</div>;};
const Confetti=({active})=>{if(!active)return null;return<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:999}}>{Array.from({length:40},(_,i)=><div key={i} style={{position:"absolute",left:`${10+Math.random()*80}%`,top:"-5%",width:6+Math.random()*8,height:4+Math.random()*5,background:["#FF6B6B","#4ECDC4","#FFE66D","#A855F7","#F472B6","#34D399","#60A5FA","#FBBF24"][i%8],borderRadius:2,animation:`confFall ${1+Math.random()*1.5}s ease-in ${Math.random()*0.5}s forwards`}}/>)}</div>;};
const Stars=({count,size=34})=><div style={{display:"flex",gap:4,justifyContent:"center",margin:"8px 0"}}>{[1,2,3,4,5].map(i=><span key={i} style={{fontSize:size,opacity:i<=count?1:0.2,filter:i<=count?"drop-shadow(0 2px 8px rgba(251,191,36,0.5))":"none",animation:i<=count?`starPop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i*0.12}s both`:"none"}}>{i<=count?"⭐":"☆"}</span>)}</div>;
const Mascot=({mood="happy",msg=""})=>{const f={happy:"😊",excited:"🤩",thinking:"🤔",listening:"👂",cheering:"🥳",speaking:"🗣️",sad:"🥺"};return<div style={{display:"flex",alignItems:"flex-end",gap:10,margin:"12px 0"}}><div style={{fontSize:42,animation:"mascotB 2s ease-in-out infinite",flexShrink:0}}>{f[mood]||"😊"}</div>{msg&&<div style={{background:"#fff",borderRadius:"18px 18px 18px 4px",padding:"10px 16px",fontSize:13,fontWeight:600,color:"#333",boxShadow:"0 4px 16px rgba(0,0,0,0.06)",animation:"bubPop 0.3s cubic-bezier(0.34,1.56,0.64,1)",maxWidth:260,fontFamily:"'Nunito',sans-serif",lineHeight:1.4}}>{msg}</div>}</div>;};
const SoundWave=()=><div style={{display:"flex",justifyContent:"center",gap:3,marginTop:14}}>{[1,2,3,4,5,6,7].map(i=><div key={i} style={{width:4,background:"#EF4444",borderRadius:4,animation:`sndWave 0.8s ease-in-out ${i*0.08}s infinite`}}/>)}</div>;
const ProgressRing=({pct,size=90,color="#22C55E"})=>{const r=(size-10)/2;const c=2*Math.PI*r;return<svg width={size} height={size} style={{transform:"rotate(-90deg)"}}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={10}/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={10} strokeDasharray={c} strokeDashoffset={c-((pct||0)/100)*c} strokeLinecap="round" style={{transition:"stroke-dashoffset 1s ease-out"}}/></svg>;};
const SubHead=({title,onBack,points})=><div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",background:"rgba(255,255,255,0.9)",backdropFilter:"blur(16px)",borderBottom:"1px solid #eee",position:"sticky",top:0,zIndex:50}}><button onClick={onBack} style={{padding:"8px 16px",borderRadius:14,border:"2px solid #eee",background:"#fff",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>← Back</button><span style={{fontFamily:"'Baloo 2',cursive",fontSize:18,fontWeight:700,color:"#1a1a2e"}}>{title}</span><div style={{display:"flex",alignItems:"center",gap:4,padding:"6px 14px",borderRadius:16,background:"linear-gradient(135deg,#FEF3C7,#FDE68A)",fontSize:13,fontWeight:800,color:"#92400E"}}><span style={{animation:"coinSp 2s ease-in-out infinite"}}>💰</span>{points||0}</div></div>;
const FlowSteps=({current,steps})=><div style={{display:"flex",gap:4,justifyContent:"center",margin:"14px 8px 10px",flexWrap:"wrap"}}>{steps.map((s,i)=>{const done=steps.findIndex(x=>x.id===current)>i;const act=current===s.id;return<div key={s.id} style={{display:"flex",alignItems:"center",gap:3}}><div style={{padding:"5px 10px",borderRadius:10,fontSize:10,fontWeight:800,fontFamily:"'Nunito',sans-serif",background:act?"linear-gradient(135deg,#6366F1,#8B5CF6)":done?"#22C55E":"#e5e7eb",color:(act||done)?"#fff":"#aaa",transition:"all 0.3s",transform:act?"scale(1.08)":"scale(1)"}}>{s.icon} {s.label}</div>{i<steps.length-1&&<span style={{color:"#ddd",fontSize:10}}>→</span>}</div>;})}</div>;
const ListeningBox=({transcript,onTapMic,isListening,error,onType,expected})=>{
  const[showType,setShowType]=useState(false);
  const[typed,setTyped]=useState("");
  return <div style={{textAlign:"center",padding:24,background:"#fff",borderRadius:28,border:"3px solid #EF444422",animation:"slideUp 0.3s ease-out"}}>
    {/* Auto-starting or actively listening — show mic animation */}
    {!error && (
      <>
        <div style={{display:"inline-flex",padding:24,borderRadius:"50%",background:"linear-gradient(135deg,#FEE2E2,#FECACA)",animation:"micP 1.5s ease-in-out infinite"}}>
          <span style={{fontSize:48}}>🎤</span>
        </div>
        <p style={{fontSize:18,fontWeight:800,color:"#DC2626",marginTop:12,animation:"listenBlink 1s ease-in-out infinite"}}>
          {isListening?"Listening... Speak now!":"Opening mic..."}
        </p>
        {transcript&&<p style={{fontSize:14,color:"#666",marginTop:8,fontStyle:"italic",animation:"fadeIn 0.3s"}}>Hearing: "{transcript}"</p>}
        <SoundWave/>
      </>
    )}
    {/* Error — show retry button */}
    {error && (
      <div style={{marginTop:8}}>
        <div style={{display:"inline-flex",padding:20,borderRadius:"50%",background:"#FEF2F2",marginBottom:12}}>
          <span style={{fontSize:40}}>🎤</span>
        </div>
        <p style={{fontSize:13,color:"#DC2626",fontWeight:700,marginBottom:14,padding:"8px 12px",background:"#FEF2F2",borderRadius:12}}>{error}</p>
        <button onClick={onTapMic} style={{padding:"14px 28px",borderRadius:18,background:"linear-gradient(135deg,#EF4444,#DC2626)",border:"none",color:"#fff",fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:"'Nunito',sans-serif",boxShadow:"0 6px 20px rgba(239,68,68,0.3)"}}>🎤 Tap to Try Again</button>
      </div>
    )}
    {/* Type fallback */}
    <div style={{marginTop:16,borderTop:"1px solid #eee",paddingTop:12}}>
      {!showType ? (
        <button onClick={()=>setShowType(true)} style={{fontSize:12,color:"#6366F1",fontWeight:700,background:"none",border:"none",cursor:"pointer",textDecoration:"underline",fontFamily:"'Nunito',sans-serif"}}>
          Mic not working? Type it instead ⌨️
        </button>
      ) : (
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <input value={typed} onChange={e=>setTyped(e.target.value)} placeholder={`Type "${expected}"...`}
            style={{flex:1,padding:"10px 14px",borderRadius:14,border:"2px solid #e5e7eb",fontSize:14,fontWeight:600,fontFamily:"'Nunito',sans-serif",outline:"none",boxSizing:"border-box"}}
            onKeyDown={e=>{if(e.key==="Enter"&&typed.trim())onType(typed.trim().toLowerCase());}}
          />
          <button onClick={()=>{if(typed.trim())onType(typed.trim().toLowerCase());}}
            style={{padding:"10px 18px",borderRadius:14,background:"#6366F1",color:"#fff",border:"none",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>Go</button>
        </div>
      )}
    </div>
  </div>;
};
const ResultBox=({acc,result,expected,onRetry,onDone,color,kidName,currentPoints})=>{
  const s=getStars(acc);const p=getStarPts(s);const nm=kidName||"Buddy";
  // Find nearest reward they can work toward
  const nextReward=REWARDS.filter(r=>r.cost>(currentPoints||0)).sort((a,b)=>a.cost-b.cost)[0];
  const ptsNeeded=nextReward?(nextReward.cost-(currentPoints||0)):0;
  return<div style={{textAlign:"center",padding:24,background:"#fff",borderRadius:28,boxShadow:"0 12px 40px rgba(0,0,0,0.06)",animation:"resBounce 0.5s cubic-bezier(0.34,1.56,0.64,1)"}}>
    <Stars count={s}/>
    <div style={{position:"relative",display:"inline-block",margin:"8px 0"}}>
      <ProgressRing pct={acc} color={acc>=75?"#22C55E":acc>=50?"#F59E0B":"#EF4444"}/>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center"}}>
        <span style={{fontFamily:"'Baloo 2',cursive",fontSize:26,fontWeight:800,color:acc>=75?"#22C55E":acc>=50?"#F59E0B":"#EF4444"}}>{acc}%</span>
      </div>
    </div>
    <Mascot mood={s>=4?"cheering":s>=3?"excited":s>=1?"happy":"sad"}
      msg={s===5?`WOW ${nm}! PERFECT! You're a SUPERSTAR! 🌟✨`:s===4?`AMAZING ${nm}! Almost perfect! So proud! 🎉`:s===3?`Great work ${nm}! You're getting better! 💪`:s>=1?`Good try ${nm}! Practice makes perfect! 🎯`:`Keep going ${nm}! You'll get it! 💫`}/>
    <div style={{display:"flex",gap:8,justifyContent:"center",margin:"10px 0",fontSize:13,fontWeight:700,flexWrap:"wrap"}}>
      <span style={{padding:"6px 14px",borderRadius:12,background:acc>=75?"#ECFDF5":"#FEF2F2",color:acc>=75?"#065F46":"#991B1B"}}>You said: "{result}"</span>
      <span style={{padding:"6px 14px",borderRadius:12,background:"#EEF2FF",color:"#3730A3"}}>Correct: "{expected}"</span>
    </div>
    {p>0&&<div style={{fontSize:24,fontWeight:900,color:"#22C55E",fontFamily:"'Baloo 2',cursive",margin:"10px 0",animation:"ptFly 0.5s ease-out"}}>
      🎉 +{p} points earned! 💰
    </div>}
    {/* REWARD MOTIVATION */}
    {nextReward&&<div style={{margin:"10px 0",padding:"12px 16px",background:"linear-gradient(135deg,#FFF7ED,#FFFBEB)",borderRadius:16,border:"2px solid #FBBF2433"}}>
      <p style={{fontSize:13,fontWeight:800,color:"#92400E"}}>
        {ptsNeeded<=20?`🔥 Almost there! Just ${ptsNeeded} more points for ${nextReward.emoji} ${nextReward.name}!`
        :ptsNeeded<=50?`💪 Only ${ptsNeeded} points to ${nextReward.emoji} ${nextReward.name}! Keep going!`
        :`🎯 ${ptsNeeded} points to ${nextReward.emoji} ${nextReward.name}! You can do it ${nm}!`}
      </p>
    </div>}
    <div style={{display:"flex",gap:10,marginTop:12}}>
      {acc<75&&<button onClick={onRetry} style={{flex:1,padding:14,borderRadius:18,border:"none",background:"linear-gradient(135deg,#F59E0B,#D97706)",color:"#fff",fontSize:15,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer"}}>🔄 Try Again</button>}
      <button onClick={onDone} style={{flex:1,padding:14,borderRadius:18,border:"none",background:`linear-gradient(135deg,${color||"#22C55E"},${color||"#16A34A"})`,color:"#fff",fontSize:15,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer"}}>{acc>=75?"🎉 Next!":"✅ Done"}</button>
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
  const[confetti,setConfetti]=useState(false);const[ptAnim,setPtAnim]=useState(null);const[rwdMsg,setRwdMsg]=useState(null);
  const[speakMode,setSpeakMode]=useState(true); // toggle for speech practice
  const[countdown,setCountdown]=useState(0); // 3,2,1 countdown
  const[activeSpellIdx,setActiveSpellIdx]=useState(-1); // which letter is being spelled
  const[spellStatus,setSpellStatus]=useState([]); // per-letter: 'waiting'|'listening'|'correct'|'skipped'
  const pRef=useRef(false);

  useEffect(()=>{if(!loaded)return;const t=setTimeout(()=>setScr(prof?"home":"onboard"),2500);return()=>clearTimeout(t);},[loaded,prof]);
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
  const getProgress=(t)=>{const c=prof?.completed?.[t]||[];if(t==="numbers")return Math.round((c.length/aCfg.max)*100);if(t==="phonics"){const x=Object.values(WCATS).reduce((s,cat)=>s+cat.words.length,0);return Math.round((c.length/x)*100);}return 0;};
  const goHome=()=>{stop();pRef.current=false;setScr("home");setSelNum(null);setNStep("idle");setPhW(null);setPhStep("idle");};

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
    await speak("Go.",{rate:0.75,pitch:1.0});
    await wait(250);
    onStart();
  };

  // SPELLING APPROACH: 
  // 1. App says each letter with a big pause → kid repeats along naturally
  // 2. After all letters, ONE mic session: "Now spell it yourself!"
  // 3. Accept any attempt — this is for 3-5 year olds
  // NO per-letter mic (doesn't work on mobile)

  const spellWord=async(word)=>{
    const letters=word.toLowerCase().split('');
    const LN={a:"A",b:"B",c:"C",d:"D",e:"E",f:"F",g:"G",h:"H",i:"I",j:"J",k:"K",l:"L",m:"M",n:"N",o:"O",p:"P",q:"Q",r:"R",s:"S",t:"T",u:"U",v:"V",w:"W",x:"X",y:"Y",z:"Z"};
    
    setSpellStatus(letters.map(()=>'waiting'));
    
    // ROUND 1: App says each letter, kid repeats along (call-and-response)
    for(let i=0;i<letters.length;i++){
      if(!pRef.current) return;
      const name=LN[letters[i]]||letters[i];
      
      setActiveSpellIdx(i);
      setSpellStatus(prev=>{const n=[...prev];n[i]='listening';return n;});
      
      // App says the letter boldly
      await speak(name,{rate:0.5,pitch:1.0,noCancel:true});
      
      // Long pause — kid repeats this letter during the pause
      // Visual shows 🎤 so they know to speak
      await wait(1500);
      
      // Mark as done (we trust they're repeating along)
      setSpellStatus(prev=>{const n=[...prev];n[i]='correct';return n;});
      await wait(200);
    }
    setActiveSpellIdx(-1);
    
    // ROUND 2: Kid spells it alone (one mic session for the whole word)
    if(speakMode && pRef.current){
      await wait(300);
      await speak(`Good. Now you spell it by yourself.`,{rate:0.75,pitch:1.0});
      await wait(500);
      
      // Reset visual for round 2
      setSpellStatus(letters.map(()=>'waiting'));
      setActiveSpellIdx(0);
      
      // ONE mic session — listen for kid to spell the whole word
      const heard = await new Promise((resolve)=>{
        const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
        if(!SR){resolve("");return;}
        try{rec.stop();}catch(e){}
        
        const r=new SR();
        r.continuous=true;
        r.interimResults=true;
        r.lang="en-US";
        let result="";
        let letterIdx=0;
        let silenceTimer=null;
        
        r.onresult=(e)=>{
          let all="";
          for(let x=0;x<e.results.length;x++){
            all+=e.results[x][0].transcript+" ";
          }
          result=all.toLowerCase().trim();
          
          // Update visual as letters are detected
          const spoken=result.replace(/[^a-z]/g,'');
          for(let j=letterIdx;j<letters.length&&j<spoken.length;j++){
            setSpellStatus(prev=>{const n=[...prev];n[j]='correct';return n;});
            setActiveSpellIdx(j+1<letters.length?j+1:-1);
            letterIdx=j+1;
          }
          
          // Reset silence timer on each result
          clearTimeout(silenceTimer);
          silenceTimer=setTimeout(()=>{
            try{r.stop();}catch(e){}
          },3000);
        };
        
        r.onerror=()=>resolve(result);
        r.onend=()=>resolve(result);
        
        try{r.start();}catch(e){resolve("");}
        
        // Max 15 seconds for full spelling
        setTimeout(()=>{try{r.stop();}catch(e){}},15000);
      });
      
      setActiveSpellIdx(-1);
      
      // Mark remaining letters
      if(heard){
        setSpellStatus(letters.map(()=>'correct'));
      }
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
    await speak(`Repeat after me.`,{rate:0.75,pitch:1.0});await wait(400);if(!pRef.current)return;
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
      setNStep("countdown");
      await speak(`${kidName}, your turn. Say, ${w}.`,{rate:0.75,pitch:1.0});await wait(400);if(!pRef.current)return;
      await doCountdown(()=>{
        setNStep("listening");pRef.current=false;
        rec.start(handleNumResult);
      });
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
    await speak(`${kidName}, let's try one more time. Say, ${NW[selNum]}.`,{rate:0.75,pitch:1.0});await wait(300);
    await doCountdown(()=>{
      setNStep("listening");
      rec.start(handleNumResult);
    });
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
    await speak(`Repeat after me.`,{rate:0.75,pitch:1.0});await wait(400);if(!pRef.current)return;
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
      setPhStep("countdown");
      await speak(`${kidName}, your turn. Say, ${wd.word}.`,{rate:0.75,pitch:1.0});await wait(400);if(!pRef.current)return;
      await doCountdown(()=>{
        setPhStep("listening");pRef.current=false;
        rec.start(handlePhResult);
      });
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
    await speak(`${kidName}, let's try again. Say, ${phW.word}.`,{rate:0.75,pitch:1.0});await wait(300);
    await doCountdown(()=>{
      setPhStep("listening");
      rec.start(handlePhResult);
    });
  };

  const buyR=(r)=>{if((prof?.points||0)<r.cost)return;save({...prof,points:prof.points-r.cost,rewards:[...(prof.rewards||[]),{...r,at:Date.now()}]});boom();setRwdMsg(`${r.emoji} Yay! You earned ${r.name}! Show your parents!`);setTimeout(()=>setRwdMsg(null),4000);};

  // ═══ SCREENS ═══

  if(scr==="splash")return<div style={{background:"linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)",position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}><Particles count={20} emojis={["⭐","✨","🌟","💫"]}/><div style={{textAlign:"center",zIndex:2,animation:"splashPop 0.8s cubic-bezier(0.34,1.56,0.64,1)"}}><div style={{fontSize:90,animation:"mascotB 2s ease-in-out infinite"}}>🧒</div><h1 style={{fontFamily:"'Baloo 2',cursive",fontSize:48,color:"#FFE66D",fontWeight:800}}>Little Genius</h1><p style={{color:"#ffffff88",fontSize:14,fontWeight:600,fontFamily:"'Nunito',sans-serif",letterSpacing:3,textTransform:"uppercase"}}>Learn • Play • Grow</p><div style={{display:"flex",gap:12,justifyContent:"center",marginTop:36}}>{[0,1,2].map(i=><div key={i} style={{width:12,height:12,borderRadius:"50%",background:"#FFE66D",animation:`dotB 1.2s ease-in-out ${i*0.15}s infinite`}}/>)}</div></div><style>{CSS}</style></div>;

  if(scr==="onboard")return<div style={{minHeight:"100vh",background:"linear-gradient(160deg,#fef9c3,#fce7f3,#e0e7ff)",display:"flex",alignItems:"center",justifyContent:"center",padding:16,position:"relative",overflow:"hidden"}}><Particles count={8} emojis={["🌸","🦋","⭐","🌈"]}/><div style={{background:"rgba(255,255,255,0.92)",backdropFilter:"blur(20px)",borderRadius:32,padding:"28px 24px",maxWidth:400,width:"100%",boxShadow:"0 24px 80px rgba(99,102,241,0.12)",zIndex:2,animation:"slideUp 0.5s ease-out"}}>
    {obSt===0?<><div style={{textAlign:"center",fontSize:56,animation:"mascotB 2s ease-in-out infinite"}}>👋</div><h2 style={{fontFamily:"'Baloo 2',cursive",fontSize:26,textAlign:"center",color:"#1e1b4b",margin:"8px 0"}}>Hello!</h2><label style={{fontSize:11,fontWeight:800,color:"#6366F1",textTransform:"uppercase",letterSpacing:1,display:"block",marginBottom:6,fontFamily:"'Nunito',sans-serif"}}>Your Name</label><input value={obN} onChange={e=>setObN(e.target.value)} placeholder="Type name..." style={{width:"100%",padding:"12px 16px",border:"3px solid #e5e7eb",borderRadius:16,fontSize:16,fontWeight:700,fontFamily:"'Nunito',sans-serif",outline:"none",boxSizing:"border-box",background:"#fafafa"}}/><label style={{fontSize:11,fontWeight:800,color:"#6366F1",textTransform:"uppercase",letterSpacing:1,display:"block",margin:"16px 0 6px",fontFamily:"'Nunito',sans-serif"}}>Age</label><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{[3,4,5,6,7,8].map(a=><button key={a} onClick={()=>setObA(a)} style={{padding:"10px 18px",borderRadius:14,border:"3px solid",borderColor:obA===a?"#6366F1":"#e5e7eb",background:obA===a?"linear-gradient(135deg,#6366F1,#8B5CF6)":"#fff",color:obA===a?"#fff":"#333",fontSize:18,fontWeight:800,fontFamily:"'Baloo 2',cursive",cursor:"pointer",transition:"all 0.3s",transform:obA===a?"scale(1.1)":"scale(1)"}}>{a}</button>)}</div><button onClick={()=>setObSt(1)} style={{width:"100%",padding:14,borderRadius:18,border:"none",background:"linear-gradient(135deg,#6366F1,#8B5CF6)",color:"#fff",fontSize:16,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",marginTop:20}}>Next →</button></>:
    <><h2 style={{fontFamily:"'Baloo 2',cursive",fontSize:24,textAlign:"center",color:"#1e1b4b"}}>Pick your look! ✨</h2><div style={{display:"flex",gap:12,justifyContent:"center",margin:"14px 0"}}>{[{g:"boy",e:"👦",c:"#6366F1"},{g:"girl",e:"👧",c:"#EC4899"}].map(x=><button key={x.g} onClick={()=>setObG(x.g)} style={{flex:1,padding:18,borderRadius:20,border:"3px solid",borderColor:obG===x.g?x.c:"#e5e7eb",background:obG===x.g?"#EEF2FF":"#fff",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,transition:"all 0.3s"}}><span style={{fontSize:40}}>{x.e}</span><span style={{fontWeight:800,fontSize:13,fontFamily:"'Nunito',sans-serif"}}>{x.g.charAt(0).toUpperCase()+x.g.slice(1)}</span></button>)}</div><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>{AVATARS[obG].map((av,i)=><button key={i} onClick={()=>setObAv(i)} style={{padding:12,borderRadius:16,border:"3px solid",borderColor:obAv===i?"#6366F1":"#e5e7eb",background:"#fff",fontSize:30,cursor:"pointer",transition:"all 0.3s",transform:obAv===i?"scale(1.15)":"scale(1)",display:"flex",alignItems:"center",justifyContent:"center"}}>{av}</button>)}</div><div style={{display:"flex",gap:10,marginTop:18}}><button onClick={()=>setObSt(0)} style={{flex:1,padding:12,borderRadius:16,border:"3px solid #e5e7eb",background:"#fff",fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer"}}>← Back</button><button onClick={()=>{save({name:obN||"Buddy",age:obA,gender:obG,avatar:obAv,points:0,totalEarned:0,completed:{},rewards:[],at:Date.now()});setScr("home");}} style={{flex:2,padding:12,borderRadius:16,border:"none",background:"linear-gradient(135deg,#6366F1,#8B5CF6)",color:"#fff",fontSize:16,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer"}}>Let's Go! 🚀</button></div></>}
  </div><style>{CSS}</style></div>;

  if(scr==="home")return<div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",background:"#f0f0fa",maxWidth:520,margin:"0 auto",position:"relative",overflow:"hidden"}}><Particles/><Confetti active={confetti}/>{ptAnim&&<div style={{position:"fixed",top:20,right:20,zIndex:999,animation:"ptFly 1.5s ease-out forwards",fontFamily:"'Baloo 2',cursive",fontSize:28,fontWeight:800,color:"#22C55E"}}>{ptAnim}</div>}<div style={{background:"linear-gradient(135deg,#6366F1,#8B5CF6,#A855F7)",padding:"20px 20px 44px",borderRadius:"0 0 36px 36px",position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:-30,right:-30,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,0.08)"}}/><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative",zIndex:2}}><div style={{display:"flex",alignItems:"center",gap:10}}><div style={{fontSize:36,animation:"mascotB 3s ease-in-out infinite"}}>{AVATARS[prof?.gender||"boy"][prof?.avatar||0]}</div><div><div style={{color:"#fff",fontWeight:800,fontSize:16}}>{prof?.name||"Buddy"}</div><div style={{color:"#ffffffaa",fontSize:11,fontWeight:600}}>Age {prof?.age||4} • {aCfg.diff}</div></div></div><div style={{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.15)",padding:"8px 16px",borderRadius:24}}><span style={{fontSize:18,animation:"coinSp 2s ease-in-out infinite"}}>💰</span><span style={{color:"#FFE66D",fontWeight:900,fontSize:18,fontFamily:"'Baloo 2',cursive"}}>{prof?.points||0}</span></div></div><h2 style={{fontFamily:"'Baloo 2',cursive",color:"#fff",fontSize:22,marginTop:14,position:"relative",zIndex:2}}>What shall we learn? 🎯</h2></div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,padding:"18px 16px 10px",marginTop:-22,position:"relative",zIndex:3}}>{[{id:"numbers",icon:"🔢",title:"Numbers",sub:`1 to ${aCfg.max}`,grad:"linear-gradient(135deg,#FF6B6B,#ee5a24)"},{id:"phonics",icon:"🔤",title:"Phonics",sub:"Words & sounds",grad:"linear-gradient(135deg,#4ECDC4,#0abde3)"},{id:"shapes",icon:"🔷",title:"Shapes",sub:"Learn shapes",grad:"linear-gradient(135deg,#A855F7,#7c3aed)"},{id:"colors",icon:"🎨",title:"Colors",sub:"Rainbow fun!",grad:"linear-gradient(135deg,#F472B6,#ec4899)"},{id:"rewards",icon:"🎁",title:"Rewards",sub:"Spend points!",grad:"linear-gradient(135deg,#FBBF24,#f59e0b)"},{id:"settings",icon:"⚙️",title:"Settings",sub:"Profile",grad:"linear-gradient(135deg,#94A3B8,#64748b)"}].map((m,i)=><button key={m.id} onClick={()=>setScr(m.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"20px 10px 14px",borderRadius:22,border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",background:m.grad,animation:`cardIn 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i*0.08}s both`,position:"relative",overflow:"hidden"}}><span style={{fontSize:36,marginBottom:4,animation:`iconF 3s ease-in-out ${i*0.3}s infinite`}}>{m.icon}</span><span style={{color:"#fff",fontWeight:800,fontSize:15,fontFamily:"'Baloo 2',cursive"}}>{m.title}</span><span style={{color:"rgba(255,255,255,0.85)",fontSize:11,fontWeight:600}}>{m.sub}</span>{(m.id==="numbers"||m.id==="phonics")&&<div style={{width:"80%",height:5,background:"rgba(255,255,255,0.25)",borderRadius:6,marginTop:8,overflow:"hidden"}}><div style={{height:"100%",background:"#fff",borderRadius:6,width:`${getProgress(m.id)}%`,transition:"width 0.8s"}}/></div>}</button>)}</div>
    <div style={{margin:"6px 16px 16px",padding:"14px 16px",background:"linear-gradient(135deg,#FFF7ED,#FFFBEB)",borderRadius:18,border:"2px solid #FBBF2433",display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:26,animation:"tipW 2s ease-in-out infinite"}}>💡</span><p style={{fontSize:12,color:"#92400E",fontWeight:700,flex:1}}>⭐⭐⭐⭐⭐ = 20 points per word!</p></div><style>{CSS}</style></div>;

  // ═══ NUMBER DETAIL with ANIMATED SCENE ═══
  if(scr==="numbers"&&selNum){const w=NW[selNum];const scene=getScene(selNum);const color=nClr(selNum);const phs=NPH[selNum];return<div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",background:"#f0f0fa",maxWidth:520,margin:"0 auto",position:"relative"}}><Confetti active={confetti}/>{ptAnim&&<div style={{position:"fixed",top:20,right:20,zIndex:999,animation:"ptFly 1.5s ease-out forwards",fontFamily:"'Baloo 2',cursive",fontSize:28,fontWeight:800,color:"#22C55E"}}>{ptAnim}</div>}<SubHead title={`Number ${selNum}`} onBack={()=>{stop();pRef.current=false;setSelNum(null);setNStep("idle");}} points={prof?.points||0}/>
    {nStep!=="idle"&&<FlowSteps current={nStep} steps={NUM_STEPS}/>}
    <div style={{padding:"12px 16px"}}>
      {/* 🎬 ANIMATED SCENE */}
      <AnimatedScene num={selNum} active={nStep==="saying_sentence"}/>
      
      {/* Number + Word below scene */}
      <div style={{textAlign:"center",marginTop:12}}>
        <span style={{fontFamily:"'Baloo 2',cursive",fontSize:56,fontWeight:800,color,lineHeight:1,animation:nStep==="saying_number"?"numPulse 0.8s ease-in-out infinite":"none"}}>{selNum}</span>
        <div style={{fontFamily:"'Baloo 2',cursive",fontSize:22,color:"#6366F1",fontWeight:600,textTransform:"capitalize"}}>{w}</div>
      </div>

      {/* Phonemes */}
      {phs&&(nStep==="saying_phonics"||nStep==="idle")&&<div style={{marginTop:12,background:"#fff",borderRadius:20,padding:14,animation:"slideUp 0.4s ease-out"}}><div style={{fontSize:11,fontWeight:800,color:"#6366F1",textTransform:"uppercase",letterSpacing:1,marginBottom:8}}>🔊 Phonics</div><div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>{phs.map((ph,i)=>{const d=gPh(ph);const act=aPhI===i;return<button key={i} onClick={()=>{if(!pRef.current)speak(d.s,{rate:0.55,pitch:1.1});}} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"10px 14px 8px",borderRadius:14,border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",minWidth:44,background:act?color:"#f3f4f6",color:act?"#fff":"#333",transform:act?"scale(1.3) translateY(-4px)":"scale(1)",boxShadow:act?`0 8px 24px ${color}55`:"0 2px 8px rgba(0,0,0,0.04)",transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}><span style={{fontSize:16,fontWeight:900,fontFamily:"'Baloo 2',cursive"}}>{ph.toUpperCase()}</span><span style={{fontSize:9,fontWeight:700,color:act?"#fffc":"#999",marginTop:2}}>{d.d}</span></button>;})}</div></div>}

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
              <span style={{fontSize:11,color:"#999",fontWeight:600}}>{speakMode?"Speak ON":"Speak OFF"}</span>
            </div>
            <button onClick={()=>playNum(selNum)} style={{padding:"10px 20px",borderRadius:14,border:"none",color:"#fff",fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",background:`linear-gradient(135deg,${color},${color}dd)`,display:"flex",alignItems:"center",gap:6}}>🔄 Replay</button>
          </div>
        </>}
        {nStep==="saying_number"&&<Mascot mood="speaking" msg={`Listen! "${w.toUpperCase()}" 🔊`}/>}
        {/* INTERACTIVE SPELLING */}
        {nStep==="spelling"&&(
          <div style={{animation:"slideUp 0.3s ease-out"}}>
            <Mascot mood="thinking" msg={speakMode?"Repeat each letter after me! 🔤":"Follow along! 🔤"}/>
            <div style={{padding:16,background:"#fff",borderRadius:20}}>
              <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
                {w.replace(/\s/g,'').toUpperCase().split('').map((letter,i)=>{
                  const st=spellStatus[i]||'waiting';
                  const isActive=activeSpellIdx===i;
                  return <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                    <span style={{
                      fontSize:32,fontFamily:"'Baloo 2',cursive",fontWeight:800,
                      padding:"10px 14px",borderRadius:16,minWidth:44,textAlign:"center",
                      background:isActive?color:st==='correct'?"#22C55E":st==='skipped'?"#F59E0B":"#f3f4f6",
                      color:(isActive||st==='correct'||st==='skipped')?"#fff":"#ccc",
                      transform:isActive?"scale(1.3) translateY(-6px)":"scale(1)",
                      boxShadow:isActive?`0 8px 24px ${color}55`:"none",
                      transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                    }}>{letter}</span>
                    {isActive&&speakMode&&<span style={{fontSize:16,animation:"micP 1.5s ease-in-out infinite",marginTop:2}}>🎤</span>}
                    {st==='correct'&&!isActive&&<span style={{fontSize:14}}>✅</span>}
                    {st==='skipped'&&!isActive&&<span style={{fontSize:12,color:"#F59E0B"}}>⏭️</span>}
                  </div>;
                })}
              </div>
              {speakMode&&activeSpellIdx>=0&&<div style={{textAlign:"center",marginTop:14,padding:"10px 16px",background:"linear-gradient(135deg,#FEE2E2,#FECACA)",borderRadius:14,animation:"micP 2s ease-in-out infinite"}}>
                <p style={{fontSize:14,fontWeight:800,color:"#DC2626"}}>🗣️ Say it back!</p>
              </div>}
            </div>
          </div>
        )}
        {nStep==="saying_sentence"&&<Mascot mood="excited" msg="Listen to this sentence! 🎬"/>}
        {nStep==="saying_phonics"&&<Mascot mood="thinking" msg="Let's understand how to speak this word... 🔡"/>}
        {/* COUNTDOWN */}
        {nStep==="countdown"&&(
          <div style={{textAlign:"center",padding:24,background:"#fff",borderRadius:24,animation:"slideUp 0.3s ease-out"}}>
            <Mascot mood="listening" msg={`Say "${w.toUpperCase()}" when I say Start!`}/>
            <div style={{fontSize:72,fontFamily:"'Baloo 2',cursive",fontWeight:800,color:countdown>0?color:"#22C55E",animation:"numPulse 0.5s ease-in-out infinite",marginTop:8}}>
              {countdown>0?countdown:"🎤 Start!"}
            </div>
          </div>
        )}
        {nStep==="listening"&&<ListeningBox transcript={rec.txt} onTapMic={tapMicNum} isListening={rec.on} error={rec.err} onType={typeNum} expected={NW[selNum]}/>}
        {nStep==="result"&&spRes!==null&&<ResultBox acc={spAcc} result={spRes} expected={w} onRetry={retryNum} onDone={()=>{setNStep("idle");setSpRes(null);}} color={color} kidName={kidName} currentPoints={prof?.points||0}/>}
      </div>
    </div><style>{CSS}</style></div>;}

  // ═══ NUMBERS GRID ═══
  if(scr==="numbers")return<div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",background:"#f0f0fa",maxWidth:520,margin:"0 auto"}}><Particles count={8}/><SubHead title={`Numbers 1-${aCfg.max}`} onBack={goHome} points={prof?.points||0}/><div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:8,padding:"14px 12px"}}>{Array.from({length:aCfg.max}).map((_,i)=>{const n=i+1;const done=isDone("numbers",n);return<button key={n} onClick={()=>{setSelNum(n);setNStep("idle");setTimeout(()=>playNum(n),100);}} style={{position:"relative",padding:"12px 4px 8px",borderRadius:14,border:`2px solid ${done?nClr(n)+"44":"#eee"}`,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,fontFamily:"'Nunito',sans-serif",background:done?`linear-gradient(135deg,${nClr(n)}08,${nClr(n)}15)`:"#fff",animation:`cardIn 0.3s cubic-bezier(0.34,1.56,0.64,1) ${i*0.02}s both`,boxShadow:"0 2px 8px rgba(0,0,0,0.04)"}}>{done&&<span style={{position:"absolute",top:2,right:3,fontSize:10,color:"#22C55E",fontWeight:900}}>✓</span>}<span style={{fontFamily:"'Baloo 2',cursive",fontSize:18,fontWeight:700,color:nClr(n)}}>{n}</span></button>;})}</div><style>{CSS}</style></div>;

  // ═══ PHONICS DETAIL ═══
  if(scr==="phonics"&&phW){const cc=WCATS[phCat]?.color||"#6366F1";return<div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",background:"#f0f0fa",maxWidth:520,margin:"0 auto",position:"relative"}}><Confetti active={confetti}/>{ptAnim&&<div style={{position:"fixed",top:20,right:20,zIndex:999,animation:"ptFly 1.5s ease-out forwards",fontFamily:"'Baloo 2',cursive",fontSize:28,fontWeight:800,color:"#22C55E"}}>{ptAnim}</div>}<SubHead title="Phonics" onBack={()=>{stop();pRef.current=false;setPhW(null);setPhStep("idle");}} points={prof?.points||0}/>
    {phStep!=="idle"&&<FlowSteps current={phStep} steps={PH_STEPS}/>}
    <div style={{padding:16}}><div style={{background:"#fff",borderRadius:24,padding:24,textAlign:"center",border:`3px solid ${cc}22`,animation:"slideUp 0.4s ease-out"}}><span style={{fontSize:68,display:"block",animation:"mascotB 3s ease-in-out infinite"}}>{phW.img}</span><h2 style={{fontFamily:"'Baloo 2',cursive",fontSize:36,fontWeight:800,color:phStep==="saying_word"?cc:"#1a1a2e",letterSpacing:3,margin:"8px 0",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>{phW.word.toUpperCase()}{phStep==="saying_word"&&<span style={{animation:"pulse 0.5s infinite",fontSize:22}}>🔊</span>}</h2>
      {phStep==="saying_sentence"&&<div style={{padding:"10px 16px",background:"linear-gradient(135deg,#EEF2FF,#E0E7FF)",borderRadius:14,animation:"slideUp 0.3s ease-out",marginBottom:10}}><span style={{fontSize:13,fontWeight:700,color:"#4338CA"}}>💬 {phW.sentence}</span></div>}
      <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>{phW.ph.map((ph,i)=>{const d=gPh(ph);const act=phAI===i;return<button key={i} onClick={()=>{if(!pRef.current)speak(d.s,{rate:0.55,pitch:1.1});}} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:"10px 14px 8px",borderRadius:14,border:"none",cursor:"pointer",fontFamily:"'Nunito',sans-serif",minWidth:46,background:act?cc:"#f3f4f6",color:act?"#fff":"#333",transform:act?"scale(1.3) translateY(-4px)":"scale(1)",boxShadow:act?`0 8px 24px ${cc}55`:"0 2px 8px rgba(0,0,0,0.04)",transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)"}}><span style={{fontSize:16,fontWeight:900,fontFamily:"'Baloo 2',cursive"}}>{ph.toUpperCase()}</span><span style={{fontSize:9,fontWeight:700,color:act?"#fffc":"#999",marginTop:2}}>{d.d}</span></button>;})}</div></div>
      <div style={{marginTop:14}}>
        {phStep==="idle"&&<>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"#fff",borderRadius:14,flex:1}}>
              <span style={{fontSize:12,fontWeight:700,color:speakMode?"#22C55E":"#999"}}>🎤</span>
              <button onClick={()=>setSpeakMode(!speakMode)} style={{width:40,height:22,borderRadius:11,border:"none",cursor:"pointer",background:speakMode?"#22C55E":"#ddd",position:"relative",transition:"background 0.3s"}}>
                <div style={{width:18,height:18,borderRadius:9,background:"#fff",position:"absolute",top:2,left:speakMode?20:2,transition:"left 0.3s",boxShadow:"0 1px 3px rgba(0,0,0,0.2)"}}/>
              </button>
              <span style={{fontSize:11,color:"#999",fontWeight:600}}>{speakMode?"Speak ON":"Speak OFF"}</span>
            </div>
            <button onClick={()=>playPh(phW)} style={{padding:"10px 20px",borderRadius:14,border:"none",color:"#fff",fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",background:`linear-gradient(135deg,${cc},${cc}dd)`,display:"flex",alignItems:"center",gap:6}}>🔄 Replay</button>
          </div>
        </>}
        {phStep==="saying_word"&&<Mascot mood="speaking" msg={`Listen! "${phW.word.toUpperCase()}" 🔊`}/>}
        {phStep==="spelling"&&(
          <div style={{animation:"slideUp 0.3s ease-out"}}>
            <Mascot mood="thinking" msg={speakMode?"Repeat each letter after me! 🔤":"Follow along! 🔤"}/>
            <div style={{padding:16,background:"#fff",borderRadius:20}}>
              <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
                {phW.word.toUpperCase().split('').map((letter,i)=>{
                  const st=spellStatus[i]||'waiting';
                  const isActive=activeSpellIdx===i;
                  return <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
                    <span style={{
                      fontSize:32,fontFamily:"'Baloo 2',cursive",fontWeight:800,
                      padding:"10px 14px",borderRadius:16,minWidth:44,textAlign:"center",
                      background:isActive?cc:st==='correct'?"#22C55E":st==='skipped'?"#F59E0B":"#f3f4f6",
                      color:(isActive||st==='correct'||st==='skipped')?"#fff":"#ccc",
                      transform:isActive?"scale(1.3) translateY(-6px)":"scale(1)",
                      boxShadow:isActive?`0 8px 24px ${cc}55`:"none",
                      transition:"all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                    }}>{letter}</span>
                    {isActive&&speakMode&&<span style={{fontSize:16,animation:"micP 1.5s ease-in-out infinite",marginTop:2}}>🎤</span>}
                    {st==='correct'&&!isActive&&<span style={{fontSize:14}}>✅</span>}
                    {st==='skipped'&&!isActive&&<span style={{fontSize:12,color:"#F59E0B"}}>⏭️</span>}
                  </div>;
                })}
              </div>
              {speakMode&&activeSpellIdx>=0&&<div style={{textAlign:"center",marginTop:14,padding:"10px 16px",background:"linear-gradient(135deg,#FEE2E2,#FECACA)",borderRadius:14,animation:"micP 2s ease-in-out infinite"}}>
                <p style={{fontSize:14,fontWeight:800,color:"#DC2626"}}>🗣️ Say it back!</p>
              </div>}
            </div>
          </div>
        )}
        {phStep==="saying_sentence"&&<Mascot mood="excited" msg="Listen to this sentence! 💬"/>}
        {phStep==="saying_phonics"&&<Mascot mood="thinking" msg="Let's understand how to speak this word... 🔡"/>}
        {phStep==="countdown"&&(
          <div style={{textAlign:"center",padding:24,background:"#fff",borderRadius:24,animation:"slideUp 0.3s ease-out"}}>
            <Mascot mood="listening" msg={`Say "${phW.word.toUpperCase()}" when I say Start!`}/>
            <div style={{fontSize:72,fontFamily:"'Baloo 2',cursive",fontWeight:800,color:countdown>0?cc:"#22C55E",animation:"numPulse 0.5s ease-in-out infinite",marginTop:8}}>
              {countdown>0?countdown:"🎤 Start!"}
            </div>
          </div>
        )}
        {phStep==="listening"&&<ListeningBox transcript={rec.txt} onTapMic={tapMicPh} isListening={rec.on} error={rec.err} onType={typePh} expected={phW?.word||""}/>}
        {phStep==="result"&&phRes!==null&&<ResultBox acc={phAcc} result={phRes} expected={phW.word} onRetry={retryPh} onDone={()=>{setPhStep("idle");setPhRes(null);}} color={cc} kidName={kidName} currentPoints={prof?.points||0}/>}
      </div>
    </div><style>{CSS}</style></div>;}

  // ═══ PHONICS GRID ═══
  if(scr==="phonics")return<div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",background:"#f0f0fa",maxWidth:520,margin:"0 auto"}}><Particles count={8}/><SubHead title="Phonics" onBack={goHome} points={prof?.points||0}/><nav style={{display:"flex",gap:8,padding:"10px 16px",overflowX:"auto",background:"rgba(255,255,255,0.9)",borderBottom:"1px solid #eee"}}>{Object.entries(WCATS).map(([k,d])=><button key={k} onClick={()=>setPhCat(k)} style={{padding:"7px 14px",borderRadius:18,border:"2px solid",borderColor:phCat===k?d.color:"#eee",background:phCat===k?d.color:"#fff",color:phCat===k?"#fff":"#555",fontSize:12,fontWeight:800,whiteSpace:"nowrap",cursor:"pointer",fontFamily:"'Nunito',sans-serif",flexShrink:0,transition:"all 0.3s"}}>{d.emoji} {k.charAt(0).toUpperCase()+k.slice(1)}</button>)}</nav><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,padding:16}}>{WCATS[phCat]?.words.map((w,i)=>{const done=isDone("phonics",w.word);const cc=WCATS[phCat].color;return<button key={w.word} onClick={()=>{setPhW(w);setPhStep("idle");setTimeout(()=>playPh(w),100);}} style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",padding:"18px 10px 12px",borderRadius:20,border:`2px solid ${done?cc+"44":"#eee"}`,background:done?`linear-gradient(135deg,${cc}05,${cc}10)`:"#fff",cursor:"pointer",fontFamily:"'Nunito',sans-serif",animation:`cardIn 0.3s cubic-bezier(0.34,1.56,0.64,1) ${i*0.05}s both`,boxShadow:"0 4px 16px rgba(0,0,0,0.04)"}}>{done&&<span style={{position:"absolute",top:6,right:6,width:20,height:20,borderRadius:"50%",background:"#22C55E",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:900}}>✓</span>}<span style={{fontSize:34,animation:`iconF 3s ease-in-out ${i*0.2}s infinite`}}>{w.img}</span><span style={{fontFamily:"'Baloo 2',cursive",fontSize:18,fontWeight:700,marginTop:4}}>{w.word}</span><div style={{display:"flex",gap:3,marginTop:5}}>{w.ph.map((ph,j)=><span key={j} style={{fontSize:9,fontWeight:800,background:"#f3f4f6",color:"#888",padding:"2px 7px",borderRadius:7}}>{ph}</span>)}</div></button>;})}</div><style>{CSS}</style></div>;

  // ═══ SHAPES ═══
  if(scr==="shapes")return<div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",background:"#f0f0fa",maxWidth:520,margin:"0 auto"}}><SubHead title="Shapes" onBack={goHome} points={prof?.points||0}/><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,padding:16}}>{SHAPES.map((s,i)=><button key={s.name} onClick={()=>speak(s.name,{rate:0.8})} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:20,borderRadius:22,border:"2px solid #eee",background:"#fff",cursor:"pointer",fontFamily:"'Nunito',sans-serif",animation:`cardIn 0.4s ease ${i*0.08}s both`}}><span style={{fontSize:48,animation:`iconF 3s ease-in-out ${i*0.3}s infinite`}}>{s.emoji}</span><span style={{fontFamily:"'Baloo 2',cursive",fontSize:16,fontWeight:700,marginTop:6,textTransform:"capitalize"}}>{s.name}</span><span style={{fontSize:11,color:"#888",fontWeight:600}}>{s.desc}</span></button>)}</div><style>{CSS}</style></div>;

  // ═══ COLORS ═══
  if(scr==="colors")return<div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",background:"#f0f0fa",maxWidth:520,margin:"0 auto"}}><SubHead title="Colors" onBack={goHome} points={prof?.points||0}/><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:12,padding:16}}>{COLORSDATA.map((c,i)=><button key={c.name} onClick={()=>speak(c.name,{rate:0.8})} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:16,borderRadius:22,border:"2px solid #eee",background:"#fff",cursor:"pointer",fontFamily:"'Nunito',sans-serif",animation:`cardIn 0.4s ease ${i*0.08}s both`}}><div style={{width:54,height:54,borderRadius:16,background:c.hex,marginBottom:6,boxShadow:`0 4px 12px ${c.hex}44`}}/><span style={{fontFamily:"'Baloo 2',cursive",fontSize:16,fontWeight:700}}>{c.name}</span><span style={{fontSize:22}}>{c.emoji}</span><div style={{display:"flex",gap:3,flexWrap:"wrap",justifyContent:"center",marginTop:4}}>{c.things.map((t,j)=><span key={j} style={{fontSize:9,fontWeight:700,background:"#f3f4f6",color:"#666",padding:"2px 7px",borderRadius:6}}>{t}</span>)}</div></button>)}</div><style>{CSS}</style></div>;

  // ═══ REWARDS ═══
  if(scr==="rewards")return<div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",background:"#f0f0fa",maxWidth:520,margin:"0 auto",position:"relative"}}><Confetti active={confetti}/><SubHead title="Rewards 🎁" onBack={goHome} points={prof?.points||0}/>{rwdMsg&&<div style={{position:"fixed",top:60,left:16,right:16,padding:14,background:"linear-gradient(135deg,#22C55E,#16A34A)",color:"#fff",borderRadius:18,fontWeight:800,textAlign:"center",zIndex:999,animation:"slideUp 0.3s ease-out",fontSize:13,maxWidth:490,margin:"0 auto"}}>{rwdMsg}</div>}<div style={{margin:"14px 16px 0",padding:"18px 20px",background:"linear-gradient(135deg,#FBBF24,#F59E0B)",borderRadius:22,display:"flex",alignItems:"center",gap:14,boxShadow:"0 8px 28px #FBBF2444"}}><span style={{fontSize:36,animation:"coinSp 2s ease-in-out infinite"}}>💰</span><div><div style={{color:"#fff",fontFamily:"'Baloo 2',cursive",fontSize:28,fontWeight:800}}>{prof?.points||0}</div><div style={{color:"#ffffffcc",fontSize:11,fontWeight:700}}>Earn more by practicing!</div></div></div><p style={{padding:"8px 16px",fontSize:11,color:"#888",fontWeight:700,textAlign:"center"}}>🎉 Show parents when you earn a reward!</p><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,padding:"0 16px 20px"}}>{REWARDS.map((r,i)=>{const can=(prof?.points||0)>=r.cost;return<button key={r.id} onClick={()=>can&&buyR(r)} disabled={!can} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:16,borderRadius:20,border:`2px solid ${can?"#eee":"#f3f4f6"}`,background:can?"#fff":"#fafafa",cursor:can?"pointer":"default",fontFamily:"'Nunito',sans-serif",opacity:can?1:0.4,animation:`cardIn 0.3s ease ${i*0.05}s both`}}><span style={{fontSize:36}}>{r.emoji}</span><span style={{fontFamily:"'Baloo 2',cursive",fontSize:14,fontWeight:700,marginTop:4}}>{r.name}</span><span style={{fontSize:10,color:"#888",fontWeight:600}}>{r.desc}</span><span style={{marginTop:6,padding:"5px 14px",borderRadius:12,color:"#fff",fontSize:12,fontWeight:800,background:can?"linear-gradient(135deg,#22C55E,#16A34A)":"#94A3B8"}}>💰 {r.cost}</span></button>;})}</div>{(prof?.rewards||[]).length>0&&<div style={{padding:"0 16px 20px"}}><h3 style={{fontFamily:"'Baloo 2',cursive",fontSize:16,fontWeight:700,marginBottom:8}}>🏆 Your Rewards</h3>{(prof?.rewards||[]).slice(-6).reverse().map((r,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",background:"#fff",borderRadius:14,border:"1px solid #eee",marginBottom:6}}><span style={{fontSize:24}}>{r.emoji}</span><span style={{fontWeight:800,fontSize:13,flex:1}}>{r.name}</span><span style={{fontSize:10,color:"#999"}}>{new Date(r.at).toLocaleDateString()}</span></div>)}</div>}<style>{CSS}</style></div>;

  // ═══ SETTINGS ═══
  if(scr==="settings")return<div style={{fontFamily:"'Nunito',sans-serif",minHeight:"100vh",background:"#f0f0fa",maxWidth:520,margin:"0 auto"}}><SubHead title="Settings" onBack={goHome} points={prof?.points||0}/><div style={{padding:18}}><div style={{textAlign:"center",padding:24,background:"#fff",borderRadius:24,boxShadow:"0 8px 28px rgba(0,0,0,0.04)"}}><span style={{fontSize:56,display:"block",animation:"mascotB 3s ease-in-out infinite"}}>{AVATARS[prof?.gender||"boy"][prof?.avatar||0]}</span><h2 style={{fontFamily:"'Baloo 2',cursive",fontSize:24,fontWeight:700,margin:"6px 0 2px"}}>{prof?.name}</h2><p style={{color:"#888",fontSize:13,fontWeight:600}}>Age {prof?.age} • {aCfg.diff}</p></div><div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10,marginTop:14}}>{[{n:prof?.totalEarned||0,l:"Points Earned",c:"#6366F1"},{n:(prof?.completed?.numbers||[]).length,l:"Numbers",c:"#FF6B6B"},{n:(prof?.completed?.phonics||[]).length,l:"Words",c:"#4ECDC4"},{n:(prof?.rewards||[]).length,l:"Rewards",c:"#FBBF24"}].map((s,i)=><div key={i} style={{background:"#fff",borderRadius:18,padding:16,textAlign:"center",border:"1px solid #eee"}}><span style={{fontFamily:"'Baloo 2',cursive",fontSize:28,fontWeight:800,color:s.c,display:"block"}}>{s.n}</span><span style={{fontSize:10,fontWeight:700,color:"#888"}}>{s.l}</span></div>)}</div><button onClick={()=>{setScr("onboard");setObSt(0);}} style={{width:"100%",padding:14,borderRadius:18,border:"none",background:"#EEF2FF",color:"#4338CA",fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",marginTop:14}}>🔄 Change Profile</button><button onClick={()=>{save(null);setScr("onboard");setObSt(0);}} style={{width:"100%",padding:14,borderRadius:18,border:"none",background:"#FEE2E2",color:"#DC2626",fontSize:14,fontWeight:800,fontFamily:"'Nunito',sans-serif",cursor:"pointer",marginTop:8}}>🗑️ Reset</button></div><style>{CSS}</style></div>;

  return<div><style>{CSS}</style></div>;
}

// ═══════════════════════════════════════════════════════════════
const CSS=`
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Baloo+2:wght@400;500;600;700;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
body{background:#f0f0fa;overflow-x:hidden;}
::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#ddd;border-radius:4px;}
button:active{transform:scale(0.95)!important;}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes cardIn{from{opacity:0;transform:scale(0.7) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}
@keyframes splashPop{0%{opacity:0;transform:scale(0.5) rotate(-8deg)}60%{transform:scale(1.05) rotate(2deg)}100%{opacity:1;transform:scale(1) rotate(0)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}
@keyframes numPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
@keyframes mascotB{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes dotB{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-14px)}}
@keyframes iconF{0%,100%{transform:translateY(0)}25%{transform:translateY(-4px) rotate(2deg)}75%{transform:translateY(2px) rotate(-2deg)}}
@keyframes coinSp{0%,100%{transform:rotateY(0)}50%{transform:rotateY(180deg)}}
@keyframes btnP{0%,100%{box-shadow:0 8px 28px rgba(0,0,0,0.15)}50%{box-shadow:0 12px 36px rgba(0,0,0,0.22)}}
@keyframes tipW{0%,100%{transform:rotate(-8deg) scale(1)}50%{transform:rotate(8deg) scale(1.1)}}
@keyframes micP{0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(239,68,68,0.4)}50%{transform:scale(1.05);box-shadow:0 0 0 20px rgba(239,68,68,0)}}
@keyframes listenBlink{0%,100%{opacity:1}50%{opacity:0.5}}
@keyframes readyP{0%,100%{transform:scale(1)}50%{transform:scale(1.02)}}
@keyframes resBounce{0%{opacity:0;transform:scale(0.5)}60%{transform:scale(1.05)}100%{opacity:1;transform:scale(1)}}
@keyframes ptFly{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-60px) scale(1.5)}}
@keyframes bubPop{0%{opacity:0;transform:scale(0.7)}100%{opacity:1;transform:scale(1)}}
@keyframes confFall{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}
@keyframes floatP{0%,100%{transform:translate(0,0)}25%{transform:translate(var(--dr),calc(var(--dr)*-0.5))}50%{transform:translate(0,calc(var(--dr)*-1))}75%{transform:translate(calc(var(--dr)*-1),calc(var(--dr)*-0.5))}}
@keyframes sndWave{0%,100%{height:6px}50%{height:24px}}
@keyframes starPop{0%{opacity:0;transform:scale(0) rotate(-30deg)}60%{transform:scale(1.3) rotate(10deg)}100%{opacity:1;transform:scale(1) rotate(0)}}

/* ═══ SCENE ANIMATIONS ═══ */
@keyframes scene_floatBob{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-12px)}}
@keyframes scene_sparkle{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.3}50%{transform:translate(-50%,-50%) scale(1.5);opacity:1}}
@keyframes scene_sway{0%,100%{transform:translate(-50%,-50%) rotate(-3deg)}50%{transform:translate(-50%,-50%) rotate(3deg)}}
@keyframes scene_cloudDrift{0%{transform:translate(-50%,-50%) translateX(-40px)}50%{transform:translate(-50%,-50%) translateX(40px)}100%{transform:translate(-50%,-50%) translateX(-40px)}}
@keyframes scene_birdBob{0%,100%{transform:translate(-50%,-50%) translateY(0) rotate(-3deg)}25%{transform:translate(-50%,-50%) translateY(-6px) rotate(0)}50%{transform:translate(-50%,-50%) translateY(0) rotate(3deg)}75%{transform:translate(-50%,-50%) translateY(-4px) rotate(0)}}
@keyframes scene_mouseRun{0%,100%{transform:translate(-50%,-50%) translateX(0) scaleX(1)}25%{transform:translate(-50%,-50%) translateX(15px) scaleX(1)}50%{transform:translate(-50%,-50%) translateX(30px) scaleX(1)}75%{transform:translate(-50%,-50%) translateX(15px) scaleX(1)}}
@keyframes scene_puppyWag{0%,100%{transform:translate(-50%,-50%) rotate(-2deg)}50%{transform:translate(-50%,-50%) rotate(2deg)}}
@keyframes scene_handWave{0%,100%{transform:translate(-50%,-50%) rotate(0deg)}25%{transform:translate(-50%,-50%) rotate(15deg)}75%{transform:translate(-50%,-50%) rotate(-15deg)}}
@keyframes scene_fingerCount{0%{transform:translate(-50%,-50%) scale(0);opacity:0}30%{transform:translate(-50%,-50%) scale(1.3);opacity:1}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}
@keyframes scene_eggWobble{0%,100%{transform:translate(-50%,-50%) rotate(-4deg)}50%{transform:translate(-50%,-50%) rotate(4deg)}}
@keyframes scene_rainbowGrow{0%{transform:translate(-50%,-50%) scale(0.5);opacity:0.3}50%{transform:translate(-50%,-50%) scale(1.05);opacity:1}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}
@keyframes scene_colorBounce{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-10px)}}
@keyframes scene_octoFloat{0%,100%{transform:translate(-50%,-50%) translateY(0) rotate(-3deg)}30%{transform:translate(-50%,-50%) translateY(-8px) rotate(2deg)}70%{transform:translate(-50%,-50%) translateY(4px) rotate(-2deg)}}
@keyframes scene_bubbleRise{0%{transform:translate(-50%,-50%) translateY(0);opacity:0.7}100%{transform:translate(-50%,-50%) translateY(-80px);opacity:0}}
@keyframes scene_fishSwim{0%,100%{transform:translate(-50%,-50%) translateX(0)}50%{transform:translate(-50%,-50%) translateX(40px)}}
@keyframes scene_fishSwimR{0%,100%{transform:translate(-50%,-50%) translateX(0) scaleX(-1)}50%{transform:translate(-50%,-50%) translateX(-40px) scaleX(-1)}}
@keyframes scene_waveBob{0%,100%{transform:translate(-50%,-50%) scaleX(1)}50%{transform:translate(-50%,-50%) scaleX(1.1)}}
@keyframes scene_orbitSpin{0%{transform:translate(-50%,-50%) rotate(0deg) translateX(var(--orbit)) rotate(0deg)}100%{transform:translate(-50%,-50%) rotate(360deg) translateX(var(--orbit)) rotate(-360deg)}}
@keyframes scene_sunPulse{0%,100%{transform:translate(-50%,-50%) scale(1);filter:drop-shadow(0 0 8px rgba(255,200,0,0.5))}50%{transform:translate(-50%,-50%) scale(1.08);filter:drop-shadow(0 0 16px rgba(255,200,0,0.8))}}
@keyframes scene_twinkle{0%,100%{opacity:0.3;transform:translate(-50%,-50%) scale(0.8)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.2)}}
@keyframes scene_footWiggle{0%,100%{transform:translate(-50%,-50%) rotate(-5deg)}50%{transform:translate(-50%,-50%) rotate(5deg)}}
@keyframes scene_toeWiggle{0%,100%{transform:translate(-50%,-50%) scale(1)}50%{transform:translate(-50%,-50%) scale(1.3) translateY(-3px)}}
@keyframes scene_ballBounce{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-15px)}}
@keyframes scene_monthPop{0%{transform:translate(-50%,-50%) scale(0)}50%{transform:translate(-50%,-50%) scale(1.2)}100%{transform:translate(-50%,-50%) scale(1)}}
@keyframes scene_pastryBob{0%,100%{transform:translate(-50%,-50%) translateY(0) rotate(0)}50%{transform:translate(-50%,-50%) translateY(-5px) rotate(5deg)}}
@keyframes scene_dayNight{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:0.8}50%{transform:translate(-50%,-50%) scale(1.2);opacity:1}}
@keyframes scene_clockTick{0%,100%{transform:translate(-50%,-50%) rotate(-5deg)}50%{transform:translate(-50%,-50%) rotate(5deg)}}
@keyframes scene_alarmShake{0%,25%,75%,100%{transform:translate(-50%,-50%) rotate(0)}12.5%{transform:translate(-50%,-50%) rotate(-10deg)}37.5%{transform:translate(-50%,-50%) rotate(10deg)}62.5%{transform:translate(-50%,-50%) rotate(-10deg)}87.5%{transform:translate(-50%,-50%) rotate(10deg)}}
@keyframes scene_hourglassFlip{0%,45%{transform:translate(-50%,-50%) rotate(0)}50%,95%{transform:translate(-50%,-50%) rotate(180deg)}100%{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes scene_cakeAppear{0%{transform:translate(-50%,-50%) scale(0.5);opacity:0}100%{transform:translate(-50%,-50%) scale(1);opacity:1}}
@keyframes scene_candleFlicker{0%,100%{transform:translate(-50%,-50%) scaleY(1)}50%{transform:translate(-50%,-50%) scaleY(1.1) translateY(-2px)}}
@keyframes scene_partyPop{0%{transform:translate(-50%,-50%) scale(0) rotate(-20deg)}50%{transform:translate(-50%,-50%) scale(1.3) rotate(10deg)}100%{transform:translate(-50%,-50%) scale(1) rotate(0)}}
@keyframes scene_moonGlow{0%,100%{filter:drop-shadow(0 0 8px rgba(255,255,200,0.4))}50%{filter:drop-shadow(0 0 20px rgba(255,255,200,0.8))}}
@keyframes scene_owlBlink{0%,45%,55%,100%{transform:translate(-50%,-50%) scaleY(1)}50%{transform:translate(-50%,-50%) scaleY(0.1)}}
@keyframes scene_truckDrive{0%,100%{transform:translate(-50%,-50%) translateX(0)}25%{transform:translate(-50%,-50%) translateX(15px) translateY(-2px)}75%{transform:translate(-50%,-50%) translateX(-15px) translateY(-2px)}}
@keyframes scene_wheelSpin{0%{transform:translate(-50%,-50%) rotate(0)}100%{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes scene_smokePuff{0%{opacity:0.8;transform:translate(-50%,-50%) scale(0.8)}100%{opacity:0;transform:translate(-50%,-50%) scale(2) translateY(-30px) translateX(-20px)}}
@keyframes scene_birdFly{0%,100%{transform:translate(-50%,-50%) translateY(0) translateX(0)}25%{transform:translate(-50%,-50%) translateY(-10px) translateX(8px)}50%{transform:translate(-50%,-50%) translateY(-2px) translateX(16px)}75%{transform:translate(-50%,-50%) translateY(-8px) translateX(8px)}}
@keyframes scene_fadeStep{0%,100%{opacity:0.3}50%{opacity:1}}
@keyframes scene_none{0%,100%{transform:translate(-50%,-50%)}}
`;
