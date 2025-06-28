import FastImage from '@d11/react-native-fast-image';

// how to use this

// useEffect(() => {
//   // Define the images you want to preload.
//   const imagesToPreload = [
//     {
//       uri: 'https://example.com/image1.png',
//       headers: {Authorization: 'Bearer token'},
//     },
//     {uri: 'https://example.com/image2.png'},
//   ];

//   // Call the preloadImages function to preload the images.
//   PreloadImageUtility.preloadImages(imagesToPreload);
// }, []);

// end

/**
 * Preloads an array of images for better performance.
 *
 * @param {Array} images - Array of image objects with `uri` and optional `headers`.
 * Example:
 * [
 *   { uri: 'https://example.com/image1.png', headers: { Authorization: 'Bearer token' } },
 *   { uri: 'https://example.com/image2.png' },
 * ]
 */
const preloadImages = (images = []) => {
  try {
    // Validate the input to ensure it's an array of objects with URIs.
    const formattedImages = images.map(image => ({
      uri: image.uri,
      headers: image.headers || {}, // Default to an empty object if headers are not provided.
    }));

    FastImage.preload(formattedImages);
    console.log('Images preloaded successfully!');
  } catch (error) {
    console.error('Error preloading images:', error);
  }
};

export default {
  preloadImages,
};
