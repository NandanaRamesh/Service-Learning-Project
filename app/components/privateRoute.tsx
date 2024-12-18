import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/app/lib/lib/supabaseClient"; // Ensure you're importing the correct supabase client

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession(); // Use getSession method

      if (!session?.user) {
        router.push("/Pages/not-verified"); // Redirect if not authenticated
      } else {
        setLoading(false); // User is authenticated, stop loading
      }
    };

    fetchSession(); // Check session on mount
  }, [router]);

  // Render nothing (or a loading spinner) until the session is checked
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or other loading state
  }

  return <>{children}</>;
};

export default PrivateRoute;
