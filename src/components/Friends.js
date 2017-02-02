import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { Button } from './common';
import SingleFriend from './SingleFriend';

class SendToFriendsView extends Component {
  componentWillMount() {
    this.createDataSource(this.props.list);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.list);
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

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>
          These are your friends!
        </Text>
        <View style={{ height: 45, justifyContent: 'center' }}>
          <Button onPress={() => Actions.addFriend()}>
            Tap here to add a new friend.
          </Button>
        </View>
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const mapStateToProps = state => {
  const { list } = state.friends;
  return { list };
};

export default connect(mapStateToProps)(SendToFriendsView);

