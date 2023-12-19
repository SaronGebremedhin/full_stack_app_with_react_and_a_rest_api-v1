import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { authenticatedUser } = useUser();

  return (
    <Routes>
      <Route
        {...rest}
        path="/*"  // Fix for the error, add a trailing "*"
        element={authenticatedUser ? <Element /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
};

export default PrivateRoute;