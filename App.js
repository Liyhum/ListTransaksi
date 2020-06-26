import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React,{Component} from 'react';
import { Platform, StatusBar, StyleSheet, View ,AppRegistry} from 'react-native';
import Route from './Route/Route'
AppRegistry.registerComponent('Point', () => Point)

class App extends Component {
  state = {  }
  render() {
    return (
      <Route/>
    );
  }
}

export default App;