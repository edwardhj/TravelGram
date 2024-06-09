import { NavLink, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout, thunkLogin } from "../../redux/session";

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

        <li>
          <NavLink className="navigation-link" to='/'>
            <div className="navigation-element">
              <img className='nav-logo' src="icon_home.png" />
              <h4 className="nav-logo-headers">Home</h4>
            </div>
          </NavLink>
        </li>

        <li>
          <NavLink className="navigation-link" to='/connect'>
            <div className="navigation-element">
              <img className="nav-logo" src="icon_explore.png" />
              <h4 className="nav-logo-headers">Connect</h4>
            </div>
          </NavLink>
        </li>

        {sessionUser ? (
          <>

            <li>
              <NavLink className="navigation-link" to='/create'>
                <div className="navigation-element">
                  <img className="nav-logo" src="icon_create.webp" alt="Create" />
                  <h4 className="nav-logo-headers">Create</h4>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink className="navigation-link" to='/profile'>
                <div className="navigation-element">
                  <img className="nav-logo" src="icon_profile.png" alt="Profile" />
                  <h4 className="nav-logo-headers">Profile</h4>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink className="navigation-link" to='/signout' onClick={handleSignOut}>
                <div className="navigation-element">
                  <img className="nav-logo" src="icon_signout.png" alt="Sign Out" />
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
                  <img className="nav-logo" src="icon_signup.png" alt="Sign Up" />
                  <h4 className="nav-logo-headers">Sign Up</h4>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink className="navigation-link" to='/login'>
                <div className="navigation-element">
                  <img className="nav-logo" src="icon_profile.png" alt="Login" />
                  <h4 className="nav-logo-headers">Login</h4>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink className="navigation-link" to='/demouser' onClick={handleDemoLogin}>
                <div className="navigation-element">
                  <img className="nav-logo" src="icon_demo.png" alt="Sign Out" />
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
