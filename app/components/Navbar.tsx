"use client";

import React from "react";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch"; // Import the ThemeSwitch component

const Navbar: React.FC = () => {
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
                    <Link href="#">2.1</Link>
                  </li>
                  <li>
                    <Link href="#">2.2</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li tabIndex={0}>
              <details>
                <summary>Worksheets</summary>
                <ul className="p-2">
                  <li>
                    <Link href="#">3.1</Link>
                  </li>
                  <li>
                    <Link href="#">3.2</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          daisyUI
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-4">
          <li className="group relative">
            <Link href="#">Home</Link>
          </li>
          <li className="group relative">
            <Link href="#">Subjects</Link>
            <ul className="absolute left-0 top-full hidden group-hover:block bg-base-100 p-2 shadow rounded-box z-[60]">
              <li>
                <Link href="#">2.1</Link>
              </li>
              <li>
                <Link href="#">2.2</Link>
              </li>
            </ul>
          </li>
          <li className="group relative">
            <Link href="#">Worksheets</Link>
            <ul className="absolute left-0 top-full hidden group-hover:block bg-base-100 p-2 shadow rounded-box z-[60]">
              <li>
                <Link href="#">3.1</Link>
              </li>
              <li>
                <Link href="#">3.2</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex items-center space-x-2">
        <Link href="/Pages/login" className="btn btn-primary">
          Login
        </Link>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Navbar;
