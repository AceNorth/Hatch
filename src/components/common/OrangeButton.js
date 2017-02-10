import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const OrangeButton = (props) => {
  const { onPress, children } = props;
  const { buttonStyle, textStyle } = styles;
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
    alignSelf: 'stretch',
    backgroundColor: '#f8981d',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'Heiti SC'
  }
}

export { OrangeButton };
