import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'; // 1. 라우터 도구들
import './App.css';
import ScrollParticles from './components/ScrollParticles/ScrollParticles'; // 2. 스크롤 입자 효과
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Project from './components/Project/Project';
import Footer from './components/Footer/Footer';
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ProjectDetail from './components/Project/ProjectDetail'; // 상세페이지
import ProjectWrite from './components/Project/ProjectWrite';
import Login from './components/Login/Login';
import ProjectEdit from './components/Project/ProjectEdit';
import { API_BASE_URL } from './config';

const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const targetId = location.hash.replace("#", "");
    let attempts = 0;
    let scrollTimer;

    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (!target) return;

      const top = target.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: attempts === 0 ? "smooth" : "auto" });
    };

    const scheduleScroll = () => {
      scrollTimer = setTimeout(() => {
        scrollToTarget();
        attempts += 1;

        if (attempts < 5) {
          scheduleScroll();
        }
      }, attempts === 0 ? 120 : 180);
    };

    scheduleScroll();

    return () => clearTimeout(scrollTimer);
  }, [location.pathname, location.hash]);

  return null;
};

// [메인 화면 컴포넌트] 기존의 스크롤 구조를 하나로 묶음
const MainPage = () => {
  return (
    <>
      <Hero />
      <About />
      <Project />
      <Footer />
      <ScrollToTop />
    </>
  );
};

function App() {
  useEffect(() => {
    // 14분마다 백엔드에 '안녕?' 하고 신호를 보내서 Render 서버가 잠들지 않게 합니다.
    // (누군가 사이트를 열어놓고 있을 때만 작동합니다!)
    const keepAlive = setInterval(() => {
      if (API_BASE_URL.includes("onrender.com")) {
        fetch(`${API_BASE_URL}/api/projects`)
          .then(() => console.log("Backend Wake-up Ping Sent! 🚀"))
          .catch(() => {});
      }
    }, 14 * 60 * 1000); // 14분 간격

    return () => clearInterval(keepAlive);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <ScrollParticles /> {/* 스크롤 입자 효과 */}
        <ScrollToHash />

        <Routes>
          {/* 홈 주소(/)일 때는 메인 페이지 전체를 보여줌 */}
          <Route path="/" element={<MainPage />} />
          {/* 프로젝트 상세 페이지(/project/숫자) 주소일 때 */}
          <Route path="/project/:id" element={<ProjectDetail />} />
          {/* 글쓰기 경로 추가 */}
          <Route path="/admin/write" element={<ProjectWrite />} />
          {/* 로그인 경로 추가 */}
          <Route path="/login" element={<Login />} />
          {/* 수정 경로 추가 */}
          <Route path="/admin/edit/:id" element={<ProjectEdit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
