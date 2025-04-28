import React, { useState } from "react";
import styles from "./residente.module.css";
import {
  FaHome,
  FaUserShield,
  FaHistory,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`${styles.sidebar} ${
        isOpen ? styles.sidebarOpen : styles.sidebarClosed
      }`}
    >
      <div className={styles.topBar}>
        <div className={styles.logo}>SecurePass</div>
        <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          ☰
        </button>
      </div>

      <div className={styles.navArea}>
        <nav className={styles.nav}>
          <ul>
            <li
              className={activeItem === "Dashboard" ? styles.activeNavItem : ""}
              onClick={() => setActiveItem("Dashboard")}
            >
              <FaHome /> Dashboard
            </li>
            <li
              className={
                activeItem === "Authorizations" ? styles.activeNavItem : ""
              }
              onClick={() => setActiveItem("Authorizations")}
            >
              <FaUserShield /> Authorizations
            </li>
            <li
              className={
                activeItem === "Visit History" ? styles.activeNavItem : ""
              }
              onClick={() => setActiveItem("Visit History")}
            >
              <FaHistory /> Visit History
            </li>
            <li
              className={activeItem === "Settings" ? styles.activeNavItem : ""}
              onClick={() => setActiveItem("Settings")}
            >
              <FaCog /> Settings
            </li>
          </ul>
        </nav>

        <button className={styles.logout}>
          <FaSignOutAlt style={{ marginRight: "8px" }} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
