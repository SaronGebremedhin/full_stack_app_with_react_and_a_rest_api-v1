import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    signIn(credentials.emailAddress, credentials.password);
    navigate('/');
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        {/* ...form fields */}
        <button type="submit">Sign In</button>
        <Link to="/">Cancel</Link>
      </form>
    </div>
  );
};

export default UserSignIn;