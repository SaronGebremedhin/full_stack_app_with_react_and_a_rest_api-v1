import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const UserSignOut = () => {
  const { signOut } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  return (
    <div>
      <h2>Signing Out</h2>
      {handleSignOut()}
    </div>
  );
};

export default UserSignOut;