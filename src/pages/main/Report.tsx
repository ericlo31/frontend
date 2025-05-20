import { useEffect, useState } from "react";
import { useSidebar } from "../../contexts/SidebarContext";
import Sidebar from "../../components/visits/Sidebar";
import Header from "../../components/visits/Header";
import ReportForm from "../../components/settings/ReportForm";
import ReportDisplay from "../../components/settings/ReportDisplay";
import styles from "../../styles/visits.module.css";
import {
  delRememberMe,
  delToken,
  loadToken,
  setAuthToken,
} from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { LogoutModal } from "../../components/login/LogoutModal";
import { getAuthenticatedUser } from "../../api/auth.api";
import { User } from "../../types/user.types";
import { ReportData, ReportResponse } from "../../types/report.types";
import { getReport } from "../../api/visit.api";

const ReportPage = () => {
  const navigate = useNavigate();
  const { isOpen } = useSidebar();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [reportData, setReportData] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);

  // Validar usuario autenticado
  useEffect(() => {
    const validateUser = async () => {
      try {
        const token = loadToken();
        setAuthToken(token);
        setUser(await getAuthenticatedUser());
      } catch (error) {
        navigate("/");
      }
    };

    validateUser();
  }, [navigate]);

  const handleGenerateReport = async (data: ReportData) => {
    setLoading(true);
    setShowReport(false);
    
    try {
      const report = await getReport(data);
      setReportData(report);
      setShowReport(true);
    } catch (error) {
      console.error("Error al generar reporte: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportReport = () => {
    // Eric coloca la lógica de exportación en este handler
    console.log("Exportando reporte: ", reportData);
  };

  const handleLogout = () => {
    navigate("/");
    delToken();
    delRememberMe();
    setShowLogoutModal(false);
  };

  if (!user) return null;

  return (
    <div className={styles.dashboardContainer}>
      <Sidebar setShowLogoutModal={setShowLogoutModal} />

      <div
        className={`${styles.mainContent} ${
          !isOpen ? styles.mainContentFull : ""
        }`}
      >
        <Header />
        
        <div className={styles.section}>
          <h3>Generar Reporte</h3>
          <ReportForm onSubmit={handleGenerateReport} loading={loading} />
        </div>

        {showReport && reportData && (
          <div className={styles.section}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
              <button 
                onClick={handleExportReport}
                className={styles.saveBtn}
              >
                Exportar Reporte
              </button>
            </div>
            <ReportDisplay reportData={reportData} />
          </div>
        )}
      </div>

      <LogoutModal
        visible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default ReportPage;