import React, { useState } from "react";
import "./index.scss";
import { editUserAPI } from "../../../api/FireStoreAPI";
import { RiCloseCircleLine } from "react-icons/ri";

export default function ProfileEdit({ currentUser, onEdit }) {
  const [inputValue, setInputValue] = useState(currentUser);
  const getInputValue = (e) => {
    let { name, value } = e.target;
    let input = { [name]: value };
    setInputValue({ ...inputValue, ...input });
  };

  const updateProfileData = async () => {
    await editUserAPI(inputValue, currentUser.userID);
    onEdit();
  };

  return (
    <div className="profile-card">
      <div className="edit-btn">
        <RiCloseCircleLine onClick={onEdit} className="close-btn" />
      </div>

      <div className="profile-edit-inputs">
        <label>Name</label>
        <input
          className="edit-input"
          onChange={getInputValue}
          type="text"
          placeholder="Name"
          name="name"
          value={inputValue.name}
        />
        <label>Headline</label>
        <input
          className="edit-input"
          onChange={getInputValue}
          type="text"
          placeholder="Headline"
          name="headline"
          value={inputValue.headline}
        />
        <label>Country</label>
        <input
          className="edit-input"
          onChange={getInputValue}
          type="text"
          placeholder="Location"
          name="country"
          value={inputValue.country}
        />
        <label>City</label>
        <input
          className="edit-input"
          onChange={getInputValue}
          type="text"
          placeholder="City"
          name="city"
          value={inputValue.city}
        />
        <label>Company</label>
        <input
          className="edit-input"
          onChange={getInputValue}
          type="text"
          placeholder="Company"
          name="company"
          value={inputValue.company}
        />
        <label>Industry</label>
        <input
          className="edit-input"
          onChange={getInputValue}
          type="text"
          placeholder="Industry"
          name="industry"
          value={inputValue.industry}
        />
        <label>School</label>
        <input
          className="edit-input"
          onChange={getInputValue}
          type="text"
          placeholder="School"
          name="school"
          value={inputValue.school}
        />
        <label>Website</label>
        <input
          className="edit-input"
          onChange={getInputValue}
          type="text"
          placeholder="Website"
          name="website"
          value={inputValue.website}
        />
        <label>About</label>
        <textarea
          className=""
          onChange={getInputValue}
          rows={5}
          placeholder="Write something about yourself"
          name="about"
          value={inputValue.about}
        />
        <label className="skills-label">Skills</label>
        <input
          className="edit-input"
          onChange={getInputValue}
          type="text"
          placeholder="Skills"
          name="skills"
          value={inputValue.skills}
        />
      </div>

      <div className="save-container">
        <button onClick={updateProfileData} className="save-btn">
          Save
        </button>
      </div>
    </div>
  );
}
