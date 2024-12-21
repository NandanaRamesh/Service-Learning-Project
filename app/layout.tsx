// layout.tsx (Client Component)
"use client";  // This directive marks the component as a client component

import { useState } from "react"; // Import useState to manage authentication state
import localFont from "next/font/local";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // State to manage authentication status

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased bg-inherit">
        {/* Pass setIsAuthenticated as a prop to Navbar */}
        <Navbar setIsAuthenticated={setIsAuthenticated} />
        <main className="flex-grow bg-inherit color-inherit">{children}</main>
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
