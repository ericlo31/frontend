import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../styles/visits.module.css"; // Or your preferred module
import { getAuthToken } from "../../services/auth.service";

interface Authorization {
  id: string;
  visitorName: string;
  residentName: string;
  createdAt: string;
  status: string;
}

const AllAuthorizations = () => {
  const [authorizations, setAuthorizations] = useState<Authorization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthorizations = async () => {
      try {
        const token = getAuthToken();
        const response = await axios.get("/api/authorizations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAuthorizations(response.data);
      } catch (err) {
        setError("Error al obtener las autorizaciones.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorizations();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.section}>
      <h3>Todas las Autorizaciones</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Visitante</th>
            <th>Residente</th>
            <th>Fecha</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {authorizations.map((a) => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.visitorName}</td>
              <td>{a.residentName}</td>
              <td>{new Date(a.createdAt).toLocaleString()}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllAuthorizations;
