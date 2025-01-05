"use client";

import React, { useState, useEffect, Suspense } from "react";
import { fetchVideosBySubject, searchVideosBySubject, fetchVideosByGrade, searchVideosByGrade } from "@/app/lib/lib/videosSubject";
import { useSearchParams, useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

interface Video {
  video_id: string;
  title: string;
  description: string;
  source_url: string;
  tags: string;
  subject_id: string;
  grade_id: string;
}

const SubjectsPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSubject = searchParams.get("subject") || "S0001";
  const initialGrade = searchParams.get("grade") || "G0014";

  const [selectedSubject, setSelectedSubject] = useState<string>(initialSubject);
  const [selectedGrade, setSelectedGrade] = useState<string>(initialGrade);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [filterType, setFilterType] = useState<"subject" | "grade">("subject");

  const subjects = [
    { label: "Math", id: "S0001" },
    { label: "Science", id: "S0002" },
    { label: "English", id: "S0003" },
    { label: "Physics", id: "S0004" },
    { label: "Chemistry", id: "S0005" },
    { label: "Biology", id: "S0006" },
    { label: "GS & ES", id: "S0007" },
    { label: "Hindi", id: "S0008"},
  ];

  const grades = [
    { label: "Grades 1-4", id: "G0014" },
    { label: "Grades 5-7", id: "G0057" },
    { label: "Grades 8-10", id: "G0810" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      let fetchedVideos: Video[] = [];
  
      if (filterType === "subject") {
        if (searchQuery) {
          fetchedVideos = await searchVideosBySubject(selectedSubject, searchQuery);
        } else {
          fetchedVideos = await fetchVideosBySubject(selectedSubject);
        }
      } else if (filterType === "grade") {
        if (searchQuery) {
          fetchedVideos = await searchVideosByGrade(selectedGrade, searchQuery);
        } else {
          fetchedVideos = await fetchVideosByGrade(selectedGrade);
        }
      }
  
      // Sort videos based on numeric prefix
      fetchedVideos.sort((a, b) => {
        const extractPrefixNumber = (title: string) => {
          const match = title.match(/^(\d+)\./); // Extract the numeric prefix before "."
          return match ? parseInt(match[1], 10) : Number.MAX_SAFE_INTEGER; // Default large number if no prefix
        };
  
        const numA = extractPrefixNumber(a.title);
        const numB = extractPrefixNumber(b.title);
  
        if (numA !== numB) {
          return numA - numB; // Compare numeric prefixes
        }
        return a.title.localeCompare(b.title); // Fallback to alphabetical order
      });
  
      setVideos(fetchedVideos);
    };
  
    fetchData();
  }, [selectedSubject, selectedGrade, searchQuery, filterType]);
    

  const handleSubjectChange = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setFilterType("subject");
    router.push(`/Pages/Subjects?subject=${subjectId}`);
  };

  const handleGradeChange = (gradeId: string) => {
    setSelectedGrade(gradeId);
    setFilterType("grade");
    router.push(`/Pages/Subjects?grade=${gradeId}`);
  };

  const handlePlayVideo = (videoUrl: string) => {
    window.location.href = `/Pages/VideoPlayer?pageUrl=${encodeURIComponent(
      videoUrl
    )}`;
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Filter by</h2>
        <div className="mb-4 flex space-x-4 justify-center">
          <button
            onClick={() => setFilterType("subject")}
            className={`px-4 py-2 rounded border ${filterType === "subject" ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
          >
            Subject
          </button>
          <button
            onClick={() => setFilterType("grade")}
            className={`px-4 py-2 rounded border ${filterType === "grade" ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
          >
            Grade
          </button>
        </div>

        {/* Render subject or grade buttons based on the filter type */}
        {filterType === "subject" ? (
          <ul className="space-y-2">
            {subjects.map((subject) => (
              <li key={subject.id}>
                <button
                  onClick={() => handleSubjectChange(subject.id)}
                  className={`w-full px-4 py-2 text-left rounded border border-gray-400 hover:bg-blue-500 ${selectedSubject === subject.id ? "bg-blue-500" : ""}`}
                >
                  {subject.label}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="space-y-2">
            {grades.map((grade) => (
              <li key={grade.id}>
                <button
                  onClick={() => handleGradeChange(grade.id)}
                  className={`w-full px-4 py-2 text-left rounded border border-gray-400 hover:bg-blue-500 ${selectedGrade === grade.id ? "bg-blue-500" : ""}`}
                >
                  {grade.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : filterType === "subject"
            ? `Videos for ${subjects.find((s) => s.id === selectedSubject)?.label}`
            : `Videos for ${grades.find((g) => g.id === selectedGrade)?.label}`}
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
              <div key={video.video_id} className="p-4 rounded shadow hover:shadow-lg transition">
                <div className="w-full h-32 bg-white flex items-center justify-center rounded">
                  <p className="text-lg font-semibold text-center">{video.title}</p>
                </div>
                <div className="mt-2 h-16 overflow-y-auto text-sm text-inherit bg-inherit p-2 rounded">
                  {video.description}
                </div>
                <button
                  onClick={() => handlePlayVideo(video.source_url)}
                  className="inline-block mt-2 text-blue-400 hover:text-blue-300 underline items-center"
                >
                  <FontAwesomeIcon icon={faPlay} className="mr-2" /> Watch Video
                </button>
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

// Wrap in Suspense boundary at a higher level if you're using Suspense for async data
const SubjectsPageWithSuspense: React.FC = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SubjectsPage />
  </Suspense>
);

export default SubjectsPageWithSuspense;
