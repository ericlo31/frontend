import { FaEdit, FaFileExport, FaClipboardList, FaCog } from "react-icons/fa";
import styles from "../../styles/visits.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { QuickActionsProps } from "../../types/types";
import { loadToken, setAuthToken } from "../../services/auth.service";
import { getAuthenticatedUser } from "../../api/auth.api";

const QuickActions = ({ openModal }: QuickActionsProps) => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = loadToken();
      setAuthToken(token);
      const user = await getAuthenticatedUser();
      if (user.role === "admin") setIsAdmin(true);
    };
    checkAdmin();
  }, []);

  return (
    <div className={styles.section}>
      <h3>Acciones Rápidas</h3>
      <div className={styles.actionsWrapper}>
        <Link to="" onClick={openModal} className={styles.actionBtn}>
          <FaEdit className={styles.actionIcon} /> Crear Autorización
        </Link>
        <Link to="/visit-history" className={styles.actionBtn}>
          <FaClipboardList className={styles.actionIcon} /> Historial de Visitas
        </Link>
        {isAdmin ? (
          <Link to="/admin/report" className={styles.actionBtn}>
            <FaFileExport className={styles.actionIcon} /> Generar Reporte
          </Link>
        ) : (
          <Link to="/settings" className={styles.actionBtn}>
            <FaCog className={styles.actionIcon} /> Ajustes de Usuario
          </Link>
        )}
      </div>
    </div>
  );
};

export default QuickActions;
