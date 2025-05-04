import React from "react";
import styles from "../styles/residente.module.css";
import { FaEdit, FaQrcode, FaShare, FaTrash } from "react-icons/fa";

const ActiveAuthorizations = () => {
  const auths = [
    {
      name: "Jose Rosario",
      type: "Visita",
      status: "Activo",
      expires: "Today 5:00 PM",
      actions: "",
    },
    {
      name: "Eric Lorenzo",
      type: "Visita",
      status: "Expirado",
      expires: "Tomorrow 12:00 PM",
      actions: "",
    },
    {
      name: "Darwin Castillo",
      type: "Visita",
      status: "Pendiente",
      expires: "Tomorrow 12:00 PM",
      actions: "",
    },
  ];

  return (
    <div className={styles.section}>
      <h3>Autorizaciones Activas</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th className={styles.hideableRow}>Tipo</th>
            <th>Status</th>
            <th className={styles.hideableRow}>Expira</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {auths.map((a, i) => (
            <tr key={i} className={styles.authRow}>
              <td>{a.name}</td>
              <td className={styles.hideableRow}>{a.type}</td>
              <td>
                <span
                  className={`${styles.badge} ${
                    styles[a.status.toLowerCase()]
                  }`}
                >
                  {a.status}
                </span>
              </td>
              <td className={styles.hideableRow}>{a.expires}</td>
              <td>
                <div className={styles.actionGroup}>
                  <button className={styles.authBtn}>
                    <FaQrcode className={styles.actionAuthIcon} />
                  </button>
                  <button className={styles.authBtn}>
                    <FaShare className={styles.actionAuthIcon} />
                  </button>
                  <button className={styles.authBtn}>
                    <FaEdit className={styles.actionAuthIcon} />
                  </button>
                  <button className={styles.authBtn}>
                    <FaTrash className={styles.actionAuthIcon} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveAuthorizations;
