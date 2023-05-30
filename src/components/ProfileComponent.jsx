import React, { useState } from "react";
import ProfileCard from "./common/ProfileCard";
import ProfileEdit from "./common/ProfileEdit";

export default function ProfileComponent({ currentUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const onEdit = () => {
    setIsEditing(!isEditing);
  };
  return isEditing ? (
    <ProfileEdit onEdit={onEdit} currentUser={currentUser} />
  ) : (
    <ProfileCard currentUser={currentUser} onEdit={onEdit} />
  );
}
