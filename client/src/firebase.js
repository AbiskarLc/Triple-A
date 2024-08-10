// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoIy1y7pDRUgUXeDADhxikHaRYq49Oezc",
  authDomain: "socialpedia-85f7c.firebaseapp.com",
  projectId: "socialpedia-85f7c",
  storageBucket: "socialpedia-85f7c.appspot.com",
  messagingSenderId: "1056292941428",
  appId: "1:1056292941428:web:181ccc2bc0dc1f0e32eb21",
  measurementId: "G-Y3S6G466RH"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);