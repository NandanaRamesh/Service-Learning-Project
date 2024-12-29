"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

// VideoPlayerPage Component
const VideoPlayerPage: React.FC = () => {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("pageUrl");

  // Ensure that videoUrl is not null or undefined before proceeding
  if (!videoUrl) {
    return <p className="text-white text-center">Invalid or missing video URL.</p>;
  }

  // Extract the YouTube video ID for regular videos, Shorts, and Live
  const videoIdMatch = videoUrl.match(
    /(?:v=|\/embed\/|\/\d+\/|\/vi\/|\/v\/|\/e\/|watch\?v=|&v=|youtu\.be\/)([^#&?]*)|(?:shorts\/|live\/)([^#?&]*)/
  );

  // The videoId can be in the first or second capturing group, depending on the type of URL
  const videoId = videoIdMatch ? videoIdMatch[1] || videoIdMatch[2] : null;

  // Create the embed URL based on the type of video (regular, shorts, or live)
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  if (!embedUrl) {
    return <p className="text-white text-center">Invalid or unsupported video URL.</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div
        className="relative"
        style={{
          width: "800px", // Fixed width
          height: "450px", // Fixed height (16:9 ratio)
        }}
      >
        <iframe
          src={embedUrl}
          title="Video Player"
          allow="autoplay; fullscreen"
          allowFullScreen
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />
      </div>
    </div>
  );
};

// Wrapper Component to handle Suspense
const VideoPlayerWrapper: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideoPlayerPage />
    </Suspense>
  );
};

export default VideoPlayerWrapper;
