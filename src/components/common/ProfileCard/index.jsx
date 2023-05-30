import React, { useState, useMemo, useEffect } from "react";
import "./index.scss";
import PostsCard from "../PostsCard";
import { useLocation } from "react-router-dom";
import FileUploadModal from "../FileUploadModal";
import { getUserProfileAPI, getUserStatusAPI } from "../../../api/FireStoreAPI";
import { MdOutlineEdit } from "react-icons/md";

export default function ProfileCard({ currentUser, onEdit }) {
  const location = useLocation();
  const [statusArr, setStatusArr] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  useMemo(() => {
    if (location?.state?.id) {
      getUserStatusAPI(setStatusArr, location.state.id);
    }
    if (location?.state?.email) {
      getUserProfileAPI(setCurrentProfile, location.state.email);
    }
  }, []);

  return (
    <>
      <div className="profile-card">
        <FileUploadModal
          userId={currentUser.userID}
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
        />

        <div className="edit-btn">
          <MdOutlineEdit onClick={onEdit} className="edit-icon" />
        </div>
        <div className="profile-info">
          <div className="left-info">
            <img
              onClick={() => setModalOpen(true)}
              className="profile-img"
              src={currentUser.imageLink}
              alt="profile"
            />
            <h3 className="userName">
              {Object.values(currentProfile).length > 0
                ? currentProfile.name
                : currentUser.name}
            </h3>
            <p className="userHeadline">
              {Object.values(currentProfile).length > 0
                ? currentProfile.headline
                : currentUser.headline}
            </p>
            <p className="userLocation">
              {Object.values(currentProfile).length > 0
                ? `${currentProfile.city}, ${currentProfile.country}`
                : `${currentUser.city}, ${currentUser.country}`}
            </p>

            <a
              href={
                Object.values(currentProfile).length > 0
                  ? currentProfile.website
                  : currentUser.website
              }
              target="_blank"
              className="userWebsite"
            >
              {Object.values(currentProfile).length > 0
                ? currentProfile.website
                : currentUser.website}
            </a>
            <p className="userBio">
              {Object.values(currentProfile).length > 0
                ? currentProfile.about
                : currentUser.about}
            </p>

            <p className="skills">
              <span className="userSkills">Skills: </span>
              {Object.values(currentProfile).length > 0
                ? currentProfile.skills
                : currentUser.skills}
            </p>
          </div>
          <div className="right-info">
            <p className="userSchool">
              {Object.values(currentProfile).length > 0
                ? currentProfile.school
                : currentUser.school}
            </p>
            <p className="userCompany">
              {Object.values(currentProfile).length > 0
                ? currentProfile.company
                : currentUser.company}
            </p>
          </div>
        </div>
      </div>
      <div className="post-status-main">
        {statusArr?.map((item) => {
          return (
            <div key={item.postID}>
              <PostsCard posts={item} />
            </div>
          );
        })}
      </div>
    </>
  );
}
