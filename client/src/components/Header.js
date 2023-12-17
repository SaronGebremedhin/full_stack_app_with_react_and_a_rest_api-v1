import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Header = () => {
  const { authenticatedUser } = useContext(UserContext);

  return (
    <div>
      <h1>Course Directory</h1>
      <nav>
        <ul>
          {}
          {authenticatedUser ? (
            <>
              <li>Welcome, {authenticatedUser.firstName}!</li>
              <li>
                <Link to="/signout">Sign Out</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
