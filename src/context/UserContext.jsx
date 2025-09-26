import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext({});

const UserProvider = ({children}) => {

    const [user, setUser] = useState({loggedin:false, vid:null, name:null, role:null});

  return (
    <UserContext.Provider value={{user,setUser}} >{children}</UserContext.Provider>
  )
}
export default UserProvider;

export const useUserContext = ()=> useContext(UserContext);