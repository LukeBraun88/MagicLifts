import { createStore, combineReducers } from 'redux';


import enhancer from './enhancer';
import session from './reducers/session';
import {currentLifts, shownLifts} from './reducers/lifts';
import graphData from './reducers/graphData'



// Define reducers in root reducer
const rootReducer = combineReducers({
    session,
    currentLifts,
    shownLifts,
    graphData
});

// Store config for export
const configureStore = preloadedState => createStore(rootReducer, preloadedState, enhancer);

export default configureStore;
