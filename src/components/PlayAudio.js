import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements';

import { resetAudioState, stopPlay, startPlay, timeProgress } from '../reducers/audio';

class PlaybackMenu extends Component {
  componentDidMount() {
    if (this.props.payloadAudioUrl) {
      this.clip = new Sound('clip.aac', Sound.DOCUMENT, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        } else { // loaded successfully
          console.log('yay loaded the sound');
        }
      });
    } else {
      this.clip = new Sound('test.aac', Sound.DOCUMENT, (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        } else { // loaded successfully
          console.log('yay loaded the sound');
        }
      });
    }
  }

  componentWillUnmount() {
    this.clip.release();
  }

  _togglePlayStop() {
    if (this.props.playing) {
      this.props.stopPlay();
      this.clip.pause();
    } else {
      this.props.startPlay();
      this.clip.play((success) => {
        success ? this.props.stopPlay() : console.log('playback failed due to audio decoding errors');
      });
    }
  }

  render() {
    return (
      <TouchableHighlight
        activeOpacity={0.8}
        underlayColor={'white'}
        onPress={this._togglePlayStop.bind(this)}
      >
        <View>
          {
            this.props.playing ?
              <Icon
                name="ios-pause"
                type="ionicon"
                color="#CD0240"
              /> :
              <Icon
                name="ios-play"
                type="ionicon"
                color="#CD0240"
              />
          }
        </View>
      </TouchableHighlight>

    );
  }
}

const mapStateToProps = state => {
  const { playing, audioUrl } = state.audio;
  return { playing, audioUrl };
};

export default connect(mapStateToProps, {
  resetAudioState,
  stopPlay,
  startPlay,
  timeProgress
})(PlaybackMenu);
