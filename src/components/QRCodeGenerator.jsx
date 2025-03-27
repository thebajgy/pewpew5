import React, { useState } from "react";
import QRCode from "qrcode.react"; // Import QRCode from qrcode.react

const QRCodeGenerator = ({ onGenerate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [equipment, setEquipment] = useState([""]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    const player = { name, email, phone, equipment };
    onGenerate(player);  // Calls the function passed from parent
  };

  // Format the player object to a JSON string to generate the QR code
  const playerData = JSON.stringify({ name, email, phone, equipment });

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Generate QR Code</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="equipment">
            Equipment
          </label>
          <input
            id="equipment"
            type="text"
            placeholder="Enter equipment (comma-separated)"
            value={equipment[0]} // Assuming a single equipment slot for simplicity
            onChange={(e) => setEquipment([e.target.value])}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Generate Player
          </button>
        </div>
      </form>

      {/* QR Code Preview */}
      {name && email && phone && equipment[0] && (
        <div className="mt-6 text-center">
          <h3 className="text-lg font-semibold">QR Code Preview</h3>
          <div className="mt-4">
            <QRCode value={playerData} size={256} />
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
