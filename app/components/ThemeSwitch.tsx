"use client";

import React, { useState, useEffect } from "react";

const ThemeSwitch: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  useEffect(() => {
    // Check localStorage to get the saved theme
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      // If there's a saved theme, use it
      setIsDarkMode(savedTheme === "dark");
    } else {
      // Default to dark mode if nothing is saved in localStorage
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    // Apply the theme to the <html> element and body
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");

      // Update text color for dark mode
      document.documentElement.style.setProperty('--text-color', '#ededed');
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");

      // Update text color for light mode
      document.documentElement.style.setProperty('--text-color', '#171717');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <label className="flex cursor-pointer gap-2 items-center" onClick={toggleTheme}>
      {/* Dark theme icon (Visible on dark mode) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isDarkMode ? "block" : "hidden"} // Show in dark mode
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>

      {/* Light theme icon (Visible on light mode) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={isDarkMode ? "hidden" : "block"} // Show in light mode
      >
        <circle cx="12" cy="12" r="5" />
        <path
          d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
        />
      </svg>

      {/* Hidden checkbox for accessibility */}
      <input type="checkbox" className="toggle theme-controller" checked={isDarkMode} readOnly />
    </label>
  );
};

export default ThemeSwitch;
