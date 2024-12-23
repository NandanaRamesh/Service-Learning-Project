"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/app/lib/lib/supabaseClient";
import { useRouter } from "next/navigation";

const ProfileSettingsPage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState<string>("Profile");
  const [newDisplayName, setNewDisplayName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUser(data.session.user);

        const { data: displayData, error: displayError } = await supabase
          .from("display_names")
          .select("display_name")
          .eq("UID", data.session.user.id)
          .single();

        if (displayData) {
          setDisplayName(displayData.display_name);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateDisplayName = async () => {
    if (!newDisplayName) {
      setError("Display name cannot be empty.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    const { data, error } = await supabase
      .from("display_names")
      .upsert({ UID: user?.id, display_name: newDisplayName })
      .eq("UID", user?.id);

    if (error) {
      setError("Failed to update display name.");
    } else {
      setSuccessMessage("Display name updated successfully!");
      setDisplayName(newDisplayName);
      setNewDisplayName("");
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-base-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>

      {error && <div className="alert alert-error">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="mb-4">
        <h3 className="font-medium">Current Display Name</h3>
        <p>{displayName}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-medium">Update Display Name</h3>
        <input
          type="text"
          placeholder="Enter new display name"
          className="input input-bordered w-full"
          value={newDisplayName}
          onChange={(e) => setNewDisplayName(e.target.value)}
        />
        <button
          onClick={handleUpdateDisplayName}
          className="btn btn-primary mt-2"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Display Name"}
        </button>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
