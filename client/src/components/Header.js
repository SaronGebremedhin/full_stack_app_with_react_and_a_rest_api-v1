import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import UserContext from '../context/UserContext.js';

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="header">
      <div className="bounds">
        <Link to="/">
          <h1 className="header--logo">Courses</h1>
        </Link>
        <nav>
          {user ? (
            <React.Fragment>
              <span>Welcome, {user.firstName}!</span>
              <NavLink to="/signout">Sign Out</NavLink>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <NavLink to="/signup">Sign Up</NavLink>
              <NavLink to="/signin">Sign In</NavLink>
            </React.Fragment>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
