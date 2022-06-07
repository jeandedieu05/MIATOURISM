// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   LogBox,
//   SafeAreaView,
//   Image,
// } from 'react-native';

// // import {
// //   Colors,
// //   DebugInstructions,
// //   Header,
// //   LearnMoreLinks,
// //   ReloadInstructions,
// // } from 'react-native/Libraries/NewAppScreen';

// import MapboxGL,{ Logger }  from "@rnmapbox/maps";
// import iconImage from './images/markerIcon-100px.png';
// MapboxGL.setAccessToken('pk.eyJ1Ijoiam9obmNoYWZpIiwiYSI6ImNsM3diN3ZqZTAwbmczamtpdm5pb3EzdmMifQ.QN4wp_RcSviV5SeqtgtnwQ');
// // remove warnings
// Logger.setLogCallback(log => {
//   const { message } = log;

//   // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
//   if (
//     message.match('Request failed due to a permanent error: Canceled') ||
//     message.match('Request failed due to a permanent error: Socket Closed')
 
//   ) {
//     return true;
//   }
//   return false;
// });


// LogBox.ignoreLogs([
//   "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
//   ])

// const App = () => {
//   //const coordinates = [45.4315564, -75.7773873];
//   const coordinates = [-75.7773873, 45.4315564];
//   return (
//     <SafeAreaView style={styles.page}>
//         <View style={styles.container}>
//           <MapboxGL.MapView style={styles.map}>
//             <MapboxGL.Camera
//               zoomLevel={4}
//               animationMode={'flyTo'}
//               animationDuration={1000}
//               followUserLocation={false}
//               followUserMode={'normal'}
//               centerCoordinate={coordinates}
//             />
//             <MapboxGL.MarkerView id={"marker"}  coordinate={coordinates}>
//             <View style={styles.markerContainer}>
//                 <View style={styles.textContainer}>
//                   <Text style={styles.text}>{"Ottawa"}</Text>
//                 </View>
//                 <Image
//                   source={iconImage}
//                   style={{
//                     width: 20,
//                     height: 30,
//                     resizeMode: "cover",
//                   }}
//                 />
//               </View>
//             </MapboxGL.MarkerView>
//           </MapboxGL.MapView>
//         </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//    container: {
//     ...StyleSheet.absoluteFillObject,
//     flex: 1, //the container will fill the whole screen.
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//     overflow: 'hidden',
//     minHeight: Dimensions.get('window').height,
//   },
//   markerContainer: {
//     alignItems: "center",
//     width: 60,
//     backgroundColor: "transparent",
//     height: 70,
//   },
//   textContainer: {
//     backgroundColor: "black",
//     borderRadius: 10,
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   text: {
//     textAlign: "center",
//     flex: 1,
//     color:"white"
//   },
// });

// export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
// return <AppNavContainer />;
import React from 'react';
import AppNavContainer from './src/navigations';
import GlobalProvider from './src/context/provider';
const App = () => {
  return (
    <GlobalProvider>
      <AppNavContainer />
    </GlobalProvider>
  );
};

export default App;