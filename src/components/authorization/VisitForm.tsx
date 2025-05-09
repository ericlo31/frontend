import React, { useState } from "react";
import { authorizeVisit } from "../../api/visit.api";
import { transformFormtoVisitData } from "../../services/visit.service";
import { VisitData } from "../../types/visit.types";

const VisitEntryForm: React.FC = () => {
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

  return (
    <div className="visit-form">
      <h2>Registrar Entrada de Visitante</h2>
      {error && (
        <div className="alert alert-error">
          <span className="close-btn" onClick={() => setError(null)}>
            &times;
          </span>
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <span className="close-btn" onClick={() => setSuccess(false)}>
            &times;
          </span>
          ¡Entrada registrada exitosamente! QR generado.
        </div>
      )}

      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label htmlFor="name">Nombre Visitante*:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleNameChange}
            required
            placeholder="Nombre completo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="document">Documento de Identidad*:</label>
          <input
            type="text"
            id="document"
            name="document"
            value={formData.document}
            onChange={handleDocumentChange}
            required
            placeholder="Número de documento"
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason">Motivo de Visita*:</label>
          <select
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un motivo</option>
            <option value="Entrega">Entrega de paquete</option>
            <option value="Visita familiar">Visita familiar</option>
            <option value="Servicio técnico">Servicio técnico</option>
            <option value="Reunión">Reunión</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Procesando...
              </>
            ) : (
              "Autorizar Visita"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisitEntryForm;
