// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgb4WPVoBexFQHit_9TEhXO_MCnNlHEEw",
  authDomain: "hackathon-53339.firebaseapp.com",
  databaseURL: "https://hackathon-53339-default-rtdb.firebaseio.com",
  projectId: "hackathon-53339",
  storageBucket: "hackathon-53339.appspot.com",
  messagingSenderId: "828765947710",
  appId: "1:828765947710:web:fdbd2f066c435ca3fdce6f",
  measurementId: "G-H157B6GY2C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };