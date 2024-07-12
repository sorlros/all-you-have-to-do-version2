importScripts(
  "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js"
);

// Initialize Firebase
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCJKwwt37N2WbUfvQb2-Hu-OcbNoDAmtB0",
  authDomain: "all-you-have-to-do.firebaseapp.com",
  projectId: "all-you-have-to-do",
  storageBucket: "all-you-have-to-do.appspot.com",
  messagingSenderId: "28080972325",
  appId: "1:28080972325:web:2968ca49bf317747a195cc",
});

const messaging = firebase.messaging(firebaseApp);

self.addEventListener("push", function (event) {
  console.log("[Service Worker] Push Notification received");

  const pushData = event.data ? event.data.json() : {};
  console.log("pushData", pushData);

  // Extract notification data from pushData
  const notificationData = pushData.notification || {};
  const dataPayload = pushData.data || {};

  // Use notificationData for default notification fields
  const { title = "All you have to do 알람", body, image, icon } = notificationData;

  // Use dataPayload for custom data fields
  const customTitle = dataPayload.title || title;
  const customBody = dataPayload.body || body;
  const customImage = dataPayload.image || image;
  const customIcon = dataPayload.icon || icon;

  const options = {
    body: customBody,
    icon: customIcon,
    image: customImage,
  };

  console.log("options", options);
  event.waitUntil(
    self.registration.showNotification(customTitle, options)
  );
});

self.addEventListener("notificationclick", function (event) {
  // Handle notification click events
  event.preventDefault();
  event.notification.close();
});

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.data?.title || "Background Message Title";
  const notificationOptions = {
    body: payload.data?.body || "Background Message body.",
    image: payload.data?.image || null,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
