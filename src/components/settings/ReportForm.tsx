import React, { useEffect, useState } from 'react';
import { ReportData } from '../../types/report.types';
import styles from '../../styles/report.module.css';
import { User } from '../../types/user.types';
import { getGuards, getResidents } from '../../api/user.api';

interface ReportFormProps {
  onSubmit: (data: ReportData) => void;
  loading: boolean;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmit, loading }) => {
  const [residents, setResidents] = useState<User[]>([]);
  const [guards, setGuards] = useState<User[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [residentId, setResidentId] = useState<string>('');
  const [guardId, setGuardId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [residentsData, guardsData] = await Promise.all([
          getResidents(),
          getGuards()
        ]);
        setResidents(residentsData);
        setGuards(guardsData);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error al cargar los datos. Por favor intente nuevamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (residentId && guardId) {
      setError('No se puede seleccionar residente y guardia a la vez');
      return;
    }

    if (!startDate) {
      setError('La fecha de inicio es requerida');
      return;
    }

    setError('');
    
    const reportData: ReportData = {
      start: new Date(startDate),
      end: endDate ? new Date(endDate) : undefined,
      resident: residentId || undefined,
      guard: guardId || undefined
    };

    onSubmit(reportData);
  };

  if (isLoading) {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
        <p>Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>Generar Reporte</h2>
      {error && <div className={styles.errorMessage}>{error}</div>}
      
      <form onSubmit={handleSubmit} className={styles.formGrid}>
        <div>
          <label className={styles.formLabel}>Fecha de Inicio*</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={styles.formInput}
            required
          />
        </div>
        
        <div>
          <label className={styles.formLabel}>Fecha de Fin (opcional)</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={styles.formInput}
            min={startDate}
          />
        </div>
        
        <div>
          <label className={styles.formLabel}>Residente (opcional)</label>
          <select
            value={residentId}
            onChange={(e) => {
              setResidentId(e.target.value);
              if (e.target.value) setGuardId('');
            }}
            className={styles.formInput}
          >
            <option value="">Seleccione un residente</option>
            {residents.map((resident) => (
              <option key={resident._id} value={resident._id}>
                {resident.name} {resident.apartment ? `(Apt ${resident.apartment})` : ''}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className={styles.formLabel}>Guardia (opcional)</label>
          <select
            value={guardId}
            onChange={(e) => {
              setGuardId(e.target.value);
              if (e.target.value) setResidentId('');
            }}
            className={styles.formInput}
          >
            <option value="">Seleccione un guardia</option>
            {guards.map((guard) => (
              <option key={guard._id} value={guard._id}>
                {guard.name} {guard.shift ? `(${guard.shift})` : ''}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? 'Generando...' : 'Generar Reporte'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;