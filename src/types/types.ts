import { User } from "./user.types";

export interface VisitFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface QRModalProps {
  isOpen: boolean;
  qrId: string;
  onClose: () => void;
}

export interface HeaderProps {
  user: User;
}

export interface QuickActionsProps {
  user: User;
  openModal: () => void;
}