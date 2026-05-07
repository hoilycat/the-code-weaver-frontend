import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL, getImageUrl } from '../../config';
import { buildProjectDescription, EMPTY_PROJECT_NOTES, extractProjectDraft, PROJECT_TYPE_OPTIONS, TECH_OPTIONS } from './projectNotes';
import './ProjectDetail.css'; 

const ProjectEdit = () => {
  const { id } = useParams(); // 어떤 글을 고칠지 ID 가져오기
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '', category: 'AI Projects', status: 'In Progress',
    description: '', link: '', period: ''
  });
  const [projectNotes, setProjectNotes] = useState(EMPTY_PROJECT_NOTES);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [headerFile, setHeaderFile] = useState(null); // [추가] 새 헤더 이미지
  const [existingImages, setExistingImages] = useState([]); // 기존 사진 보관용
  const [existingSnapshot, setExistingSnapshot] = useState(""); // [추가] 기존 헤더 보관

  // 1. 🛡️ 보안 및 기존 데이터 불러오기
  useEffect(() => {
    const isAdmin = localStorage.getItem("adminToken") === "secret-key-12345";
    if (!isAdmin) {
      navigate("/login");
      return;
    }

    // 수정할 기존 데이터를 서버에서 가져옴
    fetch(`${API_BASE_URL}/api/projects/${id}`)
      .then(res => res.json())
      .then(data => {
        const draft = extractProjectDraft(data.description || "");
        setFormData({
          title: data.title,
          category: data.category,
          status: data.status,
          description: draft.storyText,
          link: data.link,
          period: data.period
        });
        setProjectNotes(draft.notes);
        setExistingImages(data.images || []);
        setExistingSnapshot(data.snapshot || ""); // [추가] 기존 스냅샷 저장
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNoteChange = (e) => {
    setProjectNotes({ ...projectNotes, [e.target.name]: e.target.value });
  };

  const toggleNoteOption = (field, value) => {
    setProjectNotes((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item) => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      let imagePaths = existingImages; 
      let headerPath = existingSnapshot;

      // 2. 새 헤더 이미지 업로드
      if (headerFile) {
        const headerData = new FormData();
        headerData.append("files", headerFile);
        const hRes = await fetch(`${API_BASE_URL}/api/projects/upload-multiple`, {
          method: "POST", body: headerData
        });
        if (!hRes.ok) throw new Error("Image upload failed");
        const hPaths = await hRes.json();
        headerPath = hPaths[0] || existingSnapshot;
      }

      // 3. 만약 새 갤러리 사진을 선택했다면 업로드 진행
      if (selectedFiles.length > 0) {
        const uploadData = new FormData();
        Array.from(selectedFiles).forEach(file => uploadData.append("files", file));
        const res = await fetch(`${API_BASE_URL}/api/projects/upload-multiple`, {
          method: "POST", body: uploadData
        });
        if (!res.ok) throw new Error("Image upload failed");
        imagePaths = await res.json(); 
      }

      // 4. 수정 요청 (PUT)
      const projectRes = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
        method: "PUT", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ...formData,
          description: buildProjectDescription(formData.description, projectNotes),
          images: imagePaths,
          snapshot: headerPath // 새 헤더 혹은 기존 헤더 유지
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
              <option value="AI Projects">AI Projects</option>
              <option value="Team Project">Team Project</option>
              <option value="Data Visualization">Data Visualization</option>
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

          <section className="project-form-card">
            <div className="notes-kicker">Project Notes Builder</div>
            <h3>Portfolio Summary</h3>
            <textarea
              name="role"
              value={projectNotes.role}
              onChange={handleNoteChange}
              rows="3"
              placeholder="Role / 맡은 역할"
            />

            <div className="option-group-label">Project Type</div>
            <div className="type-picker" aria-label="Project type">
              {PROJECT_TYPE_OPTIONS.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`type-choice ${projectNotes.projectTypes.includes(type) ? 'selected' : ''}`}
                  onClick={() => toggleNoteOption('projectTypes', type)}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="option-group-label">Tech Stack</div>
            <div className="tech-picker" aria-label="Tech stack">
              {TECH_OPTIONS.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  className={`tech-choice ${projectNotes.techStack.includes(tech) ? 'selected' : ''}`}
                  onClick={() => toggleNoteOption('techStack', tech)}
                >
                  {tech}
                </button>
              ))}
            </div>

            <div className="notes-form-grid">
              <textarea
                name="coreFeatures"
                value={projectNotes.coreFeatures}
                onChange={handleNoteChange}
                rows="5"
                placeholder={"Core Features / 핵심 기능\n한 줄에 하나씩 적으면 목록으로 보여요"}
              />
              <textarea
                name="challenge"
                value={projectNotes.challenge}
                onChange={handleNoteChange}
                rows="5"
                placeholder="Technical Challenge / 어려웠던 기술 포인트"
              />
              <textarea
                name="result"
                value={projectNotes.result}
                onChange={handleNoteChange}
                rows="4"
                placeholder="Result / Status / 결과와 현재 상태"
              />
            </div>
          </section>

          {/* [추가] 헤더 이미지 수정 영역 */}
          <div style={{border: '1px solid #213448', padding: '20px', textAlign: 'center', backgroundColor: 'rgba(84, 119, 146, 0.1)'}}>
            <p style={{fontFamily:'Superclarendon', fontSize:'0.7rem', marginBottom:'10px'}}>MAIN HERO IMAGE (CURRENTLY SET)</p>
            {existingSnapshot && (
              <img src={getImageUrl(existingSnapshot)} alt="Current Hero" style={{height:'80px', marginBottom:'10px', border:'1px solid #213448'}} />
            )}
            <label style={{ cursor: 'pointer', display:'block' }}>
              <input type="file" accept="image/*" onChange={(e) => setHeaderFile(e.target.files[0])} style={{ display: 'none' }} />
              <div className="custom-upload-btn" style={{ background: '#547792', color: 'white', margin:'0 auto', width:'fit-content' }}>
                {headerFile ? `변경됨: ${headerFile.name.substring(0,10)}...` : "헤더 이미지 변경하기"}
              </div>
            </label>
          </div>

          <div style={{border: '1px dashed #213448', padding: '40px', textAlign: 'center'}}>
            <p style={{marginBottom:'15px', fontFamily:'Superclarendon', fontSize:'0.8rem'}}>갤러리 사진 교체 (기존 사진은 사라집니다)</p>
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
