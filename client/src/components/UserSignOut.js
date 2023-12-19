import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import UserContext from '../context/UserContext.js';

function UserSignOut() {
  // Accessing user context and actions
  const { actions } = useContext(UserContext);

  // On page load, sign out the user
  useEffect(() => {
    actions.signOut();
  }, [actions]);

  // Redirect to the home page
  return <Navigate to="/" replace />;
}

export default UserSignOut;