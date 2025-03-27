// src/App.jsx

import React, { useState } from "react";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import QRCodeScanner from "@/components/QRCodeScanner";
import { Button } from "@/components/ui/button"; // Optional button for logout or additional actions

function App() {
  const [players, setPlayers] = useState([]); // Store the list of players
  const [currentPlayer, setCurrentPlayer] = useState(null); // Store the current player data for display

  const handleAddPlayer = (playerData) => {
    setPlayers((prevPlayers) => [...prevPlayers, playerData]); // Add player to the list
  };

  const handleScanResult = (scannedPlayer) => {
    // Check if the scanned player is already in the list
    const existingPlayer = players.find(
      (player) => player.email === scannedPlayer.email
    );
    if (existingPlayer) {
      setCurrentPlayer(existingPlayer); // Show scanned player data
    } else {
      setCurrentPlayer(null); // No player found
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Airsoft Team Manager</h1>

      <QRCodeGenerator onGenerate={handleAddPlayer} />

      <div className="mt-8">
        <QRCodeScanner onScan={handleScanResult} />
      </div>

      {/* Display the current player information */}
      {currentPlayer && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold">Player Info</h3>
          <p>Name: {currentPlayer.name}</p>
          <p>Email: {currentPlayer.email}</p>
          <p>Phone: {currentPlayer.phone}</p>
          <p>Equipment: {currentPlayer.equipment.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default App;
