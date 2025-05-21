import { useEffect, useState } from "react";
import styles from "../../styles/visits.module.css";
import { VisitResponse } from "../../types/visit.types";
import { getAllVisits } from "../../api/visit.api";
import { useNavigate } from "react-router-dom";
import QRModal from "../../components/authorization/QRModal";
import { loadToken, setAuthToken } from "../../services/auth.service";
import { getAuthenticatedUser } from "../../api/auth.api";

const VisitTable = () => {
  const [visits, setVisits] = useState<VisitResponse[]>([]);
  const [filteredVisits, setFilteredVisits] = useState<VisitResponse[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedVisit, setSelectedVisit] = useState<VisitResponse | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const token = loadToken();
      if (!token) return navigate("/");
      setAuthToken(token);
      const user = await getAuthenticatedUser();
      if (user?.role !== "admin") return navigate("/");

      const all = await getAllVisits();
      setVisits(all);
      setFilteredVisits(all);
    };

    init();
  }, [navigate]);

  useEffect(() => {
    let filtered = [...visits];
    if (search) {
      filtered = filtered.filter(
        (v) =>
          v.visit.name.toLowerCase().includes(search.toLowerCase()) ||
          v.authorization.resident.name
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }
    if (statusFilter) {
      filtered = filtered.filter(
        (v) =>
          v.authorization.state.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    setFilteredVisits(filtered);
  }, [search, statusFilter, visits]);

  const handleSort = () => {
    const sorted = [...filteredVisits].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortAsc ? dateA - dateB : dateB - dateA;
    });
    setFilteredVisits(sorted);
    setSortAsc(!sortAsc);
  };

  const exportToCSV = () => {
    const header = ["Visitante", "Documento", "Residente", "Estado", "Expira"];
    const rows = filteredVisits.map((v) => [
      v.visit.name,
      v.visit.document,
      v.authorization.resident.name,
      v.authorization.state,
      v.authorization.exp?.toLocaleDateString("es-ES") || "",
    ]);
    const csv = [header, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "autorizaciones.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.section}>
      <h3>Todas las Autorizaciones</h3>
      <div className={styles.filterBar}>
        <input
          type="text"
          placeholder="Buscar por visitante o residente"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option value="">Todos</option>
          <option value="aprobada">Aprobada</option>
          <option value="pendiente">Pendiente</option>
          <option value="rechazada">Rechazada</option>
          <option value="finalizada">Finalizada</option>
        </select>
        <button onClick={handleSort}>Ordenar por Fecha</button>
        <button onClick={exportToCSV}>Exportar CSV</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Visitante</th>
            <th>Documento</th>
            <th>Residente</th>
            <th>Estado</th>
            <th className={styles.hideableRow}>Expira</th>
          </tr>
        </thead>
        <tbody>
          {filteredVisits.map((v, i) => (
            <tr key={i} className={styles.authRow}>
              <td>{v.visit.name}</td>
              <td>{v.visit.document}</td>
              <td>{v.authorization.resident.name}</td>
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
                  ? new Date(v.authorization.exp).toLocaleDateString("es-ES")
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedVisit && (
        <QRModal
          isOpen={!!selectedVisit}
          visit={selectedVisit}
          onClose={() => setSelectedVisit(null)}
        />
      )}
    </div>
  );
};

export default VisitTable;
