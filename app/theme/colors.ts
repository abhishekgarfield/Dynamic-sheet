// TODO: write documentation for colors and palette in own markdown file and add links from here

const palette = {
  // old color code
  neutral100: '#FFFFFF',
  neutral200: '#F0EFF2',
  neutral300: '#D7CEC9',
  neutral400: '#B6ACA6',
  neutral500: '#978F8A',
  neutral600: '#564E4A',
  neutral700: '#3C3836',
  neutral800: '#191015',
  neutral900: '#000000',
  primaryLight: '#FFFFFF',
  primaryDark: '#4141EE',

  accent200: '#EBEBEB',
  accent250: '#ECEAFF',
  accent300: '#D9D9D9',
  accent680: '#D1D1D1',
  accent800: '#C4C4C4',
  accent840: '#8E8E8E',
  accent850: '#6C6C70',
  accent900: '#3E4958',
  angry100: '#F2D6CD',
  anger200: '#EB5757',
  accent950: '#FFFFFF99',

  // Lines Color
  verticalLine: '#3C8F7C',
  horizontalLine: '#EBEBEB',

  // new color code
  navigationBarColor: '#341616',
  online: '#0FE16D',
  primary: '#61DE2A',
  secondary: '#F4F4F4',
  primaryGradientColors: ['#A40202', '#DF1A1A'] as (string | number)[],
  linearGradientColors: [
    'rgba(0, 0, 0, 0.9)',
    'rgba(0, 0, 0, 0.6)',
    'rgba(0, 0, 0, 0)',
  ] as (string | number)[],
  screenBackground: '#FFFFFF',
  // screenBackground: 'rgb(26,24,24)',
  black: '#000000',

  light: '#7B7575',
  white: '#FFFFFF',
  yellow: '#FFE833',
  placeholderColor: '#B2B2B2',
  borderColor: '#E9E9E9',
  cardType: '#F3BA46',
  overlay20: 'rgba(25, 16, 21, 0.2)',
  overlay50: 'rgba(25, 16, 21, 0.5)',

  angry500: '#C03403',

  // Toast Colors
  success: '#00C851',
  info: '#33b5e5',
  warning: '#FFD54F',
  danger: '#d9534f',
  inverse: '#292b2c',
  faded: '#f7f7f7',

  linkColor: '#007AFF',

  red: '#DD3E45',

  // Image Gray Background
  GrayBg: '#FFEFEF29',

  // msgBgGray
  msgBgGray: '#E5E5E5',

  // BorderLight
  borderLight: '#E2E2E2',

  // Green
  green: '#27AE60',

  // textDarkSecondary
  textDark: '#191919',
  textGray: '#B2B2B2',
  textDim: '#B2B2B2',
} as const;

export const colors = {
  /**
   * The palette is available to use, but prefer using the name.
   * This is only included for rare, one-off cases. Try to use
   * semantic names as much as possible.
   */
  palette,
  /**
   * A helper for making something see-thru.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  halfTransparent: 'rgba(0, 0, 0, 0.8)',
  semiTransparent: 'rgba(0, 0, 0, 0.5)',

  navButtonColor: 'rgba(167, 163, 163, 0.4)',
  /**
   * The default text color in many components.
   */
  text: palette.black,
  /**
   * Secondary text information.
   */
  textDim: palette.textDim,
  /**
   * The default color of the screen background.
   */
  background: palette.white,
  /**
   * The default border color.
   */
  border: palette.neutral400,
  /**
   * The main tinting color.
   */
  tint: palette.secondary,
  /**
   * A subtle color used for lines.
   */
  separator: palette.neutral200,
  /**
   * Error messages.
   */
  error: palette.angry500,
  /**
   * Error Background.
   *
   */
  errorBackground: palette.angry100,
};
