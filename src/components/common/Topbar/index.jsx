import React, { useState } from "react";
import "./index.scss";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { BsBriefcaseFill } from "react-icons/bs";
import user from "../../../assets/user.png";
import { useNavigate } from "react-router-dom";
import ProfilePopup from "../ProfilePopup";

export default function Topbar() {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const goToRoute = (route) => {
    navigate(route);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="topbar-main">
      {showPopup && <ProfilePopup />}
      <img src={LinkedinLogo} className="linkedin-logo-topbar" />
      <div className="react-icons">
        <AiOutlineSearch className="react-icon" size={25} />
        <AiOutlineHome
          className="react-icon"
          size={30}
          onClick={() => goToRoute("/home")}
        />
        <FiUsers
          className="react-icon"
          size={30}
          onClick={() => goToRoute("/profile")}
        />
        <BsBriefcaseFill className="react-icon" size={30} />
        <AiOutlineMessage className="react-icon" size={30} />
        <AiOutlineBell className="react-icon" size={30} />
      </div>
      <img src={user} className="user-icon" onClick={togglePopup} />
    </div>
  );
}
