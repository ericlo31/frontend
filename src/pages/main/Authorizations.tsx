import Sidebar from "../../components/visits/Sidebar";
import { useSidebar } from "../../contexts/SidebarContext";
import styles from "../../styles/visits.module.css";
import VisitFormCard from "../../components/authorization/VisitFormCard";
import AuthorizationsTable from "../../components/authorization/AuthorizationsTable";

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
        <VisitFormCard />
        <AuthorizationsTable />
      </div>
    </div>
  );
};

export default Authorizations;
