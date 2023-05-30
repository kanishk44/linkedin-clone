// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "linkedin-clone-df545.firebaseapp.com",
  projectId: "linkedin-clone-df545",
  storageBucket: "linkedin-clone-df545.appspot.com",
  messagingSenderId: "1004621795636",
  appId: "1:1004621795636:web:3b8562e482a25c90ee1561",
  measurementId: "G-BQRJ6LZ2JN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireStore = getFirestore(app);
const storage = getStorage(app);
export { storage, app, auth, fireStore };
