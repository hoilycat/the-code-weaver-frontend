import React, { useCallback, useLayoutEffect, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, getImageUrl } from '../../config';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Project.css';
import { fallbackProjects } from './fallbackProjects';
import { getDevelopmentStatus, getProjectRoadmap } from './projectStatus';

gsap.registerPlugin(ScrollTrigger);

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
const mergeFallbackProjects = (liveProjects = []) => {
  const liveIds = new Set(liveProjects.map((project) => Number(project.id)));
  const missingFallbackProjects = fallbackProjects.filter((project) => !liveIds.has(Number(project.id)));
  return [...liveProjects, ...missingFallbackProjects];
};

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [loadingNotice, setLoadingNotice] = useState('프로젝트를 불러오는 중입니다.');
  const [usingFallback, setUsingFallback] = useState(false);
  const [loadError, setLoadError] = useState(null);
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const retryTimerRef = useRef(null);
  const loadProjectsRef = useRef(null);

  const isAdmin = localStorage.getItem("adminToken") === "secret-key-12345";

  const refreshProjectLayout = useCallback(() => {
    setTimeout(() => {
      ScrollTrigger.refresh();
      if (window.location.hash === '#Projects' && sectionRef.current) {
        const top = sectionRef.current.getBoundingClientRect().top + window.scrollY - 24;
        window.scrollTo({ top, behavior: 'auto' });
      }
    }, 100);
  }, []);

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

  const clearRetryTimer = useCallback(() => {
    if (retryTimerRef.current) {
      clearTimeout(retryTimerRef.current);
      retryTimerRef.current = null;
    }
  }, []);

  const scheduleLiveRetry = useCallback(() => {
    clearRetryTimer();
    retryTimerRef.current = setTimeout(() => {
      loadProjectsRef.current?.({ background: true });
    }, 10000);
  }, [clearRetryTimer]);

  const loadProjects = useCallback(async ({ manual = false, background = false } = {}) => {
    const retryDelays = background ? [0] : [0, 3000, 7000, 12000];

    clearRetryTimer();
    setLoadError(null);

    if (!background) {
      setLoading(true);
      setLoadingNotice(manual ? '라이브 프로젝트를 다시 불러오는 중입니다.' : '프로젝트를 불러오는 중입니다.');
    }

    wakeBackend();

    for (let attempt = 0; attempt < retryDelays.length; attempt += 1) {
      if (retryDelays[attempt] > 0) {
        setLoadingNotice(`서버를 깨우는 중입니다. ${attempt + 1}/${retryDelays.length}번째 재시도 중...`);
        await wait(retryDelays[attempt]);
      }

      try {
        const data = await fetchWithTimeout(`${API_BASE_URL}/api/projects`, background ? 8000 : 12000);
        setProjects(mergeFallbackProjects(data));
        setUsingFallback(false);
        setLoading(false);
        refreshProjectLayout();
        return;
      } catch (err) {
        console.warn(`프로젝트 로딩 실패 (${attempt + 1}/${retryDelays.length})`, err);
        setLoadError(err);
      }
    }

    if (!background) {
      setProjects(fallbackProjects);
      setUsingFallback(true);
      setLoading(false);
      refreshProjectLayout();
    }

    scheduleLiveRetry();
  }, [clearRetryTimer, fetchWithTimeout, refreshProjectLayout, scheduleLiveRetry, wakeBackend]);

  loadProjectsRef.current = loadProjects;

  useEffect(() => {
    loadProjects();

    return () => clearRetryTimer();
  }, [clearRetryTimer, loadProjects]);

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

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

            {filtered.map((project, index) => {
              const developmentStatus = getDevelopmentStatus(project);
              const roadmap = getProjectRoadmap(project);
              const roadmapItems = [...roadmap.checkpoints, ...roadmap.next];
              const completedCount = roadmapItems.filter((item) => item.done).length;
              const totalCount = roadmapItems.length;

              return (
                <div
                  key={project.id}
                  ref={el => cardsRef.current[index] = el}
                  className={`project-card ${project.size || 'small'} status-${developmentStatus.tone}`}
                  onClick={() => navigate(`/project/${project.id}`)}
                  style={{ "--bg-image": `url(${getImageUrl(project.snapshot)})` }}
                >
                  <div className={`status-pill ${developmentStatus.tone}`}>{developmentStatus.shortLabel}</div>

                  <div className="card-info">
                    <span className="tag">{project.category}</span>
                    <h3>{project.title}</h3>
                    <div className="card-status-line" aria-label={`Development status: ${developmentStatus.label}`}>
                      <span>{developmentStatus.label}</span>
                      <span>{completedCount}/{totalCount}</span>
                    </div>
                    <p className="card-summary">{project.description?.substring(0, 50)}...</p>
                    <p className="click-guide">Read More →</p>
                  </div>
                </div>
              );
            })}
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
  );
}
