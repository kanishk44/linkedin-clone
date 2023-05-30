import React, { useState, useEffect } from "react";
import LoginComponent from "../components/LoginComponent";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Loader from "../components/common/Loader/Loader";

export default function Login() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(
    () =>
      onAuthStateChanged(auth, (res) => {
        if (res?.accessToken) {
          navigate("/home");
        } else {
          setLoading(false);
        }
      }),
    []
  );
  return loading ? <Loader /> : <LoginComponent />;
}
