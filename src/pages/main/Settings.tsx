import React, { useEffect, useState } from "react";
import Sidebar from "../../components/visits/Sidebar";
import styles from "../../styles/visits.module.css";
import { useSidebar } from "../../contexts/SidebarContext";
import { useNavigate } from "react-router-dom";
import {
  delRememberMe,
  delToken,
  loadToken,
  setAuthToken,
  getAuthToken,
} from "../../services/auth.service";
import { LogoutModal } from "../../components/login/LogoutModal";
import Profile from "../../components/settings/Profile";
import { getAuthenticatedUser } from "../../api/auth.api";
import RegisterForm from "../../components/settings/RegisterForm";
import { User } from "../../types/user.types";
import Header from "../../components/visits/Header";

const Settings: React.FC = () => {
  const { isOpen } = useSidebar();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

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

  return (
    user && (
      <div className={styles.dashboardContainer}>
        <Sidebar setShowLogoutModal={setShowLogoutModal} />
        <div
          className={`${styles.mainContent} ${
            !isOpen ? styles.mainContentFull : ""
          }`}
        >
          <Header />
          <Profile token={getAuthToken()} />
          {isAdmin && <RegisterForm />}
        </div>
        <LogoutModal
          visible={showLogoutModal}
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      </div>
    )
  );
};

export default Settings;
