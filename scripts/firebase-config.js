// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyABApEmFxCO-0gwbOOxZAO1Svfa9fPwCuM",
  authDomain: "avaliacoes-pjd.firebaseapp.com",
  databaseURL: "https://avaliacoes-pjd-default-rtdb.firebaseio.com/",
  projectId: "avaliacoes-pjd",
  storageBucket: "avaliacoes-pjd.firebasestorage.app",
  messagingSenderId: "186731526269",
  appId: "1:186731526269:web:0090fcb93c36531b731914",
  measurementId: "G-VNZ0KFLRKM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
window.db = firebase.database();