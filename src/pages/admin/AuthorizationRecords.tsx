import React from "react";
import styles from "../../styles/visits.module.css";
import AllAuthorizations from "../../components/admin/AllAuthorizations";

const AuthorizationRecords = () => {
  return (
    <div className={styles.section}>
      <h2>Todas las Autorizaciones</h2>
      <AllAuthorizations />
    </div>
  );
};

export default AuthorizationRecords;
