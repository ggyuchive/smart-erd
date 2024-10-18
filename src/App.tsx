import React from 'react';
import { DatePicker } from 'antd';
import Login from './components/Login/Login';
import Main from './components/Main/Main'

const App: React.FC = () => {
  const handleLogin = (username: string, password: string) => {
    console.log('Logging in with', { username, password });
  };

  return (
    <div>
      <h1>Welcome to SMART ERD!</h1>
      <Login onLogin={handleLogin} />
      <Main/>
      <DatePicker/>
    </div>
  );
};

export default App;
