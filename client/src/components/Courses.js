import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utilities/apiHelper';

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <h2>Courses</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <Link to={`/courses/${course.id}`}>
              <h3>{course.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/courses/create">Create Course</Link>
    </div>
  );
};

export default Courses;