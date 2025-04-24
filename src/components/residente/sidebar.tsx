import React from "react";
import styles from "./resident.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>🔒 SecurePass</div>
      <nav className={styles.nav}>
        <ul>
          <li>Dashboard</li>
          <li>Authorizations</li>
          <li>Visit History</li>
          <li>Settings</li>
        </ul>
      </nav>
      <button className={styles.logout}>Logout</button>
    </aside>
  );
};

export default Sidebar;
