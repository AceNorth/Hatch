import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Text, Image } from 'react-native';
import { tunnelIP } from '../TUNNELIP';

class WelcomePage extends Component {

  componentWillReceiveProps(nextProps) {
    nextProps.auth ? Actions.landingPage() : Actions.login();
  }

  render() {
    const { container, image } = styles;
    return (
      <View style={container}>
        <Image style={image} source={{uri: `${tunnelIP}/eggboyHUGE.png`}} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#3a3c82',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 189,
    height: 243,
    alignSelf: 'center'
  }
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(WelcomePage);
