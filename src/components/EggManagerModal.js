import React from 'react';
import { Text, View, Modal, MapView } from 'react-native';
import { CardSection, PurpleButton, OrangeButton, InputNoLabel } from './common';

const EggManagerModal = ({ children, visible, onDelete, onCancel }) => {
  const { containerStyle, textStyle, cardSectionStyle } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          {children}
        </CardSection>

        <CardSection>
          <PurpleButton onPress={onDelete}>Delete Egg</PurpleButton>
          <OrangeButton onPress={onCancel}>Done</OrangeButton>
        </CardSection>
      </View>
    </Modal>
  );
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

export default EggManagerModal;