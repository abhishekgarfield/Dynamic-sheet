import notifee, {
  EventType,
  Notification,
  NotificationPressAction,
} from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationRef} from '../navigation/navigationUtilities';
import {NotificationType} from './enum';

export const handleNotificationPress = async (
  notification: Notification,
  pressAction?: NotificationPressAction,
) => {
  try {
    if (!notification?.data) return;
    const {type, body} = notification.data;

    // Parse data if it’s a JSON string
    const parsedBody = body ? JSON.parse(body) : {};

    console.log('🚀 ~ parsedBody:', parsedBody);
    console.log('🔔 Notification Clicked:', notification);

    if (navigationRef.isReady()) {
      // Navigate based on type
      switch (type) {
        case NotificationType.Chat: // Chat Notification
          if (parsedBody.roomId) {
            navigationRef?.navigate('ChatInbox', {
              roomId: parsedBody.roomId,
              name: parsedBody?.fullName,
              profilepic: parsedBody?.image,
            });
          }
          break;
        case NotificationType.Booking: // Another example type
          navigationRef?.navigate('OrderDetails', {_id: parsedBody?._id});
          break;
        case NotificationType.Request:
          const currentRoute = navigationRef.current?.getCurrentRoute()?.name;

          if (currentRoute === 'Home') {
            navigationRef.navigate('Home', {refreshKey: Date.now()}); // Force re-render
          } else {
            navigationRef.reset({
              index: 0,
              routes: [
                {
                  name: 'BottomStack',
                  state: {
                    routes: [
                      {
                        name: 'Home',
                        params: {refreshKey: Date.now()}, // Force re-render
                      },
                    ],
                  },
                },
              ],
            });
          }
          break;
        default:
          console.log('Unknown notification type:', type);
      }
    } else {
      // Store data for navigation after app opens
      //   await AsyncStorage.setItem(
      //     'pendingNotification',
      //     JSON.stringify(notification),
      //   );
    }
  } catch (error) {
    console.error('Error handling notification press:', error);
  }
};

// 🚀 Handle Foreground Notification Clicks
export const setupForegroundNotificationHandler = () => {
  return notifee.onForegroundEvent(({type, detail}) => {
    console.log('🚀 ~ returnnotifee.onForegroundEvent ~ detail:', detail);
    console.log('🚀 ~ returnnotifee.onForegroundEvent ~ type:', type);
    if (type === EventType.PRESS && detail.notification) {
      handleNotificationPress(detail.notification, detail.pressAction);
    }
  });
};

export const checkInitialNotification = async () => {
  try {
    console.log(':--as-d-a-sd-asd-a-sd-asd-----here ---');
    const initialNotification = await notifee.getInitialNotification();
    console.log(
      '🚀 ~ checkInitialNotification ~ initialNotification:',
      initialNotification,
    );

    if (initialNotification) {
      console.log(
        '🔔 App Opened via Notification:',
        initialNotification.notification,
      );
      console.log('🚀 Press Action:', initialNotification.pressAction);

      handleNotificationPress(
        initialNotification.notification,
        initialNotification.pressAction,
      );
    }
  } catch (error) {
    console.error('🚨 Error fetching initial notification:', error);
  }
};

// 🚀 Handle Background Notification Clicks
// notifee.onBackgroundEvent(async ({type, detail}) => {
//   const {notification, pressAction} = detail;

//   if (!notification) return;

//   if (type === EventType.ACTION_PRESS && pressAction?.id === 'mark-as-read') {
//     try {
//       const {body} = notification.data || {};
//       const parsedBody = body ? JSON.parse(body) : {};

//       if (parsedBody.roomId) {
//         await fetch(`https://my-api.com/chat/${parsedBody.roomId}/read`, {
//           method: 'POST',
//         });
//       }

//       await notifee.cancelNotification(notification.id);
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//     }
//   } else if (type === EventType.PRESS) {
//     // Store the event for later navigation
//     await AsyncStorage.setItem(
//       'pendingNotification',
//       JSON.stringify(notification),
//     );
//   }
// });
