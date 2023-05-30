import { fireStore } from "../firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  query,
  where,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

let postsRef = collection(fireStore, "posts");
let userRef = collection(fireStore, "users");
let likeRef = collection(fireStore, "likes");
let commentRef = collection(fireStore, "comments");

export const PostStatusAPI = async (obj) => {
  try {
    await addDoc(postsRef, obj);
    toast.success("Document has been added successfully!");
  } catch (e) {
    console.log(e);
  }
};

export const getStatusAPI = (setStatusArr) => {
  try {
    onSnapshot(postsRef, (response) => {
      setStatusArr(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  } catch (e) {
    console.log(e);
  }
};

export const getUserStatusAPI = (setStatusArr, id) => {
  try {
    const q = query(postsRef, where("userID", "==", id));
    onSnapshot(q, (response) => {
      setStatusArr(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  } catch (e) {
    console.log(e);
  }
};

export const getUserProfileAPI = (setCurrentProfile, email) => {
  try {
    const q = query(userRef, where("email", "==", email));
    onSnapshot(q, (response) => {
      setCurrentProfile(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })[0]
      );
    });
  } catch (e) {
    console.log(e);
  }
};

export const postUserAPI = async (obj) => {
  try {
    await addDoc(userRef, obj);
  } catch (e) {
    console.log(e);
  }
};

export const getUserAPI = (setCurrentUser) => {
  try {
    onSnapshot(userRef, (response) => {
      setCurrentUser(
        response.docs
          .map((doc) => {
            return { ...doc.data(), userID: doc.id };
          })
          .filter((item) => item.email === localStorage.getItem("userEmail"))[0]
      );
    });
  } catch (e) {
    console.log(e);
  }
};

export const editUserAPI = async (obj, id) => {
  try {
    await updateDoc(doc(userRef, id), obj);
    toast.success("Profile updated successfully!");
  } catch (e) {
    console.log(e);
  }
};

export const likePostAPI = (userId, postId, liked) => {
  try {
    let docToLike = doc(likeRef, `${userId}_${postId}`);
    liked ? deleteDoc(docToLike) : setDoc(docToLike, { userId, postId });
  } catch (e) {
    console.log(e);
  }
};

export const getLikeAPI = (userId, postId, setLiked, setLikesCount) => {
  try {
    let likeQuery = query(likeRef, where("postId", "==", postId));
    onSnapshot(likeQuery, (response) => {
      let likes = response.docs.map((doc) => doc.data());
      let likesCount = likes?.length;
      const isLiked = likes.some((like) => like.userId === userId);
      setLikesCount(likesCount);
      setLiked(isLiked);
    });
  } catch (e) {
    console.log(e);
  }
};

export const postCommentAPI = async (postId, name, comment, timeStamp) => {
  try {
    await addDoc(commentRef, { postId, name, comment, timeStamp });
  } catch (e) {
    console.log(e);
  }
};

export const getCommentAPI = (postId, setComments) => {
  try {
    let commentQuery = query(commentRef, where("postId", "==", postId));
    onSnapshot(commentQuery, (response) => {
      setComments(
        response.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  } catch (e) {
    console.log(e);
  }
};
