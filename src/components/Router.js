import React, { Component, PropTypes } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LandingPage from './LandingPage';
import WelcomePage from './WelcomePage';
import ViewPayload from './ViewPayload';
import Login from './Login';


const RouterComponent = () => (
  <Router>
  	<Scene key="welcomePage" component={WelcomePage} hideNavBar />
    <Scene key="login" component={Login} hideNavBar />
    <Scene key="landingPage" component={LandingPage} title="Left You Somethin" initial/>
    <Scene key="viewPayload" component={ViewPayload} title="Check this out!" />
  </Router>
);

export default RouterComponent;