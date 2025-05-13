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
import { setAuthToken } from "../../services/auth.service";
import { getAuthenticatedUser } from "../../api/auth.api";
import { useLocation, Navigate } from "react-router-dom";
import { User } from "../../types/user.types";

const Dashboard = () => {
  const location = useLocation();
  const { token, user: initialUser } = location.state || {};
  const [user, setUser] = useState<User | null>(initialUser || null);
  const { isOpen } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!token) return;

    const validateUser = async () => {
      try {
        setAuthToken(token);
        if (!initialUser) {
          const authenticatedUser = await getAuthenticatedUser();
          setUser(authenticatedUser);
        }
      } catch (error) {
        console.error("Error al validar el usuario autenticado", error);
      }
    };
    
    validateUser();
  }, [token, initialUser]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar />

      <div
        className={`${styles.mainContent} ${
          !isOpen ? styles.mainContentFull : ""
        }`}
      >
        <Header 
        user={user as User} />
        <StatCards />
        <QuickActions 
        user={user as User}
        openModal={() => setIsModalOpen(true)} />
        <VisitFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <AuthorizationsTable />
        <VisitHistory />
      </div>
    </div>
  );
};

export default Dashboard;