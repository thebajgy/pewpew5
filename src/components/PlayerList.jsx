
import React from "react";
import { motion } from "framer-motion";
import { Trash2, ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PlayerList({ players, setPlayers, isAdmin }) {
  const [expandedPlayer, setExpandedPlayer] = useState(null);
  const [violationText, setViolationText] = useState("");

  const handleDelete = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const toggleExpand = (id) => {
    setExpandedPlayer(expandedPlayer === id ? null : id);
  };

  const updatePlayerStatus = (playerId, newStatus) => {
    setPlayers(players.map(player => 
      player.id === playerId 
        ? { ...player, status: newStatus }
        : player
    ));
  };

  const addViolation = (playerId) => {
    if (!violationText.trim()) return;
    
    setPlayers(players.map(player => 
      player.id === playerId 
        ? {
            ...player,
            violations: [...player.violations, {
              date: new Date().toISOString(),
              description: violationText
            }]
          }
        : player
    ));
    setViolationText("");
  };

  return (
    <div className="space-y-4">
      {players.length === 0 ? (
        <div className="text-center p-8 text-muted-foreground">
          No players registered yet. {isAdmin && "Generate a QR code to add players."}
        </div>
      ) : (
        <div className="grid gap-4">
          {players.map((player) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-card rounded-lg shadow overflow-hidden"
            >
              <div className="p-4 flex justify-between items-center">
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{player.name}</h3>
                    <span className={`text-sm px-2 py-0.5 rounded ${
                      player.status === 'active' 
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {player.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{player.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleExpand(player.id)}
                  >
                    {expandedPlayer === player.id ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                  {isAdmin && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(player.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              
              {expandedPlayer === player.id && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="border-t"
                >
                  <div className="p-4 space-y-4">
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Phone:</span> {player.phone}
                      </p>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">Equipment:</p>
                        {player.equipment.map((item, index) => (
                          <p key={index} className="text-sm pl-4 text-muted-foreground">
                            {item || `Equipment slot ${index + 1} (empty)`}
                          </p>
                        ))}
                      </div>
                    </div>

                    {isAdmin && (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={player.status === 'active' ? 'destructive' : 'default'}
                            onClick={() => updatePlayerStatus(player.id, player.status === 'active' ? 'disqualified' : 'active')}
                          >
                            {player.status === 'active' ? 'Disqualify' : 'Activate'}
                          </Button>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <AlertCircle className="h-4 w-4 mr-2" />
                                Report Violation
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Report Violation</DialogTitle>
                                <DialogDescription>
                                  Add a violation report for {player.name}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label>Violation Description</Label>
                                  <Input
                                    value={violationText}
                                    onChange={(e) => setViolationText(e.target.value)}
                                    placeholder="Describe the violation..."
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button onClick={() => addViolation(player.id)}>
                                  Add Violation
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    )}

                    {player.violations.length > 0 && (
                      <div className="mt-4">
                        <p className="font-medium text-sm mb-2">Violation History:</p>
                        <div className="space-y-2">
                          {player.violations.map((violation, index) => (
                            <div
                              key={index}
                              className="text-sm bg-muted p-2 rounded"
                            >
                              <p className="text-muted-foreground">
                                {new Date(violation.date).toLocaleDateString()}
                              </p>
                              <p>{violation.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
