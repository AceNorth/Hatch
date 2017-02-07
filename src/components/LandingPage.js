import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  MapView,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  Picker,
  Text
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import { LoginButton } from 'react-native-fbsdk';

// Components
import AddEgg from './AddEgg';
import { InvisibleButton } from './InvisibleButton';
import { Button } from './common';

// Reducers
import { setSelectedEgg, fetchAllEggs } from '../reducers/eggs';
import { showModal } from '../reducers/addNodeModal';
import { setAnnotation, clearAnnotation } from '../reducers/map';
import { whoami } from '../reducers/auth';

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
      currentPosition: { timestamp: 0, coords: { latitude: 41.888523, longitude: -87.634369 } },

      // annotation objects (pins) for eggs waiting to be picked up
      eggPins: [],
      pickupRadius: 0.0003,

      // view toggler
      showEggs: true,

      // loading message
      showLoading: true
    };
    // update user's location every second as they walk around
    this.locationUpdater = setInterval(
      () => this.updateCurrentPosition(),
      1000
    );

    this.eggFetcher = setInterval(
      () => this.checkForEggs(),
      5000
    );

    this.onMapLongPress = this.onMapLongPress.bind(this);
    this.setRenderAnnotations = this.setRenderAnnotations.bind(this);
  }

  componentWillMount() {
    // fetch all eggs belonging to the current user
    if (this.props.user) {
      this.props.fetchAllEggs(this.props.user.fbId);
    }
  }

  componentWillUnmount() {
    this.stopLocationUpdating();
    this.stopFetching();
  }

  stopLocationUpdating() {
    // stops our location from updating every second,
    // for when we leave the page or want to drop a pin
    clearInterval(this.locationUpdater);
  }

  checkForEggs() {
    this.setState({showLoading: false});
    this.updatePins();
    this.props.fetchAllEggs(this.props.user.fbId);
  }

  stopFetching() {
    clearInterval(this.eggFetcher);
  }

  onAddNodeButtonPress() {
    this.props.showModal(true);
  }

  updateCurrentPosition() {
    // change this because all pins are showing up every time this runs

    let options = {
      enableHighAccuracy: true,
      timeout: 1000,
      maximumAge: 1
    };

    navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ currentPosition: position })
      , null, options);

    this.setRenderAnnotations(this.state.eggPins);
  }

  updatePins() {
    let pins = [];

    for (let key in this.props.allEggs) {
      let egg = this.props.allEggs[key];
      if (egg.receiverId === this.props.user.fbId && !egg.deletedByReceiver && !egg.pickedUp) {
        let newPin = this.createStaticAnnotation(egg.longitude, egg.latitude, egg.sender, egg.id, egg.goHereText);
        pins.push(newPin);
      }
    }
    this.setRenderAnnotations(pins);
    this.setState({ eggPins: pins });
  }

  isWithinFence(coordinatesObject, egg){
   if(!egg) { return false }
   let eggLong = Number(egg.longitude);
   let eggLat = Number(egg.latitude);

   let fence = Math.pow((coordinatesObject.longitude - eggLong), 2)
                + Math.pow((coordinatesObject.latitude - eggLat), 2);
   if (fence < Math.pow(this.state.pickupRadius, 2)) {
     return true;
   }
   return false;
  }

  onMapLongPress(event) {
    // stop updating user's location until they finish dropping the egg
    this.stopLocationUpdating();

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

  toggleView() {
    let view = !this.state.showEggs;
    this.setState({ showEggs: view });
  }

  renderViewToggleButton() {
    if (this.state.showLoading) {
          return (<Text style={styles.loadingText}> LOADING YOUR EGGS... </Text>)
        }

    if (this.state.showEggs) {
      return (
        <Button onPress={this.toggleView.bind(this)}>
        Hide pins
        </Button>
      );
    } else {
      return (
        <Button onPress={this.toggleView.bind(this)}>
        Show pins
        </Button>
      );
    }
  };

  renderLeaveEggButton() {
    if (this.props.annotation.length) {
      return (
        <Button onPress={this.onAddNodeButtonPress.bind(this)}>
        Leave an egg at the current pin
        </Button>
      );
    } else {
      return (
        <InvisibleButton onPress={() => {}}>
        I am invisible and you should not see me
        </InvisibleButton>
      );
    }
  }

  pickupPayload(selectedAnnotation) {
    this.props.setSelectedEgg(selectedAnnotation.eggId);
    return (Actions.viewPayload());
  }

  setRenderAnnotations(annotations){
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

  render() {
    const position = this.state.currentPosition;
    let annotationsToDisplay;

    if (this.state.showEggs) {
      annotationsToDisplay = [...this.state.eggPins, ...this.props.annotation];
    } else {
      annotationsToDisplay = this.props.annotation;
    }

    return (
      //the map

      <View style={styles.viewStyle}>
        <TouchableWithoutFeedback onLongPress={this.onMapLongPress}>
          <MapView
            style={styles.mapStyle}
            showsUserLocation={true}
            region={{latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: .01, longitudeDelta: .01}}
            annotations={annotationsToDisplay}
          />
        </TouchableWithoutFeedback>

        <View style={styles.touchStyle}>
          {this.renderViewToggleButton()}
          {this.renderLeaveEggButton()}

          <View style={{marginBottom: 20}}>
            <Icon
                name='ios-egg'
                type= 'ionicon'
                color='#f50'
                size={50}
                onPress={Actions.friends}
            />
          </View>

          <LoginButton
            readPermissions={['email', 'user_friends']}
            onLoginFinished={
              (error, result) => {
                if (error) {
                  console.log('Login failed with error:', error);
                } else if (result.isCancelled) {
                  console.log('Login was cancelled');
                } else {
                  this.props.fetchUserInfo();
                  Actions.landingPage();
                }
              }
            }
            onLogoutFinished={() => {
              console.log('User logged out');
              this.props.whoami(null);
              Actions.login();
            }}
            style={styles.loginButton}
          />

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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
  loadingText: {
    fontWeight: '500',
    alignSelf: 'center'
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
    margin: 10
  },
  loginButton: {
    height: 30,
    width: 200,
    alignSelf: 'center'
  },
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
    },
    whoami: (user) => {
      dispatch(whoami(user));
    },
  };
};

LandingPage.propTypes = {
  showAddNodeModal: PropTypes.func,
  annotation: PropTypes.shape({
    length: PropTypes.number,
  }),
  selectedEgg: PropTypes.number,
  allEggs: PropTypes.object,
  user: PropTypes.shape({
    fbId: PropTypes.number
  }),
  setSelectedEgg: PropTypes.func,
  fetchAllEggs: PropTypes.func,
  showModal: PropTypes.func,
  setAnnotation: PropTypes.func,
  clearAnnotation: PropTypes.func,
  whoami: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
