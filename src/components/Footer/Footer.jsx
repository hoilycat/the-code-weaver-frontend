
import React, { useEffect, useRef } from 'react';
import './Footer.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bneedle from "../../assets/images/bneedle.svg";
import phoneIcon from '../../assets/icons/phone-alt.svg';
import emailIcon from '../../assets/icons/envelope.svg';
import githubIcon from '../../assets/icons/github-alt.svg';

/* Icons used in this project are from Font Awesome (Free License).
  License: CC BY 4.0
*/

gsap.registerPlugin(ScrollTrigger);//

const contacts = [
        { id: 1, icon: phoneIcon, link:'tel:010-5944-6837'},
        { id: 2, icon: emailIcon, link:'mailto:iopuhjrybe57@gmail.com'},
        { id: 3, icon:githubIcon, link:'https://github.com/hoilycat'}
      ];

const isAdmin = localStorage.getItem("adminToken") === "secret-key-12345";

const handleLogout = () => {
  localStorage.removeItem("adminToken");
  alert("로그아웃 되었습니다.");
  window.location.reload(); // 화면 새로고침해서 버튼들 숨기기
};


export default function Footer() {

  const footerRef = useRef(null);//안테나 만들기

   useEffect(() => {

      // 창 크기 조절 시 ScrollTrigger를 새로고침하는 함수
      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", handleResize);

      const ctx = gsap.context(() => {
              
              // 1. 타임라인(지휘자) 생성: 여기서 스크롤 기준을 한 번만 딱 정해준다!
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: footerRef.current,
                  start: "top 45%", // 푸터가 보이기 시작하면 일제히 시작
                  toggleActions: "play none none reverse", // 올리면 다시 퐁퐁퐁 나오게 세팅
                  invalidateOnRefresh: true, 
                }
              });

              // 2. 첫 번째 연주: 바늘 애니메이션
              tl.from("#bottomneedle", {
                y: -100,             
                opacity: 0, 
                rotation: -45,      
                duration: 1.5, 
                ease: "elastic.out(1, 0.4)"
              })
              // 2단계: "Shall we weave together?" 글씨만 따로 우아하게 등장
              .from("h3", {
                y: 20,              
                opacity: 0,
                duration: 0.8,
                ease: "power2.out" 
              }, "-=1.0") // 바늘이 뒤뚱거리고 있을 때 슬며시 나타남

              // 3단계: 연락처 아이콘들이 0.1초 간격으로 통통통! 귀엽게 마무리
              .from(".contact-item", {
                y: 30,              
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,      
                ease: "back.out(2)" 
              }, "-=0.4"); // 글씨가 나타난 직후에 이어서 통통통!
            }, footerRef);

      return () => {
        ctx.revert(); // 청소부
        window.removeEventListener("resize", handleResize);
      };
    }, []);

  
  return (
    <footer id="Footer" ref={footerRef} style={{ 
      backgroundColor: 'var(--dark-color)', 
      color: 'var(--bg-color)', 
      padding: '100px 0 20px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      clipPath: 'polygon(0 15%, 50% 0, 100% 15%, 100% 100%, 0 100%)' // Angled top
    }}>
      <img className= "needles" id="bottomneedle" src={bneedle} />

      <h3>
        Shall we weave together?
      </h3>

      
      <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
        {contacts.map(item => (
          <a
            key={item.id}
            className="contact-item" // 아이콘들을 한 번에 조종하기 위해 이름표 달기     
            href={item.link}
            target="_blank"// 새 탭에서 열기
            rel="noopener noreferrer" // 보안 강화
            style={{
              width:'30px',
              height:'30px',
              border:'2px solid #ede4d5',
              borderRadius:'50%',
              display:'flex',
              alignItems:'center',
              justifyContent:'center',
              textDecoration:'none',
              fontSize:'14px'
            }}
        
          > 
          {/* 아이콘 이미지 */}
           <img src= {item.icon} alt="" style={{ width: '16px', height: '16px', 
           filter:'invert(96%) sepia(6%) saturate(692%) hue-rotate(345deg) brightness(101%) contrast(89%)'}}/>
          </a>
        ))}
      </div>

      {/* 관리자면 로그아웃 버튼 보여주기 */}
      {isAdmin && (
        <div className="admin-zone">
          <button onClick={handleLogout} className="logout-minimal-btn">
            LOGOUT
          </button>
        </div>
      )}

      <p style={{ fontSize: '0.7rem', opacity: 0.6 }}>
        Privacy policy ©The Weaver
      </p>
    </footer>
  );
}

