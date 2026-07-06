export const fallbackProjects = [
  {
    id: 11,
    title: "🔥 WeldVision — 용접 결함 자동 검출 머신비전",
    category: "AI Projects",
    status: "In Progress",
    snapshot: "https://opengraph.githubassets.com/1/hoilycat/welding-defect-detection",
    link: "https://github.com/hoilycat/welding-defect-detection",
    period: "2026.06~진행 중",
    description: `WeldVision은 용접 X-ray 이미지에서 결함을 자동으로 분류하고, 이후 YOLOv8 기반 검출과 위험도 해석까지 확장하기 위해 만든 머신비전 프로젝트입니다.

처음부터 딥러닝 모델만 붙이는 대신, C++과 OpenCV로 결함의 물리적 특징을 직접 추출하는 구조에서 시작했습니다. CLAHE와 blur로 이미지를 전처리하고, Otsu threshold와 morphology로 결함 후보를 분리한 뒤 면적, 둘레, 원형도, 종횡비, 밝기 평균과 표준편차, blob 개수 같은 특징을 계산합니다. 이 특징들은 단순 분류용 수치가 아니라, 이후 위험도 스코어링과 결함 원인 추론에 재사용할 도메인 지식으로 설계했습니다.

현재 GitHub 최신 코드 기준으로 Stage 1 C++ OpenCV MVP는 SVM 4클래스 분류까지 구현되어 있으며, README에는 정확도 86.2%와 result.json 출력 흐름이 정리되어 있습니다. 다음 단계는 YOLOv8 파인튜닝, Gradio/HuggingFace Spaces 데모, C++ 결과와 YOLO 결과를 나란히 보여주는 품질 분석 화면입니다.

[Project Notes]

Role
C++ 기반 고전비전 파이프라인 설계, OpenCV 전처리와 특징 추출, SVM 분류 실험, README 로드맵 정리, C++ 결과를 Python/Gradio 단계로 넘기기 위한 JSON 브리지 설계를 담당했습니다.

Project Type
AI, Computer Vision

Tech Stack
C++, OpenCV, CMake, Python, Gradio

Core Features
- 용접 X-ray 이미지 입력과 한글 경로 처리
- CLAHE, blur, Canny 기반 전처리
- Otsu threshold와 morphology 기반 결함 후보 분리
- 컨투어 검출과 GT 폴리곤 시각화
- 면적, 둘레, 원형도, 종횡비, 밝기 통계, blob 개수 특징 추출
- OpenCV SVM 4클래스 분류 실험
- 86.2% 정확도 기록과 result.json 출력
- YOLOv8 검출 및 Gradio 데모 확장 로드맵

Visual Decision
이 프로젝트의 시각화는 예쁜 대시보드보다 검사자가 결함 근거를 이해하는 데 초점을 둡니다. 원본, 전처리, Canny, GT 폴리곤, C++ 특징 결과를 나란히 비교해 모델이 무엇을 보고 판단했는지 드러내는 방향으로 설계했습니다.

Technical Challenge
가장 어려운 부분은 결함 이미지의 물리적 특징을 수치로 안정적으로 뽑아내는 일이었습니다. 균열, 기공, 융합불량, 슬래그혼입은 형태와 밝기 패턴이 다르기 때문에 단일 threshold만으로는 부족했고, 전처리와 contour/morphology 조건을 반복 조정해야 했습니다. 또한 로컬 데이터 경로와 한글 폴더명을 C++에서 안정적으로 다루는 문제도 함께 해결했습니다.

Result / Status
GitHub 최신 기준 Stage 1은 C++ OpenCV 전처리, 특징 추출, SVM 4클래스 분류, 정확도 86.2%, result.json 출력까지 구현된 상태입니다. YOLOv8 검출, 위험도 스코어링, Gradio/HuggingFace Spaces 데모는 다음 단계로 남겨두었습니다.`,
  },
  {
    id: 10,
    title: "SceneDiary",
    category: "Team Project",
    status: "In Progress",
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1781057615264_effa159c-48a0-4312-b635-52651a1d3741.png",
    description: "SceneDiary는 사용자가 업로드한 여행 사진을 AI가 해석하고, 선택한 페르소나의 문체로 그 순간을 일기처럼 풀어내는 앱입니다.",
  },
  {
    id: 5,
    title: "🔧 Fixie — 복잡한 가전 매뉴얼을 AI로 재구조화하는 서비스",
    category: "Team Project",
    status: "Done",
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778142181960_5efe036a-769c-4a0b-bd32-778c9cba0190.png",
    description: "QR 코드나 모델명으로 기기를 등록하고, 매뉴얼을 학습한 AI와 대화하며 해결 방법을 찾는 서비스입니다.",
  },
  {
    id: 4,
    title: "🔮 Y-Insight Engine— 모든 앱을 연결하는 공통의 뇌",
    category: "AI Projects",
    status: "In Progress",
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778141843010_8e7a80de-dd23-462d-a5cc-2853a8eadb92.png",
    description: "여러 앱이 함께 쓸 수 있는 공통 AI 백엔드와 도메인별 GraphRAG 구조를 설계한 프로젝트입니다.",
  },
  {
    id: 3,
    title: "🌙 Mood-DNA — 디자이너의 감각을 논리로 증명하는 AI",
    category: "AI Projects",
    status: "In Progress",
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778141883119_e2320671-2664-48cd-acf4-abdd0aa16b5d.png",
    description: "OpenCV와 AI 비평을 결합해 디자인의 시각적 지표와 무드를 분석하는 디자인 파트너입니다.",
  },
  {
    id: 2,
    title: "☕ Cof/fee — 커피를 안전하게 즐기기 위한 카페인 관리 앱",
    category: "AI Projects",
    status: "In Progress",
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778140113100_d9f75ee8-3967-4ba2-ba8a-1f3b4100a994.png",
    description: "개인화된 카페인 반감기 계산과 수면 신호를 통해 커피 섭취를 조절하는 건강 관리 앱입니다.",
  },
  {
    id: 1,
    title: "🍓 Focus Mate Berry — 나의 공부 친구",
    category: "AI Projects",
    status: "In Progress",
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778119134337_berry.png",
    description: "MediaPipe와 OpenCV로 공부 자세를 감지하고 캐릭터 상태 변화로 집중을 돕는 AI 공부 친구입니다.",
  },
  {
    id: 9,
    title: "📛 당신의 이름은 어떤 시대인가요? — 130년의 기록",
    category: "Data Visualization",
    status: "Done",
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778240287323_08555f9c-269e-4366-aabd-acd88f04de4b.png",
    description: "1880년부터 2010년까지 미국 신생아 이름 데이터를 바탕으로 사회 변화와 이름의 흐름을 시각화했습니다.",
  },
  {
    id: 8,
    title: "🏛️ 땅에서 박물관까지 — 유물은 어디서 와서 어디로 가는가",
    category: "Data Visualization",
    status: "Done",
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778240284023_f1510614-5e40-47b9-9260-6c796a3599d7.png",
    description: "문화유산 데이터를 정제하고 유물이 발견지에서 박물관으로 이동하는 흐름을 Tableau로 시각화했습니다.",
  },
  {
    id: 7,
    title: "🎡 대한민국 사람들의 문화생활 엿보기",
    category: "Data Visualization",
    status: "Done",
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778240280610_20c8a7e8-b9b7-4b0a-b056-b9de83c635dc.png",
    description: "국민여가활동조사 데이터를 시간, 지역, 연령 관점으로 나누어 문화생활의 차이를 시각화했습니다.",
  },
  {
    id: 6,
    title: "🛣️ 고속도로 휴게소는 왜 사람이 많을까?",
    category: "Data Visualization",
    status: "Done",
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778240272345_df903481-6d03-48a9-840b-37823e409ebc.png",
    description: "교통량, 이용객, 체류 환경, 매출 지표를 분리해 휴게소 이용 패턴을 탐색한 시각화 프로젝트입니다.",
  },
];
