import React, { Component } from 'react';
import { Text, View, Modal, MapView } from 'react-native';
import { CardSection, Button } from './common';
import { showConfirm } from '../reducers/addNodeModal';
import { connect } from 'react-redux';

class EggConfirmationModal extends Component {
  constructor(props) {
    super(props);
  }

  onConfirm() {
    this.props.showConfirm(false);
  }

  render() {
    const { containerStyle, textStyle, cardSectionStyle } = styles;

    return (
        <View style={containerStyle}>
          <Text style={textStyle}> YOU LEFT AN EGG! </Text>

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
  selectedEgg: state.eggs.selectedEgg
});

const mapDispatchToProps = dispatch => ({
  showConfirm: function (boolean) {
    dispatch(showConfirm(boolean));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EggConfirmationModal);