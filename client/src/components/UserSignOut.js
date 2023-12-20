import { useEffect, useContext } from "react";
import { useUser } from "../context/UserContext";
import { Link, Navigate, useLocation } from "react-router-dom";


const UserSignOut = () =>{
  const { signOut } = useUser();

    useEffect(()=>{
        signOut();
    })
    
    return(<Navigate to="/" replace/>)
}

export default UserSignOut;
