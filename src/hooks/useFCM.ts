import { API_URL } from "@/constants/api";
import { ResponseType } from "@/types";
import { useEffect, useState } from "react";
import { usePost } from "./api/usePost";

interface FCMTokenResponse {
  fcm_token: string;
  device_type: "WEB";
}

export const useFCM = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  const { execute: registerToken } = usePost<
    ResponseType<void>,
    FCMTokenResponse
  >(API_URL.User.FcmToken, {
    onSuccess: () => {
      console.log("FCM token registered successfully");
    },
    onError: (error) => {
      console.error("Failed to register FCM token:", error);
    },
  });

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      setPermission(permission);

      if (permission === "granted") {
        const registration = await navigator.serviceWorker.register(
          `/firebase-messaging-sw.js`, 
          { scope: "/" },
        );
        const messaging = await import("firebase/messaging");
        const { getMessaging, getToken } = messaging;

        const firebaseConfig = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          messagingSenderId:
            process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        };

        const app = await import("firebase/app");
        const firebaseApp = app.initializeApp(firebaseConfig);
        const messagingInstance = getMessaging(firebaseApp);

        const token = await getToken(messagingInstance, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: registration,
        });

        setFcmToken(token);
        registerToken({
          fcm_token: token,
          device_type: "WEB",
        });
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  useEffect(() => {
    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  return {
    fcmToken,
    permission,
    requestNotificationPermission,
  };
};
