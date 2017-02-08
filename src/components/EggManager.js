import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { View, Text, TouchableOpacity, MapView, ScrollView, Picker, Dimensions } from 'react-native';
import { Card, CardSection, JeanSection } from './common';
import { setSelectedEgg, deleteEgg } from '../reducers/eggs';
import EggManagerModal from './EggManagerModal';
import { LoginButton } from 'react-native-fbsdk';


class EggManager extends Component {
  constructor(props) {
    super(props);
    // console.log('PROPS: ', props)
    this.state = {
      showModal: false,
      displayedEggIds: [],
      chosenEgg: {},
      currentlyShowing: 'all'
    };
  }

  componentWillMount() {
    this.changeDisplayedEggs('all');
  }

  changeDisplayedEggs(filter) {
    let displayedEggIds = [];
    // apply filters and set filtered egg IDs on local state
    switch (filter) {
      case 'all':
        Object.keys(this.props.allEggs).map(eggId => {
          let egg = this.props.allEggs[eggId];
          if (egg.senderId == this.props.selectedFriendId && !egg.deletedByReceiver) {
            displayedEggIds.push(eggId);
          }
          if (egg.receiverId == this.props.selectedFriendId && !egg.deletedBySender) {
            displayedEggIds.push(eggId);
          }
        });
        break;
      case 'sent':
        Object.keys(this.props.allEggs).map(eggId => {
          let egg = this.props.allEggs[eggId];
          if (egg.receiverId == this.props.selectedFriendId && !egg.deletedBySender) {
            displayedEggIds.push(eggId);
          }
        });
        break;
      case 'received':
        Object.keys(this.props.allEggs).map(eggId => {
          let egg = this.props.allEggs[eggId];
          if (egg.senderId == this.props.selectedFriendId && !egg.deletedByReceiver) {
            displayedEggIds.push(eggId);
          }
        });
        break;
      default:
        return;
    };
    this.setState({displayedEggIds});
  }

  onEggPress(egg) {
    this.setState({showModal: true, chosenEgg: this.props.allEggs[egg.id] });
  }

  onDelete() {
    // our delete function is a little weird and an antipattern I think
    // because we don't want to delete eggs from the database
    // so we're actually UPDATING the egg to SAY it's been deleted,
    // and by whom.
    if (this.state.chosenEgg.senderId === this.state.selectedFriendId) {
      this.state.chosenEgg.deletedByReceiver = true;
    } else {
      this.state.chosenEgg.deletedBySender = true;
    }

    this.props.deleteEgg(this.state.chosenEgg);
    this.setState({chosenEgg: {}, showModal: false});
  }

  onCancel() {
    this.setState({showModal: false});
  }

  renderPayload(egg) {
    const { container, text } = styles;

    if (!egg.payload) {return};
    let payloadType = egg.payload.type;

    switch (payloadType) {
      case 'Text':
        return (<Text style={styles.textStyle}> { egg.payload.text } </Text>)
      case 'Image':
        return (<View> { egg.payload.path } </View>);
      default:
        return (<Text> Something has GONE WRONG </Text>);
    }
  }


  renderEggCard(egg) {
    let displayDate = new Date(Date.parse(egg.createdAt)).toString().split(" ").slice(0,4).join(" ");
    let displayColor = (egg.pickedUp) ? "#8db7fc" : "#2f7efc";
    return (
      <TouchableOpacity
        key={egg.id}
        onLongPress={() => this.onEggPress(egg)}
        style={{ backgroundColor: displayColor }}
      >
        <Card>
          <View style={styles.eggCard}>
            <View style={styles.oneLine}>
              <Text style={styles.boldText}>Instructions:  </Text>
              <Text style={styles.text}>{egg.goHereText}</Text>
            </View>
            <View style={styles.oneLine}>
              <Text style={styles.boldText}>To:  </Text>
              <Text style={styles.text}>{egg.receiver.firstName + " " + egg.receiver.lastName}</Text>
            </View>
            <View style={styles.oneLine}>
              <Text style={styles.boldText}>From:  </Text>
              <Text style={styles.text}>{egg.sender.firstName + " " + egg.sender.lastName}</Text>
            </View>
            <View style={styles.oneLine}>
              <Text style={styles.boldText}>Message:  </Text>
              <Text style={styles.text}>{egg.payload.text}</Text>
            </View>
            <View style={styles.oneLine}>
              <Text style={styles.boldText}>Sent:  </Text>
              <Text style={styles.text}>{displayDate}</Text>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
      )
  }

  onPickerChange(filter) {
    this.setState({currentlyShowing: filter})
    this.changeDisplayedEggs(filter);
    this.forceUpdate();
  }

  render() {
    const { container, text } = styles;
    return (
      <View style={{flex:1}}>
      <Picker
        selectedValue={this.state.currentlyShowing}
        onValueChange={filter => this.onPickerChange(filter)}>
        <Picker.Item label="All eggs" value="all" />
        <Picker.Item label="Sent eggs" value="sent" />
        <Picker.Item label="Received eggs" value="received" />
      </Picker>
      <ScrollView >
        {this.state.displayedEggIds.map(eggId => {
          let egg = this.props.allEggs[eggId];
          return this.renderEggCard(egg);
        })}
        <View style={styles.managerStyle}>
            <EggManagerModal
                visible={this.state.showModal}
                chosenEgg={this.state.chosenEgg}
                onDelete={this.onDelete.bind(this)}
                onCancel={this.onCancel.bind(this)}
                >
              <View style={styles.lineItems}>
                  <View style={styles.mapStyle} >
                    <MapView
                    style={{ height: 250, width: 200, margin: 0 }}
                    showsUserLocation={false}
                    region={{ latitude: this.state.chosenEgg.latitude, longitude: this.state.chosenEgg.longitude, latitudeDelta: .01, longitudeDelta: .01 }}
                      annotations={[{
                        longitude: this.state.chosenEgg.longitude,
                        latitude: this.state.chosenEgg.latitude,
                        tintColor: MapView.PinColors.PURPLE,
                        draggable: false
                      }]}
                    />
                  </View>

                  <View style={styles.payStyle}>
                    {this.renderPayload(this.state.chosenEgg)}
                  </View>
              </View>
            </EggManagerModal>
        </View>

        <View>
          <Text></Text>
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
      </ScrollView>
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
  eggCard: {
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    flexDirection: 'column',
    borderColor: '#ddd',
    position: 'relative',
    borderRadius: 4,
    alignItems: 'stretch',
  },
  oneLine: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 3,
  },
  text: {
    textAlign: 'left',
    fontSize: 16,
    color: '#000',
    fontWeight: '200',
    flex: 1,
  },
  boldText: {
    textAlign: 'left',
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  managerStyle: {
    flexDirection: 'column',
  },
  lineItems: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
  },
  mapSytle: {
    flex: 1,
  },
  paySytle: {
    flex: 1,
  },
  textStyle: {
    paddingTop: 20,
    fontWeight: 'bold',
    fontSize: 16
  },
  loginButton: {
    height: 30,
    width: 200,
    alignSelf: 'center'
  },
};

const mapStateToProps = (state, ownProps) => {
  const allEggs = state.eggs.allEggs;
  const selectedFriendId = state.friends.selectedFriendId;
  return { allEggs, selectedFriendId };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setSelectedEgg: function(eggId) {
      dispatch(setSelectedEgg(eggId));
      },
    deleteEgg: function(egg) {
      dispatch(deleteEgg(egg));
    },
    whoami: (user) => {
      dispatch(whoami(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EggManager);
