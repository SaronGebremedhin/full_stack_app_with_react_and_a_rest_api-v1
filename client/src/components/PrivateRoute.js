import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PrivateRoute = () => {
  const { authenticatedUser } = useUser();
  const location = useLocation();

  if(authenticatedUser){
    return <Outlet />
} else {
    return <Navigate to='/SignIn' state={{from: location.pathname }} />
}
};

export default PrivateRoute;
