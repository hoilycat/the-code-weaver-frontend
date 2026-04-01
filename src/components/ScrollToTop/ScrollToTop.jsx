import React, { useState, useEffect } from "react";
import "./ScrollToTop.css";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) setIsVisible(true);
      else setIsVisible(false);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} className="yarn-btn" aria-label="Scroll to top">
          
          {/* 털실 일러스트 (Clean Code Ver) */}
          <svg
            className="yarn-icon"
            viewBox="0 0 217 172" 
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 전체 위치 잡는 그룹 */}
            <g transform="translate(-1583.66 -370.86)">
              <g transform="matrix(3.92 0 0 3.92 -2945.47 -1762.6)">
                
                {/* 1. 털실 몸통 (배경) */}
                <circle
                  cx="1176.4" cy="565.48" r="21.05"
                  fill="#94b4c1" stroke="none"
                />

                {/* 2. 실타래 무늬들 (베이지색) */}
                <g stroke="#eae0cf" strokeWidth="1.36" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1156.44 572.23C1156.44 572.23 1165.65 550.6 1191.67 550.89" />
                  <path d="M1160.86 579.39C1160.86 579.39 1170.07 557.76 1196.08 558.05" />
                  <path d="M1165.91 583.83C1165.91 583.83 1171.32 564.36 1197.33 564.66" />
                  <path d="M1179.4 568.89C1179.4 568.89 1187.64 570.35 1193.35 577.89" />
                  <path d="M1187.94 565.71C1187.94 565.71 1192.79 566.83 1196.6 571.31" />
                  <path d="M1174.2 572.85C1174.2 572.85 1182.28 575.55 1187.99 583.09" />
                  <path d="M1169.8 577.97C1169.8 577.97 1175.04 578.58 1180.76 586.13" />
                </g>

                {/* 3. 풀려 나온 실 (꼬불꼬불한 부분) */}
                <path
                  d="M1190.94 579.68C1190.94 579.68 1197.66 580.12 1198.54 583.92C1199.42 587.72 1208.62 586.26 1209.5 585.24"
                  stroke="#94b4c1" strokeWidth="1.36" strokeLinecap="round" strokeLinejoin="round"
                />
              </g>
            </g>
          </svg>

        </button>
      )}
    </>
  );
}