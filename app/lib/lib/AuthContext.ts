/*import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/app/lib/lib/supabaseClient'; 

// Define the context default value type
const AuthContext = createContext<{ user: any | null }>({ user: null });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    const { data: subscription } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    fetchUser();

    // Safely handle the subscription with casting
    return () => {
      const sub = subscription as unknown; // Cast to unknown first
      const unsubscribe = (sub as { unsubscribe: () => void }).unsubscribe;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext); // Use the correct context here
};
*/