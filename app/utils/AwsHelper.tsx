// import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
// import {AwsCredentialIdentity} from '@aws-sdk/types';
// import RNFS from 'react-native-fs';
// import 'react-native-get-random-values';
// import ImageCropPicker from 'react-native-image-crop-picker';
// import 'react-native-url-polyfill/auto';
// import RNFetchBlob from 'rn-fetch-blob';
// // import {decode as base64Decode} from 'react-native-base64';
// import {Platform} from 'react-native';
// import {
//   AWS_BUCKET_ID,
//   AWS_BUCKET_KEY,
//   AWS_BUCKET_NAME,
//   AWS_BUCKET_REGION,
// } from '@env';

// const options = {
//   keyPrefix: 'uploads/', // Folder in S3 bucket
//   bucket: AWS_BUCKET_NAME,
//   region: AWS_BUCKET_REGION,
//   successActionStatus: 201,
// };

// let credentials: AwsCredentialIdentity = {
//   accessKeyId: AWS_BUCKET_ID, // Replace with your AWS access key
//   secretAccessKey: AWS_BUCKET_KEY, // Replace with your AWS secret key
// };

// const client = new S3Client({
//   region: options.region,
//   credentials: credentials,
// });

// const AWSHelper = {
//   /**
//    * Uploads one or multiple files to AWS S3
//    * @param uris - Array of file URIs to upload.
//    * @returns Promise<boolean> - True if upload succeeds, false otherwise.
//    */
//   uploadFiles: async function (uris: string[]) {
//     try {
//       console.log('Starting file uploads...', uris);

//       for (const uri of uris) {
//         console.log('--as-d-asd--');
//         // const resolvedPath = await resolveUriToFilePath(uri); // Resolve the `ph://` URI

//         console.log('🚀 ~ resolvedPath:', uri);
//         // Optional: Convert HEIC to JPEG if necessary
//         // const filePath = resolvedPath.endsWith('.HEIC')
//         //   ? await convertHeicToJpeg(resolvedPath)
//         //   : resolvedPath;

//         const fileName = getFileName(uri);
//         const fileType = getFileType(uri);

//         console.log(`Uploading file: 11${fileName}`);

//         const fileStream = RNFetchBlob.wrap(uri); // Use stream instead of Base64
//         console.log('🚀 ~ fileStream:', fileStream);
//         const command = new PutObjectCommand({
//           Bucket: options.bucket,
//           Key: options.keyPrefix + fileName,
//           Body: fileStream,
//           ContentType: fileType,
//         });

//         // const fileBuffer = await RNFS.readFile(filePath, 'base64');
//         // console.log('🚀 ~ fileBuffer:', fileBuffer);
//         // // const fileUint8Array = Uint8Array.from(atob(fileBuffer), c =>
//         // //   c.charCodeAt(0),
//         // // ); // Convert Base64 to Uint8Array
//         // const fileUint8Array = Uint8Array.from(base64.decode(fileBuffer), c =>
//         //   c.charCodeAt(0),
//         // );
//         // console.log('🚀 ~ fileUint8Array:', fileUint8Array);

//         // // Upload the file to S3
//         // const command = new PutObjectCommand({
//         //   Bucket: options.bucket,
//         //   Key: options.keyPrefix + fileName,
//         //   Body: fileUint8Array,
//         //   ContentType: fileType,
//         // });
//         console.log('------s---sa-as-as-------');
//         const response = await client.send(command);
//         console.log(`File uploaded successfully: ${fileName}`, response);
//       }

//       console.log('All files uploaded successfully!');
//       return true;
//     } catch (error) {
//       console.error('Error uploading files:', error);
//       return false;
//     }
//   },
// };

// export default AWSHelper;

// const getFileName = (path: string) => {
//   return path.split('/').pop(); // Extracts the file name from the path
// };

// const getFileType = (path: string) => {
//   const extension = path.split('.').pop()?.toLowerCase();
//   switch (extension) {
//     case 'jpg':
//     case 'jpeg':
//       return 'image/jpeg';
//     case 'png':
//       return 'image/png';
//     case 'mp4':
//       return 'video/mp4';
//     case 'pdf':
//       return 'application/pdf';
//     default:
//       return 'application/octet-stream'; // Default MIME type for unknown files
//   }
// };
// // const resolveUriToFilePath = async uri => {
// //   if (uri.startsWith('ph://')) {
// //     try {
// //       const filePath = await getPathFromPhotos(uri);
// //       return filePath; // Returns a valid file path
// //     } catch (error) {
// //       console.error('Error resolving ph:// URI:', error);
// //       return null; // Handle unresolved paths gracefully
// //     }
// //   }
// //   return uri; // Return unchanged if it's not a ph:// URI
// // };

// // export const resolveUriToFilePath = async uri => {
// //   let imagePath = null;

// //   try {
// //     if (Platform.OS === 'ios' && uri.startsWith('ph://')) {
// //       // Extract the unique identifier from the `ph://` URI
// //       const regex = /:\/\/(.{36})\//i;
// //       const result = uri.match(regex);
// //       if (!result || !result[1]) {
// //         throw new Error('Invalid ph:// URI format');
// //       }

// //       const photoId = result[1];
// //       const photoPATH = `assets-library://asset/asset.JPG?id=${photoId}&ext=JPG`;

// //       // Define the destination path
// //       const destPath = `${RNFS.TemporaryDirectoryPath}${Math.random()
// //         .toString(36)
// //         .substring(7)}.jpg`;

// //       // Copy the asset to a temporary file
// //       imagePath = await RNFS.copyAssetsFileIOS(
// //         photoPATH,
// //         destPath,
// //         500,
// //         500,
// //         1.0,
// //         1.0,
// //         'contain',
// //       );
// //     } else if (Platform.OS === 'android') {
// //       imagePath = uri; // Return the original URI as Android handles `file://` paths
// //     } else {
// //       imagePath = uri; // For non-ph:// URIs, return as-is
// //     }
// //   } catch (error) {
// //     console.error('Error resolving URI:', error);
// //     imagePath = null; // Handle errors gracefully
// //   }

// //   return imagePath;
// // };

// // export const resolveUriToFilePath = async asset => {
// //   let filePath = null;

// //   try {
// //     // Extract the uri property
// //     const {uri, filename} = asset;

// //     if (!uri) {
// //       throw new Error('Invalid asset: Missing URI');
// //     }

// //     if (Platform.OS === 'ios' && uri.startsWith('ph://')) {
// //       // Extract the unique identifier from the `ph://` URI
// //       const regex = /:\/\/(.{36})\//i;
// //       const result = uri.match(regex);
// //       if (!result || !result[1]) {
// //         throw new Error('Invalid ph:// URI format');
// //       }

// //       const assetId = result[1];

// //       // Check file type (image or video) using the filename
// //       const isVideo =
// //         (filename && filename.toLowerCase().endsWith('.mp4')) ||
// //         asset?.type == 'video';
// //       const extension = isVideo ? 'mp4' : 'jpg';
// //       const assetPath = `assets-library://asset/asset.${extension}?id=${assetId}&ext=${extension}`;

// //       // Define the destination path
// //       const destPath = `${RNFS.TemporaryDirectoryPath}${Math.random()
// //         .toString(36)
// //         .substring(7)}.${extension}`;

// //       // Copy the asset to a temporary file
// //       if (isVideo) {
// //         // Handle video assets
// //         filePath = await RNFS.copyAssetsVideoIOS(assetPath, destPath);
// //       } else {
// //         // Handle image assets
// //         filePath = await RNFS.copyAssetsFileIOS(
// //           assetPath,
// //           destPath,
// //           500,
// //           500,
// //           1.0,
// //           1.0,
// //           'contain',
// //         );
// //       }
// //     } else if (Platform.OS === 'android') {
// //       filePath = uri; // Return the original URI as Android handles `file://` paths
// //     } else {
// //       filePath = uri; // For non-ph:// URIs, return as-is
// //     }
// //   } catch (error) {
// //     console.error('Error resolving URI:', error);
// //     filePath = null; // Handle errors gracefully
// //   }

// //   return filePath;
// // };

// // const getFileExtension = asset => {
// //   const {filename, type, extension} = asset;

// //   // Supported extensions
// //   const imageFormats = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'heic'];
// //   const videoFormats = ['mp4', 'mov', 'avi', 'mkv', '3gp', 'm4v', 'webm'];

// //   let ext = null;

// //   // 1. Check for extension explicitly passed
// //   if (extension) {
// //     ext = extension.toLowerCase();
// //   }
// //   // 2. Extract extension from filename
// //   else if (filename) {
// //     const match = filename.match(/\.(\w+)$/);
// //     if (match && match[1]) {
// //       ext = match[1].toLowerCase();
// //     }
// //   }
// //   // 3. Extract extension from MIME type
// //   else if (type) {
// //     ext = type.split('/')[1]?.toLowerCase();
// //   }

// //   // 4. Validate extension
// //   if (imageFormats.includes(ext)) {
// //     return ext; // Valid image format
// //   } else if (videoFormats.includes(ext)) {
// //     return ext; // Valid video format
// //   }

// //   // 5. Default fallback
// //   if (type?.startsWith('image')) {
// //     return 'jpg';
// //   } else if (type?.startsWith('video')) {
// //     return 'mp4';
// //   }

// //   // Final fallback
// //   return 'jpg'; // Default to jpg if unsure
// // };

// export const convertHeicToJpeg = async (uri: string) => {
//   const result = await ImageCropPicker.openCropper({
//     path: uri,
//     cropping: false,
//     compressImageQuality: 1.0,
//     mediaType: 'photo',
//   });
//   return result.path;
// };

// export const removeTempFile = async filePath => {
//   console.log('🚀 ~ removeTempFile ~ filePath:', filePath);
//   try {
//     const fileExists = await RNFS.exists(filePath);

//     if (fileExists) {
//       await RNFS.unlink(filePath);
//       console.log(`Temporary file removed: ${filePath}`);
//     } else {
//       console.log(`File does not exist, no removal needed: ${filePath}`);
//     }
//   } catch (error) {
//     console.error('Error removing temporary file:', error);
//   }
// };

// export const resolveUriToFilePath = async asset => {
//   console.log('🚀 ~ resolveUriToFilePath ~ asset:', asset);
//   let filePath = null;

//   try {
//     const {uri} = asset.image;

//     if (!uri) throw new Error('Invalid asset: Missing URI');

//     // Extract or determine the file extension
//     const ext = getFileExtension(asset);
//     console.log('🚀 ~ resolveUriToFilePath ~ ext:', ext);

//     if (Platform.OS === 'ios' && uri.startsWith('ph://')) {
//       // Handle iOS: Extract the unique identifier from the `ph://` URI
//       const regex = /:\/\/(.{36})\//i;
//       const result = uri.match(regex);
//       if (!result || !result[1]) throw new Error('Invalid ph:// URI format');

//       const assetId = result[1];
//       const assetPath = `assets-library://asset/asset.${ext}?id=${assetId}&ext=${ext}`;
//       const destPath = `${RNFS.TemporaryDirectoryPath}${Math.random()
//         .toString(36)
//         .substring(7)}.${ext}`;

//       // Handle video or image assets
//       if (['mp4', 'mov'].includes(ext)) {
//         // Handle video assets for iOS
//         filePath = await RNFS.copyAssetsVideoIOS(assetPath, destPath);
//       } else {
//         // Handle image assets for iOS
//         filePath = await RNFS.copyAssetsFileIOS(
//           assetPath,
//           destPath,
//           500,
//           500,
//           1.0,
//           1.0,
//           'contain',
//         );
//       }
//     } else if (Platform.OS === 'android') {
//       // Handle Android: Content URIs (e.g., content://media/external/video/media/ID)
//       const fileExtension = ext || 'mp4'; // Default to mp4 if no extension
//       const destPath = `file:${RNFS.DocumentDirectoryPath}${Math.random()
//         .toString(36)
//         .substring(7)}.${fileExtension}`;

//       // Handle video URIs for Android
//       if (asset.type.includes('video')) {
//         const videoPath = uri; // Android handles `content://` URIs directly
//         await RNFS.copyFile(videoPath, destPath); // Copy the video file
//         filePath = destPath;
//       }
//       // Handle image URIs for Android
//       else if (asset.type.includes('image')) {
//         const imagePath = uri; // Android handles `content://` URIs directly
//         await RNFS.copyFile(imagePath, destPath); // Copy the image file
//         filePath = destPath;
//       }
//     } else {
//       filePath = uri; // Handle non-iOS, non-Android URIs
//     }
//   } catch (error) {
//     console.error('Error resolving URI:', error);
//     filePath = null; // Return null in case of error
//   }
//   const fileExists = await RNFS.exists(filePath);
//   console.log('🚀 ~ resolveUriToFilePath ~ fileExists:', fileExists);

//   if (!fileExists) {
//     console.error('File does not exist at path:', filePath);
//   }
//   console.log('🚀 ~ resolveUriToFilePath ~ filePath:', filePath);

//   return filePath;
// };

// // Supported formats
// export const imageFormats = [
//   'jpg',
//   'jpeg',
//   'png',
//   'gif',
//   'bmp',
//   'webp',
//   'heic',
// ];
// export const videoFormats = ['mp4', 'mov', 'avi', 'mkv', '3gp', 'm4v', 'webm'];

// const getFileExtension = asset => {
//   const {filename, extension} = asset.image;
//   const {type} = asset;

//   // 1. Check for explicitly provided extension
//   if (extension) return extension.toLowerCase();

//   // 2. Extract from filename
//   if (filename) {
//     const match = filename.toLowerCase().match(/\.(\w+)$/); // Matches the extension at the end of filename
//     if (match && match[1]) {
//       const ext = match[1].toLowerCase();
//       return ext;
//     }
//   }

//   // 4. Default fallback based on MIME type
//   if (type?.startsWith('image')) return 'jpg';
//   if (type?.startsWith('video')) return 'mp4';

//   // 5. Final fallback
//   return 'jpg'; // Default to jpg
// };
