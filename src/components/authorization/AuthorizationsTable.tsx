import { getAuthenticatedUser } from "../../api/auth.api";
import { getVisitsByResidentId } from "../../api/visit.api";
import styles from "../../styles/visits.module.css";
import { FaEdit, FaQrcode, FaShare, FaTrash } from "react-icons/fa";
import { VisitResponse } from "../../types/visit.types";
import { useEffect, useState } from "react";
import QRModal from "./QRModal";

const AuthorizationsTable = () => {
  const [visits, setVisits] = useState<VisitResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQR, setSelectedQR] = useState<string | null>(null);

  useEffect(() => {
    const getVisits = async () => {
      try {
        //const logedUser = await getAuthenticatedUser();
        //setVisits(await getVisitsByResidentId(logedUser._id));
        setVisits(await getVisitsByResidentId("6820d5950387b07e020b4af5"));
        setIsLoading(false);
      } catch (error) {
          console.error(`Ocurrio un error al obtener visitas`, error);
      }
    };
    getVisits();
  }, []);

  const handleShowQR = (qrId: string) => {
    setSelectedQR(qrId);
  };

  const handleCloseQR = () => {
    setSelectedQR(null);
  };

  return (
    <div className={styles.section}>
      <h3>Autorizaciones Activas</h3>

      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <span className={styles.spinner}></span>
          <p>Cargando autorizaciones...</p>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th className={styles.hideableRow}>Documento</th>
              <th>Estado</th>
              <th className={styles.hideableRow}>Expira</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visits?.map((a, i) => (
              <tr key={i} className={styles.authRow}>
                <td>{a.visit.name}</td>
                <td className={styles.hideableRow}>{a.visit.document}</td>
                <td>
                  <span
                    className={`${styles.badge} ${
                      styles[a.authorization.state.toLowerCase()]
                    }`}
                  >{a.authorization.state.toUpperCase()}</span>
                </td>
                <td className={styles.hideableRow}>
                  {a.authorization.exp.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td>
                  <div className={styles.actionGroup}>
                    <button 
                      className={styles.authBtn} 
                      onClick={() => handleShowQR(a.qrId)}
                    >
                      <FaQrcode className={styles.actionAuthIcon} />
                    </button>
                    <button className={styles.authBtn}>
                      <FaShare className={styles.actionAuthIcon} />
                    </button>
                    <button className={styles.authBtn}>
                      <FaEdit className={styles.actionAuthIcon} />
                    </button>
                    <button className={styles.authBtn}>
                      <FaTrash className={styles.actionAuthIcon} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      <QRModal 
        isOpen={!!selectedQR} 
        qrId={selectedQR || ""} 
        onClose={handleCloseQR} 
      />
    </div>
  );
};

export default AuthorizationsTable;