import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import HomePage from '../components/HomePage/HomePage';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import ClipDetail from '../components/ClipDetail/ClipDetail';
import ClipEditPage from '../components/ClipEditPage/ClipEditPage';
import ClipCreate from '../components/ClipCreate/ClipCreate';
import EditProfile from '../components/EditProfile/EditProfile';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/login",
        element: <LoginFormPage />
      },
      {
        path: "/signup",
        element: <SignupFormPage />
      },
      {
        path: "/profile",
        element: <ProfilePage />
      },
      {
        path: "/profile/edit",
        element: <EditProfile />
      },
      {
        path: "/clips/:clipId",
        element: <ClipDetail />
      },
      {
        path: "/clips/:clipId/edit",
        element: <ClipEditPage />
      },
      {
        path: "/create",
        element: <ClipCreate />
      }
    ],
  },
]);