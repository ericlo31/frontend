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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ReportPage = () => {
  const navigate = useNavigate();
  const { isOpen } = useSidebar();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [reportData, setReportData] = useState<ReportResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [exportType, setExportType] = useState<string | null>(null);
  const [exportLoading, setExportLoading] = useState(false);

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
  
  // Función para exportar a PDF
  const exportToPDF = async () => {
    if (!reportData) return;
    
    setExportLoading(true);
    
    try {
      const reportElement = document.getElementById('report-container');
      if (!reportElement) {
        console.error('Elemento de reporte no encontrado');
        return;
      }
      
      // Calculamos el tipo de reporte para el nombre del archivo
      let reportName = 'reporte_general';
      if (reportData.metadata.type === 'resident') reportName = 'reporte_residente';
      if (reportData.metadata.type === 'guard') reportName = 'reporte_guardia';
      
      // Creamos el nombre del archivo con fecha
      const startDate = new Date(reportData.metadata.startDate)
        .toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
        .replace(/\//g, '-');
      
      const filename = `${reportName}_${startDate}.pdf`;
      
      // Creamos el PDF con orientación horizontal
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      
      // Obtenemos la imagen del reporte
      const canvas = await html2canvas(reportElement, {
        scale: 2, // Mejor calidad
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Ajustamos la imagen al tamaño del PDF
      const imgWidth = 280; // Ancho A4 landscape
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Agregamos la imagen al PDF
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      
      // Si el contenido excede una página, añadimos más páginas
      let heightLeft = imgHeight;
      let position = 10;
      
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= 200; // Altura máxima de una página
      }
      
      // Guardamos el PDF
      pdf.save(filename);
      
    } catch (error) {
      console.error('Error al exportar a PDF:', error);
    } finally {
      setExportLoading(false);
      setExportType(null);
    }
  };
  
  // Función para exportar a CSV
  const exportToCSV = () => {
    if (!reportData) return;
    
    setExportLoading(true);
    
    try {
      // Calculamos el tipo de reporte para el nombre del archivo
      let reportName = 'reporte_general';
      if (reportData.metadata.type === 'resident') reportName = 'reporte_residente';
      if (reportData.metadata.type === 'guard') reportName = 'reporte_guardia';
      
      // Creamos el nombre del archivo con fecha
      const startDate = new Date(reportData.metadata.startDate)
        .toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
        .replace(/\//g, '-');
      
      const filename = `${reportName}_${startDate}.csv`;
      
      // Cabecera con metadatos
      let csvContent = 'Tipo de Reporte,Fecha Inicio,Fecha Fin\n';
      csvContent += `${reportData.metadata.type},${new Date(reportData.metadata.startDate).toLocaleDateString('es-ES')},${reportData.metadata.endDate ? new Date(reportData.metadata.endDate).toLocaleDateString('es-ES') : 'Actual'}\n\n`;
      
      // Añadir información del usuario si existe
      if (reportData.userInfo) {
        csvContent += 'INFORMACIÓN DE USUARIO\n';
        csvContent += `Nombre,${reportData.userInfo.name}\n`;
        if (reportData.userInfo.email) csvContent += `Email,${reportData.userInfo.email}\n`;
        if (reportData.userInfo.shift) csvContent += `Turno,${reportData.userInfo.shift}\n`;
        if (reportData.userInfo.apartment) csvContent += `Apartamento,${reportData.userInfo.apartment}\n`;
        if (reportData.userInfo.telephone) csvContent += `Teléfono,${reportData.userInfo.telephone}\n`;
        csvContent += '\n';
      }
      
      // Estadísticas
      csvContent += 'ESTADÍSTICAS\n';
      const stats = reportData.statistics;
      
      // Agregamos solo las estadísticas que existen
      if (stats.totalResidents !== undefined) csvContent += `Residentes Totales,${stats.totalResidents}\n`;
      if (stats.totalGuards !== undefined) csvContent += `Guardias Totales,${stats.totalGuards}\n`;
      if (stats.averageEntryHourGeneral) csvContent += `Hora Promedio de Entrada,${stats.averageEntryHourGeneral}\n`;
      if (stats.averageExitHourGeneral) csvContent += `Hora Promedio de Salida,${stats.averageExitHourGeneral}\n`;
      if (stats.mostFrequentEntryHour) csvContent += `Hora Más Frecuente de Entrada,${stats.mostFrequentEntryHour}\n`;
      if (stats.mostFrequentExitHour) csvContent += `Hora Más Frecuente de Salida,${stats.mostFrequentExitHour}\n`;
      if (stats.totalAuthorizations !== undefined) csvContent += `Autorizaciones Totales,${stats.totalAuthorizations}\n`;
      if (stats.invertalAuthorizations !== undefined) csvContent += `Autorizaciones en el Período,${stats.invertalAuthorizations}\n`;
      if (stats.averageVisitDuration) csvContent += `Duración Promedio de Visita,${stats.averageVisitDuration}\n`;
      if (stats.totalEntries !== undefined) csvContent += `Entradas Registradas,${stats.totalEntries}\n`;
      if (stats.intervalEntries !== undefined) csvContent += `Entradas en el Período,${stats.intervalEntries}\n`;
      if (stats.totalExits !== undefined) csvContent += `Salidas Registradas,${stats.totalExits}\n`;
      if (stats.intervalExits !== undefined) csvContent += `Salidas en el Período,${stats.intervalExits}\n`;
      csvContent += '\n';
      
      // Top Visitas
      csvContent += 'VISITAS MÁS FRECUENTES\n';
      csvContent += 'Nombre,Documento,Total Visitas\n';
      reportData.topRecords.topVisits.forEach(visit => {
        csvContent += `${visit.name},${visit.document},${visit.count}\n`;
      });
      csvContent += '\n';
      
      // Top Residentes (si existen)
      if (reportData.topRecords.topResidents) {
        csvContent += 'RESIDENTES MÁS ACTIVOS\n';
        csvContent += 'Nombre,Apartamento,Total Visitas\n';
        reportData.topRecords.topResidents.forEach(resident => {
          csvContent += `${resident.name},${resident.apartment},${resident.count}\n`;
        });
        csvContent += '\n';
      }
      
      // Top Guardias (si existen)
      if (reportData.topRecords.topGuards) {
        csvContent += 'GUARDIAS MÁS ACTIVOS\n';
        csvContent += 'Nombre,Total Registros\n';
        reportData.topRecords.topGuards.forEach(guard => {
          csvContent += `${guard.name},${guard.count}\n`;
        });
        csvContent += '\n';
      }
      
      // Guardia Más Activo (si existe)
      if (reportData.topRecords.mostActiveGuard) {
        csvContent += 'GUARDIA MÁS ACTIVO\n';
        csvContent += `Nombre,${reportData.topRecords.mostActiveGuard.name}\n`;
        csvContent += `Total Registros,${reportData.topRecords.mostActiveGuard.count}\n`;
        csvContent += '\n';
      }
      
      // Residente Más Activo (si existe)
      if (reportData.topRecords.mostActiveResident) {
        csvContent += 'RESIDENTE MÁS ACTIVO\n';
        csvContent += `Nombre,${reportData.topRecords.mostActiveResident.name}\n`;
        csvContent += `Apartamento,${reportData.topRecords.mostActiveResident.apartment}\n`;
        csvContent += `Total Visitas,${reportData.topRecords.mostActiveResident.count}\n`;
        csvContent += '\n';
      }
      
      // Crear el blob y descargar
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      // Para IE 10+ (necesitamos usar any para evitar errores de TypeScript)
      if (navigator && (navigator as any).msSaveBlob) {
        (navigator as any).msSaveBlob(blob, filename);
      } else {
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      
    } catch (error) {
      console.error('Error al exportar a CSV:', error);
    } finally {
      setExportLoading(false);
      setExportType(null);
    }
  };

  const handleExportReport = (type: string) => {
    setExportType(type);
    
    if (type === 'pdf') {
      exportToPDF();
    } else if (type === 'csv') {
      exportToCSV();
    }
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
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginBottom: "1rem" }}>
              <div className={styles.exportDropdown}>
                <button 
                  onClick={() => handleExportReport('pdf')}
                  className={styles.saveBtn}
                  disabled={exportLoading}
                >
                  {exportLoading && exportType === 'pdf' ? 'Exportando...' : 'Exportar a PDF'}
                </button>
                <button 
                  onClick={() => handleExportReport('csv')}
                  className={styles.saveBtn}
                  disabled={exportLoading}
                >
                  {exportLoading && exportType === 'csv' ? 'Exportando...' : 'Exportar a CSV'}
                </button>
              </div>
            </div>
            <div id="report-container">
              <ReportDisplay reportData={reportData} />
            </div>
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