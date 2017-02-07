import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { Icon } from 'react-native-elements';

import { startRecording, stopRecording, timeProgress, recordingFinished } from '../reducers/audio';

class RecordAudio extends Component {
  componentDidMount() {
    // Determines where the audio file will be stored
    const audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';

    this.props.prepareRecordingPath(audioPath);

    // Event listener to keep track of time
    AudioRecorder.onProgress = (data) => {
      this.props.timeProgress(data.currentTime.toFixed(2));
    };

    // Event listener listens for when recording is done
    AudioRecorder.onFinished = (data) => {
      this.props.recordingFinished(data.audioFileURL);
      console.log(`Finished recording: ${data.audioFileURL}`);
    };
  }

  onPressIn() {
    console.log('starting to record');
    AudioRecorder.startRecording();
    this.props.startRecording();
  }

  onPressOut() {
    console.log('stopped recording');
    AudioRecorder.stopRecording();
    this.props.stopRecording();
  }

  render() {
    return (
      <TouchableHighlight
        onPressIn={() => this.onPressIn()}
        onPressOut={() => this.onPressOut()}
      >
        <View>
          <Icon
            name="ios-mic"
            type="ionicon"
            color="#CD0240"
          />
        </View>
      </TouchableHighlight>
    );
  }
}

const mapStateToProps = (state) => {
  const { recording } = state.audio;
  return {
    prepareRecordingPath: (audioPath) => {
      AudioRecorder.prepareRecordingAtPath(audioPath, { AudioEncoding: 'aac' });
    },
    recording
  };
};

RecordAudio.propTypes = {
  recording: PropTypes.bool,
  startRecording: PropTypes.func,
  stopRecording: PropTypes.func,
  timeProgress: PropTypes.func,
  recordingFinished: PropTypes.func,
  prepareRecordingPath: PropTypes.func,
};

export default connect(mapStateToProps, {
  startRecording,
  stopRecording,
  timeProgress,
  recordingFinished
})(RecordAudio);
