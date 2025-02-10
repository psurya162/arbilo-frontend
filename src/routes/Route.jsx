import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Loader from '../components/Loader/Loader';
import ProtectedRoute from '../ProtectedRoute';
import AdminProtectedRoute from '../AdminProtectedRoute';
import AdminProfile from '@/pages/AdminProfile/AdminProfile';

const Layout = lazy(() => import('../layout/Layout/Layout'));
const DashboardLayout = lazy(() => import('../layout/DashboardLayout/DashboardLayout'));
const Home = lazy(() => import('../pages/Home/Home'));
const Login = lazy(() => import('../pages/Login/Login'));
const Signup = lazy(() => import('../pages/Signup/Signup'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword/ForgotPassword'));
const ResetPassword = lazy(() => import('../pages/ResetPassword/ResetPassword'));
const DashBoard = lazy(() => import('../pages/DashBoard/DashBoard'));
const Profile = lazy(() => import('../pages/Profile/Profile'));
const Error404 = lazy(() => import('../pages/Error404/Error404'));
const PrivacyPolicy = lazy(() => import('../pages/Home/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('../pages/Home/TermsAndConditions'));
const EarningDisclaimer = lazy(() => import('../pages/Home/EarningDisclaimer'));
const AdminLayout = lazy(() => import('../layout/AdminLayout/AdminLayout'));
const AdminLogin = lazy(() => import('../pages/AdminLogin/AdminLogin'));
const UserTable = lazy(() => import('../pages/AdminDashboard/UserTable'));
const CreateCredential = lazy(() => import('../pages/CreateCredential/CreateCredential'));
const Totaluser = lazy(() => import('../pages/AdminDashboard/Totaluser')); // Lazy load Totaluser

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader />}>
        <Layout />
      </Suspense>
    ),
    children: [
      { index: true, element: <Suspense fallback={<Loader />}><Home /></Suspense> },
      { path: 'home-section', element: <Suspense fallback={<Loader />}><Home /></Suspense> },
      { path: 'how-it-works-section', element: <Suspense fallback={<Loader />}><Home /></Suspense> },
      { path: 'pricing-section', element: <Suspense fallback={<Loader />}><Home /></Suspense> },
      { path: 'faq-section', element: <Suspense fallback={<Loader />}><Home /></Suspense> },
      { path: 'contact-section', element: <Suspense fallback={<Loader />}><Home /></Suspense> },
      { path: 'tips', element: <Suspense fallback={<Loader />}><Home /></Suspense> },
    ],
  },
  {
    path: '/login',
    element: <Suspense fallback={<Loader />}><Login /></Suspense>,
  },
  {
    path: '/signup',
    element: <Suspense fallback={<Loader />}><Signup /></Suspense>,
  },
  {
    path: '/forgot-password',
    element: <Suspense fallback={<Loader />}><ForgotPassword /></Suspense>,
  },
  {
    path: '/reset-password/:token',
    element: <Suspense fallback={<Loader />}><ResetPassword /></Suspense>,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <DashboardLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Suspense fallback={<Loader />}><DashBoard /></Suspense> },
    ],
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Suspense fallback={<Loader />}>
          <DashboardLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Suspense fallback={<Loader />}><Profile /></Suspense> },
    ],
  },
  {
    path: '*',
    element: <Suspense fallback={<Loader />}><Error404 /></Suspense>,
  },
  {
    path: '/privacy-policy',
    element: <Suspense fallback={<Loader />}><PrivacyPolicy /></Suspense>,
  },
  {
    path: '/terms-and-conditions',
    element: <Suspense fallback={<Loader />}><TermsAndConditions /></Suspense>,
  },
  {
    path: '/earning-disclaimer',
    element: <Suspense fallback={<Loader />}><EarningDisclaimer /></Suspense>,
  },
  {
    path: '/admin-login',
    element: <Suspense fallback={<Loader />}><AdminLogin /></Suspense>,
  },
  {
    path: '/admin-dashboard',
    element: (
      <AdminProtectedRoute>
        <Suspense fallback={<Loader />}>
          <AdminLayout />
        </Suspense>
      </AdminProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Totaluser /> {/* Display Totaluser only on /admin-dashboard */}
          </Suspense>
        ),
      },
      {
        path: 'users',
        element: <Suspense fallback={<Loader />}><UserTable /></Suspense>,
      },
      {
        path: 'statistics',
        element: <Suspense fallback={<Loader />}><CreateCredential /></Suspense>,
      },
      {
        path: 'profile',
        element: <Suspense fallback={<Loader />}><AdminProfile/></Suspense>,
      },
    ],
  },
]);

export default router;
