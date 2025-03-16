// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB2mqqSUYlcaeRsThrNoKdHiIWeZUWE-Y0",
    authDomain: "doc-house-building.firebaseapp.com",
    projectId: "doc-house-building",
    storageBucket: "doc-house-building.firebasestorage.app",
    messagingSenderId: "307804638511",
    appId: "1:307804638511:web:5800e38e974c02af7465da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;