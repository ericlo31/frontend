import React, { useState, useEffect, ChangeEvent } from "react";
import styles from "../../styles/profile.module.css";
import { User } from "../../types/user.types";
import { setAuthToken } from "../../services/auth.service";
import { getAuthenticatedUser } from "../../api/auth.api";
import { updateUser } from "../../api/user.api";

interface ProfileProps {
  token: string;
}

const Profile: React.FC<ProfileProps> = ({ token }) => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        setAuthToken(token);
        const userData = await getAuthenticatedUser();
        setUser(userData);
        setIsLoading(false);
      } catch (err) {
        setError("Error al cargar los datos del usuario");
        setIsLoading(false);
      }
    };
    getUser();
  }, [token]);

  const handleEdit = () => {
    if (user) {
      setEditedUser({ ...user });
      setEditMode(true);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (!user || !editedUser) return;

    try {
      setIsLoading(true);
      const updatedUser = await updateUser(user._id, editedUser);
      setUser(updatedUser);
      setEditMode(false);
      setSuccessMessage("Datos actualizados correctamente");
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError("Error al actualizar los datos");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading)
    return (
      <div className={styles.loading}>
        <div className={styles.profileContainer}>
          <h2 className={styles.profileTitle}>Información del Perfil</h2>
          <div className={styles.profileSection}>
            <div className={styles.spinnerContainer}>
              <span className={styles.spinner}></span>
              <p>Cargando Información de Perfil...</p>
            </div>
          </div>
        </div>
      </div>
    );
  if (error) return <div className={styles.error}>{error}</div>;
  if (!user)
    return (
      <div className={styles.error}>No se encontraron datos del usuario</div>
    );

  return (
    <div className={styles.profileContainer}>
      <h2 className={styles.profileTitle}>Información del Perfil</h2>

      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}

      <div className={styles.profileSection}>
        <h3>Información Personal</h3>
        <div className={styles.profileField}>
          <label>Nombre:</label>
          {editMode ? (
            <input
              type="text"
              name="name"
              value={editedUser.name || ""}
              onChange={handleChange}
              className={styles.profileInput}
            />
          ) : (
            <span>{user.name}</span>
          )}
        </div>

        <div className={styles.profileField}>
          <label>Email:</label>
          {editMode ? (
            <input
              type="email"
              name="email"
              value={editedUser.email || ""}
              onChange={handleChange}
              className={styles.profileInput}
            />
          ) : (
            <span>{user.email}</span>
          )}
        </div>

        {user.tel && (
          <div className={styles.profileField}>
            <label>Teléfono:</label>
            {editMode ? (
              <input
                type="tel"
                name="tel"
                value={editedUser.tel || ""}
                onChange={handleChange}
                className={styles.profileInput}
              />
            ) : (
              <span>{user.tel}</span>
            )}
          </div>
        )}
      </div>

      {user.role === "residente" && (
        <div className={styles.profileSection}>
          <h3>Información de Residencia</h3>
          {user.apartment && (
            <div className={styles.profileField}>
              <label>Apartamento:</label>
              {editMode ? (
                <input
                  type="text"
                  name="apartment"
                  value={editedUser.apartment || ""}
                  onChange={handleChange}
                  className={styles.profileInput}
                />
              ) : (
                <span>{user.apartment}</span>
              )}
            </div>
          )}
        </div>
      )}

      <div className={styles.profileSection}>
        <h3>Información de Cuenta</h3>
        <div className={styles.profileField}>
          <label>Rol:</label>
          <span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
        </div>
        <div className={styles.profileField}>
          <label>Fecha de Registro:</label>
          <span>{formatDate(user.registerDate)}</span>
        </div>
        {user.shift && (
          <div className={styles.profileField}>
            <label>Turno:</label>
            {editMode ? (
              <select
                name="shift"
                value={editedUser.shift || ""}
                onChange={handleChange}
                className={styles.profileInput}
              >
                <option value="mañana">Mañana</option>
                <option value="tarde">Tarde</option>
                <option value="noche">Noche</option>
              </select>
            ) : (
              <span>{user.shift}</span>
            )}
          </div>
        )}
      </div>

      <div className={styles.profileActions}>
        {!editMode ? (
          <button
            onClick={handleEdit}
            className={styles.editButton}
            disabled={isLoading}
          >
            Editar
          </button>
        ) : (
          <>
            <button
              onClick={() => setEditMode(false)}
              className={styles.cancelButton}
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className={styles.saveButton}
              disabled={isLoading}
            >
              {isLoading ? "Guardando..." : "Guardar Cambios"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
