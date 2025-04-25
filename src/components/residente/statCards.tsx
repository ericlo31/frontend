import React from "react";
import styles from "./residente.module.css";

const statCards = () => {
  const stats = [
    { label: "Authorizations", value: 3, icon: "🛡️" },
    { label: "Pending Visits", value: 5, icon: "📆" },
    { label: "Visitors Today", value: 2, icon: "🚪" },
  ];

  return (
    <div className={styles.statGrid}>
      {stats.map((stat, i) => (
        <div key={i} className={styles.statCard}>
          <div>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={styles.statLabel}>{stat.label}</div>
          </div>
          <div className={styles.statCardIcon}>{stat.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default statCards;
