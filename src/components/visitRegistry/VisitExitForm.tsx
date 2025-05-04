import React, { useState, useEffect } from 'react';
import { registerVisitExit } from '../../services/visitServiceApi';
import { fetchUsersByRole } from '../../services/userServiceApi';
import { UserSelectOption, transformUserToOption } from '../../types';
import { UserRole } from '../../interfaces/IUser';

const VisitExitForm: React.FC = () => {
  const [qrId, setQrId] = useState('');
  const [formData, setFormData] = useState({
    motivo: '',
    guardia: ''
  });
  const [guards, setGuards] = useState<UserSelectOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchGuards = async () => {
      try {
        const guardsData = await fetchUsersByRole(UserRole.GUARDIA);
        setGuards(guardsData.map(transformUserToOption) || []);
        setOptionsLoading(false);
      } catch (err) {
        setError('Error cargando guardias');
        setOptionsLoading(false);
      }
    };

    fetchGuards();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      await registerVisitExit(qrId, formData);
      setSuccess(true);
      setQrId('');
      setFormData({
        motivo: '',
        guardia: ''
      });
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al registrar la salida');
    } finally {
      setLoading(false);
    }
  };

  if (optionsLoading) return <div>Cargando guardias...</div>;

  return (
    <div className="visit-form">
      <h2>Registrar Salida de Visitante</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">Salida registrada exitosamente!</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>QR ID*:</label>
          <input
            type="text"
            value={qrId}
            onChange={(e) => setQrId(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Guardia*:</label>
          <select
            name="guardia"
            value={formData.guardia}
            onChange={(e) => setFormData({...formData, guardia: e.target.value})}
            required
          >
            <option value="">Seleccionar guardia</option>
            {guards.map(guard => (
              <option key={guard._id} value={guard._id}>
                {guard.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Motivo de salida*:</label>
          <input
            type="text"
            name="motivo"
            value={formData.motivo}
            onChange={(e) => setFormData({...formData, motivo: e.target.value})}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar Salida'}
        </button>
      </form>
    </div>
  );
};

export default VisitExitForm;