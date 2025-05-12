import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../styles/visits.module.css";

const ResidentLogin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Login residente:", { email, password });
  };

  return (
    <div className={`${style.container} ${style.fadeIn}`}>
      <div className={`${style["loginCard"]}`}>
        <h2>SecurePass</h2>
        <h3>Bienvenido</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />
          <div className={style.options}>
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <span className={style.forgot}>Forgot password?</span>
          </div>
          <button type="submit">Sign in</button>
        </form>
        <p className={style.registerLink}>
          ¿No tienes cuenta? <a href="/register-residente">Regístrate</a>
        </p>
        <button className={style.backButton} onClick={() => navigate("/home")}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default ResidentLogin;
