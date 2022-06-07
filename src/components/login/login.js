import React, {useState} from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import Container from '../../components/common/container/index';
import Input from '../../components/common/inputs/index';
import Button from '../../components/common/button/button';
import Logo from '../../assets/images/logo-header-blue.png';
import {useNavigation} from '@react-navigation/native';
import Messages from '../common/messages';

const LoginComponent = ({error, form, justSignedUp, onChange, onSubmit}) => {
  const {navigate} = useNavigation();
  return (
    <Container>
      <Image
        height={70}
        width={70}
        source={Logo}
        style={tw`self-center mt-12 mb-4`}
      />
      <View>
        <Text style={tw`text-center text-lg font-sans font-bold text-black`}>
          WELCOME TO MIA
        </Text>
        <Text style={tw`text-center font-sans font-bold text-black my-1`}>
          Please login here
        </Text>
        {/* <Messages message="Invalid credential" /> */}
        {justSignedUp && (
          <Messages success={true} message="Account created successfully" />
        )}
        <Input
          label="Username"
          value={form.userName}
          onChangeText={value => onChange({name: 'userName', value})}
          placeholder="Enter Username"
          // error="This field is required"
        />
        <Input
          label="Password"
          onChangeText={value => onChange({name: 'password', value})}
          secureTextEntry={true}
          placeholder="Enter Password"
          // error="This field is required"
        />
        <Button
          onPress={onSubmit}
          title="Submit"
          loading={true}
          disabled={false}
        />

        <View style={tw`flex flex-row mt-4`}>
          <Text style={tw``}>Need a new account ? </Text>
          <TouchableOpacity onPress={() => navigate('SignUp')}>
            <Text style={tw`text-blue-500 pl-2`}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};
export default LoginComponent;
