import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {MainStackScreenProps} from '../../../navigation/MainStack';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../../../store';
import {CustomBottomSheet} from './components/CustomBottomSheet';
import Touchable from '../../../components/Touchable';
import {dummyHorizontal, dummyVertical} from './homeDummyData';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {Screen} from '../../../components/Screen';

type NavigationProps = MainStackScreenProps<'Home'>;
type StoreProps = ConnectedProps<typeof connector>;
type Props = NavigationProps & StoreProps;

function HomeScreen({navigation, startLocation, endLocation}: Props) {
  const [selected, setSelected] = useState<null | (typeof dummyVertical)[0]>(
    null,
  );
  const [visible, setVisible] = useState(false);
  const [loadingImages, setLoadingImages] = useState<{[key: string]: boolean}>(
    {},
  );

  const handlePress = (item: (typeof dummyVertical)[0]) => {
    setSelected(item);
    setVisible(true);
  };

  const closeSheet = () => {
    setVisible(false);
    setSelected(null);
  };

  const handleImageLoad = (id: string) => {
    setLoadingImages(prev => ({...prev, [id]: true}));
  };

  return (
    <Screen safeAreaEdges={['top']} style={styles.screen}>
      <ScrollView>
        <Text style={styles.header}>Trending Items</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.hScroll}>
          {dummyHorizontal.map(item => (
            <Touchable key={item.id} style={styles.hCard}>
              {!loadingImages[item.id] && (
                <ShimmerPlaceholder
                  shimmerColors={['#dddddd', '#bbbbbb', '#dddddd']} // higher contrast
                  LinearGradient={LinearGradient}
                  style={[
                    styles.hImage,
                    {
                      borderRadius: 12,
                      width: 150,
                      height: 160,
                      position: 'absolute',
                    },
                  ]}
                />
              )}
              <ImageBackground
                source={{uri: item.image}}
                style={styles.hImage}
                imageStyle={{borderRadius: 12}}
                onLoadEnd={() => handleImageLoad(item.id)}>
                <View style={styles.hOverlay}>
                  <Text style={styles.hCardTitle}>{item.title}</Text>
                  <Text style={styles.hCardDesc}>{item.description}</Text>
                </View>
              </ImageBackground>
            </Touchable>
          ))}
        </ScrollView>

        <Text style={styles.header}>All Items</Text>
        <FlatList
          data={dummyVertical}
          keyExtractor={i => i.id}
          contentContainerStyle={{paddingHorizontal: 12}}
          renderItem={({item}) => (
            <Touchable style={styles.vCard} onPress={() => handlePress(item)}>
              {!loadingImages[item.id] && (
                <ShimmerPlaceholder
                  shimmerColors={['#dddddd', '#bbbbbb', '#dddddd']} // higher contrast
                  LinearGradient={LinearGradient}
                  style={[
                    styles.vImage,
                    {
                      borderRadius: 12,
                      height: 200,
                      width: Dimensions.get('window').width - 24,
                      position: 'absolute',
                    },
                  ]}
                />
              )}
              <ImageBackground
                source={{uri: item.image}}
                style={styles.vImage}
                imageStyle={{borderRadius: 12}}
                onLoadEnd={() => handleImageLoad(item.id)}>
                <View style={styles.overlay}>
                  <Text style={styles.vCardTitle}>{item.title}</Text>
                  <Text style={styles.vCardDesc}>{item.description}</Text>
                </View>
              </ImageBackground>
            </Touchable>
          )}
        />
      </ScrollView>

      <CustomBottomSheet
        visible={visible}
        content={selected?.content || ''}
        data={dummyHorizontal}
        onDismiss={closeSheet}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: '#F5F7FB'},
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginHorizontal: 16,
    marginVertical: 12,
    color: '#333',
  },
  hScroll: {paddingLeft: 16},
  hCard: {
    width: 150,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    marginRight: 10,
  },
  hImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  hOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 10,
  },
  hCardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  hCardDesc: {
    color: '#eee',
    fontSize: 13,
  },
  vCard: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  vImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 12,
  },
  vCardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  vCardDesc: {
    color: '#eee',
    fontSize: 14,
  },
});

const mapStateToProps = (state: RootState) => ({
  startLocation: state.home.startLocation,
  endLocation: state.home.endLocation,
});
const connector = connect(mapStateToProps, {});
export const Home = connector(HomeScreen);
