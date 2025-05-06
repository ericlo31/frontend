import axios from "axios";
// URL de la API en el Backend (Se inicializa en 5000 para no interferir con el frontend)
const API_BASE_URL = "http://localhost:5000/api";

interface UserData {
  nombre: string;
  email: string;
  password: string;
  role: string;
  apartamento?: string;
  torre?: string;
  imagenUrl: string;
}

interface LoginData {
  email: string;
  password: string;
}

// # API's de autenticación

// Registrar (SignUp) usuario en la api
export const registerUser = async (data: UserData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al registrar usuario`, error);
    throw error;
  }
};

// Autenticar (LogIn) un usuario en la api
export const loginUser = async (data: LoginData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al iniciar sesión`, error);
    throw error;
  }
};

// Hace una consulta sobre el token activo (Usuario autenticado)
export const fetchLogedUser = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log(`Se obtuvo el usuario`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching el usuario autenticado`, error);
    throw error;
  }
};

// # API's de usuarios

// Consultar usuarios por rol
export const fetchUsersByRole = async (role: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/role/${role}`);
    console.log(`Se obtuvieron los datos`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${role}s`, error);
    throw error;
  }
};

// Consultar usuarios con rol residente y que tenga un apartamento
export const fetchResidentsWithApartments = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/residents`);
    console.log(`Se obtuvieron los datos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching residents:", error);
    throw error;
  }
};
