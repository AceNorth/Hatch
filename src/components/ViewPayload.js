import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import { Card, CardSection, Button } from './common';
import { ViewPayloadCard } from './ViewPayloadCard';
import { ViewPayloadCardSection } from './ViewPayloadCardSection';
import { ModalButton } from './ModalButton';

import { tunnelIP } from '../TUNNELIP';
import { pickupEgg } from '../reducers/eggs';

// Fetches device height and width
let { height, width } = Dimensions.get('window');
const DEVICE_WIDTH = width;
const DEVICE_HEIGHT = height;

class ViewPayload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewEgg: props.allEggs[props.selectedEgg],
      payloadImage: {},
    };

    this.layout = this.layout.bind(this)
  }

  componentWillMount() {
    this.setState({ viewEgg: this.props.allEggs[this.props.selectedEgg] });

    let payloadImage2;
    axios.get(`${tunnelIP}/api/egg/payloadImage/${this.props.allEggs[this.props.selectedEgg].payloadId}`)
      .then(response => {
        payloadImage2 = response.data;
        this.setState({ payloadImage: payloadImage2 });
      });
  }

  onSubmitPickup(){
    let egg = this.state.viewEgg;
    egg.pickedUp = true;
    this.props.pickupEgg(egg);
  }

  layout(){
      //if payload has both a photo and text
      if(this.state.payloadImage.uri && this.state.viewEgg.payload.text){
          return(
            <ViewPayloadCardSection>
              { this.onSubmitPickup() }
              <View style={styles.imageAndText}>

                <View style={styles.item}>
                  <Image style={styles.imageStyle} source={{uri: this.state.payloadImage.uri}}></Image>
                </View>

                <View style={styles.item}>
                  <Text style={styles.textStyle}>{ this.state.viewEgg.payload.text }</Text>
                </View>

             </View>
            </ViewPayloadCardSection>
          )
      }
      //if payload only has a photo
      else if(this.state.payloadImage.uri && !this.state.viewEgg.payload.text){
          return(
              <ViewPayloadCardSection>
                  { this.onSubmitPickup() }
                  <View style={styles.imageOnly}>
                      <View>
                          <Image style={styles.imageOnlyStyle} source={{uri: this.state.payloadImage.uri}}></Image>
                      </View>
                  </View>
              </ViewPayloadCardSection>
          )
      }

     //if payload only has text
      else if(this.state.viewEgg.payload.text && !this.state.payloadImage.uri){
          return(
            <ViewPayloadCardSection>
              { this.onSubmitPickup() }
              <View style={styles.textOnly}>
                <View>
                  <Text style={styles.textOnlyStyle}>{ this.state.viewEgg.payload.text }</Text>
                </View>
              </View>
            </ViewPayloadCardSection>
          )
      }

     //if payload is empty
      else{
          return (
            <ViewPayloadCardSection>
              <View style={styles.textOnly}>
                <View>
                  <Text style={styles.textOnlyStyle}>Your "friend" sent you an empty egg!  What a jerk!</Text>
                </View>
              </View>
            </ViewPayloadCardSection>
          )
      }

  }

  render() {
    console.log(this.state.viewEgg)
    return (
      <ViewPayloadCard>
        <Text style={styles.textHeader}>Here's your message!</Text>
        <Text></Text>
          {this.layout()}

        <Text></Text>
        <Text></Text>

        <ModalButton
          onPress={Actions.landingPage}
        >Go Back
        </ModalButton>
      </ViewPayloadCard>
    );
  };
}

const styles = {
  imageAndText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
    // margin: 25,
  },
  item: {
    flex: 0.5,
    // paddingVertical: 40
  },
  imageStyle: {
    width: 160,
    height: 160,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 10
  },
  imageOnly: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20
    // paddingVertical: 40
  },
  imageOnlyStyle: {
    width: 260,
    height: 260,
  },
  textOnly: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20
  },
  textOnlyStyle:{
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    // marginHorizontal: 10
  },
  textHeader: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 50
  },
};

const mapStateToProps = (state, ownProps) => {
    const selectedEgg = state.eggs.selectedEgg;
    const allEggs = state.eggs.allEggs;
    return { selectedEgg, allEggs };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      pickupEgg: function(egg) {
        dispatch(pickupEgg(egg));
      },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPayload);
