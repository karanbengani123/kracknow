import { fcm } from "../firebase";
import { ConnectionDevice } from "./interfaces/types";

export const sendPushNotification = async (
  deviceList: Array<ConnectionDevice>,
  message: string
) => {
  if (deviceList.length) {
    await fcm.sendMulticast({
      tokens: deviceList.map((item) => item.token),
      data: {
        topic: "notification",
      },
      notification: {
        title: "Krack Now",
        body: message,
      },
    });
  }
};
