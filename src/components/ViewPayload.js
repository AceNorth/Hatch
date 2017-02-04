import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Card, CardSection } from './common';
import axios from 'axios';
import { tunnelIP } from '../TUNNELIP';


class ViewPayload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewEgg: props.allEggs[props.selectedEgg]
    }
  }

  renderPayloadView() {

    let payloadType = this.state.viewEgg.payloadType;
    switch (payloadType) {
      // conditional render for different payloads
      case 'Text':
        return (<Text>{ this.state.viewEgg.payload.text }</Text>)
      case 'Image':
        //change this to image
        //render from DB
        return (<Text>{ this.state.viewEgg.payload.path }</Text>)
      default:
        return (<Text>Something has GONE WRONG</Text>)
    }
  }

  onSubmitPickup(){
    let eggId = this.state.viewEgg.id
    axios.put(`${tunnelIP}/api/egg/picked/${eggId}`)
    .then( res => {
      this.setState({viewEgg: res.data})
    })
    .catch(err => console.log('onSubmit Egg Update error', err))
  }

  render() {
    return (
      <Card>
        <CardSection style={{flex: 1}}>
          <Text style={{fontSize: 30, paddingTop: 50}}> Here's your message! </Text>
        </CardSection>
        <CardSection>
          { this.renderPayloadView() }
          { this.onSubmitPickup() }
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