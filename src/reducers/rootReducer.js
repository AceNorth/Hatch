import { combineReducers } from 'redux';
// import reducers
import eggs from './eggs';
import addNodeModal from './addNodeModal';
import map from './map';
import auth from './auth';
import friends from './friends';
import audio from './audio';

const rootReducer = combineReducers({ eggs, addNodeModal, map, auth, friends, audio });

export default rootReducer;
