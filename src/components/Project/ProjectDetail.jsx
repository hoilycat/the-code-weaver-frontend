import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_BASE_URL, getImageUrl } from '../../config';
import { BADGE_ICONS, getProjectBadges, getTechBadges, parseProjectNotes, splitDescription } from './projectNotes';
import { fallbackProjects } from './fallbackProjects';
import './ProjectDetail.css'; 

export default function ProjectDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [project, setProject] = useState(null); 
  const isAdmin = localStorage.getItem("adminToken") === "secret-key-12345";

  // 사진 확대 모달 상태
  const [zoomImg, setZoomImg] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fallbackProject = fallbackProjects.find((item) => Number(item.id) === Number(id));
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    window.scrollTo(0, 0);
    setProject(fallbackProject || null);

    fetch(`${API_BASE_URL}/api/projects/${id}`, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`Project detail failed: ${res.status}`);
        return res.json();
      })
      .then(data => setProject(data))
      .catch(err => {
        console.warn("프로젝트 상세 로딩 실패, 저장된 프로젝트를 사용합니다.", err);
      })
      .finally(() => clearTimeout(timeoutId));

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [id]);

  if (!project) return <div className="loading">아카이브 여는 중... 🕯️</div>;

  const { storyText, notesText } = splitDescription(project.description);
  const paragraphs = storyText ? storyText.split('\n\n') : [];
  const introParagraph = paragraphs[0] || "";
  const bodyParagraphs = paragraphs.slice(1);
  const noteSections = parseProjectNotes(notesText);
  const projectBadges = getProjectBadges(project, noteSections);
  const techBadges = getTechBadges(noteSections, project);
  const hasTechStackSection = noteSections.some((section) => section.title === "Tech Stack");
  const displayedNoteSections = noteSections.filter((section) => {
    if (section.title === "Project Type") return false;
    if (section.title === "Tech Stack" && techBadges.length === 0) return false;
    return true;
  });
  if (!hasTechStackSection && techBadges.length > 0) {
    displayedNoteSections.unshift({ title: "Tech Stack", lines: techBadges });
  }
  const isDataVisualization = project.category === "Data Visualization";
  const isSceneDiary = Number(project.id) === 10 || project.title?.toLowerCase().includes("scenediary");
  const isFixie = project.title?.toLowerCase().includes("fixie");
  const isMoodDNA = project.title?.toLowerCase().includes("mood-dna");
  const isFocusMate = Number(project.id) === 1 || project.title?.toLowerCase().includes("focus mate");
  const isCoffee = Number(project.id) === 2 || project.title?.toLowerCase().includes("cof/fee");
  const isTeamProject = isSceneDiary || isFixie || project.category === "Team Project";
  const ownershipLabel = isTeamProject ? "Team Project" : "Solo Project";
  const ownershipIcon = isTeamProject ? "TM" : "SO";
  const sceneDiaryIntro = "SceneDiary는 사용자가 업로드한 여행 사진을 AI가 해석하고, 선택한 페르소나의 문체로 그 순간을 일기처럼 풀어내는 앱입니다.";
  const fixieIntro = "가전제품 매뉴얼은 두꺼운 종이에 빽빽한 글씨로 가득합니다. Fixie는 그 불편함에서 출발했습니다. QR 코드나 모델명을 스캔해 기기를 등록하면, 매뉴얼을 학습한 AI 픽시와 대화하며 필요한 해결 방법을 바로 찾을 수 있도록 설계했습니다.";
  const focusMateIntro = "Focus Mate Berry는 단순한 공부 타이머가 아니라, 사용자의 자세와 자리 비움 상태를 감지해 캐릭터의 성장, 경고, 수면 상태로 되돌려주는 AI 공부 파트너입니다. MediaPipe와 OpenCV 기반 감지 로직을 상태 머신과 연결해 집중 행동을 자연스럽게 유지하도록 설계했습니다.";
  const coffeeIntro = "Cof/fee는 카페인 섭취를 단순 기록하는 앱이 아니라, 반감기 기반 잔존량과 하루 총 섭취량을 나눠 보여주며 사용자가 수면과 금단 위험을 스스로 조절하도록 돕는 카페인 관리 앱입니다. 수치, 캐릭터 반응, AI 인사이트를 한 흐름으로 묶는 데 집중했습니다.";
  const groupedGalleryProjectIds = [1, 2, 3];
  const sceneDiaryVideos = [
    {
      label: "Dark splash",
      src: "/media/scenediary-splash-dark-full-60fps.mp4",
    },
    {
      label: "Light splash",
      src: "/media/scenediary-splash-light-full-60fps.mp4",
    },
  ];
  const sceneDiaryProcessImages = [
    {
      title: "Logo System",
      src: "/media/scenediary-process/brand-board.png",
      caption: "로고와 스플래시 시안, 컬러 팔레트, 앱 아이콘 방향을 비교하며 정리한 브랜드 보드입니다.",
    },
    {
      title: "Storyboard Sketch",
      src: "/media/scenediary-process/storyboard-sketch.png",
      caption: "스플래시가 어떤 장면 순서로 움직일지 손스케치와 벡터 작업 방향을 함께 정리했습니다.",
    },
    {
      title: "Splash Prototype",
      src: "/media/scenediary-process/splash-prototype.png",
      caption: "장면 요소를 분리해 어떤 파츠가 먼저 등장하고 흡수될지 프로토타입으로 검토했습니다.",
    },
    {
      title: "Particle Iteration",
      src: "/media/scenediary-process/particle-iteration.png",
      caption: "앱 적용 시 무거워지는 문제를 줄이기 위해 사진 파티클과 최종 mp4 방향을 비교했습니다.",
    },
  ];
  const moodDnaRoleItems = [
    {
      title: "Full-stack Product Build",
      body: "React 대시보드와 FastAPI 분석 서버를 혼자 설계하고 구현했습니다.",
    },
    {
      title: "Computer Vision Metrics",
      body: "OpenCV 기반 밝기, 복잡도, 여백, 대칭성, 색상 DNA 지표를 추출했습니다.",
    },
    {
      title: "AI Critique Pipeline",
      body: "수치 분석 결과를 Gemini/YIE GraphRAG 비평으로 연결해 근거 있는 디자인 피드백을 생성했습니다.",
    },
    {
      title: "Decision Dashboard UX",
      body: "단일 분석, 비교 분석, 배치 오디션, 히스토리 흐름을 한 화면에서 탐색하도록 구성했습니다.",
    },
  ];

  const goBackToProjects = () => {
    navigate('/#Projects');
  };

  const isVideoUrl = (url = "") => {
    const cleanUrl = url.split("?")[0].split("#")[0].toLowerCase();
    return /\.(mp4|webm|mov|m4v)$/.test(cleanUrl);
  };

  const getPrimaryLinkLabel = (link = "") => {
    if (!link) return "";
    if (link.includes("github.com")) return "VIEW CODE ↗";
    if (isVideoUrl(link) || link.includes("youtu.be") || link.includes("youtube.com") || link.includes("vimeo.com")) {
      return "WATCH DEMO ↗";
    }
    return "VIEW PROJECT ↗";
  };

  const focusMateReadmeMedia = [
    {
      title: "Berry Interaction",
      type: "image",
      aspect: "portrait",
      src: "https://raw.githubusercontent.com/hoilycat/Focus-Mate-Berry/master/The-Growth-Journey.gif",
      caption: "README의 캐릭터 상호작용 GIF입니다. 사용자의 상태에 따라 베리가 실시간으로 반응하는 흐름을 보여줍니다.",
    },
    {
      title: "Posture Demo",
      type: "image",
      aspect: "wide",
      src: "https://raw.githubusercontent.com/hoilycat/Focus-Mate-Berry/master/berry-posture-demo.gif",
      caption: "README의 자세 감지 데모 GIF입니다. MediaPipe 기반 자세와 시선 추적 화면을 보여줍니다.",
    },
  ];

  const coffeeReadmeMedia = [
    {
      title: "Main Demo",
      type: "video",
      aspect: "phone",
      src: "https://raw.githubusercontent.com/hoilycat/Cof-fee-V3/master/docs/media/cof-fee-demo-dark.mp4",
      caption: "README의 메인 데모 영상입니다. Cof/fee의 다크 UI와 주요 사용 흐름을 보여줍니다.",
    },
    {
      title: "Splash Demo",
      type: "video",
      aspect: "phone",
      src: "https://raw.githubusercontent.com/hoilycat/Cof-fee-V3/master/docs/media/cof-fee-splash-only.mp4",
      caption: "README의 스플래시 데모 영상입니다. 앱 진입 모션과 브랜드 톤을 확인할 수 있습니다.",
    },
    {
      title: "Additional Demo",
      type: "video",
      aspect: "phone",
      src: "https://raw.githubusercontent.com/hoilycat/Cof-fee-V3/master/docs/media/cof-fee-demo-v2.mp4",
      caption: "README의 추가 데모 영상입니다. 업데이트된 화면 흐름을 보조 자료로 정리했습니다.",
    },
  ];

  const readmeMedia = isFocusMate ? focusMateReadmeMedia : isCoffee ? coffeeReadmeMedia : [];
  const heroMedia = getImageUrl(project.snapshot);
  // [수정] 베리와 커피는 섞여 있던 업로드 갤러리 대신 README 대표 미디어만 노출한다.
  const galleryImages = isFocusMate || isCoffee ? [] : (project.images || []).filter(img => img !== project.snapshot);
  const inlineImageLimit = groupedGalleryProjectIds.includes(Number(project.id)) ? 3 : galleryImages.length;
  const troubleshootingItems = isFocusMate ? [
    {
      title: "MediaPipe Runtime Compatibility",
      problem: "Apple Silicon 환경의 전역 Python 3.12에서 MediaPipe 구형 API가 깨지며 실행이 중단됐습니다.",
      solution: "Python 3.10 전용 venv를 분리하고 의존성을 재설치해 vision, API, UI 서버가 한 번에 실행되도록 환경을 안정화했습니다.",
    },
    {
      title: "False Positive Posture Alerts",
      problem: "노트북 카메라 각도 때문에 정상 자세에서도 거북목 WARNING이 반복적으로 발생했습니다.",
      solution: "눈썹 좌표 기반 판정 임계값을 0.5에서 0.65로 완화하고, 실제로 고개가 깊게 숙여진 경우에만 반응하도록 튜닝했습니다.",
    },
    {
      title: "Face Lost UX Gap",
      problem: "사용자가 고개를 숙여 얼굴이 사라졌는데도 시스템이 자리 비움 유예로 처리해 피드백이 늦었습니다.",
      solution: "얼굴 미검출 즉시 '딴짓 의심' 상태와 메시지를 노출해 감지 결과가 사용자 행동 교정으로 바로 이어지게 했습니다.",
    },
  ] : isCoffee ? [
    {
      title: "Gauge and Number Mismatch",
      problem: "오늘 섭취량이 0mg인데 게이지는 이전 잔존량 기준으로 차 있어 수치와 시각화가 어긋났습니다.",
      solution: "선택된 모드 값을 담는 displayAmount를 기준으로 게이지와 숫자를 동시에 계산하도록 바꿔 UI 데이터 정합성을 맞췄습니다.",
    },
    {
      title: "Temporal Dead Zone Error",
      problem: "currentMessage가 characterMessages보다 먼저 평가되어 앱이 초기 렌더에서 멈췄습니다.",
      solution: "캐릭터 메시지 맵을 먼저 선언하고, 이후 현재 상태 메시지를 계산하도록 선언 순서를 재배치했습니다.",
    },
    {
      title: "Animated History Markup",
      problem: "History.tsx에 motion.div와 AnimatePresence를 넣는 과정에서 태그 구조가 꼬여 리스트가 깨졌습니다.",
      solution: "map 구조와 닫는 태그 위치를 정리하고 AnimatePresence를 리스트 바깥에 배치해 삭제 애니메이션을 안정화했습니다.",
    },
  ] : [];

  const trimTrailingPunctuation = (url = "") => {
    const match = url.match(/[.,!?)]*$/);
    const trailing = match?.[0] || "";
    return {
      href: trailing ? url.slice(0, -trailing.length) : url,
      trailing
    };
  };

  // [추가] 텍스트 안에 있는 http:// 나 https:// 주소를 찾아 링크나 영상으로 바꿔주는 함수
  const renderTextWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g; // 주소 찾는 정규식
    const parts = text.split(urlRegex); // 주소 기준으로 텍스트 쪼개기
    
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        const { href, trailing } = trimTrailingPunctuation(part);
        if (isVideoUrl(href)) {
          return (
            <React.Fragment key={i}>
              <span className="inline-video-frame">
                <video
                  src={href}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="metadata"
                />
              </span>
              {trailing}
            </React.Fragment>
          );
        }

        // 주소인 부분은 <a> 태그로 감싸서 반환
        return (
          <React.Fragment key={i}>
            <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: '#547792', textDecoration: 'underline', fontWeight: 'bold' }}>
              {href}
            </a>
            {trailing}
          </React.Fragment>
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
          {isVideoUrl(heroMedia) ? (
            <video
              src={heroMedia}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={`${project.title} hero demo video`}
            />
          ) : (
            <img src={heroMedia} alt="Main Wide" />
          )}
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
            <span className={`project-pill ownership ${isTeamProject ? "team" : "solo"}`} aria-label={ownershipLabel}>
              <span className="pill-icon" aria-hidden="true">{ownershipIcon}</span>
              <span>{ownershipLabel}</span>
            </span>
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
                {isSceneDiary ? (
                  <div className="private-repo-card">
                    <span>PRIVATE REPOSITORY</span>
                    <p>Code access is restricted by team agreement.</p>
                  </div>
                ) : project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="mag-visit-btn">
                    {getPrimaryLinkLabel(project.link)}
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
                  {renderTextWithLinks(isSceneDiary ? sceneDiaryIntro : isFixie ? fixieIntro : isFocusMate ? focusMateIntro : isCoffee ? coffeeIntro : introParagraph)}
                </p>
              </div>
            )}

            {readmeMedia.length > 0 && (
              <section className="readme-media-panel" aria-labelledby="readme-media-title">
                <div className="notes-kicker">Demo Highlights</div>
                <h2 id="readme-media-title">{isCoffee ? "Caffeine flow in motion" : "Interaction and posture preview"}</h2>
                <div className={`readme-media-grid ${isCoffee ? "coffee-media-grid" : ""}`}>
                  {readmeMedia.map((item) => (
                    <article className={`readme-media-card ${item.aspect || ""}`} key={item.title}>
                      <div className="readme-media-frame">
                        {item.type === "video" ? (
                          <video
                            src={item.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                            preload="metadata"
                            aria-label={`${item.title} video`}
                          />
                        ) : (
                          <img
                            src={item.src}
                            alt={item.title}
                            onClick={() => setZoomImg(item.src)}
                          />
                        )}
                      </div>
                      <h3>{item.title}</h3>
                      <p>{item.caption}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {troubleshootingItems.length > 0 && (
              <section className="troubleshooting-panel" aria-labelledby="troubleshooting-title">
                <div className="notes-kicker">Troubleshooting</div>
                <h2 id="troubleshooting-title">Problems I traced and fixed</h2>
                <div className="troubleshooting-list">
                  {troubleshootingItems.map((item, index) => (
                    <article key={item.title} className="troubleshooting-card">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{item.title}</h3>
                      <p><strong>Problem</strong>{item.problem}</p>
                      <p><strong>Fix</strong>{item.solution}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {isMoodDNA && (
              <section className="mood-dna-role-panel" aria-labelledby="mood-dna-role-title">
                <div className="notes-kicker">My Role</div>
                <h2 id="mood-dna-role-title">AI design partner, built end to end</h2>
                <p>
                  Mood-DNA V3는 기획부터 디자인 분석 UI, 컴퓨터비전 지표 추출, AI 비평 파이프라인,
                  GraphRAG 연동까지 전체 흐름을 설계하고 구현한 프로젝트입니다.
                </p>
                <div className="mood-dna-role-grid">
                  {moodDnaRoleItems.map((item) => (
                    <article key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {isMoodDNA && (
              <section className="mood-dna-demo-panel" aria-labelledby="mood-dna-demo-title">
                <div className="notes-kicker">Demo Preview</div>
                <h2 id="mood-dna-demo-title">From visual metrics to AI critique</h2>
                <div className="mood-dna-demo-grid">
                  <article className="mood-dna-demo-card wide">
                    <video
                      src="/media/mood-dna/demo-full.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      preload="metadata"
                      aria-label="Mood-DNA V3 full demo video"
                    />
                    <h3>Full analysis flow</h3>
                    <p>이미지 업로드부터 DNA 지표, 레이더 차트, AI 비평 결과까지 이어지는 전체 시연입니다.</p>
                  </article>
                  <article className="mood-dna-demo-card">
                    <video
                      src="/media/mood-dna/splash-smooth.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                      preload="metadata"
                      aria-label="Mood-DNA V3 splash video"
                    />
                    <h3>Splash motion</h3>
                    <p>무드 분석 도구의 정체성을 보여주는 짧은 시작 모션입니다.</p>
                  </article>
                </div>
              </section>
            )}

            {isSceneDiary && (
              <section className="scene-diary-role-panel" aria-labelledby="scene-diary-role-title">
                <div className="notes-kicker">My Role</div>
                <h2 id="scene-diary-role-title">Romantic Persona Writing</h2>
                <p>
                  저는 SceneDiary의 로맨틱 페르소나 문체를 담당했습니다. 원본문장은 직접 작성했고,
                  GPT로 문장의 흐름과 전달력을 점검한 뒤 Claude를 통해 더 부드럽고 달콤한 톤으로 첨삭했습니다.
                </p>
                <div className="persona-process-grid">
                  <article>
                    <span>01</span>
                    <h3>Original Lines</h3>
                    <p>여행 장면에 어울리는 로맨틱 일기 원문을 직접 작성했습니다.</p>
                  </article>
                  <article>
                    <span>02</span>
                    <h3>GPT Feedback</h3>
                    <p>문장의 구조, 흐름, 전달력을 점검하며 읽히는 리듬을 다듬었습니다.</p>
                  </article>
                  <article>
                    <span>03</span>
                    <h3>Claude Refinement</h3>
                    <p>로맨틱 페르소나에 맞게 더 달콤하고 부드러운 문장으로 첨삭했습니다.</p>
                  </article>
                </div>
              </section>
            )}

            {isSceneDiary && (
              <section className="scene-diary-process-panel" aria-labelledby="scene-diary-process-title">
                <div className="notes-kicker">Brand & Splash Process</div>
                <h2 id="scene-diary-process-title">Logo, storyboard, and motion decisions</h2>

                <div className="scene-diary-logo-feature">
                  <img
                    src="/media/scenediary-process/scene-diary-logo.svg"
                    alt="SceneDiary logo"
                  />
                  <p>
                    로고와 스플래시 모션은 여행 사진이 일기 장면으로 변환되는 흐름을 기준으로 설계했습니다.
                    최종 화면에 들어가기 전 여러 시안과 구현 제약을 함께 검토했습니다.
                  </p>
                </div>

                <div className="scene-diary-process-grid">
                  {sceneDiaryProcessImages.map((item) => (
                    <article className="scene-diary-process-card" key={item.title}>
                      <button
                        type="button"
                        onClick={() => setZoomImg(item.src)}
                        aria-label={`${item.title} 이미지 크게 보기`}
                      >
                        <img src={item.src} alt={`${item.title} process board`} />
                      </button>
                      <h3>{item.title}</h3>
                      <p>{item.caption}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {isSceneDiary && (
              <section className="scene-diary-motion-panel" aria-labelledby="scene-diary-motion-title">
                <div className="notes-kicker">Motion Preview</div>
                <h2 id="scene-diary-motion-title">SceneDiary Splash</h2>
                <div className="scene-diary-video-grid">
                  {sceneDiaryVideos.map((video) => (
                    <article className="scene-diary-video-card" key={video.label}>
                      <div className="scene-diary-phone-frame">
                        <video
                          src={video.src}
                          autoPlay
                          loop
                          muted
                          playsInline
                          controls
                          preload="metadata"
                          aria-label={`SceneDiary ${video.label} video`}
                        />
                      </div>
                      <span>{video.label}</span>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {bodyParagraphs.map((para, index) => {
              const hasImage = index < inlineImageLimit && !!galleryImages[index];

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
            {galleryImages.length > inlineImageLimit && (
              <div className={`extra-gallery-grid ${isDataVisualization ? "dataviz-extra-icons" : ""}`}>
                {galleryImages.slice(inlineImageLimit).map((img, idx) => (
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

            {displayedNoteSections.length > 0 && (
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
