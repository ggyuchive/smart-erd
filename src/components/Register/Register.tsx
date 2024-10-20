import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "antd";
import './Register.css'

interface RegisterProps {
  onRegister: (username: string, password: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
	const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
	const [password_retype, setPasswordRetype] = useState('');

	const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onRegister(username, password);
  };

	const navigate = useNavigate();
	const goToLogin = () => {
		navigate('/');
	};

	return (
		<div className='Register'>
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
				<div>
					<input
						type="password-retype"
						placeholder="비밀번호 확인"
						id="password-retype"
						value={password_retype}
						onChange={(e) => setPasswordRetype(e.target.value)}
					/>
				</div>
        <Button type="primary" onClick={goToLogin} className="register-button">회원가입</Button>
      </form>
    </div>
	);
}

export default Register;
