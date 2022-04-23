import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateLocation } from "../controllers/userApis";
import { setLocation } from "../redux/actions/location-actions";
import { geocodeLoc } from "../utility/LocationUtility";
import * as Location from "expo-location";

const useLocation = () => {
  const dispatch = useDispatch();
  const getlocation = () => {
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      },
      (resLocation) => {
        geocodeLoc(resLocation.coords.latitude, resLocation.coords.longitude)
          .then((resGeocode) => {
            let address = resGeocode.data.address;

            dispatch(
              setLocation({
                latitude: resLocation.coords.latitude,
                longitude: resLocation.coords.longitude,
                region: address.state,
                subregion: address.county,
                street: address.road ? address.road : address.village,
                code_postale: address.postcode,
              })
            );
          })
          .catch((e) => console.log("update location failed with error ", e));
      }
    );
  };

  useEffect(() => {
    getlocation();
  }, []);

  return { success: true };
};

export default useLocation;
