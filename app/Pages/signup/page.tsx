'use client';

import { useState } from "react";
import { supabase } from "@/app/lib/lib/supabaseClient"; // Import Supabase client

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Check if the authorization code is valid by querying the auth_codes table in Supabase
      const { data, error: codeError } = await supabase
        .from("auth_codes")
        .select("code")
        .eq("code", authCode)
        .single(); // Fetch one row

      console.log("Query Result:", data); // Log the result for debugging

      if (codeError || !data) {
        setError("Invalid authorization code.");
        console.error("Authorization code query failed or no data:", codeError); // Log error details
        return; // If code doesn't match, return early and do not proceed to signup
      }

      // Proceed with Supabase signup only if the authorization code is valid
      const { data: signupData, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupError) {
        setError(signupError.message);
        console.error("Signup Error:", signupError.message);
        return;
      }

      // Ensure that `signupData` contains the user and session
      const user = signupData?.user;
      if (!user) {
        setError("User creation failed.");
        return;
      }

      // Log the user UID and username for debugging purposes
      console.log("User UID:", user.id);  // This is the Supabase user ID
      console.log("Username:", username);

      // Insert the display name into the 'display_names' table using the correct column names
      const { data: insertData, error: insertError } = await supabase
        .from("display_names")
        .upsert({
          UID: user.id,         // Use "UID" for the user identifier
          display_name: username // Use "display_name" for the display name
        })
        .eq("UID", user.id); // Ensure we update the correct user based on UID

      if (insertError) {
        setError(`Failed to update display name: ${insertError.message}`);
        console.error("Insert Error:", insertError);  // Log detailed error
        return;
      }

      console.log("Updated Display Name Data:", insertData);  // Log the successful update

      // Display success message
      setSuccessMessage("User created successfully! Please verify your email and log in.");

    } catch (err) {
      setError(`An unexpected error occurred: ${err}`);
      console.error("Unexpected Error:", err);
    }
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
        <form className="space-y-4 mt-6" onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Authorization Code"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
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
          {successMessage && <p className="text-green-500">{successMessage}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
