import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const InvisibleIcon = (props) => {
  const {onPress, children} = props;
  const {iconStyle, textStyle} = styles;
  return (
      <Icon 
        name='ios-pin'
        type= 'ionicon'
        color='#fff'
        size={50}
        onPress={onPress}
      />
    );
};

const styles = {
  iconStyle: {
  //expand to fill as much content as it possibly can
    // flex: 1,
  //position itself using flexbox rules (stretch to fill the container)
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    marginLeft: 20,
    marginRight: 20,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
}

export { InvisibleIcon };