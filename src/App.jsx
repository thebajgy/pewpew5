import React, { useState } from "react";
import QRCodeGenerator from "@/components/QRCodeGenerator"; // Adjust path as necessary

function App() {
  const [players, setPlayers] = useState([]);

  const handleAddPlayer = (player) => {
    setPlayers((prevPlayers) => [...prevPlayers, player]);
    console.log(player); // Verify that player is added correctly
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <QRCodeGenerator onGenerate={handleAddPlayer} />

      <div className="mt-8">
        <h3 className="text-2xl font-semibold">Generated Players:</h3>
        {players.length > 0 ? (
          players.map((player, index) => (
            <div key={index} className="mt-4 p-4 bg-white shadow rounded-md">
              <h4 className="font-bold">{player.name}</h4>
              <p>Email: {player.email}</p>
              <p>Phone: {player.phone}</p>
              <p>Equipment: {player.equipment.join(", ")}</p>
              <QRCode value={JSON.stringify(player)} size={128} />
            </div>
          ))
        ) : (
          <p className="mt-2 text-muted">No players generated yet.</p>
        )}
      </div>
    </div>
  );
}

export default App;
