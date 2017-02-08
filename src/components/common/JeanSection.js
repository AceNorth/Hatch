import React from 'react';
import { View } from 'react-native';

const JeanSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    borderRadius: 4,
    alignItems: 'stretch',
  }
};

export { JeanSection };
