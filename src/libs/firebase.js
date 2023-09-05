// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2st3LEYE5e2z6Nk1Y3L8lnVSrgCo7XXw",
  authDomain: "viajante-b0e2a.firebaseapp.com",
  projectId: "viajante-b0e2a",
  databaseURL: "https://viajante-b0e2a-default-rtdb.firebaseio.com/",
  storageBucket: "viajante-b0e2a.appspot.com",
  messagingSenderId: "804283966108",
  appId: "1:804283966108:web:a3ba5e9c2923b280a68359",
  measurementId: "G-240DVWXXS5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
