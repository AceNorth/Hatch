import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Text } from 'react-native';

class WelcomePage extends Component {

  componentWillReceiveProps(nextProps) {
    nextProps.auth ? Actions.landingPage() : null;
  }

  nextScreen() {
    setTimeout(() => {
      !this.props.auth ? Actions.login() : null;
    }, 1000);
  }

  render() {
    const { container, text, half } = styles;
    return (
      <View style={container}>
        <View style={half}>
          <Text style={text} >Ready to find some eggs?</Text>
          {this.nextScreen()}
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
  }
};

WelcomePage.propTypes = {
  auth: PropTypes.object
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(WelcomePage);
