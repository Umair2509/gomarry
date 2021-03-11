import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
const appReducer = combineReducers({
  profileReducer,
});
const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
