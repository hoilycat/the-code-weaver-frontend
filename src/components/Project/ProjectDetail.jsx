import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { API_BASE_URL, getImageUrl } from '../../config';
import { BADGE_ICONS, getProjectBadges, getTechBadges, parseProjectNotes, splitDescription } from './projectNotes';
import { fallbackProjects, mergeEditorialProject } from './fallbackProjects';
import './ProjectDetail.css'; 

export default function ProjectDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
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
      .then(data => setProject(mergeEditorialProject(data, fallbackProject)))
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
  const implementedItems = project.implemented || [];
  const evidenceItems = project.evidence || [];
  const nextValidationItems = project.nextValidation || [];
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
  const isWeldVision = Number(project.id) === 11 || project.title?.toLowerCase() === "weldvision";
  const isWeldVisionQA = Number(project.id) === 12 || project.title?.toLowerCase().includes("annotation qa");
  const isFocusMate = Number(project.id) === 1 || project.title?.toLowerCase().includes("focus mate");
  const isCoffee = Number(project.id) === 2 || project.title?.toLowerCase().includes("cof/fee");
  const isTeamProject = isSceneDiary || isFixie || project.category === "Team Project";
  const ownershipLabel = isTeamProject ? "Team Project" : "Solo Project";
  const ownershipIcon = isTeamProject ? "TM" : "SO";
  const displayedProjectBadges = projectBadges.filter(
    (badge) => badge !== "Solo Project" && badge !== "Team Project"
  );
  const sceneDiaryIntro = "SceneDiary는 여행 사진을 하루의 장면으로 읽고, 선택한 페르소나의 문체로 그 순간을 일기처럼 구성하는 앱입니다. 저는 Visual Design Lead로서 브랜드와 스플래시, 소개 이미지, A1 학술 포스터, 19장 발표자료의 시각 체계를 설계하고 최종 제작과 문장 QA를 맡았습니다. 프론트엔드에서는 사진 추가와 이미지 로딩·생성 대기 화면을 구현했으며, 백엔드 팀과는 데이터베이스 구조를 검토했습니다. 화면 연결과 교차 QA는 담당 팀원들과 함께 진행했습니다.";
  const fixieIntro = "Fixie는 QR 코드나 모델명으로 가전제품을 등록하고, 매뉴얼을 학습한 AI와 대화하며 필요한 해결 방법을 찾는 팀 프로젝트입니다. 저는 앱의 기본 구조와 서비스 디자인, 기기 등록·홈·AI 채팅·이력·설정 화면을 포함한 프론트엔드를 맡았습니다. 이후 Azure 배포 브랜치에서 Docker 기반 운영 환경과 Vercel·API 연결을 구성했습니다. GraphRAG 핵심과 백엔드는 팀원이 주도했으며, 오류 수정과 교차 QA는 함께 진행했습니다.";
  const focusMateIntro = "Focus Mate Berry는 사용자의 학습 상태를 감지하고, 이를 캐릭터의 반응으로 보여주는 집중 관리 서비스입니다. MediaPipe와 OpenCV로 자세와 자리 비움 상태를 감지하고, 결과에 따라 Berry의 성장, 경고, 수면 상태가 달라지도록 구성했습니다. 캐릭터와의 상호작용을 통해 사용자가 자신의 학습 상태를 자연스럽게 인식하도록 설계했습니다.";
  const coffeeIntro = "Cof/fee는 카페인을 마신 시각과 양을 기록하고, 시간에 따른 체내 잔존량을 확인하는 생활 기록 대시보드입니다. React와 Jotai로 섭취 기록과 상태를 관리하며 반감기 계산, 수면 신호, 금단 위험 알림을 하나의 흐름으로 구성했습니다. v3에서는 YIE GraphRAG를 연결해 기록 패턴과 관련된 논문 근거를 참고 정보로 제공합니다.";
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
      caption: "로고, 컬러 팔레트, 앱 아이콘, 3초 mp4 스플래시 방향을 비교하며 정리한 브랜드 보드입니다.",
    },
    {
      title: "Storyboard Sketch",
      src: "/media/scenediary-process/storyboard-sketch.png",
      caption: "최종 mp4 스플래시가 어떤 장면 순서로 압축될지 손스케치와 벡터 작업 방향을 함께 정리했습니다.",
    },
    {
      title: "Splash Prototype",
      src: "/media/scenediary-process/splash-prototype.png",
      caption: "장면 요소를 분리해 어떤 파츠가 먼저 등장하고 흡수될지 프로토타입으로 검토했습니다.",
    },
    {
      title: "Particle Iteration",
      src: "/media/scenediary-process/particle-iteration.png",
      caption: "앱 적용 시 무거워지는 문제를 줄이기 위해 실시간 파티클 대신 3초 mp4로 마무리하는 방향을 비교했습니다.",
    },
  ];
  const sceneDiaryVisualAssets = [
    {
      title: "Hero Image",
      src: "/media/scenediary-presentation/hero-image.webp",
      caption: "GPT로 생성한 이미지를 초안 소재로 삼아 바다와 구름을 직접 확장·리터칭하고, 로고와 카피를 배치해 서비스의 첫인상을 완성했습니다.",
    },
    {
      title: "Feature Flow Image",
      src: "/media/scenediary-presentation/feature-flow.webp",
      caption: "배경을 다시 편집한 뒤 실제 앱 화면을 합성해 사진 선택 → AI 분석 → 일기 생성 → 저장·조회 흐름이 한눈에 읽히도록 구성했습니다.",
    },
  ];
  const moodDnaRoleItems = [
    {
      title: "제품 전체 구현",
      body: "React 대시보드와 FastAPI 분석 서버를 설계해 이미지 업로드부터 분석 결과까지 이어지는 흐름을 만들었습니다.",
    },
    {
      title: "컴퓨터 비전 지표",
      body: "OpenCV 기반 밝기, 복잡도, 여백, 대칭성, 색상 DNA 지표를 추출해 감각적인 판단을 비교 가능한 수치로 바꿨습니다.",
    },
    {
      title: "AI 비평 파이프라인",
      body: "수치 분석 결과를 Gemini와 YIE GraphRAG 비평으로 연결해 디자인 피드백에 논문 근거를 붙였습니다.",
    },
    {
      title: "의사결정 대시보드 UX",
      body: "단일 분석, 비교 분석, 배치 오디션, 히스토리 흐름을 한 제품 안에서 탐색하도록 구성했습니다.",
    },
  ];

  const goBackToProjects = () => {
    const previousFilter = searchParams.get('from');
    const query = previousFilter ? `?projectFilter=${encodeURIComponent(previousFilter)}` : '';
    navigate(`/${query}#Projects`);
  };

  const isVideoUrl = (url = "") => {
    const cleanUrl = url.split("?")[0].split("#")[0].toLowerCase();
    return /\.(mp4|webm|mov|m4v)$/.test(cleanUrl);
  };

  const getPrimaryLinkLabel = (link = "") => {
    if (!link) return "";
    if (link.includes("github.com")) return isTeamProject ? "VIEW TEAM CODE ↗" : "VIEW CODE ↗";
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
      src: "/media/coffee/cof-fee-demo-dark.mp4",
      startAt: 6,
      endAt: 13.2,
      caption: "스플래시 이후 대시보드에서 섭취 기록과 잔존량을 확인하는 흐름을 보여줍니다.",
    },
    {
      title: "Splash Demo",
      type: "video",
      aspect: "phone",
      src: "/media/coffee/cof-fee-splash-only.mp4",
      startAt: 0,
      endAt: 3.1,
      caption: "앱 진입 시 로고와 캐릭터가 등장하는 3초 스플래시 과정을 보여줍니다.",
    },
    {
      title: "Onboarding Flow",
      type: "video",
      aspect: "phone",
      src: "/media/coffee/cof-fee-demo-v2.mp4",
      startAt: 5,
      endAt: 13.2,
      caption: "사용자 설정을 입력하는 온보딩부터 대시보드 진입까지의 흐름을 확인할 수 있습니다.",
    },
  ];

  const weldVisionReadmeMedia = [
    {
      title: "RT · VT Defect Overview",
      type: "image",
      aspect: "weldvision-overview",
      src: "/media/weldvision/weldvision-defect-overview.gif",
      caption: "RT와 VT 여섯 결함 사례를 2.5초 간격으로 비교합니다. 각 화면에서 검출 박스, 신뢰도와 전처리 근거가 어떻게 달라지는지 확인할 수 있습니다.",
    },
    {
      title: "RT · Slag Inclusion",
      type: "image",
      src: "/media/weldvision/01-rt-slag-inclusion.png",
      caption: "슬래그 혼입 후보 2개를 검출한 화면입니다. 최고 신뢰도 0.69와 전처리 비교 근거를 함께 표시합니다.",
    },
    {
      title: "RT · Lack of Fusion",
      type: "image",
      src: "/media/weldvision/02-rt-lack-of-fusion.png",
      caption: "융합 불량 후보 3개를 검출한 화면입니다. 서로 다른 크기의 저밀도 영역을 박스로 분리했습니다.",
    },
    {
      title: "RT · Crack",
      type: "image",
      src: "/media/weldvision/03-rt-crack.png",
      caption: "가늘고 세로로 이어지는 균열 후보 2개를 검출한 화면입니다. 최고 신뢰도는 0.81입니다.",
    },
    {
      title: "RT · Porosity",
      type: "image",
      src: "/media/weldvision/04-rt-porosity.png",
      caption: "육안으로 구분하기 어려운 작은 기공 후보를 표시하고 CLAHE·Gradient 등 보조 영상을 비교합니다.",
    },
    {
      title: "VT · Incomplete Penetration",
      type: "image",
      src: "/media/weldvision/05-vt-incomplete-penetration.png",
      caption: "용입 불량 4개와 언더컷 1개를 함께 검출한 혼합 사례입니다. 최고 신뢰도는 0.74입니다.",
    },
    {
      title: "VT · Undercut",
      type: "image",
      src: "/media/weldvision/06-vt-undercut.png",
      caption: "용접 비드 가장자리의 언더컷 후보 3개를 표시한 현장형 VT 검출 화면입니다.",
    },
  ];

  const weldVisionQaMedia = [
    {
      title: "QA Dashboard Tour",
      type: "image",
      aspect: "wide",
      src: "/media/weldvision-qa/qa-dashboard-tour.gif",
      caption: "검사 요약, 상태 판정 근거, 결함 분포, 충돌·중첩, 유사 이미지와 Release Manifest를 3초 간격으로 살펴봅니다.",
    },
  ];

  const fixieReadmeMedia = [
    {
      title: "Splash & onboarding",
      type: "video",
      aspect: "wide",
      src: "https://raw.githubusercontent.com/asd9244/Easy_Manual/deploy/azure-setup/media/Fixie_Model_01splash.mp4",
      caption: "직접 구성한 앱의 시작 화면과 브랜드 컬러, 스플래시·온보딩 흐름을 보여주는 팀 앱 시연입니다.",
    },
    {
      title: "Device registration flow",
      type: "video",
      aspect: "wide",
      src: "https://raw.githubusercontent.com/asd9244/Easy_Manual/deploy/azure-setup/media/Fixie_Model_02.mp4",
      caption: "기기 목록에서 모델을 검색하고 등록하는 사용자 흐름입니다. 앱 구조와 프론트엔드 화면을 중심으로 확인할 수 있습니다.",
    },
    {
      title: "GraphRAG manual conversation",
      type: "video",
      aspect: "wide",
      src: "https://raw.githubusercontent.com/asd9244/Easy_Manual/deploy/azure-setup/media/Fixie_Model_03_communication.mp4",
      caption: "팀 main 앱에서 촬영한 AI 매뉴얼 질의·응답 시연입니다. GraphRAG 검색과 백엔드는 팀원의 기여이며, 채팅 화면과 사용자 흐름을 연결했습니다.",
    },
  ];

  const readmeMedia = isFocusMate
    ? focusMateReadmeMedia
    : isCoffee
      ? coffeeReadmeMedia
      : isWeldVision
        ? weldVisionReadmeMedia
        : isWeldVisionQA
          ? weldVisionQaMedia
          : isFixie
            ? fixieReadmeMedia
            : [];
  const characterCompanions = isFocusMate ? [
    {
      name: "Berry studying",
      src: "https://raw.githubusercontent.com/hoilycat/Focus-Mate-Berry/master/berry-react/src/images/study_berry.gif",
      motion: "companion-roam-right companion-low",
    },
    {
      name: "Berry cheering",
      src: "https://raw.githubusercontent.com/hoilycat/Focus-Mate-Berry/master/berry-react/src/images/cheerberry.gif",
      motion: "companion-bob companion-high",
    },
    {
      name: "Berry resting",
      src: "https://raw.githubusercontent.com/hoilycat/Focus-Mate-Berry/master/berry-react/src/images/sleepingberry.gif",
      motion: "companion-roam-left companion-middle",
    },
  ] : isCoffee ? [
    {
      name: "Pro Bean",
      src: "https://raw.githubusercontent.com/hoilycat/Cof-fee-V3/master/cof-fee/src/assets/characters/pro_bean.png",
      motion: "companion-roam-right companion-low coffee-companion",
    },
    {
      name: "Coach Kong",
      src: "https://raw.githubusercontent.com/hoilycat/Cof-fee-V3/master/cof-fee/src/assets/characters/coach_kong.png",
      motion: "companion-bob companion-high coffee-companion",
    },
    {
      name: "Hustle Bean",
      src: "https://raw.githubusercontent.com/hoilycat/Cof-fee-V3/master/cof-fee/src/assets/characters/hustle_bean.png",
      motion: "companion-roam-left companion-middle coffee-companion",
    },
  ] : [];
  const heroMedia = getImageUrl(project.snapshot);
  // [수정] 베리와 커피는 섞여 있던 업로드 갤러리 대신 README 대표 미디어만 노출한다.
  const galleryImages = isFocusMate || isCoffee || isWeldVision
    ? []
    : (project.images || []).filter(img => img !== project.snapshot);
  const inlineImageLimit = groupedGalleryProjectIds.includes(Number(project.id)) ? 3 : galleryImages.length;
  const troubleshootingItems = project.troubleshooting || (isFocusMate ? [
    {
      title: "MediaPipe 실행 환경 호환성",
      problem: "Apple Silicon 환경의 전역 Python 3.12에서 MediaPipe 구형 API가 깨지며 실행이 중단됐습니다.",
      solution: "Python 3.10 전용 venv를 분리하고 의존성을 재설치해 vision, API, UI 서버가 한 번에 실행되도록 환경을 안정화했습니다.",
    },
    {
      title: "자세 경고 오탐",
      problem: "노트북 카메라 각도 때문에 정상 자세에서도 거북목 WARNING이 반복적으로 발생했습니다.",
      solution: "눈썹 좌표 기반 판정 임계값을 0.5에서 0.65로 완화하고, 실제로 고개가 깊게 숙여진 경우에만 반응하도록 튜닝했습니다.",
    },
    {
      title: "얼굴 미검출 피드백 지연",
      problem: "사용자가 고개를 숙여 얼굴이 사라졌는데도 시스템이 자리 비움 유예로 처리해 피드백이 늦었습니다.",
      solution: "얼굴 미검출 즉시 '딴짓 의심' 상태와 메시지를 노출해 감지 결과가 사용자 행동 교정으로 바로 이어지게 했습니다.",
    },
  ] : isCoffee ? [
    {
      title: "게이지와 수치 불일치",
      problem: "오늘 섭취량이 0mg인데 게이지는 이전 잔존량 기준으로 차 있어 수치와 시각화가 어긋났습니다.",
      solution: "선택된 모드 값을 담는 displayAmount를 기준으로 게이지와 숫자를 동시에 계산하도록 바꿔 UI 데이터 정합성을 맞췄습니다.",
    },
    {
      title: "선언 순서 오류",
      problem: "currentMessage가 characterMessages보다 먼저 평가되어 앱이 초기 렌더에서 멈췄습니다.",
      solution: "캐릭터 메시지 맵을 먼저 선언하고, 이후 현재 상태 메시지를 계산하도록 선언 순서를 재배치했습니다.",
    },
    {
      title: "기록 목록 애니메이션 구조",
      problem: "History.tsx에 motion.div와 AnimatePresence를 넣는 과정에서 태그 구조가 꼬여 리스트가 깨졌습니다.",
      solution: "map 구조와 닫는 태그 위치를 정리하고 AnimatePresence를 리스트 바깥에 배치해 삭제 애니메이션을 안정화했습니다.",
    },
  ] : []);

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
    <div className={`mag-clean-page ${isDataVisualization ? "dataviz-page" : ""}`}>
      
      {/* 2. 좌측 상단 프로젝트 목록 복귀 네비게이션 */}
      <nav className="mag-fixed-nav">
        <button onClick={goBackToProjects} className="back-btn-minimal">
          <span className="back-arrow-line">←</span>
          <span>Back to Projects</span>
        </button>
      </nav>

      {/* 4. 와이드 썸네일 섹션 */}
      <header className="mag-wide-hero">
        <div className={`hero-img-wrapper ${isWeldVision ? "weldvision-hero" : ""} ${isWeldVisionQA ? "weldvision-qa-hero" : ""}`}>
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
            <span>{project.editorialLabel || project.category}</span>
            <span className="sep">/</span>
            <span>{project.period || '2026'}</span>
          </div>
          <div className="project-badge-row" aria-label="Project tags">
            {displayedProjectBadges.map((badge) => (
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
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="mag-visit-btn">
                    {getPrimaryLinkLabel(project.link)}
                  </a>
                )}
                {isDataVisualization && (
                  <p className="desktop-notice">Tableau Public 대시보드는 태블릿보다 PC 환경에서 안정적으로 확인할 수 있습니다.</p>
                )}
                {(project.resources || []).filter((resource) => resource.url !== project.link).length > 0 && (
                  <div className="project-resource-list" aria-label="Related project links">
                    {(project.resources || [])
                      .filter((resource) => resource.url !== project.link)
                      .map((resource) => (
                        <a key={`${resource.label}-${resource.url}`} href={resource.url} target="_blank" rel="noopener noreferrer">
                          {resource.label} ↗
                        </a>
                      ))}
                  </div>
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
                <span className="story-intro-label">프로젝트 소개</span>
                <p className="para-text intro-text drop-cap" style={{ whiteSpace: 'pre-wrap' }}>
                  {renderTextWithLinks(isSceneDiary ? sceneDiaryIntro : isFixie ? fixieIntro : isFocusMate ? focusMateIntro : isCoffee ? coffeeIntro : introParagraph)}
                </p>
              </div>
            )}

            {(implementedItems.length > 0 || evidenceItems.length > 0) && (
              <section className="development-status-panel" aria-labelledby="project-proof-title">
                <div className="development-status-head">
                  <div>
                    <div className="notes-kicker">구현 범위와 근거</div>
                    <h2 id="project-proof-title">구현한 내용</h2>
                    <p>{project.proofSummary}</p>
                  </div>
                  <div className="development-progress" aria-label={`${evidenceItems.length} evidence items`}>
                    <strong>{evidenceItems.length}</strong>
                    <span>evidence items</span>
                  </div>
                </div>

                <div className="roadmap-grid">
                  <article>
                    <h3>구현</h3>
                    <ul>
                      {implementedItems.map((item) => (
                        <li key={item} className="done"><span aria-hidden="true">✓</span>{item}</li>
                      ))}
                    </ul>
                  </article>
                  <article>
                    <h3>확인 근거</h3>
                    <ul>
                      {evidenceItems.map((item) => (
                        <li key={item} className="done"><span aria-hidden="true">•</span>{item}</li>
                      ))}
                    </ul>
                    {nextValidationItems.length > 0 && (
                      <>
                      <h3>다음 검증</h3>
                      <ul>
                        {nextValidationItems.map((item) => (
                          <li key={item} className="todo"><span aria-hidden="true">→</span>{item}</li>
                        ))}
                      </ul>
                      </>
                    )}
                  </article>
                </div>
              </section>
            )}

            {readmeMedia.length > 0 && (
              <section className="readme-media-panel" aria-labelledby="readme-media-title">
                <div className="notes-kicker">화면 기록</div>
                <h2 id="readme-media-title">
                  {isCoffee
                    ? "Caffeine flow in motion"
                    : isWeldVision
                      ? "RT · VT detection evidence"
                      : isWeldVisionQA
                        ? "Dataset QA result in motion"
                        : isFixie
                          ? "From app structure to manual conversation"
                          : "Interaction and posture preview"}
                </h2>
                <div className={`readme-media-grid ${isCoffee ? "coffee-media-grid" : ""} ${isWeldVision ? "weldvision-media-grid" : ""} ${isFixie ? "fixie-media-grid" : ""}`}>
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
                            onLoadedMetadata={(event) => {
                              if (Number.isFinite(item.startAt) && item.startAt > 0) {
                                event.currentTarget.currentTime = item.startAt;
                              }
                            }}
                            onCanPlay={(event) => {
                              event.currentTarget.play().catch(() => {});
                            }}
                            onTimeUpdate={(event) => {
                              if (Number.isFinite(item.endAt) && event.currentTarget.currentTime >= item.endAt) {
                                event.currentTarget.currentTime = item.startAt || 0;
                                event.currentTarget.play();
                              }
                            }}
                            aria-label={`${item.title} video`}
                          />
                        ) : (
                          <img
                            src={item.src}
                            alt={item.title}
                            loading="lazy"
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
                <div className="notes-kicker">문제 해결 기록</div>
                <h2 id="troubleshooting-title">확인하고 수정한 문제</h2>
                <div className="troubleshooting-list">
                  {troubleshootingItems.map((item, index) => (
                    <article key={item.title} className="troubleshooting-card">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <h3>{item.title}</h3>
                      <p><strong>문제</strong>{item.problem}</p>
                      <p><strong>해결</strong>{item.solution}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {isFixie && (
              <section className="fixie-work-panel" aria-labelledby="fixie-work-title">
                <div className="notes-kicker">Design · Deployment · Collaboration</div>
                <h2 id="fixie-work-title">One app, clearly shared ownership</h2>
                <p className="scene-diary-section-lead">
                  팀장이 주도한 회의에서 앱의 기본 구조를 맡아 화면 디자인과 프론트엔드 흐름을 만들었습니다.
                  팀원은 GraphRAG와 백엔드 핵심을 맡았고, API 연결·오류 수정·교차 QA는 함께 진행했습니다.
                  이후 개인 배포 브랜치에서 Azure 운영 환경을 구성하고 실제 서버 제약에 맞춰 애플리케이션을 조정했습니다.
                </p>
                <div className="persona-process-grid">
                  <article>
                    <span>01</span>
                    <h3>App Structure &amp; UX</h3>
                    <p>앱 뼈대와 반응형 내비게이션을 만들고 스플래시·등록·홈·채팅·이력·설정 화면 흐름을 설계했습니다.</p>
                  </article>
                  <article>
                    <span>02</span>
                    <h3>API &amp; Auth Flow</h3>
                    <p>Axios 요청, JWT 세션, OAuth 콜백과 Vercel 프록시를 실제 사용자 흐름에 맞춰 연결했습니다.</p>
                  </article>
                  <article>
                    <span>03</span>
                    <h3>Azure Deployment</h3>
                    <p>Spring Boot·FastAPI·PostgreSQL·Neo4j·Cloudflare Tunnel을 Azure VM과 Docker Compose로 구성했습니다.</p>
                  </article>
                  <article>
                    <span>04</span>
                    <h3>Production Recovery</h3>
                    <p>3GB VM의 로컬 LLM 메모리 부족 문제를 확인하고 Gemini API 기반으로 AI 실행 구조를 조정했습니다.</p>
                  </article>
                  <article>
                    <span>05</span>
                    <h3>Shared QA</h3>
                    <p>정기 회의에서 진행 상황을 공유하고, 프론트엔드와 백엔드의 자잘한 문제는 팀원과 함께 고쳤습니다.</p>
                  </article>
                  <article>
                    <span>06</span>
                    <h3>Environment Diagnosis</h3>
                    <p>로그인이 막히자 실행 환경 차이를 의심해 API 주소와 OAuth 콜백 설정을 확인했고, 다음 날 정상 동작을 확인했습니다.</p>
                  </article>
                </div>
                <p className="fixie-deployment-note">
                  Azure for Students 크레딧 소진으로 상시 서버는 현재 중단됐습니다. 데모는 팀 main 앱에서 촬영했으며,
                  deploy/azure-setup 브랜치에서 같은 앱의 배포 구성과 수정 내역을 확인할 수 있습니다.
                </p>
              </section>
            )}

            {isMoodDNA && (
              <section className="mood-dna-role-panel" aria-labelledby="mood-dna-role-title">
                <div className="notes-kicker">담당 범위</div>
                <h2 id="mood-dna-role-title">분석 화면부터 비평 결과까지</h2>
                <p>
                  Mood-DNA V3는 감으로만 설명하던 디자인 판단을 수치와 근거로 번역하는 도구입니다.
                  React 분석 UI, FastAPI 이미지 분석 서버, OpenCV 지표 추출, Gemini/YIE GraphRAG 비평 흐름을 하나의 경험으로 엮었습니다.
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
                <div className="notes-kicker">화면 기록</div>
                <h2 id="mood-dna-demo-title">무드 선택부터 AI 비평까지</h2>
                <div className="mood-dna-demo-grid">
                  <article className="mood-dna-demo-card live-analysis">
                    <img
                      src="/media/mood-dna/poster-live-analysis.gif"
                      alt="생성예술 전시 포스터 4안을 실제 Mood-DNA 백엔드로 분석하는 화면"
                      loading="lazy"
                    />
                    <h3>포스터 분석 비교</h3>
                    <p>직접 제작한 포스터 4안을 실제 백엔드에 입력해 OpenCV 지표와 YIE GraphRAG 논문 근거, EXAONE 비평까지 확인한 기록입니다.</p>
                  </article>
                  <article className="mood-dna-demo-card">
                    <img
                      src="/media/mood-dna/demo-preview.gif"
                      alt="무드와 업종 선택이 목표 DNA와 분석 화면에 반영되는 Mood-DNA 사용 흐름"
                      loading="lazy"
                    />
                    <h3>무드 선택과 분석 흐름</h3>
                    <p>현재 버전의 무드·업종·태그 선택이 목표 DNA를 바꾸고, 업로드 이미지의 지표와 AI 비평으로 이어지는 과정을 보여줍니다.</p>
                  </article>
                  <article className="mood-dna-demo-card">
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
                    <h3>전체 분석 흐름</h3>
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
                    <h3>시작 화면 모션</h3>
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
              <section className="scene-diary-visual-panel" aria-labelledby="scene-diary-visual-title">
                <div className="notes-kicker">Visual Direction</div>
                <h2 id="scene-diary-visual-title">Generated as a base, directed by hand</h2>
                <p className="scene-diary-section-lead">
                  이미지 생성 결과를 그대로 사용하지 않았습니다. 필요한 요소를 골라 바다와 구름을 화면 비율에 맞게 연장하고,
                  연결부와 밀도를 직접 리터칭했습니다. 이후 브랜드 문구와 실제 앱 화면을 합성해 두 장의 소개 이미지로 완성했습니다.
                </p>
                <div className="scene-diary-asset-grid">
                  {sceneDiaryVisualAssets.map((item) => (
                    <article className="scene-diary-asset-card" key={item.title}>
                      <button type="button" onClick={() => setZoomImg(item.src)} aria-label={`${item.title} 이미지 크게 보기`}>
                        <img src={item.src} alt={`SceneDiary ${item.title}`} />
                      </button>
                      <h3>{item.title}</h3>
                      <p>{item.caption}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {isSceneDiary && (
              <section className="scene-diary-poster-panel" aria-labelledby="scene-diary-poster-title">
                <div className="scene-diary-poster-copy">
                  <div className="notes-kicker">Poster Design Lead</div>
                  <h2 id="scene-diary-poster-title">Prepared before the result</h2>
                  <p>
                    초기 AI 생성 포스터는 방향을 확인하기 위한 초안이었습니다. 팀의 의견을 반영해 본선 진출 여부가
                    정해지기 전인 7월 중순부터 학술 포스터 형식으로 전체 화면을 다시 설계했습니다. 이미지 편집과 정보
                    배치, 문장 교정, 오탈자 검수, 최종 제작까지 직접 맡았고 팀원들은 중간 확인에 참여했습니다.
                  </p>
                  <ol className="scene-diary-workflow-list">
                    <li><span>01</span> AI 초안과 팀 피드백으로 학술 포스터 방향 정리</li>
                    <li><span>02</span> 시각 요소 분해·재편집과 정보 위계 전면 재설계</li>
                    <li><span>03</span> 서비스 흐름·기술 구조·다이어그램 중심으로 재구성</li>
                    <li><span>04</span> 문장 교정·오탈자 검수와 표현 일관성 점검</li>
                    <li><span>05</span> A1 출력 기준 가독성 확인과 최종 제작</li>
                  </ol>
                </div>
                <button className="scene-diary-poster-image" type="button" onClick={() => setZoomImg("/media/scenediary-presentation/a1-poster.webp")} aria-label="SceneDiary A1 포스터 크게 보기">
                  <img src="/media/scenediary-presentation/a1-poster.webp" alt="SceneDiary A1 final poster" />
                </button>
              </section>
            )}

            {isSceneDiary && (
              <section className="scene-diary-deck-panel" aria-labelledby="scene-diary-deck-title">
                <div className="notes-kicker">Presentation Design Lead</div>
                <h2 id="scene-diary-deck-title">19 slides, one visual and technical narrative</h2>
                <p className="scene-diary-section-lead">
                  팀원들이 넣은 초기 내용을 바탕으로 PPT 도형 도구를 이용해 이미지와 다이어그램을 다시 만들고,
                  설명이 빠져 있던 GraphRAG와 AI 생성 흐름을 보강했습니다. 이후 팀 공동 첨삭과 팀원의 후속 편집을 거쳐
                  전체 장표의 흐름과 표현을 최종 확인했습니다.
                </p>
                <div className="scene-diary-deck-frame">
                  <video
                    src="/media/scenediary-presentation/presentation-flow.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    preload="metadata"
                    aria-label="SceneDiary 발표자료 핵심 장표 시퀀스"
                  />
                </div>
                <div className="scene-diary-collab-flow" aria-label="SceneDiary 발표자료 협업 과정">
                  <span>팀원 초기 내용</span><b>→</b><span>도형·다이어그램 재구성</span><b>→</b><span>기술 설명 보강</span><b>→</b><span>팀 공동 첨삭</span><b>→</b><span>최종 QA</span>
                </div>
              </section>
            )}

            {isSceneDiary && (
              <section className="scene-diary-visual-panel" aria-labelledby="scene-diary-teamwork-title">
                <div className="notes-kicker">Team Collaboration</div>
                <h2 id="scene-diary-teamwork-title">Built together, reviewed together</h2>
                <p className="scene-diary-section-lead">
                  팀장이 페이지를 고르게 나누어 팀원 모두 각자 맡은 화면의 프론트엔드와 백엔드 작업에 참여했습니다.
                  정기 회의에서는 진행 상황과 수정 사항을 공유하고, 주요 기획과 디자인 방향은 다수결로 정했습니다.
                  앱 이름과 팀 이름은 함께 만들었고, 직접 제작한 로고와 스플래시도 팀 검토를 거쳐 확정했습니다.
                  저는 담당 화면 구현과 데이터베이스 구조 논의에 참여했으며, 화면 연결과 교차 QA는 팀원들과 함께
                  진행했습니다.
                </p>
                <div className="persona-process-grid">
                  <article>
                    <span>01</span>
                    <h3>Regular Sync &amp; Vote</h3>
                    <p>페이지를 고르게 분담하고 정기 회의에서 진행 상황을 공유하며 주요 방향은 다수결로 합의했습니다.</p>
                  </article>
                  <article>
                    <span>02</span>
                    <h3>Naming &amp; Identity</h3>
                    <p>앱 이름과 팀 이름은 함께 정하고, 제가 제작한 로고·스플래시는 팀 검토를 거쳐 확정했습니다.</p>
                  </article>
                  <article>
                    <span>03</span>
                    <h3>Owned Screens</h3>
                    <p>사진 추가와 이미지 로딩·생성 대기 화면을 구현하고 앱 디자인 방향을 논의했습니다.</p>
                  </article>
                  <article>
                    <span>04</span>
                    <h3>Database Review</h3>
                    <p>백엔드 팀과 데이터베이스 구조를 살펴보며 포함할 저장 항목과 구성 방향을 논의했습니다.</p>
                  </article>
                  <article>
                    <span>05</span>
                    <h3>Team-Owned Systems</h3>
                    <p>모두 프론트엔드와 백엔드에 참여했으며 GraphRAG·문체 모델·편집 기능은 담당 팀원이 맡았습니다.</p>
                  </article>
                  <article>
                    <span>06</span>
                    <h3>Integration &amp; QA</h3>
                    <p>다음 화면 연결은 담당 팀원과 협업하고 페이지 이동과 동작은 서로 교차 검수했습니다.</p>
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
                    앱 이름과 팀 이름은 팀원들과 함께 정했습니다. 로고와 3초 mp4 스플래시는 여행 사진이 일기 장면으로
                    변환되는 흐름을 기준으로 직접 설계하고, 여러 시안과 구현 제약을 팀원들과 검토한 뒤 최종 확정했습니다.
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
                <div className="notes-kicker">프로젝트 기록</div>
                <h2 id="project-notes-title">구현 상세</h2>
                <div className="notes-badge-row" aria-label="Project type tags">
                  {displayedProjectBadges.map((badge) => (
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

      {characterCompanions.length > 0 && (
        <div className={`project-character-companions ${isCoffee ? "coffee-character-companions" : "berry-character-companions"}`} aria-hidden="true">
          {characterCompanions.map((character) => (
            <img
              key={character.name}
              src={character.src}
              alt=""
              className={`project-character-companion ${character.motion}`}
            />
          ))}
        </div>
      )}

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
