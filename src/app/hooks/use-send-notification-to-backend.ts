interface NotificationData {
  data: {
    title: string;
    body: string;
    time: string;
    image: string;
    icon: string;
    day: number;
    isDay: string;
    uid: string;
  };
}

const useSendNotificationToBackend = () => {
  const sendNotification = async ({ data }: NotificationData, token: string) => {
    try {
      // const data = { title, body, time, image };
      // const basePath = "https://all-you-have-to-do-version2.vercel.app";
      const basePath = "http://localhost:3000";
      const res = await fetch(`${basePath}/api/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, token }),
      });

      if (!res.ok) {
        throw new Error("Failed to send notification to backend");
      } else {
        console.log("sendNotification api호출 성공");
      }

      // const responseData = await res.json();
      // console.log("Response from backend:", responseData);
    } catch (error) {
      console.error("Error sending notification to backend:", error);
    }
  };

  return sendNotification;
};

export default useSendNotificationToBackend;


