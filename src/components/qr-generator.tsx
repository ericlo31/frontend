import { useEffect, useState } from 'react'
import QRCode from 'qrcode'
const QR_ID= "qr-6m1c59ts-1747175561609";
function QRgenerator() {
  const [text, setText] = useState('')
  const [qr, setQr] = useState('')
  const [test,setTest]=useState(true)

  useEffect (()=>{
    const generateQr=async()=>{
      const url = await QRCode.toDataURL(QR_ID)
      setQr(url)
    }
    generateQr()
  },[])
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Generador de Código QR</h1>
      
      {qr && (
        <div style={{ marginTop: '2rem' }}>
          <img src={qr} alt="QR Code" />
          <br />
          <a href={qr} download="codigo-qr.png">Descargar código QR</a>
        </div>
      )}
    </div>
  )
}

export default QRgenerator