import React from "react";
import ActiveAuthorizations from "../components/residente/activeAuthorizations";
import styles from "../components/residente/residente.module.css";

const Authorizations = () => {
  return (
    <div className={styles.section}>
      <h2>Current Authorizations</h2>
      <ActiveAuthorizations />
    </div>
  );
};

export default Authorizations;
