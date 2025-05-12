import { useEffect, useState } from "react";
import styles from "../../styles/visits.module.css";
import { VisitResponse } from "../../types/visit.types";
import { getVisitsByResidentId } from "../../api/visit.api";

const StatCards = () => {
  
  const [visits, setVisits] = useState<VisitResponse[] | null>(null);
  const [pastVisits, setPastVisits] = useState<VisitResponse[] | null>(null);
  const [authorizations, setAuthorizations] = useState<VisitResponse[] |null>(null);
  const [actives, setActives] = useState<VisitResponse[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
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

      const getActives = async () => {
        setActives(visits?.filter(
          (visit) =>
            visit.authorization.state === "aprobada"
        ) as VisitResponse[]);
      };

      const getAuthorizations = async () => {
        setAuthorizations(visits?.filter(
          (visit) =>
            visit.authorization.state === "pendiente" ||
            visit.authorization.state === "aprobada"
        ) as VisitResponse[]);
      };

      const getPastVisits = async () => {
      setPastVisits(visits?.filter(
          (visit) =>
            visit.authorization.state === "finalizada" ||
            visit.authorization.state === "rechazada" ||
            visit.authorization.state === "expirada"
        ) as VisitResponse[]);
    };

      getVisits();
      getActives();
      getAuthorizations();
      getPastVisits();
    }, [visits]);

  const stats = [
    { label: "Autorizaciones", value: authorizations?.length },
    { label: "Visitas Registradas", value: pastVisits?.length },
    { label: "Visitas En Curso", value: actives?.length },
  ];

  return (
    <div className={styles.statGrid}>
      {stats.map((stat, i) => (
        <div key={i} className={styles.statCard}>
            {isLoading ? (
            <div className={styles.spinnerContainer}>
              <span className={styles.spinner}></span>
              <p>Cargando estadísticas...</p>
            </div>
            ) : (
              <div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default StatCards;
