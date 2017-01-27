import React from 'react';
import {Scene, Router, Actions } from 'react-native-router-flux'
import LandingPage from './LandingPage';

const RouterComponent = () => {
    return(
        <Router>
            <Scene key="landingPage" component={LandingPage} title="Left You Somethin"/>
        </Router>
    )
}

export default RouterComponent;