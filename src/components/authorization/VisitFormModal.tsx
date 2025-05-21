import React, { useEffect, useState } from "react";
import VisitFormContent from "./VisitFormContent";
import {
  authorizeVisit,
  getLastVisitsByResidentId,
  sendVisitNotificationEmail,
} from "../../api/visit.api";
import { transformFormtoVisitData } from "../../services/visit.service";
import { VisitData, VisitResponse } from "../../types/visit.types";
import { VisitFormModalProps } from "../../types/types";
import styles from "../../styles/visitForm.module.css";
import { loadToken, setAuthToken } from "../../services/auth.service";
import { getAuthenticatedUser } from "../../api/auth.api";

const VisitFormModal: React.FC<VisitFormModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    document: "",
    reason: "",
  });
  const [lastVisits, setLastVisits] = useState<VisitResponse[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const getLastVisits = async () => {
      setAuthToken(loadToken());
      try {
        const user = await getAuthenticatedUser();
        setLastVisits(await getLastVisitsByResidentId(user._id));
      } catch (error) {}
    };
    getLastVisits();
  }, []);

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

  const handleLastVisitChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const selectedIndex = Number(e.target.value);
    if (lastVisits && !isNaN(selectedIndex) && selectedIndex >= 0) {
      const selectedVisit = lastVisits[selectedIndex];
      setFormData({
        name: selectedVisit.visit.name,
        email: selectedVisit.visit.email,
        document: selectedVisit.visit.document,
        reason: selectedVisit.authorization.reason,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        document: "",
        reason: "",
      });
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
    if (!validateFields()) return;
    setLoading(true);
    setError(null);

    const token = loadToken();
    setAuthToken(token);
    const user = await getAuthenticatedUser();

    try {
      const visitData = await transformFormtoVisitData(
        formData.name,
        formData.email,
        formData.document,
        user._id,
        formData.reason
      );

      const visit = await authorizeVisit(visitData as VisitData);
      await sendVisitNotificationEmail(visit.data.id);
      setSuccess(true);
      setFormData({ name: "", email: "", document: "", reason: "" });
    } catch (err: any) {
      setError(
        err.message ? err.message : "Ocurrió un error al autorizar el visitante"
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
          <VisitFormContent
            formData={formData}
            onChange={handleChange}
            onNameChange={handleNameChange}
            onDocumentChange={handleDocumentChange}
            onLastVisitChange={handleLastVisitChange}
            onSubmit={handleSubmit}
            error={error}
            success={success}
            loading={loading}
            lastVisits={lastVisits}
            resetError={() => setError(null)}
            resetSuccess={() => setSuccess(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default VisitFormModal;
