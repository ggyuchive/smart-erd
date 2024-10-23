import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { Node, Edge } from 'react-flow-renderer';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import MainLayout from './components/MainLayout/MainLayout';
import ERDDrawer from './components/ERDDrawer/ERDDrawer';
import UserList from './components/UserList/UserList';
import './App.css'

const App: React.FC = () => {
  const [userDiagrams, setUserDiagrams] = useState<{ nodes: Node[]; edges: Edge[] }[]>([]);

  const handleLogin = (username: string, password: string) => {
    console.log('Log in with', { username, password });
  };
  const handleRegister = (username: string, password: string) => {
    console.log('Register with', { username, password });
  };
  const handleDeleteDiagram = (index: number) => {
    setUserDiagrams((prevDiagrams) => prevDiagrams.filter((_, i) => i !== index));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin}/>} />
        <Route path="/register" element={<Register onRegister={handleRegister} />} />
        <Route path="/main" element={<MainLayout/>}>
          <Route path="" element={<Navigate to="/main/erd"/>} />
          <Route path="erd" element={<ERDDrawer setUserDiagrams={setUserDiagrams}/>} />
          <Route path="userlist" element={<UserList diagrams={userDiagrams} onDelete={handleDeleteDiagram}/>}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
