import firebase from "firebase/app";
import "firebase/app";
import "firebase/firestore";
import "firebase/auth";

let db;
try {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };
  firebase.initializeApp(config);
  // Firestoreインスタンスを作成
  db = firebase.firestore();
} catch (error) {
  console.log(error);
}

module.exports = {
  db,
};
