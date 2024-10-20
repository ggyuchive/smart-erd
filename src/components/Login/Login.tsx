import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "antd";
import './Login.css'

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onLogin(username, password);
  };

  const navigate = useNavigate();
  const goToRegister = () => {
    navigate('/register');
  };
  const goToMain = () => {
    navigate('/main');
  }

  return (
    <div className='Login'>
      <h1>SMART ERD</h1>
      <h2>SQL문 기반 E-R Diagram 그리기 웹 어플리케이션</h2>
      <h2>지금 회원가입 및 로그인 후 편리하게 E-R Diagram을 그려보세요!</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="id"
						placeholder="아이디"
            id="id"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
						placeholder="비밀번호"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="primary" onClick={goToMain} htmlType="submit" className="login-button">로그인</Button>
        <Button type="default" onClick={goToRegister} className="register-button">회원가입</Button>
      </form>
    </div>
  );
};

export default Login;
