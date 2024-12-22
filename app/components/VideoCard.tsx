"use client";

import React, { useRef, useState, useEffect } from "react";
import styles from "@/app/styles/VideoCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVolumeMute,
  faVolumeUp,
  faExpand,
} from "@fortawesome/free-solid-svg-icons";

interface VideoCardProps {
  videoSrc: string | undefined;
  buttonText: string;
  buttonAction: () => void;
  videoId: string;
  onPlay: (videoId: string) => void;
  isPlaying: boolean;
}

const VideoCard: React.FC<VideoCardProps> = ({
  videoSrc,
  buttonText,
  buttonAction,
  videoId,
  onPlay,
  isPlaying,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  // Toggle mute/unmute
  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted((prev) => !prev);
    }
  };

  // Handle progress bar changes
  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime =
        (videoRef.current.duration * parseFloat(event.target.value)) / 100;
      videoRef.current.currentTime = newTime;
      setProgress(parseFloat(event.target.value));
    }
  };

  // Update the progress bar
  const updateProgress = () => {
    if (videoRef.current) {
      const progressValue =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progressValue);
    }
  };

  // Interval for updating the progress bar
  useEffect(() => {
    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle play/pause for the video
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Handle fullscreen
  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if ((videoRef.current as any).webkitRequestFullscreen) {
        (videoRef.current as any).webkitRequestFullscreen(); // Safari
      } else if ((videoRef.current as any).mozRequestFullScreen) {
        (videoRef.current as any).mozRequestFullScreen(); // Firefox
      } else if ((videoRef.current as any).msRequestFullscreen) {
        (videoRef.current as any).msRequestFullscreen(); // IE/Edge
      }
    }
  };

  return (
    <div
      className="border p-4 rounded-lg shadow-lg m-5"
      style={{ maxWidth: "100%" }}>
      {/* Video Section */}
      <div
        className="relative mb-4"
        style={{
          aspectRatio: "16/9", // Adjust to match the video ratio
          width: "100%", // Width dynamically adjusts to aspect ratio
          height: "200px", // Fixed height
        }}>
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-contain rounded-lg"
          muted={isMuted}
          onClick={() => onPlay(videoId)}
        />
        {/* Fullscreen Icon */}
        <button
          className="absolute bottom-2 right-2 bg-black bg-opacity-50 p-2 rounded-full text-white"
          onClick={handleFullScreen}>
          <FontAwesomeIcon icon={faExpand} />
        </button>
      </div>

      {/* Custom Video Controls */}
      <div className="flex items-center justify-between space-x-2 mb-4">
        <input
          type="range"
          value={progress}
          onChange={handleProgressChange}
          max="100"
          className="w-full"
        />
        <button onClick={handleMute}>
          <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
        </button>
      </div>

      {/* Button Section */}
      <div className="text-center">
        <button
          onClick={buttonAction}
          className="px-4 py-2 border border-[#779ecb] text-[#779ecb] rounded-full hover:bg-[#779ecb] hover:text-white transition-colors">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
