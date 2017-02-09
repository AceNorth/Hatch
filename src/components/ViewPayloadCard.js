import React from 'react';
import {View} from 'react-native';

const ViewPayloadCard = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
    );
};

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3a3c82'
  }
}

export { ViewPayloadCard };