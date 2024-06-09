import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import "./LoginForm.css";

function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="login-outer">

        <div className="login-image">
          <img id="gramLogo" src="icon_login.png" alt={'TravelGram Landing Image'} />
        </div>

        <div className="login-form">
          <h1>Login to TravelGram</h1>

          <form onSubmit={handleSubmit}>
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
              {console.log(errors)}
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

            <button type="submit" className="login-button">Log In</button>
          </form>

        </div>

      </div>
    </>
  )
}

export default LoginFormPage;
