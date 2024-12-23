"use client"; // Add this line at the top of the file

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/lib/supabaseClient";
import VideoCard from "./components/VideoCard";
import LoadingSpinner from "./components/LoadingSpinner"; // Import the spinner

const HomePage: React.FC = () => {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [videoUrls, setVideoUrls] = useState<{ [key: string]: string | null }>({
    firstVideo: null,
    secondVideo: null,
  });
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    firstVideo: true,
    secondVideo: true,
  });
  const router = useRouter();

  // Fetch video URLs
  useEffect(() => {
    const fetchVideoUrls = async () => {
      try {
        setLoading((prev) => ({ ...prev, firstVideo: true }));
        const { data: firstVideoData, error: firstVideoError } =
          await supabase.storage
            .from("VideoCard")
            .createSignedUrl("VideoCard_Videos/videoCard_videos.mp4", 3600);

        setVideoUrls((prev) => ({
          ...prev,
          firstVideo: firstVideoError
            ? null
            : firstVideoData?.signedUrl || null,
        }));

        setLoading((prev) => ({ ...prev, secondVideo: true }));
        const { data: secondVideoData, error: secondVideoError } =
          await supabase.storage
            .from("VideoCard")
            .createSignedUrl("VideoCard_Videos/videoCard_support.mp4", 3600);

        setVideoUrls((prev) => ({
          ...prev,
          secondVideo: secondVideoError
            ? null
            : secondVideoData?.signedUrl || null,
        }));
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading((prev) => ({ firstVideo: false, secondVideo: false }));
      }
    };

    fetchVideoUrls();
  }, []);

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
          {loading.firstVideo ? (
            <div className="w-300 h-300 rounded-lg shadow-lg flex justify-center items-center">
              <LoadingSpinner /> {/* Display loading spinner */}
            </div>
          ) : videoUrls.firstVideo ? (
            <VideoCard
              videoSrc={videoUrls.firstVideo}
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
          {loading.secondVideo ? (
            <div className="w-300 h-300 rounded-lg shadow-lg flex justify-center items-center">
              <LoadingSpinner /> {/* Display loading spinner */}
            </div>
          ) : videoUrls.secondVideo ? (
            <VideoCard
              videoSrc={videoUrls.secondVideo}
              buttonText="Get Support"
              buttonAction={handleGetSupportClick}
              videoId="video2"
              onPlay={handlePlayVideo}
              isPlaying={currentPlaying === "video2"}
            />
          ) : (
            <p>Error loading video. Please try again later.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
