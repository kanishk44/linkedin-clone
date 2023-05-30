import React, { useState, useMemo } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { LogoutAPI } from "../../../api/AuthAPI";
import Button from "../Button";
import { getUserAPI } from "../../../api/FireStoreAPI";

export default function ProfilePopup() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getUserAPI(setCurrentUser);
  }, []);

  return (
    <div className="popup-card">
      <p className="name">{currentUser.name}</p>
      <p className="headline">{currentUser.headline}</p>
      <Button
        title="View Profile"
        onClick={() =>
          navigate("/profile", {
            state: { id: currentUser?.id },
          })
        }
      />
      <Button title="Sign out" onClick={LogoutAPI} />
    </div>
  );
}
