import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBuHhtvmZUzpdg3eeBX_t30r5ZOv9b2g_k",
  authDomain: "paperzen-f89e5.firebaseapp.com",
  databaseURL: "https://paperzen-f89e5-default-rtdb.firebaseio.com",
  projectId: "paperzen-f89e5",
  storageBucket: "paperzen-f89e5.firebasestorage.app",
  messagingSenderId: "836082821455",
  appId: "1:836082821455:web:48396f79316989150dfd3a",
  measurementId: "G-R1FRVQQC03"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);


