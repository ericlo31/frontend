import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

/* 
Esta interface es la data que se le debe suministrar al backend para
registar una entrada. Como lo mostrado usando Postman.
*/
interface VisitEntryData {
  residente: string;
  guardia: string;
  nombreVisitante: string;
  documentoVisitante: string;
  motivo: string;
  imagenUrl: string;
}
/*
Esta interface es la data que se le debe suministrar al backend para
registrar una salida. Como lo mostrado en Postman.
(Tambien se suministra el qrId via query)
*/
interface VisitExitData {
  motivo: string;
  guardia: string;
}

interface reportQuery {
  Fdesde: string;
  Fhasta: string;
  Nresidente: string;
  Pvehiculo: string;
  Vestado: string;
  guardiaId: string;
}

// Registrar entrada de visita
export const registerVisitEntry = async (data: VisitEntryData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/visits/entry`, data);
    return response.data;
  } catch (error) {
    console.error("Error registrando entrada:", error);
    throw error;
  }
};

// Registar salida de visita
export const registerVisitExit = async (qrId: string, data: VisitExitData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/visits/exit/${qrId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error registrando salida:", error);
    throw error;
  }
};

export const updateVisit = async (id: string, data: Partial<VisitEntryData>) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/visits/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar la visita:", error);
    throw error;
  }
};

export const updateVisitStatus = async (id: string, status: string) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/visits/${id}/status/?estado=${status}`);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el estado de la visita:", error);
    throw error;
  }
};

export const deleteVisit = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/visits/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar la visita:", error);
    throw error;
  }
};


// Hace una consulta de todas las visitas registradas
export const getAllVisits = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/visits/`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo visitas:", error);
    throw error;
  }
};


// Consulta una visita por su id
export const getVisitById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/visits/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo visita:", error);
    throw error;
  }
};

// Consulta una visita por su qrId
export const getVisitByQrId = async (qrId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/visits/qr/${qrId}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo visita:", error);
    throw error;
  }
};

// Consulta todas las visitas asignadas a un id de residente
export const getVisitsByResidentId = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/visits/resident/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo visitas:", error);
    throw error;
  }
};

// Consulta todas las visitas registradas por id de guardia
export const getVisitsByGuardId = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/visits/guard/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo visitas:", error);
    throw error;
  }
};


// Genera un reporte de visitas (admin)
export const generateVisitReport = async (query: reportQuery) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/visits/report?
      Fdesde=${query.Fdesde}&
      Fhasta=${query.Fhasta}&
      Nresidente=${query.Nresidente}&
      Pvehiculo=${query.Pvehiculo}&
      Vestado=${query.Vestado}&
      guardiaId=${query.guardiaId}`);
    return response.data;
  } catch (error) {
    console.error("Error generando el reporte de visitas:", error);
    throw error;
  }
};
