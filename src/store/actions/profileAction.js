import { SET_PROFILE_COMPLETED, SUGGEST_LOCATION } from "./types ";
export const setProfileCompleted = (complete) => (dispatch) => {
  dispatch({
    type: SET_PROFILE_COMPLETED,
    complete,
  });
};
export function suggestLocation(location) {
  return (dispatch) => {
    dispatch({
      type: SUGGEST_LOCATION,
      location,
    });
  };
}
