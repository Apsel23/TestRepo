import React from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Image,
  BackHandler,
} from 'react-native';

import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabase.db'});

import {WebView} from 'react-native-webview';

class countriesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      // do something
      console.log('focussed');
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

      const user_name = this.props.route.params.userName;

      //offline database
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM table_user where region = ?',
          [user_name],
          (tx, results) => {
            var dataGot = [];
            console.log(results.rows.item(1));
            for (let i = 0; i < results.rows.length; ++i)
              dataGot.push(results.rows.item(i));

            this.setState({
              countries: dataGot,
              isLoading: false,
            });
          },
        );
      });
    });
    this._unsubscribe = this.props.navigation.addListener('blur', () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.handleBackPress,
      );
    });

    console.log(this.props.route.params.userName);
  }

  handleBackPress = () => {
    console.log('back press');
    this.props.navigation.navigate('HomePage');
    this.setState({isLoading: true});
    return true;
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{flex: 1}}>
            {this.state.isLoading ? (
              <ActivityIndicator
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                size={'large'}
                color={'orange'}
              />
            ) : (
              <View>
                <View
                  style={{
                    paddingTop: 5,
                    paddingBottom: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#c6cbef',
                  }}>
                  <TouchableOpacity onPress={() => this.handleBackPress()}>
                    <Image
                      source={require('../images/PngItem_781313.png')}
                      style={{
                        width: 25,
                        height: 20,
                        marginTop: 5,
                        marginLeft: 20,
                      }}
                    />
                  </TouchableOpacity>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 22,
                        fontWeight: '100',
                        textTransform: 'uppercase',
                      }}>
                      {this.props.route.params.userName}
                    </Text>
                  </View>
                </View>

                <FlatList
                  enableEmptySections={true}
                  data={this.state.countries}
                  keyExtractor={(item) => item.id}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('Language', {
                            userName: item.name,
                          });
                        }}>
                        <View style={styles.box}>
                          <WebView
                            source={{uri: item.flag}}
                            style={{width: 180, height: 130}}
                          />

                          <View style={styles.info}>
                            <Text style={styles.name}>{item.name}</Text>

                            <Text style={styles.iconFonts}>{item.capital}</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',

    paddingBottom: 120,
    paddingStart: 10,
    paddingEnd: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  image: {
    width: 100,
    height: 100,
  },
  box: {
    marginTop: 10,
    backgroundColor: '#03fcdf',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  name: {
    fontSize: 16,
    marginTop: 10,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  iconFonts: {
    // color: 'gray',
    fontSize: 12,
  },
  red: {
    color: '#FF4500',
  },
});

export default countriesScreen;
