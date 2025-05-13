import VisitHistory from "../../components/visits/VisitHistory";
import Sidebar from "../../components/visits/Sidebar";
import styles from "../../styles/visits.module.css";
import { useSidebar } from "../../contexts/SidebarContext";

const History = () => {
  const { isOpen } = useSidebar();

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div
        className={`${styles.mainContent} ${
          !isOpen ? styles.mainContentFull : ""
        }`}
      >
        <VisitHistory />
      </div>
    </div>
  );
};

export default History;
