import React, { useRef, useState, useEffect } from 'react';

interface VideoCardProps {
  videoSrc: string;
  buttonText: string;
  buttonAction: () => void;
  videoId: string;
  onPlay: (videoId: string) => void;
  isPlaying: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoSrc, buttonText, buttonAction, videoId, onPlay, isPlaying }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Toggle mute/unmute
  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Handle progress bar change
  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = (videoRef.current.duration * parseFloat(event.target.value)) / 100;
      videoRef.current.currentTime = newTime;
      setProgress(parseFloat(event.target.value));
    }
  };

  // Update progress bar based on video current time
  const updateProgress = () => {
    if (videoRef.current) {
      const progressValue = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progressValue);
    }
  };

  // Update progress every second
  React.useEffect(() => {
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, []);

  // Play/Pause video when clicked, and ensure only one video is playing at a time
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle play event
  const handleClick = () => {
    onPlay(videoId);  // Notify parent to set the current video as playing
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg max-w-xs">
      {/* Video Section */}
      <div
        className="relative cursor-pointer mb-4"
        onClick={handleClick} // Play/Pause video on click
      >
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
            <path d="M12 3v18l-7-7h-4v-4h4l7-7z" /> // Speaker with sound (unmuted)
          )}
        </svg>
      </div>

      {/* Button Section */}
      <div className="text-center">
        <button
          onClick={buttonAction}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
