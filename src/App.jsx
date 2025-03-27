// src/App.jsx
import React, { useState, useEffect } from "react";
import Login from "@/components/Login"; // Import Login component
import PlayerList from "@/components/PlayerList"; // Import PlayerList component
import QRCodeGenerator from "@/components/QRCodeGenerator"; // Import QRCodeGenerator component
import QRCodeScanner from "@/components/QRCodeScanner"; // Import QRCodeScanner component
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

function App() {
  const [players, setPlayers] = useState([]); // Store the list of players
  const [currentPlayer, setCurrentPlayer] = useState(null); // Store current player data for display
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [userRole, setUserRole] = useState(null); // User role (admin or user)

  // Load players from localStorage to persist data
  useEffect(() => {
    const savedPlayers = JSON.parse(localStorage.getItem("players")) || [];
    setPlayers(savedPlayers);
  }, []);

  // Save players to localStorage when updated
  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  // Handle Login function
  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUserRole(userData.role); // Store the user role (admin or user)
  };

  // Handle Logout function
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  // Handle adding new player (passed from QR Generator)
  const handleAddPlayer = (playerData) => {
    setPlayers((prevPlayers) => [...prevPlayers, playerData]); // Add player to the list
  };

  // Handle scanning result (check if player is already in the list)
  const handleScanResult = (scannedPlayer) => {
    const existingPlayer = players.find(
      (player) => player.email === scannedPlayer.email
    );
    if (existingPlayer) {
      setCurrentPlayer(existingPlayer); // Show scanned player data
    } else {
      setCurrentPlayer(null); // No player found
    }
  };

  // Show login page if not authenticated
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

      {/* QR Code Generator (only for admin) */}
      {userRole === "admin" && (
        <div className="mb-8">
          <QRCodeGenerator onGenerate={handleAddPlayer} />
        </div>
      )}

      {/* QR Code Scanner */}
      <div className="mb-8">
        <QRCodeScanner onScan={handleScanResult} />
      </div>

      {/* Display Player Info (if scanned successfully) */}
      {currentPlayer && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold">Player Info</h3>
          <p><strong>Name:</strong> {currentPlayer.name}</p>
          <p><strong>Email:</strong> {currentPlayer.email}</p>
          <p><strong>Phone:</strong> {currentPlayer.phone}</p>
          <p><strong>Equipment:</strong> {currentPlayer.equipment.join(", ")}</p>
        </div>
      )}

      {/* Player List (Only for admin) */}
      {userRole === "admin" && (
        <div className="mt-8">
          <PlayerList players={players} />
        </div>
      )}
    </div>
  );
}

export default App;
