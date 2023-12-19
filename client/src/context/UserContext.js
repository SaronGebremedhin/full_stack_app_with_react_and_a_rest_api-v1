import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const navigate = useNavigate();

  const signIn = async (emailAddress, password) => {
    try {
      // Make an API call to authenticate the user
      const response = await axios.post('http://localhost:5000/api/users', {
        emailAddress,
        password,
      });

      // Assuming the API returns the authenticated user object
      setAuthenticatedUser(response.data);

      // Save user data to local storage for persistent authentication
      localStorage.setItem('authenticatedUser', JSON.stringify(response.data));

      // Navigate to the home page or the previous page
      navigate('/');
    } catch (error) {
      // Handle authentication errors
      console.error('Authentication failed', error);
    }
  };

  const signOut = () => {
    // Clear the authenticated user from the context and local storage
    setAuthenticatedUser(null);
    localStorage.removeItem('authenticatedUser');

    // Navigate to the home page
    navigate('/');
  };

  // Check for authenticated user in local storage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('authenticatedUser');
    if (storedUser) {
      setAuthenticatedUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ authenticatedUser, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };