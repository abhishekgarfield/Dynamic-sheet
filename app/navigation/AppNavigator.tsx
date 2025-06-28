import React, {useState} from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {ViewStyle} from 'react-native';
import {enableScreens} from 'react-native-screens';

import {connect, ConnectedProps} from 'react-redux';
import {AnimatedBootSplash} from '../AnimatedBootSplash';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {MainStack} from './MainStack';
import {navigationRef} from './navigationUtilities';
import {useAppDispatch} from '../store/hooks';
import {RootState} from '../store';

export type AppStackParamList = {
  AuthStack: undefined;
  MainStack: undefined;
};
export type AppStackScreenProps<T extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, T>;
type AppStackProps = ConnectedProps<typeof connector>;

const RootStackNav = createNativeStackNavigator<AppStackParamList>();

enableScreens();

function App(Props: AppStackProps): React.JSX.Element {
  const [animationDone, setAnimationDone] = useState(false);

  const dispatch = useAppDispatch();

  const handleAnimationEnd = () => {
    setAnimationDone(true);
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      {animationDone ? (
        <NavigationContainer ref={navigationRef}>
          <RootStackNav.Navigator
            screenOptions={() => ({
              headerShown: false,
            })}>
            <RootStackNav.Screen name="MainStack" component={MainStack} />
          </RootStackNav.Navigator>
        </NavigationContainer>
      ) : (
        <AnimatedBootSplash onAnimationEnd={handleAnimationEnd} />
      )}
    </SafeAreaProvider>
  );
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatch = {};

const connector = connect(mapStateToProps, mapDispatch);
export const AppNavigator = connector(App);

const $gestureHandlerRootView: ViewStyle = {
  flex: 1,
};
