export interface VisitFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface QRModalProps {
  isOpen: boolean;
  qrId: string;
  onClose: () => void;
}