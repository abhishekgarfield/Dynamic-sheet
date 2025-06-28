import i18n from 'i18n-js';
import React from 'react';
import {
  StyleProp,
  Text as RNText,
  TextProps as RNTextProps,
  TextStyle,
  ColorValue,
} from 'react-native';
import {isRTL, translate, TxKeyPath} from '../i18n';
import {colors, spacing, typography} from '../theme';
import {scale, moderateScale} from 'react-native-size-matters';

export type Sizes = keyof typeof $sizeStyles;
export type Presets = keyof typeof $presets;

export interface TextProps extends RNTextProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: TxKeyPath;
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string;
  /**
   * Optional options to pass to i18n. Useful for interpolation
   * as well as explicitly setting locale or translation fallbacks.
   */
  txOptions?: i18n.TranslateOptions;
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<TextStyle>;
  /**
   * One of the different types of text presets.
   */
  preset?: Presets;
  /**
   * Text size modifier.
   */
  size?: Sizes;
  /**
   * Children components.
   */
  children?: React.ReactNode;
  /*
   * Text Color
   */
  color?: ColorValue | undefined;

  /**
   * Custom font family key.
   */
  fontFamily?: keyof typeof typography.fonts.primary;
}

/**
 * For your text displaying needs.
 * This component is a HOC over the built-in React Native one.
 *
 * - [Documentation and Examples](https://github.com/infinitered/ignite/blob/master/docs/Components-Text.md)
 */
export function Text(props: TextProps) {
  const {
    size,
    tx,
    txOptions,
    text,
    children,
    color,
    style: $styleOverride,
    fontFamily,
    ...rest
  } = props;

  const i18nText = tx && translate(tx, txOptions);
  const content = i18nText || text || children;

  const preset: Presets = props.preset ?? 'default';
  const $styles = [
    $rtlStyle,
    $presets[preset],
    size ? $sizeStyles[size] : undefined,
    color ? {color} : undefined,
    $styleOverride,
  ];

  return (
    <RNText style={[$styles, fontFamily && {fontFamily}]} {...rest}>
      {content}
    </RNText>
  );
}

// const $sizeStyles = {
//   xxxl: {fontSize: scale(26)} satisfies TextStyle,
//   xxl: {fontSize: scale(24)} satisfies TextStyle,
//   xl: {fontSize: scale(22)} satisfies TextStyle,
//   lg: {fontSize: scale(20)} satisfies TextStyle,
//   md: {fontSize: scale(18)} satisfies TextStyle,
//   sm: {fontSize: scale(16)} satisfies TextStyle,
//   xs: {fontSize: scale(14)} satisfies TextStyle,
//   xxs: {fontSize: scale(12)} satisfies TextStyle,
//   xxxs: {fontSize: scale(10)} satisfies TextStyle,
//   xxxxs: {fontSize: scale(8)} satisfies TextStyle,
// };
const $sizeStyles = {
  xxxl: {fontSize: scale(26), lineHeight: scale(26 * 1.5)} satisfies TextStyle,
  xxl: {fontSize: scale(24), lineHeight: scale(24 * 1.3)} satisfies TextStyle,
  xl: {fontSize: scale(22), lineHeight: scale(22 * 1.5)} satisfies TextStyle,
  lg: {fontSize: scale(20), lineHeight: scale(20 * 1.5)} satisfies TextStyle,
  md: {fontSize: scale(18), lineHeight: scale(18 * 1.5)} satisfies TextStyle,
  sm: {fontSize: scale(16), lineHeight: scale(16 * 1.5)} satisfies TextStyle,
  xs: {fontSize: scale(14), lineHeight: scale(14 * 1.5)} satisfies TextStyle,
  xxs: {fontSize: scale(12), lineHeight: scale(12 * 1.5)} satisfies TextStyle,
  xxxs: {fontSize: scale(10), lineHeight: scale(10 * 1.5)} satisfies TextStyle,
  xxxxs: {fontSize: scale(8), lineHeight: scale(8 * 1.5)} satisfies TextStyle,
};

const $baseStyle: StyleProp<TextStyle> = [
  $sizeStyles.xs,
  {fontFamily: typography.primary.regular},
  {color: colors.text},
];

const $presets = {
  default: $baseStyle,
  underline: [
    $baseStyle,
    {
      textDecorationLine: 'underline',
    },
  ] as StyleProp<TextStyle>,
  lightColor: [
    $baseStyle,
    {
      color: colors.palette.light,
    },
  ] as StyleProp<TextStyle>,
  bold: [
    $baseStyle,
    {
      fontFamily: typography.primary.bold,
    },
  ] as StyleProp<TextStyle>,
  semiBold: [
    $baseStyle,
    {
      // fontWeight: '',
      fontFamily: typography.primary.semibold,
    },
  ] as StyleProp<TextStyle>,
  heading: [
    $baseStyle,
    $sizeStyles.xxl,
    {fontFamily: typography.fonts.primary.bold},
  ] as StyleProp<TextStyle>,
  subheading: [
    $baseStyle,
    $sizeStyles.xs,
    {
      fontFamily: typography.primary.regular,
      color: colors.palette.textDim,
    },
  ] as StyleProp<TextStyle>,
  formLabel: [
    $baseStyle,
    $sizeStyles.xs,
    {
      fontFamily: typography.primary.semibold,
      color: colors.palette.black,
      marginBottom: moderateScale(spacing.xxs),
    },
  ] as StyleProp<TextStyle>,
  formHelper: [
    $baseStyle,
    $sizeStyles.xs,
    {fontFamily: typography.primary.regular},
  ] as StyleProp<TextStyle>,
};

const $rtlStyle: TextStyle = isRTL ? {writingDirection: 'rtl'} : {};
