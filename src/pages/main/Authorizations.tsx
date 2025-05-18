import Sidebar from "../../components/visits/Sidebar";
import { useSidebar } from "../../contexts/SidebarContext";
import styles from "../../styles/visits.module.css";
import VisitFormCard from "../../components/authorization/VisitFormCard";
import AuthorizationsTable from "../../components/authorization/AuthorizationsTable";
import React, { useEffect, useState } from "react";
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

const Authorizations: React.FC = () => {
  const { isOpen } = useSidebar();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const validateUser = async () => {
      try {
        const token = loadToken();
        setAuthToken(token);
        setUser(await getAuthenticatedUser());
      } catch (error) {
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

  return (user &&
    <div className={styles.dashboardContainer}>
      <Sidebar setShowLogoutModal={setShowLogoutModal}/>
      <div
        className={`${styles.mainContent} ${
          !isOpen ? styles.mainContentFull : ""
        }`}
      >
        <VisitFormCard />
        <AuthorizationsTable />
      </div>
      <LogoutModal
        visible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Authorizations;
