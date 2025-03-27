
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to manage your airsoft team
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6 bg-card p-6 rounded-lg shadow">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                required
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>

        <div className="space-y-2 text-center text-sm text-muted-foreground">
          <p>Admin credentials: admin / admin</p>
          <p>Regular user credentials: user / user</p>
        </div>
      </div>
    </div>
  );
}
