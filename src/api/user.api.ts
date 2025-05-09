import axios from "axios";
// URL de la API en el Backend (Se inicializa en 8000 para no interferir con el frontend)
const API_URL = "http://localhost:8000/api";

// Consultar de los usuarios con rol de 'guardia'
export const getGuards = async () => {
  try {
    const response = await axios.get(`${API_URL}/guards`);
    console.log(`Se obtuvieron los datos`);
    return response.data;
  } catch (error) {
    console.error(`Error obteniendo los datos de guardias`, error);
    throw error;
  }
};

// Consulta de los usuarios con rol de 'residente'
export const getResidents = async () => {
  try {
    const response = await axios.get(`${API_URL}/residents`);
    console.log(`Se obtuvieron los datos`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo los datos de residentes:", error);
    throw error;
  }
};
