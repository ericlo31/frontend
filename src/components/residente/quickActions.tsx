import { FaEdit, FaFileExport, FaClipboardList } from "react-icons/fa";
import styles from "./residente.module.css";

const QuickActions = () => {
  return (
    <div className={styles.section}>
      <h3>Acciones Rápidas</h3>
      <div className={styles.actionsWrapper}>
        <button className={styles.actionBtn}>
          <FaEdit className={styles.actionIcon} /> Crear Autorización
        </button>
        <button className={styles.actionBtn}>
          <FaClipboardList className={styles.actionIcon} /> Ver Historial de
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
