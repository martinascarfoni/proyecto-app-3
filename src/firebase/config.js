import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDdsEuTPwOx8AGLYrw6nB9053jBbakZxJ4",
    authDomain: "proyecto-integrador-3-55183.firebaseapp.com",
    projectId: "proyecto-integrador-3-55183",
    storageBucket: "proyecto-integrador-3-55183.appspot.com",
    messagingSenderId: "128774463148",
    appId: "1:128774463148:web:70f23a3180061975b98909"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();

