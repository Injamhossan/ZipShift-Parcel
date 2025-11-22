// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOELRNqVcjBp2k2cJY_9LO0hp-XJMxjsc",
  authDomain: "zip-shift-two.firebaseapp.com",
  projectId: "zip-shift-two",
  storageBucket: "zip-shift-two.firebasestorage.app",
  messagingSenderId: "525694339710",
  appId: "1:525694339710:web:34ff2eba8e1b97ca85a62f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
export default app;