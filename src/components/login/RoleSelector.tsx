import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RoleSelector.css';
import '../styles/animations.css';

function RoleSelector() {
  const navigate = useNavigate();

  return (
    <div className="role-selector fade-in">
      <h1>Bienvenido</h1>
      <p>Selecciona tu tipo de usuario</p>
      <div className="buttons">
        <button onClick={() => navigate('/login/residente')}>Residente</button>
        <button onClick={() => navigate('/login/admin')}>Administrador</button>
      </div>
    </div>
  );
}

export default RoleSelector;
