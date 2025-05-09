import React, { useState } from "react";
import EntryForm from "../components/visitRegistry/VisitEntryForm";
import Sidebar from "../components/visits/Sidebar";
import styles from "../styles/visits.module.css";

const Form = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div
        className={`${styles.mainContent} ${
          !isSidebarOpen ? styles.mainContentFull : ""
        }`}
      >
        <EntryForm />
      </div>
    </div>
  );
};

export default Form;
