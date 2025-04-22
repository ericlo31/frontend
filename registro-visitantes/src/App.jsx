import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ResidentLogin from './components/ResidentLogin';
import AdminLogin from './components/AdminLogin';
import Home from './components/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login-residente" element={<ResidentLogin />} />
      <Route path="/login-admin" element={<AdminLogin />} />
    </Routes>
  );
};

export default App;