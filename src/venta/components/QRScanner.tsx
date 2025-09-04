import QrScanner from 'qr-scanner';
import { useRef, useState } from 'react';

export const QRScanner = ({setCodigo}:{setCodigo:(v:string)=> void}) => {
    const videoElementRef = useRef<HTMLVideoElement>(null);
    const qrScannerRef = useRef<QrScanner | null>(null);
    const [scanned, setScannedText] = useState('');
    const [scanning, setScanning] = useState(false);

    const startScanner = () => {
        if (videoElementRef.current && !qrScannerRef.current) {
            const qrScanner = new QrScanner(
                videoElementRef.current,
                (result) => {
                    setCodigo(result.data)
                    setScannedText(result.data);
                },
                {
                    returnDetailedScanResult: true,
                    highlightScanRegion: true,
                    highlightCodeOutline: true,
                }
            );
            qrScanner.start();
            qrScannerRef.current = qrScanner;
            setScanning(true);
        }
    };

    const stopScanner = () => {
        if (qrScannerRef.current) {
            qrScannerRef.current.stop();
            qrScannerRef.current.destroy();
            qrScannerRef.current = null;
            setScanning(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-40 h-40 overflow-hidden rounded-md border border-gray-300 mb-2">
                <video className="w-full h-full object-cover" ref={videoElementRef} />
            </div>
            <p className="text-xs mb-2">Codigo: {scanned}</p>
            {!scanning ? (
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={startScanner}
                >
                    Abrir cámara
                </button>
            ) : (
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={stopScanner}
                >
                    Detener cámara
                </button>
            )}
        </div>
    );
};



