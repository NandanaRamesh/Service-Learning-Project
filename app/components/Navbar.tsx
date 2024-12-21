"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/lib/supabaseClient"; // Import supabase client
import ThemeSwitch from "./ThemeSwitch";

interface NavbarProps {
  setIsAuthenticated: (status: boolean) => void; // Accept setIsAuthenticated as a prop
}

const Navbar: React.FC<NavbarProps> = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null); // To store user role
  const [accessType, setAccessType] = useState<string | null>(null); // To store access type (normal/admin)
  const [displayName, setDisplayName] = useState<string>("Profile"); // Store display name
  const [isProfileOpen, setIsProfileOpen] = useState(false); // To handle profile dropdown
  const googleTranslateElementRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Ref for dropdown element

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setUser(data.session.user);
        setIsAuthenticated(true); // Set the authentication status to true

        // Fetch user role from the database
        const { data: userData, error: userError } = await supabase
          .from("users") // Assuming the users table contains a `role` column
          .select("role")
          .eq("id", data.session.user.id)
          .single();

        if (userData) {
          setUserRole(userData.role); // Set user role
        }

        // Fetch access type and display name from the 'display_names' table
        const { data: displayData, error: displayError } = await supabase
          .from("display_names")
          .select("display_name, access_type")
          .eq("UID", data.session.user.id)
          .single();

        if (displayError) {
          console.error("Failed to fetch display name:", displayError);
        } else {
          setDisplayName(displayData?.display_name || "Profile"); // Set display name
          setAccessType(displayData?.access_type || "normal"); // Set access type
        }
      } else {
        setUser(null);
        setUserRole(null);
        setAccessType(null);
        setIsAuthenticated(false); // Set the authentication status to false
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setIsAuthenticated(session?.user !== null); // Update the authentication status on auth state change
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [setIsAuthenticated]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    setAccessType(null);
    setDisplayName("Profile"); // Reset the display name on sign-out
    setIsAuthenticated(false); // Update authentication status on sign-out
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen((prev) => !prev);
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
              stroke="currentColor"
            >
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[60] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            {user && (
              <>
                <li>
                  <Link href="/Pages/Subjects">Videos</Link>
                </li>
                <li>
                  <Link href="/Pages/Activities">Activities</Link>
                </li>
                <li>
                  <Link href="/Pages/Support">Support</Link>
                </li>
                {accessType === "admin" && (
                  <li>
                    <Link href="/admin/actions">Admin Actions</Link>
                  </li>
                )}
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
                <Link href="/Pages/Subjects">Videos</Link>
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
          <div className="relative" ref={dropdownRef}>
            <button onClick={toggleProfileDropdown} className="btn btn-primary">
              {displayName}
            </button>
            {isProfileOpen && (
              <ul className="dropdown-content bg-base-100 rounded-box shadow-lg mt-2 absolute right-0 w-48 p-4 border border-gray-300">
                <li>
                  <Link href="/profile/settings">Profile Settings</Link>
                </li>
                {accessType === "admin" && (
                  <li>
                    <Link href="/Pages/Admin">Admin Actions</Link>
                  </li>
                )}
                <li>
                  <button onClick={handleSignOut} className="w-full text-left">
                    Sign Out
                  </button>
                </li>
              </ul>
            )}
          </div>
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
