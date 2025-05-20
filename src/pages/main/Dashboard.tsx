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
import { User } from "../../types/user.types";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { isOpen } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const validateUser = async () => {
      try {
        const token = loadToken();
        setAuthToken(token);
        setUser(await getAuthenticatedUser());
        if (user?.role === "admin") setIsAdmin(true);
      } catch (error) {
        navigate("/");
      }
    };

    validateUser();
  }, [navigate, user?.role]);

  const handleLogout = () => {
    navigate("/");
    delToken();
    delRememberMe();
    setShowLogoutModal(false);
  };

  return (user &&
    <div className={styles.dashboardContainer}>
      <Sidebar setShowLogoutModal={setShowLogoutModal} />

      <div
        className={`${styles.mainContent} ${
          !isOpen ? styles.mainContentFull : ""
        }`}
      >
        <Header />
        <StatCards />
        <QuickActions openModal={() => setIsModalOpen(true)} />

        {isAdmin && <AllAuthorizations />}

        <VisitFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        {!isAdmin && <AuthorizationsTable />}
        {!isAdmin && <VisitHistory />}
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
