import { supabase } from "@/app/lib/lib/supabaseClient";

// Define the expected Video type
interface Video {
  video_id: string;
  title: string;
  description: string;
  source_url: string;
  tags: string;
  grade_id: string;
}

export const fetchVideosByGrade = async (gradeId: string): Promise<Video[]> => {
  const { data, error } = await supabase
    .from("Video Data")  // No need to specify the schema if it's 'public'
    .select("*")         // Fetch all columns
    .eq("grade_id", gradeId); // Filter videos by grade_id

  // Debugging: log the response
  console.log("Fetched videos:", data);

  if (error) {
    console.error("Error fetching videos:", error.message);
    return [];  // Return empty array on error
  }

  return data || [];  // Return an empty array if no data found
};
