import * as actionTypes from "./actionTypes";

export const setUsername = (username) => {
  return {
    type: actionTypes.SET_USERNAME,
    username,
  };
};
