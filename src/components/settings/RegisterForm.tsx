import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "../../styles/registerForm.module.css";
import { RegisterData } from "../../types/auth.types";
import { getAuthenticatedUser, registerUser } from "../../api/auth.api";
import { loadToken, setAuthToken } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterData>({
    email: "",
    password: "",
    name: "",
    role: "residente",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    name: "",
    apartment: "",
    tel: "",
    shift: "",
    general: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  useEffect(() => {
    const validateUser = async () => {
      const token = loadToken();
      setAuthToken(token);

      if (!token) {
        navigate("/");
      }
    };

    validateUser();
  }, [navigate]);

  const validateFields = () => {
    let valid = true;
    const newErrors = {
      email: "",
      password: "",
      name: "",
      apartment: "",
      tel: "",
      shift: "",
      general: "",
    };

    // Validación de email
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "El email introducido no es válido";
      valid = false;
    }

    // Validación de contraseña
    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es requerida";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
      valid = false;
    }

    // Validación de nombre
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
      valid = false;
    }

    // Validaciones específicas por rol
    if (formData.role === "residente") {
      if (formData.role === "residente") {
        // Validación de apartamento
        if (!formData.apartment?.trim()) {
          newErrors.apartment = "El apartamento es requerido";
          valid = false;
        } else if (!/^[A-Za-z]-\d{1,3}$/.test(formData.apartment)) {
          newErrors.apartment =
            "El apartamento introducido es inválido. Ej: A-1";
          valid = false;
        }

        // Validación de teléfono
        if (!formData.tel?.trim()) {
          newErrors.tel = "El teléfono es requerido";
          valid = false;
        } else if (!/^\+\d{1,3}[-\s]?\d{1,4}([-\s]?\d+)*$/.test(formData.tel)) {
          newErrors.tel = "El teléfono introducido es inválido";
          valid = false;
        }
      }
    } else if (formData.role === "guardia") {
      if (!formData.shift) {
        newErrors.shift = "La tanda es requerida";
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangeTel = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (value === "" || /^[0-9-+--]+$/.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const logedUser = await getAuthenticatedUser();
    if (logedUser.role !== "admin") {
      setIsLoading(false);
      setErrors((prev) => ({
        ...prev,
        general: "Usuario no autorizado. Rol Insuficiente",
      }));
    }

    if (!validateFields()) {
      setIsLoading(false);
      return;
    }

    try {
      await registerUser(formData);
      setSuccess(true);
      setFormData({
        email: "",
        password: "",
        name: "",
        role: "residente",
        apartment: "",
        shift: "matutina",
        tel: "",
      });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: "Ocurrió un error al registrar el usuario",
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>
        <h2 className={styles.title}>SecurePass</h2>
        <h3 className={styles.subtitle}>Registro de Usuario</h3>

        <form onSubmit={handleSubmit} className={styles.form}>
          {errors.general && (
            <div className={styles.errorMessage}>{errors.general}</div>
          )}

          {isSuccess && (
            <div className={`${styles.alert} ${styles.alertSuccess}`}>
              <span
                className={styles.closeBtn}
                onClick={() => setSuccess(false)}
              >
                &times;
              </span>
              {" ¡Usuario registrado con éxito!"}
            </div>
          )}

          {/* Email */}
          <div className={styles.formGroup}>
            <input
              name="email"
              type="email"
              placeholder="Correo Electrónico"
              value={formData.email}
              className={`${styles.input} ${errors.email ? styles.error : ""}`}
              onChange={handleChange}
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email}</span>
            )}
          </div>

          {/* Password */}
          <div className={styles.formGroup}>
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              value={formData.password}
              className={`${styles.input} ${
                errors.password ? styles.error : ""
              }`}
              onChange={handleChange}
            />
            {errors.password && (
              <span className={styles.errorText}>{errors.password}</span>
            )}
          </div>

          {/* Name */}
          <div className={styles.formGroup}>
            <input
              name="name"
              type="text"
              placeholder="Nombre Completo"
              value={formData.name}
              className={`${styles.input} ${errors.name ? styles.error : ""}`}
              onChange={handleChange}
            />
            {errors.name && (
              <span className={styles.errorText}>{errors.name}</span>
            )}
          </div>

          {/* Role */}
          <div className={styles.formGroup}>
            <select
              name="role"
              value={formData.role}
              className={styles.select}
              onChange={handleChange}
            >
              <option value="residente">Residente</option>
              <option value="guardia">Guardia</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          {/* Conditional fields */}
          {formData.role === "residente" && (
            <>
              {/* Apartment */}
              <div className={styles.formGroup}>
                <input
                  name="apartment"
                  type="text"
                  placeholder="Apartamento"
                  value={formData.apartment || ""}
                  className={`${styles.input} ${
                    errors.apartment ? styles.error : ""
                  }`}
                  onChange={handleChange}
                />
                {errors.apartment && (
                  <span className={styles.errorText}>{errors.apartment}</span>
                )}
              </div>

              {/* Phone */}
              <div className={styles.formGroup}>
                <input
                  name="tel"
                  type="tel"
                  placeholder="Teléfono"
                  value={formData.tel || ""}
                  className={`${styles.input} ${
                    errors.tel ? styles.error : ""
                  }`}
                  onChange={handleChangeTel}
                />
                {errors.tel && (
                  <span className={styles.errorText}>{errors.tel}</span>
                )}
              </div>
            </>
          )}

          {formData.role === "guardia" && (
            <div className={styles.formGroup}>
              <select
                name="shift"
                value={formData.shift || ""}
                className={`${styles.select} ${
                  errors.shift ? styles.error : ""
                }`}
                onChange={handleChange}
              >
                <option value="">Seleccione una tanda</option>
                <option value="matutina">Matutina</option>
                <option value="vespertina">Vespertina</option>
                <option value="nocturna">Nocturna</option>
              </select>
              {errors.shift && (
                <span className={styles.errorText}>{errors.shift}</span>
              )}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.loadingText}>REGISTRANDO...</span>
            ) : (
              "Registrar Nuevo Usuario"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
