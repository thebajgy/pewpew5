import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function QRCodeScanner({ onScan }) {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScan, setLastScan] = useState(null);
  let scanner = null;

  useEffect(() => {
    // Initialize scanner once the component is mounted
    scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
      aspectRatio: 1.0,
    });

    return () => {
      if (scanner) {
        scanner.clear(); // Stop the scanner on cleanup
      }
    };
  }, []);

  const startScanning = () => {
    if (scanner && !isScanning) {
      scanner.render(
        (decodedText) => {
          try {
            const playerData = JSON.parse(decodedText);
            setLastScan(playerData);
            onScan(playerData); // Pass decoded player data to parent component
          } catch (error) {
            console.error("Failed to parse QR code data:", error);
            alert("Invalid QR code format");
          }
        },
        (error) => {
          console.error("QR Scan Error:", error);
        }
      );
      setIsScanning(true);
    }
  };

  const stopScanning = () => {
    if (scanner && isScanning) {
      scanner.pause(); // Pause scanner
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-card rounded-lg shadow space-y-4">
        <div className="flex gap-2 mb-4">
          <Button onClick={startScanning} disabled={isScanning}>
            Start Scanning
          </Button>
          <Button onClick={stopScanning} disabled={!isScanning} variant="outline">
            Stop Scanning
          </Button>
        </div>

        <div id="qr-reader" className="w-full max-w-md mx-auto" />

        <p className="text-sm text-muted-foreground text-center mt-4">
          Position the player's QR code within the scanner frame to verify their information
        </p>
      </div>

      {lastScan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-card rounded-lg shadow"
        >
          <h3 className="text-lg font-semibold mb-2">Last Scanned Player</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {lastScan.name}</p>
            <p><span className="font-medium">Email:</span> {lastScan.email}</p>
            <p><span className="font-medium">Phone:</span> {lastScan.phone}</p>
            <div className="space-y-1">
              <p className="font-medium">Equipment:</p>
              {lastScan.equipment && lastScan.equipment.map((item, index) => (
                <p key={index} className="pl-4 text-sm text-muted-foreground">
                  {item || `Equipment slot ${index + 1} (empty)`}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
