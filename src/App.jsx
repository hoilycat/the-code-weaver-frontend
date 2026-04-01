import { BrowserRouter, Routes, Route } from 'react-router-dom'; // 1. 라우터 도구들
import './App.css';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Project from './components/Project/Project';
import Footer from './components/Footer/Footer';
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import ProjectDetail from './components/Project/ProjectDetail'; // 상세페이지
import ProjectWrite from './components/Project/ProjectWrite';
import Login from './components/Login/Login';
import ProjectEdit from './components/Project/ProjectEdit';

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