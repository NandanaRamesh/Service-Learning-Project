"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import VideoCard from "./components/VideoCard"; // Import VideoCard

const HomePage: React.FC = () => {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const router = useRouter(); // Initialize useRouter for navigation

  const handlePlayVideo = (videoId: string) => {
    setCurrentPlaying((prev) => (prev === videoId ? null : videoId));
  };

  // Redirect to /Pages/Videos
  const handleWatchVideosClick = () => {
    router.push("Pages/Videos");
  };

  // Example button action for "Join Discussions"
  const handleJoinDiscussionsClick = () => {
    console.log("Navigating to discussions...");
    // You can add a redirection here, e.g., router.push("/Pages/Discussions");
  };

  return (
    <div>
      <main className="flex justify-center items-center p-4 bg-gray-900">
        {/* Flex container to arrange cards side by side */}
        <div className="flex space-x-4">
          <VideoCard
            videoSrc="https://epmrhvlgnzutggisqloi.supabase.co/storage/v1/object/public/Video%20Collection/Prototype%20Video.mp4?t=2024-11-11T10%3A09%3A54.325Z.mp4" // Add your video URL
            buttonText="Learn More"
            buttonAction={handleButtonClick}
            videoId="video1" // Unique video ID for identification
            onPlay={handlePlayVideo}
            isPlaying={currentPlaying === "video1"}
          />
          <VideoCard
            videoSrc="https://www.w3schools.com/html/movie.mp4" // Add your video URL
            buttonText="Join Discussions"
            buttonAction={handleJoinDiscussionsClick} // Placeholder for discussions
            videoId="video2" // Unique video ID for identification
            onPlay={handlePlayVideo}
            isPlaying={currentPlaying === "video2"}
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
