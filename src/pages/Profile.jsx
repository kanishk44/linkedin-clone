import ProfileComponent from "../components/ProfileComponent";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import Loader from "../components/common/Loader/Loader";
import { onAuthStateChanged } from "firebase/auth";

export default function Profile({ currentUser }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(
    () =>
      onAuthStateChanged(auth, (res) => {
        if (!res?.accessToken) {
          navigate("/");
        } else {
          setLoading(false);
        }
      }),
    []
  );
  return loading ? <Loader /> : <ProfileComponent currentUser={currentUser} />;
}
