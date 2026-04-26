import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // 입력받은 username과 password를 보냄
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("adminToken", data.token); 
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
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Staff Only</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input 
            type="text" 
            className="login-input"
            placeholder="USERNAME" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input 
            type="password" 
            className="login-input"
            placeholder="PASSWORD" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-submit-btn">
            AUTHENTICATE
          </button>
        </form>
        <p className="login-footer-text">© THE WEAVER ARCHIVE</p>
      </div>
    </div>
  );
};

export default Login;