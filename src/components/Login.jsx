// src/components/Login.jsx

import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (username === "admin" && password === "admin") {
      onLogin({ username: "admin", role: "admin" }); // Admin login
    } else if (username === "user" && password === "user") {
      onLogin({ username: "user", role: "user" }); // Regular user login
    } else {
      setError("Invalid credentials, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit} className="w-full">
          Login
        </Button>
      </div>
    </div>
  );
};

// Make sure you're exporting the component as default
export default Login;
