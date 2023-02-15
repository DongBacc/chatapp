// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyA1Ws8MFMnPe5kIgfBZKp18bXpudfrsMIo',
    authDomain: 'chatapp-f2d48.firebaseapp.com',
    projectId: 'chatapp-f2d48',
    storageBucket: 'chatapp-f2d48.appspot.com',
    messagingSenderId: '898728542479',
    appId: '1:898728542479:web:5f1ec36fc2f4eea425fe7a',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
