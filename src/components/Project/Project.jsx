import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'; // 1. useEffect 추가 확인
import { useNavigate } from 'react-router-dom'; // 2. useNavigate 추가 확인
import { API_BASE_URL } from '../../config';
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

  const isAdmin = localStorage.getItem("adminToken") === "secret-key-12345"; 

  // 백엔드에서 데이터 가져오는 핵심 로직 
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then(res => {
        if(!res.ok) throw new Error("서버 응답 에러");
        return res.json();
      })
      .then(data => {
        console.log("백엔드에서 받은 데이터:", data);
        
        // 1. 기존처럼 데이터를 상태에 저장합니다. (데이터는 변하지 않음!)
        setProjects(data);

        // 2. [추가] 데이터가 화면에 그려진 '직후'에 애니메이션 위치를 새로고침합니다.
        // setTimeout을 아주 짧게(100ms) 주는 이유는 리액트가 카드를 그릴 시간을 벌어주기 위해서입니다.
        setTimeout(() => {
          ScrollTrigger.refresh();
          console.log("애니메이션 위치 재계산 완료!");
        }, 100);
      })
      .catch(err => console.error("데이터 로딩 실패:", err));
  }, []);

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  useLayoutEffect(() => {
   
    if (filtered.length === 0) return;

    const ctx = gsap.context(() => {
      // ref가 잘 잡혔는지 필터링 (null 제외)
      const validCards = cardsRef.current.filter(el => el !== null);

      gsap.fromTo(validCards, 
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
  }, [filter, projects, filtered.length]); // filtered.length가 변할 때도 감지

 return (
    <section id="Projects" className="project-section" ref={sectionRef}>
      <h3 id="project-title">
        Projects
        {/* 관리자일 때만 글쓰기 버튼(.) 노출 */}
        {isAdmin && (
          <span 
            onClick={() => navigate('/admin/write')} 
            style={{cursor:'pointer', fontSize:'0.5rem', opacity:0.3, marginLeft: '10px'}}
          > 
            [WRITE]
          </span>
        )}
      </h3>

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

        {filtered.length > 0 ? (
          filtered.map((project, index) => (
            <div 
              key={project.id}
              ref={el => cardsRef.current[index] = el}
              className={`project-card ${project.size || 'small'}`}
            // 6. 클릭하면 상세 페이지로 이동!
            onClick={() => navigate(`/project/${project.id}`)}
            style={{ "--bg-image": `url(${API_BASE_URL}${project.snapshot})` }} // 배경 이미지 전달
          >
            {project.status === "In Progress" && (
              <div className="status-pill">Working...</div>
            )}

            <div className="card-info">
              <span className="tag">{project.category}</span>
              <h3>{project.title}</h3>
              
              {/* 요약 설명 추가 (description의 앞부분만 자르기) */}
              <p className="card-summary">{project.description?.substring(0, 50)}...</p>
              <p className="click-guide">Read More →</p>
            </div>
          </div>
        ))
      ) : (
        /* 전시물이 없을 때 보여줄 안내판 (Magazine Style) */
        <div className="empty-announcement">
          <div className="announcement-border">
            <h4>COMING SOON</h4>
            <p>"{filter}" 카테고리의 작품을 준비 중입니다.</p>
            <p className="sub-text">조금만 기다려 주세요. 엮는 자가 열심히 작업 중입니다.</p>
            <button onClick={() => setFilter('All')} className="reset-filter-btn">
              모든 전시물 보기
            </button>
          </div>
        </div>
      )}
    </div>
  </section>
)};
