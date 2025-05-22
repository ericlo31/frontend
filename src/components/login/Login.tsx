import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../../styles/visits.module.css";
import { getAuthenticatedUser, loginUser } from "../../api/auth.api";
import {
  delToken,
  loadRememberMe,
  loadToken,
  saveRememberMe,
  saveToken,
  setAuthToken,
} from "../../services/auth.service";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    email: "", // Estado para errores de email
    password: "", // Estado para errrores de contraseña
    credentials: "", // Estado para errores de credenciales
  });
  const [rememberMe, setRememberMe] = useState("false");
  const [pageLoading, setPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Use Effect para verificar si hay un usuario autenticado antes de realizar Login
  useEffect(() => {
    const validateLogedOnUser = async () => {

      const checkRemember = loadRememberMe();
      if (checkRemember && checkRemember === "true") {
        try {
          setAuthToken(loadToken());
          const userLogedOn = await getAuthenticatedUser();
          if (userLogedOn) navigate("/home");
        } catch (error) {
          console.error("Sesión anterior no encontrada o expirada", error);
        } finally {
          setPageLoading(false);
        }
      } else {
        delToken();
        setPageLoading(false);
      }
    };
    validateLogedOnUser();
  }, [navigate]);

  const validateFields = () => {
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
      credentials: "",
    };

    if (!email.trim()) {
      newErrors.email = "El email es requerido";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "El email introducido no es válido";
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = "La contraseña es requerida";
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRememberMe = () => {
    rememberMe.includes("true")
      ? setRememberMe("false")
      : setRememberMe("true");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validateFields()) {
      setIsLoading(false);
      return;
    }

    try {
      const { token } = await loginUser({ email, password });

      setAuthToken(token);
      saveRememberMe(rememberMe);
      saveToken(token);

      const verifiedUser = await getAuthenticatedUser();

      if (verifiedUser.role === "guardia")
        throw new Error("Usuario no puede ser un guardia");

      navigate("/home");
    } catch (error: any) {
      // Manejo específico de errores de credenciales
      if (error.message.includes("Credenciales inválidas")) {
        setErrors((prev) => ({
          ...prev,
          credentials: "Email o contraseña incorrectos",
        }));
      } else if (error.message.includes("Usuario no puede ser guardia")) {
        setErrors((prev) => ({
          ...prev,
          credentials: "El usuario no puede ser guardia",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          credentials: "Ocurrió un error al iniciar sesión",
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      ></div>
    );
  } else
    return (
      <div className={`${style.loginResidentContainer} ${style.fadein}`}>
        <div className={`${style["loginCard"]}`}>
          <h2>SecurePass</h2>
          <h3>Residentes</h3>
          <form onSubmit={handleSubmit}>
            {errors.email && (
              <div className={style.errorMessage}>{errors.email}</div>
            )}
            <input
              placeholder="Correo Electrónico"
              value={email}
              className={`${style.loginInput}`}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />

            {errors.password && (
              <div className={style.errorMessage}>{errors.password}</div>
            )}
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              className={`${style.loginInput}`}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />

            <div className={style.options}>
              <label>
                <input
                  id="checkbox"
                  type="checkbox"
                  onClick={handleRememberMe}
                />
                Mantener Sesión Iniciada
              </label>
            </div>
            <button type="submit">
              {isLoading ? "CARGANDO..." : "Iniciar Sesión"}
            </button>
          </form>
          {errors.credentials && (
            <div className={style.credentialsMessage}>{errors.credentials}</div>
          )}
        </div>
      </div>
    );
};

export default Login;
