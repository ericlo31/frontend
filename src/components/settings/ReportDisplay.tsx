import { ReportResponse } from "../../types/report.types";
import styles from "../../styles/report.module.css";

interface ReportDisplayProps {
  reportData: ReportResponse;
}

const ReportDisplay = ({ reportData }: ReportDisplayProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  return (
    <div className={styles.reportContainer}>
      {/* Encabezado del Reporte */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {reportData.metadata.type === "general" && "Reporte General de Visitas"}
          {reportData.metadata.type === "resident" && "Reporte de Residentes"}
          {reportData.metadata.type === "guard" && "Reporte de Guardias"}
        </h2>
        <p className={styles.dateRange}>
          Período: {formatDate(reportData.metadata.startDate)} -{" "}
          {reportData.metadata.endDate 
            ? formatDate(reportData.metadata.endDate) 
            : "Actual"}
        </p>

        {reportData.userInfo && (
          <div className={styles.userInfoContainer}>
            <h3 className={styles.userInfoTitle}>Información del Usuario</h3>
            <div className={styles.userInfoGrid}>
              <div>
                <span className={styles.userInfoLabel}>Nombre:</span>
                <span>{reportData.userInfo.name}</span>
              </div>
              {reportData.userInfo.email && (
                <div>
                  <span className={styles.userInfoLabel}>Email:</span>
                  <span>{reportData.userInfo.email}</span>
                </div>
              )}
              {reportData.userInfo.shift && (
                <div>
                  <span className={styles.userInfoLabel}>Turno:</span>
                  <span>{reportData.userInfo.shift}</span>
                </div>
              )}
              {reportData.userInfo.apartment && (
                <div>
                  <span className={styles.userInfoLabel}>Apartamento:</span>
                  <span>{reportData.userInfo.apartment}</span>
                </div>
              )}
              {reportData.userInfo.telephone && (
                <div>
                  <span className={styles.userInfoLabel}>Teléfono:</span>
                  <span>{reportData.userInfo.telephone}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Estadísticas */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Estadísticas</h3>
        <div className={styles.statsGrid}>
          {/* Estadísticas Generales */}
          {reportData.statistics.totalResidents !== undefined && (
            <div className={styles.statCard}>
              <p className={styles.statValue}>{reportData.statistics.totalResidents}</p>
              <p className={styles.statLabel}>Residentes Totales</p>
            </div>
          )}

          {reportData.statistics.totalGuards !== undefined && (
            <div className={styles.statCard}>
              <p className={styles.statValue}>{reportData.statistics.totalGuards}</p>
              <p className={styles.statLabel}>Guardias Totales</p>
            </div>
          )}

          {reportData.statistics.averageEntryHourGeneral && (
            <div className={styles.statCard}>
              <p className={styles.statValue}>
                {(reportData.statistics.averageEntryHourGeneral)}
              </p>
              <p className={styles.statLabel}>Hora Promedio de Entrada</p>
            </div>
          )}

          {reportData.statistics.averageExitHourGeneral && (
            <div className={styles.statCard}>
              <p className={styles.statValue}>
                {(reportData.statistics.averageExitHourGeneral)}
              </p>
              <p className={styles.statLabel}>Hora Promedio de Salida</p>
            </div>
          )}

          {/* Estadísticas para Residentes/Guardias */}
          {reportData.statistics.mostFrequentEntryHour && (
            <div className={styles.statCard}>
              <p className={styles.statValue}>
                {(reportData.statistics.mostFrequentEntryHour)}
              </p>
              <p className={styles.statLabel}>Hora Más Frecuente de Entrada</p>
            </div>
          )}

          {reportData.statistics.mostFrequentExitHour && (
            <div className={styles.statCard}>
              <p className={styles.statValue}>
                {(reportData.statistics.mostFrequentExitHour)}
              </p>
              <p className={styles.statLabel}>Hora Más Frecuente de Salida</p>
            </div>
          )}

          {/* Estadísticas Específicas de Residentes */}
          {reportData.statistics.totalAuthorizations !== undefined && (
            <div className={styles.statCard}>
              <p className={styles.statValue}>{reportData.statistics.totalAuthorizations}</p>
              <p className={styles.statLabel}>Autorizaciones Totales</p>
            </div>
          )}

          {reportData.statistics.invertalAuthorizations !== undefined && (
            <div className={styles.statCard}>
              <p className={styles.statValue}>{reportData.statistics.invertalAuthorizations}</p>
              <p className={styles.statLabel}>Autorizaciones en el Período</p>
            </div>
          )}

          {reportData.statistics.averageVisitDuration && (
            <div className={styles.statCard}>
              <p className={styles.statValue}>{reportData.statistics.averageVisitDuration}</p>
              <p className={styles.statLabel}>Duración Promedio de Visita</p>
            </div>
          )}

          {/* Estadísticas Específicas de Guardias */}
          {reportData.statistics.totalEntries !== undefined && (
            <div className={styles.statCard}>
              <p className={styles.statValue}>{reportData.statistics.totalEntries}</p>
              <p className={styles.statLabel}>Entradas Registradas</p>
            </div>
          )}

          {reportData.statistics.intervalEntries !== undefined && (
            <div className={styles.statCard}>
              <p className={styles.statValue}>{reportData.statistics.intervalEntries}</p>
              <p className={styles.statLabel}>Entradas en el Período</p>
            </div>
          )}

          {reportData.statistics.totalExits !== undefined && (
            <div className={styles.statCard}>
              <p className={styles.statValue}>{reportData.statistics.totalExits}</p>
              <p className={styles.statLabel}>Salidas Registradas</p>
            </div>
          )}

          {reportData.statistics.intervalExits !== undefined && (
            <div className={styles.statCard}>
              <p className={styles.statValue}>{reportData.statistics.intervalExits}</p>
              <p className={styles.statLabel}>Salidas en el Período</p>
            </div>
          )}
        </div>
      </div>

      {/* Registros Destacados */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Registros Destacados</h3>
        
        {/* Visitas Más Frecuentes */}
        <div className={styles.tableSection}>
          <h4 className={styles.subsectionTitle}>Visitas Más Frecuentes</h4>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Documento</th>
                  <th>Total Visitas</th>
                </tr>
              </thead>
              <tbody>
                {reportData.topRecords.topVisits.map((visit, index) => (
                  <tr key={index}>
                    <td>{visit.name}</td>
                    <td>{visit.document}</td>
                    <td>{visit.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Residentes Más Activos (solo en reporte general) */}
        {reportData.topRecords.topResidents && (
          <div className={styles.tableSection}>
            <h4 className={styles.subsectionTitle}>Residentes Más Activos</h4>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apartamento</th>
                    <th>Total Visitas</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.topRecords.topResidents.map((resident, index) => (
                    <tr key={index}>
                      <td>{resident.name}</td>
                      <td>{resident.apartment}</td>
                      <td>{resident.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Guardias Más Activos (solo en reporte general) */}
        {reportData.topRecords.topGuards && (
          <div className={styles.tableSection}>
            <h4 className={styles.subsectionTitle}>Guardias Más Activos</h4>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Total Registros</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.topRecords.topGuards.map((guard, index) => (
                    <tr key={index}>
                      <td>{guard.name}</td>
                      <td>{guard.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Guardia Más Activo (solo en reporte de residente) */}
        {reportData.topRecords.mostActiveGuard && (
          <div className={styles.highlightSection}>
            <h4 className={styles.subsectionTitle}>Guardia Más Activo</h4>
            <div className={styles.highlightCard}>
              <div>
                <p className={styles.highlightLabel}>Nombre</p>
                <p className={styles.highlightValue}>{reportData.topRecords.mostActiveGuard.name}</p>
              </div>
              <div>
                <p className={styles.highlightLabel}>Total Registros</p>
                <p className={styles.highlightValue}>{reportData.topRecords.mostActiveGuard.count}</p>
              </div>
            </div>
          </div>
        )}

        {/* Residente Más Activo (solo en reporte de guardia) */}
        {reportData.topRecords.mostActiveResident && (
          <div className={styles.highlightSection}>
            <h4 className={styles.subsectionTitle}>Residente Más Activo</h4>
            <div className={styles.highlightCard}>
              <div>
                <p className={styles.highlightLabel}>Nombre</p>
                <p className={styles.highlightValue}>{reportData.topRecords.mostActiveResident.name}</p>
              </div>
              <div>
                <p className={styles.highlightLabel}>Apartamento</p>
                <p className={styles.highlightValue}>{reportData.topRecords.mostActiveResident.apartment}</p>
              </div>
              <div>
                <p className={styles.highlightLabel}>Total Visitas</p>
                <p className={styles.highlightValue}>{reportData.topRecords.mostActiveResident.count}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportDisplay;