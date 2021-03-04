import { createStore, combineReducers } from 'redux';


import enhancer from './enhancer';
import session from './reducers/session';
import currentLifts from './reducers/lifts';



// Define reducers in root reducer
const rootReducer = combineReducers({
    session,
    currentLifts
});

// Store config for export
const configureStore = preloadedState => createStore(rootReducer, preloadedState, enhancer);

export default configureStore;
