import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [authenticatedUser, setAuthenticatedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('authenticatedUser');
    if (storedUser) {
      setAuthenticatedUser(JSON.parse(storedUser));
    }
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'GET',
        headers: {
          Authorization: `Basic ${btoa(`${email}:${password}`)}`,
        },
      });

      if (response.status === 200) {
        const user = await response.json();
        setAuthenticatedUser(user);
        localStorage.setItem('authenticatedUser', JSON.stringify(user));
        navigate('/');
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      throw error;
    }
  };

  const signOut = () => {
    setAuthenticatedUser(null);
    localStorage.removeItem('authenticatedUser');
    navigate('/');
  };

  return (
    <UserContext.Provider value={{ authenticatedUser, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  return useContext(UserContext);
};

export { UserProvider, useUser };