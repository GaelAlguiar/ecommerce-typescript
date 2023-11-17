import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA80o0NIANTuP3PolUuw3gKJWwI2yNFMS8",
  authDomain: "shopsimply-403523.firebaseapp.com",
  projectId: "shopsimply-403523",
  storageBucket: "shopsimply-403523.appspot.com",
  messagingSenderId: "462095482143",
  appId: "1:462095482143:web:4a3591325ff3a48166c42a",
};

const firebaseapp = initializeApp(firebaseConfig);

export default firebaseapp;
