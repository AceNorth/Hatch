import React from 'react';
import {View} from 'react-native';

const EggManagerCard = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    // borderWidth: 1,
    // borderRadius: 2,
    // borderColor: '#ddd',
    // borderBottomWidth: 0,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
    marginHorizontal: 10,
    marginVertical: 15,
  }
}

export { EggManagerCard };