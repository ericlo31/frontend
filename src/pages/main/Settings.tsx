import React, { useState } from "react";
import Sidebar from "../../components/visits/Sidebar";
import styles from "../../styles/visits.module.css";
import { useSidebar } from "../../contexts/SidebarContext";

const Settings = () => {
  const [form, setForm] = useState({
    name: "Eric Lorenzo",
    email: "eric@example.com",
    password: "",
    notifications: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving settings...", form);
  };

  const { isOpen } = useSidebar();

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div
        className={`${styles.mainContent} ${
          !isOpen ? styles.mainContentFull : ""
        }`}
      >
        <form onSubmit={handleSubmit} className={styles.settingsForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nombre Completo</label>
            <input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Correo Electrónico</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Nueva Contraseña</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={styles.saveBtn}>
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
