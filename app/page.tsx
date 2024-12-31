"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/lib/lib/supabaseClient";
import VideoCard from "./components/VideoCard";
import LoadingSpinner from "./components/LoadingSpinner";

//new commit change

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
  const [isNeedLoginModalOpen, setIsNeedLoginModalOpen] = useState(false);
  const router = useRouter();

  // Fetch video URLs
  const fetchVideoUrls = async () => {
    try {
      setLoading((prev) => ({ ...prev, firstVideo: true }));
      const { data: firstVideoData, error: firstVideoError } =
        await supabase.storage
          .from("VideoCard")
          .createSignedUrl("VideoCard_Videos/videoCard_videos.mp4", 3600);

      setVideoUrls((prev) => ({
        ...prev,
        firstVideo: firstVideoError ? null : firstVideoData?.signedUrl || null,
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

  useEffect(() => {
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
      setIsNeedLoginModalOpen(true);
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
            <div className="w-300 h-300 rounded-lg shadow-lg flex justify-center items-center m-5">
              <LoadingSpinner />
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
            <div>
              <p>Error loading video. Please try again later.</p>
              <button onClick={fetchVideoUrls} className="btn btn-secondary">
                Retry
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-4">
          {loading.secondVideo ? (
            <div className="w-300 h-300 rounded-lg shadow-lg flex justify-center items-center">
              <LoadingSpinner />
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
            <div>
              <p>Error loading video. Please try again later.</p>
              <button onClick={fetchVideoUrls} className="btn btn-secondary">
                Retry
              </button>
            </div>
          )}
        </div>
      </main>
      {isNeedLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-lg bg-base-100 p-6 shadow-lg">
            <h2 className="text-lg font-bold">Login</h2>
            <p className="mt-2 text-gray-400">Login to view the content!</p>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setIsNeedLoginModalOpen(false)}
                className="btn">
                Cancel
              </button>
              <button
                onClick={() => router.push("/Pages/login")}
                className="btn btn-primary">
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
