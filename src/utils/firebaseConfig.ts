// src/utils/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // For Firestore
import { getStorage } from "firebase/storage";  // For Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyCGPLUvC0L2ur0wLufFjArqERjKpu5N8zI",
  authDomain: "enershas-webportal.firebaseapp.com",
  projectId: "enershas-webportal",
  storageBucket: "enershas-webportal.appspot.com",
  messagingSenderId: "291338774829",
  appId: "1:291338774829:web:4cb3bed89ffa7e3bd04ba4",
  measurementId: "G-XZWY504GFT"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

export default app;
