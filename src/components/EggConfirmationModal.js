import React, { Component } from 'react';
import { Text, View, Modal, MapView } from 'react-native';
import { CardSection, PurpleButton, OrangeButton, InputNoLabel } from './common';
import { showConfirm, setSubmittedEgg } from '../reducers/addNodeModal';
import { connect } from 'react-redux';

class EggConfirmationModal extends Component {
  onConfirm() {
    this.props.showConfirm(false);
    this.props.setSubmittedEgg({});
  }

  render() {
    const { containerStyle, textStyle, cardSectionStyle } = styles;
    const egg = this.props.submittedEgg

    return (
        <View style={containerStyle}>
          <CardSection>
            <Text style={textStyle}> EGG HIDDEN! </Text>
          </CardSection>
          <CardSection>
            <View style={styles.mapStyle} >
              <MapView
              style={{height: 250, width: 200, margin: 0}}
              showsUserLocation={false}
              region={{latitude: egg.latitude, longitude: egg.longitude, latitudeDelta: .01, longitudeDelta: .01}}
                annotations={[{
                  longitude: egg.longitude,
                  latitude: egg.latitude,
                  tintColor: MapView.PinColors.PURPLE,
                  draggable: false 
                }]}
              />
            </View>
          </CardSection>
          <CardSection>
            <Text style={textStyle}> {this.props.submittedEgg.goHereText}</Text>
          </CardSection>
          <CardSection>
            <PurpleButton onPress={this.onConfirm.bind(this)}>Great!</PurpleButton>
          </CardSection>
        </View>
    );
  }
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  }
};

const mapStateToProps = state => ({
  showConfirmationModal: state.addNodeModal.showConfirmationModal,
  submittedEgg: state.addNodeModal.submittedEgg
});

const mapDispatchToProps = dispatch => ({
  showConfirm: function (boolean) {
    dispatch(showConfirm(boolean));
  },
  setSubmittedEgg: function (egg) {
    dispatch(setSubmittedEgg(egg));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EggConfirmationModal);