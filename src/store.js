import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers/rootReducer'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// from the redux-logger docs: Logger must be the last middleware in chain,
// otherwise it will log thunk and promise, not actual actions
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(createLogger(), thunkMiddleware)))


// Dont commit comments. We have git :)
// const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store

