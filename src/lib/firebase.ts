import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBoNw3Si5ftl8U_pzSL1xiGVrUxVy5Jbb4",
  authDomain: "studio-1196607384-437b5.firebaseapp.com",
  databaseURL: "https://studio-1196607384-437b5-default-rtdb.firebaseio.com",
  projectId: "studio-1196607384-437b5",
  storageBucket: "studio-1196607384-437b5.firebasestorage.app",
  messagingSenderId: "189254743086",
  appId: "1:189254743086:web:2d220764eeffc5acacdbbf",
  measurementId: "G-MHE5G9DHD8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
export const auth = getAuth(app);
