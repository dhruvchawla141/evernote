import firebase from "firebase/app";

import "firebase/storage";
import "firebase/firestore";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBDygpq1mXtqMStKJxusgqkOZcf7iJHtZ4",
  authDomain: "lenote-6b6b1.firebaseapp.com",
  projectId: "lenote-6b6b1",
  storageBucket: "lenote-6b6b1.appspot.com",
  messagingSenderId: "746288167671",
  appId: "1:746288167671:web:39bf2b0c779025e8e131f2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
//const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export default { projectStorage, projectFirestore };
