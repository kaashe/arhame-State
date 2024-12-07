// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "arham-estate.firebaseapp.com",
  projectId: "arham-estate",
  storageBucket: "arham-estate.firebasestorage.app",
  messagingSenderId: "865851955958",
  appId: "1:865851955958:web:e86af100411fb63c6f6ad7",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
