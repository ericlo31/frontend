import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import residentlogin from '../styles/residentLogin.module.css';
import animations from '../styles/animations.module.css';


const ResidentLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Login residente:', { email, password });
  };

  return (
    <div className={`${residentlogin.container} ${animations.fadeIn}`}>
      <div className={`${residentlogin['loginCard']}`}>
        <h2>ResidentPortal</h2>
        <h3>Welcome Back</h3>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email Address" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} required />
          <div className={residentlogin.options}>
            <label><input type="checkbox" /> Remember me</label>
            <span className={residentlogin.forgot}>Forgot password?</span>
          </div>
          <button type="submit">Sign in</button>
        </form>
        <p className={residentlogin.registerLink}>¿No tienes cuenta? <a href="/register-residente">Regístrate</a></p>
        <button className={residentlogin.backButton} onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    </div>
  );
};

export default ResidentLogin;