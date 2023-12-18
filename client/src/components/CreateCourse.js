import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { api }from '../utilities/apiHelper';
import ErrorsDisplay from './ErrorsDisplay';
import UserContext from '../context/UserContext';

const CreateCourse = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
  });
  const [errors, setErrors] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

 
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const estimatedTimeRef = useRef(null);
  const materialsNeededRef = useRef(null);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

 
    if (!course.title || !course.description) {
      setErrors([
        { message: "Please provide a value for 'Title'" },
        { message: "Please provide a value for 'Description'" },
      ]);
      return;
    }

    try {
      const response = await api.post('/courses', course);
      navigate(`/courses/${response.data.id}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error creating course:', error);
        navigate('/error');
      }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="wrap">
      <h2>Create Course</h2>
      <div className="validation--errors">
        <ErrorsDisplay errors={errors} />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="title">Course Title</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={handleChange}
              value={course.title}
              ref={titleRef}
            />

            <p>By {user.firstName} {user.lastName}</p>

            <label htmlFor="description">Course Description</label>
            <textarea
              id="description"
              name="description"
              onChange={handleChange}
              value={course.description}
              ref={descriptionRef}
            ></textarea>
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              onChange={handleChange}
              value={course.estimatedTime}
              ref={estimatedTimeRef}
            />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              onChange={handleChange}
              value={course.materialsNeeded}
              ref={materialsNeededRef}
            ></textarea>
          </div>
        </div>
        <button className="button" type="submit">
          Create Course
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;