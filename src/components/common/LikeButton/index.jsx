import React, { useState, useMemo } from "react";
import "./index.scss";
import { AiOutlineComment, AiFillLike, AiOutlineLike } from "react-icons/ai";
import {
  postCommentAPI,
  getCommentAPI,
  likePostAPI,
  getLikeAPI,
} from "../../../api/FireStoreAPI";
import { getCurrentTimestamp } from "../../../helpers/useMoment";

export default function LikeButton({ user, postId }) {
  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleLike = () => {
    likePostAPI(user.id, postId, liked);
  };

  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = () => {
    postCommentAPI(postId, user.name, comment, getCurrentTimestamp("LLL"));
  };

  useMemo(() => {
    getLikeAPI(user.id, postId, setLiked, setLikesCount);
    getCommentAPI(postId, setComments);
  }, [user.id, postId]);

  return (
    <div className="like-container">
      <p>{likesCount} people like this</p>
      <div>
        <hr />
      </div>
      <div className="like-comment">
        <div className="likes-icon" onClick={handleLike}>
          {liked ? (
            <AiFillLike color="#0a66c2" size={30} />
          ) : (
            <AiOutlineLike size={30} />
          )}
          <p className={liked ? "blue" : "black"}>Like</p>
        </div>
        <div
          className="comment-box"
          onClick={() => setShowComment(!showComment)}
        >
          <AiOutlineComment
            color={showComment ? "#0a66c2" : "#212121"}
            size={30}
          />
          <p className={showComment ? "blue" : "black"}>Comment</p>
        </div>
      </div>
      {showComment && (
        <>
          <input
            name="comment"
            onChange={getComment}
            className="comment-input"
            placeholder="Write a comment..."
            value={comment}
          />
          <button className="post-btn" onClick={addComment}>
            Post
          </button>
          <div className="comments">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div className="all-comments" key={comment.id}>
                  <p className="username">{comment.name}</p>
                  <p className="comment">{comment.comment}</p>
                  <p className="time">{comment.timeStamp}</p>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </div>
  );
}
