import { deleteVisit, getVisitsByResidentId } from "../../api/visit.api";
import styles from "../../styles/visits.module.css";
import { FaEdit, FaQrcode, FaShare, FaTimes, FaTrash } from "react-icons/fa";
import { VisitResponse } from "../../types/visit.types";
import React, { useEffect, useRef, useState } from "react";
import QRModal from "./QRModal";
import { loadToken, setAuthToken } from "../../services/auth.service";
import { getAuthenticatedUser } from "../../api/auth.api";
import EditVisitModal from "./EditVisitModal";

const AuthorizationsTable: React.FC = () => {
  const [visits, setVisits] = useState<VisitResponse[] | null>(null);
  const [authorizations, setAuthorizations] = useState<VisitResponse[] | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQR, setSelectedQR] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [visitToEdit, setVisitToEdit] = useState<VisitResponse | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [visitToShare, setVisitToShare] = useState<VisitResponse | null>(null);
  const [visitToDelete, setVisitToDelete] = useState<VisitResponse | null>(
    null
  );
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

  const handleEditClick = (visit: VisitResponse) => {
    setVisitToEdit(visit);
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setVisitToEdit(null);
  };

  const handleVisitUpdated = () => {
    const token = loadToken();
    setAuthToken(token);
    getAuthenticatedUser().then((user) => {
      getVisitsByResidentId(user._id).then((visits) => {
        setVisits(visits);
      });
    });
    setEditModalOpen(false);
  };

  const handleDeleteClick = (visit: VisitResponse) => {
    setVisitToDelete(visit);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setVisitToDelete(null);
  };

  const handleConfirmDelete = async () => {
    const visit = visitToDelete as VisitResponse;
    console.log(visit);
    await deleteVisit(visit.id);
    handleCloseDeleteModal();
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
            {authorizations?.map((a, i) => {
              const isPending = a.authorization.state === "pendiente";
              return (
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
                      <button
                        className={`${styles.authBtn} ${
                          !isPending ? styles.disabledBtn : ""
                        }`}
                        disabled={!isPending}
                        onClick={() => {
                          if (isPending) handleEditClick(a);
                        }}
                      >
                        <FaEdit className={styles.actionAuthIcon} />
                      </button>

                      <button
                        className={`${styles.authBtn} ${
                          !isPending ? styles.disabledBtn : ""
                        }`}
                        disabled={!isPending}
                        onClick={() => {
                          if (isPending) handleDeleteClick(a);
                        }}
                      >
                        <FaTrash className={styles.actionAuthIcon} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
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
            <p>
              Para compartir esta autorización, abre el código QR y usa el botón
              "Compartir" en la esquina superior izquierda.
            </p>
            <div className={styles.modalFooter}>
              <button
                className={`${styles.modalBtn} ${styles.confirmBtn}`}
                onClick={() => {
                  setSelectedQR(true);
                  setShareModalOpen(false);
                }}
              >
                Abrir Código QR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para eliminar */}
      {deleteModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>Confirmar eliminación</h3>
              <div className={styles.modalCloseBtnContainer}>
                <button
                  className={styles.modalCloseBtn}
                  onClick={handleCloseDeleteModal}
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <p>¿Estás seguro que quieres eliminar esta visita?</p>
            <div className={styles.modalFooter}>
              <button
                className={`${styles.modalBtn} ${styles.cancelBtn}`}
                onClick={handleCloseDeleteModal}
              >
                Cancelar
              </button>
              <button
                className={`${styles.modalBtn} ${styles.confirmBtn}`}
                onClick={handleConfirmDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <EditVisitModal
        isOpen={editModalOpen}
        onClose={handleCloseEditModal}
        visit={visitToEdit}
        onVisitUpdated={handleVisitUpdated}
      />
    </div>
  );
};

export default AuthorizationsTable;
