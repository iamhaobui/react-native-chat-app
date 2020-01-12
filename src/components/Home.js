import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Home extends Component {
  state = {
    userName: '',
  };

  render() {
    return (
      <View>
        <Text style={styles.title}>Enter your name:</Text>
        <TextInput
          style={styles.nameInput}
          placeholder="Your name"
          onChangeText={text => {
            this.setState({ userName: text });
          }}
        />
        <TouchableOpacity
          onPress={() => {
            Actions.chat({
              userName: this.state.userName,
            });
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,
  },
  nameInput: {
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    margin: 20,
    padding: 10,
  },
  buttonText: {
    marginLeft: 20,
    fontSize: 20,
  },
});
