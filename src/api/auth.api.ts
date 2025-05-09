import axios from "axios";
import { LoginData, LoginResponse, RegisterData } from "../types/auth.types";
import { User } from "../types/user.types";

const API_URL = "http://localhost:8000/api";

// Registrar (SignUp) usuario en la api
export const registerUser = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  } catch (error) {
    console.error(`Error al registrar usuario`, error);
    throw error;
  }
};

// Método puedes autenticarte en el backend y recibir un token + información del usuario
export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  try {
    const response = await axios.post<LoginResponse>(`${API_URL}/auth/login`, data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "Error al iniciar sesión");
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor");
    } else {
      throw new Error("Error al configurar la solicitud");
    }
  }
};

// Método para recibir el usuario autenticado mediante un token válido en el Header
export const getAuthenticatedUser = async (): Promise<User> => {
  try {
    // No necesitamos pasar el token manualmente porque setAuthToken lo configura en los headers
    const response = await axios.get<User>(`${API_URL}/auth/me`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error("Sesión expirada o no autorizada");
      }
      throw new Error(error.response.data.error || "Error al verificar usuario");
    } else if (error.request) {
      throw new Error("No se recibió respuesta del servidor");
    } else {
      throw new Error("Error al configurar la solicitud");
    }
  }
};