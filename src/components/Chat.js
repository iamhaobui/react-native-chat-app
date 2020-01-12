import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

import Backend from '../config/Backend';

export default class Chat extends Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    Backend.loadMessages(message => {
      this.setState(prevState => {
        return {
          messages: GiftedChat.append(prevState.messages, message),
        };
      });
    });
  }

  componentWillUnmount() {
    Backend.closeChat();
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={message => {
          Backend.sendMessage(message);
        }}
        user={{
          _id: Backend.getUid(),
          name: this.props.userName,
        }}
      />
    );
  }
}
