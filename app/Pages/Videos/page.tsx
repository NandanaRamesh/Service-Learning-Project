"use client";

import React, { useState, useEffect } from "react";
import { fetchVideosByGrade } from "@/app/lib/lib/videoGrade";

interface Video {
  video_id: string;
  title: string;
  description: string;
  source_url: string;
  tags: string;
  grade_id: string;
}

const VideoPage: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<string>("G0014"); // Default grade_id
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Grade options
  const grades = [
    { label: "Grades 1-4", id: "G0014" },
    { label: "Grades 5-7", id: "G0057" },
    { label: "Grades 8-10", id: "G0810" },
  ];

  // Fetch videos when grade changes
  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      const data = await fetchVideosByGrade(selectedGrade);
      setVideos(data);
      setLoading(false);
    };

    loadVideos();
  }, [selectedGrade]);

  // Filter videos by search query
  const filteredVideos = videos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-inherit text-inherit">
      {/* Sidebar */}
      <div className="w-1/4 bg-inherit p-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-inherit">Grades</h2>
        <ul className="space-y-2">
          {grades.map((grade) => (
            <li key={grade.id}>
              <button
                onClick={() => setSelectedGrade(grade.id)}
                className={`w-full px-4 py-2 text-left rounded border border-gray-400 hover:bg-blue-500 ${
                  selectedGrade === grade.id ? "bg-blue-500" : ""
                }`}
              >
                {grade.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-inherit">
        <h1 className="text-3xl font-bold mb-6 text-inherit">
          Videos for {grades.find((grade) => grade.id === selectedGrade)?.label}
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Video Grid */}
        {loading ? (
          <p>Loading videos...</p>
        ) : filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredVideos.map((video) => (
              <div
                key={video.video_id}
                className="p-4 rounded shadow hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold mt-2 text-inherit">
                  {video.title}
                </h2>
                <p className="text-sm text-gray-500">{video.description}</p>
                <a
                  href={video.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-600 hover:underline"
                >
                  Watch Video
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
