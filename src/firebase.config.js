// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxaItILKrOrhdswYY4TX0nzHGK0V7Jr2Q",
  authDomain: "syfp-86787.firebaseapp.com",
  projectId: "syfp-86787",
  storageBucket: "syfp-86787.appspot.com",
  messagingSenderId: "219525998979",
  appId: "1:219525998979:web:efd00512bda6fbe9506eb6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const firestore = getFirestore(app)