"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { activitiesData } from "@/app/components/activitiesData"; // Adjust the import to where your activities data is stored

const ActivitiesPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get the initial tab from the query parameter or default to "crafts"
  const initialTab = searchParams.get("tab") || "crafts";
  const [selectedActivity, setSelectedActivity] = useState<string>(initialTab);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const activities = [
    { label: "Crafts", id: "crafts" },
    { label: "Arts", id: "arts" },
    { label: "Games", id: "games" },
    { label: "Edutainment", id: "edutainment" },
  ];

  // Combine all activities across categories and filter by search query
  const allActivities = Object.values(activitiesData).flat();
  const filteredActivities = allActivities.filter((activity) =>
    activity.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter activities for the selected category
  const activitiesList = activitiesData[selectedActivity] || [];

  // Update the selected category when the URL changes
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setSelectedActivity(tab);
    }
  }, [searchParams]);

  // Handle sidebar category selection
  const handleCategoryChange = (categoryId: string) => {
    if (categoryId !== selectedActivity) {
      setSelectedActivity(categoryId);
      router.push(`/Pages/Activities?tab=${categoryId}`); // Update the URL to reflect the active tab
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Activities</h2>
        <ul className="space-y-2">
          {activities.map((activity) => (
            <li key={activity.id}>
              <button
                onClick={() => handleCategoryChange(activity.id)}
                className={`w-full px-4 py-2 text-left rounded border border-gray-400 hover:bg-blue-500 ${
                  selectedActivity === activity.id ? "bg-blue-500" : ""
                }`}
              >
                {activity.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">
          {searchQuery
            ? `Search Results for "${searchQuery}"`
            : `Activities for ${
                activities.find((a) => a.id === selectedActivity)?.label
              }`}
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search activities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchQuery ? (
            filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="p-4 rounded shadow hover:shadow-lg transition"
                >
                  <img
                    src={activity.thumbnail}
                    alt={activity.title}
                    className="w-full h-32 object-cover rounded"
                  />
                  <h2 className="text-lg font-semibold mt-2">{activity.title}</h2>
                  <a
                    href={activity.activitySrc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-400 hover:text-blue-300 underline"
                  >
                    View Activity Guide
                  </a>
                </div>
              ))
            ) : (
              <p>No activities found for the search query.</p>
            )
          ) : activitiesList.length > 0 ? (
            activitiesList.map((activity) => (
              <div
                key={activity.id}
                className="p-4 rounded shadow hover:shadow-lg transition"
              >
                <img
                  src={activity.thumbnail}
                  alt={activity.title}
                  className="w-full h-32 object-cover rounded"
                />
                <h2 className="text-lg font-semibold mt-2">{activity.title}</h2>
                <a
                  href={activity.activitySrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-400 hover:text-blue-300 underline"
                >
                  View Activity Guide
                </a>
              </div>
            ))
          ) : (
            <p>No activities available for this category.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;
