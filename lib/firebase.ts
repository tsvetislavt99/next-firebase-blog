import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBa3Sb0eHbG0rQtjVKBAsbll6MaJpppSW4',
    authDomain: 'next-fire-blog-f8890.firebaseapp.com',
    projectId: 'next-fire-blog-f8890',
    storageBucket: 'next-fire-blog-f8890.appspot.com',
    messagingSenderId: '163263960478',
    appId: '1:163263960478:web:ca64078f34aa299a1c728f',
    measurementId: 'G-FHKJ64Y41N',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
