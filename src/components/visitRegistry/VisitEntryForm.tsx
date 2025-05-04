import React, { useState, useEffect } from "react";
import { registerVisitEntry } from "../../services/visitServiceApi";
import {
  fetchResidentsWithApartments,
  fetchUsersByRole,
} from "../../services/userServiceApi";
import { UserSelectOption, transformUserToOption } from "../../types";
import { UserRole } from "../../interfaces/IUser";

const VisitEntryForm: React.FC = () => {
  const [formData, setFormData] = useState({
    residente: "",
    guardia: "",
    nombreVisitante: "",
    documentoVisitante: "",
    motivo: "",
    imagenUrl: "",
  });
  const [guards, setGuards] = useState<UserSelectOption[]>([]);
  const [residents, setResidents] = useState<UserSelectOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [residentsData, guardsData] = await Promise.all([
          fetchResidentsWithApartments(),
          fetchUsersByRole(UserRole.GUARDIA),
        ]);

        setResidents(residentsData.map(transformUserToOption) || []);
        setGuards(guardsData.map(transformUserToOption) || []);
        setOptionsLoading(false);
      } catch (err: any) {
        console.log(err);
        setError("Error cargando las opciones: ");
        setOptionsLoading(false);
      }
    };

    fetchOptions();
  }, []);

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
      await registerVisitEntry(formData);
      setSuccess(true);
      setFormData({
        residente: "",
        guardia: "",
        nombreVisitante: "",
        documentoVisitante: "",
        motivo: "",
        imagenUrl: "",
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al registrar la entrada");
    } finally {
      setLoading(false);
    }
  };

  if (optionsLoading) return <div>Cargando opciones...</div>;

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
          <label>Residente*:</label>
          <select
            name="residente"
            value={formData.residente}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar residente</option>
            {residents.map((resident) => (
              <option key={resident._id} value={resident._id}>
                {resident.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Guardia*:</label>
          <select
            name="guardia"
            value={formData.guardia}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar guardia</option>
            {guards.map((guard) => (
              <option key={guard._id} value={guard._id}>
                {guard.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="nombreVisitante">Nombre Visitante*:</label>
          <input
            type="text"
            id="nombreVisitante"
            name="nombreVisitante"
            value={formData.nombreVisitante}
            onChange={handleChange}
            required
            placeholder="Nombre completo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="documentoVisitante">Documento de Identidad*:</label>
          <input
            type="text"
            id="documentoVisitante"
            name="documentoVisitante"
            value={formData.documentoVisitante}
            onChange={handleChange}
            required
            placeholder="Número de documento"
          />
        </div>

        <div className="form-group">
          <label htmlFor="motivo">Motivo de Visita*:</label>
          <select
            id="motivo"
            name="motivo"
            value={formData.motivo}
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

        <div className="form-group">
          <label htmlFor="imagenUrl">URL de Imagen*:</label>
          <input
            type="text"
            id="imagenUrl"
            name="imagenUrl"
            value={formData.imagenUrl}
            onChange={handleChange}
            required
            placeholder="https://ejemplo.com/foto.jpg"
          />
          <small>
            Subir previamente la imagen a un servicio como Cloudinary
          </small>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Procesando...
              </>
            ) : (
              "Registrar Entrada"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VisitEntryForm;
