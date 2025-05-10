import VisitForm from "../components/authorization/VisitForm";
import ActiveAuthorizations from "../components/authorization/ActiveAuthorizations";
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
        <VisitForm />
        <ActiveAuthorizations />
      </div>
    </div>
  );
};

export default Authorizations;
