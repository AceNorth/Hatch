import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import firebase from 'firebase';

const provider = firebase.auth.FacebookAuthProvider;

const redirectToFacebook = () => {
  LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends'])
    .then((loginResult) => {
      if (loginResult.isCancelled) {
        console.log('user cancelled');
        return;
      }
      AccessToken.getCurrentAccessToken()
      .then((accessTokenData) => {
        const credential = provider.credential(accessTokenData.accessToken);
        return firebase.auth().signInWithCredential(credential);
      })
      .then(credData => {
        console.log('cred data', credData);
      })
      .catch(err => {
        console.log('uh oh err', err);
      });
    });
};

const Login = () => {
  const { container, loginButton, text } = styles;

  return (
    <View style={container}>
      <TouchableHighlight
        style={loginButton}
        onPress={redirectToFacebook}
      >
        <Text style={text}>Log in with Facebook</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f4f281',
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
