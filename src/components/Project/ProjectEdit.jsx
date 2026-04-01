import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './ProjectDetail.css'; 

const ProjectEdit = () => {
  const { id } = useParams(); // 어떤 글을 고칠지 ID 가져오기
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const SERVER_URL = "http://localhost:8080";

  const [formData, setFormData] = useState({
    title: '', category: 'AI Design', status: 'In Progress',
    description: '', link: '', period: ''
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]); // 기존 사진 보관용

  // 1. 🛡️ 보안 및 기존 데이터 불러오기
  useEffect(() => {
    const isAdmin = localStorage.getItem("adminToken") === "secret-key-12345";
    if (!isAdmin) {
      navigate("/login");
      return;
    }

    // 수정할 기존 데이터를 서버에서 가져옴
    fetch(`${SERVER_URL}/api/projects/${id}`)
      .then(res => res.json())
      .then(data => {
        setFormData({
          title: data.title,
          category: data.category,
          status: data.status,
          description: data.description,
          link: data.link,
          period: data.period
        });
        setExistingImages(data.images || []);
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      let imagePaths = existingImages; // 기본은 기존 사진 유지

      // 2. 만약 새 사진을 선택했다면 업로드 진행
      if (selectedFiles.length > 0) {
        const uploadData = new FormData();
        Array.from(selectedFiles).forEach(file => uploadData.append("files", file));
        const res = await fetch(`${SERVER_URL}/api/projects/upload-multiple`, {
          method: "POST", body: uploadData
        });
        imagePaths = await res.json(); // 새 사진 경로로 교체
      }

      // 3. 수정 요청 (PUT)
      const projectRes = await fetch(`${SERVER_URL}/api/projects/${id}`, {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData, 
          images: imagePaths,
          snapshot: imagePaths.length > 0 ? imagePaths[0] : "" 
        })
      });

      if (projectRes.ok) {
        alert("🎉 작품 정보가 성공적으로 수정되었습니다!");
        navigate(`/project/${id}`); // 수정 후 상세페이지로 이동
      }
    } catch (err) { alert("수정 중 에러 발생!"); }
    finally { setIsSubmitting(false); }
  };

  return (
    <div className="mag-editorial-container" style={{paddingTop: '100px'}}>
      <nav className="mag-top-nav">
        <button onClick={() => navigate(-1)} className="back-arrow-btn">CANCEL ✕</button>
      </nav>

      <form onSubmit={handleSubmit} className="mag-article" style={{maxWidth: '800px', margin: '0 auto'}}>
        <header className="mag-header-hero" style={{padding: '0', height: 'auto', marginBottom: '50px'}}>
           <h1 className="mag-hero-title" style={{fontSize: '4rem', borderBottom: '2px solid #213448'}}>Edit Archive</h1>
        </header>

        <div style={{display:'flex', flexDirection:'column', gap:'25px'}}>
          <input name="title" value={formData.title} placeholder="PROJECT TITLE" onChange={handleChange} required 
                 style={{fontSize: '1.8rem', border:'none', borderBottom:'1px solid #213448', background:'transparent', fontFamily:'Superclarendon'}} />
          
          <div style={{display:'flex', gap:'15px'}}>
            <select name="category" value={formData.category} onChange={handleChange} style={{flex:1, padding:'12px', background:'transparent', border:'1px solid #213448'}}>
              <option value="AI Design">AI Design</option>
              <option value="Public Data Viz">Public Data Viz</option>
              <option value="AIoT Service">AIoT Service</option>
              <option value="Data Storytelling">Data Storytelling</option>
              <option value="Lifestyle Viz">Lifestyle Viz</option>
              <option value="Tableau Viz">Tableau Viz</option>
            </select>
            <select name="status" value={formData.status} onChange={handleChange} style={{flex:1, padding:'12px', background:'transparent', border:'1px solid #213448'}}>
              <option value="In Progress">In Progress</option>
              <option value="Done">Finished</option>
            </select>
          </div>

          <div style={{display:'flex', gap:'15px'}}>
             <input name="period" value={formData.period} placeholder="PERIOD" onChange={handleChange} style={{flex:1, padding:'12px', background:'transparent', border:'1px solid #213448'}} />
             <input name="link" value={formData.link} placeholder="SERVICE URL" onChange={handleChange} style={{flex:1, padding:'12px', background:'transparent', border:'1px solid #213448'}} />
          </div>

          <textarea name="description" value={formData.description} rows="15" onChange={handleChange} required 
                    style={{padding:'20px', background:'transparent', border:'1px solid #213448', fontSize:'1.1rem', lineHeight:'1.8'}} />

          <div style={{border: '1px dashed #213448', padding: '40px', textAlign: 'center'}}>
            <p style={{marginBottom:'15px', fontFamily:'Superclarendon', fontSize:'0.8rem'}}>새 사진으로 교체하려면 선택하세요 (기존 사진은 사라집니다)</p>
            <input type="file" multiple accept="image/*" onChange={(e) => setSelectedFiles(e.target.files)} />
          </div>

          <button type="submit" className="mag-visit-btn" 
                  style={{border:'none', cursor:'pointer', width:'100%', padding:'25px', fontSize:'1.2rem', marginTop:'20px', background:'#213448', color:'#EAE0CF'}}>
            {isSubmitting ? "UPDATING..." : "SAVE CHANGES"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectEdit;