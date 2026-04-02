import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectDetail.css'; 

export default function ProjectDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [project, setProject] = useState(null); 
  const isAdmin = localStorage.getItem("adminToken") === "secret-key-12345";
  const SERVER_URL = "http://localhost:8080";

  // 사진 확대 모달 상태
  const [zoomImg, setZoomImg] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`http://localhost:8080/api/projects/${id}`)
      .then(res => res.json())
      .then(data => setProject(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!project) return <div className="loading">아카이브 여는 중... 🕯️</div>;

  const paragraphs = project.description ? project.description.split('\n\n') : [];
  const galleryImages = project.images || [];

  return (
    // 1. 전체 페이지 (격자무늬 배경이 깔리는 곳)
    <div className="mag-clean-page">
      
      {/* 2. 우측 상단 고정 네비게이션 */}
      <nav className="mag-fixed-nav">
        <button onClick={() => navigate('/')} className="back-btn-minimal">
          CLOSE ✕
        </button>
      </nav>

      {/* 4. 와이드 썸네일 섹션 */}
      <header className="mag-wide-hero">
        <div className="hero-img-wrapper">
          <img src={`${SERVER_URL}${project.snapshot}`} alt="Main Wide" />
        </div>
        <div className="hero-titles">
          <span className="mag-issue-no">ISSUE NO. 0{project.id}</span>
          <h1 className="mag-title-large">{project.title}</h1>
          <div className="hero-meta-info">
            <span>{project.category}</span>
            <span className="sep">/</span>
            <span>{project.period || '2026'}</span>
            <span className="sep">/</span>
            <span>{project.status}</span>
          </div>
        </div>
      </header>

      {/* 3. 전체 너비를 1200px로 제한하는 중앙 컨테이너 */}
      <div className="mag-main-container">
        
        {/* 5. 본문 레이아웃 (사이드바 + 지그재그 스토리) */}
        <main className="mag-main-grid">
          
          {/* 왼쪽 고정 정보 (미니 사이드바) */}
          <aside className="mag-sidebar-mini">
             <div className="sidebar-sticky">
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="mag-visit-btn">
                    LAUNCH ↗
                  </a>
                )}
                <div className="editor-credit">
                   <label>CURATED BY</label>
                   <p>The Weaver</p>
                </div>
             </div>
          </aside>

          {/* [글-사진] 지그재그 리스트  */}
          <section className="mag-content-flow">
            {paragraphs.map((para, index) => (
              <div key={index} className={`content-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                <div className="text-col">
                  <p className={`para-text ${index === 0 ? 'drop-cap' : ''}`}>
                    {para}
                  </p>
                </div>
                {galleryImages[index] && (
                  <div className="image-col">
                    <div className="image-frame">
                      <img 
                        src={`${SERVER_URL}${galleryImages[index]}`} 
                        alt={`Detail ${index}`} 
                        // 사진을 클릭하면 스위치에 이 사진 주소를 넣어준다! 마우스도 돋보기로!
                        onClick={() => setZoomImg(`${SERVER_URL}${galleryImages[index]}`)}
                        style={{ cursor: "zoom-in" }}
                      />
                      <span className="fig-tag">FIG. {index + 1}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* 남은 사진들 하단 갤러리 처리 */}
            {galleryImages.length > paragraphs.length && (
              <div className="extra-gallery-grid">
                {galleryImages.slice(paragraphs.length).map((img, idx) => (
                  <div key={idx} className="extra-img-box">
                    <img 
                      src={`${SERVER_URL}${img}`} 
                      alt="More" 
                      //  똑같이 클릭 이벤트와 마우스 모양 추가!
                      onClick={() => setZoomImg(`${SERVER_URL}${img}`)}
                      style={{ cursor: "zoom-in" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>

        {/* 6. 관리자 액션바 */}
        {isAdmin && (
          <div className="admin-actions-bar">
            <button onClick={() => navigate(`/admin/edit/${id}`)} className="edit-btn">EDIT</button>
            <button className="del-btn">DELETE</button>
          </div>
        )}
      </div>

      <footer className="mag-clean-footer">
        <div className="footer-line"></div>
        <p>© 2026 THE WEAVER - EDITORIAL ARCHIVE</p>
      </footer>

      {/* 사진 확대 모달 */}
      {zoomImg && (
              <div className="image-modal" onClick={() => setZoomImg(null)}>
                {/* 까만 배경 아무 데나 클릭하면 스위치가 꺼짐(null) */}
                <img src={zoomImg} alt="Enlarged Detail" />
              </div>
            )}
    </div>
  );
};

