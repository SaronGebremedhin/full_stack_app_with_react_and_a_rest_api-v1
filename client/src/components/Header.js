import React, {useContext} from 'react'
import UserContext from '../context/UserContext';
import {Link, useLocation} from 'react-router-dom';


const Header = () => {
    const {authUser} = useContext(UserContext);
    const location = useLocation();

  return (
    <header>
            <div className="wrap header--flex">
                <h1 className="header--logo"><Link to="/">Courses</Link></h1>
                <nav>
                    { authUser ?
                    <>
                        <ul className="header--signedin">
                        <li>Welcome {authUser.firstName} {authUser.lastName}</li>
                        <li><Link to="/signout">Sign Out</Link></li>
                        </ul>
                    </>
                        :
                        <>
                         <ul className="header--signedout">
                        <li><Link to="/signup">Sign Up</Link></li>
                        <li><Link to="/signin" state={{from:location.pathname}}> Sign In</Link></li>
                      
                        </ul>
                        </>
            
                    
              
                    }
                   
                </nav>
            </div>
        </header>
  )
}

export default Header