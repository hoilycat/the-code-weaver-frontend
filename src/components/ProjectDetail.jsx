import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetail = () => {
  const { id } = useParams(); // URL의 :id 값을 가져옵니다.
  const navigate = useNavigate();

  return (
    <div style={{ padding: '100px', textAlign: 'center', backgroundColor: '#EAE0CF', minHeight: '100vh' }}>
      <h1>프로젝트 상세 페이지 준비 중 🛠️</h1>
      <p>지금 보시는 프로젝트 ID는 <strong>{id}</strong>번입니다.</p>
      <button 
        onClick={() => navigate('/')} 
        style={{ padding: '10px 20px', cursor: 'pointer', marginTop: '20px' }}
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default ProjectDetail;