import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ResidentLogin.css';
import '../styles/animations.css';

const ResidentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Residente autenticado:', { email, password });
  };

  return (
    <div className="login-resident-container fade-in">
      <div className="login-card">
        <h2>ResidentPortal</h2>
        <h3>Welcome Back</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="options">
            <label>
              <input type="checkbox" /> Recordarme
            </label>
            <span className="forgot">Se te olvido la clave?</span>
          </div>

          <button type="submit">Inicia Sesion</button>
        </form>

        <p className="register-link">
          No tienes cuenta aun? <a href="#">Registrate Aqui</a>
        </p>

        <button className="back-button" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default ResidentLogin;