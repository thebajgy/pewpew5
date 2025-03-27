// src/components/QRCodeScanner.jsx

import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode"; // Import scanner

const QRCodeScanner = ({ onScan }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    scannerRef.current = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
      aspectRatio: 1.0,
    });

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear(); // Stop the scanner on cleanup
      }
    };
  }, []);

  const startScanning = () => {
    if (!isScanning) {
      scannerRef.current.render(
        (decodedText) => {
          try {
            const playerData = JSON.parse(decodedText);
            onScan(playerData); // Send the scanned player data to parent
            setScanError(null); // Clear any previous errors
          } catch (error) {
            setScanError("Invalid QR code format");
          }
        },
        (error) => {
          setScanError("Scanning error, please try again.");
        }
      );
      setIsScanning(true);
    }
  };

  const stopScanning = () => {
    if (isScanning) {
      scannerRef.current.pause(); // Pause scanning
      setIsScanning(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex justify-between mb-4">
        <button
          onClick={startScanning}
          disabled={isScanning}
          className="bg-blue-600 text-white py-2 px-6 rounded-md"
        >
          Start Scanning
        </button>
        <button
          onClick={stopScanning}
          disabled={!isScanning}
          className="bg-red-600 text-white py-2 px-6 rounded-md"
        >
          Stop Scanning
        </button>
      </div>

      <div id="qr-reader" className="w-full max-w-md mx-auto mb-4"></div>

      <p className="text-center text-sm text-muted">Scan a QR code to retrieve player data.</p>

      {/* Error or Success message */}
      {scanError && (
        <div className="mt-4 p-4 bg-red-500 text-white rounded-lg">
          <p>{scanError}</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
