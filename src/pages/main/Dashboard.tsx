import Sidebar from "../../components/visits/Sidebar";
import Header from "../../components/visits/Header";
import StatCards from "../../components/visits/StatCards";
import QuickActions from "../../components/visits/QuickActions";
import AuthorizationsTable from "../../components/authorization/AuthorizationsTable";
import VisitHistory from "../../components/visits/VisitHistory";
import styles from "../../styles/visits.module.css";
import { useSidebar } from "../../contexts/SidebarContext";
import { useEffect, useState } from "react";
import VisitFormModal from "../../components/authorization/VisitFormModal";
import AllAuthorizations from "../../components/visits/VisitTable";
import {
  delRememberMe,
  delToken,
  loadToken,
  setAuthToken,
} from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { LogoutModal } from "../../components/login/LogoutModal";
import { getAuthenticatedUser } from "../../api/auth.api";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { isOpen } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const validateUser = async () => {
      const token = loadToken();
      setAuthToken(token);
      const user = await getAuthenticatedUser();
      if (user?.role === "admin") setIsAdmin(true);

      if (!token) {
        navigate("/");
      }
    };

    validateUser();
  }, [navigate]);

  const handleLogout = () => {
    navigate("/");
    delToken();
    delRememberMe();
    setShowLogoutModal(false);
  };

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar setShowLogoutModal={setShowLogoutModal} />

      <div
        className={`${styles.mainContent} ${
          !isOpen ? styles.mainContentFull : ""
        }`}
      >
        <Header />
        <StatCards />
        <QuickActions
          openModal={() => setIsModalOpen(true)}
        />

        {isAdmin && <AllAuthorizations />}

        <VisitFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <AuthorizationsTable />
        <VisitHistory />
      </div>

      <LogoutModal
        visible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Dashboard;
