import {useNavigation, useScrollToTop} from '@react-navigation/native';
import {StatusBar, StatusBarProps} from 'expo-status-bar';
import React, {useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  KeyboardAvoidingViewProps,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import {colors, images, spacing} from '../theme';
// import {
//   ExtendedEdge,
//   useSafeAreaInsetsStyle,
// } from '../utils/useSafeAreaInsetsStyle';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Source} from '@d11/react-native-fast-image';
import RNImage from './Image';
import {
  ExtendedEdge,
  useSafeAreaInsetsStyle,
} from '../utils/useSafeAreaInsetsStyle';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
// import {ScreenHeight} from '../utils/util';

interface BaseScreenProps {
  useAnimation?: boolean;
  /**
   * Children components.
   */
  children?: React.ReactNode;
  /**
   * Style for the outer content container useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Style for the inner content container useful for padding & margin.
   */
  contentContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: ExtendedEdge[];
  /**
   * Status bar setting. Defaults to dark.
   */
  statusBarStyle?: 'light' | 'dark';
  /**
   * By how much should we offset the keyboard? Defaults to 0.
   */
  keyboardOffset?: number;
  /**
   * Pass any additional props directly to the StatusBar component.
   */
  statusBarProps?: StatusBarProps;
  /**
   * Pass any additional props directly to the KeyboardAvoidingView component.
   */
  keyboardAvoidingViewProps?: KeyboardAvoidingViewProps;
  /**
   * Render Sticky header on top of the screen
   */
  renderHeader?: React.ReactNode;
  /**
   * add screen padding in case of using BottomTabBar
   */
  tabBarHeight?: number;
  hideBackground?: boolean;
  backgroundImage?: Source;
}

interface FixedScreenProps extends BaseScreenProps {
  preset?: 'fixed';
}
interface ScrollScreenProps extends BaseScreenProps {
  preset?: 'scroll';
  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: 'handled' | 'always' | 'never';
  /**
   * Pass any additional props directly to the ScrollView component.
   */
  scrollViewProps?: ScrollViewProps;
}

interface AutoScreenProps extends Omit<ScrollScreenProps, 'preset'> {
  preset?: 'auto';
  /**
   * Threshold to trigger the automatic disabling/enabling of scroll ability.
   * Defaults to `{ percent: 0.92 }`.
   */
  scrollEnabledToggleThreshold?: {percent?: number; point?: number};
}

export type ScreenProps =
  | ScrollScreenProps
  | FixedScreenProps
  | AutoScreenProps;

const isIos = Platform.OS === 'ios';

function isNonScrolling(preset?: ScreenProps['preset']) {
  return !preset || preset === 'fixed';
}

function useAutoPreset(props: AutoScreenProps) {
  const {preset, scrollEnabledToggleThreshold} = props;
  const {percent = 0.92, point = 0} = scrollEnabledToggleThreshold || {};

  const scrollViewHeight = useRef<number | null>(null);
  const scrollViewContentHeight = useRef<number | null>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  function updateScrollState() {
    if (
      scrollViewHeight.current === null ||
      scrollViewContentHeight.current === null
    ) {
      return;
    }

    // check whether content fits the screen then toggle scroll state according to it
    const contentFitsScreen = (function () {
      if (point) {
        return (
          scrollViewContentHeight.current < scrollViewHeight.current - point
        );
      } else {
        return (
          scrollViewContentHeight.current < scrollViewHeight.current * percent
        );
      }
    })();

    // content is less than the size of the screen, so we can disable scrolling
    if (scrollEnabled && contentFitsScreen) {
      setScrollEnabled(false);
    }

    // content is greater than the size of the screen, so let's enable scrolling
    if (!scrollEnabled && !contentFitsScreen) {
      setScrollEnabled(true);
    }
  }

  function onContentSizeChange(w: number, h: number) {
    // update scroll-view content height
    scrollViewContentHeight.current = h;
    updateScrollState();
  }

  function onLayout(e: LayoutChangeEvent) {
    const {height} = e.nativeEvent.layout;
    // update scroll-view  height
    scrollViewHeight.current = height;
    updateScrollState();
  }

  // update scroll state on every render
  if (preset === 'auto') {
    updateScrollState();
  }

  return {
    scrollEnabled: preset === 'auto' ? scrollEnabled : true,
    onContentSizeChange,
    onLayout,
  };
}

function ScreenWithoutScrolling(props: ScreenProps) {
  const {style, contentContainerStyle, children} = props;
  return (
    <View style={[$outerStyle, style]}>
      <View style={[$innerStyle, contentContainerStyle]}>{children}</View>
    </View>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const {
    children,
    keyboardShouldPersistTaps = 'handled',
    contentContainerStyle,
    scrollViewProps,
    style,
  } = props as ScrollScreenProps;

  const ref = useRef<ScrollView>(null);

  const {scrollEnabled, onContentSizeChange, onLayout} = useAutoPreset(
    props as AutoScreenProps,
  );

  // Add native behavior of pressing the active tab to scroll to the top of the content
  // More info at: https://reactnavigation.org/docs/use-scroll-to-top/
  useScrollToTop(ref);

  return (
    <ScrollView
      {...{keyboardShouldPersistTaps, scrollEnabled, ref}}
      {...scrollViewProps}
      onLayout={e => {
        onLayout(e);
        scrollViewProps?.onLayout?.(e);
      }}
      onContentSizeChange={(w: number, h: number) => {
        onContentSizeChange(w, h);
        scrollViewProps?.onContentSizeChange?.(w, h);
      }}
      style={[$outerStyle, scrollViewProps?.style, style]}
      contentContainerStyle={[
        $innerStyle,
        scrollViewProps?.contentContainerStyle,
        contentContainerStyle,
      ]}>
      {children}
    </ScrollView>
  );
}

export function Screen(props: ScreenProps) {
  const {
    keyboardAvoidingViewProps = {},
    keyboardOffset = 0,
    safeAreaEdges,
    statusBarProps,
    statusBarStyle = 'dark',
    renderHeader,
    tabBarHeight,
    hideBackground = false,
    contentContainerStyle,
    useAnimation = false,
  } = props;
  const safeAreaInsets = useSafeAreaInsets();
  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);
  const translateX = useSharedValue(-50); // Start slightly off-screen (left)

  /** 🔥 Run bounce animation when the component mounts */
  useEffect(() => {
    translateX.value = withSequence(
      withSpring(0, {damping: 6, stiffness: 100}), // Move right with spring effect
      // withSpring(-50, {damping: 5, stiffness: 100}), // Move left with spring effect
      // withSpring(0, {damping: 8, stiffness: 120}), // Settle smoothly in the middle
    );
  }, []);

  /** 🏆 Animated style for the bouncing effect */
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));
  return (
    <View
      style={[
        $containerStyle,
        $containerInsets,
        {
          backgroundColor: colors.palette.screenBackground,
        },
        contentContainerStyle,
      ]}>
      {/* <StatusBar style={statusBarStyle} {...statusBarProps} /> */}

      <KeyboardAvoidingView
        behavior={isIos ? 'padding' : undefined}
        keyboardVerticalOffset={keyboardOffset}
        {...keyboardAvoidingViewProps}
        style={[$keyboardAvoidingViewStyle, keyboardAvoidingViewProps?.style]}>
        {renderHeader && renderHeader}

        {useAnimation ? (
          <Animated.View style={[animatedStyle, {flex: 1}]}>
            {isNonScrolling(props.preset) ? (
              <ScreenWithoutScrolling {...props} />
            ) : (
              <ScreenWithScrolling {...props} />
            )}
          </Animated.View>
        ) : isNonScrolling(props.preset) ? (
          <ScreenWithoutScrolling {...props} />
        ) : (
          <ScreenWithScrolling {...props} />
        )}
        {/* <Animated.View style={[animatedStyle, {flex: 1}]}>
          {isNonScrolling(props.preset) ? (
            <ScreenWithoutScrolling {...props} />
          ) : (
            <ScreenWithScrolling {...props} />
          )}
        </Animated.View> */}
      </KeyboardAvoidingView>
      <View
        style={{
          height: tabBarHeight
            ? tabBarHeight + safeAreaInsets.bottom
            : spacing.zero,
        }}
      />
    </View>
  );
}

const $containerStyle: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
};

const $keyboardAvoidingViewStyle: ViewStyle = {
  flex: 1,
};

const $outerStyle: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
};

const $innerStyle: ViewStyle = {
  // flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'stretch',
};
