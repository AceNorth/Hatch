import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import { Card, CardSection, Button } from './common';
import { ViewPayloadCard } from './ViewPayloadCard';
import { ViewPayloadCardSection } from './ViewPayloadCardSection';
import { ModalButton } from './ModalButton'

import PlayAudio from './PlayAudio';
import { tunnelIP } from '../TUNNELIP';
import { pickupEgg } from '../reducers/eggs';
import { fetchAudio } from '../reducers/audio';

// Fetches device height and width
let { height, width } = Dimensions.get('window');
const DEVICE_WIDTH = width;
const DEVICE_HEIGHT = height;

class ViewPayload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewEgg: props.allEggs[props.selectedEgg],
      // goHereImage:{},
      payloadImage:{}
    }
  }

  componentWillMount(){
    this.setState({viewEgg: this.props.allEggs[this.props.selectedEgg]})
      // let goHereImage2;
      // axios.get(`${tunnelIP}/api/egg/goHereImage/`+ this.props.selectedEgg)
      //     .then(response => {
      //         goHereImage2 = response.data;
      //         this.setState({goHereImage: goHereImage2});
      //     })
         
      let payloadImage2;
      axios.get(`${tunnelIP}/api/egg/payloadImage/`+ this.props.allEggs[this.props.selectedEgg].payloadId)
        .then(response => {
          payloadImage2 = response.data;
          this.setState({ payloadImage: payloadImage2 });
        });
  }

  onSubmitPickup(){
    let egg = this.state.viewEgg
    // this.state.viewEgg.pickedUp = true;
    this.props.pickupEgg(this.state.viewEgg)
  }

  render() {
    return (
      <ViewPayloadCard>
        <Text style={styles.textHeader}>Here's your message!</Text>
        <Text></Text>

        <ViewPayloadCardSection>
          { this.onSubmitPickup() }
          <View style={styles.lineItems}>
            {/*<View style={styles.item}>*/}
              {/*<Image style={styles.imageStyle} source={{uri: this.state.goHereImage.uri}}></Image>*/}
              {/*<Text style={styles.text}>{ this.state.viewEgg.goHereText }</Text>*/}
            {/*</View>*/}
            
            <View style={styles.item}>
              <Image style={styles.imageStyle} source={{uri: this.state.payloadImage.uri}}></Image>
            </View>

            <View style={styles.item}>
              <Text style={styles.text}>{ this.state.viewEgg.payload.text }</Text>
            </View>

          </View>
        </ViewPayloadCardSection>

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
  lineItems: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 25,
  },
  item: {
    flex: 0.5,
    paddingVertical: 40
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 5,
    fontWeight: '600',
  },
  textHeader: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    paddingTop: 50
  },
  imageStyle: {
    width: 80,
    height: 80
  }
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
      fetchAudio: function(audioUrl) {
        dispatch(fetchAudio(audioUrl));
      }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewPayload);
