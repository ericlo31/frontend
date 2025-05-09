import { User, UserSelectOption } from "../types/user.types";

export const transformUserToOption = (user: User): UserSelectOption => ({
    _id: user._id.toString(),
    label: user.name,
    role: user.role,
    extraInfo: (user.role === 'residente' 
      ? `Apartamento ${user.apartment}`
      : undefined) || (user.role === 'guardia' ? `Turno ${user.shift}` : undefined)
});