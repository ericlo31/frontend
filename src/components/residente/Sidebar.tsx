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

/* Prueba */

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
      
      <div className={`${styles.navArea} ${
                  isOpen ? styles.navAreaOpen : styles.navAreaClosed
                }`}>
        <nav className={styles.nav}>
          <ul>
          <div className={`${styles.navContent} ${
                  isOpen ? styles.navContentOpen : styles.navContentClosed
                }`}>
            <li
              className={location.pathname === "/" ? styles.activeNavItem : ""}
            >
              
              <Link to="/" className={styles.navLink}>
                <FaHome className={`${styles.Fa} ${
                  isOpen ? styles.FaOpen : styles.FaClosed
                }`} /> <span className={`${styles.navText} ${
                  isOpen ? styles.navTextOpen : styles.navTextClosed
                }`}>Dashboard</span>
              </Link>
            </li></div>
            <div className={`${styles.navContent} ${
                  isOpen ? styles.navContentOpen : styles.navContentClosed
                }`}>
            <li
              className={
                location.pathname === "/authorizations"
                  ? styles.activeNavItem
                  : ""
              }
            >
              <Link to="/authorizations" className={styles.navLink}>
                <FaUserShield className={`${styles.Fa} ${
                  isOpen ? styles.FaOpen : styles.FaClosed
                }`}/> <span className={`${styles.navText} ${
                  isOpen ? styles.navTextOpen : styles.navTextClosed
                }`}>Autorizaciones</span>
              </Link>
            </li></div>
            <div className={`${styles.navContent} ${
                  isOpen ? styles.navContentOpen : styles.navContentClosed
                }`}>
            <li
              className={
                location.pathname === "/visit-history"
                  ? styles.activeNavItem
                  : ""
              }
            >
              <Link to="/visit-history" className={styles.navLink}>
                <FaHistory className={`${styles.Fa} ${
                  isOpen ? styles.FaOpen : styles.FaClosed
                }`}/> <span className={`${styles.navText} ${
                  isOpen ? styles.navTextOpen : styles.navTextClosed
                }`}>Historial</span>
              </Link>
            </li></div>
            <div className={`${styles.navContent} ${
                  isOpen ? styles.navContentOpen : styles.navContentClosed
                }`}>     
            <li
              className={
                location.pathname === "/settings" ? styles.activeNavItem : ""
              }
            >
              <Link to="/settings" className={styles.navLink}>
                <FaCog className={`${styles.Fa} ${
                  isOpen ? styles.FaOpen : styles.FaClosed
                }`}/> <span className={`${styles.navText} ${
                  isOpen ? styles.navTextOpen : styles.navTextClosed
                }`}>Ajustes</span>
              </Link>
            </li></div>
          </ul>
        </nav>

        <button className={`${styles.logout} ${
                  isOpen ? styles.logoutOpen : styles.logoutClosed
                }`}>
          <FaSignOutAlt className={`${styles.Fa} ${
                  isOpen ? styles.FaOpen : styles.FaClosed
                }`} style={{ marginRight: "8px" }} /> <span className={`${styles.navText} ${
                  isOpen ? styles.navTextOpen : styles.navTextClosed
                }`}>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
