// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: null });
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user'));

  

    if (token && user) {
      setAuth({ user, token });
    }
    setLoading(false); // Set loading to false after restoring auth
  }, []);

  useEffect(() => {
    if (auth.token && auth.user) {
      localStorage.setItem('authToken', auth.token);
      localStorage.setItem('user', JSON.stringify(auth.user));
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
