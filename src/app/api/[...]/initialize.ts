import * as admin from 'firebase-admin';

const initializeFirebaseApp = async () => {
  // let firebase;

  // try {
  //   if (admin.apps.length === 0) {
  //     firebase = admin.initializeApp({
  //       credential: admin.credential.cert(process.env.SERVICE_ACCOUNT_KEY as admin.ServiceAccount)
  //     })
  //     console.log("firebase SDK 초기화 완료");
  //   } else {
  //     firebase = admin.app();
  //     console.log("set FCM");
  //   }

  // } catch (error) {
  //   console.log("SDK 에러발생", error);
  // }

  const privateKey = process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        privateKey: privateKey,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      }),
    });
  }
}

export default initializeFirebaseApp;