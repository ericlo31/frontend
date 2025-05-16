import { useEffect, useState } from "react";
import styles from "../../styles/visits.module.css";
import { VisitResponse } from "../../types/visit.types";
import { getAllVisits } from "../../api/visit.api";

const VisitTable = () => {
  const [visits, setVisits] = useState<VisitResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getVisits = async () => {
      try {
        const all = await getAllVisits();
        setVisits(all);
        setIsLoading(false);
      } catch (error) {
        console.error("Ocurrió un error al obtener las visitas: ", error);
      }
    };

    getVisits();
  }, []);

  return (
    <div className={styles.section}>
      <h3>Lista de Visitas</h3>
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <span className={styles.spinner}></span>
          <p>Cargando autorizaciones...</p>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Visitante</th>
              <th>Documento</th>
              <th className={styles.hideableRow}>Residente</th>
              <th>Estado</th>
              <th className={styles.hideableRow}>Expira</th>
            </tr>
          </thead>
          <tbody>
            {visits.map((v, i) => (
              <tr key={i} className={styles.authRow}>
                <td>{v.visit.name}</td>
                <td>{v.visit.document}</td>
                <td className={styles.hideableRow}>
                  {v.authorization.resident.name}
                </td>
                <td>
                  <span
                    className={`${styles.badge} ${
                      styles[v.authorization.state.toLowerCase()]
                    }`}
                  >
                    {v.authorization.state.toUpperCase()}
                  </span>
                </td>
                <td className={styles.hideableRow}>
                  {v.authorization.exp
                    ? new Date(v.authorization.exp).toLocaleDateString(
                        "es-ES",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VisitTable;
