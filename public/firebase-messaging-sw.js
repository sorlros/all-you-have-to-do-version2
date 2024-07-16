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

  if (event.data) {
    const pushData = event.data.json();
    console.log("pushData", pushData); // 전체 데이터 구조 출력

    const data = pushData.data || {};
    const options = {
      body: data.body || "Default body message.",
      icon: "https://all-you-have-to-do-version2.vercel.app/icon-192x192.png",
      image: "https://all-you-have-to-do-version2.vercel.app/images/logo.png"
    };

    console.log("data", data);
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );

  } else {
    console.log("This push event has no data.");
  }
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
    image: "https://all-you-have-to-do-version2.vercel.app/images/logo.png",
    icon: "https://all-you-have-to-do-version2.vercel.app/icon-192x192.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
