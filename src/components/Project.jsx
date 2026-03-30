import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'; // 1. useEffect 추가 확인
import { useNavigate } from 'react-router-dom'; // 2. useNavigate 추가 확인
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Project.css';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

export default function Project() {
  const [projects, setProjects] = useState([]); //초기값은 빈 배열
  const [filter, setFilter] = useState('All');
  const navigate = useNavigate(); // 이동 도구
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // 백엔드에서 데이터 가져오는 핵심 로직 
  useEffect(() => {
    fetch("http://localhost:8080/api/projects")
      .then(res => {
        if(!res.ok) throw new Error("서버 응답 에러");
        return res.json();
      })
      .then(data => {
        console.log("백엔드에서 받은 데이터:", data);
        setProjects(data);
      })
      .catch(err => console.error("데이터 로딩 실패:", err));
  }, []);

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  useLayoutEffect(() => {
    // 데이터가 로딩된 후에 애니메이션이 돌아가도록 설정
    if (projects.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current, 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          overwrite: "auto",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          }
        });
    }, sectionRef);

    return () => ctx.revert();
  }, [filter, projects]); // filter나 projects가 바뀔 때 실행

 return (
    <section id="Projects" className="project-section" ref={sectionRef}>
      <h3 id="project-title">Projects</h3>

      {/* 카테고리 필터 */}
      <div className="filter-nav" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        {['All', 'AI Design', 'Public Data Viz', 'AIoT Service', 'Data Storytelling', 'Lifestyle Viz', 'Tableau Viz'].map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)} 
            className={filter === cat ? 'active' : ''}
            style={{ 
              cursor: 'pointer',
              padding: '8px 16px',
              borderRadius: '20px',
              border: `1px solid #547792`, 
              backgroundColor: filter === cat ? '#94B4C1' : 'transparent',
              color: filter === cat ? '#F9F7F2' : '#213448',
              fontSize: '0.8rem',
              transition: 'all 0.3s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="woven-grid">
        {filtered.map((project, index) => (
          <div 
            key={project.id}
            ref={el => cardsRef.current[index] = el}
            className={`project-card ${project.size || 'small'}`}
            // 6. 🚀 클릭하면 상세 페이지로 이동!
            onClick={() => navigate(`/project/${project.id}`)}
          >
            {project.status === "In Progress" && (
              <div className="status-pill">Working...</div>
            )}

            <div className="card-info">
              <span className="tag">{project.category}</span>
              <h3>{project.title}</h3>
              <p className="click-guide">Click to see details</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}