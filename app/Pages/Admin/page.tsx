"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faPuzzlePiece,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";

const AdminPage: React.FC = () => {
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  // Function to show alert
  const showAlert = (message: string, type: "success" | "error" | "info") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000); // Auto-close alert after 3 seconds
  };

  // Alert Component
  const CustomAlert = ({
    message,
    type,
  }: {
    message: string;
    type: "success" | "error" | "info"; // Define the type here to match the keys of alertStyles
  }) => {
    const alertStyles: { [key in "success" | "error" | "info"]: string } = {
      success: "bg-green-100 text-green-700 border-green-500",
      error: "bg-red-100 text-red-700 border-red-500",
      info: "bg-blue-100 text-blue-700 border-blue-500",
    };

    return (
      <div
        className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-4/5 max-w-md p-4 rounded-lg border ${alertStyles[type]} shadow-md z-50`}>
        <div className="flex justify-between items-center">
          <span>{message}</span>
          <button
            className="text-gray-600 hover:text-gray-800 font-bold"
            onClick={() => setAlert(null)}>
            &times;
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 min-h-screen flex flex-col items-center">
      {/* Show alert if present */}
      {alert && <CustomAlert message={alert.message} type={alert.type} />}

      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {/* Card Components */}
        <Card
          title="Add Videos"
          description="Upload and manage video content."
          buttonText="Go to Add Videos"
          href="/Pages/Admin/add-videos"
          bgColor="bg-blue-500"
          hoverColor="hover:bg-blue-600"
          icon={faVideo}
          onClick={() => showAlert("Navigating to Add Videos!", "info")}
        />
        <Card
          title="Add Activities"
          description="Add interactive activities for students."
          buttonText="Go to Add Activities"
          href="/Pages/Admin/add-activities"
          bgColor="bg-yellow-500"
          hoverColor="hover:bg-yellow-600"
          icon={faPuzzlePiece}
          onClick={() => showAlert("Navigating to Add Activities!", "info")}
        />
        <Card
          title="Resolve Tickets"
          description="View and resolve support tickets."
          buttonText="Go to Resolve Tickets"
          href="/Pages/Admin/resolve-ticket"
          bgColor="bg-red-500"
          hoverColor="hover:bg-red-600"
          icon={faTicketAlt}
          onClick={() => showAlert("Navigating to Resolve Tickets!", "info")}
        />
      </div>
    </div>
  );
};

interface CardProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
  bgColor: string;
  hoverColor: string;
  icon: any;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  buttonText,
  href,
  bgColor,
  hoverColor,
  icon,
  onClick,
}) => (
  <div className="flex flex-col items-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <FontAwesomeIcon icon={icon} className="text-4xl mb-4 text-gray-600" />
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-gray-600 mb-4 text-center">{description}</p>
    <Link href={href}>
      <button
        onClick={onClick}
        className={`px-4 py-2 ${bgColor} text-white rounded-lg font-semibold ${hoverColor} transition-colors duration-300`}>
        {buttonText}
      </button>
    </Link>
  </div>
);

export default AdminPage;
