"use client";

import React, { useState } from "react";

const AddWorksheets: React.FC = () => {
  const [formData, setFormData] = useState({
    subject: "",
    grade: "",
    worksheetFile: null,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Worksheet submitted successfully!");
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Add New Worksheet</h1>
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow-md flex flex-col gap-4">
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
            <option value="History">History</option>
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
            <option value="7-9">7-9</option>
            <option value="10-12">10-12</option>
          </select>
        </div>

        {/* Worksheet File */}
        <div>
          <label className="block font-semibold mb-1">Worksheet File</label>
          <input
            type="file"
            name="worksheetFile"
            accept=".pdf,.doc,.docx,.ppt,.txt"
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Submit Worksheet
        </button>
      </form>
    </div>
  );
};

export default AddWorksheets;
