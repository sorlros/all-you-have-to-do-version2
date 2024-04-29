// 이 코드는 서버에서 실행됩니다.
import admin from "firebase-admin";
import fs from "fs";

const serviceAccountKeyPath = process.env.SERVICE_ACCOUNT_KEY_PATH;


if (!admin.apps.length && serviceAccountKeyPath) {
  const serviceAccountKey = JSON.parse(fs.readFileSync(serviceAccountKeyPath, "utf-8"));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
  });
}
// const serviceKey = require("../../serviceAccountKey.json");

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccountKey)
//   })
// }

// if (!admin.apps.length) {
//   admin.initializeApp(
//     firebaseConfig
//   )
// }

export const sendFCMNotification = async ({
  title,
  body,
  time,
  image,
  token,
}: {
  title: string;
  body: string;
  time: string;
  image: string;
  token: string;
}) => {
  try {
    const message: admin.messaging.Message = {
      data: {
        title: title,
        body: body,
        image: image,
      },
      token: token,
    };

    const response = await admin.messaging().send(message);
    console.log("FCM 알림 전송 성공:", response);
  } catch (error) {
    console.error("FCM 알림 전송 실패:", error);
    throw error;
  }
};