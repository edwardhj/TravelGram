import { useSelector } from 'react-redux';
import HomePage from '../HomePage/HomePage';
import LoginFormPage from '../LoginFormPage/LoginFormPage';

const LoggedIn = () => {
  const currentUser = useSelector(state => state.session.user);

  if (currentUser) {
    return <HomePage />;
  } else {
    return <LoginFormPage />;
  }
};

export default LoggedIn;