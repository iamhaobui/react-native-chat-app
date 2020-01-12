import firebase from 'firebase';

class Backend {
  uid = '';
  messagesRef = null;
  // initialize Firebase Backend
  constructor() {
    firebase.initializeApp({
      apiKey: 'AIzaSyC1SBxfHDMX2HN57vWpKXR0rGDFVhleXOU',
      authDomain: 'react-native-chat-app-132a5.firebaseapp.com',
      databaseURL: 'https://react-native-chat-app-132a5.firebaseio.com',
      projectId: 'react-native-chat-app-132a5',
      storageBucket: 'react-native-chat-app-132a5.appspot.com',
      messagingSenderId: '458572224390',
      appId: '1:458572224390:web:24b5dd16f63e4b2b527e07',
      measurementId: 'G-3K033WLLTV',
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setUid(user.uid);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch(error => {
            alert(error.message);
          });
      }
    });
  }
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }

  loadMessages(callback) {
    this.messagesRef = firebase.database().ref('messages');
    this.messagesRef.off();
    const onReceive = data => {
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    };
    this.messagesRef.limitToLast(20).on('child_added', onReceive);
  }

  sendMessage(message) {
    for (let i = 0; i < message.length; i++) {
      this.messagesRef.push({
        text: message[i].text,
        user: message[i].user,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  }

  closeChat() {
    if (this.messagesRef) {
      this.messagesRef.off();
    }
  }
}

export default new Backend();
