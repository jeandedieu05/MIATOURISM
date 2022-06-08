import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  LogBox,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import tw from 'twrnc';
import CheckBox from '@react-native-community/checkbox';
import MapboxGL,{ Logger }  from "@rnmapbox/maps";
import iconImage from '../../assets/images/markerIcon-100px.png';
import ileOrleans from '../../assets/images/ile-orleans.png';
MapboxGL.setAccessToken('pk.eyJ1Ijoiam9obmNoYWZpIiwiYSI6ImNsM3diN3ZqZTAwbmczamtpdm5pb3EzdmMifQ.QN4wp_RcSviV5SeqtgtnwQ');
// remove warnings
Logger.setLogCallback(log => {
  const { message } = log;

  // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
 
  ) {
    return true;
  }
  return false;
});


LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  ])



const CheckBoxContainer = ({closeModal, expandPlaces}) =>{
  const [isSelected, setSelection] = useState(false);

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
    <View style={tw`flex-1 m-4`}>
       <Text style={tw`self-center font-bold text-black`}>Choose Your Exploration</Text>
       {
         places.map((place, index) =>
         <View style={tw`flex-row content-between`} key={`index-${index}`}>
          <CheckBox
            value={selectedPlaces.includes(place)}
            onValueChange={() => addSelected(place)}
            style={styles.checkbox}
          />
            <Text style={tw`mt-1`}>{place}</Text>
        </View>
         )
       }
       <View style={tw`flex-row mt-2`}>
        <TouchableOpacity onPress={() => save()} style={tw.style(" ml-2 self-start rounded w-12 h-6", {backgroundColor:'#2D5182'})}><Text style={tw`text-white text-center`}>Save</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => closeModal()} style={tw.style("ml-24 rounded w-12 h-6 bg-red-500")}><Text style={tw`text-white text-center`}>Close</Text></TouchableOpacity>
      </View>

    </View>
     
  );
} ;


const ContentContainer = ({close})=> {
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






const Home = () => {
  let thisCamera = useRef();
  let thisMap = useRef();
  //const coordinates = [-75.7773873, 45.4315564];
  const [coordinates, setCoordinates] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isContentOpened, setIsContentOpened] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(4);
  const [placesToExplor, setPlacesToExplor] = useState([]);
  // const museumCoordinates = [[-77.7773873, 45.4315564], [-75.7773873, 44.4315564], [-78.7773873, 45.4315564], [-75.7773873, 42.4315564], [-75.7773873, 48.4315564]]
  const museumCoordinates = [[-75.7773873, 44.4315564]];

  const expandPlaces = (plcs) =>{
    console.log(thisCamera);
    setPlacesToExplor(plcs);
    setZoomLevel(6);
    thisCamera.fitBounds(museumCoordinates);
  }

  useEffect(()=>{
    MapboxGL.locationManager.start();
  }, [])

  const onRegionDidChange = async () => {
    const center = await thisMap.getCenter();
    setCoordinates({ center });
  }

  const bounds = {
    ne: [-70.7773873-2, 30.054738],
    sw: [-70.760365, 40.947256],
  };
  
  return (
    <SafeAreaView style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map} ref={(c) => (thisMap = c)} onRegionDidChange={onRegionDidChange}>
            <MapboxGL.Camera
              zoomLevel={zoomLevel}
              animationMode={'flyTo'}
              animationDuration={500}
              followUserLocation={false}
              followUserMode={'normal'}
              centerCoordinate={[-77.7773873, 45.4315564]}
              ref={(ref) => (thisCamera = ref)}
            />
            <MapboxGL.MarkerView id={"marker"}  coordinate={[-77.7773873, 45.4315564]} >
              <View style={styles.markerContainer}>
                  <TouchableOpacity onPress={()=>setIsExpanded(true)}>
                    <Image
                      source={iconImage}
                      style={{
                        width: 20,
                        height: 30,
                        resizeMode: "cover",
                      }}
                    />
                  </TouchableOpacity>
                  {isExpanded ?
                  <View style={styles.textContainer}>
                  <CheckBoxContainer closeModal={() => setIsExpanded(false)} expandPlaces={expandPlaces} /> 
                  </View>
                  : null}  
              </View>
            </MapboxGL.MarkerView>
            {
             placesToExplor.includes('Museum')&&(
              museumCoordinates.map((coord, index) =>
              <MapboxGL.MarkerView key={`indexmarker-${index}`} id={`indexmarker-${index}`}  coordinate={coord} >
              <View style={styles.markerContainer}>
                  <TouchableOpacity onPress={()=> setIsContentOpened(true)}>
                    <Image
                      source={iconImage}
                      style={{
                        width: 20,
                        height: 30,
                        resizeMode: "cover",
                      }}
                    />
                  </TouchableOpacity>
                  {isContentOpened ?
                  <View style={styles.textContainer}>
                    <ContentContainer close={() => setIsContentOpened(false)} /> 
                  </View>
                  : null}  
              </View>
              </MapboxGL.MarkerView> )
              )
            }
          </MapboxGL.MapView>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
   container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    minHeight: Dimensions.get('window').height,
  },
  markerContainer: {
    alignItems: "center",
    width: 250,
    backgroundColor: "transparent",
    height: 250,
  },
  textContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    color:"white",
  },
  text: {
    textAlign: "center",
    flex: 1,
    color:"white"
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    color:"white",
  },
});

export default Home;