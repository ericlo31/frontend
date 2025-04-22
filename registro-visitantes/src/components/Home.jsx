import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container fade-in">
      <h1>Bienvenido al Registro de Visitantes</h1>
      <div className="button-group">
        <Link to="/login-residente" className="home-btn">Soy Residente</Link>
        <Link to="/login-admin" className="home-btn">Soy Administrador</Link>
      </div>
    </div>
  );
};

export default Home;