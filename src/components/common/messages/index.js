import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

const Messages = ({message, disabled, success, ...props}) => {
  // const [text, onChangeText] = React.useState("Useless Text");
  // console.log(icon);
  const [removed, setRemoved] = useState(false);
  const bgColor = disabled ? 'bg-neutral-500' : 'bg-green-400';
  return (
    <>
      {removed ? null : (
        <TouchableOpacity
          style={tw`py-2 ${bgColor} hover:bg-cyan-600`}
          disabled={disabled}
          {...props}>
          <View style={tw`flex-row justify-between`}>
            <Text style={tw`text-white text-center`}>{message}</Text>
            <TouchableOpacity
              onPress={() => {
                setRemoved(true);
              }}>
              <Text style={tw`text-white text-center`}>X</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};
export default Messages;
