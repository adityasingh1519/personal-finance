// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth ,GoogleAuthProvider } from "firebase/auth";
import { getFirestore , doc , setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLfQRpvwyGE7dVErIFbnnySS8zhBhslVE",
  authDomain: "personal-finance-f2e6d.firebaseapp.com",
  projectId: "personal-finance-f2e6d",
  storageBucket: "personal-finance-f2e6d.appspot.com",
  messagingSenderId: "123092829269",
  appId: "1:123092829269:web:275e2ce5831d0fd26dc0dc",
  measurementId: "G-NZCS7E7LM9"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {db , auth , provider , doc , setDoc};
