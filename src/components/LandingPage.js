'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, MapView, TextInput, TouchableWithoutFeedback, Modal } from 'react-native';
import { Button } from './common';
import  AddNodeForm  from './AddEgg';
import { connect } from 'react-redux';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { setSelectedEgg } from '../reducers/eggs';
import { tunnelIP } from '../TUNNELIP';
import {showModal} from '../reducers/addNodeModal';
import {setAnnotations, clearAnnotations} from '../reducers/map';

class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPosition: { timestamp: 0, coords: { latitude: 1, longitude: 1 } },
    };

    this.onMapLongPress = this.onMapLongPress.bind(this);
  }

  componentWillMount() {
  // update "current position" on state every second
    this.timerID = setInterval(
      () => this.updateCurrentPosition(),
      1000
    );

    // replace this hardcode later
    this.props.setSelectedEgg(3);
  }

  // isWithinFence(coordinatesObject, egg) {
  //   if (!egg) { return false };
  //   let latitudeMin = egg.latitude - 0.0001;
  //   let latitudeMax = egg.latitude + 0.0001;
  //   let longitudeMin = egg.longitude - 0.0001;
  //   let longitudeMax = egg.longitude + 0.0001;
  //   let isWithinLat = (latitudeMin <= coordinatesObject.latitude);
  //   let isWithinLong = (longitudeMin <= coordinatesObject.longitude);
  //   let evaluation = (isWithinLong && isWithinLat);
  //   return evaluation;
  // }

  isWithinFence(coordinatesObject, egg){
   if(!egg) { return false }
     
   let fence = Math.pow((coordinatesObject.longitude-egg.longitude), 2) + Math.pow((coordinatesObject.latitude-egg.latitude), 2);

   if (fence < Math.pow(0.0001, 2)) {
     return true;
   }

   return false;
 }

  onAddNodeButtonPress() {
    this.props.showModal(true);
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
    if (!this.props.annotations.length) {
      let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 1
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          let newA = this.createAnnotation(position.coords.longitude, position.coords.latitude);
          this.props.setAnnotations(newA);
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
          let newAnnotation= this.createAnnotation(event.longitude, event.latitude);
          this.props.setAnnotations(newAnnotation);
        }
      },
    };
  }

  renderLeaveEggButton() {
    if (this.props.annotations.length) {
      return (
        <Button onPress={this.onAddNodeButtonPress.bind(this)}>
        Leave an egg at the current pin
        </Button>
        )
    }
  }

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

  render() {
    const position = this.state.currentPosition;
    const annotations = this.props.annotations;

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

        <Modal
            visible={this.props.showAddNodeModal}
            transparent
            animationType="fade"
            onRequestClose={() => {
            }}
        >
          <AddNodeForm
              {...this.state}>
          </AddNodeForm>
        </Modal>
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
        showAddNodeModal: state.addNodeModal.showAddNodeModal,
        annotations: state.map.annotations,
        selectedEgg
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSelectedEgg: function(eggId) {
        dispatch(setSelectedEgg(eggId));
      },
    showModal: function(boolean) {
        dispatch(showModal(boolean));
    },
    setAnnotations: function(annotations) {
      dispatch(setAnnotations(annotations));
    },
    clearAnnotations: function() {
      dispatch(clearAnnotations());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
