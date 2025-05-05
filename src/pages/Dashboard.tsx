import Sidebar from "../components/visits/Sidebar";
import Header from "../components/visits/Header";
import StatCards from "../components/visits/StatCards";
import QuickActions from "../components/visits/QuickAction";
import Authorizations from "../components/visits/ActiveAuthorizations";
import History from "../components/visits/VisitHistory";
import styles from "../styles/visits.module.css";

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
