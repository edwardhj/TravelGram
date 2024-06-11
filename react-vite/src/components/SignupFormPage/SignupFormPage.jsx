import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { thunkSignup, thunkLogin } from "../../redux/session";
import "./SignUpForm.css";
import phoneimage from '../../assets/images/icon_login.png';

function SignupFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sessionUser = useSelector((state) => state.session.user);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (password !== confirmPassword) {
    //   return setErrors({
    //     confirmPassword:
    //       "Confirm Password field must be the same as the Password field",
    //   });
    // }

    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    if (profilePic) formData.append("profile_pic", profilePic);

    const serverResponse = await dispatch(thunkSignup(formData))
  
    if (serverResponse) {
      setErrors(serverResponse);
    } 
    else {
      await dispatch(
        thunkLogin({
        email: email,
        password: password
        })
      )
      navigate('/')
    }
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  return (
    <>
      <div className="login-outer">

        <div className="login-image">
          <img id="gramLogo" src={phoneimage} alt={'TravelGram Landing Image'} />
        </div>

        <div className="login-form">
          <h1>Sign Up for TravelGram</h1>
          <form onSubmit={handleSubmit}>

            <label className="login-label">
              First Name
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            {errors.firstName && <p className="error-message">{errors.firstName}</p>}


            <label className="login-label">
              Last Name
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            {errors.lastName && <p className="error-message">{errors.lastName}</p>}

            <label className="login-label">
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            {errors.username && <p className="error-message">{errors.username}</p>}

            <label className="login-label">
              Email
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            {errors.email && <p className="error-message">{errors.email}</p>}

            <label className="login-label">
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {errors.password && <p className="error-message">{errors.password}</p>}

            {/* <label className="login-label">
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            {errors.confirm_password && <p className="error-message">{errors.confirm_password}</p>} */}
            
            <label className="login-label">
              Profile Picture
              <div className="profile-pic-container">
                <input
                  id="profilePicUpload"
                  type="file"
                  onChange={handleProfilePicChange}
                  accept="image/*"
                />
                <label htmlFor="profilePicUpload" className="upload-button">Upload</label>
              </div>
              {profilePic && <p className="uploaded-filename">File uploaded: {profilePic.name}</p>}
            </label>

            <button type="submit" className="login-button">Sign Up</button>
          </form>
        </div>

      </div>
    </>
  );
}

export default SignupFormPage;
