import { useState, createContext } from "react";
import Cookies from "js-cookie";
import { api } from '../utilities/apiHelper';

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const cookie = Cookies.get("authenticatedUser");

  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);


  const signIn = async (credentials) => {
    const response = await api("/users", "GET", null, credentials)
    if (response.status === 200){
      const user = await response.json();
      user.password = credentials.password;
      console.log(user)
      setAuthUser(user);
      Cookies.set("authenticatedUser",JSON.stringify(user),{expires: 1});
      console.log(` ${user.emailAddress} is signed in`)
      return user
    } else if (response.status === 401){
     return null
    }else{
      throw new Error();
    }
  }
  const signOut = () => {
    setAuthUser(null);
    Cookies.remove("authenticatedUser");
  }

  return (
    <UserContext.Provider value={{
      authUser,
      actions:{
        signIn,
        signOut
      }
    }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;