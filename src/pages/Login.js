import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../images/logo.png";
import { useAuth } from "../components/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { loginIn } from "../features/login/loginSlice";

function Login() {
  const isLogged = useSelector((state) => state.loginer.isLogged);
  const dispatch = useDispatch();

  const {
    isLoggedIn,
    login,
    memberIdSet,
    setCsrfRefreshToken,
    setCsrfAccessToken,
  } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isPanding, setIsPanding] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassowrd] = useState("");
  const handleLogin = async () => {
    setIsPanding(true);
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(apiUrl + "/member/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setIsPanding(false);
      memberIdSet(data.id);
      dispatch(loginIn());
      login();
      setCsrfRefreshToken(data.csrf_refresh_token);
      setCsrfAccessToken(data.csrf_access_token);
    } catch (error) {
      setIsPanding(false);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
    if (isLogged === true) {
      console.log(isLogged);
    }
  }, [isLoggedIn, navigate, isLogged]);
  return (
    <>
      {!isLoggedIn && (
        <div className="bg-bg-primary">
          <div className="login-container  justify-content-center align-items-center ">
            <div className="card__shadow position-absolute bg-primary"></div>
            <div className="card position-relative bg-white flex flex-col justify-content-center  align-items-center">
              <img src={logoImage} alt="logo" className="mb-d75" />
              <h2 className="card__title text-primary fw-bold ">Login</h2>
              <p className="card__text mb-1d5 text-light">
                Sign in to your account
              </p>
              <div className="card__field-group mb-1d5">
                <input
                  className="card__input-field d-block w-100 py-1"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="icon">
                  <span className="material-symbols-outlined">person</span>
                </div>
              </div>
              <div className="card__field-group mb-1d5">
                <input
                  className="card__input-field d-block w-100 py-1 "
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassowrd(e.target.value)}
                />
                <div className="icon">
                  <span className="material-symbols-outlined">key</span>
                </div>
              </div>
              <button
                onClick={handleLogin}
                className="w-100 text-center bg-primary py-1 mb-1 border-0"
              >
                <p className="card__text text-white fw-bold">
                  {isPanding ? "Panding..." : "Login"}
                </p>
              </button>
              <p
                className={`error text-red ${
                  errorMessage === "" ? "" : "mb-1"
                }`}
              >
                {errorMessage}
              </p>
              <Link to="/reset" className="mb-1">
                <p className="text-text">
                  Forgot Password? Click here to reset
                </p>
              </Link>
              <Link
                to="/register"
                className="d-block w-100 text-center py-1  border border-2 border-text"
              >
                <p className="card__text text-text fw-bold">
                  Sign Up New Account
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
