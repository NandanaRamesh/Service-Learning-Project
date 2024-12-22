"use client"; // Add this line at the top of the file

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/lib/supabaseClient";
import VideoCard from "./components/VideoCard";
import LoadingSpinner from "./components/LoadingSpinner"; // Import the spinner

const HomePage: React.FC = () => {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const router = useRouter();

  // Fetch the first video URL
  useEffect(() => {
    const fetchFirstVideoUrl = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const { data: signedUrlData, error } = await supabase.storage
          .from("VideoCard")
          .createSignedUrl("VideoCard_Videos/videoCard_videos.mp4", 3600);

        if (error || !signedUrlData) {
          console.error(
            "Error generating signed URL:",
            error?.message || "No data returned"
          );
          setVideoUrl(null);
        } else {
          setVideoUrl(signedUrlData.signedUrl);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false); // Set loading to false after URL is fetched or error occurs
      }
    };

    fetchFirstVideoUrl();
  }, []); // Empty dependency array ensures it only runs once on mount

  // Fetch user session
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data?.session?.user || null);
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );
  }, []);

  const handlePlayVideo = (videoId: string) => {
    setCurrentPlaying((prev) => (prev === videoId ? null : videoId));
  };

  const requireAuth = (callback: () => void) => {
    if (!user) {
      alert("You need to log in first!");
      router.push("/Pages/login");
      return;
    }
    callback();
  };

  const handleWatchVideosClick = () => {
    requireAuth(() => router.push("/Pages/Subjects"));
  };

  const handleGetSupportClick = () => {
    requireAuth(() => router.push("/Pages/Support"));
  };

  return (
    <div>
      <main className="flex flex-col md:flex-row justify-center items-center p-4 bg-inherit">
        <div className="flex flex-col space-y-4 md:space-x-4">
          {loading ? (
            <div className="w-300 h-300 rounded-lg shadow-lg flex justify-center items-center">
              <LoadingSpinner /> {/* Display loading spinner */}
            </div>
          ) : videoUrl ? (
            <VideoCard
              videoSrc={videoUrl}
              buttonText="Watch Videos"
              buttonAction={handleWatchVideosClick}
              videoId="video1"
              onPlay={handlePlayVideo}
              isPlaying={currentPlaying === "video1"}
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
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
