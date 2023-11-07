import React, { useContext,useState,useEffect} from 'react'
import axios from 'axios'

const AuthContext=React.createContext()
const setAuthContext=React.createContext()
export function useAuth(){
  return useContext(AuthContext)
}
export function setAuth(){
  return useContext(setAuthContext)
}
export function AuthProvider ({children})  {
  
  const [currentUser,setCurrentUser] =useState(localStorage.getItem('token'))
 
  
  useEffect(()=>{
    localStorage.setItem('token',currentUser);
    
  },[currentUser]);
 
  
  return (
    <AuthContext.Provider value={currentUser}>
      <setAuthContext.Provider value={setCurrentUser}>
      {children}
      </setAuthContext.Provider>
    </AuthContext.Provider>
  )
}
