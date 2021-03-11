import { SET_PROFILE_COMPLETED, SUGGEST_LOCATION } from "../actions/types ";
const INITIAL_STATE = {
  complete: {},
  location: "",
  suggest_location: [],
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_PROFILE_COMPLETED: {
      return {
        ...state,
        complete: {
          ...state.complete,
          ...action.complete,
        },
      };
    }
    case SUGGEST_LOCATION: {
      return {
        ...state,
        suggest_location: action.location ? [{ ...action.location }] : [],
      };
    }
    default:
      return state;
  }
};
