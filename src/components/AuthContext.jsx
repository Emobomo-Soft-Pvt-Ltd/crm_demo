import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Stored User:", storedUser);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user data:", error);
      }
    }
    setLoading(false); // Set loading to false after attempting to load user data
  }, []);

  const login = (userData) => {
    setUser(userData);
    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    // setUser(null); // Clear user data immediately
    // Clear user data from localStorage
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
