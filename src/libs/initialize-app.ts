import { firebaseConfig } from "@/config/firebase-config";
import { getApps, initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

export const initializingApp = () => {
  const firebaseApps = getApps();
  const firebaseApp =
    firebaseApps.length === 0 ? initializeApp(firebaseConfig) : firebaseApps[0];
  if (
    typeof window !== "undefined" &&
    typeof window.navigator !== "undefined"
  ) {
    const messaging = getMessaging(firebaseApp);

    getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log("Firebase Token", currentToken);
        } else {
          // Show permission request UI
          console.log(
            "No registration token available. Request permission to generate one.",
          );
          // ...
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        // ...
      });
  }
};
