import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../images/logo.png";
import { useAuth } from "../components/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Reset() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [eyesSlash, setEyesSlash] = useState({
    eyePassword: true,
    eyePasswordAgain: true,
  });
  const [resetInfor, setResetInfor] = useState({
    email: "",
    password: "",
    passwordAgain: "",
  });

  const handleReset = async () => {
    if (resetInfor.password === resetInfor.passwordAgain) {
      try {
        const passData = {
          email: resetInfor.email,
          password: resetInfor.password,
        };
        const options = {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(passData),
        };
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(apiUrl + "/member/reset", options);
        
        if (!response.ok) throw new Error(response.message);
        navigate("/login");
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Passwords must be the same!");
    }
  };

  function handleChange(e) {
    setResetInfor((preInfor) => ({
      ...preInfor,
      [e.target.name]: e.target.value,
    }));
  }

  const handleClickEye = (e) => {
    setEyesSlash({
      ...eyesSlash,
      [e.target.closest(".togglePassword").title]:
        !eyesSlash[e.target.closest(".togglePassword").title],
    });
    const input = e.target.closest(".card__field-group").firstChild;
    const type = input.type === "password" ? "text" : "password";
    input.setAttribute("type", type);
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  return (
    <>
      {!isLoggedIn && (
        <div className="bg-bg-primary">
          <div className="login-container justify-content-center align-items-center ">
            <div className="card__shadow register__shadow position-absolute bg-primary"></div>
            <div className="card position-relative bg-white flex flex-col justify-content-center  align-items-center">
              <img src={logoImage} alt="logo" className="mb-d75" />
              <h2 className="card__title text-primary fw-bold ">
                Reset Password
              </h2>
              <p className="card__text mb-1d5 text-light">
                Resetting password via email
              </p>
              <div className="card__field-group mb-1d5">
                <input
                  className="card__input-field d-block w-100 py-1"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={resetInfor.email}
                  onChange={(e) => handleChange(e)}
                />
                <div className="icon">
                  <span className="material-symbols-outlined">email</span>
                </div>
              </div>
              <div className="card__field-group mb-1d5">
                <input
                  className="card__input-field d-block w-100 py-1"
                  type="password"
                  placeholder="New Password"
                  name="password"
                  value={resetInfor.password}
                  onChange={(e) => handleChange(e)}
                />
                <span
                  title="eyePassword"
                  className="togglePassword"
                  onClick={(e) => handleClickEye(e)}
                >
                  {eyesSlash.eyePassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </span>
                <div className="icon">
                  <span className="material-symbols-outlined">key</span>
                </div>
              </div>
              <div className="card__field-group mb-1d5">
                <input
                  className="card__input-field d-block w-100 py-1 "
                  type="password"
                  placeholder="New Password Again"
                  name="passwordAgain"
                  value={resetInfor.passwordAgain}
                  onChange={(e) => handleChange(e)}
                />
                <span
                  title="eyePasswordAgain"
                  className="togglePassword"
                  onClick={(e) => handleClickEye(e)}
                >
                  {eyesSlash.eyePasswordAgain ? (
                    <FontAwesomeIcon icon={faEyeSlash} />
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </span>
                <div className="icon">
                  <span className="material-symbols-outlined">key</span>
                </div>
              </div>
              <Link
                onClick={handleReset}
                className="w-100 text-center bg-primary py-1 mb-1"
              >
                <p className="card__text text-white fw-bold">Reset</p>
              </Link>
              <Link
                to="/login"
                className="d-block w-100 text-center py-1  border border-2 border-text"
              >
                <p className="card__text text-text fw-bold">Back to login</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Reset;
