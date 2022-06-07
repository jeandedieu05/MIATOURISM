import React from 'react';
import {View, TextInput, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

const Button = ({onChangeText, title, disabled, loading, ...props}) => {
  // const [text, onChangeText] = React.useState("Useless Text");
  // console.log(icon);
  const bgColor = disabled ? 'bg-neutral-500' : 'bg-cyan-500';
  return (
    <TouchableOpacity
      style={tw`py-2 ${bgColor} hover:bg-cyan-600`}
      disabled={disabled}
      {...props}>
      {title && <Text style={tw`text-white text-center`}>{title}</Text>}
    </TouchableOpacity>
  );
};
export default Button;
