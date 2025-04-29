import React from "react";
import styles from "./residente.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>Residente Dashboard</div>
      <div className={styles.userProfile}>
        <span>Eric Lorenzo</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="User Avatar"
          className={styles.avatar}
        />
      </div>
    </header>
  );
};

export default Header;
