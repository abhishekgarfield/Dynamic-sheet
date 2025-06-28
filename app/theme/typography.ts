// TODO: write documentation about fonts and typography along with guides on how to add custom fonts in own
// markdown file and add links from here

const fonts = {
  primary: {
    // DMSans
    bold: 'Poppins-Bold',
    medium: 'Poppins-Medium',
    regular: 'Poppins-Regular',
    black: 'Poppins-Black',
    extrabold: 'Poppins-ExtraBold',
    extralight: 'Poppins-Regular',
    light: 'Poppins-Light',
    semibold: 'Poppins-SemiBold',
    thin: 'Poppins-Thin',
  },
};

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts.primary,
};
