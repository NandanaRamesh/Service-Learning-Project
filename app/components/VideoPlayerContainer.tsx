"use client";

import React, { useState } from 'react';
import VideoCard from './VideoCard';

const VideoPlayerContainer: React.FC = () => {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);

  const handlePlayVideo = (videoId: string) => {
    // Set the current playing video ID when clicked
    setCurrentPlaying(videoId);
  };

  return (
    <div className="flex flex-wrap space-x-4">
      <VideoCard
        key={'https://epmrhvlgnzutggisqloi.supabase.co/storage/v1/object/public/Video%20Collection/Prototype%20Video.mp4?t=2024-11-11T10%3A09%3A54.325Z'}  // This will force React to treat each video as a unique component
        videoSrc="https://epmrhvlgnzutggisqloi.supabase.co/storage/v1/object/public/Video%20Collection/Prototype%20Video.mp4?t=2024-11-11T10%3A09%3A54.325Z"
        buttonText="Action 1"
        buttonAction={() => alert('Video 1 Action')}
        videoId="video1"
        onPlay={handlePlayVideo}
        isPlaying={currentPlaying === 'video1'}
/>
      <VideoCard
        videoSrc="https://epmrhvlgnzutggisqloi.supabase.co/storage/v1/object/public/Video%20Collection/Prototype%20Video.mp4?t=2024-11-11T10%3A09%3A54.325Z.mp4"
        buttonText="Action 2"
        buttonAction={() => alert('Video 2 Action')}
        videoId="video2"
        onPlay={handlePlayVideo}
        isPlaying={currentPlaying === 'video2'}
      />
      {/* Add more VideoCards as needed */}
    </div>
  );
};

export default VideoPlayerContainer;
