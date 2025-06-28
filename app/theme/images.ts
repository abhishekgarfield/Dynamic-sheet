let PATH = '../assets/images/';

export const images = {
  // Toast
  // success: require(`${PATH}success.png`),
  // danger: require(`${PATH}danger.png`),
  // warning: require(`${PATH}warning.png`),
  // avatar: require(`${PATH}avatar.png`),
  // offline: require(`${PATH}offline.png`),
} as const;

export type AppImage = keyof typeof images;
