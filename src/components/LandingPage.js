'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  MapView,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  Picker
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';

// Components
import AddEgg from './AddEgg';
import { Button } from './common';

// Reducers
import { setSelectedEgg, fetchAllEggs } from '../reducers/eggs';
import { showModal } from '../reducers/addNodeModal';
import { setAnnotation, clearAnnotation } from '../reducers/map';

import { tunnelIP } from '../TUNNELIP';

// Fetches device height and width
let { height, width } = Dimensions.get('window');
const DEVICE_WIDTH = width;
const DEVICE_HEIGHT = height;

class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // user's current position
      currentPosition: { timestamp: 0, coords: { latitude: 41.888423, longitude: -87.634369 } },

      // locations of eggs waiting to be picked up
      pickups: [],
      pickupRadius: 0.0003,

      // eggs that were placed by user
      dropoffs: [],
      eggsShown: 'all',
      eggsToDisplay: []

    };

    this.onMapLongPress = this.onMapLongPress.bind(this);
    this.setRenderAnnotations = this.setRenderAnnotations.bind(this);
  }

  componentWillMount() {
  // set timer to update "current position" on state every second
    this.timerID = setInterval(
      () => this.updateCurrentPositionAndPins(),
      10000
    );
    // fetch all eggs belonging to the current user
    this.props.fetchAllEggs(this.props.user.fbId);
  }


  onAddNodeButtonPress() {
    this.props.showModal(true);
  }


  updateCurrentPositionAndPins() {
    let options = {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 1
    };

    navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ currentPosition: position })
      , null, options);

      let pickUps = [];
      let dropOffs = [];


      for (let key in this.props.allEggs) {
        let egg = this.props.allEggs[key];
        if (egg.receiverId == this.props.user.fbId) {
          console.log('egg', egg)
          let newPickup = this.createStaticAnnotation(egg.longitude, egg.latitude, egg.sender, egg.id, egg.goHereText);
          pickUps.push(newPickup);
        }

        if (egg.senderId == this.props.user.fbId) {
          let newDropoff = this.createStaticDropAnnotation(egg.longitude, egg.latitude, egg.receiver, egg.id, egg.goHereText);
          dropOffs.push(newDropoff);
        }
      }
      this.setState({ pickups: pickUps, dropoffs: dropOffs });

      // initially sets eggs to all pickups and dropoffs
      let viewEggs = this.setRenderAnnotations(this.state.pickups.concat(this.state.dropoffs))
      this.setState({ eggsToDisplay: viewEggs });
  }

  isWithinFence(coordinatesObject, egg){
   if(!egg) { return false }
   let eggLong = Number(egg.longitude)
   let eggLat = Number(egg.latitude)

   let fence = Math.pow((coordinatesObject.longitude - eggLong), 2)
                + Math.pow((coordinatesObject.latitude - eggLat), 2);
   if (fence < Math.pow(this.state.pickupRadius, 2)) {
     return true;
   }
   return false;
  }

  onMapLongPress(event) {
    if (!this.props.annotation.length) {
      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 1
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newA = this.createAnnotation(position.coords.longitude, position.coords.latitude);
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
          const newAnnotation = this.createAnnotation(event.longitude, event.latitude);
          this.props.setAnnotation(newAnnotation);
        }
      },
    };
  }

  createStaticAnnotation(longitude, latitude, sender, eggId, goHereText) {
    // we might want to change what's displayed here later, this is just
    // a placeholder example fo the info we can put on pins
    const senderId = sender.id;
    const sentFrom = `${sender.firstName} ${sender.lastName}`;
    const pinSubtitle = `Egg from ${sentFrom}`;
    return {
      longitude,
      latitude,
      senderId,
      eggId,
      title: goHereText,
      subtitle: pinSubtitle,
      tintColor: MapView.PinColors.PURPLE,
      draggable: false
    };
  }

  createStaticDropAnnotation(longitude, latitude, receiver, eggId, goHereText) {
    // we might want to change what's displayed here later, this is just
    // a placeholder example fo the info we can put on pins

    const sentTo = `${receiver.firstName} ${receiver.lastName}`;
    const pinSubtitle = `Egg to ${sentTo}`;
    return {
      longitude,
      latitude,
      eggId,
      title: goHereText,
      subtitle: pinSubtitle,
      tintColor: MapView.PinColors.RED,
      draggable: false
    };
  }

  renderLeaveEggButton() {
    if (this.props.annotation.length) {
      return (
        <Button onPress={this.onAddNodeButtonPress.bind(this)}>
        Leave an egg at the current pin
        </Button>
      );
    }
  }

  pickupPayload(selectedAnnotation) {
    this.props.setSelectedEgg(selectedAnnotation.eggId);
    return (Actions.viewPayload());
  }

  setRenderAnnotations(annotations) {
    // console.log('setRenderAnnotations, e', e)
    annotations.map(annotation => {
      if (annotations){
        if (this.isWithinFence(this.state.currentPosition.coords, annotation) && annotation.senderId) {
          annotation.tintColor = MapView.PinColors.GREEN,
          annotation.rightCalloutView = (
            <Button
              color="#517fa4"
              onPress={(e) => this.pickupPayload(annotation, e)}
            >
              Psst...
            </Button>
          );
        }
      }
    });

    return annotations;
  }

  changeShownEggs(eggsToShow) {
    let showEggs = [];

    switch (eggsToShow) {
      case 'all':
        showEggs = this.setRenderAnnotations(this.state.pickups.concat(this.state.dropoffs));
        break;
      case 'sent':
        // change annotations to just include dropoffs
        showEggs = this.setRenderAnnotations(this.state.dropoffs);
        break;
      case 'received':
        // change annotations to just include dropoffs
        showEggs = this.setRenderAnnotations(this.state.pickups);
        break;
      default:
        return showEggs;
    }

    this.setState({ eggsToDisplay: showEggs });
  }

  onPickerChange(displayEggs) {
    this.setState({ eggsShown: displayEggs });
    this.changeShownEggs(displayEggs);
    this.forceUpdate();
  }

  render() {
    const position = this.state.currentPosition;

    return (
      <View style={styles.viewStyle}>
        <TouchableWithoutFeedback onLongPress={this.onMapLongPress}>
          <MapView
            style={styles.mapStyle}
            showsUserLocation={true}
            region={{ latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: .01, longitudeDelta: .01 }}
            annotations={this.state.eggsToDisplay}
          />
        </TouchableWithoutFeedback>

        <Picker
          selecedValue={this.state.eggsShown}
          onValueChange={filter => this.onPickerChange(filter)}
        >
          <Picker.Item label="All eggs" value="all" />
          <Picker.Item label="Sent eggs" value="sent" />
          <Picker.Item label="Received eggs" value="received" />
        </Picker>

        <View style={styles.touchStyle}>
          {/*<Button onPress={Actions.friends}> My Egg Basket </Button>*/}
          {/*<Image style={{width: 50, height: 50}} source={{uri: this.state.goHereImage.uri}}></Image>*/}

          {this.renderLeaveEggButton()}

          <Modal
            visible={this.props.showAddNodeModal}
            transparent
            animationType="fade"
            onRequestClose={() => {}}
          >
            <AddEgg
              {...this.state}
            />
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

const mapStateToProps = (state) => {
  const user = state.auth;
  const selectedEgg = state.eggs.selectedEgg;
  const allEggs = state.eggs.allEggs;

  return {
    showAddNodeModal: state.addNodeModal.showAddNodeModal,
    annotation: state.map.annotation,
    selectedEgg,
    allEggs,
    user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedEgg: (eggId) => {
      dispatch(setSelectedEgg(eggId));
    },
    fetchAllEggs: (userId) => {
      dispatch(fetchAllEggs(userId));
    },
    showModal: (boolean) => {
      dispatch(showModal(boolean));
    },
    setAnnotation: (annotation) => {
      dispatch(setAnnotation(annotation));
    },
    clearAnnotation: () => {
      dispatch(clearAnnotation());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
