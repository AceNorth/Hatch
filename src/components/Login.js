import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableHighlight } from 'react-native';
import { redirectToFacebook } from '../reducers/auth';

const Login = (props) => {
  const { container, loginButton, text } = styles;

  return (
    <View style={container}>
      <TouchableHighlight
        style={loginButton}
        onPress={() => props.redirectToFacebook()}
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

Login.propTypes = {
  redirectToFacebook: PropTypes.func,
};

export default connect(() => ({}), { redirectToFacebook })(Login);
