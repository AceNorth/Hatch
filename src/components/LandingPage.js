'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, MapView, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Button } from './common';
import  AddNodeForm  from './AddNodeForm';
import { connect } from 'react-redux';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { setSelectedEgg } from '../reducers/eggs';


class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPosition: { timestamp: 0, coords: { latitude: 1, longitude: 1 } },
      showAddNodeModal: false,
      annotations: [],
      text: 'placeholder'
    };

    this.onSubmitNode = this.onSubmitNode.bind(this);
    this.onCancelSubmitNode = this.onCancelSubmitNode.bind(this);
    this.onMapLongPress = this.onMapLongPress.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this); 
}

//----------------------TESTING DATA, NOT PERMANENT--------------------

  renderPickupEggButton() {
    // if you're within the fence of an egg, render the button
    if (this.isWithinFence(this.state.currentPosition.coords, this.props.selectedEgg)) { 
      return (
        <Button onPress={Actions.viewPayload}>
          FOUND AN EGG! PRESS HERE TO PICK IT UP!
        </Button>
      )
    }
  }

  isWithinFence(coordinatesObject, egg) {
    if (!egg) { return false };
    let latitudeMin = egg.latitude - 0.0001;
    let latitudeMax = egg.latitude + 0.0001;
    let longitudeMin = egg.longitude - 0.0001;
    let longitudeMax = egg.longitude + 0.0001;
    let isWithinLat = (latitudeMin <= coordinatesObject.latitude);
    let isWithinLong = (longitudeMin <= coordinatesObject.longitude);
    let evaluation = (isWithinLong && isWithinLat);
    return evaluation;
  }

//----------------------END TESTING DATA-----------------

  componentWillMount() {
    // update "current position" on state every second
    this.timerID = setInterval(
      () => this.updateCurrentPosition(),
      1000
    );

    this.props.setSelectedEgg(3);
  }

  onAddNodeButtonPress() {
    this.setState({ showAddNodeModal: true })
  }

  onSubmitNode() {
    //send data to DB
    const egg = {
      goHereText: this.state.goHereText,
      payload: this.state.payload,
      payloadType: 'Text',
      latitude: this.state.annotations[0].latitude,
      longitude: this.state.annotations[0].longitude
    }
    axios.post('http://localhost:1333/api/egg', egg);
    this.setState({ showAddNodeModal: false, annotations: [] });
  }

  onCancelSubmitNode() {
    this.setState({ showAddNodeModal: false });
  }

  handleInputChange(e){
      this.setState({text: e });
  }

  updateCurrentPosition() {
    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 1
    };

    navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ currentPosition: position })
      , null, options);
  }

  onMapLongPress(event) {
    if (!this.state.annotations.length) {
      let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 1
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
              annotations: [this.createAnnotation(position.coords.longitude, position.coords.latitude)]
            })
        }
        , null, options);
    }
  }

  createAnnotation(longitude, latitude) {
    return {
      longitude,
      latitude,
      draggable: true,
      onDragStateChange: (event) => {
        if (event.state === 'idle') {
          this.setState({
            annotations: [this.createAnnotation(event.longitude, event.latitude)]
          });
        }
      },
    };
  }

  renderLeaveEggButton() {
    if (this.state.annotations.length) {
      return (
        <Button onPress={this.onAddNodeButtonPress.bind(this)}>
        Leave an egg at the current pin
        </Button>
        )
    }
  }

  render() {
    const position = this.state.currentPosition;
    const annotations = this.state.annotations;

    return (
      <View>
        <TouchableWithoutFeedback onLongPress={ this.onMapLongPress }>
          <MapView
            style={{height: 500, width: 400, margin: 0}}
            showsUserLocation={true}
            region={{latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: .01, longitudeDelta: .01}}
            annotations={ annotations }
          />
        </TouchableWithoutFeedback>
        
        {this.renderLeaveEggButton()}
        {this.renderPickupEggButton()}

        <AddNodeForm
          visible={ this.state.showAddNodeModal }
          onSubmitNode={ this.onSubmitNode }
          onCancelSubmitNode={ this.onCancelSubmitNode }
          handleInputChange={this.handleInputChange}
          {...this.state}
        >
          BUK BUK BUK...
        </AddNodeForm>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});

const mapStateToProps = (state, ownProps) => {
    let selectedEgg = state.eggs.selectedEgg;
    return {
      selectedEgg
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setSelectedEgg: function(eggId){
            dispatch(setSelectedEgg(eggId));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
