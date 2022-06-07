/* eslint-disable react-native/no-inline-styles */
import {
    SafeAreaView,
    Text,
    Image,
    View,
    TouchableOpacity,
    Alert,
  } from 'react-native';
  import tw from 'twrnc';
  import React from 'react';
  import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
  import {Avatar, Title} from 'react-native-paper';
  import profileImage from '../../assets/images/blank-profile-picture.png';
  import Container from '../../components/common/container';
  import logoutUser from '../../context/actions/auth/logoutUser';
  import Icon from 'react-native-vector-icons/dist/MaterialIcons';
  // import FontAwesomeIcon from 'react-native-vector-icons/dist/FontAwesomeIcon5';
  export default function SideMenu({navigation, authDispatch}) {
    const handleLogout = () => {
      navigation.toggleDrawer();
      Alert.alert('Logout', 'Are you sure you want to logout', [
        {
          text: 'Cancel',
          onPress: () => {},
        },
        {
          text: 'Ok',
          onPress: () => {
            logoutUser()(authDispatch);
          },
        },
      ]);
    };
    const menuItems = [
      {
        icon: <Icon size={17} name="language" color="black" />,
        name: 'Language and Region',
        onPress: () => {
          navigation.navigate('Settings');
        },
        nextIcon: <Icon size={30} name="navigate-next" color="white" />,
      },
      {
        icon: <Icon size={17} name="account-circle" color="black" />,
        name: 'Account status',
        onPress: () => {
          navigation.navigate('Settings');
        },
        nextIcon: <Icon size={30} name="navigate-next" color="white" />,
      },
      {
        icon: <Icon size={17} name="payment" color="black" />,
        name: 'Billing',
        onPress: () => {
          navigation.navigate('Settings');
        },
        nextIcon: <Icon size={30} name="navigate-next" color="white" />,
      },
      {
        icon: <Icon size={17} name="image" color="black" />,
        name: 'Dark mode',
        onPress: () => {
          navigation.navigate('Settings');
        },
        nextIcon: <Icon size={30} name="toggle-off" color="white" />,
      },
      {
        icon: <Icon size={17} name="verified-user" color="black" />,
        name: 'Security',
        onPress: () => {
          navigation.navigate('Settings');
        },
        nextIcon: <Icon size={30} name="navigate-next" color="white" />,
      },
      {
        icon: <Icon size={17} name="help-outline" color="black" />,
        name: 'Help',
        onPress: () => {
          navigation.navigate('Settings');
        },
        nextIcon: <Icon size={30} name="navigate-next" color="white" />,
      },
    ];
  
    return (
      <SafeAreaView style={tw`h-full`}>
        <Container>
          <View style={tw`mt-8`}>
            <View style={tw`flex-row  mb-4 justify-between`}>
              <View style={tw`flex-row ml-2`}>
                <Avatar.Image size={42} source={profileImage} />
                <Text style={tw`pl-2 mt-3 text-black`}>John Chafi</Text>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: '#2D5182',
                  marginLeft: 80,
                  height: 32,
                  borderRadius: 4,
                  marginTop: 8,
                }}>
                <Icon size={30} name="navigate-next" color="white" />
              </TouchableOpacity>
            </View>
            <View style={tw`flex-row pt-6 pl-2 justify-between mb-2`}>
              <View style={tw`flex-row mt-1`}>
                <Icon size={17} name="home" />
                <Text style={tw`pl-2 text-black font-sans`}>Home</Text>
              </View>
              <TouchableOpacity
                // style={tw`bg-sky-800 self-end h-8 w-8 border rounded`}
                style={tw.style('self-end h-8 w-8 border rounded', {
                  backgroundColor: '#2D5182',
                })}
                onPress={() => navigation.navigate('Home')}>
                <Icon size={30} name="navigate-next" color="white" />
              </TouchableOpacity>
            </View>
            <View style={tw`ml-2 mb-2`}>
              <Text style={tw`font-bold text-black text-xl`}>Settings</Text>
            </View>
            <View style={tw`pl-2 text-black`}>
              {menuItems.map(({name, icon, onPress, nextIcon}) => (
                <View key={name} style={tw`flex-row justify-between mb-2`}>
                  <View style={tw`flex-row mt-1`}>
                  {icon}
                    <Text style={tw`pl-2 text-black font-sans`}>{name}</Text>
                  </View>
                  <TouchableOpacity
                    style={tw.style('self-end h-8 w-8 border rounded', {
                      backgroundColor: '#2D5182',
                    })}
                    onPress={onPress}>
                    {nextIcon}
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        </Container>
        <TouchableOpacity style={tw`ml-8 mb-8`} onPress={() => handleLogout()}>
          <View style={tw`flex-row`}>
            <Icon size={17} name="logout" />
            <Text style={tw`pl-2 text-black font-sans`}>Logout</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
  