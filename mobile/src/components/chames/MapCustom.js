import React, { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView from "react-native-maps";
import { adaptToHeight, adaptToWidth } from "../../config/dimensions";

const MapCustom = ({
  mapStyle,
  containerStyle,
  latitude,
  longitude,
  origin = { latitude: 37.78825, longitude: -122.4324 },
}) => {
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const ref = useRef(35);
  const [isReady, setReady] = useState(false);
  const onMapLoaded = () => setReady(true);
  return (
    <View style={[containerStyle]}>
      <MapView
        userInterfaceStyle={"dark"}
        style={[styles.map, mapStyle]}
        region={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onMapReady={onMapLoaded}
        ref={ref}
        loadingIndicatorColor="#e21d1d"
        loadingEnabled={true}
      >
        {isReady && (
          <MapView.Marker
            title="YIKES, Inc."
            description="Web Design and Development"
            coordinate={{
              latitude: origin.latitude,
              longitude: origin.longitude,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

export default MapCustom;

const styles = StyleSheet.create({
  map: {
    width: adaptToWidth(1),
    height: adaptToHeight(1),
    backgroundColor: "#000",
  },
});
