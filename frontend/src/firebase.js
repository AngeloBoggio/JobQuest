// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTm80Ydw-l1mxwlczWqUjbabvTovcG4p4",
    authDomain: "careerlinc-48e22.firebaseapp.com",
    projectId: "careerlinc-48e22",
    storageBucket: "careerlinc-48e22.appspot.com",
    messagingSenderId: "772803851101",
    appId: "1:772803851101:web:3f592e4c96bb1a9f30aeb4",
    measurementId: "G-0YL49MMB33"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);