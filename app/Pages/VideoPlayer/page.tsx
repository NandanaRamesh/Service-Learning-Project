"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

const VideoPlayerPage: React.FC = () => {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("pageUrl");

  // Extract the YouTube video ID and create the embed URL
  const videoIdMatch = videoUrl?.match(/(?:v=|\/embed\/|\/\d+\/|\/vi\/|\/v\/|\/e\/|watch\?v=|&v=|youtu\.be\/)([^#&?]*).*/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : null;

  if (!embedUrl) {
    return <p className="text-white text-center">Invalid or missing video URL.</p>;
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

export default VideoPlayerPage;
