import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = (props) => {
  const {onPress, children} = props;
  const {buttonStyle, textStyle} = styles;
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
    );
};

const styles = {
  buttonStyle: {
  //expand to fill as much content as it possibly can
    // flex: 1,
  //position itself using flexbox rules (stretch to fill the container)
    alignSelf: 'flex-start',
    backgroundColor: '#007aff',
    margin: 30,
    borderRadius: 4
    // marginLeft: 20,
    // marginRight: 20,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 20
  }
}

export { Button };