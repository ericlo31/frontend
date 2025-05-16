// LogoutModal.tsx
import React from "react";
import styles from "../../styles/logoutModal.module.css";
import { LogoutModalProps } from "../../types/types";

export const LogoutModal: React.FC<LogoutModalProps> = ({ 
  visible, 
  onCancel, 
  onConfirm 
}) => {
  if (!visible) return null;

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.modalTitle}>Cerrar sesión</h3>
        <p className={styles.modalText}>
          ¿Estás seguro de que quieres salir de la aplicación?
        </p>

        <div className={styles.buttonsContainer}>
          <button
            className={`${styles.button} ${styles.cancelButton}`}
            onClick={onCancel}
            aria-label="Cancelar"
          >
            Cancelar
          </button>

          <button
            className={`${styles.button} ${styles.confirmButton}`}
            onClick={onConfirm}
            aria-label="Cerrar Sesión"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};