import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import notifee, {
  AndroidImportance,
  AndroidStyle,
  AndroidVisibility,
  Notification,
  NotificationAndroid,
  NotificationIOS,
} from '@notifee/react-native';
import {Platform} from 'react-native';
import {images} from '../theme';
import {messaging} from '../App';

export async function requestPermission() {
  await notifee.requestPermission({
    alert: true,
    badge: true,
    sound: true,
    carPlay: true,
    announcement: true,
  });
}

export const getFCMToken = async () => {
  try {
    // messaging.registerDeviceForRemoteMessages();
    const token = await messaging.getToken();
    console.log('🚀 FCM Token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

export async function createChannels() {
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    badge: true,
    importance: AndroidImportance.HIGH,
    visibility: AndroidVisibility.PUBLIC,
  });
  return channelId;
}

export async function onMessageReceived(
  message: FirebaseMessagingTypes.RemoteMessage,
) {
  console.log(Platform.OS, 'New Notification Message: ', message);
  const data = message.data;
  // MARK: - Notifee data is exist
  // if (data?.notifee) {
  //   let notifeeData =
  //     typeof data?.notifee === 'object'
  //       ? data?.notifee
  //       : JSON.parse(data?.notifee);
  //   notifee.displayNotification(notifeeData);
  //   return;
  // }
  // MARK: - Notifee data is not exist fallback to notification data
  // {
  //   "collapseKey": "com.route_finder",
  //   "data": {
  //     "body": "{\"_id\":\"67eb717c1c1ec5b5fc8ca8e7\",\"userId\":\"67c0046da348434d0de8964f\",\"fullName\":\"krishan\",\"profilePic\":\"https://gasbuster.s3.amazonaws.com//1743415992279.jpeg\",\"createdAt\":\"2025-04-01T04:54:21.005Z\",\"totalAmount\":19.8,\"fuelQuantity\":3,\"fuelType\":\"Petrol\",\"deliveryAddress\":{\"type\":\"Point\",\"coordinates\":[76.5054652,31.833859],\"houseno\":\"Checking\",\"city\":\"Sujanpur Tira\",\"state\":\"Himachal Pradesh\",\"country\":\"India\",\"pincode\":\"176110\"},\"isBooked\":false,\"distance\":\"175 km\"}",
  //     "message": "A new order request.",
  //     "title": "Gasbuster notification",
  //     "type": "booking"
  //   },
  //   "from": "566004429950",
  //   "messageId": "0:1743483261627695%ccd52e0fccd52e0f",
  //   "notification": {
  //     "android": {},
  //     "body": "A new order request.",
  //     "title": "Gasbuster notification"
  //   },
  //   "originalPriority": 2,
  //   "priority": 2,
  //   "sentTime": 1743483261618,
  //   "ttl": 2419200
  // }

  let {
    title,
    ios,
    body,
    android,
    image,
    message: message2,
  } = message.data ?? {};

  console.log('🚀 ~ message.notification:', message.notification);
  if (
    typeof data?.fcm_options === 'object' &&
    (data.fcm_options as any).image
  ) {
    image = (data.fcm_options as any).image as string;
  }

  type PlatformType = {
    android?: NotificationAndroid;
    ios?: NotificationIOS;
  };

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  const platform: PlatformType | undefined = Platform.select({
    ios: {
      ios: {
        attachments: image ? [{url: image}] : [],
        interruptionLevel: 'timeSensitive',
        badgeCount: Number(ios?.badge ?? '0'),
      },
    },
    android: {
      android: {
        channelId: channelId,
        // badgeCount: android?.count ?? 0,
        // largeIcon: android?.imageUrl,
      },
    },
  });

  const notification: Notification = {
    title: title,
    // subtitle: ios?.subtitle,
    body: message2,
    ...platform,
    data,
  };
  console.log('🚀 ~ notification:', notification);
  notifee.displayNotification(notification);
}
