"use client";

import React, { useState } from "react";
import Link from "next/link"; // For handling Next.js locales

const LanguageButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Button to toggle the dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="flex p-2 rounded-md items-center bg-black text-white"
        aria-haspopup="true"
        aria-expanded={isOpen}>
        {/* Text or Icon for language change */}
        Change Language
      </button>

      {/* Dropdown menu with language options */}
      {isOpen && (
        <div
          className="absolute right-0 bg-black text-white rounded-md border mt-2 p-2 shadow-lg"
          role="menu"
          aria-orientation="vertical">
          <Link href="/" locale="kn" passHref>
            <a className="block py-2 px-4 hover:bg-gray-700 rounded-md">
              Kannada
            </a>
          </Link>
          <Link href="/" locale="en" passHref>
            <a className="block py-2 px-4 hover:bg-gray-700 rounded-md">
              English
            </a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LanguageButton;
