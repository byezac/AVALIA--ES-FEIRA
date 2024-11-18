// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABApEmFxCO-0gwbOOxZAO1Svfa9fPwCuM",
  authDomain: "avaliacoes-pjd.firebaseapp.com",
  projectId: "avaliacoes-pjd",
  storageBucket: "avaliacoes-pjd.firebasestorage.app",
  messagingSenderId: "186731526269",
  appId: "1:186731526269:web:0090fcb93c36531b731914",
  measurementId: "G-VNZ0KFLRKM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);