importScripts(
  "https://www.gstatic.com/firebasejs/10.9.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.9.0/firebase-messaging-compat.js",
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCJKwwt37N2WbUfvQb2-Hu-OcbNoDAmtB0",
  authDomain: "all-you-have-to-do.firebaseapp.com",
  projectId: "all-you-have-to-do",
  storageBucket: "all-you-have-to-do.appspot.com",
  messagingSenderId: "28080972325",
  appId: "1:28080972325:web:2968ca49bf317747a195cc",
});

const messaging = firebase.messaging(firebaseApp);
// const messaging = getMessaging(firebaseApp);

if (messaging.data) {
  console.log("데이터 전송", messaging.data);
} else {
  console.log("데이터 못받음");
}

self.addEventListener("push", function (event) {
  console.log("[Service Worker] Push Notification received");

  const pushData = event.data.json();
  // console.log("PREVpushData", pushData);

  // if (!pushData || !pushData.notification) {
  //   console.log("pushData", pushData);
  //   console.log("pushData.notification", pushData.notification)
  //   console.log("pushData.data", pushData.data);
  //   return console.error("Invalid push notification data");
  // }

  if (!pushData) {
    return console.error("유효하지않은 push notification data", error)
  }

  const notificationData = pushData.notification;
  const { title, body, image, icon, time } = notificationData;
  // console.log("pushData", pushData);

  const options = {
    title: title, // Provide a default title if not provided
    body: body || "Default Body", // Provide a default body if not provided
    icon: icon || "/default-icon.png", // Provide a default icon if not provided
    image: image || null,
    time: time || null,
  };

  console.log("options", options)
  try {
    event.waitUntil(self.registration.showNotification(options.title, options));
  } catch (error) {
    console.log(error)
  }
  
});

self.addEventListener("notificationclick", function (event) {
  // 띄운 알림창을 클릭했을 때 처리할 내용
  event.preventDefault();
  // 알림창 닫기
  event.notification.close();
});

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload,
//   );
//   const data = messaging.payload;
//   console.log(data)
//   // Customize notification here
//   const notificationTitle = "Background Message Title";
//   const notificationOptions = {
//     body: "Background Message body.",
//     icon: "/images/logo.png",
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.data.title;
  const notificationOptions = {
    body: payload.notification.data.body,
    image: payload.notification.data.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
