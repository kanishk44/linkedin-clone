import React, { useMemo, useState } from "react";
import Profile from "../pages/Profile";
import Topbar from "../components/common/Topbar";
import { getUserAPI } from "../api/FireStoreAPI";
export default function ProfileLayout() {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getUserAPI(setCurrentUser);
  }, []);
  return (
    <div>
      <Topbar />
      <Profile currentUser={currentUser} />
    </div>
  );
}
