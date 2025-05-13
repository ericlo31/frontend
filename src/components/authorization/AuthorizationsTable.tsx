import { getVisitsByResidentId } from "../../api/visit.api";
import styles from "../../styles/visits.module.css";
import { FaEdit, FaQrcode, FaShare, FaTrash } from "react-icons/fa";
import { VisitResponse } from "../../types/visit.types";
import React, { useEffect, useState } from "react";
import QRModal from "./QRModal";
import { AuthorizationsTableProps } from "../../types/types";
import { setAuthToken } from "../../services/auth.service";
import { getAuthenticatedUser } from "../../api/auth.api";

const AuthorizationsTable: React.FC<AuthorizationsTableProps> = ( {token} ) => {
  const [visits, setVisits] = useState<VisitResponse[] | null>(null);
  const [authorizations, setAuthorizations] = useState<VisitResponse[] |null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQR, setSelectedQR] = useState<string | null>(null);

  useEffect(() => {
    const getVisits = async () => {
            try {
              setAuthToken(token);
              const user = await getAuthenticatedUser();
              setVisits(await getVisitsByResidentId(user._id));
              setIsLoading(false);
            } catch (error) {
              console.error(`Ocurrio un error al obtener visitas`, error);
            }
          };

    const getAuthorizations = async () => {
        setAuthorizations(visits?.filter(
          (visit) =>
            visit.authorization.state === "pendiente" ||
            visit.authorization.state === "aprobada"
        ) as VisitResponse[]);
      };

    getVisits();
    getAuthorizations();
  },[token, visits]);

  const handleShowQR = (qrId: string) => {
    setSelectedQR(qrId);
  };

  const handleCloseQR = () => {
    setSelectedQR(null);
  };

  return (
    <div className={styles.section}>
      <h3>Mis Autorizaciones</h3>

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
            {authorizations?.map((a, i) => (
              <tr key={i} className={styles.authRow}>
                <td>{a.visit.name}</td>
                <td className={styles.hideableRow}>{a.visit.document}</td>
                <td>
                  <span
                    className={`${styles.badge} ${
                      styles[a.authorization.state.toLowerCase()]
                    }`}
                  >
                    {a.authorization.state.toUpperCase()}
                  </span>
                </td>
                <td className={styles.hideableRow}>
                  {a.authorization.exp instanceof Date
                    ? a.authorization.exp.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : " "}
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
