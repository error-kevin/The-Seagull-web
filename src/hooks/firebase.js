// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
z
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdY6ZSJyP6MGs_sgrZMkmX-4G7ulqDNoA",
  authDomain: "inditech-in.firebaseapp.com",
  projectId: "inditech-in",
  storageBucket: "inditech-in.appspot.com",
  messagingSenderId: "992927960260",
  appId: "1:992927960260:web:ac91b922ddc60e13594d91",
  measurementId: "G-QMX8BVLKVD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);