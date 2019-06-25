/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Tree from "./component/index"
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    let list = [
      { "id": 1000, "name": 1000 },
      { "id": 1100, "name": 1100, "parentId": 1000 },
      { "id": 1110, "name": 1110, "parentId": 1100 },
      { "id": 1120, "name": 1120, "parentId": 1100 },
      { "id": 1121, "name": 1121, "parentId": 1120 },
      { "id": 1122, "name": 1122, "parentId": 1120 },
      { "id": 1200, "name": 1200, "parentId": 1000 },
      { "id": 1210, "name": 1210, "parentId": 1200 },
      { "id": 1300, "name": 1300, "parentId": 1000 },
      { "id": 2000, "name": 2000 },
      { "id": 2100, "name": 2100, "parentId": 2000 },
      { "id": 2200, "name": 2200, "parentId": 2000 }
    ]
    return (
      <View style={styles.container}>
        <Tree style={styles.tree} data={list}></Tree>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tree:{
    marginTop:100
  }
});
