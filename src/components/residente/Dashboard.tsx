import Sidebar from "./sidebar";
import Header from "./header";
import StatCards from "./statCards";
import QuickActions from "./QuickAction";
import Authorizations from "./activeAuthorizations";
import History from "./visitHistory";
import styles from "./residente.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header />
        <StatCards />
        <QuickActions />
        <Authorizations />
        <History />
      </div>
    </div>
  );
};

export default Dashboard;
