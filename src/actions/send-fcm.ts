// 이 코드는 서버에서 실행됩니다.
import admin from "firebase-admin";
import { getMessaging } from "firebase/messaging";
import fs from "fs";

const serviceAccountKeyPath = process.env.SERVICE_ACCOUNT_KEY_PATH;


if (!admin.apps.length && serviceAccountKeyPath) {
  const serviceAccountKey = JSON.parse(fs.readFileSync(serviceAccountKeyPath, "utf-8"));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
  });
}

export const sendFCMNotification = async ({
  title,
  body,
  time,
  image,
  icon,
  token,
}: {
  title: string;
  body: string;
  time: string;
  image: string;
  icon: string;
  token: string;
}) => {
  try {
    const message: admin.messaging.Message = {
      data: {
        title: title,
        body: body,
        image: image,
        icon: icon,
        time: time
      },
      token: token,
    };

    // getMessaging().send(message).then((response) => {
    //   console.log("메세지 전송 완료: ", response)
    // }).catch((error) => {
    //   console.log("메세지 전송 실패: ", error)
    // })

    const response = await admin.messaging().send(message);
    console.log("FCM 알림 전송 성공:", response);
  } catch (error) {
    console.error("FCM 알림 전송 실패:", error);
    throw error;
  }
};