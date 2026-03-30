
import React from 'react';
import './Footer.css';
import bneedle from "../assets/images/bneedle.svg";
import phoneIcon from '../assets/icons/phone-alt.svg';
import emailIcon from '../assets/icons/envelope.svg';
import githubIcon from '../assets/icons/github-alt.svg';

/* Icons used in this project are from Font Awesome (Free License).
  License: CC BY 4.0
*/

const contacts = [
        { id: 1, icon: phoneIcon, link:'tel:010-5944-6837'},
        { id: 2, icon: emailIcon, link:'mailto:iopuhjrybe57@gmail.com'},
        { id: 3, icon:githubIcon, link:'https://github.com/hoilycat'}
      ];



export default function Footer() {
  return (
    <footer id="Footer" style={{ 
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
           <img src= {item.icon} alt="" style={{ width: '16px', height: '16px',              filter:'invert(96%) sepia(6%) saturate(692%) hue-rotate(345deg) brightness(101%) contrast(89%)'
 }}/>
          </a>
        ))}
      </div>

      <p style={{ fontSize: '0.7rem', opacity: 0.6 }}>
        Privacy policy ©The Weaver
      </p>
    </footer>
  );
}

