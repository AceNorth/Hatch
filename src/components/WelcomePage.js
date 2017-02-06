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
    console.log("TUNNEL BOY: ", tunnelIP)
    const { container, text, half, image } = styles;
    return (
      <View style={container}>
        <View style={half}>
          <Text style={text}> Left You Somethin' </Text>
          <Image style={image} source={{uri: `${tunnelIP}/eggboy.png`}} />
        </View>
        <View style={half} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f4f281',
    justifyContent: 'center',
  },
  half: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
    color: '#fff',
    fontWeight: '600',
  },
  image: {
    width: 105,
    height: 135,
    alignSelf: 'center'
  }
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(WelcomePage);
