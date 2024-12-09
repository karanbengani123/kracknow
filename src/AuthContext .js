import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context to hold authentication data
const AuthContext = createContext();

// AuthProvider component that wraps the app and provides the auth context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // store user info (e.g., user roles, JWT)
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated
  useEffect(() => {
    // Try to get user info from localStorage or from an API
    const token = localStorage.getItem('token');  // Retrieve token from localStorage or sessionStorage
    if (token) {
      // Fetch user data (you may have an API call to verify the token)
      // For now, we assume that the user is authenticated and has roles.
      const decodedUser = JSON.parse(localStorage.getItem('user')); // example of user data from localStorage
      setUser(decodedUser);
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData));  // store user info
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
