import React, { useState } from "react";
import { GoogleSignInAPI, RegisterAPI } from "../api/AuthAPI";
import "../sass/LoginComponent.scss";
import { postUserAPI } from "../api/FireStoreAPI";
import LinkedinLogo from "../assets/linkedinLogo.png";
import GoogleButton from "react-google-button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getUniqueId } from "../helpers/getUniqueId";

export default function RegisterComponent() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const register = async () => {
    try {
      let res = await RegisterAPI(credentials.email, credentials.password);
      toast.success("Welcome to LinkedIn!");
      postUserAPI({
        name: credentials.name,
        email: credentials.email,
        id: getUniqueId(),
      });
      navigate("/home");
      localStorage.setItem("userEmail", res.user.email);
    } catch (err) {
      toast.error("There was an error creating your account");
    }
  };

  const googleSignIn = async () => {
    let response = await GoogleSignInAPI();
    navigate("/home");
  };

  return (
    <div className="login-wrapper">
      <img src={LinkedinLogo} className="linkedin-logo" />
      <div className="login-wrapper-inner">
        <h1 className="heading">Make the most of your professional life</h1>
        <div className="auth-inputs">
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, name: event.target.value })
            }
            className="common-input"
            type="text"
            placeholder="Your Name"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, email: event.target.value })
            }
            className="common-input"
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(event) =>
              setCredentials({ ...credentials, password: event.target.value })
            }
            type="password"
            className="common-input"
            placeholder="Password (6 or more characters)"
          />
        </div>
        <button onClick={register} className="login-btn">
          Agree & Join
        </button>
      </div>
      <hr className="hr-text" data-content="or" />
      <div className="google-btn-container">
        <GoogleButton className="google-btn" onClick={googleSignIn} />
        <p className="go-to-signup">
          Already on LinkedIn?{" "}
          <span className="join-now" onClick={() => navigate("/")}>
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
