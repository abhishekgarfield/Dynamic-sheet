import {Platform} from 'react-native';
import RNFS from 'react-native-fs';

const resolveUriToFilePath = async uri => {
  let imagePath = null;

  try {
    if (Platform.OS === 'ios' && uri.startsWith('ph://')) {
      // Extract the unique identifier from the `ph://` URI
      const regex = /:\/\/(.{36})\//i;
      const result = uri.match(regex);
      if (!result || !result[1]) {
        throw new Error('Invalid ph:// URI format');
      }

      const photoId = result[1];
      const photoPATH = `assets-library://asset/asset.JPG?id=${photoId}&ext=JPG`;

      // Define the destination path
      const destPath = `${RNFS.TemporaryDirectoryPath}${Math.random()
        .toString(36)
        .substring(7)}.jpg`;

      // Copy the asset to a temporary file
      imagePath = await RNFS.copyAssetsFileIOS(
        photoPATH,
        destPath,
        500,
        500,
        1.0,
        1.0,
        'contain',
      );
    } else if (Platform.OS === 'android') {
      imagePath = uri; // Return the original URI as Android handles `file://` paths
    } else {
      imagePath = uri; // For non-ph:// URIs, return as-is
    }
  } catch (error) {
    console.error('Error resolving URI:', error);
    imagePath = null; // Handle errors gracefully
  }

  return imagePath;
};
