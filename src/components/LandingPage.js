'use strict';

import React, { Component } from 'react';
import { View, Text, StyleSheet, MapView, TextInput, TouchableWithoutFeedback } from 'react-native';
import { Button } from './common';
import  AddNodeForm  from './AddNodeForm';
import { connect } from 'react-redux';
import axios from 'axios';


class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPosition: { timestamp: 0, coords: { latitude: 1, longitude: 1 } },
      showAddNodeModal: false,
      annotations: [],
	text: 'placeholder'
    };

    this.onButtonPress = this.onButtonPress.bind(this);
    this.onSubmitNode = this.onSubmitNode.bind(this);
    this.onCancelSubmitNode = this.onCancelSubmitNode.bind(this);
    this.onMapLongPress = this.onMapLongPress.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this); 
}

  componentDidMount() {
    this.updateCurrentPosition();
  }

  onButtonPress() {
    this.setState({showAddNodeModal: true})
  }

  onAddNodeButtonPress() {
    console.log("LEAVING A PACKAGE AT X: ", this.state.annotations[0].longitude);
    console.log("LEAVING A PACKAGE AT Y: ", this.state.annotations[0].latitude);
  }

  onSubmitNode() {
    console.log("submitted");
    //send data to DB
      const message = {goHereText: this.state.text}
    axios.post('http://localhost:1333/api/message', message);
    this.setState({ showAddNodeModal: false });
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

  renderLeavePackageButton() {
    if (this.state.annotations.length) {
      return (
        <Button onPress={this.onAddNodeButtonPress.bind(this)}>
        Leave a package at the current pin
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

        <Button onPress={this.onButtonPress.bind(this)}>
        See an example modal
        </Button>
        
        {this.renderLeavePackageButton()}

        <AddNodeForm
          visible={ this.state.showAddNodeModal }
          onSubmitNode={ this.onSubmitNode }
          onCancelSubmitNode={ this.onCancelSubmitNode }
          handleInputChange={this.handleInputChange}
          {...this.state}
        >
          HAHAHAHA
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
    return {
    };
}



const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addUToDb: function(user){
            dispatch(addUToDb(user));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
