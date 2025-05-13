import React, { useEffect, useState } from "react";
import styles from "../../styles/visits.module.css";
import { HeaderProps } from "../../types/types";
import { User } from "../../types/user.types";
import { setAuthToken } from "../../services/auth.service";
import { getAuthenticatedUser } from "../../api/auth.api";

const Header: React.FC<HeaderProps> = ({ token }) => {
const [user, setUser] = useState<User | null>(null);
const [isAdmin, setIsAdmin] = useState(false);

  useEffect( () => {
    const getUser = async () => {
      setAuthToken(token);
      setUser(await getAuthenticatedUser());
       const user = await getAuthenticatedUser();
      if (user.role === "admin") setIsAdmin(true);
    }

    getUser();
  },[token]);

  return (
    <header className={styles.header}>
      <div className={styles.title}>{isAdmin? "Dashboard Administrador" : "Dashboard"}</div>
      {user ? (
        <div className={styles.userProfile}>
          <span>Bienvenido, {user.name}</span>
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className={styles.avatar}
          />
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