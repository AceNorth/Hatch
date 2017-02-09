import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  MapView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
  Picker,
  Text,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Icon } from 'react-native-elements';
import { LoginButton } from 'react-native-fbsdk';

// Components
import AddEgg from './AddEgg';
import { InvisibleButton } from './InvisibleButton';
import { InvisibleIcon } from './InvisibleIcon';
import { Button } from './common/PinButton';
import EggConfirmationModal from './EggConfirmationModal';


// Reducers
import { setSelectedEgg, fetchAllEggs, makeOldEgg } from '../reducers/eggs';
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

      // ANDY NOTE:
      // this is as small as I can make the fence and still pick up
      // an egg that was left at the simulator's "current location"
      // using my phone.
      pickupRadius: 0.002,

      // view toggler
      showEggs: true,

      // loading message
      showLoading: true,

      // testing: require('../testImg.png')

      // Showing alert for new egg
      areThereNewEggs: false,
      alertShown: false

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
    this.renderViewToggleButton = this.renderViewToggleButton.bind(this)
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
      if (!egg.visibleOutsideFence && !this.isWithinFence(this.state.currentPosition.coords, egg)) {
        return;
      }
      if (egg.receiverId === this.props.user.fbId && !egg.deletedByReceiver && !egg.pickedUp) {
        let newPin = this.createStaticAnnotation(egg.longitude, egg.latitude, egg.sender, egg.id, egg.goHereImage, egg.goHereText);
        pins.push(newPin);

        if(egg.newEgg === true){
          egg.newEgg = false;
          this.props.makeOldEgg(egg)
          this.setState({areThereNewEggs: true})
        }
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
          return (<Text style={styles.loadingText}> Loading your eggs... </Text>)
        }

    if (this.state.showEggs) {
      return (
         <Icon
            name='ios-eye'
            type= 'ionicon'
            color='#fff'
            size={70}
            onPress={this.toggleView.bind(this)}
            underlayColor='#3a3c82'
          />
      );
    } else {
      return (
        <Icon
            name='ios-eye-off'
            type= 'ionicon'
            color='#fff'
            size={70}
            onPress={this.toggleView.bind(this)}
            underlayColor='#3a3c82'
        />
      );
    }
  };

  renderLeaveEggButton() {
    if (this.props.annotation.length) {
      return (
        <Icon
            name='ios-pin'
            type= 'ionicon'
            color='#fff'
            size={60}
            onPress={this.onAddNodeButtonPress.bind(this)}
            underlayColor='#3a3c82'
          />
      );
    } else {
      return (
        <InvisibleIcon
        size={60}
        onPress={ () => {} }
        />
      );
    }
  }

  renderEggManagerButton(){
    if(this.state.showLoading){
      return (
        <InvisibleIcon
        size={60}
        onPress={ () => {} }
        />
      );
    }
    else {
      return(
        <Icon
          name='ios-egg'
          type= 'ionicon'
          color='#fff'
          size={50}
          onPress={Actions.friends}
          underlayColor='#3a3c82'
        />
      )
    }
  }

  renderDirections(){
    if (!this.state.showLoading) {
      return(
        <View style={{flexDirection:'row'}}>
          <Text style={{flex:0}}>Press and Hold</Text>
          <Text style={{flex:0}}>to Leave an Egg</Text>
        </View>
      )
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
          // annotation.title='Tap:' ,
          // annotation.subtitle='',
          annotation.leftCalloutView = (
              <Button
                  color="#517fa4"
                  onPress={(e) => this.pickupPayload(annotation, e)}
              >Tap Here!
              </Button>
          )
        }
      }
    });

    return annotations;
  }

  renderAlert(){

    if(this.state.areThereNewEggs === true && this.state.alertShown === false){
      this.setState({areThereNewEggs: false})
      this.setState({alertShown: true})
      return Alert.alert(
        'You Have a New Egg!',
        null,
        [ {text: 'Close', onPress: () => console.log('Closed Alert!')}]
      )
    }
  }

  onConfirm() {
    this.setState({showConfirmationModal: false})
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
          <View style={styles.lineItems}>
            <View style={{paddingRight: 30}}>
              {this.renderViewToggleButton()}
            </View>

            <View style={styles.item}>
              {/*this.renderDirections()*/}
              {this.renderLeaveEggButton()}
            </View>

            <View style={styles.item}>
              {this.renderEggManagerButton()}
            </View>
          </View>

          {this.renderAlert()}

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

          <Modal
            visible={this.props.showConfirmationModal}
            transparent
            animationType="fade"
            onRequestClose={() => {}}
          >
            <EggConfirmationModal />
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
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'Heiti SC'
  },
  viewStyle: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
    backgroundColor: '#3a3c82'
  },
  mapStyle: {
    flex: 0.75,
    margin: 0
  },
  touchStyle: {
    flex: 0.25,
    margin: 10,
    alignItems: 'center',
    flexDirection: 'column',
    width: DEVICE_WIDTH,
  },
  lineItems: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  item: {
    paddingHorizontal: 30
  }
});

const mapStateToProps = (state) => {
  const user = state.auth;
  const selectedEgg = state.eggs.selectedEgg;
  const allEggs = state.eggs.allEggs;

  return {
    showAddNodeModal: state.addNodeModal.showAddNodeModal,
    showConfirmationModal: state.addNodeModal.showConfirmationModal,
    annotation: state.map.annotation,
    selectedEgg,
    allEggs,
    user
  };
};

const mapDispatchToProps = dispatch => ({
  setSelectedEgg: (eggId) => {
    dispatch(setSelectedEgg(eggId));
  },
  fetchAllEggs: (userId) => {
    dispatch(fetchAllEggs(userId));
  },
  makeOldEgg: (egg) => {
    dispatch(makeOldEgg(egg));
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
});

LandingPage.propTypes = {
  showAddNodeModal: PropTypes.bool,
  showConfirmationModal: PropTypes.bool,
  annotation: PropTypes.array,
  selectedEgg: PropTypes.number,
  allEggs: PropTypes.object,
  user: PropTypes.shape({
    fbId: PropTypes.string
  }),
  setSelectedEgg: PropTypes.func,
  makeOldEgg: PropTypes.func,
  fetchAllEggs: PropTypes.func,
  showModal: PropTypes.func,
  setAnnotation: PropTypes.func,
  clearAnnotation: PropTypes.func,
  whoami: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
