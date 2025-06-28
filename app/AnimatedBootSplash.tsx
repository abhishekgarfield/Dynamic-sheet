import React, {useState} from 'react';
import {
  Animated,
  ImageBackground,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {images} from './theme';
import {ScreenHeight} from './utils/util';

const useNativeDriver = Platform.OS !== 'web';

type AnimatedBootSplashProps = {
  onAnimationEnd: () => void;
};

export const AnimatedBootSplash: React.FC<AnimatedBootSplashProps> = ({
  onAnimationEnd,
}) => {
  const [opacity] = useState(() => new Animated.Value(1));
  const [scale] = useState(() => new Animated.Value(0.8)); // Start small
  const [translateY] = useState(() => new Animated.Value(0)); // Start at 0

  const {container, logo} = BootSplash.useHideAnimation({
    manifest: require('../assets/bootsplash/manifest.json'),

    logo: require('../assets/bootsplash/logo.png'),

    statusBarTranslucent: true,
    navigationBarTranslucent: false,

    animate: () => {
      // Pulse animation: scale up then back to normal
      Animated.sequence([
        Animated.timing(scale, {
          useNativeDriver,
          toValue: 2,
          duration: 600,
        }),
        Animated.timing(scale, {
          useNativeDriver,
          toValue: 1,
          duration: 500,
        }),
      ]).start(({finished}) => {
        if (finished) {
          console.log('---BootSplash pulse animation done---');
          requestAnimationFrame(() => onAnimationEnd());
        }
      });
    },
  });

  return (
    <View style={styles.backgroundImage}>
      <Animated.View
        {...container}
        style={[container.style, styles.animatedView, opacity]}>
        <Animated.Image
          {...logo}
          style={[
            logo.style,
            {
              transform: [{scale}, {translateY}],
            },
          ]}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    height: ScreenHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  animatedView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
});
