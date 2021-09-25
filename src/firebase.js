import {initializeApp } from "firebase/firebase-app";
import  {getAnalytics} from "firebase/firebase-analytics";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDekc0uiRvrTXVkEUVx3i56Avvm4519ds4",
  authDomain: "react-firebase-chat-app-be628.firebaseapp.com",
  projectId: "react-firebase-chat-app-be628",
  storageBucket: "react-firebase-chat-app-be628.appspot.com",
  messagingSenderId: "249178632198",
  appId: "1:249178632198:web:582a4473806cad5ba05387",
  measurementId: "G-7NDSHZ0WEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);