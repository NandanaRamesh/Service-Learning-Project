import { supabase } from "@/app/lib/lib/supabaseClient";

// Define the expected Video type
interface Video {
  video_id: string;
  title: string;
  description: string;
  source_url: string;
  tags: string;
  grade_id: string;
  subject_id: string; // Added subject_id to match your table
}

// Fetch videos based on the subject ID
export const fetchVideosBySubject = async (subjectId: string): Promise<Video[]> => {
  const { data, error } = await supabase
    .from("Video Data") // Table name
    .select("*")        
    .eq("subject_id", subjectId) // Filter videos by subject_id
    .order("title", { ascending: true }); // Sort alphabetically by title or customize further

  // Debugging: log the fetched data
  console.log(`Fetched videos for subject ${subjectId}:`, data);

  if (error) {
    console.error("Error fetching videos by subject:", error.message);
    return []; // Return empty array on error
  }

  return data || []; // Return data or empty array if none exists
};

// Search videos based on subject and a query
export const searchVideosBySubject = async (subjectId: string, query: string): Promise<Video[]> => {
  const { data, error } = await supabase
    .from("Video Data")
    .select("*")
    .eq("subject_id", subjectId) // Filter by subject_id
    .ilike("title", `%${query}%`) // Search within filtered subject
    .order("title", { ascending: true }); // Sort results alphabetically by title

  console.log(`Search results for subject ${subjectId} and query "${query}":`, data);

  if (error) {
    console.error("Error searching videos by subject:", error.message);
    return [];
  }

  return data || [];
};

// Fetch videos based on the grade ID
export const fetchVideosByGrade = async (gradeId: string): Promise<Video[]> => {
  const { data, error } = await supabase
    .from("Video Data") // Table name
    .select("*")
    .eq("grade_id", gradeId) // Filter videos by grade_id
    .order("title", { ascending: true }); // Sort alphabetically by title

  // Debugging: log the fetched data
  console.log(`Fetched videos for grade ${gradeId}:`, data);

  if (error) {
    console.error("Error fetching videos by grade:", error.message);
    return []; // Return empty array on error
  }

  return data || []; // Return data or empty array if none exists
};

// Search videos based on grade and a query
export const searchVideosByGrade = async (gradeId: string, query: string): Promise<Video[]> => {
  const { data, error } = await supabase
    .from("Video Data")
    .select("*")
    .eq("grade_id", gradeId) // Filter by grade_id
    .ilike("title", `%${query}%`) // Search within filtered grade
    .order("title", { ascending: true }); // Sort results alphabetically by title

  console.log(`Search results for grade ${gradeId} and query "${query}":`, data);

  if (error) {
    console.error("Error searching videos by grade:", error.message);
    return [];
  }

  return data || [];
};
