export const STATUS_META = {
  production: {
    label: "Production Ready",
    shortLabel: "Production",
    tone: "production",
    summary: "실제 시연 가능, 핵심 기능과 README 정리가 완료된 상태입니다.",
  },
  mvp: {
    label: "MVP Complete",
    shortLabel: "MVP",
    tone: "mvp",
    summary: "핵심 사용 흐름은 구현됐고, 고도화 기능을 이어 붙이는 단계입니다.",
  },
  developing: {
    label: "Active Development",
    shortLabel: "Developing",
    tone: "developing",
    summary: "핵심 파이프라인과 아키텍처를 구축하며 검증 중인 단계입니다.",
  },
};

const DEFAULT_ROADMAPS = {
  done: {
    statusKey: "production",
    checkpoints: [
      { label: "Core experience", done: true },
      { label: "Demo-ready page", done: true },
      { label: "Project documentation", done: true },
    ],
    next: [],
  },
};

const ROADMAP_BY_ID = {
  1: {
    statusKey: "mvp",
    checkpoints: [
      { label: "MediaPipe/OpenCV posture detection", done: true },
      { label: "Berry state machine", done: true },
      { label: "React dashboard and simulator", done: true },
      { label: "Gemini message flow", done: true },
      { label: "Kakao alert experiment", done: true },
      { label: "Turtle-neck warning overlay", done: true },
      { label: "README demo media", done: true },
    ],
    next: [
      { label: "사용자별 자세 기준값 보정", done: false },
      { label: "장시간 사용 오탐률 개선", done: false },
      { label: "멘트 은행/Gemini 하이브리드 최적화", done: false },
    ],
  },
  2: {
    statusKey: "mvp",
    checkpoints: [
      { label: "Caffeine half-life calculator", done: true },
      { label: "Sleep signal and headache forecast", done: true },
      { label: "Reaction Kong character system", done: true },
      { label: "Dashboard and history flow", done: true },
      { label: "Stats GraphRAG insight card", done: true },
      { label: "YIE /rag/query coffee domain", done: true },
      { label: "CoachChat live GraphRAG response", done: true },
      { label: "Demo media and Vitest checks", done: true },
    ],
    next: [
      { label: "Evidence source detail UI", done: false },
      { label: "Hosted YIE API environment wiring", done: false },
      { label: "Final v3 UI polish", done: false },
    ],
  },
  3: {
    statusKey: "mvp",
    checkpoints: [
      { label: "OpenCV/EasyOCR visual metrics", done: true },
      { label: "Color DNA and Radar Chart UI", done: true },
      { label: "Design Audition ranking", done: true },
      { label: "YIE /rag/query design critique", done: true },
      { label: "GraphRAG evidence card UI", done: true },
      { label: "Style Benchmarking references", done: true },
      { label: "v3 UI redesign and demo assets", done: true },
    ],
    next: [
      { label: "업종별 Target Insight 고도화", done: false },
      { label: "Design history smart archive", done: false },
    ],
  },
  4: {
    statusKey: "mvp",
    checkpoints: [
      { label: "FastAPI Agentic Core", done: true },
      { label: "Neo4j GraphRAG schema", done: true },
      { label: "Design/Coffee domain modules", done: true },
      { label: "Health and design chunk ingestion", done: true },
      { label: "/rag/query shared endpoint", done: true },
      { label: "/rag/evidence debug endpoint", done: true },
      { label: "Provider and search agent structure", done: true },
    ],
    next: [
      { label: "실제 운영 데이터 ingestion", done: false },
      { label: "Cross-domain insight query", done: false },
      { label: "Packy/travel domain expansion", done: false },
    ],
  },
  5: {
    statusKey: "production",
    checkpoints: [
      { label: "Device registration flow", done: true },
      { label: "AI manual chat UX", done: true },
      { label: "History and room recovery", done: true },
      { label: "Responsive frontend deployment", done: true },
    ],
    next: [],
  },
  6: {
    statusKey: "production",
    checkpoints: [
      { label: "Public data collection and cleanup", done: true },
      { label: "Traffic, sales, stay-time analysis", done: true },
      { label: "Tableau dashboard published", done: true },
      { label: "Portfolio narrative and visuals", done: true },
    ],
    next: [],
  },
  7: {
    statusKey: "production",
    checkpoints: [
      { label: "Leisure survey data analysis", done: true },
      { label: "Time, region, age segmentation", done: true },
      { label: "Tableau dashboard published", done: true },
      { label: "Portfolio narrative and visuals", done: true },
    ],
    next: [],
  },
  8: {
    statusKey: "production",
    checkpoints: [
      { label: "9,000+ artifact rows cleaned", done: true },
      { label: "Human-in-the-loop category rules", done: true },
      { label: "Tableau dashboard published", done: true },
      { label: "Portfolio narrative and visuals", done: true },
    ],
    next: [],
  },
  9: {
    statusKey: "production",
    checkpoints: [
      { label: "130-year name dataset analysis", done: true },
      { label: "Popularity and diversity metrics", done: true },
      { label: "Tableau dashboard published", done: true },
      { label: "Portfolio narrative and visuals", done: true },
    ],
    next: [],
  },
  10: {
    statusKey: "mvp",
    checkpoints: [
      { label: "3-second animated splash overlay", done: true },
      { label: "EXIF/GPS pre-extraction", done: true },
      { label: "Upload image and thumbnail split", done: true },
      { label: "Generation status polling", done: true },
      { label: "Android media location permission flow", done: true },
      { label: "Writing and map flow integration", done: true },
      { label: "Persona-based diary writing", done: true },
    ],
    next: [
      { label: "Release build QA", done: false },
      { label: "Team handoff and docs cleanup", done: false },
    ],
  },
  11: {
    statusKey: "developing",
    checkpoints: [
      { label: "OpenCV C++ environment", done: true },
      { label: "X-ray preprocessing pipeline", done: true },
      { label: "Contour and GT polygon visualization", done: true },
      { label: "Feature extraction design", done: true },
      { label: "SVM 4-class classifier", done: true },
      { label: "86.2% accuracy and result.json", done: true },
    ],
    next: [
      { label: "Confusion Matrix analysis", done: false },
      { label: "YOLOv8 defect detection", done: false },
      { label: "Risk scoring and cause rules", done: false },
      { label: "Gradio/HuggingFace demo", done: false },
    ],
  },
};

const ROADMAP_BY_TITLE = [
  {
    match: "Y-Insight",
    roadmap: ROADMAP_BY_ID[4],
  },
  {
    match: "Mood-DNA",
    roadmap: ROADMAP_BY_ID[3],
  },
  {
    match: "Cof/fee",
    roadmap: ROADMAP_BY_ID[2],
  },
  {
    match: "Focus Mate",
    roadmap: ROADMAP_BY_ID[1],
  },
  {
    match: "SceneDiary",
    roadmap: ROADMAP_BY_ID[10],
  },
  {
    match: "Fixie",
    roadmap: ROADMAP_BY_ID[5],
  },
  {
    match: "WeldVision",
    roadmap: ROADMAP_BY_ID[11],
  },
];

export const getProjectRoadmap = (project = {}) => {
  const byId = ROADMAP_BY_ID[Number(project.id)];
  if (byId) return byId;

  const byTitle = ROADMAP_BY_TITLE.find(({ match }) => project.title?.includes(match));
  if (byTitle) return byTitle.roadmap;

  if (project.status === "Done") return DEFAULT_ROADMAPS.done;

  return {
    statusKey: "developing",
    checkpoints: [
      { label: "Core direction defined", done: true },
      { label: "Implementation in progress", done: false },
    ],
    next: [
      { label: "시연 가능한 흐름으로 정리", done: false },
    ],
  };
};

export const getDevelopmentStatus = (project = {}) => {
  const roadmap = getProjectRoadmap(project);
  return STATUS_META[roadmap.statusKey] || STATUS_META.developing;
};
