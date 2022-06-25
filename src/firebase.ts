// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzXScf6I3q-K2Vtljs30gEQhNhCi423SU",
  authDomain: "gallery-5f769.firebaseapp.com",
  projectId: "gallery-5f769",
  storageBucket: "gallery-5f769.appspot.com",
  messagingSenderId: "746371075279",
  appId: "1:746371075279:web:c96d344a2ef76bb891fbba",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const firestore = getFirestore();

export { storage, firestore, app };
