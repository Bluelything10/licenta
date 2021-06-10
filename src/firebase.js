import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCDKQxNM72GK3UIBsOb2zbNIoQfai1IxDo",
    authDomain: "discord-427ad.firebaseapp.com",
    projectId: "discord-427ad",
    storageBucket: "discord-427ad.appspot.com",
    messagingSenderId: "49328466609",
    appId: "1:49328466609:web:9590094471830dee26d090"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();


  export { auth, provider };
  export default db;