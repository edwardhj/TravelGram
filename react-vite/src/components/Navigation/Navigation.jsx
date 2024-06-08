import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation({ isLoaded }) {
  const navigate = useNavigate();

  function NavigateHome(){
    return navigate('/')
  }

  function NavigateToProfile() {
    return navigate('/clips/current')
  }

  function NavigateToExplore() {
    return navigate('/users')
  }

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

          </>
        )}

      </ul>
      
    </div>
  );
}

export default Navigation;
