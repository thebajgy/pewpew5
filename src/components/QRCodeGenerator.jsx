// src/components/QRCodeGenerator.jsx

import React, { useState } from "react";
import QRCode from "qrcode.react"; // Import QRCode library

const QRCodeGenerator = ({ onGenerate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [equipment, setEquipment] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const playerData = { name, email, phone, equipment: equipment.split(",") }; // Equipment as a comma-separated list
    onGenerate(playerData); // Call the onGenerate function passed from the parent
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Generate QR Code</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Equipment</label>
          <input
            type="text"
            placeholder="Enter equipment (comma-separated)"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Generate Player QR
          </button>
        </div>
      </form>

      {/* QR Code Preview */}
      {name && email && phone && equipment && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold">QR Code Preview</h3>
          <div className="mt-4">
            <QRCode value={JSON.stringify({ name, email, phone, equipment })} size={256} />
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
