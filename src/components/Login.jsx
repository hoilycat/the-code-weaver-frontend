import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
    const res = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // 입력받은 username과 password를 보냄
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("adminToken", data.token); // "secret-key-12345" 저장됨
      alert("관리자님 환영합니다! 🧶");
      navigate("/");
    } else {
      alert("비밀번호를 다시 확인해주세요.");
    }
  } catch (err) {
    alert("서버 연결에 실패했습니다.");
  }
};


  return (
    <div className="magazine-layout" style={{textAlign:'center', paddingTop:'150px'}}>
      <form onSubmit={handleLogin} style={{maxWidth:'300px', margin:'0 auto', display:'flex', flexDirection:'column', gap:'15px'}}>
        <h2 className="mag-title" style={{fontSize:'2rem'}}>Staff Only</h2>
        <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} style={{padding:'10px'}} />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} style={{padding:'10px'}} />
        <button type="submit" className="mag-visit-link" style={{border:'none', cursor:'pointer'}}>LOGIN</button>
      </form>
    </div>
  );
};

export default Login;