import { getMessaging, getToken } from "firebase/messaging";

export const verifyToken = async () => {
  const messaging = getMessaging();

  try {
    const currentToken = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    if (currentToken && typeof currentToken === "string") {
      // console.log("현재 토큰", currentToken);
      return currentToken;
    } else {
      console.log("사용 가능한 토큰을 발급받지 못했습니다.");
    }
  } catch (error) {
    console.error(error);
  }
};