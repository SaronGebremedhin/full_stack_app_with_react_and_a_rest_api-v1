import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../utilities/apiHelper';

const UpdateCourse = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
  });
   const [errors, setErrors] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await api.get(`/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course detail:', error);
        navigate('/notfound');
      }
    };

    fetchCourseDetail();
  }, [id, navigate]);

  /*const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };
*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/courses/${id}`, course);
      navigate(`/courses/${id}`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors);
      } else {
        console.error('Error updating course:', error);
        navigate('/error');
      }
    }
  };

  return (
    <div>
      <h2>Update Course</h2>
      <form onSubmit={handleSubmit}>
        {}
        <button type="submit">Update Course</button>
        <Link to={`/courses/${id}`}>Cancel</Link>
      </form>
    </div>
  );
};

export default UpdateCourse;