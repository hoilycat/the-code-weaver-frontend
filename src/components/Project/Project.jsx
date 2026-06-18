import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'; // 1. useEffect 추가 확인
import { useNavigate } from 'react-router-dom'; // 2. useNavigate 추가 확인
import { API_BASE_URL, getImageUrl } from '../../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Project.css';
import { fallbackProjects } from './fallbackProjects';

// GSAP 플러그인 등록
gsap.registerPlugin(ScrollTrigger);

export default function Project() {
  const [projects, setProjects] = useState([]); //초기값은 빈 배열
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [loadingNotice, setLoadingNotice] = useState('프로젝트를 불러오는 중입니다.');
  const [usingFallback, setUsingFallback] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const navigate = useNavigate(); // 이동 도구
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const isAdmin = localStorage.getItem("adminToken") === "secret-key-12345"; 

  const refreshProjectLayout = () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
      if (window.location.hash === '#Projects' && sectionRef.current) {
        const top = sectionRef.current.getBoundingClientRect().top + window.scrollY - 24;
        window.scrollTo({ top, behavior: 'auto' });
      }
    }, 100);
  };

  const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchWithTimeout = async (url, timeoutMs = 12000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`서버 응답 에러: ${response.status}`);
      return await response.json();
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const wakeBackend = () => {
    fetch(`${API_BASE_URL}/api/projects/wake-up`).catch(() => {});
  };

  const loadProjects = async ({ manual = false } = {}) => {
    const retryDelays = [0, 3000, 7000, 12000];

    setLoading(true);
    setLoadError(null);
    setLoadingNotice(manual ? '라이브 프로젝트를 다시 불러오는 중입니다.' : '프로젝트를 불러오는 중입니다.');

    wakeBackend();

    for (let attempt = 0; attempt < retryDelays.length; attempt += 1) {
      if (retryDelays[attempt] > 0) {
        setLoadingNotice(`서버를 깨우는 중입니다. ${attempt + 1}/${retryDelays.length}번째 재시도 중...`);
        await wait(retryDelays[attempt]);
      }

      try {
        const data = await fetchWithTimeout(`${API_BASE_URL}/api/projects`);
        setProjects(data);
        setUsingFallback(false);
        setLoading(false);
        refreshProjectLayout();
        return;
      } catch (err) {
        console.warn(`프로젝트 로딩 실패 (${attempt + 1}/${retryDelays.length})`, err);
        setLoadError(err);
      }
    }

    setProjects(fallbackProjects);
    setUsingFallback(true);
    setLoading(false);
    refreshProjectLayout();
  };

  // 백엔드에서 데이터 가져오는 핵심 로직
  useEffect(() => {
    loadProjects();
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
        {['All', 'AI Projects', 'Team Project', 'Data Visualization'].map(cat => (
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

        {loading ? (
          <div className="empty-announcement">
            <div className="announcement-border">
              <p style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>☕</p>
              <p>서버가 잠들어 있을 수 있어요.</p>
              <p className="sub-text">{loadingNotice}</p>
            </div>
          </div>
        ) : filtered.length > 0 ? (
          <>
            {usingFallback && (
              <div className="fallback-notice">
                <span>라이브 서버 응답이 늦어 저장된 프로젝트 목록을 먼저 보여주고 있어요.</span>
                <button onClick={() => loadProjects({ manual: true })}>
                  다시 불러오기
                </button>
              </div>
            )}

            {filtered.map((project, index) => (
              <div 
              key={project.id}
              ref={el => cardsRef.current[index] = el}
              className={`project-card ${project.size || 'small'}`}
            // 6. 클릭하면 상세 페이지로 이동!
            onClick={() => navigate(`/project/${project.id}`)}
            style={{ "--bg-image": `url(${getImageUrl(project.snapshot)})` }} // 배경 이미지 전달
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
        ))}
          </>
      ) : (
        <div className="empty-announcement">
          <div className="announcement-border">
            <h4>COMING SOON</h4>
            <p>"{filter}" 카테고리의 작품을 준비 중입니다.</p>
            <p className="sub-text">
              {loadError ? '라이브 서버 연결이 불안정합니다. 잠시 후 다시 시도해 주세요.' : '조금만 기다려 주세요. 엮는 자가 열심히 작업 중입니다.'}
            </p>
            <button onClick={() => setFilter('All')} className="reset-filter-btn">
              모든 전시물 보기
            </button>
          </div>
        </div>
      )}
    </div>
  </section>
)};
