import { combineReducers } from 'redux'
//import reducers
import eggs from './eggs';
import addNodeModal from './addNodeModal';
import map from './map';



const rootReducer = combineReducers({eggs, addNodeModal, map})

export default rootReducer
