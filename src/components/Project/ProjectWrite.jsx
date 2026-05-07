import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import './ProjectDetail.css';

const ProjectWrite = () => {
  const navigate = useNavigate();

   const [formData, setFormData] = useState({
    title: '', 
    category: 'AI Projects', 
    size: 'small',
    description: '', 
    status: 'In Progress', 
    link: '', 
    period: ''
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [headerFile, setHeaderFile] = useState(null); // [추가] 헤더 전용 이미지 상태
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

  // [추가] 헤더 이미지 선택
  const handleHeaderChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setHeaderFile(e.target.files[0]);
    }
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
      let headerPath = "";

      // 1. 헤더 이미지 먼저 업로드 (있을 경우)
      if (headerFile) {
        const headerData = new FormData();
        headerData.append("files", headerFile); // 기존 API가 multiple용이라 "files"로 보냄
        const hRes = await fetch(`${API_BASE_URL}/api/projects/upload-multiple`, {
          method: "POST", body: headerData
        });
        if (!hRes.ok) throw new Error("Image upload failed");
        const hPaths = await hRes.json();
        headerPath = hPaths[0] || "";
      }

      // 2. 갤러리 이미지 업로드
      if (selectedFiles.length > 0) {
        const uploadData = new FormData();
        Array.from(selectedFiles).forEach(file => uploadData.append("files", file));
        const res = await fetch(`${API_BASE_URL}/api/projects/upload-multiple`, {
          method: "POST", body: uploadData
        });
        if (!res.ok) throw new Error("Image upload failed");
        imagePaths = await res.json();
      }

    // 3. 최종 저장
    const projectRes = await fetch(`${API_BASE_URL}/api/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        ...formData, 
        images: imagePaths,
        // 헤더 이미지가 있으면 그걸 쓰고, 없으면 갤러리 첫 번째 사진을 snapshot으로 사용
        snapshot: headerPath || (imagePaths.length > 0 ? imagePaths[0] : "") 
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
              <option value="AI Projects">AI Projects</option>
              <option value="Team Project">Team Project</option>
              <option value="Data Visualization">Data Visualization</option>
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

        {/* [추가] 헤더 이미지 선택 영역 */}
        <div style={{border: '1px solid #213448', padding: '20px', textAlign: 'center', backgroundColor: 'rgba(84, 119, 146, 0.1)'}}>
          <label style={{ cursor: 'pointer' }}>
            <p style={{ fontFamily: 'Superclarendon', fontSize: '0.7rem', letterSpacing: '1px', marginBottom: '10px' }}>
              MAIN HERO IMAGE (WIDE 21:9 RECOMMENDED)
            </p>
            <input type="file" accept="image/*" onChange={handleHeaderChange} style={{ display: 'none' }} />
            <div className="custom-upload-btn" style={{ background: '#547792', color: 'white' }}>
              {headerFile ? `선택됨: ${headerFile.name.substring(0, 15)}...` : "헤더 이미지 선택"}
            </div>
          </label>
        </div>

        {/* 사진 파일 선택 (갤러리) */}
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
            <div className="custom-upload-btn">갤러리 사진 선택</div> {/* 대신 예쁜 가짜 버튼을 보여줌 */}
          </label>
          {selectedFiles.length > 0 && <p style={{fontSize: '0.8rem', marginTop: '10px'}}>{selectedFiles.length}개의 파일 선택됨</p>}
        </div>
        <input type="file" multiple accept="image/*" onChange={(e) => setSelectedFiles(e.target.files)} />


        {/* 등록 버튼 */}
        <button 
          type="submit" 
          className="mag-visit-link" 
          disabled={isSubmitting}
          style={{border:'none', width:'100%', padding:'25px', fontSize:'1.2rem', 
                  marginTop:'20px', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.5 : 1}}
        >
          {isSubmitting ? "등록 중..." : "전시물 등록하기"}
        </button>
      </form>
    </div>
  );
};

export default ProjectWrite;
