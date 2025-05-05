import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import adminlogin from '../../styles/adminLogin.module.css';
import animations from '../../styles/animations.module.css';

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
    <div className={`${adminlogin.container} ${animations.fadeIn}`}>
      <div className={`${adminlogin['loginCard']}`}>
        <h2>AdminPanel</h2>
        <h3>Welcome Back</h3>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email Address" value={email} onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} required />
          <input type="text" placeholder="Security PIN" value={pin} onChange={(e: ChangeEvent<HTMLInputElement>) => setPin(e.target.value)} required />
          <button type="submit">Sign in</button>
        </form>
        <p className={adminlogin.registerLink}>¿No tienes cuenta? <a href="/register-admin">Regístrate</a></p>
        <button className={adminlogin.backButton} onClick={() => navigate('/')}>Volver al inicio</button>
      </div>
    </div>
  );
};

export default AdminLogin;