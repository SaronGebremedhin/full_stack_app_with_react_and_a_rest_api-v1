import React, { useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import ErrorsDisplay from './ErrorsDisplay.js';
import UserContext from '../context/UserContext';

function UserSignUp() {
  // Accessing user context and actions
  const { actions } = useContext(UserContext);

  // State for handling validation errors
  const [errors, setErrors] = useState([]);

  // Refs for form input fields
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);

  // Hook for navigation
  const navigate = useNavigate();

  // Event handler for form submission
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      // Prepare user data for sign-up
      const data = {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        emailAddress: emailAddress.current.value,
        password: password.current.value,
      };

      // Send request to server to sign up user
      const res = await actions.signUp(data);

      // Handle response based on status code
      if (res.status === 201) {
        console.log(`${data.firstName} ${data.lastName} is successfully signed up and authenticated`);
        
        // Sign in the user after successful sign-up
        await actions.signIn(data.emailAddress, data.password);
        
        // Navigate back to the homepage
        navigate('/');
      } else if (res.status === 400) {
        // Set validation errors if sign-up fails
        const data = await res.json();
        setErrors(data.errors);
      } else {
        throw new Error();
      }
    } catch (error) {
      // Handle unexpected errors
      console.log(error);
      setErrors(['Internal error occurred, try again']);
      navigate('/error');
    }
  };

  // Event handler for cancel button
  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      <div className="validation--errors">
        <ErrorsDisplay errors={errors} />
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" ref={firstName} />
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" ref={lastName} />
        <label htmlFor="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" ref={emailAddress} />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" ref={password} />
        <button className="button" type="submit">
          Sign Up
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      <p>
        Already have a user account? Click here to <Link to="/signin">sign in</Link>!
      </p>
    </div>
  );
}

export default UserSignUp;