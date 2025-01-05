"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EmbedViewer: React.FC = () => {
  const router = useRouter();
  const [iframeContent, setIframeContent] = useState<string | null>(null);

  const extractIframeSrc = (iframeHtml: string): string | null => {
    try {
      const match = iframeHtml.match(/<iframe[^>]*src="([^"]+)"[^>]*>/i);
      return match ? match[1] : null;
    } catch {
      return null; // Gracefully handle invalid input
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const embedCode = searchParams.get("embedCode");

    if (!embedCode) {
      router.push("/Pages/Activities"); // Redirect if missing embed code
      return;
    }

    // Check if it's a valid URL
    try {
      new URL(embedCode);
      setIframeContent(embedCode);
    } catch {
      // If not a valid URL, try to extract the iframe src
      const iframeSrc = extractIframeSrc(embedCode);
      if (iframeSrc && iframeSrc.startsWith("http")) {
        setIframeContent(iframeSrc);
      } else {
        router.push("/Pages/Activities"); // Redirect if invalid embed code
      }
    }
  }, [router]);

  if (!iframeContent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Invalid or missing resource. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center bg-inherit p-4">
      <iframe
        src={iframeContent}
        className="rounded-lg shadow-md"
        style={{
          border: "none",
          width: "100%",
          height: "90vh",
          maxWidth: "1200px", // Optional: Limit max width for readability
          maxHeight: "90vh", // Use most of the viewport height
        }}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default EmbedViewer;
