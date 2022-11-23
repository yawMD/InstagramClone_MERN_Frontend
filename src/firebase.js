// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAopk3GKSfx-k34azJEhdgvP4DcV1VV9_M",
  authDomain: "fir-c2088.firebaseapp.com",
  projectId: "fir-c2088",
  storageBucket: "fir-c2088.appspot.com",
  messagingSenderId: "815359735510",
  appId: "1:815359735510:web:90811f29f22cac4c74bb77",
  measurementId: "G-PQQ0VQBQN1"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;