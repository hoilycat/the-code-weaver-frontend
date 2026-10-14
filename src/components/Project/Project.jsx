import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_BASE_URL, getImageUrl } from '../../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Project.css';
import { mergeEditorialProjects } from './fallbackProjects';
import { saveMainScroll } from '../ScrollManager/scrollMemory';

gsap.registerPlugin(ScrollTrigger);

const FILTERS = ['Machine Vision', 'AI', 'Full-stack', 'Data', 'All'];
const FEATURED_PROJECT_IDS = {
  All: 11,
  'Machine Vision': 11,
  AI: 3,
  'Full-stack': 2,
  Data: 8,
};
const FILTER_STORAGE_KEY = 'weaver:projectFilter';

// 브라우저 뒤로 가기로 돌아오면 주소에 필터가 없어서 기본값으로 바뀌고,
// 카드 배치가 달라져 저장한 스크롤 위치가 어긋난다. 그래서 마지막 필터도 기억해 둔다.
const getStoredFilter = () => {
  try {
    return sessionStorage.getItem(FILTER_STORAGE_KEY);
  } catch {
    return null;
  }
};

const PROJECT_IDS_BY_FILTER = {
  'Machine Vision': [11, 12, 1, 3],
  AI: [3, 4, 11, 2],
  'Full-stack': [2, 3, 10, 4, -1],
  Data: [8, 6, 7, 9],
};

export default function Project() {
  const [projects, setProjects] = useState(() => mergeEditorialProjects());
  const location = useLocation();
  const [filter, setFilter] = useState(() => {
    const fromUrl = new URLSearchParams(location.search).get('projectFilter');
    if (FILTERS.includes(fromUrl)) return fromUrl;
    const stored = getStoredFilter();
    return FILTERS.includes(stored) ? stored : 'Machine Vision';
  });
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const isAdmin = localStorage.getItem("adminToken") === "secret-key-12345";

  const refreshProjectLayout = useCallback(() => {
    setTimeout(() => {
      // 위치 복원은 ScrollManager가 담당한다.
      // 여기서 다시 scrollTo를 하면 서버 응답이 늦게 올 때 화면이 한 번 더 미끄러진다.
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  // 상세로 떠나기 직전에 지금 위치와 필터를 저장 → 돌아오면 이 카드 자리로 복원
  const openProject = (projectId) => {
    saveMainScroll();
    try {
      sessionStorage.setItem(FILTER_STORAGE_KEY, filter);
    } catch {
      // 저장소를 못 쓰면 주소의 ?from 값으로 필터를 복원한다
    }
    navigate(`/project/${projectId}?from=${encodeURIComponent(filter)}`);
  };

  const fetchWithTimeout = useCallback(async (url, timeoutMs = 12000) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`서버 응답 에러: ${response.status}`);
      return await response.json();
    } finally {
      clearTimeout(timeoutId);
    }
  }, []);

  const wakeBackend = useCallback(() => {
    fetch(`${API_BASE_URL}/api/projects/wake-up`).catch(() => {});
  }, []);

  const loadProjects = useCallback(async () => {
    wakeBackend();
    try {
      const data = await fetchWithTimeout(`${API_BASE_URL}/api/projects`, 8000);
      setProjects(mergeEditorialProjects(data));
      refreshProjectLayout();
    } catch (err) {
      console.warn('CMS 응답이 늦어 저장된 포트폴리오를 유지합니다.', err);
    }
  }, [fetchWithTimeout, refreshProjectLayout, wakeBackend]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const filtered = filter === 'All'
    ? projects
    : PROJECT_IDS_BY_FILTER[filter]
        .map((projectId) => projects.find((project) => Number(project.id) === projectId))
        .filter(Boolean);

  const featuredProject = filtered.find(
    (project) => Number(project.id) === FEATURED_PROJECT_IDS[filter]
  ) || filtered[0];
  const orderedProjects = featuredProject
    ? [featuredProject, ...filtered.filter((project) => project.id !== featuredProject.id)]
    : [];

  useLayoutEffect(() => {
    if (filtered.length === 0) return;

    const ctx = gsap.context(() => {
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
  }, [filter, projects, filtered.length]);

  return (
    <section id="Projects" className="project-section" ref={sectionRef}>
      <h3 id="project-title">
        Projects
        {isAdmin && (
          <span
            onClick={() => navigate('/admin/write')}
            style={{ cursor: 'pointer', fontSize: '0.5rem', opacity: 0.3, marginLeft: '10px' }}
          >
            [WRITE]
          </span>
        )}
      </h3>

      <div className="filter-nav" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        {FILTERS.map(cat => (
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
          <>
            {orderedProjects.map((project, index) => {
              const isFeatured = project.id === featuredProject?.id;

              return (
                <div
                  key={project.id}
                  ref={el => cardsRef.current[index] = el}
                  className={`project-card ${isFeatured ? 'featured' : (project.size || 'small')}`}
                  onClick={() => openProject(project.id)}
                  style={{ "--bg-image": `url(${getImageUrl(project.snapshot)})`, "--bg-position": project.localOnly ? 'center 4%' : 'center' }}
                >
                  <div className="card-info">
                    <span className="tag">
                      {isFeatured ? `Representative · ${filter === 'All' ? 'Machine Vision' : filter}` : (project.editorialLabel || project.category)}
                    </span>
                    <h3>{project.title}</h3>
                    <p className="card-summary">{project.cardSummary || project.description}</p>
                    <p className="click-guide">Read More →</p>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="empty-announcement">
            <div className="announcement-border">
              <h4>NO STORIES</h4>
              <p>"{filter}"에 해당하는 프로젝트가 없습니다.</p>
              <button onClick={() => setFilter('All')} className="reset-filter-btn">
                모든 전시물 보기
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
