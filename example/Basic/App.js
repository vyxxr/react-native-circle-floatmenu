/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import CircleButton from "react-native-circle-floatmenu";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const App: () => React$Node = () => {
  return (
    <View style={styles.btn_container}>
      <CircleButton buttonColor="rgba(0,0,0,1)" position="topleft">
            <CircleButton.Item
              position="absolute"
              buttonColor="#000"
              title="Perfil"
              onPress={console.log("BtnPress")}
            >
              <Icon
                name="card-account-details"
                style={styles.actionButtonIcon}
              />
            </CircleButton.Item>
            <CircleButton.Item
              position="absolute"
              buttonColor="#000"
              title="Perfil"
              onPress={console.log("BtnPress")}
            >
              <Icon name="bookmark-outline" style={styles.actionButtonIcon} />
            </CircleButton.Item>
            <CircleButton.Item
              position="absolute"
              buttonColor="#000"
              title="Perfil"
              onPress={console.log("BtnPress")}
            >
              <Icon name="briefcase-outline" style={styles.actionButtonIcon} />
            </CircleButton.Item>
            <CircleButton.Item
              position="absolute"
              buttonColor="#000"
              title="Perfil"
              onPress={console.log("BtnPress")}
            >
              <Icon name="reply" style={styles.actionButtonIcon} />
            </CircleButton.Item>
            <CircleButton.Item
              buttonColor="#000"
              title="Salir"
              onPress={console.log("BtnPress")}
            >
              <Icon name="power-standby" style={styles.actionButtonIcon} />
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },



  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
