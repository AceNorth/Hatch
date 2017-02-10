import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AccessToken } from 'react-native-fbsdk';

import store from './store';
import Router from './components/Router';
import { fetchUserInfo, whoami } from './reducers/auth';

// Disables yellow warnings! Yay!
console.disableYellowBox = true;

export default class App extends Component {
  componentWillMount() {
    // Check if the user is already logged in
    AccessToken.getCurrentAccessToken()
      .then((accessTokenData) => {
        if (accessTokenData) {
          store.dispatch(fetchUserInfo());
        } else {
          store.dispatch(whoami(null));
        }
      });
  }

  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
