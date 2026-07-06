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
    next: [
      { label: "운영 경험과 개선 로그 누적", done: false },
    ],
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
    ],
    next: [
      { label: "사용자별 자세 기준값 보정", done: false },
      { label: "장시간 사용 오탐률 개선", done: false },
      { label: "알림/리포트 UX 고도화", done: false },
    ],
  },
  2: {
    statusKey: "mvp",
    checkpoints: [
      { label: "Caffeine half-life calculator", done: true },
      { label: "Onboarding and reduction roadmap", done: true },
      { label: "Dashboard, history, stats flow", done: true },
      { label: "YIE pattern insight query", done: true },
    ],
    next: [
      { label: "YIE evidence card polish", done: false },
      { label: "v3 UI redesign pass", done: false },
      { label: "Backend sync layer", done: false },
    ],
  },
  3: {
    statusKey: "mvp",
    checkpoints: [
      { label: "OpenCV visual metrics", done: true },
      { label: "EasyOCR and color DNA", done: true },
      { label: "Design Audition ranking", done: true },
      { label: "YIE GraphRAG critique", done: true },
    ],
    next: [
      { label: "업종별 Target Insight 고도화", done: false },
      { label: "Design history smart archive", done: false },
      { label: "Reference search UX refinement", done: false },
    ],
  },
  4: {
    statusKey: "developing",
    checkpoints: [
      { label: "FastAPI agentic core", done: true },
      { label: "Neo4j domain graph schema", done: true },
      { label: "Design/Coffee GraphRAG modules", done: true },
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
    next: [
      { label: "실사용 피드백 기반 UX 개선", done: false },
    ],
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
    ],
    next: [
      { label: "Release build QA", done: false },
      { label: "Persona writing polish", done: false },
      { label: "Team handoff and docs cleanup", done: false },
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
