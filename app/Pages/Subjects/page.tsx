"use client";

import React, { useState, useEffect } from "react";
import { fetchVideosBySubject, searchVideosBySubject } from "@/app/lib/lib/videosSubject";
import { useSearchParams, useRouter } from "next/navigation";

interface Video {
  video_id: string;
  title: string;
  description: string;
  source_url: string;
  tags: string;
  subject_id: string;
}

const SubjectsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSubject = searchParams.get("subject") || "S0001"; // Default to "Math" (S0001)
  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);

  const subjects = [
    { label: "Math", id: "S0001" },
    { label: "Science", id: "S0002" },
    { label: "English", id: "S0003" },
    { label: "Physics", id: "S0004" },
    { label: "Chemistry", id: "S0005" },
    { label: "Biology", id: "S0006" },
    { label: "GS & ES", id: "S0007" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery) {
        const searchResults = await searchVideosBySubject(selectedSubject, searchQuery);
        setVideos(searchResults);
      } else {
        const videosBySubject = await fetchVideosBySubject(selectedSubject);
        setVideos(videosBySubject);
      }
    };

    fetchData();
  }, [selectedSubject, searchQuery]);

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubject(subjectId);
    router.push(`/Pages/Subjects?subject=${subjectId}`);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Subjects</h2>
        <ul className="space-y-2">
          {subjects.map((subject) => (
            <li key={subject.id}>
              <button
                onClick={() => handleSubjectChange(subject.id)}
                className={`w-full px-4 py-2 text-left rounded border border-gray-400 hover:bg-blue-500 ${
                  selectedSubject === subject.id ? "bg-blue-500" : ""
                }`}
              >
                {subject.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : `Videos for ${subjects.find((s) => s.id === selectedSubject)?.label}`}
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

        {/* Videos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.length > 0 ? (
            videos.map((video) => (
              <div
                key={video.video_id}
                className="p-4 rounded shadow hover:shadow-lg transition"
              >
                {/* Dynamically generated thumbnail */}
                <div className="w-full h-32 bg-white flex items-center justify-center rounded">
                  <p className="text-lg font-semibold text-center">{video.title}</p>
                </div>
                <a
                  href={video.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-400 hover:text-blue-300 underline"
                >
                  Watch Video
                </a>
              </div>
            ))
          ) : (
            <p>No videos found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectsPage;
