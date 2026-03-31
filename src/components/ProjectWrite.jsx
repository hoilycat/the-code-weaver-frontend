import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectDetail.css';

const ProjectWrite = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '', category: 'AI Design', size: 'small',
    description: '', status: 'In Progress', link: '', period: ''
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imagePaths = [];
      if (selectedFiles.length > 0) {
        const uploadData = new FormData();
        // 중요: 배열을 하나씩 append 해서 백엔드에서 MultipartFile[]로 받기.
        Array.from(selectedFiles).forEach(file => uploadData.append("files", file));

        const uploadRes = await fetch("http://localhost:8080/api/projects/upload-multiple", {
          method: "POST",
          body: uploadData,
        });
        imagePaths = await uploadRes.json();
      }

      const projectRes = await fetch("http://localhost:8080/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData, 
          images: imagePaths,
          snapshot: imagePaths.length > 0 ? imagePaths[0] : "" 
        })
      });

     // 데이터 저장 (첫 번째 사진은 snapshot으로, 전체는 images로)
      await fetch("http://localhost:8080/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData, 
          images: imagePaths,
          snapshot: imagePaths.length > 0 ? imagePaths[0] : "" 
        })
      });

      alert("전시 완료!");
      navigate("/");
    } catch (err) { alert("등록 실패!"); }
  };

  return (
    <div className="magazine-layout" style={{ paddingTop: '50px' }}>
      <form onSubmit={handleSubmit} className="mag-article" style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <h2 className="mag-title" style={{fontSize: '2.5rem'}}>New Post</h2>
        
        <input name="title" placeholder="제목" onChange={handleChange} required style={{padding: '10px'}} />
        
        <div style={{display: 'flex', gap: '10px'}}>
          <select name="category" onChange={handleChange} style={{flex: 1, padding: '10px'}}>
            <option value="AI Design">AI Design</option>
            <option value="Public Data Viz">Public Data Viz</option>
            <option value="Tableau Viz">Tableau Viz</option>
          </select>

          {/* 개발 상태 선택 추가 */}
          <select name="status" onChange={handleChange} style={{flex: 1, padding: '10px'}}>
            <option value="In Progress">진행 중 (In Progress)</option>
            <option value="Done">완료 (Finished)</option>
          </select>
        </div>

        <textarea name="description" placeholder="상세 설명" rows="10" onChange={handleChange} required style={{padding: '10px'}} />
        
        <div style={{border: '2px dashed #94B4C1', padding: '20px', textAlign: 'center'}}>
          <label> 사진 선택 (최대 10장): </label>
          <input type="file" multiple accept="image/*" onChange={(e) => setSelectedFiles(e.target.files)} />
        </div>

        <button type="submit" className="mag-visit-link" style={{border: 'none', cursor: 'pointer'}}>등록하기</button>
      </form>
    </div>
  );
};

export default ProjectWrite;