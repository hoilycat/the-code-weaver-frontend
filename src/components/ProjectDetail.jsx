import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProjectDetail.css'; // 나중에 스타일을 위해 추가

const ProjectDetail = () => {
  const { id } = useParams(); // URL에서 ID 추출
  const navigate = useNavigate();
  const [project, setProject] = useState(null); // 프로젝트 데이터를 담을 상태

  useEffect(() => {
    // 💡 백엔드에서 해당 ID의 데이터만 가져오기
    fetch(`http://localhost:8080/api/projects/${id}`)
      .then(res => res.json())
      .then(data => setProject(data))
      .catch(err => console.error("상세 정보 로딩 실패!", err));
  }, [id]);

  // 데이터를 아직 못 불러왔을 때 (로딩 중)
  if (!project) return <div style={{padding: '100px', textAlign:'center'}}>전시실 입장 중... 🕯️</div>;

  return (
    <div className="project-detail-page">
      {/* 상단 네비게이션/뒤로가기 */}
      <nav className="detail-nav">
        <button onClick={() => navigate('/')}>← Back to Lobby</button>
      </nav>

      <header className="detail-header">
        <span className="detail-tag">{project.category}</span>
        <h1>{project.title}</h1>
        <p className="detail-status">{project.status}</p>
      </header>

      <main className="detail-content">
        {/* 프로젝트 이미지 (있을 경우) */}
        {project.snapshot && (
          <div className="detail-image-box">
             <img src={project.snapshot} alt={project.title} />
          </div>
        )}

        {/* 상세 설명 */}
        <section className="detail-description">
          <h3>Project Story</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{project.description}</p>
        </section>

        {/* 서비스 바로가기 버튼 */}
        {project.link && (
          <div className="detail-link-section">
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="visit-btn">
              {project.category === 'Tableau Viz' ? '📊 Tableau에서 보기' : '🚀 서비스 바로가기'}
            </a>
          </div>
        )}
      </main>

      <footer className="detail-footer">
        <p>© 2026 The Weaver - Project Archive</p>
      </footer>
    </div>
  );
};

export default ProjectDetail;
