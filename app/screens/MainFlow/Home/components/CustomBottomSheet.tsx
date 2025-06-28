import React, {useCallback, useRef, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {ScreenHeight} from '../../../../utils/util';

interface CardData {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface CustomBottomSheetProps {
  visible: boolean;
  data: CardData[];
  content: string;
  onDismiss: () => void;
}

export const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  visible,
  data,
  content,
  onDismiss,
}) => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = ['CONTENT_HEIGHT', '100%'];

  useEffect(() => {
    if (visible) {
      sheetRef.current?.expand();
    } else {
      sheetRef.current?.close();
    }
  }, [visible]);

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index < 0) onDismiss();
    },
    [onDismiss],
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={sheetRef}
      index={visible ? 0 : -1}
      enablePanDownToClose
      onClose={onDismiss}
      onChange={handleSheetChange}
      enableDynamicSizing
      //   handleIndicatorStyle={{backgroundColor: 'red'}}
      maxDynamicContentSize={ScreenHeight * 0.8}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.sheetBackground}>
      <BottomSheetScrollView
        style={styles.inner}
        contentContainerStyle={styles.contentContainer}>
        <Text style={styles.subtitle}>Description</Text>

        <Text style={styles.detailText}>{content}</Text>
        <Text style={styles.subtitle}>More Cards</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map(item => (
            <ImageBackground
              key={item.id}
              source={{uri: item.image}}
              style={styles.hCard}
              imageStyle={styles.hImage}>
              <View style={styles.overlay}>
                <Text style={styles.hCardTitle}>{item.title}</Text>
                <Text style={styles.hCardDesc}>{item.description}</Text>
              </View>
            </ImageBackground>
          ))}
        </ScrollView>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  //   handle: {backgroundColor: '#ccc', width: 40},
  sheetBackground: {borderTopLeftRadius: 16, borderTopRightRadius: 16},
  inner: {flex: 1},
  contentContainer: {padding: 16},
  detailText: {fontSize: 16, marginBottom: 16, color: '#222'},
  subtitle: {fontSize: 18, fontWeight: '600', marginBottom: 8},
  hCard: {
    width: 160,
    height: 200,
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  hImage: {
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
  },
  hCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  hCardDesc: {
    fontSize: 13,
    color: '#ddd',
    marginTop: 4,
  },
});
