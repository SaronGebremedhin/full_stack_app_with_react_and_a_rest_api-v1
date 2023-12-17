import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const { authenticatedUser } = useContext(UserContext);

  return (
    <Route
      {...rest}
      element={authenticatedUser ? <Component /> : <Navigate to="/signin" />}
    />
  );
};

export default PrivateRoute;3