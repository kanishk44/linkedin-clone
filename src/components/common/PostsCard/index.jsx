import React, { useMemo, useState } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import LikeButton from "../LikeButton";
import { getUserAPI } from "../../../api/FireStoreAPI";

export default function PostsCard({ posts, postID }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  useMemo(() => {
    getUserAPI(setUser);
  }, []);

  return (
    <div className="posts-card" key={postID}>
      <p
        className="name"
        onClick={() =>
          navigate("/profile", {
            state: { id: posts.userID, email: posts.userEmail },
          })
        }
      >
        {posts.userName}
      </p>
      <p className="timestamp">{posts.timeStamp}</p>
      <p className="status">{posts.status}</p>
      <LikeButton user={user} postId={posts.id} />
    </div>
  );
}
