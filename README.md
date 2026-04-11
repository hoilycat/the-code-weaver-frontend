# 🎨 Frontend: The Weaver Interactive UI

> **"Weaving ideas into form."**  
> 사용자의 스크롤을 **'실을 엮는 행위'**로 치환하여 몰입감 있는 경험을 제공하는 'The Weaver'의 프론트엔드 저장소입니다.

단순한 포트폴리오 나열을 넘어, 매거진 스타일의 감각적인 UI와 고도화된 웹 애니메이션을 구현하는 데 집중했습니다.

## 📸 Visual Preview
| Hero Needle Interaction | Scattering & Weaving Text | Particle System |
| :---: | :---: | :---: |
| ![Hero GIF](이미지_주소) | ![About GIF](이미지_주소) | ![Particle GIF](이미지_주소) |

---

## 🛠 Tech Stack
- **Framework**: React (Vite)
- **Animation**: Framer Motion, GSAP (ScrollTrigger)
- **Styling**: Vanilla CSS

---

## 🕹️ Animation Deep-Dive (기술 활용 사례)

### 1. Framer Motion: 물리적 탄성과 상태 제어
- **Hero Needle Oscillation**: 
  - `useScroll`과 `useTransform`을 결합하여 사용자의 스크롤 속도에 따라 바늘 각도가 변합니다. 
  - `Math.sin(v * 30) * 15` 공식을 활용해 실제 뜨개질을 하는 듯한 왕복 운동을 구현했습니다.
- **Deterministic Random Storytelling**: 
  - `About` 섹션에서 글자들이 해체될 때, 리액트 19의 엄격한 렌더링 환경에서도 일관된 물리 효과를 주기 위해 `index` 기반의 결정론적 랜덤 함수를 직접 설계하여 사용했습니다.

### 2. GSAP (ScrollTrigger): 정교한 시퀀스 연출
- **Velocity-based Particles**: 
  - 사용자의 스크롤 속도(`getVelocity`)를 감지하여 입자를 생성합니다. 
  - **내려갈 때**: 퐁신한 느낌의 털실 입자(Yarn) 생성.
  - **올라갈 때**: 가시성이 높은 스파클 별(Star) 입자 생성.
- **Editorial Layout Transition**: 
  - 프로젝트 상세 페이지 진입 시 이미지 프레임과 드롭캡(`drop-cap`) 텍스트가 순차적으로 떠오르는 효과를 주어 매거진의 느낌을 살렸습니다.

## 📱 Performance Optimization
- **반응형 로직**: 모바일 환경에서 애니메이션 부하를 줄이기 위해 `innerWidth`를 감지하여 입자 생성 확률 및 물리 거리 값을 동적으로 조정했습니다.
- **Pointer Events**: 노이즈 텍스처와 애니메이션 레이어가 실제 버튼 클릭을 방해하지 않도록 `pointer-events: none` 처리를 세밀하게 적용했습니다.

---

## 🚀 Quick Start

1. 의존성 패키지 설치
```bash
npm install
```

2.로컬 서버 실행
```Bash
npm run dev
```
