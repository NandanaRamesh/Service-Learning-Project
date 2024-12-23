"use client";

import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faPuzzlePiece,
  faTicketAlt,
} from "@fortawesome/free-solid-svg-icons";

const AdminPage: React.FC = () => {
  return (
    <div className="p-6 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="w-full max-w-2xl flex flex-col gap-6">
        {/* Card Component */}
        <Card
          title="Add Videos"
          description="Upload and manage video content."
          buttonText="Go to Add Videos"
          href="/Pages/Admin/add-videos"
          bgColor="bg-blue-500"
          hoverColor="hover:bg-blue-600"
          icon={faVideo}
        />
        <Card
          title="Add Activities"
          description="Add interactive activities for students."
          buttonText="Go to Add Activities"
          href="/Pages/Admin/add-activities"
          bgColor="bg-yellow-500"
          hoverColor="hover:bg-yellow-600"
          icon={faPuzzlePiece}
        />
        <Card
          title="Resolve Tickets"
          description="View and resolve support tickets."
          buttonText="Go to Resolve Tickets"
          href="/Pages/Admin/resolve-ticket"
          bgColor="bg-red-500"
          hoverColor="hover:bg-red-600"
          icon={faTicketAlt}
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
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  buttonText,
  href,
  bgColor,
  hoverColor,
  icon,
}) => (
  <div className="flex flex-col items-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <FontAwesomeIcon icon={icon} className="text-4xl mb-4 text-gray-600" />
    <h2 className="text-2xl font-bold mb-2">{title}</h2>
    <p className="text-gray-600 mb-4 text-center">{description}</p>
    <Link href={href}>
      <button
        className={`px-4 py-2 ${bgColor} text-white rounded-lg font-semibold ${hoverColor} transition-colors duration-300`}>
        {buttonText}
      </button>
    </Link>
  </div>
);

export default AdminPage;
