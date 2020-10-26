/**
 * Sample React Native App for react-native-circle-floatmenu
 * https://github.com/deadkuriel/react-native-circle-floatmenu
 */

import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import CircleButton from "react-native-circle-floatmenu";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const App = () => {
  return (
    <View style={styles.btn_container}>
          <CircleButton buttonColor="rgba(0,0,0,1)" position="topleft">
            <CircleButton.Item
              position="absolute"
              buttonColor="#000"
              title="Perfil"
              onPress={() => console.log("BtnPress")}
            >
              <Icon
                name="card-account-details"
                style={styles.circleButtonIcon}
              />
            </CircleButton.Item>
            <CircleButton.Item
              position="absolute"
              buttonColor="#000"
              title="Perfil"
              onPress={() => console.log("BtnPress")}
            >
              <Icon name="bookmark-outline" style={styles.circleButtonIcon} />
            </CircleButton.Item>
            <CircleButton.Item
              position="absolute"
              buttonColor="#000"
              title="Perfil"
              onPress={() => console.log("BtnPress")}
            >
              <Icon
                name="briefcase-outline"
                style={styles.circleButtonIcon}
              />
            </CircleButton.Item>
            <CircleButton.Item
              position="absolute"
              buttonColor="#000"
              title="Perfil"
              onPress={() => console.log("BtnPress")}
            >
              <Icon
                name="reply"
                style={styles.circleButtonIcon}
              />
            </CircleButton.Item>
            <CircleButton.Item
              position="absolute"
              buttonColor="#000"
              title="Perfil"
              onPress={() => console.log("BtnPress")}
            >
              <Icon
                name="power-standby"
                style={styles.circleButtonIcon}
              />
            </CircleButton.Item>
          </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  btn_container: {
    flex: 1,
    backgroundColor: "#59a6eb",
    justifyContent: "center",
    width: "100%",
    elevation: 8,
    borderRadius: 5,
    margin: 1,
  },
  circleButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});

export default App;
