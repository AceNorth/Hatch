import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Card, CardSection } from './common';
import axios from 'axios';

class ViewPayload extends Component {

  constructor(props) {
    super(props);

  }

  renderPayloadView() {
    let payloadType = this.props.allEggs[this.props.selectedEgg].payload.type
    
    switch (payloadType) {
      // conditional render for different payloads
      case 'Text':
        return (<Text> { this.props.allEggs[this.props.selectedEgg].payload.content } </Text>)
      case 'Image':
        return (<View> { this.props.allEggs[this.props.selectedEgg].payload.content } </View>)
      default:
        return (<Text> Something has GONE WRONG </Text>)
    }
  }

  render() {

    return (
      <Card>
        <CardSection style={{flex: 1}}>
          <Text style={{fontSize: 30, paddingTop: 50}}> Here's your message! </Text>
        </CardSection>
        <CardSection>
          { this.renderPayloadView() }
        </CardSection>
      </Card>
    );
  };
}

const mapStateToProps = (state, ownProps) => {
  const selectedEgg = state.eggs.selectedEgg;
  const allEggs = state.eggs.allEggs;
    return { selectedEgg, allEggs };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPayload);