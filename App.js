/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  BackHandler,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import HomePage from './src/components/HomePage';
import CountryScreen from './src/components/CountryPage';
import LanguageScreen from './src/components/CountryLanguagePage';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="HomePage">
      <Stack.Screen name="HomePage" component={LanguageScreen} />
      <Stack.Screen name="Country" component={CountryScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
    </Stack.Navigator>
  );
};
function CustomDrawerContent(props) {
  const handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true;
  };
  return (
    <DrawerContentScrollView {...props}>
      {/* DrawerItemList will show all the screens from the navigator */}

      <DrawerItem label="Exit" onPress={() => handleBackPress()} />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomePage"
      drawerStyle={{
        backgroundColor: '#c6cbef',
        width: 240,
        fontSize: 20,
      }}
      drawerContent={(props) => {
        const filteredProps = {
          ...props,
          state: {
            ...props.state,
            routeNames: props.state.routeNames.filter(
              // To hide single option
              // (routeName) => routeName !== 'HiddenPage1',
              // To hide multiple options you can add & condition
              (routeName) => {
                routeName !== 'SplashScreen' &&
                  routeName !== 'Country' &&
                  routeName !== 'Language' &&
                  routeName !== 'Root';
              },
            ),
            routes: props.state.routes.filter(
              (route) =>
                route.name !== 'SplashScreen' &&
                route.name !== 'Country' &&
                route.name !== 'Language' &&
                route.name !== 'Root',
            ),
          },
        };
        return (
          <DrawerContentScrollView {...filteredProps}>
            <DrawerItemList {...filteredProps} />
            <CustomDrawerContent {...props} style={{fontSize: 20}} />
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen
        name="HomePage"
        component={HomePage}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Country"
        component={CountryScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Language"
        component={LanguageScreen}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Root"
        component={StackNavigator}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
