import React, {useContext} from 'react';
import tw from 'twrnc';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './homeNavigator';
import {createStackNavigator} from '@react-navigation/stack';
// import Container from '../components/common/container';
import {View, SafeAreaView, Text, Image} from 'react-native';
import Logo from '../assets/images/logo-header-white-sm.png';
import SideMenu from './sideMenu';
import {GlobalContext} from '../context/provider';
import Home from '../screens/home';
import Settings from '../screens/settings';
import Explorer from '../screens/chapters/explorer';
const getDrawerContent = (navigation, authDispatch, props) => {
  return (
    <SideMenu navigation={navigation} authDispatch={authDispatch} {...props} />
  );
};

const LogoTitle = () => {
  return (
    <View style={tw`w-full flex-row justify-center items-center `}>
      <Image style={tw`h-8 w-20  mt-2 `} source={Logo} />
    </View>
  );
};

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  const {authDispatch} = useContext(GlobalContext);
  return (
    <Drawer.Navigator
      drawerType="slide"
      drawerContent={({navigation, props}) =>
        getDrawerContent(navigation, authDispatch, props)
      }
      screenOptions={{
        headerTitle: props => <LogoTitle {...props} />,
        headerStyle: {backgroundColor: '#2D5182'},
        headerTintColor: '#fff',
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};


const Final = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Mia-tour" component={DrawerNavigator} />

      <Stack.Screen
        name="Chapter1"
        component={Explorer}
        options={{
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};
export default Final;
