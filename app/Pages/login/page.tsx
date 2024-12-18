"use client";
import React, { useState } from "react";
import { supabase } from "@/app/lib/lib/supabaseClient"; // Import supabase client

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      // Redirect to the home page after successful login
      window.location.href = "/"; // Redirect to home page
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Log In</h1>
        <p className="text-center text-gray-400">
          Don’t have an account?{" "}
          <a href="/Pages/signup" className="text-blue-500 underline">
            Sign up
          </a>
        </p>
        <form className="space-y-4 mt-6" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 btn btn-primary text-white font-semibold rounded transition"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
