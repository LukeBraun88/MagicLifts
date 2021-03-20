import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import enhancer from './enhancer';
import session from './reducers/session';
import { currentLifts, shownLifts } from './reducers/lifts';
import graphData from './reducers/graphData'

const persistConfig = { // configuration object for redux-persist
    key: 'root',
    storage, // define which storage to use
}


// Define reducers in root reducer
const rootReducer = combineReducers({
    session,
    currentLifts,
    shownLifts,
    graphData
});

const persistedReducer = persistReducer(persistConfig, rootReducer) // create a persisted reducer

// Store config for export
export const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step
