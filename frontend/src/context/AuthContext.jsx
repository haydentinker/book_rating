import React, {createContext,useContext} from 'react';
import Cookies from 'js-cookie';

const AuthContext =createContext();

export function useCookies(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const getCookie = (cookieName) => Cookies.get(cookieName);
    const setCookie = (cookieName, value, options) =>
      Cookies.set(cookieName, value, options);
    const removeCookie = (cookieName) => Cookies.remove(cookieName);
  
    const cookiesAPI = {
      getCookie,
      setCookie,
      removeCookie,
    };
  
    return (
      <AuthContext.Provider value={cookiesAPI}>
        {children}
      </AuthContext.Provider>
    );
  }