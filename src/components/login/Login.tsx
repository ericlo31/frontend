import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../styles/visits.module.css";
import { loginUser } from "../../api/auth.api";
import { saveToken, setAuthToken } from "../../services/auth.service";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const { token, user } = await loginUser({ email, password });

      setAuthToken(token);
      saveToken(token);
      navigate('/home', { 
        state: { 
          token: token,
          user: user
        } 
      });

    } catch (error) {
      console.error("Ocurrió un error al autenticar el usuario", error);
      setError("Credenciales incorrectas. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <div className={`${style.loginResidentContainer} ${style.fadeIn}`}>
      <div className={`${style["loginCard"]}`}>
        <h2>SecurePass</h2>
        <h3>Bienvenido</h3>
        {error && <div className={style.errorMessage}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />
          <div className={style.options}>
            <label>
              <input type="checkbox" /> Recuérdame
            </label>
            <span className={style.forgot}>¿Olvidaste la constraseña?</span>
          </div>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;