import React, { PropTypes } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { LoginButton } from 'react-native-fbsdk';

import { fetchUserInfo } from '../reducers/auth';

const Login = (props) => {
  const { container, loginButton } = styles;
  return (
    <View style={container}>
      <LoginButton
        readPermissions={['email', 'user_friends']}
        onLoginFinished={
          (error, result) => {
            if (error) {
              console.log('Login failed with error: ' + result.error);
            } else if (result.isCancelled) {
              console.log('Login was cancelled');
            } else {
              props.fetchUserInfo();
            }
          }
        }
        onLogoutFinished={() => console.log('User logged out')}
        style={loginButton}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f4f281',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButton: {
    height: 30,
    width: 200,
  }
};

Login.propTypes = {
  auth: PropTypes.object,
  fetchUserInfo: PropTypes.func,
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, { fetchUserInfo })(Login);
