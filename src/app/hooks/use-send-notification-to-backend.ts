interface NotificationData {
  data: {
    title: string;
    body: string;
    time: string;
    image: string;
  };
  token: string;
}

const useSendNotificationToBackend = () => {
  const sendNotification = async ({ data, token }: NotificationData) => {
    try {
      // const data = { title, body, time, image };
      const basePath = "http://localhost:3000";
      const res = await fetch(`${basePath}/api/sendNotification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, token }),
      });

      if (!res.ok) {
        throw new Error("Failed to send notification to backend");
      } else {
        console.log("res", res);
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



