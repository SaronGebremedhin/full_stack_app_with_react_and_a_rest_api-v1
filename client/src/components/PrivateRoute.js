import React, {useContext} from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import UserContext from '../context/UserContext';

function PrivateRoute() {
    const {user} = useContext(UserContext);
    const location = useLocation();

    console.log(user);
    if (user) {
        return <Outlet />
    } else {
        return <Navigate to="/signin" state={{from: location.pathname}}/>
    }
}

export default PrivateRoute;