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
        videoSrc="video1.mp4"
        buttonText="Action 1"
        buttonAction={() => alert('Video 1 Action')}
        videoId="video1"
        onPlay={handlePlayVideo}
        isPlaying={currentPlaying === 'video1'}
      />
      <VideoCard
        videoSrc="video2.mp4"
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
