import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ResidentLogin from './components/ResidentLogin';
import AdminLogin from './components/AdminLogin';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login-residente" element={<ResidentLogin />} />
      <Route path="/login-admin" element={<AdminLogin />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;