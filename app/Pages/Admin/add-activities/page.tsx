"use client";

import React, { useState } from "react";

const AddActivities: React.FC = () => {
  const [activitySourceType, setActivitySourceType] = useState<
    "url" | "file" | "video"
  >("url");
  const [formData, setFormData] = useState({
    activityType: "",
    title: "",
    description: "",
    ageGroup: "",
    activityUrl: "",
    activityFile: null,
    videoFile: null,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSourceTypeChange = (type: "url" | "file" | "video") => {
    setActivitySourceType(type);
    setFormData({
      ...formData,
      activityUrl: "",
      activityFile: null,
      videoFile: null,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Activity submitted successfully!");
  };

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
              className={`p-2 rounded ${
                activitySourceType === "url"
                  ? "bg-blue-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
              onClick={() => handleSourceTypeChange("url")}>
              Activity URL
            </button>
            <button
              type="button"
              className={`p-2 rounded ${
                activitySourceType === "video"
                  ? "bg-blue-900 text-white"
                  : "bg-blue-900 text-white"
              }`}
              onClick={() => handleSourceTypeChange("video")}>
              Video File
            </button>
          </div>

          {activitySourceType === "url" ? (
            <input
              type="url"
              name="activityUrl"
              placeholder="Enter activity URL"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          ) : (
            <input
              type="file"
              name="videoFile"
              accept="video/*"
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
    </div>
  );
};

export default AddActivities;
