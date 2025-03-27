// src/components/QRCodeScanner.jsx

import React, { useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QRCodeScanner = ({ onScan }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    // Initialize the scanner once the component is mounted
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
    if (scannerRef.current && !isScanning) {
      scannerRef.current.render(
        (decodedText) => {
          try {
            const playerData = JSON.parse(decodedText);
            onScan(playerData); // Pass decoded player data to parent component
            setScanError(null); // Clear any previous errors
          } catch (error) {
            console.error("Failed to parse QR code data:", error);
            setScanError("Invalid QR code format"); // Show error message in UI
          }
        },
        (error) => {
          console.error("QR Scan Error:", error);
          setScanError("Scanning error, please try again."); // Show error message in UI
        }
      );
      setIsScanning(true);
    }
  };

  const stopScanning = () => {
    if (scannerRef.current && isScanning) {
      scannerRef.current.pause(); // Pause scanner
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-card rounded-lg shadow space-y-4">
        <div className="flex gap-2 mb-4">
          <button onClick={startScanning} disabled={isScanning}>
            Start Scanning
          </button>
          <button onClick={stopScanning} disabled={!isScanning} variant="outline">
            Stop Scanning
          </button>
        </div>

        <div id="qr-reader" className="w-full max-w-md mx-auto" />

        <p className="text-sm text-muted-foreground text-center mt-4">
          Position the player's QR code within the scanner frame to verify their information
        </p>
      </div>

      {scanError && (
        <div className="p-4 bg-red-500 text-white rounded-lg shadow">
          <p>{scanError}</p>
        </div>
      )}
    </div>
  );
};

export default QRCodeScanner;
