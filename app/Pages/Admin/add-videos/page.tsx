"use client";

import React, { useState } from "react";
import Link from "next/link";

const AddVideos: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    grade: "",
    description: "",
    tags: "",
    thumbnail: null,
    videoUrl: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
            <option value="English Grammar">Maths</option>
            <option value="Science">Science</option>
            <option value="Basic Maths">English</option>
            <option value="Facts">Physics</option>
            <option value="Facts">Chemistry</option>
            <option value="Facts">Biology</option>
            <option value="Facts">GS & ES</option>
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
            <option value="1-3">1-4</option>
            <option value="4-6">5-7</option>
            <option value="9-10">8-10</option>
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

        {/* Video URL */}
        <div>
          <label className="block font-semibold mb-1">Video URL</label>
          <input
            type="url"
            name="videoUrl"
            placeholder="Enter video URL"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Submit Video
        </button>
      </form>
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

export default AddVideos;
