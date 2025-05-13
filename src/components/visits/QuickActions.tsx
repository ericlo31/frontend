import { FaEdit, FaFileExport, FaClipboardList, FaCog } from "react-icons/fa";
import styles from "../../styles/visits.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { QuickActionsProps } from "../../types/types";

  const QuickActions = ({ user, openModal }: QuickActionsProps) => {
    
  const [isAdmin, setIsAdmin] = useState(false);

    useState( () => {
      if(user.role === 'admin') setIsAdmin(true);
    });

  return (
    <div className={styles.section}>
      <h3>Acciones Rápidas</h3>
      <div className={styles.actionsWrapper}>
        <Link to=""
          onClick={openModal} 
          className={styles.actionBtn}
        >
          <FaEdit className={styles.actionIcon} /> Crear Autorización
        </Link>
        <Link to="" className={styles.actionBtn}>
          <FaClipboardList className={styles.actionIcon} /> Historial de
          Visitas
        </Link>
        {isAdmin ? (
          <Link to="" className={styles.actionBtn}>
          <FaFileExport className={styles.actionIcon} /> Generar Reporte
        </Link>
        ) : (
          <Link to="" className={styles.actionBtn}>
          <FaCog className={styles.actionIcon} /> Ajustes de Usuario
        </Link>
        )}
        
      </div>
    </div>
  );
};

export default QuickActions;