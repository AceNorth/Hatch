import React, { Component } from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import { CardSection } from './common';

class SingleFriend extends Component {
  onPress() {

  }

  render() {
    const { titleStyle } = styles;

    return (
      <CardSection>
        <TouchableHighlight onPress={this.onPress.bind(this)}>
          <Text style={titleStyle}>
            {this.props.friend.name}
          </Text>
        </TouchableHighlight>
      </CardSection>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

const mapStateToProps = (state) => {
  const { audioUrl } = state.audio;
  return { audioUrl };
};

export default connect(mapStateToProps)(SingleFriend);
