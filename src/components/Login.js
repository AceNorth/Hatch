import React, { PropTypes } from 'react';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { LoginButton } from 'react-native-fbsdk';
import { tunnelIP } from '../TUNNELIP';
import { fetchUserInfo } from '../reducers/auth';

const Login = (props) => {
  const { container, text, half, image } = styles;
  return (
    <View style={container}>
      <View>
        <Image style={image} source={{ uri: `${tunnelIP}/eggboyHUGE.png` }} />
        <LoginButton
          readPermissions={['email', 'user_friends']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log('Login failed with error:', error);
              } else if (result.isCancelled) {
                console.log('Login was cancelled');
              } else {
                props.fetchUserInfo();
                Actions.landingPage();
              }
            }
          }
          onLogoutFinished={() => console.log('User logged out')}
          style={styles.loginButton}
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f4f281',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginButton: {
    height: 30,
    width: 200,
    flexDirection: 'column',
    marginTop: 100,
  },
  text: {
    textAlign: 'center',
    fontSize: 40,
    color: '#fff',
    fontWeight: '600',
  },
  image: {
    width: 189,
    height: 243
  }
};

Login.propTypes = {
  fetchUserInfo: PropTypes.func,
};

export default connect(() => ({}), { fetchUserInfo })(Login);
