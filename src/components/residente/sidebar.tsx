import React, { useState } from "react";
import styles from "./residente.module.css";
import {
  FaHome,
  FaUserShield,
  FaHistory,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
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
              className={location.pathname === "/" ? styles.activeNavItem : ""}
            >
              <Link to="/" className={styles.navLink}>
                <FaHome /> Dashboard
              </Link>
            </li>
            <li
              className={
                location.pathname === "/authorizations"
                  ? styles.activeNavItem
                  : ""
              }
            >
              <Link to="/authorizations" className={styles.navLink}>
                <FaUserShield /> Autorizaciones
              </Link>
            </li>
            <li
              className={
                location.pathname === "/visit-history"
                  ? styles.activeNavItem
                  : ""
              }
            >
              <Link to="/visit-history" className={styles.navLink}>
                <FaHistory /> Historial
              </Link>
            </li>

            <li
              className={
                location.pathname === "/settings" ? styles.activeNavItem : ""
              }
            >
              <Link to="/settings" className={styles.navLink}>
                <FaCog /> Ajustes
              </Link>
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
