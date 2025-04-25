import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminLogin.css';
import '../styles/animations.css';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Login admin:', { email, password, pin });
  };

  return (
    <div className="login-admin-container fade-in">
      <div className="login-card">
        <h2>AdminPanel</h2>
        <h3>Welcome Back</h3>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email Address" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} required />
          <input type="text" placeholder="Security PIN" value={pin} onChange={(e: ChangeEvent<HTMLInputElement>) => setPin(e.target.value)} required />
          <button type="submit">Sign in</button>
        </form>
        <p className="register-link">¿No tienes cuenta? <a href="/register-admin">Regístrate</a></p>
        <button className="back-button" onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    </div>
  );
};
