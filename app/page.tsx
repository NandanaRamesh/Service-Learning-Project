"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import { supabase } from "@/app/lib/lib/supabaseClient"; // Adjust according to your supabase client import
import VideoCard from "./components/VideoCard"; // Import VideoCard

const HomePage: React.FC = () => {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); // State to hold user data
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // State to hold video URL
  const [loading, setLoading] = useState<boolean>(true); // Loading state for video
  const router = useRouter(); // Initialize useRouter for navigation

  useEffect(() => {
    // Fetch the URL for the first video
    const fetchFirstVideoUrl = async () => {
      try {
        console.log("Fetching video URL...");
        const { data: signedUrlData, error } = await supabase.storage
          .from("VideoCard") // Correct bucket name
          .createSignedUrl("VideoCard_Videos/videoCard_videos.mp4", 3600); // Path to the video

        if (error || !signedUrlData) {
          console.error(
            "Error generating signed URL:",
            error?.message || "No data returned"
          );
          setVideoUrl(null);
        } else {
          console.log(
            "Signed URL fetched successfully:",
            signedUrlData.signedUrl
          );
          setVideoUrl(signedUrlData.signedUrl);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFirstVideoUrl();
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null); // Set user state if authenticated
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null); // Update user state on auth changes
      }
    );
  }, []);

  const handlePlayVideo = (videoId: string) => {
    setCurrentPlaying((prev) => (prev === videoId ? null : videoId));
  };

  // Redirect to login page if not authenticated
  const requireAuth = (callback: () => void) => {
    if (!user) {
      alert("You need to log in first!");
      router.push("/Pages/login");
      return;
    }
    callback();
  };

  // Example action for "Watch Videos"
  const handleWatchVideosClick = () => {
    requireAuth(() => router.push("/Pages/Subjects"));
  };

  // Example action for "Get Support"
  const handleGetSupportClick = () => {
    requireAuth(() => router.push("/Pages/Support"));
  };

  return (
    <div>
      <main className="flex flex-col md:flex-row justify-center items-center p-4 bg-inherit">
        <div className="flex flex-col space-y-4 md:space-x-4">
          {loading ? (
            <p>Loading video, please wait...</p> // Placeholder while video URL is being fetched
          ) : videoUrl ? (
            <VideoCard
              videoSrc={videoUrl}
              buttonText="Watch Videos"
              buttonAction={handleWatchVideosClick}
              videoId="video1"
              onPlay={handlePlayVideo}
              isPlaying={currentPlaying === "video1"}
              user={user} // Pass user directly to VideoCard
            />
          ) : (
            <p>Error loading video. Please try again later.</p>
          )}
        </div>
        <div className="flex flex-col space-y-4">
          <VideoCard
            videoSrc="https://www.w3schools.com/html/movie.mp4"
            buttonText="Get Support"
            buttonAction={handleGetSupportClick}
            videoId="video2"
            onPlay={handlePlayVideo}
            isPlaying={currentPlaying === "video2"}
            user={user} // Pass user directly to VideoCard
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
