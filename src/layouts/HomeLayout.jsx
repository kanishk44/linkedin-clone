import React, { useMemo, useState } from "react";
import Home from "../pages/Home";
import Topbar from "../components/common/Topbar";
import { getUserAPI } from "../api/FireStoreAPI";
export default function HomeLayout() {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getUserAPI(setCurrentUser);
  }, []);
  return (
    <div>
      <Topbar />
      <Home currentUser={currentUser} />
    </div>
  );
}
