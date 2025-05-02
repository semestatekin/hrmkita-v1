
import React, { createContext, useContext, useState, useEffect } from "react";
import { setLocalData, getLocalData, removeLocalData } from "@/utils/localStorage";

// Define types for our authentication
interface User {
  username: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Storage key for user data
const USER_STORAGE_KEY = "hrm_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const storedUser = getLocalData<User | null>(USER_STORAGE_KEY, null);
    if (storedUser) {
      setUser(storedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Accept any credentials for demo purpose
    if (username && password) {
      const userData: User = {
        username: username,
        name: username.charAt(0).toUpperCase() + username.slice(1), // Capitalize first letter
        role: username === "admin" ? "admin" : "user",
      };
      
      // Store user in localStorage
      setLocalData(USER_STORAGE_KEY, userData);
      
      // Update state
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    removeLocalData(USER_STORAGE_KEY);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
