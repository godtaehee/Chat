// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);


export default firebase;
