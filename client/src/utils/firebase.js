// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "taskbntu.firebaseapp.com",
  projectId: "taskbntu",
  storageBucket: "taskbntu.appspot.com",
  messagingSenderId: "223929272997",
  appId: "1:223929272997:web:5fbf79973e6881d8729b4c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);