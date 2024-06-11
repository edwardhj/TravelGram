import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import ClipDetail from '../components/ClipDetail/ClipDetail';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginFormPage />,
      },
      {
        path: "/signup",
        element: <SignupFormPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />,
      },
      {
        path: "/clips/:clipId",
        element: <ClipDetail />
      }
    ],
  },
]);