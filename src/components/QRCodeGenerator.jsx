
import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function QRCodeGenerator({ onGenerate }) {
  const [playerData, setPlayerData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    equipment: ["", "", "", "", ""]
  });

  const [showQR, setShowQR] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlayer = {
      ...playerData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    onGenerate(newPlayer);
    setShowQR(true);
  };

  const handleEquipmentChange = (index, value) => {
    const newEquipment = [...playerData.equipment];
    newEquipment[index] = value;
    setPlayerData({ ...playerData, equipment: newEquipment });
  };

  const handleReset = () => {
    setPlayerData({
      id: "",
      name: "",
      email: "",
      phone: "",
      equipment: ["", "", "", "", ""]
    });
    setShowQR(false);
  };

  return (
    <div className="space-y-6 p-4 bg-card rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Player Name</Label>
          <Input
            id="name"
            value={playerData.name}
            onChange={(e) => setPlayerData({ ...playerData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={playerData.email}
            onChange={(e) => setPlayerData({ ...playerData, email: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={playerData.phone}
            onChange={(e) => setPlayerData({ ...playerData, phone: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Equipment</Label>
          {playerData.equipment.map((item, index) => (
            <Input
              key={index}
              placeholder={`Equipment ${index + 1}`}
              value={item}
              onChange={(e) => handleEquipmentChange(index, e.target.value)}
              className="mt-2"
            />
          ))}
        </div>

        <div className="flex gap-2">
          <Button type="submit" disabled={showQR}>
            Generate QR Code
          </Button>
          {showQR && (
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
          )}
        </div>
      </form>

      {showQR && (
        <div className="flex flex-col items-center space-y-4 p-4 border rounded">
          <QRCodeSVG
            value={JSON.stringify(playerData)}
            size={256}
            level="H"
            includeMargin={true}
          />
          <p className="text-sm text-muted-foreground">
            Scan this code to verify player information
          </p>
        </div>
      )}
    </div>
  );
}
