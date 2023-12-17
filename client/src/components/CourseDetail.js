import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Markdown from 'react-markdown';

import UserContext from '../context/UserContext';
import { api } from '../utilities/apiHelper';

function CourseDetail() {
    const { user } = useContext(UserContext);
    const [course, setCourse] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();


  
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await api(`/courses/${id}`, 'GET')
                const json = await res.json();
                if (res.status === 200) {
                    setCourse(json);
                } else if (res.status === 404) {
                    navigate('/notfound');
                } else {
                    throw new Error();
                }
            } catch (error) {
                console.log("Error fetching data", error)
                navigate('/error');
            }
        }
        fetchCourse();
    }, [id, navigate])


    const handleDelete = () => {
        api(`/courses/${id}`, 'DELETE', null, { emailAddress: user.emailAddress, password: user.password })
            .then(res => navigate('/'))
            .catch(err => navigate('/error'))
    }

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    {}
                    {
                        user && user?.id === course?.user?.id ? (
                            <>
                                <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                                <button className="button" onClick={handleDelete}>Delete Course</button>
                            </>
                        ) : (<></>)
                    }
                    <Link className="button button-secondary" to='/'>Return to List</Link>
                </div>
            </div>

            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>{course?.user?.firstName} {course?.user?.lastName}</p>

                            <Markdown>{course.description}</Markdown>

                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime || 'Ask instructor'}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">

                                <Markdown>{course.materialsNeeded}</Markdown>

                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CourseDetail;