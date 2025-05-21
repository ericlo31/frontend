import styles from "../../styles/visits.module.css";
import {
  FaHome,
  FaUserShield,
  FaHistory,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSidebar } from "../../contexts/SidebarContext";
import { SidebarProps } from "../../types/types";
import { useState } from "react";
import { LogoutModal } from "../login/LogoutModal";
import { delToken } from "../../services/auth.service";
import ThemeToggle from "../../contexts/ThemeToggle";

const Sidebar: React.FC<SidebarProps> = ({ setShowLogoutModal }) => {
  const { isOpen, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();

  const [localShowLogout, setLocalShowLogout] = useState(false);
  const actualSetShowLogout = setShowLogoutModal || setLocalShowLogout;

  const handleLogout = () => {
    navigate("/");
    delToken();
    actualSetShowLogout(false);
  };

  return (
    <aside
      className={`${styles.sidebar} ${
        isOpen ? styles.sidebarOpen : styles.sidebarClosed
      }`}
    >
      <div className={styles.topBar}>
        <button className={styles.hamburger} onClick={toggleSidebar}>
          ☰
        </button>

        <div
          className={`${styles.logo} ${
            isOpen ? styles.logoOpen : styles.logoClosed
          }`}
        >
          SecurePass
        </div>
      </div>
      <div
        className={`${styles.themeBar} ${
          isOpen ? styles.themeBarOpen : styles.themeBarClosed
        }`}
      >
        <ThemeToggle />
        <span
          className={`${styles.themeText} ${
            isOpen ? styles.themeTextOpen : styles.themeTextClosed
          }`}
        >
          Light / Dark
        </span>
      </div>
      <div
        className={`${styles.navArea} ${
          isOpen ? styles.navAreaOpen : styles.navAreaClosed
        }`}
      >
        <nav className={styles.nav}>
          <ul>
            <Link
              to="/home"
              className={`${styles.navLink} ${
                isOpen ? styles.navLinkOpen : styles.navLinkClosed
              }`}
            >
              <li
                className={
                  location.pathname === "/home"
                    ? `${styles.activeNavItem} ${
                        isOpen
                          ? styles.activeNavItemOpen
                          : styles.activeNavItemClosed
                      }`
                    : `${styles.navItem} ${
                        isOpen ? styles.navItemOpen : styles.navItemClosed
                      }`
                }
              >
                <FaHome
                  className={`${styles.Fa} ${
                    isOpen ? styles.FaOpen : styles.FaClosed
                  }`}
                />{" "}
                <span
                  className={`${styles.navText} ${
                    isOpen ? styles.navTextOpen : styles.navTextClosed
                  }`}
                >
                  Dashboard
                </span>
              </li>
            </Link>
            <Link
              to="/authorizations"
              className={`${styles.navLink} ${
                isOpen ? styles.navLinkOpen : styles.navLinkClosed
              }`}
            >
              <li
                className={
                  location.pathname === "/authorizations"
                    ? `${styles.activeNavItem} ${
                        isOpen
                          ? styles.activeNavItemOpen
                          : styles.activeNavItemClosed
                      }`
                    : `${styles.navItem} ${
                        isOpen ? styles.navItemOpen : styles.navItemClosed
                      }`
                }
              >
                <FaUserShield
                  className={`${styles.Fa} ${
                    isOpen ? styles.FaOpen : styles.FaClosed
                  }`}
                />{" "}
                <span
                  className={`${styles.navText} ${
                    isOpen ? styles.navTextOpen : styles.navTextClosed
                  }`}
                >
                  Autorización
                </span>
              </li>
            </Link>
            <Link
              to="/visit-history"
              className={`${styles.navLink} ${
                isOpen ? styles.navLinkOpen : styles.navLinkClosed
              }`}
            >
              <li
                className={
                  location.pathname === "/visit-history"
                    ? `${styles.activeNavItem} ${
                        isOpen
                          ? styles.activeNavItemOpen
                          : styles.activeNavItemClosed
                      }`
                    : `${styles.navItem} ${
                        isOpen ? styles.navItemOpen : styles.navItemClosed
                      }`
                }
              >
                <FaHistory
                  className={`${styles.Fa} ${
                    isOpen ? styles.FaOpen : styles.FaClosed
                  }`}
                />{" "}
                <span
                  className={`${styles.navText} ${
                    isOpen ? styles.navTextOpen : styles.navTextClosed
                  }`}
                >
                  Historial
                </span>
              </li>
            </Link>
            <Link
              to="/settings"
              className={`${styles.navLink} ${
                isOpen ? styles.navLinkOpen : styles.navLinkClosed
              }`}
            >
              <li
                className={
                  location.pathname === "/settings"
                    ? `${styles.activeNavItem} ${
                        isOpen
                          ? styles.activeNavItemOpen
                          : styles.activeNavItemClosed
                      }`
                    : `${styles.navItem} ${
                        isOpen ? styles.navItemOpen : styles.navItemClosed
                      }`
                }
              >
                <FaCog
                  className={`${styles.Fa} ${
                    isOpen ? styles.FaOpen : styles.FaClosed
                  }`}
                />{" "}
                <span
                  className={`${styles.navText} ${
                    isOpen ? styles.navTextOpen : styles.navTextClosed
                  }`}
                >
                  Ajustes
                </span>
              </li>
            </Link>
          </ul>
        </nav>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        ></div>

        <button
          className={`${styles.logout} ${
            isOpen ? styles.logoutOpen : styles.logoutClosed
          }`}
          onClick={() => actualSetShowLogout(true)}
        >
          <FaSignOutAlt
            className={`${styles.Fa} ${
              isOpen ? styles.FaOpen : styles.FaClosed
            }`}
            style={{ marginRight: "8px" }}
          />{" "}
          <span
            className={`${styles.navText} ${
              isOpen ? styles.navTextOpen : styles.navTextClosed
            }`}
          >
            Logout
          </span>
        </button>
      </div>
      {!setShowLogoutModal && (
        <LogoutModal
          visible={localShowLogout}
          onCancel={() => setLocalShowLogout(false)}
          onConfirm={() => {
            handleLogout();
          }}
        />
      )}
    </aside>
  );
};

export default Sidebar;
