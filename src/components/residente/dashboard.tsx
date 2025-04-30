import Sidebar from "./Sidebar";
import Header from "./Header";
import StatCards from "./StatCards";
import QuickActions from "./QuickActions";
import Authorizations from "./ActiveAuthorizations";
import History from "./VisitHistory";
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
