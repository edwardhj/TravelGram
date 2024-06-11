import { NavLink, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout, thunkLogin } from "../../redux/session";
import profile from '../../assets/images/icon_profile.png';
import create from '../../assets/images/icon_create.webp';
import signup from '../../assets/images/icon_signup.png';
import signout from '../../assets/images/icon_signout.png';
import home from '../../assets/images/icon_home.png';
import demo from '../../assets/images/icon_demo.png';
import connect from '../../assets/images/icon_explore.png'

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // function NavigateHome(){
  //   return navigate('/')
  // }

  // function NavigateToProfile() {
  //   return navigate('/clips/current')
  // }

  // function NavigateToExplore() {
  //   return navigate('/users')
  // }

  const handleSignOut = async (e) => {
    e.preventDefault();
    await dispatch(thunkLogout());  // Dispatch the logout action
    navigate('/login');  // Redirect to login page
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const demoUser = {
      email: 'demo@email.com',
      password: 'password'
    }

    await dispatch(thunkLogin(demoUser)).then(() => {
      navigate('/');
    })
  };

  const sessionUser = useSelector(state => state.session.user)

  return (
    <div className='navigation-outer'>

      <div className="navigation-header">
        <NavLink className="navigation-link" to='/'>
          <h2 className="navigation-heading">TravelGram</h2>
        </NavLink>
      </div>

      <ul className="navigation-list">
        {sessionUser ? (
          <>

            <li>
              <NavLink className="navigation-link" to='/'>
                <div className="navigation-element">
                  <img className='nav-logo' src={home} />
                  <h4 className="nav-logo-headers">Home</h4>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink className="navigation-link" to='/connect'>
                <div className="navigation-element">
                  <img className="nav-logo" src={connect} />
                  <h4 className="nav-logo-headers">Connect</h4>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink className="navigation-link" to='/create'>
                <div className="navigation-element">
                  <img className="nav-logo" src={create} alt="Create" />
                  <h4 className="nav-logo-headers">Create</h4>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink className="navigation-link" to='/profile'>
                <div className="navigation-element">
                  <img className="nav-logo" src={profile} alt="Profile" />
                  <h4 className="nav-logo-headers">Profile</h4>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink className="navigation-link" to='/signout' onClick={handleSignOut}>
                <div className="navigation-element">
                  <img className="nav-logo" src={signout} alt="Sign Out" />
                  <h4 className="nav-logo-headers">Sign Out</h4>
                </div>
              </NavLink>
            </li>

          </>
        ) : (
          <>

            <li>
              <NavLink className="navigation-link" to='/signup'>
                <div className="navigation-element">
                  <img className="nav-logo" src={signup} alt="Sign Up" />
                  <h4 className="nav-logo-headers">Sign Up</h4>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink className="navigation-link" to='/login'>
                <div className="navigation-element">
                  <img className="nav-logo" src={profile} alt="Login" />
                  <h4 className="nav-logo-headers">Login</h4>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink className="navigation-link" to='/demouser' onClick={handleDemoLogin}>
                <div className="navigation-element">
                  <img className="nav-logo" src={demo} alt="Sign Out" />
                  <h4 className="nav-logo-headers">Demo User</h4>
                </div>
              </NavLink>
            </li>

          </>
        )}

      </ul>
    </div>
  );
}

export default Navigation;
