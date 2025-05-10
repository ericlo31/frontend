import ActiveAuthorizations from "../components/visits/ActiveAuthorizations";
import Sidebar from "../components/visits/Sidebar";
import { useSidebar } from "../contexts/SidebarContext";
import styles from "../styles/visits.module.css";

const Authorizations = () => {
  const { isOpen } = useSidebar();

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div
        className={`${styles.mainContent} ${
          !isOpen ? styles.mainContentFull : ""
        }`}
      >
        <ActiveAuthorizations />
      </div>
    </div>
  );
};

export default Authorizations;
