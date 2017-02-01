import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import LandingPage from './LandingPage';
import ViewPayload from './ViewPayload';
import Login from './Login';
import store from '../store';

const RouterComponent = () => (
	<Provider store={store}>
	  <Router>
	    <Scene key="landingPage" component={LandingPage} title="Left You Somethin" />
	    <Scene key="viewPayload" component={ViewPayload} title="Check this out!" />
	    <Scene key="login" component={Login} hideNavBar />
	  </Router>
  </Provider>
);

export default RouterComponent;
