import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
const win = Dimensions.get('window');

const imagePath = '../images/';

class SplashScreen extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <View style={styles.body}>
          <View style={styles.dataShow}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={require(imagePath + 'icons8-earth-care-64.png')}
            />

            <Text style={styles.title}>Countries</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ffff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
  },

  image: {
    width: win.width / 2.1,
    backgroundColor: '#fff',
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  bought: {
    color: '#fff',
    fontSize: 10,
    fontStyle: 'normal',

    lineHeight: 17,
    opacity: 0.6,
  },
  title: {
    color: '#000000',
    fontSize: 20,
    fontStyle: 'normal',
    // fontFamily: 'Nunito-Bold',
  },
  dataShow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashScreen;
