import Geolocation, {
  GeolocationError,
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {ScreenHeight, ScreenWidth} from './util';
import {LatLng} from '../components/Address.types';
import {reverseGeocoding} from '../apis/googleAPIs';
import {Alert, Platform, AppState, PermissionsAndroid} from 'react-native';
// import BackgroundService from 'react-native-background-actions';
import {store} from '../store';
import {updateDriverStatus} from '../screens/MainFlow/Home/slice';
// import BackgroundGeolocation from 'cordova-background-geolocation-plugin';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

let currentPosition: LatLng = {lat: 0, lng: 0};
let currentAddress = {full_address: '', small_address: ''};

export const ASPECT_RATIO = ScreenWidth / ScreenHeight;
export const LATITUDE_DELTA = 0.01;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const getCurrentLocation = async (
  success?: (position: GeolocationResponse) => void,
  error?: (error: GeolocationError) => void,
) => {
  Geolocation.getCurrentPosition(
    async (position: GeolocationResponse) => {
      currentPosition = {
        lat: position?.coords?.latitude,
        lng: position?.coords?.longitude,
      };

      try {
        const res = await reverseGeocoding(currentPosition);

        if (res && res.formatted_address) {
          let city = '';
          let country = '';

          res.address_components.forEach((component: any) => {
            if (component.types.includes('locality'))
              city = component.long_name;
            if (component.types.includes('country'))
              country = component.long_name;
          });

          currentAddress = {
            full_address: res.formatted_address,
            small_address: `${city}, ${country}`,
          };
          // store.dispatch(
          //   authActions.updateLocation({currentAddress, currentPosition}),
          // );
          store.dispatch(
            updateDriverStatus({
              liveLoc: {
                latitude: currentPosition.lat,
                longitude: currentPosition.lng,
                address: currentAddress?.full_address,
              },
            }),
          );

          console.log('✅ Stored Address:', currentAddress);
        }
      } catch (err) {
        console.error('Error fetching address:', err);
      }

      success?.(position);
    },
    (err: GeolocationError) => {
      console.log('Geolocation error', err);
      error?.(err);
    },
    {
      timeout: 60000,
      enableHighAccuracy: true,
    },
  );
};

let watchId = 0;
export const startWatch = () => {
  watchId = Geolocation.watchPosition(async position => {
    console.log('🚀 ~ Geolocation.watchPosition ~ position:', position);
    currentPosition = {
      lat: position?.coords?.latitude,
      lng: position?.coords?.longitude,
    };

    try {
      const res = await reverseGeocoding(currentPosition);

      if (res && res.formatted_address) {
        let city = '';
        let country = '';

        res.address_components.forEach((component: any) => {
          if (component.types.includes('locality')) city = component.long_name;
          if (component.types.includes('country'))
            country = component.long_name;
        });

        currentAddress = {
          full_address: res.formatted_address,
          small_address: `${city}, ${country}`,
        };
        // store.dispatch(
        //   authActions.updateLocation({currentAddress, currentPosition}),
        // );
        store.dispatch(
          updateDriverStatus({
            liveLoc: {
              latitude: currentPosition.lat,
              longitude: currentPosition.lng,
              address: currentAddress?.full_address,
            },
          }),
        );

        console.log('✅ Stored Address:', currentAddress);
      }
    } catch (err) {
      console.error('Error fetching address:', err);
    }
  });
};
export const clearWatch = () => {
  Geolocation.clearWatch(watchId);
};
// export const startBackgroundTracking = () => {
//   BackgroundGeolocation.configure({
//     desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
//     stationaryRadius: 50,
//     distanceFilter: 50,
//     notificationTitle: 'Background tracking',
//     notificationText: 'enabled',
//     debug: false,
//     startOnBoot: false,
//     stopOnTerminate: true,
//     locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
//     interval: 10000,
//     fastestInterval: 5000,
//     activitiesInterval: 10000,
//     stopOnStillActivity: false,
//     url: 'http://192.168.81.15:3000/location',
//     httpHeaders: {
//       'X-FOO': 'bar',
//     },
//     postTemplate: {
//       lat: '@latitude',
//       lon: '@longitude',
//     },
//   });

//   // 🧭 Location update listener
//   BackgroundGeolocation.on('location', location => {
//     console.log('[Location]', location);
//     BackgroundGeolocation.startTask(taskKey => {
//       // Perform async actions if needed
//       BackgroundGeolocation.endTask(taskKey);
//     });
//   });

//   // 🅿️ Stationary listener
//   BackgroundGeolocation.on('stationary', stationaryLocation => {
//     console.log('[Stationary]', stationaryLocation);
//     // Example: send to your backend
//     // Actions.sendLocation(stationaryLocation);
//   });

//   // 🔒 Authorization
//   BackgroundGeolocation.on('authorization', status => {
//     console.log('[Auth Status]', status);
//     if (status !== BackgroundGeolocation.AUTHORIZED) {
//       setTimeout(() => {
//         Alert.alert('Permission needed', 'Open settings?', [
//           {text: 'Yes', onPress: () => BackgroundGeolocation.showAppSettings()},
//           {text: 'No', style: 'cancel'},
//         ]);
//       }, 1000);
//     }
//   });

//   // ❗ Error
//   BackgroundGeolocation.on('error', error => {
//     console.log('[ERROR] BackgroundGeolocation error:', error);
//   });

//   // ▶️ Service started
//   BackgroundGeolocation.on('start', () => {
//     console.log('[INFO] BackgroundGeolocation service started');
//   });

//   // ⏹️ Service stopped
//   BackgroundGeolocation.on('stop', () => {
//     console.log('[INFO] BackgroundGeolocation service stopped');
//   });

//   // 🌙 App backgrounded
//   BackgroundGeolocation.on('background', () => {
//     console.log('[INFO] App in background');
//   });

//   // ☀️ App foregrounded
//   BackgroundGeolocation.on('foreground', () => {
//     console.log('[INFO] App in foreground');
//   });

//   // 🚀 Start tracking if not already running
//   BackgroundGeolocation.checkStatus(status => {
//     console.log('[CheckStatus]', status);
//     if (!status.isRunning) {
//       BackgroundGeolocation.start();
//     }
//   });
// };
// export const stopBackgroundTracking = () => {
//   BackgroundGeolocation.stop();
//   BackgroundGeolocation.removeAllListeners();
//   console.log('📍 Background tracking stopped.');
// };

// Background task
// const backgroundLocationTask = async (taskDataArguments: any) => {
//   const {delay} = taskDataArguments;

//   await new Promise(async () => {
//     while (BackgroundService.isRunning()) {
//       await getCurrentLocation();
//       await new Promise(r => setTimeout(r, delay));
//     }
//   });
// };

const options = {
  taskName: 'BackgroundLocation',
  taskTitle: 'Tracking your location',
  taskDesc: 'App is tracking your location in the background',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  parameters: {
    delay: 10000, // 10 sec
  },
};

// export const startBackgroundLocation = async () => {
//   if (Platform.OS === 'android') {
//     const fine = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     );
//     const background = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
//     );

//     if (fine !== 'granted' || background !== 'granted') {
//       Alert.alert('Permission Required', 'Location permissions are needed.');
//       return;
//     }
//   }
//   console.log('------hello --------');

//   if (!BackgroundService.isRunning()) {
//     try {
//       await BackgroundService.start(backgroundLocationTask, options);
//       console.log('------hello --111------');

//       await BackgroundService.updateNotification({
//         taskDesc: 'Location tracking is active',
//       });
//       console.log('------hello --111-11222-----');
//     } catch (err) {
//       console.log('🚀 ~ startBackgroundLocation ~ err:', err);
//     }
//   }
// };

// export const stopBackgroundLocation = async () => {
//   if (BackgroundService.isRunning()) {
//     await BackgroundService.stop();
//   }
// };

// App state listener
// AppState.addEventListener('change', nextAppState => {
//   console.log('📲 App State:', nextAppState);
//   if (nextAppState == 'background') {
//     startBackgroundLocation();
//   } else {
//     stopBackgroundLocation();
//   }
// });

// // Function to check and request location permissions
// export const requestLocationPermission = async (): Promise<boolean> => {
//   console.log('---asd-a-sd-a-sd-as-d-asd-as-d-a');
//   if (Platform.OS === 'ios') {
//     Geolocation.requestAuthorization(
//       () => {
//         console.log('🚀 ~ granted ~ res:--- granted -----');
//         // return res === 'granted';
//       },
//       err => {
//         console.log('🚀 ~ requestLocationPermission ~ err:', err);
//       },
//     );
//   } else if (Platform.OS === 'android') {
//     // Check for permissions
//     const hasFineLocationPermission = await PermissionsAndroid.check(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     );
//     const hasBackgroundLocationPermission = await PermissionsAndroid.check(
//       PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
//     );

//     if (hasFineLocationPermission && hasBackgroundLocationPermission) {
//       return true;
//     }

//     // Request permissions
//     const granted = await PermissionsAndroid.requestMultiple([
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
//     ]);

//     return (
//       granted['android.permission.ACCESS_FINE_LOCATION'] ===
//         PermissionsAndroid.RESULTS.GRANTED &&
//       granted['android.permission.ACCESS_BACKGROUND_LOCATION'] ===
//         PermissionsAndroid.RESULTS.GRANTED
//     );
//   }
//   return false;
// };
