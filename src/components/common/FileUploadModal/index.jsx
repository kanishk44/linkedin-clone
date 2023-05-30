import React, { useState } from "react";
import "./index.scss";
import { Modal, Button, Progress, Space } from "antd";
import { uploadImageAPI } from "../../../api/imageUpload";

export default function FileUploadModal({ userId, modalOpen, setModalOpen }) {
  const [image, setImage] = useState({});
  const [progress, setProgress] = useState(0);
  const getImage = (event) => {
    setImage(event.target.files[0]);
  };

  const uploadImage = () => {
    uploadImageAPI(image, userId, setModalOpen, setProgress, setImage);
  };
  return (
    <Modal
      title="Add a profile picture"
      centered
      open={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={[
        <Button
          disabled={image.name ? false : true}
          key="submit"
          onClick={uploadImage}
          type="primary"
        >
          Upload
        </Button>,
      ]}
    >
      <div className="img-upload-main">
        <p>{image.name}</p>
        <label className="img-upload-btn" htmlFor="image-upload">
          Add an image
        </label>
        {progress > 0 && (
          <div className="progress-bar">
            <Progress type="circle" percent={Math.round(progress)} />
          </div>
        )}
        <input hidden type="file" id="image-upload" onChange={getImage} />
      </div>
    </Modal>
  );
}
