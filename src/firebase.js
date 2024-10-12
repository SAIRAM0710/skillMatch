// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // Ensure this line is present


const firebaseConfig = {
    apiKey: "AIzaSyChpymChpH_ahinNigRzI6_vCgldoPTWcA",
    authDomain: "skillmatchdb-341fe.firebaseapp.com",
    projectId: "skillmatchdb-341fe",
    storageBucket: "skillmatchdb-341fe.appspot.com",
    messagingSenderId: "670698719360",
    appId: "1:670698719360:web:02ba0ac465bbe393ec7e65",
    measurementId: "G-ZMD6WMNMKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 
