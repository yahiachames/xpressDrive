import { requestPermissionsAsync } from "expo-notifications";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export default useNotifications = (notificationListener) => {
  useEffect(() => {
    registerForPushNotifications();

    if (notificationListener) Notifications.addListener(notificationListener);
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = await Notifications.requestPermissionsAsync();
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };
};
