import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { redirectToFacebook } from '../reducers/auth';

import firebase from 'firebase';

const provider = new firebase.auth.FacebookAuthProvider();
// Scopes: things we want permissions to access
provider.addScope('user_friends');
provider.addScope('email');

const facebookLogin = () => {
  console.log('i hit');
  firebase.auth().signInWithRedirect(provider)
    .then(() => console.log('yay we did it'))
    .catch(err => console.error('uh oh couldnt log in', err));
};

const Login = () => {
  const { container, loginButton, text } = styles;

  return (
    <View style={container}>
      <TouchableHighlight
        style={loginButton}
        onPress={facebookLogin}
      >
        <Text style={text}>Log in with Facebook</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#4bbaea',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#1b55d3',
    height: 70,
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    color: '#fff',
    fontWeight: '600',
  }
};

export default Login;
