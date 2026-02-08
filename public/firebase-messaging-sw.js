importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js",
);

// Replace these values with your actual Firebase config values
const firebaseConfig = {
  apiKey: "AIzaSyAwgall9AFhv78kan4vw7NY3biDhKkcZPU",
  authDomain: "uniq-alpha.firebaseapp.com",
  projectId: "uniq-alpha",
  storageBucket: "uniq-alpha.firebasestorage.app",
  messagingSenderId: "968562135683",
  appId: "1:968562135683:web:6bccbc805729356ab281b6",
  measurementId: "G-63W39J0V73"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icons/icon-128x128.png",
    badge: "/icons/icon-128x128.png",
    data: payload.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
