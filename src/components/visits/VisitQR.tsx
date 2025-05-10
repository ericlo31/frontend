import { useEffect, useState } from "react";
import QRCode from "qrcode";
// import { useParams } from "react-router-dom";

const TEST_QRID = 'qr-zzlbddsd-1746844874298';

function VisitQR() {
  const [qr, setQr] = useState("");
  
  // Se obtiene el qrId desde los parámetros
  // const { qrId } = useParams(); // Descomentar al implementar recibimiento del QR

  const qrId = TEST_QRID;

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

    if (qrId) {
      generateQr(qrId);
    }
  }, [qrId]);

  // Modifiqué aca para que únicamente se se muestra el QR generado a partir del qrId
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      {qr && (
        <div style={{ marginTop: "2rem" }}>
          <img src={qr} alt="QR Code" />
        </div>
      )}
    </div>
  );
}

export default VisitQR;