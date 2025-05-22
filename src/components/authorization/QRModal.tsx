import { useEffect, useState, forwardRef } from "react";
import QRCode from "qrcode";
import styles from "../../styles/visits.module.css";
import { FaTimes, FaShare } from "react-icons/fa";
import { QRModalProps } from "../../types/types";
import { VisitResponse } from "../../types/visit.types";
import { toPng } from "html-to-image";
import { getVisit } from "../../api/visit.api";

const QRModal = forwardRef<HTMLDivElement, QRModalProps>(
  ({ isOpen, visit, onClose }, ref) => {
    const [actualVisit, setActualVisit] = useState<VisitResponse>(visit);
    const [qr, setQr] = useState("");
    const [isSharing, setIsSharing] = useState(false);
    const [isGenerated, setIsGenerated] = useState(false);

    useEffect(() => {
      const generateQr = async (visit: VisitResponse) => {
        try {
          if (!visit.qrId) {
            throw new Error("qrId Inválido");
          }
          setActualVisit(await getVisit(visit.id));
          const qrCode = await QRCode.toDataURL(visit.qrId);
          setQr(qrCode);
        } catch (error: any) {
          console.error(error);
        }
      };
      if (visit && isOpen && isGenerated) {
        const interval = setInterval(() => {
          generateQr(visit);
        }, 2000);
        return () => {
          clearInterval(interval);
        };
      }
      if (!isGenerated) {
        generateQr(visit);
        setIsGenerated(true);
      }
      if (!isOpen) setIsGenerated(false);
    }, [isGenerated, isOpen, visit]);

    const handleShare = async () => {
      if (!ref || !actualVisit) return;

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
        const file = new File(
          [blob],
          `Autorización-${actualVisit.visit.name}.png`,
          {
            type: "image/png",
          }
        );

        // Verificar si el navegador soporta compartir archivos
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          const shareData = {
            title: `Autorización de visita - ${actualVisit.visit.name}`,
            text: `Te comparto mi autorización de visita para ${actualVisit.visit.name}`,
            files: [file],
          };

          await navigator.share(shareData);
        } else {
          // Fallback para navegadores que no soportan compartir archivos
          const link = document.createElement("a");
          link.download = `Autorización-${actualVisit.visit.name}.png`;
          link.href = dataUrl;
          link.click();

          const message =
            `Te comparto mi autorización de visita:\n\n` +
            `Nombre: ${actualVisit.visit.name}\n` +
            `Documento: ${actualVisit.visit.document}\n` +
            `Estado: ${actualVisit.authorization.state.toUpperCase()}\n` +
            `Fecha: ${actualVisit.authorization.date.toLocaleDateString(
              "es-ES"
            )}\n` +
            (actualVisit.authorization.exp
              ? `Vence: ${actualVisit.authorization.exp.toLocaleDateString(
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
            <h3 className={styles.qrModalTitle}>Visita Solicitada</h3>
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
              <span>{actualVisit.visit.name}</span>
              <span>{actualVisit.visit.document}</span>
              <img src={qr} alt="QR Code" />
              <span
                className={`${styles.badgeLarge} ${
                  styles[actualVisit.authorization.state.toLowerCase()]
                }`}
              >
                {actualVisit.authorization.state.toUpperCase()}
              </span>
              <p>
                {new Date(actualVisit.authorization.date).toLocaleDateString(
                  "es-ES",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
              {actualVisit.authorization.exp && (
                <span>
                  Vence:{" "}
                  {new Date(actualVisit.authorization.exp).toLocaleDateString(
                    "es-ES",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              )}
              <p className={styles.qrId}>{actualVisit.qrId}</p>
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
