"use client";

import React, { useState } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/lib/supabaseClient";

const AddVideos: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    grade: "",
    description: "",
    tags: "",
    videoUrl: "",
  });

  const [modalOpen, setModalOpen] = useState(false); // Confirmation Modal State
  const [successModalOpen, setSuccessModalOpen] = useState(false); // Success Modal State
  const [error, setError] = useState(""); // Error Message State

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

    // Check for empty required fields
    if (!formData.title || !formData.subject || !formData.videoUrl) {
      setError("Please fill out all required fields.");
      return;
    }

    setError("");
    setModalOpen(true); // Open confirmation modal
  };

  const confirmSubmission = async () => {
    try {
      // Get the latest video ID
      const { data: lastVideo, error: fetchError } = await supabase
        .from("Video Data")
        .select("video_id")
        .order("video_id", { ascending: false })
        .limit(1)
        .single();

      if (fetchError) throw fetchError;

      const lastVideoId = lastVideo?.video_id || "V00000";
      const newVideoId = `V${(parseInt(lastVideoId.slice(1)) + 1)
        .toString()
        .padStart(5, "0")}`;

      // Map subject and grade to their corresponding codes
      const subjectCodes: { [key: string]: string } = {
        Maths: "S0001",
        Science: "S0002",
        English: "S0003",
        Physics: "S0004",
        Chemistry: "S0005",
        Biology: "S0006",
        "GS & ES": "S0007",
        Hindi: "S0008",
      };

      const gradeCodes: { [key: string]: string } = {
        "1-4": "G0014",
        "5-7": "G0057",
        "8-10": "G0810",
      };

      const subjectId = subjectCodes[formData.subject] || null;
      const gradeId = gradeCodes[formData.grade] || null;

      // Insert data into Supabase table
      const { error: insertError } = await supabase.from("Video Data").insert({
        video_id: newVideoId,
        title: formData.title,
        description: formData.description,
        source_url: formData.videoUrl,
        subject_id: subjectId,
        grade_id: gradeId,
        tags: formData.tags,
      });

      if (insertError) throw insertError;

      setModalOpen(false); // Close confirmation modal
      setSuccessModalOpen(true); // Open success modal
    } catch (err: any) {
      setError(err.message || "An error occurred while submitting the video.");
      setModalOpen(false);
    }
  };

  const cancelSubmission = () => {
    setModalOpen(false); // Close modal without submitting
  };

  const closeSuccessModal = () => {
    setSuccessModalOpen(false); // Close success modal
  };

  // Confirmation Modal Component
  const ConfirmationModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-4/5 max-w-md">
        <h2 className="text-xl font-bold mb-4">Confirm Submission</h2>
        <p>Are you sure you want to submit this video?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            onClick={cancelSubmission}>
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={confirmSubmission}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );

  // Success Modal Component
  const SuccessModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-4/5 max-w-md">
        <h2 className="text-xl font-bold mb-4 text-green-600">Success!</h2>
        <p>Video submitted successfully!</p>
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={closeSuccessModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen">
      {/* Modals */}
      {modalOpen && <ConfirmationModal />}
      {successModalOpen && <SuccessModal />}

      <h1 className="text-3xl font-bold mb-6">Add New Video</h1>
      {error && (
        <p className="text-red-600 font-semibold mb-4">{error}</p>
      )}
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
            <option value="Maths">Maths</option>
            <option value="Science">Science</option>
            <option value="English">English</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="GS & ES">GS & ES</option>
          </select>
        </div>

        {/* Grade */}
        <div>
          <label className="block font-semibold mb-1">Grade (Optional)</label>
          <select
            name="grade"
            onChange={handleChange}
            className="w-full p-2 border rounded">
            <option value="">Select Grade</option>
            <option value="1-4">1-4</option>
            <option value="5-7">5-7</option>
            <option value="8-10">8-10</option>
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
