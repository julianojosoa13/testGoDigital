// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAM3FosOdo-yVaRU1jK12RbQQU3iaj4ekY",
  authDomain: "gopharma-230d7.firebaseapp.com",
  projectId: "gopharma-230d7",
  storageBucket: "gopharma-230d7.firebasestorage.app",
  messagingSenderId: "193172513145",
  appId: "1:193172513145:web:b26cc76a5f24177b644fa8",
  measurementId: "G-BLNT9V0BX3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
