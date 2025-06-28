import {scale} from 'react-native-size-matters';

/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
  Scaled for responsive design.
 */
export const spacing = {
  xxxs: scale(2),
  xxs: scale(4),
  xs: scale(8),
  sm: scale(12),
  spacing10: scale(10),
  spacing15: scale(15),
  spacing20: scale(20),
  spacing25: scale(25),
  spacing30: scale(30),
  md: scale(16),
  nrml: scale(18),
  lg: scale(24),
  xl: scale(32),
  xxl: scale(48),
  xxxl: scale(64),
  zero: scale(0),
  one: scale(1),
  half: scale(0.5),
} as const;

export type Spacing = keyof typeof spacing;
