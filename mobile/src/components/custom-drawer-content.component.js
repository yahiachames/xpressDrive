import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { colors, fonts } from '../constants';

const CustomDrawerContentComponent = () => (
    <View style={styles.container}>
        <View style={styles.containerVersion}>
            <Text style={styles.versionText}>{`v${Constants.manifest.version}`}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    flex: 1,
    marginTop: 60,
  },
  containerVersion: {
    bottom: 16,
    paddingHorizontal: 38,
    position: "absolute",
    width: "100%",
  },
  versionText: {
    color: colors.grey,

    fontSize: 20,
    textAlign: "right",
  },
=======
    container: {
        flex: 1,
        marginTop: 60
    },
    containerVersion: {
        bottom: 16,
        paddingHorizontal: 38,
        position: 'absolute',
        width: '100%'
    },
    versionText: {
        color: colors.grey,
        fontFamily: 'latoRegular',
        fontSize: 20,
        textAlign: 'right'
    }
>>>>>>> 47ee741776eec6487e1305f002de0f12f16f6502
});

export default CustomDrawerContentComponent;
