export const fallbackProjects = [
  {
    id: 11,
    priority: 1,
    title: "WeldVision",
    subtitle: "RT·VT 용접 결함 검출 및 해석 시스템",
    category: "AI Projects",
    editorialLabel: "Featured · Machine Vision",
    disciplines: ["Machine Vision", "AI"],
    preferEditorialMedia: true,
    snapshot: "/media/weldvision/hero-vt-undercut.png",
    link: "https://github.com/hoilycat/welding-defect-detection",
    period: "2026.06–2026.08",
    cardSummary: "C++ 특징 분석에서 RT·VT YOLO 검출과 판독 근거 UI까지 이어지는 용접 검사 보조 시스템",
    proofSummary: "결함을 찾는 모델뿐 아니라 데이터 변환, 전처리 근거, 위험도와 권장 조치까지 하나의 검사 흐름으로 구현했습니다.",
    implemented: [
      "C++·OpenCV 특징 추출과 SVM 4클래스 탐색 실험",
      "RIAWELC Polygon JSON 검증 및 YOLO 변환 파이프라인",
      "RT·VT 도메인별 YOLOv8 모델과 Gradio 검사 화면",
      "CLAHE·Black-hat·Gradient·Emboss 판독 보조 화면",
    ],
    evidence: [
      "VT 최종 모델 Precision 0.849 · Recall 0.780 · mAP50 0.838",
      "VT 학습 중 최고 mAP50 0.847 · mAP50-95 0.585",
      "RT 4클래스 파일럿 mAP50 0.413",
      "Python 테스트 10개 통과 · C++ CMake 빌드 검증",
    ],
    nextValidation: [
      "독립 현장 이미지 성공·실패 사례 평가",
      "RT 및 언더컷 성능 개선",
      "SVM 결과는 이미지 단위 분할로 재평가",
    ],
    resources: [
      { label: "GitHub", url: "https://github.com/hoilycat/welding-defect-detection" },
      { label: "Technical Report", url: "https://github.com/hoilycat/welding-defect-detection/blob/main/docs/final-project-report.md" },
      { label: "Annotation QA", url: "https://github.com/hoilycat/welding-annotation-qa" },
    ],
    description: `WeldVision은 방사선 검사(RT)와 육안 검사(VT) 이미지에서 용접 결함의 위치와 종류를 찾고, 검사자가 결과를 이해할 수 있도록 전처리 근거와 위험도·추정 원인·권장 조치를 함께 제공하는 로컬 검사 보조 시스템입니다.

처음에는 자동 검출보다 결함의 모양을 이해하는 데 집중했습니다. C++과 OpenCV로 JSON 정답 폴리곤에서 원형도, 종횡비, 밝기, 면적 특징을 추출하고 SVM 4클래스 분류 실험을 진행했습니다. 이 86.2% 수치는 독립 현장 성능이 아닌 탐색적 실험 결과로 구분해 설명합니다.

RT와 VT는 영상 외관과 대상 결함이 달라 별도 YOLOv8 모델로 분리했습니다. RIAWELC 폴리곤 라벨을 YOLO 바운딩 박스로 자동 변환하고 면적 0 라벨, 검사 방식 밖 클래스, 과도한 정상 데이터를 검수해 학습 데이터의 신뢰도를 높였습니다.

Gradio 앱에서는 검사 방식을 선택하면 전용 모델과 신뢰도 기준이 적용됩니다. 원본과 검출 박스, CLAHE·Black-hat·Gradient·Emboss 화면, 특징값, 위험도와 권장 조치를 한 화면에서 비교할 수 있습니다. 이 결과는 검사자를 대체하는 판정이 아니라 결함 후보와 근거를 빠르게 살펴보는 프로토타입입니다.

[Project Notes]

Role
데이터 검증과 YOLO 변환, C++ OpenCV 특징 분석, SVM·YOLOv8 학습, RT/VT Gradio 검사 앱, 결과 검증과 문서화를 전체 설계·구현했습니다.

Project Type
AI, Computer Vision, Solo Project

Tech Stack
C++, OpenCV, Python, YOLOv8, Ultralytics, Gradio, CMake

Core Features
- Polygon JSON 검증과 YOLO 바운딩 박스 자동 변환
- RT·VT 검사 방식별 모델과 신뢰도 자동 선택
- 원본·검출·전처리 근거의 동시 비교
- 결함별 위험도, 추정 원인, 판단 근거, 권장 조치
- 낮은 신뢰도 review 후보와 확정 검출 구분

Technical Challenge
RT와 VT를 한 모델로 섞지 않고 영상 도메인과 클래스 구성을 분리했습니다. 언더컷처럼 작고 연속적인 결함은 다수 박스로 나뉘므로 Recall과 중복 검출을 함께 살펴봤습니다.

Results & Limitations
VT 최종 모델은 Precision 0.849, Recall 0.780, mAP50 0.838, mAP50-95 0.585를 기록했습니다. 독립 현장 이미지 일반화 성능은 아직 검증 전이며 별도 평가 작업으로 남겨 두었습니다.`,
  },
  {
    id: 3,
    priority: 2,
    title: "Mood-DNA V3",
    subtitle: "시각 특징을 수치와 근거로 번역하는 AI 디자인 파트너",
    category: "AI Projects",
    editorialLabel: "Featured · AI",
    disciplines: ["Machine Vision", "AI", "Full-stack"],
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778141883119_e2320671-2664-48cd-acf4-abdd0aa16b5d.png",
    link: "https://github.com/hoilycat/Mood-DNA-V3",
    period: "2026.03–2026.07",
    cardSummary: "OpenCV 지표·레이더 차트·GraphRAG 근거를 연결한 디자인 분석 도구",
    proofSummary: "‘좋은 디자인’을 자동 판정하기보다, 이미지의 시각 특징을 정량화하고 비교·비평을 보조하는 범위로 설계했습니다.",
    implemented: [
      "OpenCV·EasyOCR 기반 16개 시각 지표 추출",
      "단일 분석·A/B 비교·배치 오디션·히스토리 UI",
      "FastAPI 분석 서버와 React 대시보드",
      "YIE GraphRAG 근거를 Gemini 비평에 연결",
    ],
    evidence: [
      "밝기·복잡도·여백·대칭성·색상 DNA 계산 코드 공개",
      "DNA 일치도 채점 테스트 9개 통과",
      "프런트엔드 production build와 lint 통과",
      "전체 분석 흐름과 스플래시 데모 영상 공개",
    ],
    nextValidation: [
      "밝기·크롭·해상도 변화에 대한 지표 안정성 확인",
      "사람 평가와 시스템 지표의 비교 실험",
      "AI 비평 문장과 검색 근거의 대응 표시 강화",
    ],
    resources: [
      { label: "GitHub", url: "https://github.com/hoilycat/Mood-DNA-V3" },
    ],
    description: `Mood-DNA V3는 이미지의 밝기, 복잡도, 여백, 대칭성, 색상 DNA 같은 시각 특징을 OpenCV와 EasyOCR로 추출하고, 그 결과를 비교 가능한 수치와 AI 비평으로 연결하는 디자인 분석 도구입니다.

React 대시보드와 FastAPI 분석 서버를 함께 만들고 단일 분석, A/B 비교, 여러 시안의 배치 오디션, 분석 히스토리를 하나의 제품 흐름으로 묶었습니다. AI는 이미지 분석을 대신하지 않고 계산된 지표와 브랜드 맥락을 받아 비평을 확장합니다.

YIE GraphRAG에서 검색한 디자인 논문 근거를 비평 프롬프트에 연결하고, 결과 화면에서 참고 근거와 레퍼런스를 함께 확인하도록 구성했습니다. 프로젝트의 범위는 디자인의 절대적 품질 판정이 아니라 시각 특징의 정량화와 비교·비평 보조입니다.

[Project Notes]

Role
React UI, FastAPI API, OpenCV 지표 추출, 데이터 저장, Gemini·YIE 연결과 데모 제작을 전체 구현했습니다.

Project Type
Full-stack, AI, Computer Vision, Design Tool

Tech Stack
React, TypeScript, FastAPI, Python, OpenCV, EasyOCR, NumPy, Recharts, SQLite, SQLAlchemy, Google Gemini, Neo4j

Core Features
- 이미지 시각 지표 16종 추출
- 단일 분석·비교 분석·배치 오디션
- DNA 레이더 차트와 근거 카드
- 분석 히스토리 저장

Results & Limitations
지표 계산과 제품 흐름은 구현했으며, 지표의 타당성과 사람 평가와의 상관성은 별도 검증 작업으로 분리했습니다.`,
  },
  {
    id: 2,
    priority: 3,
    title: "Cof/fee V3",
    subtitle: "카페인 반감기 기반 생활 기록 대시보드",
    category: "AI Projects",
    editorialLabel: "Featured · Full-stack",
    disciplines: ["AI", "Full-stack"],
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778140113100_d9f75ee8-3967-4ba2-ba8a-1f3b4100a994.png",
    link: "https://github.com/hoilycat/Cof-fee-V3",
    period: "2026.02–2026.07",
    cardSummary: "섭취 기록·반감기 계산·수면 신호·GraphRAG 인사이트를 연결한 로컬 통합 제품",
    proofSummary: "카페인 섭취 시각과 용량에서 시간별 잔존량을 계산하고, 기록·그래프·캐릭터 반응·근거 기반 조언을 하나의 사용자 흐름으로 묶었습니다.",
    implemented: [
      "카페인 반감기 기반 시간별 잔존량 계산",
      "섭취 기록·통계·목표·설정·온보딩 화면",
      "Jotai와 localStorage 기반 로컬 상태 관리",
      "YIE coffee 도메인 질의와 Coach Kong 응답 흐름",
    ],
    evidence: [
      "계산 로직 Vitest 6개 통과",
      "TypeScript production build 통과",
      "대시보드·온보딩·AI 응답 데모 영상 공개",
      "반감기 공식과 버전별 발전 과정 문서화",
    ],
    nextValidation: [
      "Hosted YIE 환경 연결과 근거 출처 상세 UI",
      "카페인 계산값과 화면 상태의 회귀 테스트 확대",
      "건강 정보는 의학적 진단이 아닌 참고용으로 제공",
    ],
    resources: [
      { label: "GitHub", url: "https://github.com/hoilycat/Cof-fee-V3" },
    ],
    description: `Cof/fee V3는 커피를 끊으라고 말하는 앱이 아니라, 마신 시각과 양을 기록하고 시간이 흐르며 몸에 남는 카페인을 함께 보게 만드는 생활 기록 대시보드입니다.

React와 TypeScript로 섭취 기록, 잔존량 그래프, 수면 신호등, 목표와 통계를 구성했습니다. 반감기 계산 결과와 캐릭터 반응이 같은 상태를 바라보도록 데이터 흐름을 정리했고, 로컬 기록은 Jotai와 localStorage로 관리합니다.

YIE의 coffee 도메인 질의를 연결해 기록 패턴에 대한 논문 기반 참고 정보를 보여주는 흐름도 구현했습니다. 현재 공개 범위는 로컬 통합 제품이며 건강 관련 결과는 의학적 진단이 아닌 참고용입니다.

[Project Notes]

Role
카페인 계산 로직, React·TypeScript UI, 상태 관리, 캐릭터 시스템, YIE 연동과 데모 제작을 구현했습니다.

Project Type
Full-stack, Frontend, AI, Health Tech

Tech Stack
React, TypeScript, Vite, Jotai, Recharts, Day.js, YIE GraphRAG

Core Features
- 섭취 기록과 시간별 잔존량 계산
- 수면 신호와 기록 통계
- 상태에 반응하는 Coach Kong 캐릭터
- Coffee GraphRAG 참고 정보

Results & Limitations
핵심 계산과 UI 흐름은 로컬에서 동작하며 계산 테스트 6개를 통과했습니다. Hosted YIE 연결과 근거 출처 상세 화면은 다음 검증 범위입니다.`,
  },
  {
    id: 12,
    priority: 4,
    title: "WeldVision Annotation QA",
    subtitle: "CVAT 기반 용접 데이터 품질·릴리스 파이프라인",
    category: "AI Projects",
    editorialLabel: "Machine Vision · QA",
    disciplines: ["Machine Vision", "Full-stack"],
    snapshot: "https://opengraph.githubassets.com/1/hoilycat/welding-annotation-qa",
    link: "https://github.com/hoilycat/welding-annotation-qa",
    period: "2026.08",
    cardSummary: "라벨 정규화부터 CVAT·COCO·YOLO·QA 대시보드·release manifest까지",
    proofSummary: "모델이 학습하기 전의 라벨 품질을 표준화하고, 검수 결과를 재현 가능한 데이터 릴리스로 만드는 도구입니다.",
    implemented: [
      "6개 용접 결함 canonical label과 한·영문 alias 정규화",
      "Polygon 구조·좌표·정상 이미지 규칙 검증",
      "CVAT Project/Task 생성·동기화·백업",
      "COCO·YOLO Segmentation·QA HTML·manifest 출력",
    ],
    evidence: [
      "자동 테스트 172개 통과",
      "Polygon 충돌·중첩과 이미지 중복 검사",
      "Windows·macOS 실행 및 smoke workflow 문서화",
      "입력부터 릴리스까지 CLI와 문서 공개",
    ],
    nextValidation: [
      "실제 CVAT 데이터와 QA 대시보드 자동 연결 확대",
      "검출 결과와 Annotation 일치율 계산",
      "백업→복원 전체 과정 반복 검증",
    ],
    resources: [
      { label: "GitHub", url: "https://github.com/hoilycat/welding-annotation-qa" },
      { label: "WeldVision", url: "https://github.com/hoilycat/welding-defect-detection" },
    ],
    description: `WeldVision Annotation QA는 RIAWELC 형식의 용접 결함 Polygon JSON을 검사하고, 서로 다르게 적힌 라벨을 여섯 개의 표준 이름으로 정리하는 데이터 품질 도구입니다.

검증을 통과한 데이터는 CVAT에서 다시 확인하고 COCO JSON과 YOLO Segmentation으로 내보낼 수 있습니다. 데이터셋 단계에서는 Polygon 충돌·중첩, 이미지 중복, 이미지와 JSON의 대응을 검사하며 결과를 정적 HTML 대시보드와 release manifest로 남깁니다.

WeldVision이 모델 학습과 추론을 담당한다면 이 저장소는 그 앞단의 데이터 준비와 품질 보증을 담당합니다. 두 저장소를 분리해 데이터 릴리스와 모델 실험의 책임을 명확히 했습니다.

[Project Notes]

Role
라벨 taxonomy, 검증 모델, CVAT 연동, COCO·YOLO 출력, QA 대시보드와 테스트를 설계·구현했습니다.

Project Type
Backend, Computer Vision, Data Engineering, Solo Project

Tech Stack
Python, Pytest, CVAT, COCO, YOLO, Docker

Core Features
- 라벨 alias 정규화와 데이터 검증
- CVAT 동기화와 canonical JSON 백업
- Dataset-level 충돌·중복 검사
- QA HTML과 release manifest 생성

Results & Limitations
자동 테스트 172개를 통과했으며 실제 데이터 연결과 검출 결과 대 Annotation 일치율 계산은 다음 검증 범위입니다.`,
  },
  {
    id: 4,
    priority: 5,
    title: "Y-Insight Engine (YIE)",
    subtitle: "Mood-DNA와 Cof/fee가 공유하는 GraphRAG API",
    category: "AI Projects",
    editorialLabel: "AI Backend",
    disciplines: ["AI", "Full-stack"],
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778141843010_8e7a80de-dd23-462d-a5cc-2853a8eadb92.png",
    link: "https://github.com/hoilycat/Universal-Insight-Engine",
    period: "2026.04–2026.06",
    cardSummary: "design·coffee 도메인 검색과 근거 응답을 공통 API로 분리한 지식 엔진",
    proofSummary: "큰 비전과 현재 구현을 구분해, 공개 코드에서 확인 가능한 GraphRAG 검색·근거 API와 도메인 모듈에 집중합니다.",
    implemented: [
      "FastAPI /rag/query · /rag/evidence · /rag/report API",
      "Neo4j 기반 design·coffee 도메인 근거 검색",
      "의도 분류·query expansion·reranking 파이프라인",
      "Mood-DNA·Cof/fee 연동용 공통 응답 형식",
    ],
    evidence: [
      "공개 API 스키마와 도메인 정책 코드",
      "coffee·design 회귀 시나리오 스크립트",
      "근거 검색 raw·curated 결과 분리",
      "지식 ingestion과 Neo4j 연결 코드 공개",
    ],
    nextValidation: [
      "외부 검색·모델 라우팅 운영 검증",
      "교차 도메인 추론의 정량 평가",
      "travel 도메인은 확장 계획으로만 구분",
    ],
    resources: [
      { label: "GitHub", url: "https://github.com/hoilycat/Universal-Insight-Engine" },
    ],
    description: `Y-Insight Engine은 Mood-DNA와 Cof/fee가 각자의 화면을 유지하면서 같은 지식 엔진에 질의할 수 있도록 분리한 FastAPI 기반 GraphRAG 백엔드입니다.

현재 공개 코드에서 확인 가능한 핵심은 design·coffee 도메인의 /rag/query, /rag/evidence, /rag/report API입니다. 질의를 분류하고 검색어를 확장한 뒤 Neo4j에서 근거를 넓게 찾고, reranking한 결과를 공통 형식으로 반환합니다.

외부 검색, 멀티 모델 라우팅, 교차 도메인과 travel 확장은 구현 완료로 주장하지 않고 실험 또는 다음 계획으로 구분합니다.

[Project Notes]

Role
공통 API, 도메인 정책, 근거 검색·reranking, 응답 스키마, ingestion 흐름을 설계·구현했습니다.

Project Type
Backend, AI, GraphRAG, Architecture

Tech Stack
Python, FastAPI, Neo4j, LlamaIndex, Ollama, Google Gemini, Docker Compose

Core Features
- 도메인별 GraphRAG 질의
- raw·curated 근거 응답
- intent-aware 검색어 확장과 reranking
- Mood-DNA·Cof/fee 공통 API

Results & Limitations
design·coffee 검색 API와 근거 파이프라인은 구현했습니다. 외부 검색과 교차 도메인 추론은 운영 검증 전 단계입니다.`,
  },
  {
    id: 1,
    priority: 6,
    title: "Focus Mate Berry",
    subtitle: "자세를 알아차리고 반응하는 공부 친구",
    category: "AI Projects",
    editorialLabel: "Vision Product",
    disciplines: ["Machine Vision", "AI", "Full-stack"],
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778119134337_berry.png",
    link: "https://github.com/hoilycat/Focus-Mate-Berry",
    period: "2025.12–2026.06",
    cardSummary: "MediaPipe 자세 감지를 Berry의 성장·경고·알림 UX로 번역한 실시간 제품 실험",
    proofSummary: "감지 정확도를 과장하기보다, 비전 신호를 상태 머신과 사용자 피드백으로 연결한 제품 경험을 보여줍니다.",
    implemented: [
      "MediaPipe·OpenCV 자세와 자리 비움 감지",
      "공부 시간과 상태에 따른 Berry 성장 상태 머신",
      "FastAPI·SQLite·React 실시간 대시보드",
      "거북목 경고와 카카오 알림 실험",
    ],
    evidence: [
      "자세 감지와 캐릭터 반응 GIF 공개",
      "Apple Silicon 실행 환경 문제 해결 기록",
      "카메라 각도에 따른 오탐 임계값 조정",
      "프런트 production build 통과",
    ],
    nextValidation: [
      "사람·조명·거리별 소규모 정량 테스트",
      "사용자별 자세 기준값 보정",
      "장시간 사용 오탐·미탐 측정",
    ],
    resources: [
      { label: "GitHub", url: "https://github.com/hoilycat/Focus-Mate-Berry" },
    ],
    description: `Focus Mate Berry는 MediaPipe와 OpenCV로 자세와 자리 비움 상태를 감지하고, 그 결과를 Berry의 성장, 경고, 수면 상태로 연결한 공부 파트너입니다.

핵심은 자세 감지 API를 사용했다는 사실보다, 비전 신호를 상태 머신과 캐릭터 피드백으로 번역한 제품 흐름입니다. 사용자가 공부하면 Berry가 자라고, 자세가 무너지거나 자리를 비우면 화면과 메시지가 달라집니다.

현재는 작동하는 제품 프로토타입이며 정확도 수치는 아직 제시하지 않습니다. 사람·조명·거리·자세 조건별 정량 테스트를 별도 검증 작업으로 남겨 두었습니다.

[Project Notes]

Role
Python 비전 엔진, 상태 머신, FastAPI·SQLite API, React UI와 캐릭터 반응 흐름을 구현했습니다.

Project Type
Full-stack, AI, Computer Vision, UX

Tech Stack
Python, MediaPipe, OpenCV, FastAPI, SQLite, React, Vite, Google Gemini, KakaoTalk API

Core Features
- 자세·자리 비움 감지
- 공부 시간 기반 성장 상태
- 실시간 대시보드와 원격 명령
- 경고와 알림 흐름

Results & Limitations
실시간 제품 흐름과 데모는 구현했지만 자세 감지 정확도는 아직 정량 평가 전입니다.`,
  },
  {
    id: 10,
    priority: 7,
    title: "SceneDiary",
    subtitle: "여행 사진을 페르소나 일기로 바꾸는 팀 프로젝트",
    category: "Team Project",
    editorialLabel: "Team · Full-stack",
    disciplines: ["AI", "Full-stack"],
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1781057615264_effa159c-48a0-4312-b635-52651a1d3741.png",
    link: "https://github.com/ryuh2929/SceneDiary",
    period: "2026.06–2026.07",
    cardSummary: "브랜딩·스플래시와 사진 업로드→EXIF/GPS→생성 상태 흐름을 맡은 협업 프로젝트",
    proofSummary: "팀 전체 아키텍처와 개인 기여를 분리해, 직접 담당한 브랜딩·모션·업로드 흐름을 중심으로 설명합니다.",
    implemented: [
      "로고·앱 아이콘과 브랜드 보드",
      "3초 MP4 스플래시와 경량화 의사결정",
      "사진 업로드·썸네일·EXIF/GPS 흐름",
      "생성 상태 polling과 화면 연결",
    ],
    evidence: [
      "브랜드 보드·스토리보드·프로토타입 공개",
      "Dark·Light 스플래시 영상",
      "팀 저장소와 담당 범위 명시",
    ],
    nextValidation: ["릴리스 빌드 QA와 팀 인수인계 문서 정리"],
    resources: [
      { label: "Team Repository", url: "https://github.com/ryuh2929/SceneDiary" },
    ],
    description: `SceneDiary는 여행 사진을 AI가 해석해 일기 초안으로 바꾸는 팀 프로젝트입니다. 저는 로고·아이콘 브랜딩과 3초 MP4 스플래시, 사진 업로드와 생성 상태 연결 흐름을 맡았습니다.

[Project Notes]

Role
브랜딩, 스플래시, 사진 업로드·EXIF/GPS 전처리와 생성 상태 polling UI를 담당했습니다.

Project Type
Full-stack, AI, Storytelling, UX

Results & Limitations
팀 전체 기능과 제 개인 기여를 분리해 공개하며, 릴리스 QA는 팀 후속 작업으로 남아 있습니다.`,
  },
  {
    id: 5,
    priority: 8,
    title: "Fixie",
    subtitle: "AI 가전 매뉴얼 서비스의 디자인·프론트엔드",
    category: "Team Project",
    editorialLabel: "Team · Design & Frontend",
    disciplines: ["AI"],
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778142181960_5efe036a-769c-4a0b-bd32-778c9cba0190.png",
    link: "https://github.com/asd9244/Easy_Manual",
    period: "2026",
    cardSummary: "서비스 디자인부터 기기 등록·대시보드·AI 채팅까지 프론트엔드 전반 담당",
    proofSummary: "팀의 백엔드·AI 엔진과 구분해, 직접 맡은 서비스 디자인과 프론트엔드 전반을 중심으로 보여줍니다.",
    implemented: ["서비스 UX·UI와 화면 구조 설계", "기기 등록과 대시보드 프론트엔드", "AI 매뉴얼 채팅 인터페이스", "API 상태 연결과 반응형 화면"],
    evidence: ["공개 팀 저장소", "디자인·프론트엔드 담당 범위 명시", "주요 화면과 팀 데모 흐름"],
    nextValidation: ["공개 가능한 개인 기여 화면과 데모 증거 보강"],
    resources: [
      { label: "Team Repository", url: "https://github.com/asd9244/Easy_Manual" },
    ],
    description: `Fixie는 QR 코드나 모델명으로 기기를 등록하고, 매뉴얼을 학습한 AI와 대화하며 필요한 해결 방법을 찾도록 설계한 팀 프로젝트입니다. 저는 서비스 디자인과 프론트엔드 전반을 담당했습니다.

[Project Notes]

Role
서비스 UX·UI 디자인, 화면 구조, 기기 등록과 대시보드, AI 채팅 인터페이스, API 상태 연결을 포함한 프론트엔드 전반을 맡았습니다.

Project Type
Team Project, Frontend, Product Design, AI UX

Results & Limitations
디자인과 프론트엔드 사용자 흐름을 구현했습니다. 백엔드와 AI 검색 엔진은 팀원의 기여이며 제 구현 범위와 구분해 설명합니다.`,
  },
  {
    id: 8,
    priority: 9,
    title: "땅에서 박물관까지",
    subtitle: "유물은 어디서 와서 어디로 가는가",
    category: "Data Visualization",
    editorialLabel: "Data · Tableau",
    disciplines: ["Data"],
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778240284023_f1510614-5e40-47b9-9260-6c796a3599d7.png",
    link: "https://public.tableau.com/app/profile/kim.seoyoung6184/viz/_17675712350940/sheet6",
    period: "2025–2026",
    cardSummary: "9,000+ 원본을 21회 반복 정제해 5,259개 분석 데이터로 만든 문화유산 시각화",
    proofSummary: "기계적 분류의 한계를 인정하고 Human-in-the-loop 방식으로 분류 기준과 예외를 반복 검토했습니다.",
    implemented: ["원본 9,000+ 수집", "V1–V21 반복 정제", "7개 대분류 규칙", "Tableau와 Inkscape 대시보드"],
    evidence: ["기타 1,000개→288개 축소", "최종 정제 5,259개", "Tableau 공개 대시보드"],
    nextValidation: [],
    resources: [
      { label: "Tableau", url: "https://public.tableau.com/app/profile/kim.seoyoung6184/viz/_17675712350940/sheet6" },
      { label: "GitHub Collection", url: "https://github.com/hoilycat/data-visualization" },
    ],
    description: "국립중앙박물관 공개 자료 9,000개 이상을 수집하고 21차례 반복 정제해 5,259개 분석 데이터로 만들었습니다. 분류 규칙과 Human-in-the-loop 검수를 거쳐 유물의 발견지와 소장 박물관 흐름을 Tableau로 시각화했습니다.",
  },
  {
    id: 6,
    priority: 10,
    title: "고속도로 휴게소는 왜 사람이 많을까?",
    subtitle: "교통량·소비·체류시간으로 읽는 휴게소",
    category: "Data Visualization",
    editorialLabel: "Data · Tableau",
    disciplines: ["Data"],
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778240272345_df903481-6d03-48a9-840b-37823e409ebc.png",
    link: "https://public.tableau.com/app/profile/kim.seoyoung6184/viz/_17675283241480/sheet7",
    period: "2025–2026",
    cardSummary: "한국도로공사 공공데이터 5종으로 소비·체류·이용객 기준을 분리한 분석",
    proofSummary: "‘사람이 많다’를 하나의 순위로 단순화하지 않고 소비 규모·체류시간·소비 효율을 별도 기준으로 비교했습니다.",
    implemented: ["공공데이터 5종 정리", "시간대·소비·체류 분석", "분야별 1위 기준 분리", "Tableau·Inkscape 대시보드"],
    evidence: ["Tableau 공개 대시보드", "직접 제작한 일러스트와 시각 체계"],
    nextValidation: [],
    resources: [
      { label: "Tableau", url: "https://public.tableau.com/app/profile/kim.seoyoung6184/viz/_17675283241480/sheet7" },
      { label: "GitHub Collection", url: "https://github.com/hoilycat/data-visualization" },
    ],
    description: "한국도로공사 공공데이터 5종을 이용해 휴게소의 교통량, 소비, 체류시간을 분리해 분석했습니다. 소비 규모 1위와 오래 머무는 곳, 이용객당 소비 효율이 높은 곳이 서로 다르다는 점을 Tableau로 보여줍니다.",
  },
  {
    id: 7,
    priority: 11,
    title: "대한민국 사람들의 문화생활 엿보기",
    subtitle: "시간·지역·연령으로 읽는 문화 역세권",
    category: "Data Visualization",
    editorialLabel: "Data · Tableau",
    disciplines: ["Data"],
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778240280610_20c8a7e8-b9b7-4b0a-b056-b9de83c635dc.png",
    link: "https://public.tableau.com/app/profile/kim.seoyoung6184/viz/_17675710943530/sheet5",
    period: "2025–2026",
    cardSummary: "국민여가활동조사를 시간·지역·연령 3축으로 재구성한 문화생활 시각화",
    proofSummary: "문화 접근성을 공간만이 아니라 연령과 생활 단계에 따라 다르게 작동하는 경험으로 분석했습니다.",
    implemented: ["국민여가활동조사 정제", "시간·지역·연령 3축 분석", "Top 5 문화생활 도출", "Tableau·Inkscape 대시보드"],
    evidence: ["Tableau 공개 대시보드", "Excel 기반 데이터 재구조화"],
    nextValidation: [],
    resources: [
      { label: "Tableau", url: "https://public.tableau.com/app/profile/kim.seoyoung6184/viz/_17675710943530/sheet5" },
      { label: "GitHub Collection", url: "https://github.com/hoilycat/data-visualization" },
    ],
    description: "문화체육관광부 국민여가활동조사 데이터를 시간, 지역, 연령 관점으로 나누어 문화생활과 접근성의 차이를 시각화했습니다.",
  },
  {
    id: 9,
    priority: 12,
    title: "당신의 이름은 어떤 시대인가요?",
    subtitle: "1880–2010, 이름으로 읽는 130년",
    category: "Data Visualization",
    editorialLabel: "Data · Tableau",
    disciplines: ["Data"],
    snapshot: "https://hqefyvwzlhytnmhqbggt.supabase.co/storage/v1/object/public/images/uploads/1778240287323_08555f9c-269e-4366-aabd-acd88f04de4b.png",
    link: "https://public.tableau.com/app/profile/kim.seoyoung6184/viz/_17681820857810/12",
    period: "2025–2026",
    cardSummary: "130년 신생아 이름 데이터로 다양성·성별 경계·세대교체를 구성한 데이터 스토리",
    proofSummary: "Top 10 점유율, 고유 이름 수, 성별 경계와 이름 길이를 기승전결 구조의 대시보드로 편집했습니다.",
    implemented: ["1880–2010 이름 데이터 분석", "점유율·다양성·길이 지표", "KMeans 탐색 실험", "Tableau 스토리 대시보드"],
    evidence: ["Tableau 공개 대시보드", "7개 장면으로 이어지는 데이터 스토리"],
    nextValidation: [],
    resources: [
      { label: "Tableau", url: "https://public.tableau.com/app/profile/kim.seoyoung6184/viz/_17681820857810/12" },
      { label: "GitHub Collection", url: "https://github.com/hoilycat/data-visualization" },
    ],
    description: "1880년부터 2010년까지 미국 신생아 이름 데이터를 바탕으로 Top 10 점유율 하락, 고유 이름의 증가, 성별 경계와 세대교체를 Tableau 스토리로 구성했습니다.",
  },
];

export const mergeEditorialProject = (liveProject, editorialProject) => {
  if (!editorialProject) return liveProject;
  if (!liveProject) return editorialProject;

  return {
    ...liveProject,
    ...editorialProject,
    snapshot: editorialProject.preferEditorialMedia
      ? editorialProject.snapshot
      : (liveProject.snapshot || editorialProject.snapshot),
    images: editorialProject.preferEditorialMedia
      ? (editorialProject.images || [])
      : (liveProject.images?.length ? liveProject.images : (editorialProject.images || [])),
  };
};

export const mergeEditorialProjects = (liveProjects = []) => {
  const liveById = new Map(liveProjects.map((project) => [Number(project.id), project]));
  const editorialIds = new Set(fallbackProjects.map((project) => Number(project.id)));

  const curatedProjects = fallbackProjects.map((editorialProject) =>
    mergeEditorialProject(liveById.get(Number(editorialProject.id)), editorialProject)
  );

  const uncataloguedProjects = liveProjects
    .filter((project) => !editorialIds.has(Number(project.id)))
    .map((project, index) => ({
      ...project,
      priority: 100 + index,
      disciplines: project.category === "Data Visualization" ? ["Data"] : ["Full-stack"],
      editorialLabel: project.category,
      cardSummary: project.description,
    }));

  return [...curatedProjects, ...uncataloguedProjects].sort(
    (a, b) => (a.priority ?? 999) - (b.priority ?? 999)
  );
};
