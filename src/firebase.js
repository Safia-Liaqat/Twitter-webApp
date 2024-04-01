// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCN6QH3mi9xd4hfm3zvoxkapA0mrebFRSI",
  authDomain: "chirphub-2b16e.firebaseapp.com",
  projectId: "chirphub-2b16e",
  storageBucket: "chirphub-2b16e.appspot.com",
  messagingSenderId: "250846549702",
  appId: "1:250846549702:web:251bedad681b82b36069c7",
  databaseURL: "https://chirphub-2b16e-default-rtdb.firebaseio.com/",
  measurementId: "G-Z1R5FK4FPC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app);
const analytics = getAnalytics(app);
export default app;