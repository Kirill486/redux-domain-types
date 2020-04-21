import { createStore, combineReducers } from "redux";
import { regularEntityReducer } from "./reducer";

const reducer = combineReducers({
  regular: regularEntityReducer,
});

export const store = createStore(reducer);