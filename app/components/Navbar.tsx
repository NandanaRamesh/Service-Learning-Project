"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

const Navbar: React.FC = () => {
  const [language, setLanguage] = useState("en");
  const googleTranslateElementRef = useRef<HTMLDivElement | null>(null); // Define the ref
  const translateElementRef = useRef<any>(null); // Reference to the translate element instance

  useEffect(() => {
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
  }, []);

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
            <li tabIndex={0}>
              <details>
                <summary>Subjects</summary>
                <ul className="p-2">
                  <li>
                    <Link href="#">Basic Maths</Link>
                  </li>
                  <li>
                    <Link href="#">English Grammar</Link>
                  </li>
                  <li>
                    <Link href="#">Science</Link>
                  </li>
                  <li>
                    <Link href="#">Facts</Link>
                  </li>
                  <li>
                    <Link href="#">Arts & Crafts</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Worksheets</summary>
                <ul className="p-2">
                  <li>
                    <Link href="#">Maths</Link>
                  </li>
                  <li>
                    <Link href="#">Science</Link>
                  </li>
                  <li>
                    <Link href="#">English</Link>
                  </li>
                  <li>
                    <Link href="#">Kannada</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Activities</summary>
                <ul className="p-2">
                  <li>
                    <Link href="#">Sample 1</Link>
                  </li>
                  <li>
                    <Link href="#">Sample 2</Link>
                  </li>
                  <li>
                    <Link href="#">Sample 3</Link>
                  </li>
                  <li>
                    <Link href="#">Sample 4</Link>
                  </li>
                </ul>
              </details>
            </li>
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
          <li className="group relative">
            <Link href="/Pages/Subjects">Subjects</Link>
            <ul className="absolute left-0 top-full hidden group-hover:block bg-base-100 p-2 shadow rounded-box z-[100]">
              <li>
                <Link href="/Pages/Subjects?tab=english-grammar">
                  English Grammar
                </Link>
              </li>
              <li>
                <Link href="/Pages/Subjects?tab=science">Science</Link>
              </li>
              <li>
                <Link href="/Pages/Subjects?tab=basic-maths">Basic Maths</Link>
              </li>
              <li>
                <Link href="/Pages/Subjects?tab=facts">Facts</Link>
              </li>
            </ul>
          </li>
          <li className="group relative">
            <Link href="/Pages/Worksheets">Worksheets</Link>
            <ul className="absolute left-0 top-full hidden group-hover:block bg-base-100 p-2 shadow rounded-box z-[100]">
              <li>
                <Link href="/Pages/Worksheets?tab=maths">Maths</Link>
              </li>
              <li>
                <Link href="/Pages/Worksheets?tab=science">Science</Link>
              </li>
              <li>
                <Link href="/Pages/Worksheets?tab=english">English</Link>
              </li>
              <li>
                <Link href="/Pages/Worksheets?tab=kannada">Kannada</Link>
              </li>
            </ul>
          </li>
          <li className="group relative">
            <Link href="/Pages/Activities">Activities</Link>
            <ul className="absolute left-0 top-full hidden group-hover:block bg-base-100 p-2 shadow rounded-box z-[100]">
              <li>
                <Link href="/Pages/Activities?tab=crafts">Crafts</Link>
              </li>
              <li>
                <Link href="/Pages/Activities?tab=arts">Arts</Link>
              </li>
              <li>
                <Link href="/Pages/Activities?tab=games">Games</Link>
              </li>
              <li>
                <Link href="/Pages/Activities?tab=edutainment">Edutainment</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="/Pages/Support">Support</Link>
          </li>
        </ul>
      </div>

      {/* Right Side */}
      <div className="navbar-end flex items-center space-x-4">
        <Link href="/Pages/login" className="btn btn-primary">
          Login
        </Link>
        <ThemeSwitch />
      </div>
      {/* Google Translate Widget */}
      <div ref={googleTranslateElementRef}></div>
    </div>
  );
};

export default Navbar;