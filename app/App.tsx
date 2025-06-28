import './i18n';
import 'react-native-gesture-handler';
import React, {createRef} from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  Platform,
  Text,
  TextInput,
  UIManager,
  View,
  ViewStyle,
  StatusBar as RNStatusBar,
  LogBox,
} from 'react-native';
import Toast, {ToastProvider} from 'react-native-toast-notifications';
import {toastProps} from './utils/toast';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {enableScreens} from 'react-native-screens';
import {AppNavigator} from './navigation';
import {Provider} from 'react-redux';
import {store} from './store';
import {colors} from './theme';

LogBox.ignoreAllLogs(true);

// if (__DEV__) {
//   console.error = () => {};
//   console.warn = () => {};
// }

interface TextWithDefaultProps extends Text {
  defaultProps?: {allowFontScaling?: boolean};
}
interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: {allowFontScaling?: boolean};
}

(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
  false;
(TextInput as unknown as TextInputWithDefaultProps).defaultProps =
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(
  TextInput as unknown as TextInputWithDefaultProps
).defaultProps!.allowFontScaling = false;

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

enableScreens();

function StatusBarBackground({color = 'red'}) {
  const {top} = useSafeAreaInsets();
  return Platform.OS === 'ios' ? (
    <View
      style={{
        height: top,
        backgroundColor: color,
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 999,
      }}
    />
  ) : null;
}

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <RNStatusBar barStyle="dark-content" backgroundColor={'  #F5F7FB'} />

      <StatusBarBackground color={'#F5F7FB'} />
      <Provider store={store}>
        <ToastProvider {...toastProps}>
          <GestureHandlerRootView style={$gestureHandlerRootView}>
            <AppNavigator />
          </GestureHandlerRootView>
          <Toast {...toastProps} />
        </ToastProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;

const $gestureHandlerRootView: ViewStyle = {
  flex: 1,
};
