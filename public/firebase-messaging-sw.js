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

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        // 응답이 성공적인 경우
        if (!response.ok) {
          console.error('Network response was not ok', response.status);
          return new Response('Error fetching the resource', { status: response.status });
        }

        // 응답을 클론하여 헤더를 수정
        let clonedResponse = response.clone();
        let modifiedHeaders = new Headers(clonedResponse.headers);

        // CORS 헤더 추가
        modifiedHeaders.set('Access-Control-Allow-Origin', '*');
        modifiedHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        modifiedHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return new Response(clonedResponse.body, {
          status: clonedResponse.status,
          statusText: clonedResponse.statusText,
          headers: modifiedHeaders
        });
      })
      .catch(error => {
        console.error('Fetch error:', error);
        return new Response('Network error occurred', { status: 500 });
      })
  );
});


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
