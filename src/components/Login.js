import React, { PropTypes } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { LoginButton } from 'react-native-fbsdk';

import { fetchUserInfo } from '../reducers/auth';

const Login = (props) => {
  const { container, loginButton, text } = styles;
  return (
    <View style={container}>
      <Text style={text} >Ready to find some eggs?</Text>
      {
        props.auth ? Actions.landingPage() :
        <LoginButton
          readPermissions={['email', 'user_friends']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log('Login failed with error: ' + error);
              } else if (result.isCancelled) {
                console.log('Login was cancelled');
              } else {
                props.fetchUserInfo();
                Actions.landingPage();
              }
            }
          }
          onLogoutFinished={() => console.log('User logged out')}
          style={loginButton}
        />
      }
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f4f281',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  loginButton: {
    height: 30,
    width: 200,
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
    color: '#fff',
    fontWeight: '600',
  }
};

Login.propTypes = {
  auth: PropTypes.object,
  fetchUserInfo: PropTypes.func,
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { fetchUserInfo })(Login);
