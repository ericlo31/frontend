import React, { useState } from "react";
import VisitHistory from "../components/visits/VisitHistory";
import Sidebar from "../components/visits/Sidebar";
import styles from "../styles/visits.module.css";

const History = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={`${styles.mainContent} ${
          !isSidebarOpen ? styles.mainContentFull : ""
        }`}
      >
        <VisitHistory />
      </div>
    </div>
  );
};

export default History;
