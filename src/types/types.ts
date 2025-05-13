export interface SidebarProps {
  setShowLogoutModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface VisitFormCardProps {
  token: string;
}
export interface VisitFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  token: string;
}
export interface QRModalProps {
  isOpen: boolean;
  qrId: string;
  onClose: () => void;
}

export interface LogoutModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}


export interface HeaderProps {
  token: string;
}

export interface AuthorizationsTableProps {
  token: string;
}

export interface VisitHistoryProps {
  token: string;
}

export interface StatCardsProps {
  token: string;
}

export interface QuickActionsProps {
  token: string;
  openModal: () => void;
}