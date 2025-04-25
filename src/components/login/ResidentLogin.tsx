import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ResidentLogin.css';
import '../styles/animations.css';

const ResidentLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Login residente:', { email, password });
  };

  return (
    <div className="login-resident-container fade-in">
      <div className="login-card">
        <h2>ResidentPortal</h2>
        <h3>Welcome Back</h3>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email Address" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} required />
          <div className="options">
            <label><input type="checkbox" /> Remember me</label>
            <span className="forgot">Forgot password?</span>
          </div>
          <button type="submit">Sign in</button>
        </form>
        <p className="register-link">¿No tienes cuenta? <a href="/register-residente">Regístrate</a></p>
        <button className="back-button" onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    </div>
  );
};

export default ResidentLogin;