import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRYHl8HNR7NIdEvx8_4koAacl8TztDkyc",
  authDomain: "tennis-league-gt.firebaseapp.com",
  projectId: "tennis-league-gt",
  storageBucket: "tennis-league-gt.firebasestorage.app",
  messagingSenderId: "563145632335",
  appId: "1:563145632335:web:c82d4c99a93ebf95f4183a",
  measurementId: "G-1DTJRH69VP",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export default app;
export { db, auth, storage };
