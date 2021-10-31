import * as React from 'react';
import {View, Button, Text, Image, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ScrollView} from 'react-native-gesture-handler';
import LoginScreen from './src/components/LoginScreen'
function CustomHeader({title, isHome, navigation}) {
  return (
    <View style={{flexDirection: 'row', height: 50}}>
      {isHome ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={{width: 30, height: 30, marginLeft: 5}}
              source={require('./src/images/menu.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{width: 20, height: 20, marginLeft: 5}}
              source={require('./src/images/back.png')}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      )}

      <View style={{flex: 1.5, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center'}}>{title}</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}></View>
    </View>
  );
}
function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader title="Home" isHome={true} navigation={navigation} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Home!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('HomeDetail')}>
          <Text>Go Home Detail</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
function HomeScreenDetail({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader title="Home Screen Detail" navigation={navigation} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>HomeScreenDetails!</Text>
      </View>
    </SafeAreaView>
  );
}

function SettingsScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader title="Settings" isHome={true} navigation={navigation} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('SettingsDetails')}>
          <Text>Go Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
function SettingsScreenDetail({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader title="Settings Screen Detail" navigation={navigation} />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings Screen Detail!</Text>
      </View>
    </SafeAreaView>
  );
}

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const SettingsStack = createStackNavigator();
const navOptionsHeader = () => ({
  headerShown: false,
  // showIcon: true,
  // showLabel: true
});
function HomeStackFunc() {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={navOptionsHeader}
      />
      <HomeStack.Screen
        name="HomeDetail"
        component={HomeScreenDetail}
        options={navOptionsHeader}
      />
    </HomeStack.Navigator>
  );
}

function SettingsStackNav() {
  return (
    <SettingsStack.Navigator initialRouteName="Settings">
      <SettingsStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={navOptionsHeader}
      />
      <SettingsStack.Screen
        name="SettingsDetails"
        component={SettingsScreenDetail}
        options={navOptionsHeader}
      />
    </SettingsStack.Navigator>
  );
}

function Tabnavigation() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size, tintColor}) => {
          let iconName;

          if (route.name === 'Homes') {
            iconName = focused
              ? require('./src/images/homeBlack.png')
              : require('./src/images/home.png');
          } else if (route.name === 'Setting') {
            iconName = focused
              ? require('./src/images/settingsBlack.png')
              : require('./src/images/settings.png');
          }

          // You can return any component that you like here!
          return (
            <Image
              source={iconName}
              style={{width: 25, height: 25, tintColor: tintColor}}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Homes"
        component={HomeStackFunc}
        options={navOptionsHeader}
      />
      <Tab.Screen
        name="Setting"
        component={SettingsStackNav}
        options={navOptionsHeader}
      />
    </Tab.Navigator>
  );
}
function NotificationsScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <CustomHeader title="Notifications" navigation={navigation} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Notifications Screen Detail!</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
function RegiterScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <CustomHeader title="Regiter" navigation={navigation} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Regiter Screen </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
// function LoginScreen({navigation}) {
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//         <TouchableOpacity
//         style={{marginTop:20}}
//           onPress={() => navigation.navigate('HomeApp')}>
//           <Text>Login</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={{marginTop:20}}
//           onPress={() => navigation.navigate('Register')}>
//           <Text>Register</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// }
function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{height: 180, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={require('./src/images/user.png')}
          style={{height: 120, width: 120, borderRadius: 60}}
        />
      </View>
      <ScrollView style={{marginLeft: 5}}>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => props.navigation.navigate('HomeTab')}>
          <Text>Menu Tab</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => props.navigation.navigate('Notifications')}>
          <Text>Notifications</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
const Drawer = createDrawerNavigator();
function DrawerNavigation(){
return(
  <Drawer.Navigator
  initialRouteName="HomeTab"
  drawerContent={(props) => CustomDrawerContent(props)}>
  <Drawer.Screen name="HomeTab" component={Tabnavigation} />
  <Drawer.Screen name="Notifications" component={NotificationsScreen} />
</Drawer.Navigator>
)
}
const StackApp = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
     <StackApp.Navigator initialRouteName="Login">
      <StackApp.Screen
        name="HomeApp"
        component={DrawerNavigation}
        options={navOptionsHeader}
      />
      <StackApp.Screen
        name="Login"
        component={LoginScreen}
        options={navOptionsHeader}
      />
      <StackApp.Screen
        name="Register"
        component={RegiterScreen}
        options={navOptionsHeader}
      />
    </StackApp.Navigator>
    </NavigationContainer>
  );
}
