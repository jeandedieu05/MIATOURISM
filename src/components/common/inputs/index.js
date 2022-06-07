import React from 'react';
import {View, TextInput, Text} from 'react-native';
import tw from 'twrnc';

const Input = ({
  onChangeText,
  style,
  value,
  label,
  icon,
  iconPosition,
  error,
  ...props
}) => {
  // const [text, onChangeText] = React.useState("Useless Text");
  return (
    <View style={tw`py-2`}>
      {label && <Text>{label}</Text>}
      <View>
        {/* {icon && icon} */}
        <TextInput
          style={tw`h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 ${style}`}
          onChangeText={onChangeText}
          value={value}
          {...props}
        />
      </View>
      {error && <Text style={tw`text-red-500 italic`}>{error}</Text>}
    </View>
  );
};
export default Input;
