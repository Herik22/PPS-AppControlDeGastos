import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/compat/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBImcNbvy7T-p0T3tmxONY0JODbAoSYWPo",
  authDomain: "appcontroldegastos-d68c4.firebaseapp.com",
  projectId: "appcontroldegastos-d68c4",
  storageBucket: "appcontroldegastos-d68c4.appspot.com",
  messagingSenderId: "643445159907",
  appId: "1:643445159907:web:54a2bd9c16ace3929192d6",
});

const authentication = firebase.auth();
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
// Create a storage reference from our storage service
//const storageRef = ref(storage);
export { authentication, firebase, app, db, storage };
