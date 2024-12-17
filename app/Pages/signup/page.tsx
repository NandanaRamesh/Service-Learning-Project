"use client"; // Required for using React hooks in Next.js App Router

import React, { useState } from "react";

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Sign Up</h1>
        <p className="text-center text-gray-400">
          Already have an account?{" "}
          <a href="/Pages/login" className="text-blue-500 underline">
            Log in
          </a>
        </p>
        <form className="space-y-4 mt-6">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="First name"
              className="w-1/2 px-4 py-2 rounded border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Last name"
              className="w-1/2 px-4 py-2 rounded border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Username"
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
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full px-4 py-2 rounded border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white">
              {showConfirmPassword ? "👁️" : "🙈"}
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              className="w-4 h-4 text-blue-500 rounded border-gray-600 focus:ring-blue-500"
            />
            <label htmlFor="terms" className="text-gray-400">
              I agree to the{" "}
              <a href="#" className="text-blue-500 underline">
                Terms & Conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
