"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import { supabase } from "@/app/lib/lib/supabaseClient"; // Adjust according to your supabase client import

interface Activities {
  activity_id: string;
  activity_name: string;
  description: string;
  source: string; // URL for the activity source
}

const ActivitiesPage: React.FC = () => {
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const initialTab = searchParams.get("tab") || "ACT001"; // Default to "crafts"
  const [selectedCategory, setSelectedCategory] = useState<string>(initialTab);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query state
  const [activities, setActivities] = useState<Activities[]>([]); // All activities fetched from Supabase
  const [filteredActivities, setFilteredActivities] = useState<Activities[]>([]); // Filtered activities based on search and category

  const categories = [
    { label: "Crafts", id: "ACT001" },
    { label: "Arts", id: "ACT002" },
    { label: "Games", id: "ACT003" },
    { label: "Edutainment", id: "ACT004" },
  ];

  // Fetch activities from Supabase based on category
  useEffect(() => {
    const fetchActivities = async () => {
      console.log("Fetching activities for category:", selectedCategory); // Log selected category

      const { data, error } = await supabase
        .from("Activities") // Assuming the table name is 'Activities'
        .select("*")
        .eq("activity_type_id", selectedCategory)
        .order("activity_name", { ascending: true });

      if (error) {
        console.error("Error fetching activities:", error);
      } else {
        console.log("Fetched activities:", data); // Log fetched activities
        setActivities(data); // Set activities state
      }
    };

    fetchActivities();
  }, [selectedCategory]); // Fetch activities when the selected category changes

  // Filter activities based on the search query
  useEffect(() => {
    console.log("All Activities:", activities); // Log all activities
    const results = activities.filter((activity) =>
      activity.activity_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log("Filtered Activities:", results); // Log filtered activities
    setFilteredActivities(results); // Update filtered activities
  }, [searchQuery, activities]); // Re-filter when search query or activities change

  // Handle category change
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
                className={`w-full px-4 py-2 text-left rounded border border-gray-400 hover:bg-blue-500 ${
                  selectedCategory === category.id ? "bg-inherit text-inherit" : "bg-inherit text-inherit"
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
            : `Activities for ${categories.find((c) => c.id === selectedCategory)?.label}`}
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
              <div key={activity.activity_id} className="p-4 rounded shadow hover:shadow-lg transition">
                <div className="w-full h-32 bg-white flex items-center justify-center rounded">
                  <p className="text-lg font-semibold text-center">{activity.activity_name}</p>
                </div>
                <p className="mt-2 text-gray-700">{activity.description}</p>
                <a
                  href={activity.source}
                  className="mt-4 text-blue-500 hover:text-blue-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Source
                </a>
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
