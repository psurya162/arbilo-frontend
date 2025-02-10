import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AdminAuthContext } from './context/AdminAuthContext'; // Import AdminAuthContext

const AdminProtectedRoute = ({ children }) => {
  const { admin, loading } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is not authenticated after the component renders
    if (!loading && !admin.token) {
      navigate('/admin-login'); // Redirect to admin login if not authenticated
    }
  }, [admin, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; // Show loading screen while checking auth
  }

  return admin.token ? children : null; // Render the protected children if authenticated
};

export default AdminProtectedRoute;
