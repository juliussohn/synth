import { createStore, combineReducers } from 'redux'
import reducers from '../reducers/reducers.js'
import { loadState, saveState } from '../localStorage.js'
const persistedState = loadState();

export const store = createStore(
    combineReducers({
        state: reducers
    }),
   // persistedState
)

/*
store.subscribe(() => {
    console.log(store.getState())
    const currentState =  store.getState();
    saveState(store.getState());
});
 */