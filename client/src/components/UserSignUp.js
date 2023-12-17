import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const UserSignUp = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const { signIn } = useContext(UserContext);
  const navigate = useNavigate();

  /*const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();

    // user sign up
    try {
      const response = await api.post('/users', user);
      signIn(user.emailAddress, user.password);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error signing up:', error);
        navigate('/error');
      }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  }

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
        <ErrorsDisplay errors={errors} />
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name</label>
          <input id="firstName" name="firstName" type="text" ref={firstName} />
          <label htmlFor="lastName">Last Name</label>
          <input id="lastName" name="lastName" type="text" ref={lastName} />
          <label htmlFor="emailAddress">Email Address</label>
          <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} />
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" ref={password} />
          <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
        <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
      </div>
    </main>
  );
}

export default UserSignUp;