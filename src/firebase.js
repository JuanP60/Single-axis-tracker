import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB7bwGLndBxHWfE5aPKJA_jtIlcgl9pq2A",
  authDomain: "dbsolartracking.firebaseapp.com",
  projectId: "dbsolartracking",
  storageBucket: "dbsolartracking.firebasestorage.app",
  messagingSenderId: "151977321429",
  appId: "1:151977321429:web:9ee49aaecff8706146535c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };