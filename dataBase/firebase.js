import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBImcNbvy7T-p0T3tmxONY0JODbAoSYWPo",
  authDomain: "appcontroldegastos-d68c4.firebaseapp.com",
  projectId: "appcontroldegastos-d68c4",
  storageBucket: "appcontroldegastos-d68c4.appspot.com",
  messagingSenderId: "643445159907",
  appId: "1:643445159907:web:54a2bd9c16ace3929192d6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default {
  firebase,
  db,
};
