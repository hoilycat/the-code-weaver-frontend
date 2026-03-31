import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './ProjectDetail.css'; // 나중에 스타일을 위해 추가

const ProjectDetail = () => {
  const { id } = useParams(); // URL에서 ID 추출
  const navigate = useNavigate();
  const location = useLocation();
  const [project, setProject] = useState(null); // 프로젝트 데이터를 담을 상태
  const queryParams = new URLSearchParams(location.search);
  const isAdmin = localStorage.getItem("adminToken") === "secret-key-12345";

  useEffect(() => {
    window.scrollTo(0, 0); //페이지 열리자마자 맨 위로

    // 💡 백엔드에서 해당 ID의 데이터만 가져오기
    fetch(`http://localhost:8080/api/projects/${id}`)
      .then(res => res.json())
      .then(data => setProject(data))
      .catch(err => console.error("상세 정보 로딩 실패!", err));
  }, [id]);

   if (!project) return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>전시실 입장 중... 🕯️</p>
    </div>
  );

 // 💡 1. ID를 기반으로 레이아웃 스타일 결정 (0 또는 1)
  const layoutType = project.id % 2 === 0 ? 'type-a' : 'type-b';

  // 💡 2. ID를 기반으로 랜덤 장식 위치/각도 계산 (고정된 랜덤값)
  const decoStyle = {
    rotation: (project.id * 13) % 20 - 10, // -10도 ~ 10도
    top: (project.id * 7) % 50,           // 0% ~ 50%
    right: (project.id * 11) % 30,        // 0% ~ 30%
    fontSize: ((project.id * 3) % 5) + 4   // 4rem ~ 8rem (장식 텍스트용)
  };

  const handleDelete = () => {
  if (window.confirm("이 작품을 정말 삭제하시겠습니까?")) {
    fetch(`http://localhost:8080/api/projects/${id}`, { method: 'DELETE' })
      .then(() => {
        alert("삭제 완료");
        navigate("/");
      });
  }
};


//  이미지 출력 부분 (서버 주소 추가)
const SERVER_URL = "http://localhost:8080";


  return (
    <div className={`magazine-layout ${layoutType}`}>
      {/* 배경에 깔리는 큰 숫자 장식 (Deco) */}
      <div className="bg-number-deco" style={{ transform: `rotate(${decoStyle.rotation}deg)` }}>
        0{project.id}
      </div>

      {/* 상단 네비게이션: 잡지 여백 느낌 */}
      <nav className="mag-nav">
        <button onClick={() => navigate('/')} className="back-btn">
          ← BACK TO ARCHIVE
        </button>
      </nav>

      <article className="mag-article">
        {/* 헤더 섹션: 큰 타이포그래피 */}
        <header className="mag-header">
          <div className="mag-meta-top">
            <span className="issue-no">ISSUE #0{project.id}</span>
            <span className="mag-category">{project.category}</span>
          </div>
          <h1 className="mag-title-overlap">{project.title}</h1>
          <div className="mag-divider"></div>
        </header>

        {/* 비주얼 섹션: 스냅샷 이미지 */}
        {project.snapshot && (
          <section className="mag-visual">
            <div className="img-wrapper">
              <img src={`${SERVER_URL}${project.snapshot}`} alt="Main" />

              {/* 장식용 작은 이미지 흩뿌리기 (Snapshot 하나 더 쓰기) */}
              <div 
                className="deco-small-img" 
                style={{ 
                  top: `${decoStyle.top}%`, 
                  right: `-${decoStyle.right}%`,
                  transform: `rotate(${decoStyle.rotation * -1.5}deg)` 
                }}
              >
                <img src={project.snapshot} alt="Deco" />
              </div>
            </div>
          </section>
        )}

        {/* 본문 섹션: 2단 구성 (사이드바 + 메인 스토리) */}
        <div className="mag-body-grid">
          <aside className="mag-sidebar">
            <div className="sidebar-item">
              <h4>STATUS</h4>
              <p className="status-text">{project.status}</p>
            </div>
            <div className="sidebar-item">
              <h4>CURATED BY</h4>
              <p>The Weaver</p>
            </div>
            <div className="sidebar-item">
              <h4>PERIOD</h4>
              <p>{project.period || '2026'}</p> {/* 입력 안 했으면 기본값 2026 */}
            </div>
            <div className="sidebar-item">
              <h4>DATE</h4>
              <p>2026-03-31</p>
            </div>
            
            {project.link && (
              <div className="sidebar-item action">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="mag-visit-link">
                  {project.category === 'Tableau Viz' ? '📊 VIEW TABLEAU' : '🚀 LAUNCH SERVICE'}
                </a>
              </div>
            )}
          </aside>

          <main className="mag-main-text">
            <h2 className="section-label">Editor's Note</h2>
            {/* 첫 글자 강조(Drop Cap)가 적용될 클래스 */}
            <p className="description-p drop-cap">
              {project.description}
            </p>
          </main>
        </div>
      </article>

      {/* 갤러리 섹션 */}
      <section className="mag-gallery">
        {project.images && project.images.map((img, index) => (
          <div key={index} className={`gallery-item item-${index % 3}`}>
            <img src={img} alt={`Slide ${index}`} />
            <p className="caption">Page. {index + 1}</p>
          </div>
        ))}
      </section>

      <div className="admin-actions" style={{ marginTop: '50px', display: 'flex', gap: '10px' }}>
        <button onClick={() => navigate(`/admin/edit/${id}`)} className="mag-visit-link" style={{background:'#94B4C1'}}>
          수정 (EDIT)
        </button>
        <button onClick={handleDelete} className="mag-visit-link" style={{background:'#e74c3c'}}>
          삭제 (DELETE)
        </button>
      </div>

      <footer className="mag-footer">
        <div className="mag-divider light"></div>
        <p>© 2026 The Weaver - Editorial Archive</p>
      </footer>
    </div>
  );
};

export default ProjectDetail;