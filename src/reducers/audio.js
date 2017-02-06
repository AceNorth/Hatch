

/* --------------    ACTION CONSTANTS    ---------------- */

const NEW_RECORDING = 'NEW_RECORDING';
const START_RECORDING = 'START_RECORDING';
const STOP_RECORDING = 'STOP_RECORDING';
const TIME_PROGRESS = 'TIME_PROGRESS';
const RECORDING_FINISHED = 'RECORDING_FINISHED';
const START_PLAY = 'START_PLAY';
const STOP_PLAY = 'STOP_PLAY';

/* --------------    ACTION CREATORS    ----------------- */

export const newRecording = () => {
  return {
    type: NEW_RECORDING,
  };
};

export const startRecording = () => {
  return {
    type: START_RECORDING,
  };
};

export const stopRecording = () => {
  return {
    type: STOP_RECORDING,
  };
};

export const recordingFinished = audioUrl => {
  return {
    type: RECORDING_FINISHED,
    audioUrl
  };
};

export const startPlay = () => {
  return {
    type: START_PLAY,
  };
};

export const stopPlay = () => {
  return {
    type: STOP_PLAY,
  };
};

export const timeProgress = currentTime => {
  return {
    type: TIME_PROGRESS,
    currentTime
  };
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
      newState.currentTime = 0.0;
      break;
    default:
      return prevState;
  }
  return newState;
};
