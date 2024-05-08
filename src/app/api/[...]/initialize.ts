import * as admin from 'firebase-admin';

const initializeFirebaseApp = async () => {
  let firebase;

  try {
    if (admin.apps.length === 0) {
      firebase = admin.initializeApp({
        credential: admin.credential.cert(process.env.SERVICE_ACCOUNT_KEY as admin.ServiceAccount)
      })
      console.log("firebase SDK 초기화 완료");
    } else {
      firebase = admin.app();
      console.log("set FCM");
    }

  } catch (error) {
    console.log("SDK 에러발생", error);
  }
}

export default initializeFirebaseApp;