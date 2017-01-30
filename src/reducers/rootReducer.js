import { combineReducers } from 'redux'
//import reducers
import eggs from './eggs';
import addNodeModal from './addNodeModal';



const rootReducer = combineReducers({eggs, addNodeModal})

export default rootReducer
