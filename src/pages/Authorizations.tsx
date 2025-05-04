import React from "react";
import ActiveAuthorizations from "../components/residente/ActiveAuthorizations";
import styles from "../components/styles/residente.module.css";

const Authorizations = () => {
  return (
    <div className={styles.section}>
      <h2>Current Authorizations</h2>
      <ActiveAuthorizations />
    </div>
  );
};

export default Authorizations;
