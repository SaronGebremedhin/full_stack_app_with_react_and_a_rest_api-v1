import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utilities/apiHelper';

const CreateCourse = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

  return (
    <div className="wrap">
        <h2>Create Course</h2>
        <div className="validation--errors">
            <Error errors={errors} /> 
        </div>
        <form onSubmit={handleSubmit}>
            <div className="main--flex">
                <div>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input id="courseTitle" name="courseTitle" type="text" ref={title} />

                    <p>By {user.firstName} {user.lastName}</p>

                    <label htmlFor="courseDescription">Course Description</label>
                    <textarea id="courseDescription" name="courseDescription" ref={description}></textarea>
                </div>
                <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input id="estimatedTime" name="estimatedTime" type="text" ref={estimatedTime}  />

                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea id="materialsNeeded" name="materialsNeeded" ref={materialsNeeded}></textarea>
                </div>
            </div>
            <button className="button" type="submit">Create Course</button>
            <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
        </form>
    </div>
)
}

export default CreateCourse;