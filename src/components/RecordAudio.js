import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { Icon } from 'react-native-elements';

import { startRecording, stopRecording, timeProgress, recordingFinished } from '../reducers/audio';

class RecordAudio extends Component {
  componentDidMount() {
    // Determines where the audio file will be stored
    const audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';

    // prepareRecordingPath is passed from RecordView.js
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
    AudioRecorder.startRecording();
    this.props.startRecording();
  }

  onPressOut() {
    AudioRecorder.stopRecording();
    this.props.stopRecording();
  }

  render() {
    const { container, buttonActive, button } = styles;
    return (
      <View style={container}>
        <TouchableHighlight
          style={this.props.recording ? buttonActive : button}
          onPressIn={this.onPressIn.bind(this)}
          onPressOut={this.onPressOut.bind(this)}
        >
          <View>
            <Icon
              name="ios-mic"
              type="ionicon"
              color="#CD0240"
              onPress={() => {}}
            />
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  buttonActive: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
});

const mapStateToProps = state => {
  const { recording } = state.audio;
  return { recording };
};

export default connect(mapStateToProps, {
  startRecording,
  stopRecording,
  timeProgress,
  recordingFinished
})(RecordAudio);
