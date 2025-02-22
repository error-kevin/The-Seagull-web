import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBivWbMvj9sv4mGdnMLgfCC587uuR7r24M",
  authDomain: "gdgocsvvv.firebaseapp.com",
  projectId: "gdgocsvvv",
  storageBucket: "gdgocsvvv.appspot.com",
  messagingSenderId: "1059486900086",
  appId: "1:1059486900086:web:bcd959d1cefa5b22c1a457",
  measurementId: "G-TKTB8L6ZD7",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
