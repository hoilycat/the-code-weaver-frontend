import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion"; // eslint-disable-line no-unused-vars
import yarnImg from "../assets/images/yarn.svg";
import pantsImg from "../assets/images/pants.svg";
import tshirtImg from "../assets/images/tshirt.svg";
import socksImg from "../assets/images/socks.svg";

// 숫자를 넣으면 항상 똑같은 0~1 사이 값을 뱉는 '순수 함수'
// 이 함수는 Math.random 대신 사용되어 리액트 19의 잔소리를 막아줌
const getDeterministicRandom = (seed) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// [부품 1] 실 조각: 나타나기 -> 분해하기 -> 중심으로 모이기
// index를 새로 받도록 추가
const ThreadPiece = ({ char, progress, range, direction, index }) => {
  
  //  Math.random() 대신 index를 넣은 가짜 주사위를 사용한다.
  // 이렇게 하면 리액트는 "항상 결과가 똑같군!" 하고 안심한다.
  const randomOffset = useMemo(() => {
    return (getDeterministicRandom(index + (direction === "left" ? 0 : 100)) - 0.5) * 500;
  }, [index, direction]);

  const xStart = direction === "left" ? -100 : 100;

  const x = useTransform(progress, range, [xStart, 0, randomOffset, 0]);
  const y = useTransform(progress, range, [0, 0, 200, 400]);
  const opacity = useTransform(progress, range, [0, 1, 0.8, 0]);

  return (
    <motion.span style={{ x, y, opacity, display: "inline-block" }}>
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};


// [부품 2] 실타래
const YarnBall = ({ progress }) => {
  const opacity = useTransform(progress, [0.4, 0.5, 0.6], [0, 1, 0]);
  const scale = useTransform(progress, [0.4, 0.5, 0.6], [0.5, 1.2, 0.8]);
  const rotate = useTransform(progress, [0.4, 0.6], [0, 360]);

  return (
    <motion.div style={{ opacity, scale, rotate, position: "absolute", top: "50%", left: "50%", x: "-50%", y: "-50%" }}>
      <div style={{ width: "150px", height: "150px", backgroundColor: "#5d6d7e", borderRadius: "50%", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "3rem" }}><img id="yarn" src={yarnImg} /></div>
    </motion.div>
  );
};

// [부품 3] 옷 3벌 쌓기
const ClothingStack = ({ progress }) => {
  const op1 = useTransform(progress, [0.45, 0.55], [0, 1]); // 바지 나타남
  const op2 = useTransform(progress, [0.55, 0.65], [0, 1]); // 티셔츠 나타남
  const op3 = useTransform(progress, [0.65, 0.75], [0, 1]); // 양말 나타남

  const clothes = [
    { op: op1, src: pantsImg, y: 0, width: "480px" },
    { op: op2, src: tshirtImg, y: -40, width: "460px" },
    { op: op3, src: socksImg, y: -40, width: "300px" }
  ];
  return (
      <div style={{ position: "absolute", top: "55%", left: "50%", transform: "translateX(-50%)", width: "300px", height: "400px" }}>
      {clothes.map((c, i) => (
        <motion.img
          key={i}
          src={c.src}
          style={{
            opacity: c.op,
            y: c.y,
            position: "absolute",
            left: "50%",
            x: "-50%",
            width: c.width,
            height: "auto",
            zIndex: i,
            // SVG에 그림자 효과를 주어 겹친 느낌 강조
            filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.15))"
          }}
          alt="clothing"
        />
      ))}
    </div>
  );
};

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
 
  // 핵심: scrollYProgress에 '탄성'이라는 옷을 입힘
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200, // 뻣뻣함 (숫자가 높을수록 탄력이 강함)
    damping: 40,    // 저항 (숫자가 낮을수록 많이 출렁거림)
    restDelta: 0.001
  });

  return (
    <section id="About" ref={containerRef} style={{ height: "600vh", position: "relative" }}>
      <div style={{ position: "sticky", top: "0", height: "100vh", width: "100%", overflow: "hidden" }}>
        
        {/* STEP 1: 왼쪽 (0.0 ~ 0.2) */}
        <div style={{ position: "absolute", top: "30%", left: "15%", fontSize: "2rem" }}>
          {"Weaving ideas into form.".split("").map((c, i) => (
            // index={i}를 꼭 넘겨줘야 함
            <ThreadPiece key={`en-${i}`} char={c} index={i} progress={smoothProgress} range={[0, 0.05, 0.15, 0.2]} direction="left" />
          ))}
        </div>

        {/* STEP 2: 오른쪽 (0.2 ~ 0.4) */}
        <div style={{ position: "absolute", top: "30%", right: "15%", fontSize: "2rem" }}>
          {"생각을 형태로 엮는 중".split("").map((c, i) => (
            // 여기도 index={i}를 넘겨 줌
            <ThreadPiece key={`ko-${i}`} char={c} index={i} progress={smoothProgress} range={[0.2, 0.25, 0.35, 0.4]} direction="right" />
          ))}
        </div>

        <YarnBall progress={smoothProgress} />
        <ClothingStack progress={smoothProgress} />
      </div>
    </section>
  );
}