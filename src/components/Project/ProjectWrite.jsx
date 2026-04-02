import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectDetail.css';

const ProjectWrite = () => {
  const navigate = useNavigate();

   const [formData, setFormData] = useState({
    title: '', 
    category: 'AI Design', 
    size: 'small',
    description: '', 
    status: 'In Progress', 
    link: '', 
    period: ''
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);


 // [보안 로직] 페이지 열리자마자 실행
  useEffect(() => {
    const isAdmin = localStorage.getItem("adminToken") === "secret-key-12345";
    if (!isAdmin) {
      alert("관리자 권한이 필요합니다. 로그인 페이지로 이동합니다.");
      navigate("/login"); // 로그인 안 했으면 쫓아냄
    }
  }, [navigate]);

  // 입력 필드 변경 시 formData 업데이트ß
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 사진 선택 시 최대 10장 제한
  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    if (selected.length > 10) {
      alert("사진은 최대 10장까지만 가능합니다!");
      e.target.value = ""; // 선택 취소
      return;
    }
    setSelectedFiles(selected);
  };


  // 핵심: 제출 버튼을 누르면 이미지 먼저 업로드 -> 그 다음 프로젝트 정보 저장
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      let imagePaths = [];
      // 1. 이미지 먼저 보내기 (성공 가정)
      if (selectedFiles.length > 0) {
        const uploadData = new FormData();
        Array.from(selectedFiles).forEach(file => uploadData.append("files", file));
        const res = await fetch("http://localhost:8080/api/projects/upload-multiple", {
          method: "POST", body: uploadData
        });
        imagePaths = await res.json();
      }

    // 2. 최종 저장 시에는 반드시 '성공 확인'을 합니다!
    const projectRes = await fetch("http://localhost:8080/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        ...formData, 
        images: imagePaths,
        snapshot: imagePaths.length > 0 ? imagePaths[0] : "" 
      })
    });

    if (projectRes.ok) {
      alert("🎉 전시물이 성공적으로 등록되었습니다!");
      navigate("/");
    } else {
      alert("저장에 실패했습니다. 내용을 다시 확인해주세요.");
    }

  } catch (err) { 
    alert("서버 연결 에러: " + err.message); 
  } finally { 
    setIsSubmitting(false); 
  }
};

  return (
    <div className="magazine-layout" style={{ paddingTop: '50px' }}>
      <form onSubmit={handleSubmit} className="mag-article" style={{ width: '100%', maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2 className="mag-title" style={{fontSize: '2.5rem'}}>New Post</h2>
        
        {/*프로젝트 제목 입력*/}
        <input name="title" placeholder="제목" onChange={handleChange} required style={{padding: '10px'}} />
        
        <div style={{display: 'flex', gap: '10px'}}>
          <select name="category" onChange={handleChange} style={{flex: 1, padding: '10px'}}>
              <option value="AI Design">AI Design</option>
              <option value="Public Data Viz">Public Data Viz</option>
              <option value="AIoT Service">AIoT Service</option>
              <option value="Data Storytelling">Data Storytelling</option>
              <option value="Lifestyle Viz">Lifestyle Viz</option>
              <option value="Tableau Viz">Tableau Viz</option>
            </select>

          {/* 개발 상태 선택 추가 */}
            <select name="status" onChange={handleChange} style={{flex:1, padding:'12px', background:'transparent', border:'1px solid #213448'}}>
              <option value="In Progress">In Progress</option>
              <option value="Done">Finished</option>
            </select>
          </div>

        {/* 제작 기간 입력 */}
        <input 
          name="period" 
          placeholder="제작 기간 (예: 2026.01 - 03)" 
          onChange={handleChange} 
          style={{padding: '10px'}} 
        />

        {/* 서비스 링크 입력 */}
        <input 
          name="link" 
          placeholder="SERVICE URL (예: https://myproject.com)" 
          onChange={handleChange} 
          style={{padding: '10px'}} 
        />

        {/* 본문 입력: 문단 나눌 때 엔터 두 번! */}
        <textarea name="description" placeholder="STORY: 문단을 나누려면 엔터를 두 번(줄바꿈 두 번) 입력하세요. 사진이 그 사이에 배치됩니다." 
                  rows="15" onChange={handleChange} required 
                  style={{padding:'20px', background:'transparent', border:'1px solid #213448', fontSize:'1.1rem', lineHeight:'1.8'}} />

        {/* 사진 파일 선택 */}
        <div style={{border: '1px dashed #213448', padding: '40px', textAlign: 'center', backgroundColor: 'rgba(255,255,255,0.2)'}}>
          <label style={{ cursor: 'pointer' }}>
            <p style={{
              marginBottom: '15px', 
              fontFamily: 'Superclarendon', 
              fontSize: '0.8rem', 
              letterSpacing: '2px',
              color: '#213448'
            }}>
              ATTACH VISUAL ASSETS (MAX 10)
            </p>
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              onChange={handleFileChange} 
              style={{ display: 'none' }} //실제 못생긴 버튼은 숨기고
            />
            <div className="custom-upload-btn">파일 선택하기</div> {/* 대신 예쁜 가짜 버튼을 보여줌 */}
          </label>
          <input type="file" multiple accept="image/*" onChange={(e) => setSelectedFiles(e.target.files)} />
        </div>

        {/* 등록 버튼 */}
        <button 
          type="submit" 
          className="mag-visit-link" 
          disabled={isSubmitting}
          style={{border:'none', cursor:'pointer', width:'100%', padding:'25px', fontSize:'1.2rem', 
                  marginTop:'20px', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.5 : 1}}
        >
          {isSubmitting ? "등록 중..." : "전시물 등록하기"}
        </button>
      </form>
    </div>
  );
};

export default ProjectWrite;