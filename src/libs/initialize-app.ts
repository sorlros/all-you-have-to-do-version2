// import { firebaseConfig } from "@/config/firebase-config";
// import { getApps } from "firebase/app";
// import { getMessaging, getToken } from "firebase/messaging";
// import { initializeApp } from "firebase-admin";

// export const initializingApp = () => {
//   const firebaseApps = getApps();
//   const firebaseApp =
//     firebaseApps.length === 0 ? initializeApp(firebaseConfig) : firebaseApps[0];
//   if (
//     typeof window !== "undefined" &&
//     typeof window.navigator !== "undefined" &&
//   ) {
//     const messaging = getMessaging(firebaseApp);

//     getToken(messaging, {
//       vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
//     })
//       .then((currentToken) => {
//         if (currentToken) {
//           // console.log("Firebase Token", currentToken);
//           return;
//         } else {
//           // Show permission request UI
//           return console.log(
//             "No registration token available. Request permission to generate one.",
//           );
//           // ...
//         }
//       })
//       .catch((err) => {
//         console.log("An error occurred while retrieving token. ", err);
//         // ...
//       });
//   }
// };

import firebase from 'firebase/app'
import { firebaseConfig } from "@/config/firebase-config";
import { initializeApp } from 'firebase/app';

export const initializingApp = () => {
  try {
    initializeApp(firebaseConfig);
  } catch (error) {
    return console.error('Firebase initialization error')
  }
}
