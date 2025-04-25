import React from "react";
import styles from "./residente.module.css";

const QuickActions = () => {
  return (
    <div className={styles.actionsWrapper}>
      <button className={styles.actionBtn}>+ New Authorization</button>
      <button className={styles.actionBtn}>Schedule Visit</button>
      <button className={styles.actionBtn}>View Passes</button>
    </div>
  );
};

export default QuickActions;
