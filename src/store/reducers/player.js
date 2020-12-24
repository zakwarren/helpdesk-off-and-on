import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utilities";

const initialState = {
  username: "Newbie",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERNAME:
      return updateObject(state, { username: action.username });
    default:
      return state;
  }
};

export default reducer;
