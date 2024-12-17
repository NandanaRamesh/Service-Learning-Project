"use client";

import React, { useState } from "react";

const AddVideos: React.FC = () => {
  const [videoSourceType, setVideoSourceType] = useState<"url" | "file">("url");
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    grade: "",
    description: "",
    tags: "",
    thumbnail: null,
    videoUrl: "",
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

  const handleSourceTypeChange = (type: "url" | "file") => {
    setVideoSourceType(type);
    setFormData({ ...formData, videoUrl: "", videoFile: null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Video submitted successfully!");
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Add New Video</h1>
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow-md flex flex-col gap-4">
        {/* Video Title */}
        <div>
          <label className="block font-semibold mb-1">Video Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter video title"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label className="block font-semibold mb-1">Subject</label>
          <select
            name="subject"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required>
            <option value="">Select Subject</option>
            <option value="English Grammar">English Grammar</option>
            <option value="Science">Science</option>
            <option value="Basic Maths">Basic Maths</option>
            <option value="Facts">Facts</option>
          </select>
        </div>

        {/* Grade */}
        <div>
          <label className="block font-semibold mb-1">Grade</label>
          <select
            name="grade"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required>
            <option value="">Select Grade</option>
            <option value="1-3">1-3</option>
            <option value="4-6">4-6</option>
            <option value="9-10">9-10</option>
            <option value="11-12">11-12</option>
          </select>
        </div>

        {/* Video Description */}
        <div>
          <label className="block font-semibold mb-1">Video Description</label>
          <textarea
            name="description"
            placeholder="Write a brief description..."
            onChange={handleChange}
            className="w-full p-2 border rounded h-24"
            required></textarea>
        </div>

        {/* Video Tags */}
        <div>
          <label className="block font-semibold mb-1">Video Tags</label>
          <input
            type="text"
            name="tags"
            placeholder="Enter tags separated by commas"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Video Thumbnail */}
        <div>
          <label className="block font-semibold mb-1">Video Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Video Source */}
        <div>
          <label className="block font-semibold mb-2">Video Source</label>
          <div className="flex gap-4 mb-2">
            <button
              type="button"
              className={`p-2 rounded ${
                videoSourceType === "url"
                  ? "bg-blue-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
              onClick={() => handleSourceTypeChange("url")}>
              Upload URL
            </button>
            <button
              type="button"
              className={`p-2 rounded ${
                videoSourceType === "file"
                  ? "bg-blue-700 text-white"
                  : "bg-blue-700 text-white"
              }`}
              onClick={() => handleSourceTypeChange("file")}>
              Upload File
            </button>
          </div>

          {videoSourceType === "url" ? (
            <input
              type="url"
              name="videoUrl"
              placeholder="Enter video URL"
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
          Submit Video
        </button>
      </form>
    </div>
  );
};

export default AddVideos;
