import { createStore, combineReducers } from "redux";
import reducers from "../reducers/reducers.js";
import { loadState, saveState } from "../localStorage";

const keepState = false;
let _store;
if (keepState) {
	const persistedState = loadState();

	_store = createStore(
		combineReducers({
			state: reducers,
		}),
		persistedState
	);

	_store.subscribe(() => {
		console.log(store.getState());
		//const currentState = store.getState();
		saveState(store.getState());
	});
} else {
	_store = createStore(
		combineReducers({
			state: reducers,
		})
	);
}

export const store = _store;
