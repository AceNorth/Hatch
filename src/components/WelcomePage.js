import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';

class WelcomePage extends Component {

  componentWillReceiveProps(nextProps) {
  // navigate to either the landing page (if logged in) or
  // the authorization page (if not)
    nextProps.auth ? Actions.landingPage() : Actions.login();
  }

  render() {
    const { container, text } = styles;
    return (
      <View style={container}>
        <Text style={text}>HELLO WELCOME TO ANDY'S APP</Text>
      </View>
    );
  };
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f4f281',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    color: '#fff',
    fontWeight: '600',
  }
};

WelcomePage.propTypes = {
  auth: PropTypes.object
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(WelcomePage);
