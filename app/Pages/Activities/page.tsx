"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { activitiesData } from "@/app/components/activitiesData";

interface Activity {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

const ActivitiesPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialTab = searchParams.get("tab") || "crafts";
  const [selectedCategory, setSelectedCategory] = useState<string>(initialTab);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);

  const categories = [
    { label: "Crafts", id: "crafts" },
    { label: "Arts", id: "arts" },
    { label: "Games", id: "games" },
    { label: "Edutainment", id: "edutainment" },
  ];

  useEffect(() => {
    const activitiesList = activitiesData[selectedCategory] || [];
    const results = searchQuery
      ? activitiesList.filter((activity) =>
          activity.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : activitiesList;

    setFilteredActivities(results);
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    router.push(`/Pages/Activities?tab=${categoryId}`);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Filter by</h2>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => handleCategoryChange(category.id)}
                className={`w-full px-4 py-2 text-left rounded border border-gray-400 hover:bg-opacity-80 ${
                  selectedCategory === category.id
                    ? "bg-blue-500 text-white"
                    : "bg-transparent text-inherit"
                }`}
              >
                {category.label}
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
                categories.find((c) => c.id === selectedCategory)?.label
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

        {/* Activities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity) => (
              <div
                key={activity.id}
                className="p-4 rounded shadow hover:shadow-lg transition"
              >
                {activity.imageUrl ? (
                  <img
                    src={activity.imageUrl}
                    alt={activity.title}
                    className="w-full h-32 object-cover rounded"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded">
                    <p className="text-lg font-semibold text-center">
                      {activity.title}
                    </p>
                  </div>
                )}
                <p className="mt-2 text-gray-700">{activity.description}</p>
              </div>
            ))
          ) : (
            <p>No activities found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage;
