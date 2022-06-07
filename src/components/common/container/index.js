import React from 'react';
import {Text, View, ScrollView} from 'react-native';
import tw from 'twrnc';

const Container = ({children}) => {
  return (
    <ScrollView style={tw`h-full`}>
      <View style={tw`p-5`}>{children}</View>
    </ScrollView>
  );
};
export default Container;
