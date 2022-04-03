import { combineReducers } from "redux";
import Counter from "./rootReducer";

const root = combineReducers({
  counter: Counter,
});

export default root;
