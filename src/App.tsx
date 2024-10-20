import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import MainLayout from './components/MainLayout/MainLayout';
import ERDDrawer from './components/ERDDrawer/ERDDrawer';
import UserList from './components/UserList/UserList';
import './App.css'

const App: React.FC = () => {
  const handleLogin = (username: string, password: string) => {
    console.log('Log in with', { username, password });
  };
  const handleRegister = (username: string, password: string) => {
    console.log('Register with', { username, password });
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin}/>} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/main" element={<MainLayout/>}>
          <Route path="" element={<Navigate to="/main/erd"/>} />
          <Route path="erd" element={<ERDDrawer/>} />
          <Route path="userlist" element={<UserList/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
