import React, { useState } from "react";
import VisitFormContent from "./VisitFormContent";
import { authorizeVisit } from "../../api/visit.api";
import { transformFormtoVisitData } from "../../services/visit.service";
import { VisitData } from "../../types/visit.types";
import styles from "../../styles/visitForm.module.css";

const VisitFormCard: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    document: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (value === "" || /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (value === "" || /^[0-9]+$/.test(value)) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;
    setLoading(true);
    setError(null);

    try {
      const visitData = await transformFormtoVisitData(
        formData.name,
        formData.email,
        formData.document,
        formData.reason
      );

      await authorizeVisit(visitData as VisitData);
      setSuccess(true);
      setFormData({ name: "", email: "", document: "", reason: "" });
    } catch (err: any) {
      setError(err.message ? err.message : "Ocurrió un error al autorizar el visitante");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.visitForm}>
      <VisitFormContent
        formData={formData}
        onChange={handleChange}
        onNameChange={handleNameChange}
        onDocumentChange={handleDocumentChange}
        onSubmit={handleSubmit}
        error={error}
        success={success}
        loading={loading}
        resetError={() => setError(null)}
        resetSuccess={() => setSuccess(false)}
      />
    </div>
  );
};

export default VisitFormCard;
