import { VisitResponse } from "./visit.types";

export interface SidebarProps {
  setShowLogoutModal?: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface VisitFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export interface QRModalProps {
  isOpen: boolean;
  visit: VisitResponse;
  onClose: () => void;
}
export interface LogoutModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}
export interface QuickActionsProps {
  openModal: () => void;
}