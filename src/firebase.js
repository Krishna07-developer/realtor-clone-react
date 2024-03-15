// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCI86L1tKxXTwyTo9enyrfdJkKQdPB96yg",
  authDomain: "realtor-clone-react-316c4.firebaseapp.com",
  projectId: "realtor-clone-react-316c4",
  storageBucket: "realtor-clone-react-316c4.appspot.com",
  messagingSenderId: "511540437849",
  appId: "1:511540437849:web:8bbe64ce2b20ad3334a248"
};

// Initialize Firebase
export const app =  initializeApp(firebaseConfig);
export const db = getFirestore(app)