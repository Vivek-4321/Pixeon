const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getFirestore } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyAK12eZNQppIJw5hFaCGgdE4NNZovhQq-Q",
  authDomain: "blog-app-5ed76.firebaseapp.com",
  projectId: "blog-app-5ed76",
  storageBucket: "blog-app-5ed76.appspot.com",
  messagingSenderId: "335196193763",
  appId: "1:335196193763:web:8629d152d99e22d180d6d6",
  measurementId: "G-ML5VPDKZVX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);
const database = getDatabase();

module.exports = { app, storage, auth, db, database };