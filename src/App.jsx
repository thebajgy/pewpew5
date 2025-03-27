// src/App.jsx

import React, { useState, useEffect } from "react";
import Login from "@/components/Login";
import PlayerList from "@/components/PlayerList"; // Correct import for default export
import QRCodeGenerator from "@/components/QRCodeGenerator";
import QRCodeScanner from "@/components/QRCodeScanner";
import { Button } from "@/components/ui/button"; 

function App() {
  const [players, setPlayers] = useState([]); 
  const [currentPlayer, setCurrentPlayer] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const savedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    setPlayers(savedPlayers);
  }, []);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUserRole(userData.role); 
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const handleAddPlayer = (playerData) => {
    setPlayers((prevPlayers) => [...prevPlayers, playerData]);
  };

  const handleScanResult = (scannedPlayer) => {
    const existingPlayer = players.find(
      (player) => player.email === scannedPlayer.email
    );
    if (existingPlayer) {
      setCurrentPlayer(existingPlayer); 
    } else {
      setCurrentPlayer(null); 
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-6">Airsoft Team Manager</h1>

      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">{userRole === "admin" ? "Admin Dashboard" : "User Dashboard"}</h2>
        <Button onClick={handleLogout}>Logout</Button>
      </div>

      {userRole === "admin" && (
        <div className="mb-8">
          <QRCodeGenerator onGenerate={handleAddPlayer} />
        </div>
      )}

      <div className="mb-8">
        <QRCodeScanner onScan={handleScanResult} />
      </div>

      {currentPlayer && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold">Player Info</h3>
          <p><strong>Name:</strong> {currentPlayer.name}</p>
          <p><strong>Email:</strong> {currentPlayer.email}</p>
          <p><strong>Phone:</strong> {currentPlayer.phone}</p>
          <p><strong>Equipment:</strong> {currentPlayer.equipment.join(", ")}</p>
        </div>
      )}

      {userRole === "admin" && (
        <div className="mt-8">
          <PlayerList players={players} />
        </div>
      )}
    </div>
  );
}

export default App;
