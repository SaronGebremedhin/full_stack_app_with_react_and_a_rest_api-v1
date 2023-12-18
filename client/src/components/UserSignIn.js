import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ErrorsDisplay from './ErrorsDisplay';
import { api } from '../utilities/apiHelper';

const UserSignIn = () => {
  const [credentials, setCredentials] = useState({
    emailAddress: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const { signIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
j
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn(credentials.emailAddress, credentials.password);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Invalid email address or password:', error.message);
        setErrors(['Invalid email address or password']);
      } else {
        console.error('Error signing in:', error);
        navigate('/error');
      }
    }
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign In</h2>
        <ErrorsDisplay errors={errors} />
        <form onSubmit={handleSubmit}>
          <label htmlFor="emailAddress">Email Address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            value={credentials.emailAddress}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button className="button" type="submit">
            Sign In
          </button>
          <Link to="/" className="button button-secondary">
            Cancel
          </Link>
        </form>
        <p>
          Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
        </p>
      </div>
    </main>
  );
};

export default UserSignIn;
