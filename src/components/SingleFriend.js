import React, { Component, PropTypes } from 'react';
import { Text, TouchableHighlight, Image, View } from 'react-native';
import { connect } from 'react-redux';

import { CardSection } from './common';

class SingleFriend extends Component {
  onPress() {
    console.log('im your friend!');
  }

  render() {
    const { name, picture } = this.props.friend;
    return (
      <CardSection>
        <TouchableHighlight onPress={this.onPress}>
          <View style={styles.container}>
            <Image style={styles.photo} source={{ uri: picture.data.url }} />
            <Text style={styles.name}>
              {name}
            </Text>
          </View>
        </TouchableHighlight>
      </CardSection>
    );
  }
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    paddingLeft: 15,
  },
  photo: {
    height: 50,
    width: 50,
    borderRadius: 10,
  }
};

SingleFriend.propTypes = {
  friend: PropTypes.shape({
    name: PropTypes.string,
    picture: PropTypes.object,
  }),
};

export default connect(() => ({}))(SingleFriend);
