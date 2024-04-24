interface NotificationData {
  data: {
    title: string;
    body: string;
    time: string;
    image: string;
  };
  token: string;
}

const sendNotification = async ({
  data: messageData,
  token,
}: NotificationData) => {
  try {
    // FCM 서버 엔드포인트 URL
    const fcmUrl = "https://fcm.googleapis.com/fcm/send";

    // FCM 서버로 전송할 데이터
    const data = {
      to: token, // 알림을 수신할 디바이스의 토큰
      notification: {
        title: messageData.title, // 알림 제목
        body: messageData.body, // 알림 내용
      },
    };

    const response = await axios.post(fcmUrl, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer AAAABonBoiU:APA91bGf7Vf3u4DAO6WhouMB-QD0qHrWMCD5-2qJPQglMg-PAye6HL9aU78WcIyuSRdcYUll6aGpMy5rKw1lTbJT-YXsLhLJvBjTqOWlEZD-yfuHopo_rujBpsX39J94oVNAQGor1k11",
      },
    });

    console.log("Notification sent successfully:", response.data);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
};

sendNotification 