interface NotificationData {
  data: {
    title: string;
    body: string;
    time: string;
    image: string;
  };
  token: string;
}
const sendNotificationToBackend = async ({ data, token }: NotificationData) => {
  try {
    const res = await fetch("http://localhost:3000/api/sendNotification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, token }),
    });

    if (!res.ok) {
      throw new Error("Failed to send notification to backend");
    }

    const responseData = await res.json();
    console.log("Response from backend:", responseData);
  } catch (error) {
    console.error("Error sending notification to backend:", error);
  }
};

export default sendNotificationToBackend;
