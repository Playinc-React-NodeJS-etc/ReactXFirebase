import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyC4c9V5eR9vfabKZoWeoll8wnSPDmPntf4",
  authDomain: "najasin-f89db.firebaseapp.com",
  projectId: "najasin-f89db",
  storageBucket: "najasin-f89db.firebasestorage.app",
  messagingSenderId: "958806386588",
  appId: "1:958806386588:web:76a3df159fd497adc50a59",
  measurementId: "G-S7EWW4Y9XW"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
export default app;