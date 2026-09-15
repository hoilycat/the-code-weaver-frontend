export const weaverProject = {
  id: -1,
  localOnly: true,
  priority: 5.5,
  title: 'The Weaver',
  subtitle: '직접 설계한 개인 포트폴리오와 콘텐츠 관리 시스템',
  category: 'Full-stack',
  editorialLabel: 'Full-stack · Portfolio & CMS',
  disciplines: ['Full-stack'],
  preferEditorialMedia: true,
  snapshot: '/media/weaver-process/draft-two.png',
  link: 'https://github.com/hoilycat/the-code-weaver-frontend',
  period: '2025.12–현재',
  cardSummary: '손스케치와 SVG 두 시안에서 React 인터랙션·Spring Boot 콘텐츠 관리까지',
  proofSummary: '브랜딩·콘셉트·정보 구조와 디자인 시안을 직접 설계하고, AI의 코드 작성 보조를 활용해 프론트엔드와 백엔드를 연결했습니다.',
  implemented: ['React·React Router 기반 목록·상세·관리 화면', 'Framer Motion 바늘·글자·실타래 인터랙션과 GSAP 스크롤 효과', 'Spring Boot·JPA 프로젝트 조회·작성·수정·삭제 API', '다중 이미지 업로드와 CMS 응답 지연 시 로컬 콘텐츠 표시'],
  evidence: ['직접 그린 초기 손스케치 2장', 'Inkscape SVG 원본과 디자인 시안 1·2안', '공개 프론트엔드·백엔드 저장소'],
  nextValidation: ['서버 측 인증·인가 강화', '모바일·키보드 접근성과 모션 사용성 개선'],
  resources: [{label:'Frontend GitHub',url:'https://github.com/hoilycat/the-code-weaver-frontend'}, {label:'Backend GitHub',url:'https://github.com/hoilycat/the-code-weaver-backend'}],
  description: `The Weaver는 개발 신입으로서의 작업과 문제 해결 과정을 소개하기 위해 만든 개인 포트폴리오입니다. 뜨개질처럼 로직을 엮어 결과물을 만든다는 발상에서 출발해 브랜딩, 콘셉트, 정보 구조와 화면 시안을 직접 설계했습니다. 구현 코드 작성에는 AI의 도움을 받았습니다.

프론트엔드는 React와 React Router로 목록·상세·관리 화면을 구성했습니다. SVG 바늘을 스크롤 진행에 따라 회전시키고, 글자·실타래·옷 그래픽을 단계적으로 연결했습니다. 프로젝트 데이터는 API와 로컬 편집 데이터를 병합해 서버 응답이 늦어도 콘텐츠를 읽을 수 있게 구성했습니다.

백엔드는 Spring Boot의 Controller·Service·JPA Repository로 프로젝트 조회·작성·수정·삭제를 처리합니다. 다중 이미지 업로드 API는 파일을 스토리지에 저장하고 공개 URL을 반환합니다. 로그인과 관리 화면은 구현되어 있으나, 서버 측 인증·인가는 추가 보완이 필요한 간이 관리 구조입니다.

[Project Notes]

Role
브랜딩, 콘셉트, 정보 구조, 손스케치와 SVG 디자인 시안은 직접 제작했습니다. 프론트엔드·백엔드 구현 과정에서 AI를 코드 작성 보조로 활용했습니다. 이 제작 범위는 The Weaver 사이트에 관한 설명이며, 다른 프로젝트의 역할은 각 상세 페이지에 따로 기록합니다.

Project Type
Full-stack, Frontend, Backend, Solo Project

Tech Stack
React, JavaScript, React Router, Framer Motion, GSAP, Java, Spring Boot, Inkscape

Core Features
- 스크롤 기반 SVG 인터랙션
- 프로젝트 목록·필터·상세 조회
- 프로젝트 작성·수정·삭제 화면과 API
- 다중 이미지 업로드
- CMS 지연 시 로컬 콘텐츠 표시

Visual Decision
편집 디자인 경험을 바탕으로 프로젝트 카드와 상세 페이지를 에디토리얼 형식으로 구성했습니다. 필터로 관심 영역을 먼저 좁히고 상세 내용을 읽는 탐색 흐름을 의도했습니다. 두 SVG 시안 중 시안 2의 단정하고 복잡하지 않은 구조를 기준으로 삼되, 각 시안의 효과적인 요소를 골라 현재 화면에 반영했습니다. 뜨개질에서 출발한 ‘엮는다’는 콘셉트에 파란색과 아이보리를 조합해 차분한 시각 방향을 정했습니다.

Results & Limitations
디자인 시안과 공개 코드에서 화면 구성과 API 구현을 확인할 수 있습니다. 현재 로그인은 간이 방식이며 운영용 인증·인가를 완성했다고 주장하지 않습니다.`,
};
