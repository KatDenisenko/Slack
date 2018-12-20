import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'
import 'firebase/storage'

let config = {
    apiKey: "AIzaSyDu5mlDk1WVxpbonChZiAu-cEB7wAXlyXU",
    authDomain: "protoslack-39385.firebaseapp.com",
    databaseURL: "https://protoslack-39385.firebaseio.com",
    projectId: "protoslack-39385",
    storageBucket: "protoslack-39385.appspot.com",
    messagingSenderId: "760251021903"
  };
  firebase.initializeApp(config);

  export default firebase;