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
  const handleGetSupportClick = () => {
    router.push("Pages/Support");
    // You can add a redirection here, e.g., router.push("/Pages/Discussions");
  };

  return (
    <div>
      <main className="flex justify-center items-center p-4 bg-inherit">
        {/* Flex container to arrange cards side by side */}
        <div className="flex space-x-4">
          <VideoCard
            videoSrc="https://www.w3schools.com/html/movie.mp4" // Add your video URL
            buttonText="Watch Videos"
            buttonAction={handleWatchVideosClick} // Redirect to /Pages/Videos
            videoId="video1" // Unique video ID for identification
            onPlay={handlePlayVideo}
            isPlaying={currentPlaying === "video1"}
          />
          <VideoCard
            videoSrc="https://www.w3schools.com/html/movie.mp4" // Add your video URL
            buttonText="Get Support"
            buttonAction={handleGetSupportClick} // Placeholder for discussions
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
