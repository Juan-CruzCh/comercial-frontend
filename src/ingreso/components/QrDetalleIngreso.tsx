import React, { useEffect, useState } from 'react'
import type { detalleIngresoI } from '../interface/detalleIngreso'
import QRCode from 'qrcode'

export const QrDetalleIngreso = ({ data }: { data: detalleIngresoI[] }) => {
  const [qrCodes, setQrCodes] = useState<string[]>([])

  useEffect(() => {
    Promise.all(data.map(item => QRCode.toDataURL(item.codigo)))
      .then(urls => setQrCodes(urls))
      .catch(err => console.error(err))
  }, [data])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
        fontFamily: 'Arial, sans-serif',

        minHeight: '100vh',
      }}
    >
      {data.map((item, index) => (
        <div
          key={index}
          style={{
            marginBottom: '60px',
            width: '100%',
            maxWidth: '1000px',
          }}
        >
      
          <h2
            style={{
              marginBottom: '24px',
              textAlign: 'center',
              fontSize: '24px',
              color: '#333',
              borderBottom: '2px solid #ddd',
              paddingBottom: '10px',
            }}
          >
            {item.producto}
          </h2>

      
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              
            }}
          >
            {qrCodes[index] &&
              Array.from({ length: item.cantidad }).map((_, i) => (
                <div
                  key={`${index}-${i}`}
                  style={{
                    border: '1px solid #ddd',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    padding: '5px',
                    width: '120px',
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    transition: 'transform 0.2s',
                  }}
                >
                  <img
                    src={qrCodes[index]}
                    alt={`QR ${item.codigo}`}
                    width={128}
                    height={128}
                    style={{ marginBottom: '8px' }}
                  />
                  <p style={{ fontSize: '12px', color: '#555' }}>
                    {item.codigo}
                  </p>
                  <p style={{ fontSize: '12px', color: '#888' }}>
                    {i + 1} 
                  </p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}
