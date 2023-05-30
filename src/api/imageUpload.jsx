import { storage } from "../firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { editUserAPI } from "./FireStoreAPI";

export const uploadImageAPI = async (
  file,
  id,
  setModalOpen,
  setProgress,
  setImage
) => {
  const profilePicsRef = ref(storage, `profileImages/${file.name}`);
  const uploadTask = uploadBytesResumable(profilePicsRef, file);
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress);
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        editUserAPI({ imageLink: downloadURL }, id);
        setImage({});
        setModalOpen(false);
        setProgress(0);
      });
    }
  );
};
