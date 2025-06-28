import {
  Animated,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import React, {useState} from 'react';

type Props = TouchableOpacityProps & {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  scaleIn?: number;
  scaleOut?: number;
};

const PressableAnimated = Animated.createAnimatedComponent(TouchableOpacity);

const Touchable = (props: Props) => {
  const {children, style, scaleIn = 0.98, scaleOut = 1, ...rest} = props;
  const [scale] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: scaleIn,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: scaleOut,
      useNativeDriver: true,
    }).start();
  };

  return (
    <PressableAnimated
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[style, {transform: [{scale}]}]}
      accessibilityRole="button"
      {...rest}>
      {children}
    </PressableAnimated>
  );
};

export default Touchable;
