import { User } from "./user.types";

// Interface con tipo de request para /api/auth/login
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
    role: 'residente' | 'guardia' | 'admin';
    apartment?: string;
    tel?: string;
    shift?: 'matutina' | 'vespertina' | 'nocturna';
}

// Interface con tipo responde de /api/auth/login
export interface LoginResponse {
  token: string;
  user: User
  expiresIn: number;
}
