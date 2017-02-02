import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableOpacity, MapView } from 'react-native';
import { Card, CardSection } from './common';
import { setSelectedEgg } from '../reducers/eggs';
import EggManagerModal from './EggManagerModal';


class EggManager extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      chosenEgg: {}
    }
  }

  onEggPress(egg) {
    this.props.setSelectedEgg(egg.id);
    this.setState({showModal: true, chosenEgg: this.props.allEggs[egg.id] });
  }

  onViewPayload() {
    this.setState({showModal: false});
    Actions.viewPayload();
  }

  onCancel() {
    this.setState({showModal: false});
  }

  renderEggCard(egg) {
    let displayDate = new Date(Date.parse(egg.createdAt)).toString().split(" ").slice(0,4).join(" ");
    return (
      <TouchableOpacity 
        key={egg.id} 
        onLongPress={() => this.onEggPress(egg)}
      >
        <Card>
          <CardSection>
            <Text> EGG ID: {egg.id} </Text>
          </CardSection>
          <CardSection>
            <Text> FROM: {egg.senderId} </Text>
          </CardSection>
          <CardSection>
            <Text> CREATED ON: {displayDate} </Text>
          </CardSection>
        </Card>
      </TouchableOpacity>
      )
  }

  render() {
    const { container, text } = styles;
    return (
      <View style={container}>
        {Object.keys(this.props.allEggs).map(key => {
          let egg = this.props.allEggs[key];
          return this.renderEggCard(egg);
        })}
        <EggManagerModal
            visible={this.state.showModal}
            chosenEgg={this.state.chosenEgg}
            onViewPayload={this.onViewPayload.bind(this)}
            onCancel={this.onCancel.bind(this)}
            >
            
            <MapView
            style={{height: 250, width: 250, margin: 0}}
            showsUserLocation={false}
            region={{latitude: this.state.chosenEgg.latitude, longitude: this.state.chosenEgg.longitude, latitudeDelta: .01, longitudeDelta: .01}}
              annotations={[{
                longitude: this.state.chosenEgg.longitude,
                latitude: this.state.chosenEgg.latitude,
                tintColor: MapView.PinColors.PURPLE,
                draggable: false 
              }]}
            />
            <Text> {this.state.chosenEgg.goHereText} </Text>
          
        </EggManagerModal>
      </View>
    );
  };
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#f4f281',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
    color: '#fff',
    fontWeight: '600',
  }
};

const mapStateToProps = (state, ownProps) => { 
  const allEggs = state.eggs.allEggs;
  return { allEggs }; 
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSelectedEgg: function(eggId) {
        dispatch(setSelectedEgg(eggId));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EggManager);