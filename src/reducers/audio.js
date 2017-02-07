import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';

const Blob = RNFetchBlob.polyfill.Blob;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

/* --------------    ACTION CONSTANTS    ---------------- */

const NEW_RECORDING = 'NEW_RECORDING';
const START_RECORDING = 'START_RECORDING';
const STOP_RECORDING = 'STOP_RECORDING';
const TIME_PROGRESS = 'TIME_PROGRESS';
const RECORDING_FINISHED = 'RECORDING_FINISHED';
const START_PLAY = 'START_PLAY';
const STOP_PLAY = 'STOP_PLAY';

/* --------------    ACTION CREATORS    ----------------- */

export const newRecording = () => ({ type: NEW_RECORDING });
export const startRecording = () => ({ type: START_RECORDING });
export const stopRecording = () => ({ type: STOP_RECORDING });
export const startPlay = () => ({ type: START_PLAY });
export const stopPlay = () => ({ type: STOP_PLAY });

export const recordingFinished = audioUrl => ({
  type: RECORDING_FINISHED,
  audioUrl
});

export const timeProgress = currentTime => ({
  type: TIME_PROGRESS,
  currentTime
});

// Helper function!
export const uploadAudioFile = audioUrl => {
  // Get a reference to audio folder in Firebase storage
  const filename = `${Date.now()}.aac`; //
  const clipRef = firebase.storage().ref().child('audio').child(filename);

  const filepath = audioUrl.slice(7);
  const rnfbURI = RNFetchBlob.wrap(filepath);

  // create Blob from file path
  return Blob.build(rnfbURI, { type: 'audio/aac;' })
    .then(blob => {
      return clipRef.put(blob, { contentType: 'audio/aac' }) // upload image using Firebase SDK
        .then(snapshot => {
          console.log('Uploaded audio file to Firebase storage.');
          blob.close();
        })
        .then(() => clipRef)
        .catch(err => {
          console.error('Upload failed:', err);
        });
    })
    .catch(err => {
      console.error('func uploadAudioMsg failed:', err);
    });
};

/* ------------------    REDUCER    --------------------- */

const audioInitialState = {
  currentTime: 0.0,
  recording: false,
  stoppedRecording: false,
  stoppedPlaying: false,
  playing: false,
  audioUrl: ''
};

export default (prevState = audioInitialState, action) => {
  const newState = Object.assign({}, prevState);

  switch (action.type) {
    case NEW_RECORDING:
      return audioInitialState;
    case START_RECORDING:
      newState.recording = true;
      newState.stoppedRecording = false;
      break;
    case STOP_RECORDING:
      newState.recording = false;
      newState.stoppedRecording = true;
      newState.currentTime = 0.0;
      break;
    case TIME_PROGRESS:
      newState.currentTime = action.currentTime;
      break;
    case RECORDING_FINISHED:
      newState.audioUrl = action.audioUrl;
      break;
    case START_PLAY:
      newState.playing = true;
      newState.stoppedPlaying = false;
      break;
    case STOP_PLAY:
      newState.playing = false;
      newState.stoppedPlaying = true;
      break;
    default:
      return prevState;
  }
  return newState;
};
