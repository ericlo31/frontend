import React, { useEffect, useState } from "react";
import styles from "../../styles/visits.module.css";
import { User } from "../../types/user.types";
import { loadToken, setAuthToken } from "../../services/auth.service";
import { getAuthenticatedUser } from "../../api/auth.api";
import { FaUserCircle } from "react-icons/fa";

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const token = loadToken();
      setAuthToken(token);
      setUser(await getAuthenticatedUser());
      const user = await getAuthenticatedUser();
      if (user.role === "admin") setIsAdmin(true);
    };

    getUser();
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        {isAdmin ? "Dashboard Administrador" : "Dashboard"}
      </div>
      {user ? (
        <div className={styles.userProfile}>
          <span>Bienvenido, {user.name}</span>
          <FaUserCircle className={styles.avatar} size={40} />
        </div>
      ) : (
        <div className={styles.userProfile}>
          <span>Cargando usuario...</span>
        </div>
      )}
    </header>
  );
};

export default Header;
