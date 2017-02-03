import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import SingleFriend from './SingleFriend';

class Friends extends Component {
  componentWillMount() {
    this.createDataSource(this.props.friends);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.friends);
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
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingTop: 65,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const mapStateToProps = ({ friends }) => ({ friends });

Friends.propTypes = {
  friends: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps)(Friends);

