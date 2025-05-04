import React from "react";
import styles from "../components/styles/residente.module.css";

const VisitHistory = () => {
  return (
    <div className={styles.section}>
      <h2>Historial </h2>
      <p>
        Aquí verá una tabla de entradas de visitantes registradas una vez se
        haya conectado a la API.
      </p>
    </div>
  );
};

export default VisitHistory;
