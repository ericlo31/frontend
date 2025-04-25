import React from "react";
import styles from "./residente.module.css";

const StatCards = () => {
  const stats = [
    { label: "Active Authorizations", value: 3 },
    { label: "Pending Visits", value: 5 },
    { label: "Visitors Today", value: 2 },
  ];

  return (
    <div className={styles.statGrid}>
      {stats.map((stat, i) => (
        <div key={i} className={styles.statCard}>
          <div className={styles.statValue}>{stat.value}</div>
          <div className={styles.statLabel}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;
