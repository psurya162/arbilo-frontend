import { createContext, useState, useEffect } from 'react';

export const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState({ user: null, token: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    const user = JSON.parse(localStorage.getItem('adminUser') || sessionStorage.getItem('adminUser'));

    if (token && user) {
      setAdmin({ user, token });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (admin.token && admin.user) {
      localStorage.setItem('adminToken', admin.token);
      localStorage.setItem('adminUser', JSON.stringify(admin.user));
    }
  }, [admin]);

  return (
    <AdminAuthContext.Provider value={{ admin, setAdmin, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};
