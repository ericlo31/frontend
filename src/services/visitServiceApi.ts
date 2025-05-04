import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // API URL

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

export const registerVisitEntry = async (data: VisitEntryData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/visit/entrada`, data);
    return response.data;
  } catch (error) {
    console.error('Error registrando entrada:', error);
    throw error;
  }
};

export const registerVisitExit = async (qrId: string, data: VisitExitData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/visit/salida/${qrId}`, data);
    return response.data;
  } catch (error) {
    console.error('Error registrando salida:', error);
    throw error;
  }
};

export const getVisitByQrId = async (qrId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/visit/${qrId}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo visita:', error);
    throw error;
  }
};