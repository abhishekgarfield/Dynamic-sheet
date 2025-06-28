import {Alert, Platform} from 'react-native';
import {
  AndroidPermission,
  check,
  checkNotifications,
  IOSPermission,
  openSettings,
  PERMISSIONS,
  request,
  requestNotifications,
  RESULTS,
} from 'react-native-permissions';

export type PermissionTypes =
  | 'MediaLibrary'
  | 'Camera'
  | 'Location'
  | 'audio'
  | 'MediaLibraryVideo';

interface RequestPermissionOptions {
  onClose?: () => void;
  deniedMessage?: string;
}

/**
 * Maps permission types to platform-specific permissions.
 * @param permissionType - The type of permission to request.
 * @returns The platform-specific permission string or null if unsupported.
 */
export const getPermissionName = (
  permissionType: PermissionTypes,
): IOSPermission | AndroidPermission | null => {
  if (Platform.OS === 'android') {
    const androidPermissions = {
      MediaLibrary: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      MediaLibraryVideo: PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      MediaLibraryStorage: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      MediaLibraryAudio: PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
      MediaLibraryWrite: PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      Camera: PERMISSIONS.ANDROID.CAMERA,
      Location: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      audio: PERMISSIONS.ANDROID.RECORD_AUDIO,
    };
    return androidPermissions[permissionType] || null;
  } else if (Platform.OS === 'ios') {
    const iosPermissions = {
      MediaLibraryPhoto: PERMISSIONS.IOS.PHOTO_LIBRARY,
      MediaLibraryMicrophone: PERMISSIONS.IOS.MICROPHONE,
      MediaLibrary: PERMISSIONS.IOS.MEDIA_LIBRARY,
      Camera: PERMISSIONS.IOS.CAMERA,
      Location: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      LocationAlways: PERMISSIONS.IOS.LOCATION_ALWAYS,
      audio: PERMISSIONS.IOS.MICROPHONE,
    };
    return iosPermissions[permissionType] || null;
  }
  return null;
};

/**
 * Requests a list of permissions from the user.
 * @param permissionTypes - The list of permissions to request.
 * @param options - Optional settings (onClose handler, custom denied message).
 * @returns A promise resolving to an object with the permission types as keys and whether they were granted or not as values.
 */
export const requestPermissions = async (
  permissionTypes: PermissionTypes[],
  options?: RequestPermissionOptions,
): Promise<{[key in PermissionTypes]: boolean}> => {
  const {onClose, deniedMessage} = options || {};
  const results: {[key in PermissionTypes]: boolean} = {} as any;

  try {
    for (const permissionType of permissionTypes) {
      const permission = getPermissionName(permissionType);
      console.log('🚀 ~ permission:', permission);

      if (!permission) {
        console.warn(`Unsupported permission type: ${permissionType}`);
        results[permissionType] = false;
        continue;
      }
      console.log('🚀 ~ permission:222', permission);
      try {
        const currentStatus = await check(permission);
        console.log('🚀 ~ currentStatus:', currentStatus);
        console.log('🚀 ~ currentStatus:', currentStatus);

        if (currentStatus === RESULTS.GRANTED) {
          results[permissionType] = true;
        } else if (currentStatus === RESULTS.DENIED) {
          const requestStatus = await request(permission);
          if (requestStatus === RESULTS.GRANTED) {
            results[permissionType] = true;
          } else {
            handlePermissionDenied(deniedMessage, onClose);
            results[permissionType] = false;
          }
        } else if (currentStatus === RESULTS.BLOCKED) {
          handlePermissionBlocked(onClose, permissionType);
          results[permissionType] = false;
        } else {
          console.log(
            `Unhandled permission status for ${permissionType}: ${currentStatus}`,
          );
          results[permissionType] = false;
        }
      } catch (err) {
        console.log('🚀 ~ err:', err);
      }
    }
    return results;
  } catch (error) {
    console.error('Error requesting permissions:', error);
    return permissionTypes.reduce(
      (acc, permissionType) => ({...acc, [permissionType]: false}),
      {} as {[key in PermissionTypes]: boolean},
    );
  }
};

/**
 * Handles permission denied scenario by showing an alert.
 * @param deniedMessage - Custom message for denied alert.
 * @param onClose - Optional callback to handle modal closure.
 */
const handlePermissionDenied = (
  deniedMessage: string | undefined,
  onClose?: () => void,
): void => {
  Alert.alert(
    'Permission Denied',
    deniedMessage ||
      'Access is required for this feature. You can grant permissions in your device settings later.',
    [
      {text: 'Cancel', onPress: onClose || (() => {}), style: 'cancel'},
      {
        text: 'Open Settings',
        onPress: () => {
          onClose?.();
          openSettings();
        },
      },
    ],
  );
};

/**
 * Handles permission blocked scenario by showing an alert.
 * @param onClose - Optional callback to handle modal closure.
 */
const handlePermissionBlocked = (
  onClose?: () => void,
  permission: any,
): void => {
  Alert.alert(
    `${permission} Permission Blocked`,
    'Access is blocked. Please enable permissions in your device settings.',
    [
      {text: 'Cancel', onPress: onClose || (() => {}), style: 'cancel'},
      {text: 'Open Settings', onPress: () => openSettings()},
    ],
  );
};

/**
 * Requests notification permission.
 */
export const RequestNotificationPermission = () => {
  checkNotifications().then(res => {
    if (res.status === RESULTS.GRANTED) {
      console.debug('---granted-----');
    } else if (res.status === 'denied' || res.status === 'blocked') {
      console.log('---granted-----');
      requestNotifications(['alert', 'sound'])
        .then(({status}) => {
          console.debug('-----status -------', status);
        })
        .catch(err => {
          console.log('🚀 ~ requestNotifications ~ err:', err);
        });
    } else {
      console.log('---unknown status-----');
    }
  });
};
