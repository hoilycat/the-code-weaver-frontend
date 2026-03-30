
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {motion} from "framer-motion";
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Project from './components/Project';
import Footer from './components/Footer';
import ScrollToTop from "./components/ScrollToTop";
import ProjectDetail from './components/ProjectDetail';//상세페이지


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
          <Route path="/" element={<MainPage />} /> 
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;