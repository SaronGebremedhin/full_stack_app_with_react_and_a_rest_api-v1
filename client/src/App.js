import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

import CourseDetail from './components/CourseDetail';
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div>
    <Header />
    <Routes>
      <Route path="/" element={<Courses />} />
      
      <Route path="/courses/:id/update" element={<UpdateCourse />} />
      <Route path="/courses/create" element={<CreateCourse />} />
      <Route path="/error" element={<UnhandledError />} />
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="/notfound" element={<NotFound />} />
      <Route element={<PrivateRoute />}>
        <Route path="/signup" element={<UserSignUp />} />
      <Route path="/signin" element={<UserSignIn />} />
      <Route path="/signout" element={<UserSignOut />} />
      </Route>
      <Route path="/*" element={<NotFound />} />;
    </Routes>
  </div>
);
}

export default App;