import React, { useEffect, useState } from "react";
import { updateVisit } from "../../api/visit.api";
import { UpdateVisitData, VisitResponse } from "../../types/visit.types";
import styles from "../../styles/visitForm.module.css";
import { loadToken, setAuthToken } from "../../services/auth.service";;

interface EditVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  visit: VisitResponse | null;
  onVisitUpdated: () => void;
}

const EditVisitModal: React.FC<EditVisitModalProps> = ({
  isOpen,
  onClose,
  visit,
  onVisitUpdated,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    document: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (visit) {
      setFormData({
        name: visit.visit.name,
        email: visit.visit.email,
        document: visit.visit.document,
        reason: visit.authorization.reason,
      });
    }
  }, [visit]);

  const validateFields = () => {
    let valid = true;
    setError(null);

    if (!formData.document.trim()) {
      setError("El documento de identidad es requerido");
      valid = false;
    } else if (formData.document.length !== 11) {
      setError("Documento de identidad inválido");
      valid = false;
    }

    if (!formData.email.trim()) {
      setError("El email es requerido");
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("El Email introducido no es válido");
      valid = false;
    }

    if (!formData.name.trim()) {
      setError("El nombre es requerido");
      valid = false;
    }

    return valid;
  };

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (value === "" || /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDocumentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (value === "" || /^[0-9]+$/.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields() || !visit) return;
    setLoading(true);
    setError(null);

    try {
      const token = loadToken();
      setAuthToken(token);;

      const visitData: UpdateVisitData= {
        visit: {
          name: formData.name,
          email: formData.email
        },
        authorization: {
          reason: formData.reason
        }
      };

      await updateVisit(visit.visit.document, visitData);
      setSuccess(true);
      onVisitUpdated();
    } catch (err: any) {
      setError(
        err.message ? err.message : "Ocurrió un error al actualizar la visita"
      );
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
          <h2 className={styles.title}>Editar Visitante</h2>

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
              <span
                className={styles.closeBtn}
                onClick={() => setSuccess(false)}
              >
                &times;
              </span>
              ¡Visita actualizada exitosamente!
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Nombre Visitante*:
              </label>
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
              <label htmlFor="email" className={styles.label}>
                Email Visitante*:
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="me@example.com"
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="document" className={styles.label}>
                Documento de Identidad*:
              </label>
              <input
                type="text"
                id="document"
                name="document"
                value={formData.document}
                onChange={handleDocumentChange}
                required
                placeholder="Número de documento"
                className={styles.input}
                disabled={true}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="reason" className={styles.label}>
                Motivo de Visita*:
              </label>
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
                <option value="Visita">Visita familiar</option>
                <option value="Servicio">Servicio técnico</option>
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
                    Actualizando...
                  </>
                ) : (
                  "Actualizar Visita"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditVisitModal;
