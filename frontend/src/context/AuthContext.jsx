import React, { useContext,useState,useEffect} from 'react'
import axios from '../api/axios'
const AuthContext=React.createContext()
export function useAuth(){
  return useContext(AuthContext)
}
export function AuthProvider ({children})  {
  const [currentUser,setCurrentUser] =useState(localStorage.getItem('token'))
  
  useEffect(()=>{
    if (currentUser) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + currentUser;
      localStorage.setItem('token',currentUser);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  },[currentUser]);
  async function setAuth(token) { 
    setCurrentUser(token)
  }
  const value={
    currentUser,
    setAuth
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
