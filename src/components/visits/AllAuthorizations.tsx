import { useEffect, useState } from "react";
import styles from "../../styles/visits.module.css";
import Sidebar from "../../components/visits/Sidebar";
import { useSidebar } from "../../contexts/SidebarContext";
import {
  delRememberMe,
  delToken,
  loadToken,
  setAuthToken,
} from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaQrcode, FaShare, FaTrash } from "react-icons/fa";
import { LogoutModal } from "../../components/login/LogoutModal";
import { getAuthenticatedUser } from "../../api/auth.api";
import { VisitResponse } from "../../types/visit.types";
import { getAllVisits } from "../../api/visit.api";
import QRModal from "../authorization/QRModal";

const AllAuthorizations = () => {
  const [visits, setVisits] = useState<VisitResponse[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [selectedQR, setSelectedQR] = useState<string | null>(null);
  const { isOpen } = useSidebar();
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const token = loadToken();
      if (!token) return navigate("/");

      setAuthToken(token);
      const user = await getAuthenticatedUser();
      if (user?.role !== "admin") return navigate("/");

      setIsAdmin(true);
      const all = await getAllVisits();
      setVisits(all);
    };

    init();
  }, [navigate]);

  const handleLogout = () => {
    delToken();
    delRememberMe();
    setShowLogoutModal(false);
    navigate("/");
  };

  const handleShowQR = (qrId: string) => setSelectedQR(qrId);
  const handleCloseQR = () => setSelectedQR(null);

  if (!isAdmin) return null;

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar setShowLogoutModal={setShowLogoutModal} />

      <div
        className={`${styles.mainContent} ${
          !isOpen ? styles.mainContentFull : ""
        }`}
      >
        <div className={styles.section}>
          <h3>Todas las Autorizaciones</h3>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Visitante</th>
                <th>Documento</th>
                <th>Residente</th>
                <th>Estado</th>
                <th>Expira</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {visits.map((v, i) => (
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
                  <td>
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
                  <td>
                    <div className={styles.actionGroup}>
                      <button
                        className={styles.authBtn}
                        onClick={() => handleShowQR(v.qrId)}
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

          <QRModal
            isOpen={!!selectedQR}
            qrId={selectedQR || ""}
            onClose={handleCloseQR}
          />
        </div>
      </div>

      <LogoutModal
        visible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default AllAuthorizations;
