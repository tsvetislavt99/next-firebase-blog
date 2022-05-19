import { initializeApp, getApps } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBa3Sb0eHbG0rQtjVKBAsbll6MaJpppSW4',
    authDomain: 'next-fire-blog-f8890.firebaseapp.com',
    projectId: 'next-fire-blog-f8890',
    storageBucket: 'next-fire-blog-f8890.appspot.com',
    messagingSenderId: '163263960478',
    appId: '1:163263960478:web:ca64078f34aa299a1c728f',
    measurementId: 'G-FHKJ64Y41N',
};

if (!getApps().length) {
    initializeApp(firebaseConfig);
}

export const auth = getAuth();
export const googleAuthProvider = new GoogleAuthProvider();
export const firestore = getFirestore();
export const storage = getStorage();
export default firebaseConfig;
