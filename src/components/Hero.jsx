import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";// eslint-disable-line no-unused-vars
import './Hero.css'; // ★ CSS 파일 임포트 필수!

export default function Hero() {
  const containerRef = useRef(null);
  
  // 스크롤 로직 (이건 CSS로 못 함, JS의 영역)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 🌟 핵심: scrollYProgress에 '탄성'이라는 옷을 입힘
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, // 뻣뻣함 (숫자가 높을수록 탄력이 강함)
    damping: 30,    // 저항 (숫자가 낮을수록 많이 출렁거림)
    restDelta: 0.001
  });

// 2. 뜨개질 움직임 공식 (Oscillation)
  // Math.sin(v * 속도) * 각도
  
  // 왼쪽 바늘: 스크롤 내릴 때마다 0도 ↔ -15도를 왔다 갔다 함
  const rotateLeft = useTransform(smoothProgress, (v) => {
    return Math.sin(v * 30) * -15; 
  });

  // 오른쪽 바늘: 스크롤 내릴 때마다 0도 ↔ 15도를 왔다 갔다 함 (왼쪽과 반대 타이밍)
  const rotateRight = useTransform(smoothProgress, (v) => {
    return Math.sin(v * 30) * 15;
  });

  return (
    <section id="hero" ref={containerRef}>
      
      <div className="hero-sticky">
        
        {/* 네비게이션 */}
        <nav className="hero-nav">
          <a href="#About">about</a>
          <a href="#Projects">projects</a>
          <a href="#Footer">contact</a>
        </nav>

        {/* 제목 */}
        <h1 className="hero-title">The Weaver</h1>

        {/* SVG 영역 */}
        <svg
          className="needle-svg"
          width="800" 
          height="400"
          viewBox="0 0 328.57 155.52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(-1741.094,-83.02)">
            
            {/* 왼쪽 바늘 */}
            <motion.path
              id="needle-left"
              className="needle-path" // CSS에서 색상, 두께, 회전축을 가져옴
              d="m 1747.2225,97.285312 c -4.0224,6.621298 -2.1418,15.392998 4.2005,19.592388 4.375,2.88484 9.9393,2.92747 14.3544,0.10997 l 155.2863,102.81454 c 7.4306,3.91756 14.88,7.8033 22.322,11.69936 0,0 2.9078,2.37189 4.7135,-0.60034 1.7088,-2.81303 -1.5772,-4.91409 -1.5772,-4.91409 l -19.0962,-16.43886 c 0,0 -103.4821,-68.56748 -155.2416,-102.82057 0.6866,-5.47482 -1.7297,-10.868568 -6.1947,-13.828058 -6.3424,-4.1991 -14.7447,-2.23564 -18.767,4.38566 z"
              
              // ★ 여기는 JS 변수가 들어가야 해서 CSS로 못 뺌!
              style={{ rotate: rotateLeft }} 
            />

            {/* 오른쪽 바늘 */}
            <motion.path
              id="needle-right"
              className="needle-path"
              d="m 2066.8323,93.385592 c -4.1883,-6.50715 -12.6372,-8.23615 -18.8713,-3.86208 -4.2898,3.02219 -6.5657,8.32367 -5.8711,13.676888 l -152.6331,107.09781 c -6.4247,5.52749 -12.8291,11.08599 -19.2397,16.63318 0,0 -3.2498,1.82604 -1.3697,4.74685 1.7795,2.76449 4.944,0.46816 4.944,0.46816 l 22.0983,-11.64432 c 0,0 101.7598,-71.34832 152.6205,-107.0525 4.5249,2.85742 10.2269,2.7162 14.6185,-0.36183 6.2339,-4.37427 7.8922,-13.195298 3.7037,-19.702158 z"
              
              // ★ 여기도 마찬가지
              style={{ rotate: rotateRight }}
            />
          </g>
        </svg>

        <motion.p 
          className="scroll-text"
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
        >
          scroll ↓
        </motion.p>

      </div>
    </section>
  );
}