import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 1. 라우터 도구들
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Project from './components/Project';
import Footer from './components/Footer';
import ScrollToTop from "./components/ScrollToTop";
import ProjectDetail from './components/ProjectDetail'; // 상세페이지
import ProjectWrite from './components/ProjectWrite';


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
  return (
    <BrowserRouter> 
      <div className="App">
        <Routes>
          {/* 홈 주소(/)일 때는 메인 페이지 전체를 보여줌 */}
          <Route path="/" element={<MainPage />} /> 

          {/* 프로젝트 상세 페이지(/project/숫자) 주소일 때 */}
          <Route path="/project/:id" element={<ProjectDetail />} />
          {/* ✍️ 글쓰기 경로 추가! */}
          <Route path="/admin/write" element={<ProjectWrite />} /> 
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;