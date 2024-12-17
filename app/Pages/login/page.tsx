"use client";
import React, { useState } from "react";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
        <form className="space-y-4 mt-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white">
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <a href="/Pages/ForgotPassword" className="text-blue-500 underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 btn btn-primary text-white font-semibold rounded transition">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
