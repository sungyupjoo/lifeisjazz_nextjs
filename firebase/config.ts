// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoYdDaJ1kPtbZIuUKfgih4rD5DwOLp4-Y",
  authDomain: "life-is-jazz-web-app.firebaseapp.com",
  projectId: "life-is-jazz-web-app",
  storageBucket: "life-is-jazz-web-app.appspot.com",
  messagingSenderId: "457842203864",
  appId: "1:457842203864:web:7256f3fb28658a642bcbad",
  measurementId: "G-887N745BH5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
export { db, auth };
