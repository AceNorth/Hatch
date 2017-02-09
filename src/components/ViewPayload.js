import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';

import { Card, CardSection, Button } from './common';
import { tunnelIP } from '../TUNNELIP';
import { pickupEgg } from '../reducers/eggs';

class ViewPayload extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewEgg: props.allEggs[props.selectedEgg],
      payloadImage: {},
    };
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

  onSubmitPickup() {
    const egg = this.state.viewEgg;
    egg.pickedUp = true;
    this.props.pickupEgg(egg);
  }

  render() {
    return (
      <Card>
        <CardSection style={{ flex: 1 }}>
          <Text style={styles.textHeader}> Here's your message! </Text>
        </CardSection>
        <CardSection>
          { this.onSubmitPickup() }
          <View style={styles.lineItems}>
            <View style={styles.item}>
              <Image style={styles.imageStyle} source={{ uri: this.state.payloadImage.uri }}></Image>
              <Text style={styles.text}>{ this.state.viewEgg.payload.text }</Text>
            </View>
          </View>
        </CardSection>
        <CardSection>
          <Button
            color="#517fa4"
            onPress={Actions.landingPage}
          >Go Back
          </Button>
        </CardSection>
      </Card>
    );
  };
}

const styles = {
  item: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    paddingTop: 20,
    paddingBottom: 20
  },
  lineItems: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 25,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    paddingLeft: 20,
    // color: '#fff',
    fontWeight: '600',
  },
  textHeader: {
    fontSize: 30,
    paddingTop: 50
  },
  imageStyle: {
    width: 200,
    height: 200,
    alignSelf: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f281',
    justifyContent: 'center',
  },
  managerStyle: {
    flexDirection: 'column',
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
