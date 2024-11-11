"use client";

import React, { useState } from "react";
import Navbar from './components/Navbar';
import VideoCard from './components/VideoCard'; // Import VideoCard

const HomePage: React.FC = () => {
  // State to track the currently playing video
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);

  // Handle the video play/pause logic
  const handlePlayVideo = (videoId: string) => {
    // If the clicked video is already playing, toggle it
    setCurrentPlaying((prev) => (prev === videoId ? null : videoId));
  };

  const handleButtonClick = () => {
    console.log("Button was clicked!");
    // Your custom button action logic
  };

  return (
    <div>
      <Navbar />
      <main className="flex justify-center items-center p-4">
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
            buttonText="Learn More"
            buttonAction={handleButtonClick}
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
