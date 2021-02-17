import React from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  BackHandler,
  ActivityIndicator,
} from 'react-native';

// to get the device window

// local image path
const imagePath = '../images/';

import {openDatabase} from 'react-native-sqlite-storage';
import SplashScreen from './SplashScreen';
var db = openDatabase({name: 'UserDatabase.db'});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataFromApi: [],
      isVisible: true,
      continentsFromApi: [],
      isSplash: true,
    };
  }
  requestScreen = async () => {
    this.props.navigation.navigate('HomePage');
  };
  async componentDidMount() {
    setTimeout(() => this.setState({isSplash: false}), 3000);
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    });
    this._unsubscribe = this.props.navigation.addListener('blur', () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.handleBackPress,
      );
    });

    fetch('https://restcountries.eu/rest/v2/all', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataFromApi: responseData,
        }),
          this.offlineDataStoringHandler();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  offlineDataStoringHandler() {
    // creating database
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(id VARCHAR(20) PRIMARY KEY, region VARCHAR(20), name INT(10), capital VARCHAR(255),flag VARCHAR(255),language VARCHAR(255),borders VARCHAR(255),alpha3Code VARCHAR(255))',
              [],
            );
          }
        },
      );
    });

    db.transaction((tx) => {
      for (let i = 0; i < this.state.dataFromApi.length; i++) {
        var languageValuesFromApi = [];
        var allLanguages = '';
        let region = this.state.dataFromApi[i].region;
        let name = this.state.dataFromApi[i].name;
        let capital = this.state.dataFromApi[i].capital;
        let flag = this.state.dataFromApi[i].flag;

        let languages = this.state.dataFromApi[i].languages;
        let borders = this.state.dataFromApi[i].borders;
        var x = borders.toString();

        let languagesName;

        let alpha3Code = this.state.dataFromApi[i].alpha3Code;

        for (let index = 0; index < languages.length; index++) {
          languagesName = languages[index].name;

          languageValuesFromApi.push(languages[index].name);

          allLanguages = languageValuesFromApi.toString();
        }

        tx.executeSql(
          'INSERT INTO table_user (id,region,name, capital,flag,language,borders,alpha3Code) VALUES (?,?,?,?,?,?,?,?)',
          [name, region, name, capital, flag, allLanguages, x, alpha3Code],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
          },
        );
      }
    });

    //get only continentsFromApi data
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT DISTINCT region FROM table_user',
        [],
        (tx, results) => {
          var dataGot = [];
          for (let i = 0; i < results.rows.length; ++i)
            dataGot.push(results.rows.item(i));

          this.setState({
            continentsFromApi: dataGot,
            isLoading: false,
          });
        },
      );
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }
  navigateHandler = () => {
    this.props.navigation.navigate('HomePage');
  };
  handleBackPress = () => {
    console.log('backpress in home');

    this.navigateHandler();
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {
          text: 'No',
          onPress: () => {
            this.props.navigation.navigate('HomePage');
            console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    // return true;
  };
  drawHandler = () => {
    console.log('clicked');
    this.props.navigation.openDrawer();
  };

  itemListDisplay = (item) => {
    return (
      <View key={item.user_id} style={{padding: 20}}>
        <Text>{item.region}</Text>
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        {this.state.isSplash ? (
          <SplashScreen />
        ) : (
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
                      paddingTop: 10,
                      paddingBottom: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: '#c6cbef',
                    }}>
                    <TouchableOpacity onPress={() => this.drawHandler()}>
                      <Image
                        source={require('../images/menu-512.png')}
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
                          fontSize: 24,
                          fontWeight: '100',
                        }}>
                        Home Page
                      </Text>
                    </View>
                  </View>
                  <FlatList
                    data={this.state.continentsFromApi}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate('Country', {
                            userName: item.region,
                          });
                        }}>
                        <Text
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          {this.itemListDisplay(item)}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

export default HomePage;
