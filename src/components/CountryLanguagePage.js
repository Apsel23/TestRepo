import React from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Text,
  Image,
  ScrollView,
} from 'react-native';

import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'UserDatabase.db'});

class LanguageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      individualCountries: [],
      isLoading: true,
      borders: [],
      emptyArray: false,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const user_name = this.props.route.params.userName;
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM table_user where name = ?',
          [user_name],
          (tx, results) => {
            console.log('results', results.rows.item(1));

            var dataGot = [];
            for (let i = 0; i < results.rows.length; ++i)
              dataGot.push(results.rows.item(i));
            console.log('dataGot Value', dataGot);
            this.setState({
              individualCountries: dataGot,
              isLoading: false,
            });

            this.borderNameHandler();
          },
        );
      });
    });
  }

  borderNameHandler() {
    var dataGot = [];
    for (
      let index = 0;
      index < this.state.individualCountries.length;
      index++
    ) {
      var borders = this.state.individualCountries[index].borders;

      var bordersArray = borders.split(',');

      for (var i = 0; i < bordersArray.length; i++) {
        let bor = bordersArray[i];

        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM table_user where alpha3Code = ?',
            [bor],
            (tx, results) => {
              for (let i = 0; i < results.rows.length; ++i)
                dataGot.push(results.rows.item(i).name);
              console.log('language', dataGot);
              this.setState({
                borders: dataGot,
              });

              if (dataGot.length == 0) {
                this.setState({
                  emptyArray: true,
                });
              }
            },
          );
        });
      }
    }
  }

  handleBackPress = () => {
    this.props.navigation.navigate('Country');
    this.setState({isLoading: true});
    return true;
  };

  componentWillUnmount() {
    this._unsubscribe();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{backgroundColor: 'white'}}>
          <View>
            {this.state.isLoading ? (
              <ActivityIndicator
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
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
                <View style={styles.bodyPart}>
                  <View style={styles.dataDisplayHeader}>
                    <Text style={styles.name}>Languages spoken</Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#c6cbef',
                      borderBottomWidth: 1,
                    }}
                  />
                  {this.state.individualCountries.length > 0 ? (
                    <FlatList
                      style={styles.container}
                      enableEmptySections={true}
                      data={this.state.individualCountries}
                      keyExtractor={(item) => {
                        return item.id;
                      }}
                      renderItem={({item}) => {
                        return (
                          <View style={styles.box}>
                            <View style={styles.info}>
                              <Text style={styles.name}> {item.language}</Text>
                            </View>
                          </View>
                        );
                      }}
                    />
                  ) : (
                    <Text style={{fontSize: 16}}>None</Text>
                  )}
                </View>
                <View style={styles.bodyPart}>
                  <View style={styles.dataDisplayHeader}>
                    <Text style={styles.name}>Neighbour Countries</Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: '#c6cbef',
                      borderBottomWidth: 1,
                    }}
                  />
                  {this.state.borders.length > 0 ? (
                    <ScrollView style={{flexDirection: 'column'}}>
                      <FlatList
                        style={styles.neighbour}
                        enableEmptySections={true}
                        data={this.state.borders}
                        keyExtractor={(item) => {
                          return item;
                        }}
                        renderItem={({item}) => {
                          return (
                            <View style={styles.box}>
                              {console.log('borderd', this.state.borders)}
                              <View style={styles.info}>
                                <Text style={styles.name}> {item}</Text>
                              </View>
                            </View>
                          );
                        }}
                      />
                    </ScrollView>
                  ) : (
                    <Text style={{fontSize: 20}}>None</Text>
                  )}
                </View>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    marginBottom: 10,
    backgroundColor: '#EEEEEE',
    paddingStart: 10,
    paddingEnd: 10,
  },
  bodyPart: {
    // borderWidth: 2,
    // borderColor: '#c6cbef',
  },
  container: {
    flex: 1,
    paddingBottom: 60,
    paddingStart: 10,
    // paddingEnd: 10,
  },
  neighbour: {
    // flex: 1,
    flexDirection: 'column',
    flexGrow: 0,
  },
  icon: {
    width: 30,
    height: 30,
  },

  box: {
    marginTop: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    height: 'auto',
  },
  info: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataDisplayHeader: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 25,
  },
  name: {
    marginBottom: 20,
    fontSize: 16,
    marginTop: 10,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop: 10,
  },
});

export default LanguageScreen;
