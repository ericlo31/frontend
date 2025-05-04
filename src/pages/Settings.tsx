import React from "react";
import styles from "../components/styles/residente.module.css";

const Settings = () => {
  return (
    <div className={styles.section}>
      <h2>Ajustes</h2>
      <p>
        Esta pagina será para que el usuario actualice el email, la contraseña y
        otras cosas.
      </p>
    </div>
  );
};

export default Settings;
