// src/components/QRCodeGenerator.jsx

import React, { useState } from "react";

const QRCodeGenerator = ({ onGenerate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [equipment, setEquipment] = useState([""]);

  const handleSubmit = () => {
    const player = { name, email, phone, equipment };
    onGenerate(player);  // Calls the function passed from parent
  };

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
      <button onClick={handleSubmit}>Generate Player</button>
    </div>
  );
};

export default QRCodeGenerator;  // Ensure it's exported as default
