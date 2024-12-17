"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { subjectData } from "@/app/components/subjectData";

const SubjectsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get the initial tab from the query parameter or default to "basic-maths"
  const initialTab = searchParams.get("tab") || "basic-maths";
  const [selectedSubject, setSelectedSubject] = useState<string>(initialTab);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const subjects = [
    { label: "Basic Maths", id: "basic-maths" },
    { label: "English Grammar", id: "english-grammar" },
    { label: "Science", id: "science" },
    { label: "Facts", id: "facts" },
  ];

  // Combine all videos across subjects and filter by search query
  const allVideos = Object.values(subjectData).flat();
  const filteredVideos = allVideos.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter videos for the selected subject
  const videos = subjectData[selectedSubject] || [];

  // Update the selected subject when the URL changes
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setSelectedSubject(tab);
    }
  }, [searchParams]);

  // Handle sidebar tab selection
  const handleSubjectChange = (subjectId: string) => {
    if (subjectId !== selectedSubject) {
      setSelectedSubject(subjectId);
      router.push(`/Pages/Subjects?tab=${subjectId}`); // Update the URL to reflect the active tab
    }
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
                }`}>
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
            : `Videos for ${
                subjects.find((s) => s.id === selectedSubject)?.label
              }`}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchQuery ? (
            filteredVideos.length > 0 ? (
              filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="p-4 rounded shadow hover:shadow-lg transition">
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
                className="p-4 rounded shadow hover:shadow-lg transition">
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
            <p>No videos available for this subject.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubjectsPage;
