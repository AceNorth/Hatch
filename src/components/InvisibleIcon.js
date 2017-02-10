import React from 'react';
import { Icon } from 'react-native-elements';

const InvisibleIcon = (props) => {
  const { onPress, children } = props;
  const { iconStyle, textStyle } = styles;
  return (
    <Icon
      name="ios-pin"
      type="ionicon"
      color="#3a3c82"
      size={60}
      onPress={onPress}
    />
  );
};

const styles = {
  iconStyle: {
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
};

export { InvisibleIcon };
