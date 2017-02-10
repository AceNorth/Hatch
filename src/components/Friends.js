import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ListView, View, Text } from 'react-native';

import SingleFriend from './SingleFriend';
import { LoginButton } from 'react-native-fbsdk';


class Friends extends Component {
  componentWillMount() {
    this.createDataSource(this.props.allFriends);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.allFriends);
  }

  createDataSource(friends) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(friends);
  }

  renderRow(friend) {
    return <SingleFriend friend={friend} />;
  }

  renderFooter() {
    return (
      <View style={styles.footer}>
        <LoginButton
          readPermissions={['email', 'user_friends']}
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log('Login failed with error:', error);
              } else if (result.isCancelled) {
                console.log('Login was cancelled');
              } else {
                this.props.fetchUserInfo();
                Actions.landingPage();
              }
            }
          }
          onLogoutFinished={() => {
            console.log('User logged out');
            this.props.whoami(null);
            Actions.login();
          }}
          style={styles.loginButton}
        />
      </View>
    );
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        renderFooter={this.renderFooter}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 100,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  loginButton: {
    height: 30,
    width: 200,
    alignSelf: 'center'
  },
  footer: {
    flex: 1,
    marginTop: 50
  }
});

const mapStateToProps = ({ friends }) => ({ allFriends: friends.allFriends });

Friends.propTypes = {
  allFriends: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps)(Friends);

