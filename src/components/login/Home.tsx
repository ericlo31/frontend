import React from 'react';
import { Link } from 'react-router-dom';
import home from '../../styles/home.module.css';
import animations from '../../styles/animations.module.css';

const Home: React.FC = () => {
  return (
    <div className={`${home.homeContainer} ${animations.fadeIn}`}>
      <h1>Bienvenido al Registro de Visitantes</h1>
      <div className={home.buttonGroup}>
        <Link to="/login-residente" className={home.homeBtn}>Soy Residente</Link>
        <Link to="/login-admin" className={home.homeBtn}>Soy Administrador</Link>
      </div>
    </div>
  );
};

export default Home;