import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { AudioUtils, AudioPlayer } from 'react-native-audio';
import { Icon } from 'react-native-elements';

import { newRecording, stopPlay, startPlay, timeProgress } from '../reducers/audio';

class PlaybackMenu extends Component {
  componentDidMount() {
    // Event listener to keep track of time
    AudioPlayer.onProgress = data => { // data: currentDuration
      this.props.timeProgress(data.currentTime.toFixed(2));
    };

    // Event listener listens for when playing is done
    AudioPlayer.onFinished = data => { // data = {finished: true}
      this.props.stopPlay();
    };

    AudioPlayer.setProgressSubscription();
    AudioPlayer.setFinishedSubscription();
  }

  _togglePlayStop() {
    if (this.props.playing) {
      this.props.stopPlay();
      AudioPlayer.stop();
    } else {
      this.props.startPlay();
      AudioPlayer.playWithUrl(this.props.audioUrl);
    }
  }

  render() {
    return (
      <TouchableHighlight
      activeOpacity={0.8}
      underlayColor={'white'}
      style={smallButton}
      onPress={this._togglePlayStop.bind(this)}
      >
      {
        this.props.playing ?
          <Icon
            name="play"
            type="ionicon"
            color="#CD0240"
          /> :
          <Icon
            name="stop"
            type="ionicon"
            color="#CD0240"
          />
      }
      </TouchableHighlight>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  main: {
    flex: 4,
    alignItems: 'center',
  },
  footer: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  largeButton: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2
  },
  smallButton: {
    width: 70,
    height: 70,
    marginRight: 8

  },
});

const mapStateToProps = state => {
  const { playing, audioUrl } = state.audio;
  return { playing, audioUrl };
};

export default connect(mapStateToProps, {
  newRecording,
  stopPlay,
  startPlay,
  timeProgress
})(PlaybackMenu);
