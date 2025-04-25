import React from "react";
import styles from "./resident.module.css";

const VisitHistory = () => {
  const visits = [
    { name: "Darwin Castillo", time: "Apr 21, 10:15 AM", status: "Completed" },
    { name: "Alexander Medina", time: "Apr 20, 3:45 PM", status: "Completed" },
  ];

  return (
    <div className={styles.section}>
      <h3>Visit History</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Visitor</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {visits.map((v, i) => (
            <tr key={i}>
              <td>{v.name}</td>
              <td>{v.time}</td>
              <td>{v.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitHistory;
