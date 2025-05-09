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
    role: string;
    apartment?: string;
    tel?: string;
    shift?: string;
}

// Interface con tipo responde de /api/auth/login
export interface LoginResponse {
  token: string;
  user: User
  expiresIn: number;
}
