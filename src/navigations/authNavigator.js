import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/login';
import SignUp from '../screens/signUp';

const AuthNavigator = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};
export default AuthNavigator;
