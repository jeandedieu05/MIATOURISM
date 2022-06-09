import { View, Text, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import ileOrleans from '../../assets/images/ile-orleans.png';
const ContentDetails = ({close})=> {
    return(
      <View style={tw`flex-col items-center`}>
         <TouchableOpacity onPress={() => close()} style={tw.style("self-end ml-2 rounded-full w-4 h-4 mt-1 mr-2", {backgroundColor:'#2D5182'})}><Text style={tw`text-white text-center font-bold`}>X</Text></TouchableOpacity>
         <Text style={tw`self-center font-bold text-black`}>Chocolaterie de l'Ile d'olréans</Text>
          <Image
            source={ileOrleans}
            style={{
              width: 200,
              height: 100,
              resizeMode: "cover",
            }}
          />
        <Text style={tw`self-center text-black text-xs mx-3`}>Lorem Ipsum dolor sit amet, consecteteur adipiscing elit, sed do elusmod tempor incididunt
        ut labore et dolore magna aliqua
        </Text>
  
        <TouchableOpacity onPress={() => console.log("yes")} style={tw.style(" ml-2 rounded w-24 h-6", {backgroundColor:'#2D5182'})}><Text style={tw`text-white text-center font-bold`}>Learn more</Text></TouchableOpacity>
      </View>
    )
  
  }
  export default ContentDetails;