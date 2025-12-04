// context/UserContext.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define User Type
interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

// Define Context Type
interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// ✅ Create Context with undefined (not default object)
const UserContext = createContext<UserContextType | undefined>(undefined);

// Custom Hook to use the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

// Provider Component
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on mount
  const refreshUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        
        setUser(data.user);
      } else {
        console.log("❌ API returned non-OK status");
        setUser(null);
      }
    } catch (error) {
      console.error("❌ Refresh user error:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };





  return (
    <UserContext.Provider value={{ user, loading, setUser, logout, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}
