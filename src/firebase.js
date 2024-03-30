import { initializeApp } from "firebase/app";
import  { getAuth } from "firebase/auth";
import  { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

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
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const database = getDatabase();

export default app;