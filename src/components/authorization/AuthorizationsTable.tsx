import { getVisitsByResidentId } from "../../api/visit.api";
import styles from "../../styles/visits.module.css";
import { FaEdit, FaQrcode, FaShare, FaTimes, FaTrash } from "react-icons/fa";
import { VisitResponse } from "../../types/visit.types";
import React, { useEffect, useRef, useState } from "react";
import QRModal from "./QRModal";
import { loadToken, setAuthToken } from "../../services/auth.service";
import { getAuthenticatedUser } from "../../api/auth.api";
import { toPng } from "html-to-image";

const AuthorizationsTable: React.FC = () => {
  const [visits, setVisits] = useState<VisitResponse[] | null>(null);
  const [authorizations, setAuthorizations] = useState<VisitResponse[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQR, setSelectedQR] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [visitToShare, setVisitToShare] = useState<VisitResponse | null>(null);
  const qrModalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getVisits = async () => {
      try {
        const token = loadToken();
        setAuthToken(token);
        const user = await getAuthenticatedUser();
        setVisits(await getVisitsByResidentId(user._id));
        setIsLoading(false);
      } catch (error) {
        console.error(`Ocurrió un error al obtener visitas`, error);
      }
    };

    const getAuthorizations = async () => {
      setAuthorizations(
        visits?.filter(
          (visit) =>
            visit.authorization.state === "pendiente" ||
            visit.authorization.state === "aprobada"
        ) as VisitResponse[]
      );
    };

    getVisits();
    getAuthorizations();
  }, [visits]);

  const handleShowQR = (visit: VisitResponse) => {
    setSelectedQR(true);
    setVisitToShare(visit);
  };

  const handleCloseQR = () => {
    setSelectedQR(false);
    setVisitToShare(null);
  };

  const handleShareClick = (visit: VisitResponse) => {
    setVisitToShare(visit);
    setShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setShareModalOpen(false);
    setVisitToShare(null);
  };

  const generateQRImage = async () => {
    if (!qrModalRef.current) {
      console.error("QRModal ref no está disponible");
      return null;
    }

    try {
      // Añadir pequeño delay para asegurar renderizado
      await new Promise((resolve) => setTimeout(resolve, 100));
      const dataUrl = await toPng(qrModalRef.current);
      return dataUrl;
    } catch (error) {
      console.error("Error al generar la imagen del QR:", error);
      return null;
    }
  };

  const shareOnWhatsApp = async () => {
    if (!visitToShare) return;

    setSelectedQR(true);

    await new Promise((resolve) => setTimeout(resolve, 200));

    const qrImage = await generateQRImage();
    if (!qrImage) return;

const message =
          `Te comparto mi autorización de visita:\n\n` +
          `Nombre: ${visitToShare.visit.name}\n` +
          `Documento: ${visitToShare.visit.document}\n` +
          `Estado: ${visitToShare.authorization.state.toUpperCase()}\n` +
          `Fecha: ${visitToShare.authorization.date.toLocaleDateString("es-ES")}\n` +
          (visitToShare.authorization.exp
            ? `Vence: ${visitToShare.authorization.exp.toLocaleDateString(
                "es-ES"
              )}\n`
            : "");    const encodedMessage = encodeURIComponent(message);

    const link = document.createElement("a");
    link.download = `autorizacion-${visitToShare.visit.name}.png`;
    link.href = qrImage;
    link.click();
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");

    setSelectedQR(false);
    setShareModalOpen(false);
  };

  return (
    <div className={styles.section}>
      <h3>Mis Autorizaciones</h3>

      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <span className={styles.spinner}></span>
          <p>Cargando autorizaciones...</p>
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th className={styles.hideableRow}>Documento</th>
              <th>Estado</th>
              <th className={styles.hideableRow}>Expira</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {authorizations?.map((a, i) => (
              <tr key={i} className={styles.authRow}>
                <td>{a.visit.name}</td>
                <td className={styles.hideableRow}>{a.visit.document}</td>
                <td>
                  <span
                    className={`${styles.badge} ${
                      styles[a.authorization.state.toLowerCase()]
                    }`}
                  >
                    {a.authorization.state.toUpperCase()}
                  </span>
                </td>
                <td className={styles.hideableRow}>
                  {a.authorization.exp instanceof Date
                    ? a.authorization.exp.toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : " "}
                </td>
                <td>
                  <div className={styles.actionGroup}>
                    <button
                      className={styles.authBtn}
                      onClick={() => {
                        handleShowQR(a);
                      }}
                    >
                      <FaQrcode className={styles.actionAuthIcon} />
                    </button>
                    <button
                      className={styles.authBtn}
                      onClick={() => handleShareClick(a)}
                    >
                      <FaShare className={styles.actionAuthIcon} />
                    </button>
                    <button className={styles.authBtn}>
                      <FaEdit className={styles.actionAuthIcon} />
                    </button>
                    <button className={styles.authBtn}>
                      <FaTrash className={styles.actionAuthIcon} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <QRModal
        isOpen={selectedQR}
        visit={visitToShare as VisitResponse}
        onClose={handleCloseQR}
        ref={qrModalRef}
      />

      {/* Modal para compartir */}
      {shareModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Compartir autorización</h3>
              <div className={styles.modalCloseBtnContainer}>
                <button
                  className={styles.modalCloseBtn}
                  onClick={handleCloseShareModal}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <p>Selecciona la red social donde deseas compartir la autorización:</p>
            <div className={styles.shareOptions}>
              <button
                className={styles.sharingButton}
                onClick={() => {
                  setSelectedQR(true);
                  shareOnWhatsApp();
                }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  className={styles.shareIcon}
                />
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorizationsTable;
