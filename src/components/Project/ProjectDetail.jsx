import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL, getImageUrl } from '../../config';
import { BADGE_ICONS, getProjectBadges, getTechBadges, parseProjectNotes, splitDescription } from './projectNotes';
import './ProjectDetail.css'; 

export default function ProjectDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [project, setProject] = useState(null); 
  const isAdmin = localStorage.getItem("adminToken") === "secret-key-12345";

  // 사진 확대 모달 상태
  const [zoomImg, setZoomImg] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_BASE_URL}/api/projects/${id}`)
      .then(res => res.json())
      .then(data => setProject(data))
      .catch(err => console.error(err));
  }, [id]);

  if (!project) return <div className="loading">아카이브 여는 중... 🕯️</div>;

  const { storyText, notesText } = splitDescription(project.description);
  const paragraphs = storyText ? storyText.split('\n\n') : [];
  const introParagraph = paragraphs[0] || "";
  const bodyParagraphs = paragraphs.slice(1);
  const noteSections = parseProjectNotes(notesText);
  const projectBadges = getProjectBadges(project, noteSections);
  const techBadges = getTechBadges(noteSections);
  const displayedNoteSections = noteSections.filter((section) => {
    if (section.title === "Project Type") return false;
    if (section.title === "Tech Stack" && techBadges.length === 0) return false;
    return true;
  });
  // [수정] 갤러리 이미지에서 '헤더 이미지(snapshot)'와 중복되는 사진은 제외하기 (깔끔한 레이아웃을 위해)
  const galleryImages = (project.images || []).filter(img => img !== project.snapshot);
  const isDataVisualization = project.category === "Data Visualization";

  const goBackToProjects = () => {
    navigate('/#Projects');
  };

  // [추가] 텍스트 안에 있는 http:// 나 https:// 주소를 찾아서 클릭 가능한 링크(<a>)로 바꿔주는 마법의 함수!
  const renderTextWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g; // 주소 찾는 정규식
    const parts = text.split(urlRegex); // 주소 기준으로 텍스트 쪼개기
    
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        // 주소인 부분은 <a> 태그로 감싸서 반환
        return (
          <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: '#547792', textDecoration: 'underline', fontWeight: 'bold' }}>
            {part}
          </a>
        );
      }
      return part; // 주소가 아닌 일반 글씨는 그냥 반환
    });
  };

  return (
    // 1. 전체 페이지 (격자무늬 배경이 깔리는 곳)
    <div className="mag-clean-page">
      
      {/* 2. 좌측 상단 프로젝트 목록 복귀 네비게이션 */}
      <nav className="mag-fixed-nav">
        <button onClick={goBackToProjects} className="back-btn-minimal">
          <span className="back-arrow-line">←</span>
          <span>Back to Projects</span>
        </button>
      </nav>

      {/* 4. 와이드 썸네일 섹션 */}
      <header className="mag-wide-hero">
        <div className="hero-img-wrapper">
          <img src={getImageUrl(project.snapshot)} alt="Main Wide" />
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
          <div className="project-badge-row" aria-label="Project tags">
            {projectBadges.map((badge) => (
              <span key={badge} className="project-pill">
                <span className="pill-icon">{BADGE_ICONS[badge] || badge.slice(0, 2).toUpperCase()}</span>
                <span>{badge}</span>
              </span>
            ))}
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

          {/* [글-사진] 편집형 리스트  */}
          <section className="mag-content-flow">
            {introParagraph && (
              <div className="story-intro-block">
                <span className="story-intro-label">Opening Note</span>
                <p className="para-text intro-text drop-cap" style={{ whiteSpace: 'pre-wrap' }}>
                  {renderTextWithLinks(introParagraph)}
                </p>
              </div>
            )}

            {bodyParagraphs.map((para, index) => {
              const hasImage = !!galleryImages[index];

              if (hasImage) {
                return (
                  <div key={index} className={`content-row ${isDataVisualization ? "dataviz-row" : ""}`}>
                    <div className="text-col">
                      <p className="para-text" style={{ whiteSpace: 'pre-wrap' }}>
                        {renderTextWithLinks(para)}
                      </p>
                    </div>
                    <div className="image-col">
                      <div className="image-frame">
                        <img 
                          src={getImageUrl(galleryImages[index])} 
                          alt={`Detail ${index}`} 
                          onClick={isDataVisualization ? undefined : () => setZoomImg(getImageUrl(galleryImages[index]))}
                          style={{ cursor: isDataVisualization ? "default" : "zoom-in" }}
                        />
                        {!isDataVisualization && <span className="fig-tag">FIG. {index + 1}</span>}
                      </div>
                    </div>
                  </div>
                );
              } else {
                // 이미지가 없는 문단: 본문 폭을 유지해 가독성 확보
                return (
                  <div key={index} className="text-only-block">
                    <p className="para-text" style={{ whiteSpace: 'pre-wrap' }}>
                      {renderTextWithLinks(para)}
                    </p>
                  </div>
                );
              }
            })}

            {/* 남은 사진들 하단 갤러리 처리 */}
            {galleryImages.length > bodyParagraphs.length && (
              <div className={`extra-gallery-grid ${isDataVisualization ? "dataviz-extra-icons" : ""}`}>
                {galleryImages.slice(bodyParagraphs.length).map((img, idx) => (
                  <div key={idx} className="extra-img-box">
                    <img 
                      src={getImageUrl(img)} 
                      alt="More" 
                      onClick={isDataVisualization ? undefined : () => setZoomImg(getImageUrl(img))}
                      style={{ cursor: isDataVisualization ? "default" : "zoom-in" }}
                    />
                  </div>
                ))}
              </div>
            )}

            {noteSections.length > 0 && (
              <section className="project-notes-panel" aria-labelledby="project-notes-title">
                <div className="notes-kicker">Project Notes</div>
                <h2 id="project-notes-title">What I Built</h2>
                <div className="notes-badge-row" aria-label="Project type tags">
                  {projectBadges.map((badge) => (
                    <span key={badge} className="project-pill compact">
                      <span className="pill-icon">{BADGE_ICONS[badge] || badge.slice(0, 2).toUpperCase()}</span>
                      <span>{badge}</span>
                    </span>
                  ))}
                </div>
                <div className="notes-grid">
                  {displayedNoteSections.map((section) => (
                    <article key={section.title} className="note-block">
                      <h3>{section.title}</h3>
                      {section.title === "Tech Stack" ? (
                        <div className="note-tech-list">
                          {techBadges.map((badge) => (
                            <span key={badge} className="tech-pill">
                              <span>{badge}</span>
                            </span>
                          ))}
                        </div>
                      ) : section.title === "Core Features" ? (
                        <ul>
                          {section.lines.map((line) => (
                            <li key={line}>{renderTextWithLinks(line.replace(/^-+\s*/, ""))}</li>
                          ))}
                        </ul>
                      ) : (
                        section.lines.map((line) => (
                          <p key={line}>{renderTextWithLinks(line)}</p>
                        ))
                      )}
                    </article>
                  ))}
                </div>
              </section>
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
