export const fallbackProjects = [
  {
    id: 11,
    title: "WeldVision — RT·VT 용접 결함 검출 및 해석 시스템",
    category: "AI Projects",
    status: "MVP Complete",
    snapshot: "https://opengraph.githubassets.com/1/hoilycat/welding-defect-detection",
    link: "https://github.com/hoilycat/welding-defect-detection",
    period: "2026.06~2026.07",
    description: `WeldVision은 방사선 검사(RT)와 육안 검사(VT) 이미지에서 용접 결함의 위치와 종류를 찾고, 검사자가 결과를 이해할 수 있도록 전처리 근거와 위험도·추정 원인·권장 조치를 함께 제공하는 로컬 검사 보조 시스템입니다.

처음에는 자동 검출보다 결함의 모양을 이해하는 데 집중했습니다. C++과 OpenCV로 JSON 정답 폴리곤에서 원형도, 종횡비, 밝기, 면적 특징을 추출하고 SVM 4클래스 분류 정확도 86.2%를 기록했습니다. 이후 기존 RIAWELC 폴리곤 라벨을 YOLO 바운딩 박스로 자동 변환하는 파이프라인을 만들었습니다.

RT와 VT는 영상 외관과 대상 결함이 달라 별도 YOLOv8 모델로 분리했습니다. RT 모델은 균열·기공·융합불량·슬래그혼입을 검출하는 파일럿으로 mAP50 0.413을 기록했고, VT 모델은 기공·융합불량·용입부족·언더컷을 학습해 최고 mAP50 0.847을 기록했습니다. 최종 VT best.pt는 mAP50 0.838, mAP50-95 0.585입니다.

Gradio 앱에서는 RT/VT 검사 방식을 선택하면 전용 모델과 신뢰도 기준이 자동 적용됩니다. 원본과 검출 박스, CLAHE·Black-hat·Gradient·Emboss 전처리 화면, 특징값, 위험도와 권장 조치를 한 화면에서 비교할 수 있습니다. 이 결과는 검사자를 대체하는 판정이 아니라 결함 후보와 근거를 빠르게 살펴보는 시연용 프로토타입입니다.

[Project Notes]

Role
데이터 검증과 YOLO 변환 파이프라인, C++ OpenCV 특징 분석, SVM·YOLOv8 학습, RT/VT Gradio 검사 앱, 결과 검증과 문서화를 전체 설계·구현했습니다.

Project Type
AI, Computer Vision, Solo Project

Tech Stack
C++, OpenCV, Python, YOLOv8, Ultralytics, Gradio, CMake

Core Features
- JSON 폴리곤 검증 및 YOLO 바운딩 박스 자동 변환
- 면적 0 라벨과 검사 방식 밖 클래스 자동 제외
- C++ OpenCV 특징 추출과 SVM 4클래스 분류 정확도 86.2%
- RT 4클래스 YOLOv8 파일럿 모델, mAP50 0.413
- VT 4클래스 YOLOv8 모델, 최고 mAP50 0.847
- RT/VT 검사 방식별 모델과 기본 신뢰도 자동 선택
- CLAHE, Black-hat, Gradient, Emboss 판독 보조 화면
- 결함별 위험도, 추정 원인, 판단 근거, 권장 조치 제공
- 낮은 신뢰도 review 후보와 확정 검출의 구분 표시
- 최종 보고서, 시연 가이드, 학습 기록 문서화

Visual Decision
운영 도구처럼 빠르게 비교하고 반복 검사할 수 있도록 입력 조건은 왼쪽, 원본·검출·전처리 근거는 오른쪽에 배치했습니다. 장식보다 결함 박스와 신뢰도, 원본 대비를 우선해 검사자가 결과를 스캔하기 쉬운 구조로 만들었습니다.

Technical Challenge
RT와 VT를 한 모델로 섞지 않고 영상 도메인과 클래스 구성을 분리한 것이 핵심 결정이었습니다. 또한 융합불량과 용입부족의 용어를 명확히 구분하고, 면적 0 라벨·혼합 클래스·과도한 정상 데이터·겹치는 박스를 검증해 학습 데이터의 신뢰도를 높였습니다. 언더컷처럼 작고 연속적인 결함은 다수의 박스로 나뉘어 Recall과 중복 검출을 함께 살펴봐야 했습니다.

Result / Status
로컬 MVP를 완료했습니다. VT 최종 모델은 Precision 0.849, Recall 0.780, mAP50 0.838, mAP50-95 0.585를 기록했고 학습 중 최고 mAP50은 0.847입니다. 브라우저에서 용입부족·융합불량·언더컷 사례와 RT/VT 자동 모델 전환을 확인했습니다. 다음 개선 과제는 독립 현장 이미지 평가, RT 성능 확대, 언더컷 Recall 개선입니다.`,
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
