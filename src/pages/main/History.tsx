import VisitHistory from "../../components/visits/VisitHistory";
import Sidebar from "../../components/visits/Sidebar";
import styles from "../../styles/visits.module.css";
import { useSidebar } from "../../contexts/SidebarContext";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  delRememberMe,
  delToken,
  loadToken,
  setAuthToken,
} from "../../services/auth.service";
import { LogoutModal } from "../../components/login/LogoutModal";
import { getAuthenticatedUser } from "../../api/auth.api";

const History: React.FC = () => {
  const { isOpen } = useSidebar();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const validateUser = async () => {
      const token = loadToken();
      setAuthToken(token);
      const user = await getAuthenticatedUser();

      if (!token || !user) {
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
      <Sidebar setShowLogoutModal={setShowLogoutModal}/>
      <div
        className={`${styles.mainContent} ${
          !isOpen ? styles.mainContentFull : ""
        }`}
      >
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

export default History;
