import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import {colors} from "../../constants";
import {adaptToHeight, adaptToWidth} from "../../config/dimensions";

const data = [
    {
        id: "123",
        title: "Get a ride",
        image: "http://links.papareact.com/3pn",
        screen: "MapScreen",
    },
    {
        id: "456",
        title: "Order food",
        image: "http://links.papareact.com/28w",
        screen: "EatsScreen",
    },
];

const NavOptions = () => {
    const navigation = useNavigation();
    //const origin = useSelector(selectOrigin);

    return (
      <FlatList
        data={data}
        keyExtractor={({ item, index }) => index}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screen)}
            style={{
              padding: adaptToWidth(0.01),
              margin: adaptToWidth(0.01),
              width: "auto",
              backgroundColor: colors.greyMedium,
            }}
            /*disabled={!origin}*/
          >
            <View>
              {/*style={!origin ? {opacity: 0.2} : null}*/}
              <Image
                style={{ width: 120, height: 120, resizeMode: "contain" }}
                source={{ uri: item.image }}
              />
              <Text style={{ marginTop: adaptToHeight(0.01) }}>
                {item.title}
              </Text>
              <Icon
                style={{ marginTop: adaptToHeight(0.01) }}
                name="arrow-forward"
                color="white"
                type="ion-icon"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    );
};

export default NavOptions;
