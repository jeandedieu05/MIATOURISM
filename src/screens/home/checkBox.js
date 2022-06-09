import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import tw from 'twrnc';
import CheckBox from '@react-native-community/checkbox';
const CheckBoxContainer = ({closeModal, expandPlaces}) =>{
    const places= ['Museum', 'Restaurant', 'Cabanne a sucre', 'Hotels'];
    const [selectedPlaces, setSelectedPlaces] = useState([]);
  
    const addSelected = (place) => {
      var temp = [...selectedPlaces];
      if(temp.includes(place)){
        temp = temp.filter(el => el != place)
      }
      else{
        temp.push(place);
      }
      setSelectedPlaces(temp);
  
    }
    const save = () => {
      expandPlaces(selectedPlaces);
      closeModal();
  
    }
    return (
      <View style={tw`flex-1`}>
         <TouchableOpacity onPress={() => closeModal()} style={tw.style("ml-24 self-end rounded w-6 h-6 bg-red-500")}><Text style={tw`text-white text-center`}>X</Text></TouchableOpacity>
         <Text style={tw`self-center font-bold text-black`}>Choose Your Exploration</Text>
         {
           places.map((place, index) =>
           <View style={tw`flex-row content-between ml-2`} key={`index-${index}`}>
            <CheckBox
              value={selectedPlaces.includes(place)}
              onValueChange={() => addSelected(place)}
            />
              <Text style={tw`mt-1`}>{place}</Text>
          </View>
           )
         }
         <View style={tw`flex-row mt-2 self-center`}>
          <TouchableOpacity onPress={() => save()} style={tw.style(" ml-2 rounded w-12 h-6", {backgroundColor:'#2D5182'})}><Text style={tw`text-white text-center`}>Save</Text></TouchableOpacity>
        </View>
  
      </View>
       
    );
  } ;

  export default CheckBoxContainer;