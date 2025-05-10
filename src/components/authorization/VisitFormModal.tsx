import React, { useState } from "react";
import { authorizeVisit } from "../../api/visit.api";
import { transformFormtoVisitData } from "../../services/visit.service";
import { VisitData } from "../../types/visit.types";
import styles from '../../styles/visitForm.module.css';
import { VisitFormProps } from "../../types/types";

const VisitFormModal: React.FC<VisitFormProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    document: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (value === "" || /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(value))
      setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDocumentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (value === "" || /^[0-9]+$/.test(value))
      setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const visitData = await transformFormtoVisitData(
        formData.name,
        formData.document,
        formData.reason);
      
      await authorizeVisit(visitData as VisitData);
      setSuccess(true);
      setFormData({
        name: "",
        document: "",
        reason: "",
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar la entrada");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <button 
          className={styles.modalCloseBtn} 
          onClick={onClose}
          aria-label="Cerrar modal"
        >
          &times;
        </button>
        
        <div className={styles.visitFormModal}>
          <h2 className={styles.title}>Autorizar Visitante</h2> 
          {error && (
            <div className={`${styles.alert} ${styles.alertError}`}>
              <span className={styles.closeBtn} onClick={() => setError(null)}>
                &times;
              </span>
              {error}
            </div>
          )}

          {success && (
            <div className={`${styles.alert} ${styles.alertSuccess}`}>
              <span className={styles.closeBtn} onClick={() => setSuccess(false)}>
                &times;
              </span>
              ¡Entrada registrada exitosamente! QR generado.
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Nombre Visitante*:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                required
                placeholder="Nombre completo"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="document" className={styles.label}>Documento de Identidad*:</label>
              <input
                type="text"
                id="document"
                name="document"
                value={formData.document}
                onChange={handleDocumentChange}
                required
                placeholder="Número de documento"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="reason" className={styles.label}>Motivo de Visita*:</label>
              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                className={styles.select}
              >
                <option value="">Seleccione un motivo</option>
                <option value="Entrega">Entrega de paquete</option>
                <option value="Visita familiar">Visita familiar</option>
                <option value="Servicio técnico">Servicio técnico</option>
                <option value="Reunión">Reunión</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div className={styles.formActions}>
              <button 
                type="submit" 
                className={styles.submitBtn} 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className={styles.spinner}></span>
                    Procesando...
                  </>
                ) : (
                  "Autorizar Visita"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VisitFormModal;