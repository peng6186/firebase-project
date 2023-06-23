// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAj17xUR7nc2kQSCTCTXljLnZia-GqArw",
  authDomain: "fir-project-6b231.firebaseapp.com",
  projectId: "fir-project-6b231",
  storageBucket: "fir-project-6b231.appspot.com",
  messagingSenderId: "26051837056",
  appId: "1:26051837056:web:a354a493f634507b3cfa65",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = new getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
