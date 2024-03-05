// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDdyuPnwFgISej_4MlNdeC_Fl9gQ0UVkoM",
  authDomain: "twitter-web-d8ee4.firebaseapp.com",
  projectId: "twitter-web-d8ee4",
  storageBucket: "twitter-web-d8ee4.appspot.com",
  messagingSenderId: "471316761881",
  databaseURL: "https://twitter-web-d8ee4-default-rtdb.firebaseio.com",
  appId: "1:471316761881:web:8773abb496a64e07b50988",
  measurementId: "G-F4WDBHWMEY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
const analytics = getAnalytics(app);
export default app;