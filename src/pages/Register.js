import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../images/logo.png";
import { useAuth } from '../components/AuthContext';

function Register() {
  const { isLoggedIn } = useAuth();
  const [isPanding, setIsPanding] = useState(true)
  const navigate = useNavigate();

  const [newMember, setNewMember] = useState({email:"", username:"", password:""})
  const handleChange = (propertyName, value) => {
    const member = {...newMember, [propertyName]:value}
    setNewMember(member)
  }

  const handleSignup = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(apiUrl + "/member/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newMember)
      })
      if (!response.ok) throw new Error("Register dose not success")
      const data = await response.json()
      navigate('/login')
    } catch (error) {
      alert(error.message)
    }
  }
  


  useEffect(() => {
    setIsPanding(false)
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  return (
    <>
      {isPanding ? (
        <h2>Panding...</h2>
      ) : (
        !isLoggedIn && (
          <div className="bg-bg-primary">
            <div className="login-container justify-content-center align-items-center ">
              <div className="card__shadow register__shadow position-absolute bg-primary"></div>
              <div className="card position-relative bg-white flex flex-col justify-content-center  align-items-center">
                <img src={logoImage} alt="logo" className="mb-d75" />
                <h2 className="card__title text-primary fw-bold ">Sign Up</h2>
                <p className="card__text mb-1d5 text-light">Sign up to continue</p>
                <div className="card__field-group mb-1d5">
                  <input
                    className="card__input-field d-block w-100 py-1"
                    type="text"
                    placeholder="Emain"
                    value={newMember.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                  />
                  <div className="icon">
                    <span className="material-symbols-outlined">email</span>
                  </div>
                </div>
                <div className="card__field-group mb-1d5">
                  <input
                    className="card__input-field d-block w-100 py-1"
                    type="text"
                    placeholder="Username"
                    value={newMember.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                  />
                  <div className="icon">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                </div>
                <div className="card__field-group mb-1d5">
                  <input
                    className="card__input-field d-block w-100 py-1 "
                    type="text"
                    placeholder="Password"
                    value={newMember.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                  <div className="icon">
                    <span className="material-symbols-outlined">key</span>
                  </div>
                </div>
                <button onClick={handleSignup} className="w-100 text-center bg-primary py-1 mb-1">
                  <p className="card__text text-white fw-bold">Sign Up</p>
                </button>
                <Link to="/login" className="d-block w-100 text-center py-1  border border-2 border-text">
                  <p className="card__text text-text fw-bold">
                    Back to login
                  </p>
                </Link>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default Register;
