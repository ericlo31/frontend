import { useEffect, useState, forwardRef } from "react";
import QRCode from "qrcode";
import styles from "../../styles/visits.module.css";
import { FaTimes, FaShare } from "react-icons/fa";
import { QRModalProps } from "../../types/types";
import { VisitResponse } from "../../types/visit.types";
import { toPng } from "html-to-image";

const QRModal = forwardRef<HTMLDivElement, QRModalProps>(
  ({ isOpen, visit, onClose }, ref) => {
    const [qr, setQr] = useState("");
    const [isSharing, setIsSharing] = useState(false);

    useEffect(() => {
      const generateQr = async (visit: VisitResponse) => {
        try {
          if (!visit.qrId) {
            throw new Error("qrId Inválido");
          }
          const qrCode = await QRCode.toDataURL(visit.qrId);
          setQr(qrCode);
        } catch (error: any) {
          console.error(error);
        }
      };
      if (visit && isOpen) {
        generateQr(visit);
      }
    }, [visit, isOpen]);

    const handleShare = async () => {
      if (!ref || !visit) return;

      setIsSharing(true);

      try {
        // Pequeño delay para asegurar que el modal esté completamente renderizado
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Verificar que el ref es una función callback ref
        const modalElement = typeof ref === "function" ? null : ref?.current;

        if (!modalElement) {
          throw new Error("No se pudo acceder al elemento del modal");
        }

        // Generar imagen del modal completo
        const dataUrl = await toPng(modalElement);

        // Convertir data URL a Blob
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], `Autorización-${visit.visit.name}.png`, {
          type: "image/png",
        });

        // Verificar si el navegador soporta compartir archivos
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          const shareData = {
            title: `Autorización de visita - ${visit.visit.name}`,
            text: `Te comparto mi autorización de visita para ${visit.visit.name}`,
            files: [file],
          };

          await navigator.share(shareData);

        } else {
          // Fallback para navegadores que no soportan compartir archivos
          const link = document.createElement("a");
          link.download = `Autorización-${visit.visit.name}.png`;
          link.href = dataUrl;
          link.click();

          const message =
            `Te comparto mi autorización de visita:\n\n` +
            `Nombre: ${visit.visit.name}\n` +
            `Documento: ${visit.visit.document}\n` +
            `Estado: ${visit.authorization.state.toUpperCase()}\n` +
            `Fecha: ${visit.authorization.date.toLocaleDateString("es-ES")}\n` +
            (visit.authorization.exp
              ? `Vence: ${visit.authorization.exp.toLocaleDateString(
                  "es-ES"
                )}\n`
              : "");

          // Abrir WhatsApp con el mensaje
          window.open(
            `https://wa.me/?text=${encodeURIComponent(message)}`,
            "_blank"
          );
        }
      } catch (error) {
        console.error("Error al compartir:", error);
        alert("Ocurrió un error al compartir. Por favor intenta nuevamente.");
      } finally {
        setIsSharing(false);
      }
    };

    if (!isOpen) return null;

    return (
      <div className={styles.modalOverlay}>
        <div className={styles.qrModal} ref={ref}>
          <div className={styles.qrModalHeader}>
            <h3 className={styles.qrModalTitle}>Visita Autorizada</h3>
            <div>
              <button
                className={styles.shareButton}
                onClick={handleShare}
                disabled={isSharing}
              >
                <FaShare />
                {isSharing ? "Cargando..." : "Compartir"}
              </button>
              <button className={styles.closeButton} onClick={onClose}>
                <FaTimes />
              </button>
            </div>
          </div>

          {qr ? (
            <div className={styles.qrContainer}>
              <span>{visit.visit.name}</span>
              <span>{visit.visit.document}</span>
              <img src={qr} alt="QR Code" />
              <span
                className={`${styles.badgeLarge} ${
                  styles[visit.authorization.state.toLowerCase()]
                }`}
              >
                {visit.authorization.state.toUpperCase()}
              </span>
              <p>
                {visit.authorization.date.toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {visit.authorization.exp && (
                <span>
                  Vence:{" "}
                  {visit.authorization.exp.toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
              <p className={styles.qrId}>{visit.qrId}</p>
            </div>
          ) : (
            <div className={styles.spinnerContainer}>
              <span className={styles.spinner}></span>
              <p>Cargando código QR...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

QRModal.displayName = "QRModal";

export default QRModal;