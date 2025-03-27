import React, { useState } from "react";
import QRCode from "qrcode.react"; // Import QRCode from qrcode.react

const QRCodeGenerator = ({ onGenerate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [equipment, setEquipment] = useState([""]);

  const handleSubmit = () => {
    const player = { name, email, phone, equipment };
    onGenerate(player);  // Calls the function passed from parent
  };

  // Format the player object to a JSON string to generate the QR code
  const playerData = JSON.stringify({ name, email, phone, equipment });

  return (
    <div>
      <h2>Generate QR Code</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        placeholder="Equipment"
        value={equipment[0]} // Assuming a single equipment slot for simplicity
        onChange={(e) => setEquipment([e.target.value])}
      />

      <button onClick={handleSubmit}>Generate Player</button>

      {/* Generate QR Code */}
      <div style={{ marginTop: "20px" }}>
        <QRCode value={playerData} />
      </div>
    </div>
  );
};

export default QRCodeGenerator;
