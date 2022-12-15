import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRvfuGZsdRnfme2CPgofrQl69Ad3VXoHg",
  authDomain: "chatapp-8b38a.firebaseapp.com",
  projectId: "chatapp-8b38a",
  storageBucket: "chatapp-8b38a.appspot.com",
  messagingSenderId: "721642033236",
  appId: "1:721642033236:web:07d5992c4bc9cd31d65dc1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth();
const db = getFirestore();

export {auth,db}