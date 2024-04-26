import { getMessaging, onMessage } from "firebase/messaging"

export const receivedMessage = () => {
  const messaging = getMessaging();
  onMessage(messaging, (payload) => {
    console.log('onMessage: ', payload);
    const title = "All you have to do 알람 서비스";
    const options = {
      body: payload.notification?.body
    }
    const notification = new Notification(title, options);
  })
}