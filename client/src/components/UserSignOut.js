import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const UserSignOut = ({ signOut }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate.push('/');
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default UserSignOut;