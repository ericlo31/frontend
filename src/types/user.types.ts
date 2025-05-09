// Interface con tipo de response de usuario /api
export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    apartment?: string;
    tel?: string;
    shift?: string;
    registerDate: string;
}

// Tipo para opciones de select en formularios
export interface UserSelectOption {
  _id: string;       // _id del usuario
  label: string;       // Nombre para mostrar
  role?: string;     // Rol opcional
  extraInfo?: string;  // Info adicional (ej: "Torre 1 - Apt 101")
}

// Tipo para respuesta API de usuarios
export interface ApiUserResponse {
  success: boolean;
  data?: User[];
  error?: string;
}

// Tipo para parámetros de búsqueda
export interface UserQueryParams {
  role?: string;
  search?: string;
  includeInactive?: boolean;
}

// Tipo para formularios que usan selección de usuarios
export interface UserSelectionForm {
  userId: string;
  comment?: string;
}