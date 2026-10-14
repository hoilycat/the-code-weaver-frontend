import React from "react";
import { motion, useTransform } from "framer-motion"; // eslint-disable-line no-unused-vars
import "./SkipToProjects.css";

// About 애니메이션(600vh)을 건너뛰고 바로 프로젝트로 가는 버튼
// progress: About 섹션의 스크롤 진행도(0~1)
export default function SkipToProjects({ progress }) {
  // 섹션에 들어오면 슬며시 나타났다가, 애니메이션이 거의 끝나면 사라짐
  const opacity = useTransform(progress, [0, 0.03, 0.9, 0.97], [0, 1, 1, 0]);
  // 안 보일 때는 클릭도 안 되게
  const pointerEvents = useTransform(opacity, (v) => (v > 0.1 ? "auto" : "none"));

  const handleSkip = () => {
    const target = document.getElementById("Projects");
    if (!target) return;

    // 움직임 줄이기 설정을 켠 사람에게는 부드러운 스크롤 대신 바로 이동
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = target.getBoundingClientRect().top + window.scrollY - 24;
    window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <motion.button
      type="button"
      className="skip-to-projects"
      style={{ opacity, pointerEvents }}
      onClick={handleSkip}
      aria-label="소개 애니메이션 건너뛰고 프로젝트로 이동"
    >
      skip to projects <span aria-hidden="true">→</span>
    </motion.button>
  );
}
