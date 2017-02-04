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
    // console.log('PROPS: ', props)
    this.state = {
      showModal: false,
      selectedFriendId: -1,
      displayedEggIds: [],
      filterBy: 'all',
      chosenEgg: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    let displayedEggIds = [];
    // apply filters and set filtered egg IDs on local state
    switch (this.state.filterBy) {
      case 'all':
        Object.keys(nextProps.allEggs).map(eggId => {
          let egg = nextProps.allEggs[eggId];
          if (egg.senderId === nextProps.selectedFriendId || egg.receiverId === nextProps.selectedFriendId) {
            displayedEggIds.push(eggId);
          }
        });
        break;
      case 'sent':
        Object.keys(nextProps.allEggs).map(eggId => {
          let egg = nextProps.allEggs[eggId];
          if (egg.receiverId === nextProps.selectedFriendId) {
            displayedEggIds.push(eggId);
          }
        });
        break;
      case 'received':
        Object.keys(nextProps.allEggs).map(eggId => {
          let egg = nextProps.allEggs[eggId];
          if (egg.senderId === nextProps.selectedFriendId) {
            displayedEggIds.push(eggId);
          }
        });
        break;
      default:
        return;          
    };
    this.setState({selectedFriendID: nextProps.selectedFriendId, displayedEggIds});
  }

  onEggPress(egg) {
    this.props.setSelectedEgg(egg.id);
    this.setState({showModal: true, chosenEgg: this.props.allEggs[egg.id] });
  }

  onDelete() {
    // dispatch action to toggle "deleted by sender/receiver" on backend
    // action should take an eggId and the string "sender" or "receiver"?
  }

  onCancel() {
    this.setState({showModal: false});
  }

  renderPayload(egg) {
    if (!egg.payload) {return};
    let payloadType = egg.payload.type;
    
    switch (payloadType) {
      case 'Text':
        return (<Text> { egg.payload.text } </Text>)
      case 'Image':
        return (<View> { egg.payload.path } } </View>)
      default:
        return (<Text> Something has GONE WRONG </Text>)
    }
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
            <Text> GO HERE: {egg.goHereText} </Text>
          </CardSection>
          <CardSection>
            <Text> FROM: {egg.senderId} </Text>
          </CardSection>
          <CardSection>
            <Text> PAYLOAD: {egg.payload.text} </Text>
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
        {this.state.displayedEggIds.map(eggId => {
          let egg = this.props.allEggs[eggId];
          return this.renderEggCard(egg);
        })}
        <EggManagerModal
            visible={this.state.showModal}
            chosenEgg={this.state.chosenEgg}
            onDelete={this.onDelete.bind(this)}
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
            {this.renderPayload(this.state.chosenEgg)};
          
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