/
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import "firebase/comat/firestore"
import "firebase/compat/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW8Aq3otwFZ05Aq9qcv2sk9qsDT2NjFh0",
  authDomain: "clone-5b4fb.firebaseapp.com",
  projectId: "clone-5b4fb",
  storageBucket: "clone-5b4fb.appspot.com",
  messagingSenderId: "1005782443444",
  appId: "1:1005782443444:web:9fd33f2e4c0988ea29bee1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()