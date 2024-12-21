"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import { supabase } from "@/app/lib/lib/supabaseClient"; // Adjust according to your supabase client import
import VideoCard from "./components/VideoCard"; // Import VideoCard

const HomePage: React.FC = () => {
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null); // State to hold user data
  const router = useRouter(); // Initialize useRouter for navigation

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

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const handlePlayVideo = (videoId: string) => {
    setCurrentPlaying((prev) => (prev === videoId ? null : videoId));
  };

  // Redirect to login page if not authenticated
  const requireAuth = (callback: () => void) => {
    if (!user) {
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
      <main className="flex justify-center items-center p-4 bg-inherit">
        <div className="flex space-x-4">
          <VideoCard
            videoSrc="https://www.w3schools.com/html/movie.mp4"
            buttonText="Watch Videos"
            buttonAction={handleWatchVideosClick}
            videoId="video1"
            onPlay={handlePlayVideo}
            isPlaying={currentPlaying === "video1"}
            user={user} // Pass user directly to VideoCard
          />
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
