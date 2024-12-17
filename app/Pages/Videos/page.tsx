"use client";

import React, { useState } from "react";
import { videosData } from "@/app/components/videosData";

const VideoPage: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<string>("1-3");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const grades = [
    { label: "Grades 1-3", id: "1-3" },
    { label: "Grades 4-6", id: "4-6" },
    { label: "Grades 7-8", id: "7-8" },
    { label: "Grades 9-10", id: "9-10" },
    { label: "Grades 11-12", id: "11-12" },
  ];

  // Combine all videos across grades and filter by search query
  const allVideos = Object.values(videosData).flat();
  const filteredVideos = allVideos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const videos = videosData[selectedGrade] || [];

  return (
    <div className="flex min-h-screen bg-inherit text-inherit">
      {/* Sidebar */}
      <div className="w-1/4 bg-inherit p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Grades</h2>
        <ul className="space-y-2">
          {grades.map((grade) => (
            <li key={grade.id}>
              <button
                onClick={() => setSelectedGrade(grade.id)}
                className={`w-full px-4 py-2 text-left rounded hover:bg-blue-500 ${
                  selectedGrade === grade.id ? "bg-blue-500" : "bg-gray-700"
                }`}>
                {grade.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-inherit">
        <h1 className="text-3xl font-bold mb-6">Videos for {selectedGrade}</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchQuery ? (
            filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-32 object-cover rounded"
                  />
                  <h2 className="text-lg font-semibold mt-2">{video.title}</h2>
                  <a
                    href={video.videoSrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-400 hover:text-blue-300 underline">
                    Watch Video
                  </a>
                </div>
              ))
            ) : (
              <p>No videos found for the search query.</p>
            )
          ) : videos.length > 0 ? (
            videos.map((video) => (
              <div
                key={video.id}
                className="bg-gray-800 p-4 rounded shadow hover:shadow-lg transition">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-32 object-cover rounded"
                />
                <h2 className="text-lg font-semibold mt-2">{video.title}</h2>
                <a
                  href={video.videoSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-400 hover:text-blue-300 underline">
                  Watch Video
                </a>
              </div>
            ))
          ) : (
            <p>No videos available for this grade.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
