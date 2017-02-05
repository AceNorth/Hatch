'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, StyleSheet, MapView, 
         TextInput, TouchableWithoutFeedback, Modal, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements'

//Components
import  AddEgg  from './AddEgg';
import { Button } from './common';

//Reducers
import { setSelectedEgg, fetchAllEggs } from '../reducers/eggs';
import {showModal} from '../reducers/addNodeModal';
import { setAnnotation, clearAnnotation } from '../reducers/map';

import axios from 'axios';
import { tunnelIP } from '../TUNNELIP';

//Fetches device height and width
let { height, width } = Dimensions.get('window');
const DEVICE_WIDTH = width;
const DEVICE_HEIGHT = height;


class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // user's current position
      currentPosition: { timestamp: 0, coords: { latitude: 1, longitude: 1 } },

      // locations of eggs waiting to be picked up
      pickups: [],
      pickupRadius: 0.0003,

      // eggs that were placed by user
      dropoffs: [],

      // image rendering  ==> for samples/ image testing
      goHereImage: {},
    };

    this.onMapLongPress = this.onMapLongPress.bind(this);
    this.setRenderAnnotations = this.setRenderAnnotations.bind(this);
  }

  componentWillMount() {
  // set timer to update "current position" on state every second
    this.timerID = setInterval(
      () => this.checkFences(),
      10000
    );

    // fetch all eggs belonging to the current user
    this.props.fetchAllEggs(this.props.user.id);

    //this sets the sample image on the home page,
    //use this as a template for how to get the axios response you will need to render images.
    // let goHereImage2;
    // axios.get(`${tunnelIP}/api/egg/goHereImage/19`)
    //   .then(response => {
    //       goHereImage2 = response.data
    //       this.setState({goHereImage: goHereImage2});
    //   })
  }

  componentWillReceiveProps(nextProps) {
    // loop through all the user's eggs and turn them into map annotations
    let pickUps = [];
    let dropOffs = [];

    for (let key in nextProps.allEggs) {
      let egg = nextProps.allEggs[key];

      if (egg.receiverId == this.props.user.id) {
       let newPickup = this.createStaticAnnotation(egg.longitude, egg.latitude, egg.senderId, egg.id, egg.goHereText);
       pickUps.push(newPickup);
      }

      if (egg.senderId == this.props.user.id) {
       let newDropoff = this.createStaticDropAnnotation(egg.longitude, egg.latitude, egg.receiverId, egg.id, egg.goHereText);
       dropOffs.push(newDropoff);
      }
    }
    this.setState({ pickups: pickUps, dropoffs: dropOffs });
  }

  onAddNodeButtonPress() {
    this.props.showModal(true);
  }


  updateCurrentPosition() {
    let options = {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 1
    };

    navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ currentPosition: position })
      , null, options);
  }

  //add function for popup / push notification to appear
  checkFences() {
    this.updateCurrentPosition();
    for (let key in this.props.allEggs) {
      let egg = this.props.allEggs[key];
      if(this.isWithinFence(this.state.currentPosition.coords, egg)){
        this.props.setSelectedEgg(egg.id);
      }
    }
  };

  isWithinFence(coordinatesObject, egg){
   if(!egg) { return false }
   let eggLong = Number(egg.longitude)
   let eggLat = Number(egg.latitude)

   let fence = Math.pow((coordinatesObject.longitude-eggLong), 2) 
                + Math.pow((coordinatesObject.latitude-eggLat), 2);
   if (fence < Math.pow(this.state.pickupRadius, 2)) {
     return true;
   }
   return false;
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
      senderId,
      title: goHereText,
      subtitle: pinSubtitle,
      tintColor: MapView.PinColors.PURPLE,
      draggable: false
    };
  };

  createStaticDropAnnotation(longitude, latitude, receiverId, eggId, goHereText) {
    // we might want to change what's displayed here later, this is just
    // a placeholder example fo the info we can put on pins
    let pinSubtitle = "Egg to user " + receiverId;
    return {
      longitude,
      latitude,
      eggId,
      title: goHereText,
      subtitle: pinSubtitle,
      tintColor: MapView.PinColors.RED,
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

  setRenderAnnotations(annotations){
    annotations.map(annotation => {
      if(annotation && annotation.senderId){
        // console.log('BOOL: ', this.isWithinFence(this.state.currentPosition.coords, annotation))
        if(this.isWithinFence(this.state.currentPosition.coords, annotation) && annotation.senderId) {
          annotation.tintColor = MapView.PinColors.GREEN,
          annotation.rightCalloutView = (
            <Button
              color='#517fa4'
              onPress={Actions.viewPayload}
              >Psst...
            </Button>
          );
        }
      }
    });

    return annotations
  }

  render() {
    const position = this.state.currentPosition;
    // the annotations on the map are a combination of packages waiting for pickup
    // + new eggs waiting to be dropped (from the AddEgg modal)
    // annotations.push(this.props.annotation.concat(this.state.pickups));

    const annotations = this.props.annotation.concat(this.state.pickups).concat(this.state.dropoffs);
    this.setRenderAnnotations(annotations);

    return (
      <View style={styles.viewStyle}>
        <TouchableWithoutFeedback onLongPress={ this.onMapLongPress }>
          <MapView
            style={styles.mapStyle}
            showsUserLocation={true}
            region={{latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: .01, longitudeDelta: .01}}
            annotations={ annotations }
          />
        </TouchableWithoutFeedback>
        <View style={styles.touchStyle}>
          <Button onPress={Actions.friends}> My Egg Basket </Button>

          {this.renderLeaveEggButton()}

          <Image style={{width: 50, height: 50}} source={{uri: this.state.goHereImage.uri}}></Image>

          <Modal
              visible={this.props.showAddNodeModal}
              transparent
              animationType="fade"
              onRequestClose={() => {}}
          >
            <AddEgg
                {...this.state}>
            </AddEgg>
          </Modal>
        </View>
        <View>
          <Icon
              name='ios-egg'
              type= 'ionicon'
              color='#f50'
              onPress={Actions.friends}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
  viewStyle: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT
  },
  mapStyle: {
    flex: 0.65,
    margin: 0
  },
  touchStyle: {
    flex: 0.35,
    margin: 0
  }
});

const mapStateToProps = (state, ownProps) => {

  //fake user for testing:
  const user = { id: state.auth.fbId }; // change to your userId

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
