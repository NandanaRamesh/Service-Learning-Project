"use client";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/lib/supabaseClient"; // Adjust the import based on your file structure

const AddActivities: React.FC = () => {
  const [activitySourceType, setActivitySourceType] = useState<"url">("url");
  const [formData, setFormData] = useState({
    activityType: "",
    title: "",
    description: "",
    activityUrl: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { activityType, title, description, activityUrl } = formData;

    // Validate form fields
    if (!activityType || !title || !description || !activityUrl) {
      setAlertMessage("All fields are required.");
      setIsError(true);
      setShowAlert(true);
      return;
    }

    // Map activity type to its corresponding ID
    const activityTypeMap: { [key: string]: string } = {
      Crafts: "ACT001",
      Arts: "ACT002",
      Games: "ACT003",
      Edutainment: "ACT004",
    };

    const activityTypeId = activityTypeMap[activityType];
    if (!activityTypeId) {
      setAlertMessage("Invalid activity type selected.");
      setIsError(true);
      setShowAlert(true);
      return;
    }

    try {
      // Fetch the last activity ID from the table
      const { data: lastActivity, error: fetchError } = await supabase
        .from("Activities")
        .select("activity_id")
        .order("activity_id", { ascending: false })
        .limit(1)
        .single();

      if (fetchError) {
        console.error("Error fetching last activity ID:", fetchError);
        throw new Error("Could not fetch the last activity ID.");
      }

      // Generate the new activity ID
      const lastActivityId = lastActivity?.activity_id || "A00000";
      const newActivityId = `A${String(
        parseInt(lastActivityId.substring(1)) + 1
      ).padStart(5, "0")}`;

      // Insert the new activity into the database
      const { error: insertError } = await supabase.from("Activities").insert({
        activity_id: newActivityId,
        activity_name: title,
        activity_type_id: activityTypeId,
        description,
        source: activityUrl,
      });

      if (insertError) {
        console.error("Error inserting activity:", insertError);
        throw new Error("Failed to add the activity to the database.");
      }

      setAlertMessage("Activity successfully submitted!");
      setIsError(false);
      setShowAlert(true);

      // Reset form
      setFormData({
        activityType: "",
        title: "",
        description: "",
        activityUrl: "",
      });
    } catch (error) {
      console.error("Error during submission:", error);
      setAlertMessage(error.message || "An error occurred.");
      setIsError(true);
      setShowAlert(true);
    }
  };

  const closeAlert = () => setShowAlert(false);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Add New Activity</h1>
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow-md flex flex-col gap-4"
      >
        {/* Activity Type */}
        <div>
          <label className="block font-semibold mb-1">Activity Type</label>
          <select
            name="activityType"
            value={formData.activityType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Activity Type</option>
            <option value="Arts">Arts</option>
            <option value="Crafts">Crafts</option>
            <option value="Games">Games</option>
            <option value="Edutainment">Edutainment</option>
          </select>
        </div>

        {/* Activity Title */}
        <div>
          <label className="block font-semibold mb-1">Activity Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter activity title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Activity Description */}
        <div>
          <label className="block font-semibold mb-1">Activity Description</label>
          <textarea
            name="description"
            placeholder="Write a brief description..."
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded h-24"
            required
          ></textarea>
        </div>

        {/* Activity Source */}
        <div>
          <label className="block font-semibold mb-2">Activity URL</label>
          <input
            type="url"
            name="activityUrl"
            placeholder="Enter activity URL"
            value={formData.activityUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit Activity
        </button>
      </form>

      {/* Custom Alert */}
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2
              className={`text-xl font-bold mb-4 ${
                isError ? "text-red-500" : "text-green-500"
              }`}
            >
              {isError ? "Error!" : "Success!"}
            </h2>
            <p className="text-gray-700 mb-4">{alertMessage}</p>
            <button
              onClick={closeAlert}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Back to Admin Button */}
      <div className="mt-6">
        <Link
          href="/Pages/Admin"
          className="w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-400 text-center block"
        >
          Back to Admin Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AddActivities;
