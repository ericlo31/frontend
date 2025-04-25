import { useState } from 'react'
import QRCode from 'qrcode'

function App() {
  const [text, setText] = useState('')
  const [qr, setQr] = useState('')

  const generateQr = async () => {
    if (!text) return alert("Por favor, ingresa un texto o URL.")

    try {
      const url = await QRCode.toDataURL(text)
      setQr(url)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Generador de Código QR</h1>
      <input
        type="text"
        placeholder="Ingresa texto o URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          padding: '0.5rem',
          width: '300px',
          marginBottom: '1rem',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
      <br />
      <button
        onClick={generateQr}
        style={{
          padding: '0.5rem 1rem',
          cursor: 'pointer',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        Generar QR
      </button>

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

export default App