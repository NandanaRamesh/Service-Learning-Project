"use client";

import React from 'react';
import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';  // Import the ThemeSwitch component

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-base-100">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
            <Link href="#">Item 1</Link>
              <ul className="p-2">
                <li><Link href="#">1.1</Link></li>
                <li><Link href="#">1.2</Link></li>
              </ul>
            </li>
            <li>
              <Link href="#">Item 2</Link>
              <ul className="p-2">
                <li><Link href="#">2.1</Link></li>
                <li><Link href="#">2.2</Link></li>
              </ul>
            </li>
            <li><Link href="#">Item 3</Link>
              <ul className="p-2">
                <li><Link href="#">3.1</Link></li>
                <li><Link href="#">3.2</Link></li>
              </ul>
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          daisyUI
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex relative z-50">
        <ul className="menu menu-horizontal px-1">
          <li><details>
              <summary>Item 1</summary>
              <ul className="p-2">
                <li><Link href="#">1.1</Link></li>
                <li><Link href="#">1.2</Link></li>
              </ul>
            </details></li>
          <li>
            <details>
              <summary>Item 2</summary>
              <ul className="p-2">
                <li><Link href="#">2.1</Link></li>
                <li><Link href="#">2.2</Link></li>
              </ul>
            </details>
          </li>
          <li>
            <details>
              <summary>Item 3</summary>
              <ul className="p-2">
                <li><Link href="#">3.1</Link></li>
                <li><Link href="#">3.2</Link></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <ThemeSwitch /> 
      </div>
    </div>
  );
};

export default Navbar;
