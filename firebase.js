// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD11J8KVYxxTL59NcaqGqRV7wv6CvRVpaI",
  authDomain: "react-notes-e4b5b.firebaseapp.com",
  projectId: "react-notes-e4b5b",
  storageBucket: "react-notes-e4b5b.appspot.com",
  messagingSenderId: "911323079451",
  appId: "1:911323079451:web:5a46139d236db7722129be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");