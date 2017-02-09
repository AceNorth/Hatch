import { combineReducers } from 'redux';

// Import reducers
import eggs from './eggs';
import addNodeModal from './addNodeModal';
import map from './map';
import auth from './auth';
import friends from './friends';

const rootReducer = combineReducers({ eggs, addNodeModal, map, auth, friends });

export default rootReducer;
