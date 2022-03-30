import { Image, StyleSheet, Text, View } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import MapView from "react-native-maps";
import { getDrivers } from "../../controllers/userApis";
import { checkKeyInObject } from "../../utility/checkKeyinObject";
import { adaptToHeight, adaptToWidth } from "../../config/dimensions";

const MapComponent = ({
  mapStyle,
  containerStyle,
  latitude,
  longitude,
  drivers,
  origin = { latitude: 37.78825, longitude: -122.4324 },
}) => {
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const Mapref = React.createRef(35);
  const [isReady, setReady] = useState(false);
  const onMapLoaded = () => setReady(true);
  console.log(drivers, "driverssss");

  return (
    <View style={[containerStyle]}>
      <MapView
        showsUserLocation
        userInterfaceStyle={"dark"}
        style={[styles.map, mapStyle]}
        region={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onMapReady={onMapLoaded}
        ref={Mapref}
        loadingIndicatorColor="#e21d1d"
        loadingEnabled={true}
      >
        {/* {isReady && (
          <MapView.Marker
            title="YIKES, Inc."
            description="Web Design and Development"
            coordinate={{
              latitude: origin.latitude,
              longitude: origin.longitude,
            }}
          />
        )} */}

        {isReady &&
          drivers !== null &&
          drivers.length >= 1 &&
          drivers.map((el, index) => (
            <MapView.Marker
              title={el.username}
              description={el.phone}
              coordinate={{
                latitude: checkKeyInObject(el, "currentPosition")
                  ? el.currentPosition.latitude
                  : 0,
                longitude: checkKeyInObject(
                  checkKeyInObject(el, "currentPosition")
                )
                  ? el.currentPosition.longitude
                  : 0,
              }}
              key={index}
            >
              <Image
                source={require("../../../assets/taxi_PNG61.png")}
                style={styles.markerDestination}
                resizeMode="contain"
              />
            </MapView.Marker>
          ))}
      </MapView>
    </View>
  );
};

export default MapComponent;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  markerDestination: {
    height: 18,
    width: 18,
  },
});
