import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Picker,
  TouchableHighlight,
  Switch,
} from 'react-native';
import { connect } from 'react-redux';
import { addEggToDbAndStore } from '../reducers/eggs';

import { CardSection, PurpleButton, OrangeButton, InputNoLabel } from './common';
import { showModal, showConfirm, setSubmittedEgg } from '../reducers/addNodeModal';
import { setAnnotation, clearAnnotation } from '../reducers/map';
import { tunnelIP } from '../TUNNELIP';

class AddEgg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      payloadText: '',
      payloadImage: '',
      payloadImageSource: { uri: `${tunnelIP}/addImageViolet.png` },
      payloadImageBuffer: null,
      eggs: [],
      recipient: this.props.friends[0].fbId,
      visibleOutsideFence: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmitNode = this.onSubmitNode.bind(this);
    this.onCancelSubmitNode = this.onCancelSubmitNode.bind(this);
    this.showImagePicker = this.showImagePicker.bind(this);
  }

  onSubmitNode() {
    const egg = {
      goHereText: this.state.text,
      latitude: this.props.annotation[0].latitude, // This is definitely a number
      longitude: this.props.annotation[0].longitude, // Also definitely a number
      payloadText: this.state.payloadText,
      payloadImage: this.state.payloadImageSource,
      payloadImageBuffer: this.state.payloadImageBuffer,
      senderId: this.props.senderId,
      recipient: this.state.recipient,
      visibleOutsideFence: this.state.visibleOutsideFence
    };

    // If user did not upload photos, make those fields blank
    if (!egg.payloadImageBuffer) { egg.payloadImage = null; }

    this.props.addEggToDbAndStore(egg);
    this.props.setSubmittedEgg(egg);
    this.setState({ text:'', payloadText: '', goHereText: '', recipient:this.props.friends[0].fbId});
    this.props.showModal(false);
    this.props.showConfirm(true);
    this.props.clearAnnotation();
  }

  onCancelSubmitNode() {
    this.setState({ text: '', payloadText: '', goHereText: '', recipient: this.props.friends[0] });
    this.props.showModal(false);
    this.props.clearAnnotation();
  }

  selectImageForPicker(type) {
    if (type === 'clue') {
      this.showImagePicker('clue');
    } else {
      this.showImagePicker('pay');
    }
  }

  showImagePicker(type) {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      },
      quality: 1,
      maxWidth: 125,
      maxHeight: 125,
    };

    const ImagePicker = require('react-native-image-picker');
    // const Platform = require('react-native').Platform;
    /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      let paySource, payBuffer;

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        if (type === 'pay') {
          // display the image using either data...
          paySource = { uri: `data:image/jpeg;base64${response.data}` };
          payBuffer = response.data;

          this.setState({
            payloadImageSource: paySource,
            payloadImageBuffer: payBuffer
          });
        }
      }
    });
  }

  handleInputChange(field, e) {
    this.setState({
      [field]: e });
  }

  renderEggTypeHeader() {
    if (this.state.visibleOutsideFence) {
      return (<Text style={{ paddingRight: 20, fontFamily: 'Heiti SC', fontSize: 14 }}>
        Show egg location
      </Text>);
    }
    return <Text style={{ paddingRight: 20, fontFamily: 'Heiti SC', fontSize: 14, fontStyle: 'italic' }}>Hide egg location</Text>;
  }

  toggleEggVisibility() {
    let visible = !this.state.visibleOutsideFence;
    this.setState({ visibleOutsideFence: visible });
  }

  render() {
    const { containerStyle, toggleVisibilitySection, friendPickerSection } = styles;
    return (
      <View style={containerStyle}>
        <View style={toggleVisibilitySection}>
          {this.renderEggTypeHeader()}
          <Switch
            onValueChange={value => this.setState({ visibleOutsideFence: value })}
            value={this.state.visibleOutsideFence}
          />
        </View>
        <CardSection>
          <View style={{ flexDirection: 'column', flex: 1, height: 50 }}>
            <Text style={{ fontFamily: 'Heiti SC' }}>Egg pick-up instructions</Text>
            <InputNoLabel
              placeholder="Where we first met <3"
              onChangeText={e => this.handleInputChange('text', e)}
              value={this.state.text}
            />
          </View>
        </CardSection>
        <CardSection>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text style={{ fontFamily: 'Heiti SC' }}>Secret message</Text>
            <InputNoLabel
              placeholder="You found me!"
              onChangeText={e => this.handleInputChange('payloadText', e)}
              value={this.state.payloadText}
            />
          </View>
          <TouchableHighlight
            onPress={() => this.selectImageForPicker('payload')}
            activeOpacity={0.8}
            underlayColor={'white'}
          >
            <Image
              source={this.state.payloadImageSource}
              style={{ width: 50, height: 50 }}
            />
          </TouchableHighlight>
        </CardSection>
        <View style={friendPickerSection}>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text style={{ fontFamily: 'Heiti SC' }}>Select recipient:</Text>
            <Picker
              selectedValue={this.state.recipient}
              onValueChange={friend => this.setState({ recipient: friend })}
            >
              {this.props.friends.map(friend => (<Picker.Item label={friend.name} value={friend.fbId} key={friend.fbId} />))}
            </Picker>
          </View>
        </View>
        <View style={toggleVisibilitySection}>
          <PurpleButton onPress={this.onSubmitNode}>Submit</PurpleButton>
          <OrangeButton onPress={this.onCancelSubmitNode}>Cancel</OrangeButton>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  cardSectionStyle: {
    flexDirection: 'row',
    flex: 1,
  },
  toggleVisibilitySection: {
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    borderRadius: 4,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  friendPickerSection: {
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    borderRadius: 4,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  textStyle: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 5,
    fontFamily: 'Heiti SC'
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  picker: {
    flex: 1,
  },
});


const mapStateToProps = state => ({
  showAddNodeModal: state.addNodeModal.showAddNodeModal,
  annotation: state.map.annotation,
  senderId: state.auth.fbId,
  friends: state.friends.allFriends,
});

const mapDispatchToProps = dispatch => ({
  showModal: function (boolean) {
    dispatch(showModal(boolean));
  },
  showConfirm: function (boolean) {
    dispatch(showConfirm(boolean));
  },
  setSubmittedEgg: function (egg) {
    dispatch(setSubmittedEgg(egg));
  },
  setAnnotation: function (annotation) {
    dispatch(setAnnotation(annotation));
  },
  clearAnnotation: function () {
    dispatch(clearAnnotation());
  },
  addEggToDbAndStore: function (egg) {
    dispatch(addEggToDbAndStore(egg));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddEgg);
