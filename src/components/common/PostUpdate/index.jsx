import React, { useState, useMemo } from "react";
import "./index.scss";
import "../../../sass/HomeComponent.scss";
import ModalComponent from "../../common/Modal";
import PostsCard from "../../common/PostsCard";
import { PostStatusAPI, getStatusAPI } from "../../../api/FireStoreAPI";
import { getCurrentTimestamp } from "../../../helpers/useMoment";
import { getUniqueId } from "../../../helpers/getUniqueId";

export default function PostStatus({ currentUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [statusArr, setStatusArr] = useState([]);

  const sendStatus = async () => {
    const obj = {
      status: status,
      timeStamp: getCurrentTimestamp("LLL"),
      userEmail: currentUser.email,
      userName: currentUser.name,
      postID: getUniqueId(),
      userID: currentUser.id,
    };
    await PostStatusAPI(obj);
    setModalOpen(false);
    setStatus("");
  };

  useMemo(() => {
    getStatusAPI(setStatusArr);
  }, []);

  return (
    <div className="post-status-main">
      <div className="post-status">
        <button
          className="post-status-button"
          onClick={() => setModalOpen(true)}
        >
          Start a post
        </button>
      </div>
      <ModalComponent
        setStatus={setStatus}
        status={status}
        sendStatus={sendStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <div>
        {statusArr.map((item) => {
          return (
            <div key={item.postID}>
              <PostsCard posts={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
