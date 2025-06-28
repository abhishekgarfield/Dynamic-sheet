import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import * as screens from '../../screens';

type MainStackParamList = {
  Home: undefined;
};

export type MainStackScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;

const MainStackNav = createNativeStackNavigator<MainStackParamList>();
export const MainStack = () => {
  return (
    <MainStackNav.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}>
      <MainStackNav.Screen name="Home" component={screens.Home} />
    </MainStackNav.Navigator>
  );
};
