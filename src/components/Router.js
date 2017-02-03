import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LandingPage from './LandingPage';
import WelcomePage from './WelcomePage';
import ViewPayload from './ViewPayload';
import EggManager from './EggManager';
import Friends from './Friends';
import Login from './Login';

const RouterComponent = () => (
  <Router>
    <Scene key="welcomePage" component={WelcomePage} hideNavBar initial />
    <Scene key="login" component={Login} type="replace" hideNavBar />
    <Scene key="landingPage" component={LandingPage} title="Left You Somethin" onRight={Actions.eggManager} rightTitle="Your eggs" />
    <Scene key="eggManager" component={EggManager} title="Manage Eggs" hideNavBar={false} />
    <Scene key="friends" component={Friends} title="My Friends" hideNavBar={false} />
    <Scene key="viewPayload" component={ViewPayload} />
  </Router>
);

export default RouterComponent;
