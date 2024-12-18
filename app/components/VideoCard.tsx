"use client";

import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import { supabase } from "@/app/lib/lib/supabaseClient"; // Adjust according to your supabase client import

interface VideoCardProps {
  videoSrc: string;
  buttonText: string;
  buttonAction: () => void;
  videoId: string;
  onPlay: (videoId: string) => void;
  isPlaying: boolean;
  isAuthenticated: boolean; // Accept isAuthenticated as a prop
}

const VideoCard: React.FC<VideoCardProps> = ({
  videoSrc,
  buttonText,
  buttonAction,
  videoId,
  onPlay,
  isPlaying,
  isAuthenticated // Receive it as a prop
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter(); // Use router for navigation

  // Check user authentication status on load
  useEffect(() => {
    const checkAuth = async () => {
      const user = await supabase.auth.getUser(); // Get the current user from Supabase
      if (user.data) {
        // User is authenticated
        console.log("User is authenticated:", user.data);
      } else {
        // No user, not authenticated
        console.log("User is not authenticated.");
      }
    };
    checkAuth(); // Check authentication on component mount
  }, []);

  // Toggle mute/unmute state
  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(prevState => !prevState);
    }
  };

  // Handle progress bar updates
  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = (videoRef.current.duration * parseFloat(event.target.value)) / 100;
      videoRef.current.currentTime = newTime;
      setProgress(parseFloat(event.target.value));
    }
  };

  // Update the progress bar based on the video current time
  const updateProgress = () => {
    if (videoRef.current) {
      const progressValue = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progressValue);
    }
  };

  // Update the progress every second
  useEffect(() => {
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  // Play/Pause video based on isPlaying state
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle video play/pause on video click
  const handleClick = () => {
    onPlay(videoId);
  };

  // Handle button action, checking for authentication first
  const handleButtonClick = () => {
    if (!isAuthenticated) {
      router.push("/Pages/login"); // Redirect to login if not authenticated
    } else {
      buttonAction(); // Proceed with the button action if authenticated
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg max-w-xs">
      {/* Video Section */}
      <div className="relative cursor-pointer mb-4" onClick={handleClick}>
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-56 object-cover rounded-lg"
          muted={isMuted}
        />
      </div>

      {/* Custom Video Controls */}
      <div className="flex items-center justify-between space-x-2 mb-4">
        {/* Progress Bar */}
        <input
          type="range"
          value={progress}
          onChange={handleProgressChange}
          max="100"
          className="w-full"
        />

        {/* Mute/Unmute Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="cursor-pointer w-6 h-6"
          onClick={handleMute}
        >
          {isMuted ? (
            <>
              <path d="M12 3v18l-7-7h-4v-4h4l7-7z" /> {/* Speaker icon */}
              <path d="M16 3l-6 6m0 0l-6-6m6 6l6 6" stroke="currentColor" /> {/* Slash icon */}
            </>
          ) : (
            <path d="M12 3v18l-7-7h-4v-4h4l7-7z" /> // Unmuted speaker icon
          )}
        </svg>
      </div>

      {/* Button Section */}
      <div className="text-center">
        <button
          onClick={handleButtonClick} // Handle button click with authentication check
          className="px-4 py-2 border border-[#779ecb] text-[#779ecb] rounded-full hover:bg-[#779ecb] hover:text-white transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
