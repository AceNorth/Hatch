'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, MapView, TextInput, TouchableWithoutFeedback, Modal } from 'react-native';
import { Button } from './common';
import  AddNodeForm  from './AddNodeForm';
import { connect } from 'react-redux';
import {showModal} from '../reducers/addNodeModal'


class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPosition: { timestamp: 0, coords: { latitude: 1, longitude: 1 } },
      annotations: [],
    };

    this.onMapLongPress = this.onMapLongPress.bind(this);
}

  componentDidMount() {
    this.updateCurrentPosition();
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

  renderLeavePackageButton() {
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
            style={{height: 400, width: 400, margin: 0}}
            showsUserLocation={true}
            region={{latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: .01, longitudeDelta: .01}}
            annotations={ annotations }
          />
        </TouchableWithoutFeedback>
        
        {this.renderLeavePackageButton()}

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
  console.log('landing page, mstp, state', state)
    return {
        showAddNodeModal: state.addNodeModal.showAddNodeModal
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        showModal: function(boolean){
            dispatch(showModal(boolean));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
