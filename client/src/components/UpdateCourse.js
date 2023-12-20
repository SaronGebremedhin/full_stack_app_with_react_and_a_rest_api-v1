import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useUser } from '../context/UserContext.js';

const UpdateCourse = () => {
  const { authUser: user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();

  // State for storing form data and validation errors
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
  });
  const [errors, setErrors] = useState([]);

  // Effect hook to fetch the course details on component mount
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${id}`);
        const data = await response.json();

        // If course is not found, navigate to notfound route
        if (response.status === 404) {
          navigate('/notfound');
        } else if (user.id !== data.userId) {
          // If the current user is not the owner, navigate to forbidden route
          navigate('/forbidden');
        } else {
          setFormData(data);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourse();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user, navigate]);

  // Function to handle form data changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${btoa(`${user.emailAddress}:${user.password}`)}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 204) {
        // If course update is successful, navigate to the course details
        navigate(`/courses/${id}`);
      } else if (response.status === 400) {
        // If there are validation errors, set the errors state
        const data = await response.json();
        setErrors(data.errors);
      } else if (response.status === 403) {
        // If user is not authorized, navigate to forbidden route
        navigate('/forbidden');
      } else {
        // If an unexpected error occurs, navigate to the error route
        navigate('/error');
      }
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  // Function to handle cancel button click
  const handleCancel = () => {
    navigate(`/courses/${id}`);
  };

  return (
    <div className="bounds course--detail">
      <h1>Update Course</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <div>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Course title..."
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <p>
                By {user ? `${user.firstName} ${user.lastName}` : 'Unknown User'}
              </p>
            </div>
            <div className="course--description">
              <div>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Course description..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <div>
                    <input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      placeholder="Hours"
                      value={formData.estimatedTime}
                      onChange={handleChange}
                    />
                  </div>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <div>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      placeholder="List materials..."
                      value={formData.materialsNeeded}
                      onChange={handleChange}
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid-100 pad-bottom">
            <button className="button" type="submit">
              Update Course
            </button>
            <button className="button button-secondary" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
