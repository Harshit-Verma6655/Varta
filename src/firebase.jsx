/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import{getStorage} from'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFL-VpMEXPpDDOS-A7-mOzZWfdwnOFQGo",
  authDomain: "vaarta-23463.firebaseapp.com",
  projectId: "vaarta-23463",
  storageBucket: "vaarta-23463.appspot.com",
  messagingSenderId: "496119735414",
  appId: "1:496119735414:web:5a837c6aad038112aceb57"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export let db=getFirestore(app);
export const storage = getStorage(app);