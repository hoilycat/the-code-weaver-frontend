import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocation } from 'react-router-dom';// eslint-disable-line no-unused-vars


gsap.registerPlugin(ScrollTrigger);

const ScrollParticles = () => {
  const containerRef = useRef(null);
  const location = useLocation(); // 현재 내가 어느 페이지에 있는지 확인
  const triggerRef = useRef(null); // 스크롤 트리거가 될 요소 참조 (예: 프로젝트 섹션)
  
  // 테마에 맞춘 저채도 털실 색상
  const themeColors = {
    blue: '#94B4C1',
    navy: '#213448',
    yarns: ['#94B4C1', '#A69082', '#7E8D85', '#C1B2AB', '#547792']
  };

  useEffect(() => {
    // 메인 페이지("/")가 아니면 아무것도 하지 않음
    if (location.pathname !== "/"){
      if (triggerRef.current) triggerRef.current.kill();
      return;
    }

const timer = setTimeout(() => {   
    const aboutSection = document.getElementById('About');
    const projectSection = document.getElementById('Projects');
    
    const createParticle = (direction) => {
      const container = containerRef.current;
      if (!container) return;

      // 모바일 여부 확인 (화면 너비 768px 이하)
      const isMobile = window.innerWidth <= 768;

      // [최적화] 모바일이면 생성 확률을 더 낮춤 (0.2 -> 0.05)
      const mobileChance = isMobile ? 0.3 : 0.6; 
      if (Math.random() > mobileChance) return;

      const scrollY = window.scrollY;
      const aboutTop = aboutSection ? aboutSection.offsetTop : 0; // About 섹션의 시작 지점
      const aboutHeight = aboutSection ? aboutSection.offsetHeight : 0; // About 섹션의 80% 지점 계산
      const clothesDonePoint = aboutTop + (aboutHeight * 0.8); // 털실이 더 이상 생성되지 않는 지점 (About 섹션의 80% 지점)

  
      if (direction === 'down') {

        const aboutProgress = (scrollY - aboutTop) / aboutHeight; // About 섹션에서의 스크롤 진행률 (0~1)
        const peakChance = isMobile ? 0.6 : 0.8; // 모바일은 확률 자체도 낮추고, 피크 확률도 낮춤
        const fadeFactor = isMobile ? 1.5 : 2.5; // 모바일은 더 넓은 범위에서 발생
        const distFromCenter = Math.abs(aboutProgress - 0.4);

        const spawnChance = Math.max(0, peakChance * (1 - (distFromCenter * fadeFactor)));

        if (Math.random() > spawnChance) return;
        // 1. 내려갈 때: 구불구불한 도톰한 털실
        if (scrollY > clothesDonePoint) return;

        const yarn = document.createElement('div');
        yarn.className = 'particle-yarn';

        const color = themeColors.yarns[Math.floor(Math.random() * themeColors.yarns.length)];
        const size = Math.random() * 100 + 50;//실 길이
        const yarnWidth = Math.random() * 100 + 80; //실 두께

        // 실 디자인: 구불구불한 곡선 + 랜덤한 색상 + 몽글몽글한 끝 + 살짝 흐릿한 그림자
        yarn.innerHTML = `
          <svg viewBox="0 0 100 40" style="width:${yarnWidth}px; height:auto; overflow:visible;">
            <path d="M10,20 Q30,0 50,20 T90,20" 
                  stroke="${color}" 
                  stroke-width="18"  /* 숫자가 커질수록 실이 도톰해짐 */
                  fill="none" 
                  stroke-linecap="round" /* 실 끝을 몽글몽글하게 만드는 속성 */
                  style="filter: drop-shadow(0 0 6px ${color}aa);" 
            />
          </svg>
        `;

        const startY = Math.random() * 20; // 0~20vh 사이 랜덤 시작 높이

        Object.assign(yarn.style, {
          left: Math.random() * 100 + 'vw',
          top: startY + 'vh',
          position: 'fixed',
          zIndex: '100001',
          opacity: 0.7,
          filter: 'blur(0.5px)',
          transform: `rotate(${Math.random() * 360}deg)`,
          pointerEvents: 'none'
        });
        
        container.appendChild(yarn);

      // 애니메이션: 나타나면서 살짝 커졌다가, 구불구불하게 내려가면서 회전하고, 마지막에 사라짐
      const tl = gsap.timeline({ onComplete: () => yarn.remove() });

     // 1. 제자리에서 아주 작게(scale: 0) 시작해서 퐁신하게 커짐
      tl.fromTo(yarn, 
          { opacity: 0, scale: 0, y: 50 }, // 화면 살짝 아래에서 점처럼 대기
          { 
            opacity: 0.8, 
            scale: 1,     // 원래 크기로 뿅! 커짐
            y: 0,         // 위로 살짝 떠오름
            duration: 0.8, 
            ease: "back.out(1.5)" // '퐁신' 느낌을 살리는 고무공 텐션 부활!
          } 
        )
        // 2. 극강의 쫀득함: 슉! 떨어지며 빙그르르 돌고 멀어짐
        .to(yarn, {
          y: window.innerHeight * (0.8 + Math.random() * 0.4), 
          x: `+=${(Math.random() - 0.5) * 500}`,
          
          //  회전 각도를 키워서 털실이 떨어지면서 더 생동감 있게 돌도록!
          rotation: (Math.random() - 0.5) * 1080, // 최대 1080도 회전 (3바퀴)

          //  스르륵 사라지는 동시에 크기도 살짝 작아져서 멀어지는 느낌 추가!
          opacity: 0,
          scale: 0.2, 

          duration: 2.5 + Math.random() * 2,
          
          // 처음과 끝을 부드럽고 쫀득하게 잡아주는 power2.inOut 마법!
          ease: "power2.inOut" 
        });

        
        } else {
        if (scrollY > 1500) return; // 스크롤이 너무 많이 올라갔을 때는 별이 안 생기도록 (너무 아래에서 갑자기 별이 막 튀어나오는 걸 방지)

        const starBaseSize = 20; 
        const starRandomFactor = 100;
        const size = Math.random() * starRandomFactor + starBaseSize; 

        //  2. 올라갈 때: 4각 스파클 별 (가시성 대폭 강화)
        const star = document.createElement('div');
        star.className = 'particle-star';
        

         //  별 디자인: 테마 하늘색 채우기 + 얇은 네이비 선
        star.innerHTML = `
          <svg viewBox="0 0 512 512" style="width:100%; height:100%;">
            <path d="M256 0c-4.4 135.5-120.5 251.6-256 256 135.5 4.4 251.6 120.5 256 256 4.4-135.5 120.5-251.6 256-256-135.5-4.4-251.6-120.5-256-256z" 
                  fill="${themeColors.blue}" 
                  stroke="${themeColors.navy}" 
                  stroke-width="20"
            />
          </svg>
        `;

        Object.assign(star.style, {
          width: `${size}px`,
          height: `${size}px`,
          left: Math.random() * 100 + 'vw',
          bottom: '-100px',
          position: 'fixed',
          zIndex: '100002',
          // 별이 겹쳐도 잘 보이게 하는 얇은 하얀 광채
          filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.8))',
        });
        
        container.appendChild(star);
        gsap.to(star, {
          y: -window.innerHeight - 150,
          x: (Math.random() - 0.5) * 200,
          opacity: 0,
          scale: 0.3,
          duration: Math.random() * 1 + 1,
          ease: "power1.out",
          onComplete: () => star.remove()
        });
      }
    };

          //  새로운 감지기를 변수에 할당
      triggerRef.current = ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity());
          if (velocity > 100) {
            createParticle(self.direction === 1 ? 'down' : 'up');
          }
        }
      });

      //  중요: 감지기를 다시 활성화하고 위치를 새로 고침
      ScrollTrigger.refresh();

    }, 100); // 0.1초의 여유를 줌

    return () => {
      clearTimeout(timer);
      if (triggerRef.current) triggerRef.current.kill(); // 나갈 때 감지기 파괴
    };
  }, [location.pathname]); // 주소가 바뀔 때마다 이 전체 과정 반복

  if (location.pathname !== "/") return null;

  return <div ref={containerRef} className="particle-container" />;
};

export default ScrollParticles;