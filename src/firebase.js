// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDekc0uiRvrTXVkEUVx3i56Avvm4519ds4',
  authDomain: 'react-firebase-chat-app-be628.firebaseapp.com',
  databaseURL:
    'https://react-firebase-chat-app-be628-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'react-firebase-chat-app-be628',
  storageBucket: 'react-firebase-chat-app-be628.appspot.com',
  messagingSenderId: '249178632198',
  appId: '1:249178632198:web:582a4473806cad5ba05387',
  measurementId: 'G-7NDSHZ0WEF',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export default firebase;
