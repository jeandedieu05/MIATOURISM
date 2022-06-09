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
import MapLibreGL,{ Logger }  from "@rnmapbox/maps";
import iconImage from '../../assets/images/markerIcon-100px.png';
import CheckBoxContainer from './checkBox';
import ContentDetails from './contentDetails';
MapLibreGL.setAccessToken('pk.eyJ1Ijoiam9obmNoYWZpIiwiYSI6ImNsM3diN3ZqZTAwbmczamtpdm5pb3EzdmMifQ.QN4wp_RcSviV5SeqtgtnwQ');
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

// remove this log
LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  ])

const styles = StyleSheet.create({
  page: {
     ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
     container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    minHeight: Dimensions.get('window').height-100,
  },
});

const Home = () => {

  const [isExpanded, setIsExpanded] = useState(false);
  const places= ['Museum', 'Restaurant', 'Cabanne a sucre', 'Hotels'];
  const [placesToExplor, setPlacesToExplor] = useState([]);
  const [zoomLevel, setZoomLevel] = useState(5);
  const [placeTOview, setPlaceToView] = useState(null);
  let thisCamera = useRef();

  const expandPlaces = (plc) =>{
  if(plc == 'Museum') {
    const Museums = [{Museum:"Gatineau", value: [-76.7773873, 45.4315564]}, {Museum:"Oshawa", value:[-76.7773873, 46.4315564]}, {Museum:"Fenton", value:[-78.7773873, 45.4315564]}]
    setPlacesToExplor(Museums);
  }
  const bounds = {
    ne: [-60.7773873-2, 40.054738],
    sw: [-80.760365, 40.947256],
  };
  thisCamera.fitBounds(bounds);
   setZoomLevel(5);
  }

 
  const onPinPress = (place) =>{
    setPlaceToView(place);

  }
 
 
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapLibreGL.MapView
          style={styles.map}
          logoEnabled={false}
          attributionEnabled={true}
          attributionPosition={{bottom: 8, left: 8}}>
          <MapLibreGL.Camera
            centerCoordinate= {[-75.7773873, 45.4315564]}
            animationMode= {'flyTo'}
            animationDuration={1000}
            followUserLocation={false}
            followUserMode={'normal'}
            zoomLevel= {zoomLevel}
            ref={(ref) => (thisCamera = ref)}
          />
          <MapLibreGL.ShapeSource
            id="marker-source"
            shape={{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [-75.7773873, 45.4315564],
              },
            }} onPress={() => setIsExpanded(true)}>
            <MapLibreGL.SymbolLayer
              id="marker-layer"
              style={{
                iconImage:iconImage,
                iconSize: 0.5,
              }}
            />
          </MapLibreGL.ShapeSource>
            {
              placesToExplor.map((place, index) =>
              <MapLibreGL.ShapeSource
              key={place.Museum}
              id={place.Museum}
              shape={{
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: place.value,
                },
              }} onPress={() => onPinPress(place)}>
              <MapLibreGL.SymbolLayer
                id={`marker-${place.Museum}`}
                style={{
                  iconImage:iconImage,
                  iconSize: 0.3,
                }}
              />
            </MapLibreGL.ShapeSource>
             )
            }
            {
              placeTOview != null ? (
                <MapLibreGL.MarkerView id={`markerview-${placeTOview.Museum}`} coordinate={placeTOview.value}
                children={
                  <View style={{width: 220, height: 200, backgroundColor:'white'}}>
                  < ContentDetails close={() => setPlaceToView(null)}/>
                  </View>
                }
                anchor={{x: 0.5, y: 0.001}} />
              ) : null
            }

            {
              isExpanded ? <MapLibreGL.MarkerView
              coordinate={[-75.7773873, 45.4315564]}
              children={
                <View style={{width: 220, height: 200, backgroundColor:'white'}}>
                  <CheckBoxContainer closeModal={() => setIsExpanded(false)} expandPlaces={expandPlaces} />       
                </View>
              }
              anchor={{x: 0.5, y: 0.001}}
            /> : null
            }
        </MapLibreGL.MapView>
      </View>
    </View>
  );
};

export default Home;