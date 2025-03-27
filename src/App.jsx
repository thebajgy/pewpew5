
import React, { useState, useEffect } from "react";
import { QRCodeScanner } from "@/components/QRCodeScanner";
import { QRCodeGenerator } from "@/components/QRCodeGenerator";
import { PlayerList } from "@/components/PlayerList";
import { Login } from "@/components/Login";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

function App() {
  const [players, setPlayers] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedPlayers = localStorage.getItem("players");
    const authToken = localStorage.getItem("authToken");
    const savedRole = localStorage.getItem("userRole");
    if (savedPlayers) {
      setPlayers(JSON.parse(savedPlayers));
    }
    if (authToken) {
      setIsAuthenticated(true);
      setUserRole(savedRole);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const handleAddPlayer = (player) => {
    const newPlayer = {
      ...player,
      status: "active",
      violations: [],
    };
    setPlayers([...players, newPlayer]);
    toast({
      title: "Success",
      description: "Player added successfully!",
    });
  };

  const handleScanResult = (result) => {
    try {
      const playerData = JSON.parse(result);
      const existingPlayer = players.find((p) => p.id === playerData.id);
      
      if (existingPlayer) {
        const statusColor = existingPlayer.status === "active" ? "text-green-600" : "text-red-600";
        toast({
          title: "Player Found",
          description: (
            <div className="space-y-1">
              <p>{existingPlayer.name} is registered</p>
              <p className={statusColor}>
                Status: {existingPlayer.status.toUpperCase()}
              </p>
              {existingPlayer.violations.length > 0 && (
                <p className="text-orange-600">
                  Violations: {existingPlayer.violations.length}
                </p>
              )}
            </div>
          ),
        });
      } else {
        toast({
          title: "Unknown Player",
          description: "This player is not registered in the system.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid QR code format",
        variant: "destructive",
      });
    }
  };

  const handleLogin = (credentials) => {
    if (credentials.username === "admin" && credentials.password === "admin") {
      setIsAuthenticated(true);
      setUserRole("admin");
      localStorage.setItem("authToken", "demo-token");
      localStorage.setItem("userRole", "admin");
      toast({
        title: "Success",
        description: "Logged in as Administrator",
      });
    } else if (credentials.username === "user" && credentials.password === "user") {
      setIsAuthenticated(true);
      setUserRole("user");
      localStorage.setItem("authToken", "demo-token");
      localStorage.setItem("userRole", "user");
      toast({
        title: "Success",
        description: "Logged in as Regular User",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    toast({
      title: "Success",
      description: "Logged out successfully!",
    });
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <header className="mb-8 text-center relative">
        <div className="absolute right-4 top-0 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {userRole === "admin" ? "Administrator" : "Regular User"}
          </span>
          <Button 
            variant="outline" 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
        <h1 className="text-4xl font-bold text-primary mb-2">Airsoft Team Manager</h1>
        <p className="text-muted-foreground">Manage your team with QR codes</p>
      </header>

      <main className="container mx-auto max-w-4xl">
        <Tabs defaultValue="players" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="players">Players</TabsTrigger>
            {userRole === "admin" && (
              <TabsTrigger value="generate">Generate QR</TabsTrigger>
            )}
            <TabsTrigger value="scan">Verify Player</TabsTrigger>
          </TabsList>

          <TabsContent value="players">
            <PlayerList 
              players={players} 
              setPlayers={setPlayers} 
              isAdmin={userRole === "admin"}
            />
          </TabsContent>

          {userRole === "admin" && (
            <TabsContent value="generate">
              <QRCodeGenerator onGenerate={handleAddPlayer} />
            </TabsContent>
          )}

          <TabsContent value="scan">
            <QRCodeScanner onScan={handleScanResult} />
          </TabsContent>
        </Tabs>
      </main>
      <Toaster />
    </div>
  );
}

export default App;
