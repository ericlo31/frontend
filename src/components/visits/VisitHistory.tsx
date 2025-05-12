import { useEffect, useState } from "react";
import styles from "../../styles/visits.module.css";
import { VisitResponse } from "../../types/visit.types";
import { getVisitsByResidentId } from "../../api/visit.api";

const VisitHistory = () => {
  /*
  const visits = [
    { name: "Darwin Castillo", time: "Apr 21, 10:15 AM", status: "Completado" },
    { name: "Alexander Medina", time: "Apr 20, 3:35 PM", status: "Completado" },
  ];
  */

  const [visits, setVisits] = useState<VisitResponse[] | null>(null);
  const [pastVisits, setPastVisits] = useState<VisitResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getVisits = async () => {
      try {
        //const logedUser = await getAuthenticatedUser();
        //setVisits(await getVisitsByResidentId(logedUser._id));
        setVisits(await getVisitsByResidentId("6820d5950387b07e020b4af5"));
      } catch (error) {
        console.error(`Ocurrio un error al obtener visitas`, error);
      }
    };

    const validateVisits = async () => {
      setPastVisits(visits?.filter(
          (visit) =>
            visit.authorization.state === "finalizada" ||
            visit.authorization.state === "rechazada"
        ) as VisitResponse[]);
    };

    getVisits();
    validateVisits();
    setIsLoading(false);
  }, [visits]);

  return (
    <div className={styles.section}>
      <h3>Historial de Visitas</h3>
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <span className={styles.spinner}></span>
          <p>Cargando historial...</p>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Visitante</th>
              <th>Finalizacion</th>
              <th>Conclusión</th>
            </tr>
          </thead>
          <tbody>
            {pastVisits?.map((v, i) => (
              <tr key={i}>
                <td>{v.visit.name}</td>
                <td>
                  {v.registry?.exit?.date?.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VisitHistory;
