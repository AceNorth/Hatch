import React, { Component } from 'react';
import { Text, View, Modal, MapView } from 'react-native';
import { CardSection, Button } from './common';
import { showConfirm, setSubmittedEgg } from '../reducers/addNodeModal';
import { connect } from 'react-redux';

class EggConfirmationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      egg: props.selectedEgg
    }
  }

  onConfirm() {
    this.props.showConfirm(false);
    this.props.setSubmittedEgg({});
  }

  render() {
    const { containerStyle, textStyle, cardSectionStyle } = styles;

    return (
        <View style={containerStyle}>
          <CardSection>
            <Text style={textStyle}> YOU LEFT AN EGG! </Text>
          </CardSection>
          <CardSection>
            <Text style={textStyle}> {this.props.submittedEgg.payloadText} </Text>
          </CardSection>
          <CardSection>
            <Button onPress={this.onConfirm.bind(this)}>Great!</Button>
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
  selectedEgg: state.addNodeModal.submittedEgg
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