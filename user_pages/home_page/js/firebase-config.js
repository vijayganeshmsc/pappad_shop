// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSZX8pYcVofhYSQcUvJ5nA3btBtL1qY3k",
  authDomain: "pappad-shop-auth.firebaseapp.com",
  projectId: "pappad-shop-auth",
  storageBucket: "pappad-shop-auth.firebasestorage.app",
  messagingSenderId: "224698273939",
  appId: "1:224698273939:web:e9f3e020e4e7733c6b7d66",
  measurementId: "G-H4RR78JSYE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);