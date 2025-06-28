import {useEffect, useRef} from 'react';
import {Alert, BackHandler} from 'react-native';
import {
  NavigationState,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import type {AppStackParamList} from './AppNavigator';

/**
 * Reference to the root App Navigator.
 *
 * If needed, you can use this to access the navigation object outside of a
 * `NavigationContainer` context. However, it's recommended to use the `useNavigation` hook whenever possible.
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * The types on this reference will only let you reference top level navigators. If you have
 * nested navigators, you'll need to use the `useNavigation` with the stack navigator's ParamList type.
 */
// Combine all param lists
// Combine all param lists into one
export type RootStackParamList = AppStackParamList;
// &
// AuthStackParamList &
// MainStackParamList;
// &
// BottomStackParamList;

// export const navigationRef = createNavigationContainerRef<
//   AppStackParamList
//   &
//     AuthStackParamList &
//     MainStackParamList &
//     BottomStackParamList
// >();
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function useBackButtonHandler(canExit: (routeName: string) => boolean) {
  const canExitRef = useRef(canExit);

  useEffect(() => {
    canExitRef.current = canExit;
  }, [canExit]);

  useEffect(() => {
    const onBackPress = () => {
      if (!navigationRef.isReady()) {
        return false;
      }

      const routeName = getActiveRouteName(navigationRef.getRootState());

      if (canExitRef.current(routeName)) {
        Alert.alert('Confirmation', 'Are you sure you want to exit?', [
          {text: 'Cancel', style: 'cancel', onPress: () => {}, style: 'cancel'},
          {
            text: 'Exit',
            style: 'destructive',
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true;
      }

      if (navigationRef.canGoBack()) {
        navigationRef.goBack();
        return true;
      }

      return false;
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, []);
}

const getActiveRouteName = (state: any): string => {
  const route = state.routes[state.index];

  if (route.state) {
    return getActiveRouteName(route.state);
  }

  return route.name;
};

/**
 * use this to navigate without the navigation
 * prop. If you have access to the navigation prop, do not use this.
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 */
export function navigate(...args: Parameters<typeof navigationRef.navigate>) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(...args);
  }
}

/**
 * This function is used to go back in a navigation stack, if it's possible to go back.
 * If the navigation stack can't go back, nothing happens.
 * The navigationRef variable is a React ref that references a navigation object.
 * The navigationRef variable is set in the App component.
 */
export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

/**
 * resetRoot will reset the root navigation state to the given params.
 */
export function resetRoot(
  state: Parameters<typeof navigationRef.resetRoot>[0] = {index: 0, routes: []},
) {
  if (navigationRef.isReady()) {
    navigationRef.resetRoot(state);
  }
}

export function replace(screenName: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.current?.dispatch(StackActions.replace(screenName, params));
  }
}

export function push(screenName: string, params?: object) {
  if (navigationRef.isReady()) {
    navigationRef.current?.dispatch(StackActions.push(screenName, params));
  }
}
