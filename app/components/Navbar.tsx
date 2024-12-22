"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/app/lib/lib/supabaseClient";
import ThemeSwitch from "./ThemeSwitch";

interface NavbarProps {
  setIsAuthenticated: (status: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState<any>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [accessType, setAccessType] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>("Profile");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const googleTranslateElementLoaded = useRef(false);
  const googleTranslateElementRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (data?.session) {
        setUser(data.session.user);
        setIsAuthenticated(true);

        const { data: userData } = await supabase
          .from("users")
          .select("role")
          .eq("id", data.session.user.id)
          .single();
        if (userData) {
          setUserRole(userData.role);
        }

        const { data: displayData } = await supabase
          .from("display_names")
          .select("display_name, access_type")
          .eq("UID", data.session.user.id)
          .single();
        if (displayData) {
          setDisplayName(displayData.display_name || "Profile");
          setAccessType(displayData.access_type || "normal");
        }
      } else {
        setUser(null);
        setUserRole(null);
        setAccessType(null);
        setIsAuthenticated(false);
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setIsAuthenticated(session?.user !== null);
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

  useEffect(() => {
    if (!googleTranslateElementLoaded.current) {
      const loadGoogleTranslate = () => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.onload = () => {
          window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: "en",
                includedLanguages: "kn,en",
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false,
              },
              googleTranslateElementRef.current
            );
          };
        };
        document.body.appendChild(script);
      };

      loadGoogleTranslate();
      googleTranslateElementLoaded.current = true;
    }
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    setAccessType(null);
    setDisplayName("Profile");
    setIsAuthenticated(false);
  };

  const toggleProfileDropdown = () => {
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <div className="navbar bg-base-100 relative z-50">
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

      <div className="navbar-end flex items-center space-x-4">
        <ThemeSwitch />
        <div ref={googleTranslateElementRef}></div>
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
