import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyD5bTskwh5kEEFdcDQJCsAVmkj9RNRyEuE",
    authDomain: "opine-e59fd.firebaseapp.com",
    projectId: "opine-e59fd",
    storageBucket: "opine-e59fd.firebasestorage.app",
    messagingSenderId: "948277018992",
    appId: "1:948277018992:web:3b71a9378619e2dba08fb5"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };