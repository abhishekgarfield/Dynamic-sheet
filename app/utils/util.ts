import {
  Alert,
  Dimensions,
  ImageProps,
  ImageURISource,
  Share,
} from 'react-native';
import {images} from '../theme';
import {FastImageProps} from '@d11/react-native-fast-image';

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const ScreenWidth = Dimensions.get('screen').width;
export const ScreenHeight = Dimensions.get('screen').height;
export const hitSlop = {left: 5, top: 10, right: 5, bottom: 10};
export const ACTIVE_OPACITY = 0.7;
export const GLOBAL_LIST_LIMIT = 10;

type AsyncImageProps = {
  source: ImageProps['source'];
  defaultSource: ImageProps['defaultSource'];
};

export function parseSource(
  uri: string | String,
  defaultSource: ImageURISource | number = images.user,
): AsyncImageProps {
  return {
    source: !(uri && uri !== '') ? defaultSource : {uri: uri.toString()},
    defaultSource: defaultSource,
  };
}

export function parseFastSource(
  uri?: string,
  defaultSource: number = images.user,
): FastImageProps {
  return {
    source: !uri ? defaultSource : {uri: uri.toString()},
    defaultSource: defaultSource,
  };
}

type DebouncedFunction<T extends (...args: any[]) => any> = (
  ...args: Parameters<T>
) => Promise<ReturnType<T> | void>;

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  millisecond: number,
): DebouncedFunction<T> {
  let timeoutId: NodeJS.Timeout;

  return async function debounced(
    ...args: Parameters<T>
  ): Promise<void | ReturnType<T>> {
    clearTimeout(timeoutId);

    return new Promise<void | ReturnType<T>>(resolve => {
      timeoutId = setTimeout(async () => {
        resolve(func(...args));
      }, millisecond);
    });
  };
}

export const onShare = async ({message}: {message: string}) => {
  try {
    const result = await Share.share({
      message: message,
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error: any) {
    Alert.alert(error.message);
  }
};
