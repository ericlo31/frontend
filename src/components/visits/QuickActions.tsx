import { FaEdit, FaFileExport, FaClipboardList } from "react-icons/fa";
import styles from "../../styles/visits.module.css";
import { Link } from "react-router-dom";

interface QuickActionsProps {
  openModal: () => void;
}

const QuickActions = ({ openModal }: QuickActionsProps) => {
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
          <FaClipboardList className={styles.actionIcon} /> Ver el Historial de
          Visitas
        </Link>
        <Link to="" className={styles.actionBtn}>
          <FaFileExport className={styles.actionIcon} /> Exportar Reportes
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;