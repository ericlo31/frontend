import styles from "../../styles/visits.module.css";
import {
  FaHome,
  FaUserShield,
  FaHistory,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  return (
    <aside
      className={`${styles.sidebar} ${
        isOpen ? styles.sidebarOpen : styles.sidebarClosed
      }`}
    >
      <div className={styles.topBar}>
        <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
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
        className={`${styles.navArea} ${
          isOpen ? styles.navAreaOpen : styles.navAreaClosed
        }`}
      >
        <nav className={styles.nav}>
          <ul>
            <div
              className={`${styles.navContent} ${
                isOpen ? styles.navContentOpen : styles.navContentClosed
              }`}
            >
              <li
                className={
                  location.pathname === "/"
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
                <Link
                  to="/"
                  className={`${styles.navLink} ${
                    isOpen ? styles.navLinkOpen : styles.navLinkClosed
                  }`}
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
                </Link>
              </li>
            </div>
            <div
              className={`${styles.navContent} ${
                isOpen ? styles.navContentOpen : styles.navContentClosed
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
                <Link
                  to="/authorizations"
                  className={`${styles.navLink} ${
                    isOpen ? styles.navLinkOpen : styles.navLinkClosed
                  }`}
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
                </Link>
              </li>
            </div>
            <div
              className={`${styles.navContent} ${
                isOpen ? styles.navContentOpen : styles.navContentClosed
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
                <Link
                  to="/visit-history"
                  className={`${styles.navLink} ${
                    isOpen ? styles.navLinkOpen : styles.navLinkClosed
                  }`}
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
                </Link>
              </li>
            </div>
            <div
              className={`${styles.navContent} ${
                isOpen ? styles.navContentOpen : styles.navContentClosed
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
                <Link
                  to="/settings"
                  className={`${styles.navLink} ${
                    isOpen ? styles.navLinkOpen : styles.navLinkClosed
                  }`}
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
                </Link>
              </li>
            </div>
          </ul>
        </nav>

        <button
          className={`${styles.logout} ${
            isOpen ? styles.logoutOpen : styles.logoutClosed
          }`}
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
    </aside>
  );
};

export default Sidebar;
