"use client";

import React, { useState } from "react";
import Link from "next/link";

const AddActivities: React.FC = () => {
  const [activitySourceType, setActivitySourceType] = useState<"url">("url");
  const [formData, setFormData] = useState({
    activityType: "",
    title: "",
    description: "",
    ageGroup: "",
    activityUrl: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSourceTypeChange = () => {
    setActivitySourceType("url");
    setFormData({
      ...formData,
      activityUrl: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setShowAlert(true); // Show custom alert
  };

  const closeAlert = () => setShowAlert(false);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Add New Activity</h1>
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow-md flex flex-col gap-4">
        {/* Activity Type */}
        <div>
          <label className="block font-semibold mb-1">Activity Type</label>
          <select
            name="activityType"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required>
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
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Activity Description */}
        <div>
          <label className="block font-semibold mb-1">
            Activity Description
          </label>
          <textarea
            name="description"
            placeholder="Write a brief description..."
            onChange={handleChange}
            className="w-full p-2 border rounded h-24"
            required></textarea>
        </div>

        {/* Age Group */}
        <div>
          <label className="block font-semibold mb-1">Age Group</label>
          <select
            name="ageGroup"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required>
            <option value="">Select Age Group</option>
            <option value="3-5">3-5</option>
            <option value="6-8">6-8</option>
            <option value="9-12">9-12</option>
            <option value="13+">13+</option>
          </select>
        </div>

        {/* Activity Source */}
        <div>
          <label className="block font-semibold mb-2">Activity Source</label>
          <div className="flex gap-4 mb-2">
            <button
              type="button"
              className={`p-2 rounded ${activitySourceType === "url"}`}>
              Activity URL
            </button>
          </div>

          {activitySourceType === "url" && (
            <input
              type="url"
              name="activityUrl"
              placeholder="Enter activity URL"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Submit Activity
        </button>
      </form>

      {/* Custom Alert */}
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4 text-green-500">
              Activity Submitted!
            </h2>
            <p className="text-gray-700 mb-4">
              Your activity has been successfully submitted.
            </p>
            <button
              onClick={closeAlert}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              OK
            </button>
          </div>
        </div>
      )}

      {/* Back to Admin Button */}
      <div className="mt-6">
        <Link
          href="/Pages/Admin"
          className="w-full bg-gray-300 text-black py-2 rounded hover:bg-gray-400 text-center block">
          Back to Admin Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AddActivities;
