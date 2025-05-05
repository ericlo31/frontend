import ActiveAuthorizations from "../components/visits/ActiveAuthorizations";
import styles from "../styles/visits.module.css";

const Authorizations = () => {
  return (
    <div className={styles.section}>
      <h2>Current Authorizations</h2>
      <ActiveAuthorizations />
    </div>
  );
};

export default Authorizations;
