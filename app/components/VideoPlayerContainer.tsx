"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from "@/app/lib/lib/supabaseClient"; // Import your supabase client
import VideoCard from './VideoCard';

const VideoPlayerContainer: React.FC = () => {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if the user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const user = await supabase.auth.getUser(); // Get the current user from Supabase
      setIsAuthenticated(user.data !== null); // Update authentication status
    };
    checkAuth();
  }, []);

  const handlePlayVideo = (videoId: string) => {
    // Set the current playing video ID when clicked
    setCurrentPlaying(videoId);
  };

  // Action for Video 1, only if authenticated
  const handleVideo1Action = () => {
    if (!isAuthenticated) {
      alert('Please log in to watch the video!');
      return;
    }
    alert('Video 1 Action');
  };

  // Action for Video 2, only if authenticated
  const handleVideo2Action = () => {
    if (!isAuthenticated) {
      alert('Please log in to watch the video!');
      return;
    }
    alert('Video 2 Action');
  };

  return (
    <div className="flex flex-wrap space-x-4">
      <VideoCard
        key={'https://epmrhvlgnzutggisqloi.supabase.co/storage/v1/object/public/Video%20Collection/Prototype%20Video.mp4?t=2024-11-11T10%3A09%3A54.325Z'}  // This will force React to treat each video as a unique component
        videoSrc="https://epmrhvlgnzutggisqloi.supabase.co/storage/v1/object/public/Video%20Collection/Prototype%20Video.mp4?t=2024-11-11T10%3A09%3A54.325Z"
        buttonText="Action 1"
        buttonAction={handleVideo1Action} // Only fire action if authenticated
        videoId="video1"
        onPlay={handlePlayVideo}
        isPlaying={currentPlaying === 'video1'}
      />
      <VideoCard
        videoSrc="https://epmrhvlgnzutggisqloi.supabase.co/storage/v1/object/public/Video%20Collection/Prototype%20Video.mp4?t=2024-11-11T10%3A09%3A54.325Z.mp4"
        buttonText="Action 2"
        buttonAction={handleVideo2Action} // Only fire action if authenticated
        videoId="video2"
        onPlay={handlePlayVideo}
        isPlaying={currentPlaying === 'video2'}
      />
      {/* Add more VideoCards as needed */}
    </div>
  );
};

export default VideoPlayerContainer;
