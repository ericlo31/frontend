import { FaEdit, FaFileExport, FaClipboardList } from "react-icons/fa";
import styles from "../../styles/visits.module.css";
import { Link } from "react-router-dom";

const QuickActions = () => {
  return (
    <div className={styles.section}>
      <h3>Acciones Rápidas</h3>
      <div className={styles.actionsWrapper}>
        <Link to="/entry-form">
          <button className={styles.actionBtn}>
            <FaEdit className={styles.actionIcon} /> Crear Autorización
          </button>
        </Link>
        <button className={styles.actionBtn}>
          <FaClipboardList className={styles.actionIcon} /> Ver el Historial de
          Visitas
        </button>
        <button className={styles.actionBtn}>
          <FaFileExport className={styles.actionIcon} /> Exportar Reportes
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
