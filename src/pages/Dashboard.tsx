import Sidebar from "../components/visits/Sidebar";
import Header from "../components/visits/Header";
import StatCards from "../components/visits/StatCards";
import QuickActions from "../components/visits/QuickActions";
import AuthorizationsTable from "../components/authorization/AuthorizationsTable";
import VisitHistory from "../components/visits/VisitHistory";
import styles from "../styles/visits.module.css";
import { useSidebar } from "../contexts/SidebarContext";
import { useState } from "react";
import VisitFormModal from "../components/authorization/VisitFormModal";

const Dashboard = () => {
  const { isOpen } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      
      <div
        className={`${styles.mainContent} ${
          !isOpen ? styles.mainContentFull : ""
        }`}
      >
        <Header />
        <StatCards />
        <QuickActions 
          openModal={() => setIsModalOpen(true)} 
        />
        <VisitFormModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
        <AuthorizationsTable />
        <VisitHistory />
      </div>
    </div>
    
  );
};

export default Dashboard;