import { useEffect, useState } from "react";
import QRCode from "qrcode";
import styles from "../../styles/visits.module.css";
import { FaTimes } from "react-icons/fa";
import { QRModalProps } from "../../types/types";

const QRModal: React.FC<QRModalProps> = ({ isOpen, qrId, onClose }) => {
  const [qr, setQr] = useState("");

  useEffect(() => {
    const generateQr = async (qrId: string) => {
      try {
        if (!qrId) {
          throw new Error("qrId Inválido");
        }
        const qrCode = await QRCode.toDataURL(qrId);
        setQr(qrCode);
      } catch (error: any) {
        console.error(error);
      }
    };

    if (qrId && isOpen) {
      generateQr(qrId);
    }
  }, [qrId, isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.qrModal}>
        <button className={styles.closeButton} onClick={onClose}>
          <FaTimes />
        </button>
        <h3 className={styles.qrModalTitle}>Código QR de Visita</h3>
        {qr ? (
          <div className={styles.qrContainer}>
            <img src={qr} alt="QR Code" />
            <p className={styles.qrId}>{qrId}</p>
          </div>
        ) : (
          <p>Generando código QR...</p>
        )}
      </div>
    </div>
  );
}

export default QRModal;