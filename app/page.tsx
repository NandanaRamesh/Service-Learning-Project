"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import { supabase } from "@/app/lib/lib/supabaseClient"; // Adjust according to your supabase client import
import VideoCard from "./components/VideoCard"; // Import VideoCard

const HomePage: React.FC = () => {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // State for authentication
  const router = useRouter(); // Initialize useRouter for navigation

  useEffect(() => {
    const checkAuth = async () => {
      const user = await supabase.auth.getUser(); // Get the current user from Supabase
      setIsAuthenticated(user.data !== null); // Check if user is authenticated
    };
    checkAuth();
  }, []);

  const handlePlayVideo = (videoId: string) => {
    setCurrentPlaying((prev) => (prev === videoId ? null : videoId));
  };

  // Redirect to /Pages/Videos
  const handleWatchVideosClick = () => {
    if (!isAuthenticated) {
      router.push("/Pages/login"); // Redirect to login page if not authenticated
      return; // Stop further execution if not authenticated
    }
    router.push("/Pages/Videos"); // Redirect to the videos page if authenticated
  };

  // Example button action for "Get Support"
  const handleGetSupportClick = () => {
    if (!isAuthenticated) {
      router.push("/Pages/login"); // Redirect to login page if not authenticated
      return; // Stop further execution if not authenticated
    }
    router.push("/Pages/Support"); // Redirect to the support page if authenticated
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
