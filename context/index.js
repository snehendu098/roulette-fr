import { combineReducers } from "redux";
import Counter from "./counterReducer";
import guesser from "./guesser";

const root = combineReducers({
  counter: Counter,
  state: guesser,
});

export default root;
