"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/lib/supabaseClient"; // Import supabase client
import ThemeSwitch from "./ThemeSwitch";

const Navbar: React.FC = () => {
  const [language, setLanguage] = useState("en");
  const [user, setUser] = useState<any>(null); // State to track the logged-in user
  const googleTranslateElementRef = useRef<HTMLDivElement | null>(null); // Define the ref
  const translateElementRef = useRef<any>(null); // Reference to the translate element instance

  useEffect(() => {
    // Check user session on mount
    const session = supabase.auth.getSession();
    setUser(session?.user);

    // Listen for changes in the user's authentication state
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user);
      }
    );

    const loadGoogleTranslate = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.onload = () => {
        window.googleTranslateElementInit = () => {
          const translateElement = new window.google.translate.TranslateElement(
            {
              pageLanguage: "en", // Default page language
              includedLanguages: "kn,en", // Supported languages (Kannada and English)
              layout:
                window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false, // Don't automatically display the dropdown
            },
            googleTranslateElementRef.current // Use the ref here
          );

          // Store the translate element instance for later use
          translateElementRef.current = translateElement;
        };
      };

      document.body.appendChild(script); // Append the script to load it
    };

    loadGoogleTranslate();

    return () => {
      authListener?.unsubscribe(); // Cleanup the listener
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null); // Reset user state after sign out
  };

  return (
    <div className="navbar bg-base-100 relative z-50">
      {/* Mobile View */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[60] mt-3 w-52 p-2 shadow">
            <li>
              <Link href="/">Home</Link>
            </li>
            {user && (
              <>
                <li>
                  <Link href="/Pages/Subjects">Subjects</Link>
                </li>
                <li>
                  <Link href="/Pages/Worksheets">Worksheets</Link>
                </li>
                <li>
                  <Link href="/Pages/Activities">Activities</Link>
                </li>
                <li>
                  <Link href="/Pages/Support">Support</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          SVSST
        </Link>
      </div>

      {/* Desktop View */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          {user && (
            <>
              <li>
                <Link href="/Pages/Subjects">Subjects</Link>
              </li>
              <li>
                <Link href="/Pages/Worksheets">Worksheets</Link>
              </li>
              <li>
                <Link href="/Pages/Activities">Activities</Link>
              </li>
              <li>
                <Link href="/Pages/Support">Support</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end flex items-center space-x-4">
        <ThemeSwitch /> {/* Always visible */}
        <div ref={googleTranslateElementRef}></div> {/* Always visible */}

        {user ? (
          <button onClick={handleSignOut} className="btn btn-primary">
            Sign Out
          </button>
        ) : (
          <Link href="/Pages/login" className="btn btn-primary">
            Login/Signup
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
