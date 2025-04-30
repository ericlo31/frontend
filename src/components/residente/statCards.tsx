import React from "react";
import styles from "./residente.module.css";

const statCards = () => {
  const stats = [
    { label: "Autorizaciones", value: 3 },
    { label: "Visitas Pendientes", value: 5 },
    { label: "Visitas Hoy", value: 2 },
  ];

  return (
    <div className={styles.statGrid}>
      {stats.map((stat, i) => (
        <div key={i} className={styles.statCard}>
          <div>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default statCards;
