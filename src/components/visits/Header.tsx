import React from "react";
import styles from "../../styles/visits.module.css";
import { HeaderProps } from "../../types/types";

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>Dashboard</div>
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