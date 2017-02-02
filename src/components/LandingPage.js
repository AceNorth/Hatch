'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, MapView, TextInput, TouchableWithoutFeedback, Modal, Image } from 'react-native';
import { Button } from './common';
import  AddEgg  from './AddEgg';
import { connect } from 'react-redux';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { setSelectedEgg, fetchAllEggs } from '../reducers/eggs';
import { tunnelIP } from '../TUNNELIP';
import {showModal} from '../reducers/addNodeModal';
import { setAnnotation, clearAnnotation } from '../reducers/map';

class LandingPage extends Component {

    componentWillMount() {
        // set timer to update "current position" on state every second
        this.timerID = setInterval(
            () => this.checkFences(),
            1000
        );

        // fetch all eggs belonging to the current user
        this.props.fetchAllEggs(this.props.user.id);


        //get image
        console.log('---------------> got into landing Page, component will mount')
        let goHereImage2;
        axios.get(`${tunnelIP}/api/egg/goHereImage/19`)
            .then(response => {
                goHereImage2 = response.data
                console.log('here is the type of goHereImage2', typeof (goHereImage2))
                this.setState({goHereImage: goHereImage2});
                console.log('here is state goHereImage', this.state.goHereImage)
            })
    }

  constructor(props) {
    super(props);
    this.state = {
    // user's current position
      currentPosition: { timestamp: 0, coords: { latitude: 1, longitude: 1 } },
    // locations of eggs waiting to be picked up
      pickups: [],

        //testing image rendering on front end
        goHereImage: {},

      pickupRadius: 0.001

    };

    this.onMapLongPress = this.onMapLongPress.bind(this);
  }

  componentWillMount() {
  // set timer to update "current position" on state every second
    this.timerID = setInterval(
      () => this.checkFences(),
      1000
    );

    // fetch all eggs belonging to the current user
    this.props.fetchAllEggs(this.props.user.id);
  }

  componentWillReceiveProps(nextProps) {
    // loop through all the user's eggs and turn them into map annotations
    let pickups = [];

    for (let key in nextProps.allEggs) {
      let egg = nextProps.allEggs[key];

      if (egg.receiverId === this.props.user.id) {
        let newPickup = this.createStaticAnnotation(egg.longitude, egg.latitude, egg.senderId, egg.id, egg.goHereText);
        pickups.push(newPickup);
      }
    }
    this.setState({ pickups }); 
  }

  // isWithinFence(coordinatesObject, egg){
  //  if(!egg) { return false }  
  //  let fence = Math.pow((coordinatesObject.longitude-egg.longitude), 2) + Math.pow((coordinatesObject.latitude-egg.latitude), 2);
  //  if (fence < Math.pow(0.0001, 2)) {
  //    return true;
  //  }

  //  return false;
  // }

  onAddNodeButtonPress() {
    this.props.showModal(true);
  }

  checkFences() {
    this.updateCurrentPosition();
    for (let key in this.props.allEggs) {
      let egg = this.props.allEggs[key];
      if (this.isWithinFence(this.state.currentPosition.coords, egg)) {
        this.props.setSelectedEgg(egg.id);
      }
    }
  };

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
    if (!this.props.annotation.length) {
      let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 1
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          let newA = this.createAnnotation(position.coords.longitude, position.coords.latitude);
          this.props.setAnnotation(newA);
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
          this.props.setAnnotation(newAnnotation);
        }
      },
    };
  }

  createStaticAnnotation(longitude, latitude, senderId, eggId, goHereText) {
    // we might want to change what's displayed here later, this is just
    // a placeholder example fo the info we can put on pins
    let pinSubtitle = "Egg from user " + senderId;
    return {
      longitude,
      latitude,
      eggId,
      title: goHereText,
      subtitle: pinSubtitle,
      tintColor: MapView.PinColors.PURPLE,
      draggable: false
    };
  };

  renderLeaveEggButton() {
    if (this.props.annotation.length) {
      return (
        <Button onPress={this.onAddNodeButtonPress.bind(this)}>
        Leave an egg at the current pin
        </Button>
        )
    }
  }

  renderPickupEggButton() {
    // if you're within the fence of an egg, render the button
    if (this.isWithinFence(this.state.currentPosition.coords, this.props.allEggs[this.props.selectedEgg])) { 
      return (
        <Button onPress={Actions.viewPayload}>
          FOUND AN EGG! PRESS HERE TO PICK IT UP!
        </Button>
      )
    }
  }

  isWithinFence(coordinatesObject, egg){
   
   let eggLong = Number(egg.longitude)
   let eggLat = Number(egg.latitude)

   if(!egg) { return false }  

   let fence = Math.pow((coordinatesObject.longitude-eggLong), 2) + Math.pow((coordinatesObject.latitude-eggLat), 2);
   if (fence < Math.pow(this.state.pickupRadius, 2)) {
     return true;
   }

   return false;
  }

  render() {
    const position = this.state.currentPosition;

    // the annotations on the map are a combination of packages waiting for pickup
    // + new eggs waiting to be dropped (from the AddEgg modal)

    const annotations = this.props.annotation.concat(this.state.pickups);

    // console.log('this.state.currentPosition: ', this.state.currentPosition)

    annotations.map(annotation => {
      if(annotation){
        if(this.isWithinFence(this.state.currentPosition.coords, annotation)){
          annotation.rightCalloutView = (
            <Button 
              color='#517fa4'
              onPress={Actions.viewPayload} 
              >Psst...
            </Button>
          );    
        }
      }
    })

    return (
      <View>
        <TouchableWithoutFeedback onLongPress={ this.onMapLongPress }>
          <MapView
            style={{height: 200, width: 400, margin: 0}}
            showsUserLocation={true}
            region={{latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: .01, longitudeDelta: .01}}
            annotations={ annotations }
          />
        </TouchableWithoutFeedback>
        
        {this.renderLeaveEggButton()}

        {this.renderPickupEggButton()}
          <Image style={{width: 50, height: 50}} source={{uri: this.state.goHereImage.uri}}></Image>
          <Image style={{width: 50, height: 50}} source={{ uri :'data:image/png;base64,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'}}></Image>


        <Modal
            visible={this.props.showAddNodeModal}
            transparent
            animationType="fade"
            onRequestClose={() => {
            }}
        >
          <AddEgg
              {...this.state}>
          </AddEgg>
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
  //fake user for testing:

  const user = { id: 225 };
  // const user = { id: 1 };

  let selectedEgg = state.eggs.selectedEgg;
  let allEggs = state.eggs.allEggs;

  return {
    showAddNodeModal: state.addNodeModal.showAddNodeModal,
    annotation: state.map.annotation,
    selectedEgg,
    allEggs,
    user
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSelectedEgg: function(eggId) {
        dispatch(setSelectedEgg(eggId));
      },
    fetchAllEggs: function(userId) {
      dispatch(fetchAllEggs(userId));
    },
    showModal: function(boolean) {
        dispatch(showModal(boolean));
    },
    setAnnotation: function(annotation) {
      dispatch(setAnnotation(annotation));
    },
    clearAnnotation: function() {
      dispatch(clearAnnotation());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
