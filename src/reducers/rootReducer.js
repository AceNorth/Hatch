import { combineReducers } from 'redux';
// import reducers
import eggs from './eggs';
import addNodeModal from './addNodeModal';
import map from './map';
import auth from './auth';

const rootReducer = combineReducers({ eggs, addNodeModal, map, auth });

export default rootReducer;
