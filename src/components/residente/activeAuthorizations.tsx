import React from "react";
import styles from "./resident.module.css";

const ActiveAuthorizations = () => {
  const auths = [
    { name: "Jose Danny", type: "Delivery", expires: "Today 5:00 PM" },
    { name: "Eric Lorenzo", type: "Guest", expires: "Tomorrow 12:00 PM" },
  ];

  return (
    <div className={styles.section}>
      <h3>Active Authorizations</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Expires</th>
          </tr>
        </thead>
        <tbody>
          {auths.map((a, i) => (
            <tr key={i}>
              <td>{a.name}</td>
              <td>{a.type}</td>
              <td>{a.expires}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveAuthorizations;
