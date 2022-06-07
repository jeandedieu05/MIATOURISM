import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
import AuthNavigator from './authNavigator';
import DrawerNavigator from './drawerNavigator';
import {GlobalContext} from '../context/provider';
import AsyncStorage from '@react-native-async-storage/async-storage';

// {useContext}
const AppNavContainer = () => {
  const {
    authState: {isLoggedIn},
  } = useContext(GlobalContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);
  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("token =>", token)
      if (token) {
        setAuthLoaded(true);
        setIsAuthenticated(true);
      } else {
        setAuthLoaded(true);
        setIsAuthenticated(false);
      }
    } catch (error) {
      setAuthLoaded(true);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [isLoggedIn]);

  return (
    <>
      {authLoaded ? (
        <NavigationContainer>
          {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      ) : (
        <ActivityIndicator />
      )}
    </>
  );
};
export default AppNavContainer;