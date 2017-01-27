import React from 'react';
import {Scene, Router, Actions } from 'react-native-router-flux';
import LandingPage from './LandingPage';
import ViewPayload from './ViewPayload';

const RouterComponent = () => {
    return(
        <Router>
            <Scene key="landingPage" component={ LandingPage } title="Left You Somethin"/>
            <Scene key="viewPayload" component={ ViewPayload } title="Check this out!"/>
        </Router>
    )
}

export default RouterComponent;