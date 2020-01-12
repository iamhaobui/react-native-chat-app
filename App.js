import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';

import { Chat, Home } from './src/components';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" style={styles.screen}>
          <Scene key="home" component={Home} title="Home" />
          <Scene key="chat" component={Chat} title="Chat" />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: 64,
  },
});
