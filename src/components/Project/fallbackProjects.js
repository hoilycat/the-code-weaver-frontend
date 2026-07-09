export const fallbackProjects = [
  {
    id: 11,
    title: "🔥 WeldVision — 결함의 모양을 수치로 읽는 실험",
    category: "AI Projects",
    status: "In Progress",
    snapshot: "https://opengraph.githubassets.com/1/hoilycat/welding-defect-detection",
    link: "https://github.com/hoilycat/welding-defect-detection",
    period: "2026.06~진행 중",
    description: `WeldVision은 용접 X-ray 이미지 속 결함을 먼저 눈으로 이해하고, 그 모양을 수치로 번역해보는 머신비전 실험입니다. 자동 검출로 바로 뛰어가기보다, JSON 폴리곤 라벨을 이용해 결함의 면적, 원형도, 종횡비, 밝기 통계를 추출하고 SVM으로 종류를 분류하는 단계에서 시작했습니다.

현재 C++과 OpenCV로 CLAHE 전처리, GT 폴리곤 마스크 생성, 특징 추출, SVM 4클래스 분류를 구현했습니다. 이 특징들은 단순 분류용 숫자가 아니라, 이후 YOLOv8 검출과 위험도 스코어링으로 확장할 때 결함을 설명하는 근거로 재사용할 수 있도록 설계했습니다.

현재 GitHub 최신 코드 기준으로 Stage 1 C++ OpenCV MVP는 SVM 4클래스 분류까지 구현되어 있으며, README에는 정확도 86.2%와 result.json 출력 흐름이 정리되어 있습니다. 다음 단계는 YOLOv8 파인튜닝, Gradio/HuggingFace Spaces 데모, C++ 결과와 YOLO 결과를 나란히 보여주는 품질 분석 화면입니다.

[Project Notes]

Role
C++ 기반 고전비전 파이프라인 설계, OpenCV 전처리와 특징 추출, SVM 분류 실험, README 로드맵 정리, 이후 Python/Gradio 단계로 확장하기 위한 JSON 브리지 구상을 담당했습니다.

Project Type
AI, Computer Vision

Tech Stack
C++, OpenCV, CMake

Core Features
- 용접 X-ray 이미지 입력과 한글 경로 처리
- CLAHE, blur, Canny 기반 전처리
- JSON GT 폴리곤 기반 결함 마스크 생성
- 컨투어 검출과 GT 폴리곤 시각화
- 면적, 원형도, 종횡비, 밝기 통계, 정규화 면적 특징 추출
- OpenCV SVM 4클래스 분류 실험
- 86.2% 정확도 기록과 result.json 출력
- YOLOv8 검출 및 Gradio 데모 확장 로드맵

Visual Decision
이 프로젝트의 시각화는 예쁜 대시보드보다 검사자가 결함 근거를 이해하는 데 초점을 둡니다. 원본, 전처리, Canny, GT 폴리곤, C++ 특징 결과를 나란히 비교해 모델이 무엇을 보고 판단했는지 드러내는 방향으로 설계했습니다.

Technical Challenge
가장 어려운 부분은 JSON 폴리곤 라벨과 X-ray 이미지를 연결해 결함의 물리적 특징을 안정적으로 수치화하는 일이었습니다. 균열, 기공, 융합불량, 슬래그혼입은 형태와 밝기 패턴이 다르기 때문에 원형도, 종횡비, 밝기 통계, 정규화 면적 같은 특징을 반복 비교해야 했습니다. 또한 로컬 데이터 경로와 한글 폴더명을 C++에서 안정적으로 다루는 문제도 함께 해결했습니다.

Result / Status
GitHub 최신 기준 Stage 1은 C++ OpenCV 전처리, 특징 추출, SVM 4클래스 분류, 정확도 86.2%, result.json 출력까지 구현된 상태입니다. YOLOv8 검출, 위험도 스코어링, Gradio/HuggingFace Spaces 데모는 다음 단계로 남겨두었습니다.`,
  },
  {
    id: 10,
    title: "SceneDiary",
    category: "Team Project",
    status: "In Progress",
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1781057615264_effa159c-48a0-4312-b635-52651a1d3741.png",
    description: "SceneDiary는 여행 사진을 AI가 해석해 일기 초안으로 바꾸는 팀 프로젝트입니다. 저는 로고/아이콘 브랜딩, 3초 mp4 스플래시, 사진 업로드와 생성 상태 연결 흐름을 맡았습니다.",
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
    title: "🔮 Y-Insight Engine — 앱들이 함께 쓰는 지식 엔진",
    category: "AI Projects",
    status: "In Progress",
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778141843010_8e7a80de-dd23-462d-a5cc-2853a8eadb92.png",
    description: "Mood-DNA와 Cof/fee가 각자의 화면을 유지하면서 같은 지식 엔진에 질의할 수 있도록 FastAPI 기반 GraphRAG API를 분리한 백엔드 프로젝트입니다.",
  },
  {
    id: 3,
    title: "🌙 Mood-DNA — 감각을 근거로 번역하는 디자인 파트너",
    category: "AI Projects",
    status: "In Progress",
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778141883119_e2320671-2664-48cd-acf4-abdd0aa16b5d.png",
    description: "OpenCV로 디자인의 밝기, 복잡도, 여백, 색상 DNA를 추출하고, YIE GraphRAG 비평으로 논문 근거를 붙이는 AI 디자인 분석 도구입니다.",
  },
  {
    id: 2,
    title: "☕ Cof/fee — 몸에 남은 커피를 읽는 대시보드",
    category: "AI Projects",
    status: "In Progress",
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778140113100_d9f75ee8-3967-4ba2-ba8a-1f3b4100a994.png",
    description: "React와 Jotai로 섭취 기록을 관리하고, 반감기 계산과 수면 신호등, 금단 위험 알림, YIE GraphRAG 인사이트를 한 흐름으로 묶은 카페인 관리 앱입니다.",
  },
  {
    id: 1,
    title: "🍓 Focus Mate Berry — 자세를 알아차리는 공부 친구",
    category: "AI Projects",
    status: "In Progress",
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778119134337_berry.png",
    description: "MediaPipe와 OpenCV로 자세와 자리 비움 상태를 감지하고, 그 결과를 Berry의 성장, 경고, 수면 상태로 연결한 AI 공부 파트너입니다.",
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
