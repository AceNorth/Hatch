import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
// import ReduxThunk from 'redux-thunk';
import store from './'

// import Router from './Router';
// import reducers from './reducers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default class App extends Component {
  componentDidMount() {
    const config = {
      apiKey: 'AIzaSyCafc-bsxSIrF0CT1YiEfseFNMHfg6k1MQ',
      authDomain: 'left-you-somethin.firebaseapp.com',
      databaseURL: 'https://left-you-somethin.firebaseio.com',
      storageBucket: 'left-you-somethin.appspot.com',
      messagingSenderId: '273359995006'
    };
    firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={store}>
          <View style={styles.container}>
             <router />
          </View>
      </Provider>
    );
  }
}
