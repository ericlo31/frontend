import { IUser, UserRole } from './interfaces/IUser';

// Declaración de types para los tipos de respuesta y parámetros

// Tipo para opciones de select en formularios
export interface UserSelectOption {
  _id: string;       // _id del usuario
  label: string;       // Nombre para mostrar
  role?: UserRole;     // Rol opcional
  extraInfo?: string;  // Info adicional (ej: "Torre 1 - Apt 101")
}

// Tipo para respuesta API de usuarios
export interface ApiUserResponse {
  success: boolean;
  data?: IUser[];
  error?: string;
}

// Tipo para parámetros de búsqueda
export interface UserQueryParams {
  role?: UserRole;
  search?: string;
  includeInactive?: boolean;
}

// Tipo para formularios que usan selección de usuarios
export interface UserSelectionForm {
  userId: string;
  comment?: string;
}

export const transformUserToOption = (user: IUser): UserSelectOption => ({
    _id: user._id.toString(),
    label: user.nombre,
    role: user.role,
    extraInfo: user.role === UserRole.RESIDENTE 
      ? `Torre ${user.torre} - Apt ${user.apartamento}`
      : undefined
});