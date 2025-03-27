// src/components/PlayerList.jsx

import React from "react";

const PlayerList = ({ players }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Player List</h2>
      {players.length > 0 ? (
        <ul className="mt-4">
          {players.map((player, index) => (
            <li key={index} className="bg-white p-4 rounded-lg shadow mb-4">
              <p><strong>Name:</strong> {player.name}</p>
              <p><strong>Email:</strong> {player.email}</p>
              <p><strong>Phone:</strong> {player.phone}</p>
              <p><strong>Equipment:</strong> {player.equipment.join(", ")}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No players added yet!</p>
      )}
    </div>
  );
};

// Ensure the correct default export
export default PlayerList;
