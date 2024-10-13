import React from 'react';
import Login from './components/Login/Login';

const App: React.FC = () => {
  const handleLogin = (username: string, password: string) => {
    console.log('Logging in with', { username, password });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <Login onLogin={handleLogin} />
    </div>
  );
};

export default App;
