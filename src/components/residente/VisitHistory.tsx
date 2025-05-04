import React from "react";
import styles from "../styles/residente.module.css";

const visitHistory = () => {
  const visits = [
    { name: "Darwin Castillo", time: "Apr 21, 10:15 AM", status: "Completado" },
    { name: "Alexander Medina", time: "Apr 20, 3:35 PM", status: "Completado" },
  ];

  return (
    <div className={styles.section}>
      <h3>Historial de Visitas</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Visitante</th>
            <th>Hora</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((v, i) => (
            <tr key={i}>
              <td>{v.name}</td>
              <td>{v.time}</td>
              <td>
                <span
                  className={`${styles.badge} ${
                    styles[v.status.toLowerCase()]
                  }`}
                >
                  {v.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default visitHistory;
