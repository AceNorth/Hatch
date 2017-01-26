'use strict';


var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;

exports.examples = [
  {
    title: 'navigator.geolocation',
    render: function(): React.Element<any> {
      return <GeolocationExample />;
    },
  }
];

export default class LocationDisplay extends React.Component {
  state = {
    currentPosition: {coords: { latitude: 1, longitude: 1}}
  };

  componentDidMount() {
  	this.updateCurrentPosition();
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     var initialPosition = JSON.stringify(position);
    //     this.setState({initialPosition});
    //   },
    //   (error) => alert(JSON.stringify(error)),
    //   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    // );

    this.timerID = setInterval(
      () => this.updateCurrentPosition(),
      5000
    );
  }

  updateCurrentPosition() {
  	navigator.geolocation.getCurrentPosition(
  		(position) => {
  		console.log(position);
  		this.setState({currentPosition: position})
  	}
	  	);
  }

  render() {
    return (
      <View>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          <Text> X: {this.state.currentPosition.coords.latitude} </Text>
          <Text> Y: {this.state.currentPosition.coords.longitude} </Text>
          <Text> Timestamp: {this.state.currentPosition.timestamp} </Text>
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});