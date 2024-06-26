import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import ClipDetail from '../components/ClipDetail/ClipDetail';
import ClipEditPage from '../components/ClipEditPage/ClipEditPage';
import ClipCreate from '../components/ClipCreate/ClipCreate';
import EditProfile from '../components/EditProfile/EditProfile';
import Connect from '../components/Connect/Connect';
import UserPage from '../components/UserPage/UserPage';
import LoggedIn from '../components/LoggedIn/LoggedIn';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LoggedIn />
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
      },
      {
        path: "/connect",
        element: <Connect />
      },
      {
        path: "/users/:userId",
        element: <UserPage />
      }
    ],
  },
]);