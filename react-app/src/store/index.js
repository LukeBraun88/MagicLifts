import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import expireReducer from 'redux-persist-expire'
import { REHYDRATE, PURGE, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import enhancer from './enhancer';
import session from './reducers/session';
import { currentLifts, shownLifts } from './reducers/lifts';
import graphData from './reducers/graphData'
import selectedLifts from "./reducers/selected"
import clickedLiftIds from "./reducers/clicked"

const persistConfig = { // configuration object for redux-persist
    key: 'root',
    storage, // define which storage to use
    // stateReconciler: autoMergeLevel2
}


// Define reducers in root reducer
const rootReducer = persistCombineReducers(
    persistConfig,
    session,
    currentLifts,
    shownLifts,
    graphData,
    selectedLifts,
    clickedLiftIds,
);

const persistedReducer = persistReducer({
    transforms: [
        expireReducer('rootReducer', {
            expireSeconds: 60
        })
    ]
}, rootReducer) // create a persisted reducer

// Store config for export
export const store = createStore(persistedReducer, enhancer);

export const persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step
