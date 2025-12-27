import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCjf3BZbW9_zWUz5OyPA0D1VrfO1VvVVw",
  authDomain: "campus-navig-f0363.firebaseapp.com",
  projectId: "campus-navig-f0363",
  storageBucket: "campus-navig-f0363.appspot.com",
  messagingSenderId: "1003298965652",
  appId: "1:1003298965652:web:5224e5d068d00e9bb08c81",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ EXPORT AUTH (THIS WAS MISSING)
export const auth = getAuth(app);
